// src/os_engine/os_core.c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <pthread.h>
#include <semaphore.h>
#include <unistd.h>
#include <time.h>
#include "PCB.h"
#include "bankers_algorithm.h"

#define QUEUE_CAPACITY 5
#define TOTAL_JOBS 8
#define NUM_CORES 2
#define CONTEXT_SWITCH_US 500000

// --- SHARED RESOURCES ---
PCB ready_queue[QUEUE_CAPACITY];
int queue_front = 0;
int queue_rear = 0;
int jobs_produced = 0;
int jobs_consumed = 0;
int jobs_completed = 0;
int rr_preemptions = 0;
int rr_time_quantum = 0;
int planned_burst_times[TOTAL_JOBS];

// Eco-Cloud Tracking Metrics
int successful_jobs = 0;
int failed_jobs = 0;

// Shared Energy Budget (Cooperating Processes)
int global_energy_budget = 200; // Intentionally low (200W) so some jobs fail/deny

// --- BANKER'S ALGORITHM STATE (Deadlock Avoidance) ---
BankersAlgorithmState bankers_state;
int jobs_allocated = 0;  // Track how many jobs have been allocated via Banker's Algorithm

// --- CONCURRENCY PRIMITIVES ---
pthread_mutex_t queue_mutex;    // Protects the Ready Queue
pthread_mutex_t energy_mutex;   // Protects the Global Energy Budget
pthread_mutex_t print_mutex;    // Prevents terminal output from scrambling
sem_t empty_slots;              // Tracks empty slots in queue
sem_t full_slots;               // Tracks filled slots in queue

static int compare_ints(const void* a, const void* b) {
    int left = *(const int*)a;
    int right = *(const int*)b;
    return (left > right) - (left < right);
}

static int compute_rr_quantum(const int* burst_times, int count) {
    int ordered[TOTAL_JOBS];
    memcpy(ordered, burst_times, sizeof(int) * count);
    qsort(ordered, count, sizeof(int), compare_ints);

    int p80_index = ((count * 80) + 99) / 100 - 1;
    if (p80_index < 0) {
        p80_index = 0;
    }
    if (p80_index >= count) {
        p80_index = count - 1;
    }

    int quantum = ordered[p80_index];
    if (quantum < 1) {
        quantum = 1;
    }

    return quantum;
}

// --- SYSTEM CALL SIMULATION (Using Banker's Algorithm) ---
void sim_request_resource(PCB* job, int watts_needed, int core_id) {
    (void)core_id;
    job->mode = KERNEL_MODE; // Switch to Kernel Mode
    
    pthread_mutex_lock(&print_mutex);
    printf("      -> [SYSTEM CALL] Requesting %d Watts (Mode: KERNEL)\n", watts_needed);
    printf("      -> [BANKER'S ALGORITHM] Checking safe allocation for Process %d...\n", job->process_id);
    pthread_mutex_unlock(&print_mutex);
    
    // CRITICAL SECTION: Banker's Algorithm resource allocation
    pthread_mutex_lock(&energy_mutex);
    
    int process_id = job->process_id;
    
    // Request energy spread across multiple resource types for realistic simulation
    // Grid power is primary, solar as secondary, battery as backup
    int req_grid = watts_needed;
    int req_solar = watts_needed / 3;
    int req_battery = watts_needed / 6;
    
    // Try allocation via Banker's Algorithm
    if (bankers_request_resources(&bankers_state, process_id, req_solar, req_grid, req_battery)) {
        job->energy_allocated = 1; // Success
        jobs_allocated++;
        
        pthread_mutex_lock(&print_mutex);
        printf("      -> [HARDWARE] Access GRANTED (Safe State Maintained).\n");
        printf("      -> Allocated: Solar=%dW, Grid=%dW, Battery=%dW\n", req_solar, req_grid, req_battery);
        printf("      -> Available: Solar=%dW, Grid=%dW, Battery=%dW\n",
               bankers_state.available[SOLAR_POWER],
               bankers_state.available[GRID_POWER],
               bankers_state.available[BATTERY_POWER]);
        pthread_mutex_unlock(&print_mutex);
    } else {
        job->energy_allocated = 0; // Failure
        
        pthread_mutex_lock(&print_mutex);
        printf("      -> [HARDWARE] DENIED! Allocation leads to unsafe state.\n");
        printf("      -> (Deadlock avoidance: System protected)\n");
        pthread_mutex_unlock(&print_mutex);
    }
    pthread_mutex_unlock(&energy_mutex);
    
    job->mode = USER_MODE; // Switch back to User Mode
}

// --- RELEASE RESOURCES (When Process Terminates) ---
void sim_release_resource(PCB* job) {
    pthread_mutex_lock(&energy_mutex);
    bankers_release_resources(&bankers_state, job->process_id);
    pthread_mutex_unlock(&energy_mutex);
}

// --- PRODUCER: JOB GENERATOR (ADMISSION CONTROL) ---
void* job_generator(void* arg) {
    (void)arg;
    for (int i = 1; i <= TOTAL_JOBS; i++) {
        PCB new_job;
        sprintf(new_job.job_id, "JOB_%03d", i);
        new_job.burst_time = planned_burst_times[i - 1];
        new_job.remaining_time = new_job.burst_time;
        new_job.state = STATE_NEW;
        new_job.mode = USER_MODE;
        new_job.energy_allocated = 0; // Default
        new_job.process_id = i - 1;  // Banker's Algorithm process ID
        jobs_produced++;

        sem_wait(&empty_slots);
        pthread_mutex_lock(&queue_mutex);
        
        // Transition: NEW -> READY
        new_job.state = STATE_READY;
        ready_queue[queue_rear] = new_job;
        queue_rear = (queue_rear + 1) % QUEUE_CAPACITY;
        
        pthread_mutex_unlock(&queue_mutex);
        sem_post(&full_slots);
        
        // Cleanly print queue admission
        pthread_mutex_lock(&print_mutex);
        printf("\n[ADMISSION CONTROL] [+] %s Created & Queued.\n", new_job.job_id);
        printf("                    -> State Transition: [NEW] ->[%s]\n", getStateName(new_job.state));
        printf("                    -> Process ID: %d (for Banker's Algorithm)\n", new_job.process_id);
        pthread_mutex_unlock(&print_mutex);
        
        sleep(1); // Delay between job arrivals
    }
    
    // The last completed job will signal shutdown once all work is finished.

    return NULL;
}

// --- CONSUMER: CPU CORE ---
void* cpu_core(void* core_id) {
    int id = *((int*)core_id);
    
    while (1) {
        // Wait for a job to arrive (or for the Producer shutdown signal)
        sem_wait(&full_slots);
        
        pthread_mutex_lock(&queue_mutex);
        // Check if all jobs are already finished
        if (jobs_completed >= TOTAL_JOBS) {
            pthread_mutex_unlock(&queue_mutex);
            break; // Exit the thread
        }

        // Ignore wakeups when the queue is empty but jobs are still running elsewhere
        if (queue_front == queue_rear) {
            pthread_mutex_unlock(&queue_mutex);
            continue;
        }
        
        // Extract Job
        PCB current_job = ready_queue[queue_front];
        queue_front = (queue_front + 1) % QUEUE_CAPACITY;
        jobs_consumed++;
        
        pthread_mutex_unlock(&queue_mutex);
        sem_post(&empty_slots);

        // --- CONTEXT SWITCH & START LOGGING ---
        pthread_mutex_lock(&print_mutex);
        printf("\n[CORE %d] [*] DISPATCHING %s\n", id, current_job.job_id);
        printf("      -> Context Switching... (Loading Registers)\n");
        current_job.state = STATE_RUNNING;
        printf("      -> State Transition: [READY] -> [%s]\n", getStateName(current_job.state));
        pthread_mutex_unlock(&print_mutex);
        
        usleep(CONTEXT_SWITCH_US); // Context switch penalty (0.5 sec)

        // --- SYSTEM CALL FOR ENERGY (once per job) ---
        if (current_job.energy_allocated == 0) {
            sim_request_resource(&current_job, 50, id); 
        }

        if (current_job.energy_allocated == 0) {
            int should_wake_cores = 0;

            pthread_mutex_lock(&print_mutex);
            printf("      -> Aborting Execution due to lack of energy.\n");
            printf("[CORE %d] [-] FINISHED %s\n", id, current_job.job_id);
            printf("      -> State Transition: [RUNNING] -> [TERMINATED]\n");
            printf("      -> Final Outcome: FAILED  (Energy Denied)\n");
            printf("--------------------------------------------------\n");
            pthread_mutex_unlock(&print_mutex);
            current_job.state = STATE_TERMINATED;
            failed_jobs++;
            jobs_completed++;

            if (jobs_completed == TOTAL_JOBS) {
                should_wake_cores = 1;
            }

            if (should_wake_cores) {
                for (int i = 0; i < NUM_CORES; i++) {
                    sem_post(&full_slots);
                }
            }

            continue;
        }
        
        int slice = current_job.remaining_time < rr_time_quantum ? current_job.remaining_time : rr_time_quantum;
        pthread_mutex_lock(&print_mutex);
        printf("      -> Round Robin Quantum: %d sec\n", rr_time_quantum);
        printf("      -> Executing slice for %d seconds (Remaining before slice: %d seconds)\n",
               slice, current_job.remaining_time);
        pthread_mutex_unlock(&print_mutex);

        sleep(slice);
        current_job.remaining_time -= slice;

        if (current_job.remaining_time > 0) {
            current_job.state = STATE_READY;
            rr_preemptions++;

            pthread_mutex_lock(&print_mutex);
            printf("      -> Quantum expired for %s; preempting with %d seconds remaining.\n",
                   current_job.job_id, current_job.remaining_time);
            printf("      -> State Transition: [RUNNING] -> [READY]\n");
            pthread_mutex_unlock(&print_mutex);

            sem_wait(&empty_slots);
            pthread_mutex_lock(&queue_mutex);
            ready_queue[queue_rear] = current_job;
            queue_rear = (queue_rear + 1) % QUEUE_CAPACITY;
            pthread_mutex_unlock(&queue_mutex);
            sem_post(&full_slots);

            continue;
        }
        
        // --- TERMINATION LOGGING & STATS ---
        current_job.state = STATE_TERMINATED;
        int should_wake_cores = 0;
        
        pthread_mutex_lock(&print_mutex);
        printf("[CORE %d] [-] FINISHED %s\n", id, current_job.job_id);
        printf("      -> State Transition: [RUNNING] -> [%s]\n", getStateName(current_job.state));
        
        if (current_job.energy_allocated == 1) {
            printf("      -> Final Outcome: SUCCESS (Energy Consumed)\n");
            printf("      -> [BANKER'S ALGORITHM] Releasing allocated resources for Process %d...\n", 
                   current_job.process_id);
            sim_release_resource(&current_job);
            successful_jobs++;
            jobs_completed++;
        } else {
            printf("      -> Final Outcome: FAILED  (Energy Denied)\n");
            failed_jobs++;
            jobs_completed++;
        }
        if (jobs_completed == TOTAL_JOBS) {
            should_wake_cores = 1;
        }
        printf("--------------------------------------------------\n");
        pthread_mutex_unlock(&print_mutex);

        if (should_wake_cores) {
            for (int i = 0; i < NUM_CORES; i++) {
                sem_post(&full_slots);
            }
        }
    }
    return NULL;
}

// --- MAIN FUNCTION ---
int main() {
    printf("==================================================\n");
    printf(" ECO-CLOUD OS KERNEL \n");
    printf("==================================================\n");

    srand((unsigned)time(NULL));

    for (int i = 0; i < TOTAL_JOBS; i++) {
        planned_burst_times[i] = (rand() % 3) + 1;
    }
    rr_time_quantum = compute_rr_quantum(planned_burst_times, TOTAL_JOBS);

    // Initialize Mutexes and Semaphores
    pthread_mutex_init(&queue_mutex, NULL);
    pthread_mutex_init(&energy_mutex, NULL);
    pthread_mutex_init(&print_mutex, NULL); 
    
    sem_init(&empty_slots, 0, QUEUE_CAPACITY);
    sem_init(&full_slots, 0, 0);

    // --- INITIALIZE BANKER'S ALGORITHM ---
    bankers_init(&bankers_state, TOTAL_JOBS, MAX_RESOURCE_TYPES);
    
    // Set total available resources (Solar, Grid, Battery)
    // These represent the total power available from different sources
    bankers_set_available(&bankers_state, 100, 200, 50);  // 100W solar, 200W grid, 50W battery
    
    // Set maximum resource requirements for each job
    // Each job may request up to these amounts
    for (int i = 0; i < TOTAL_JOBS; i++) {
        // Jobs will need up to 20W solar, 50W grid, 10W battery
        bankers_set_maximum(&bankers_state, i, 20, 50, 10);
    }
    
    printf("\n[BANKER'S ALGORITHM] Initialized with Deadlock Avoidance.\n");
    printf("  Available Resources: Solar=100W, Grid=200W, Battery=50W\n");
    printf("  Max per Job: Solar=20W, Grid=50W, Battery=10W\n");
    printf("\n[ROUND ROBIN] Adaptive quantum selected from actual job bursts.\n");
    printf("  Quantum Rule: P80(burst_times)\n");
    printf("  Context-switch overhead: 0.5 sec\n");
    printf("  Selected Quantum: %d sec\n", rr_time_quantum);
    printf("==================================================\n\n");

    // Create Threads
    pthread_t producer_thread;
    pthread_t cpu_thread_1, cpu_thread_2;
    int core_1 = 1, core_2 = 2;

    pthread_create(&producer_thread, NULL, job_generator, NULL);
    pthread_create(&cpu_thread_1, NULL, cpu_core, &core_1);
    pthread_create(&cpu_thread_2, NULL, cpu_core, &core_2);

    // Wait for threads to finish
    pthread_join(producer_thread, NULL);
    pthread_join(cpu_thread_1, NULL);
    pthread_join(cpu_thread_2, NULL);

    // Cleanup
    pthread_mutex_destroy(&queue_mutex);
    pthread_mutex_destroy(&energy_mutex);
    pthread_mutex_destroy(&print_mutex);
    sem_destroy(&empty_slots);
    sem_destroy(&full_slots);

    // FINAL OUTPUT STATISTICS
    printf("\n==================================================\n");
    printf(" SYSTEM SHUTDOWN: All jobs processed.\n");
    printf("==================================================\n");
    printf(" EXECUTION SUMMARY:\n");
    printf(" -> Total Jobs Processed       : %d\n", TOTAL_JOBS);
    printf(" -> Time Slices Executed       : %d\n", jobs_consumed);
    printf(" -> Preemptions                : %d\n", rr_preemptions);
    printf(" -> Successful Terminations    : %d\n", successful_jobs);
    printf(" -> Failed Terminations        : %d (Unsafe allocation prevented)\n", failed_jobs);
    printf("\n[BANKER'S ALGORITHM] Final State:\n");
    printf(" -> Total Resources Allocated  : %d jobs\n", jobs_allocated);
    bankers_print_state(&bankers_state);
    printf("==================================================\n");

    return 0;
}