// src/os_engine/bankers_algorithm.h
// Banker's Algorithm: Deadlock Avoidance for Energy Resource Allocation
// Ensures system only grants resources if it remains in a SAFE state

#ifndef BANKERS_ALGORITHM_H
#define BANKERS_ALGORITHM_H

#include <stdio.h>
#include <stdbool.h>
#include <string.h>

#define MAX_PROCESSES 16
#define MAX_RESOURCE_TYPES 3

// Resource types in Eco-Cloud: Solar, Grid, Battery
typedef enum {
    SOLAR_POWER = 0,
    GRID_POWER = 1,
    BATTERY_POWER = 2
} ResourceType;

// Banker's Algorithm State Manager
typedef struct {
    // Available[i] = amount of resource type i currently free
    int available[MAX_RESOURCE_TYPES];
    
    // Maximum[i][j] = max resource type i that process j will ever need
    int maximum[MAX_PROCESSES][MAX_RESOURCE_TYPES];
    
    // Allocated[i][j] = resource type i currently allocated to process j
    int allocated[MAX_PROCESSES][MAX_RESOURCE_TYPES];
    
    // Need[i][j] = maximum[i][j] - allocated[i][j] (still needed)
    int need[MAX_PROCESSES][MAX_RESOURCE_TYPES];
    
    int num_processes;
    int num_resources;
} BankersAlgorithmState;

// Initialize Banker's Algorithm state
void bankers_init(BankersAlgorithmState* state, int num_processes, int num_resources) {
    state->num_processes = num_processes;
    state->num_resources = num_resources;
    memset(state->available, 0, sizeof(state->available));
    memset(state->maximum, 0, sizeof(state->maximum));
    memset(state->allocated, 0, sizeof(state->allocated));
    memset(state->need, 0, sizeof(state->need));
}

// Set total available resources
void bankers_set_available(BankersAlgorithmState* state, int solar, int grid, int battery) {
    state->available[SOLAR_POWER] = solar;
    state->available[GRID_POWER] = grid;
    state->available[BATTERY_POWER] = battery;
}

// Register a process's maximum resource requirements
void bankers_set_maximum(BankersAlgorithmState* state, int process_id, 
                         int max_solar, int max_grid, int max_battery) {
    if (process_id >= MAX_PROCESSES) return;
    state->maximum[process_id][SOLAR_POWER] = max_solar;
    state->maximum[process_id][GRID_POWER] = max_grid;
    state->maximum[process_id][BATTERY_POWER] = max_battery;
    
    // Initialize need = maximum - allocated (currently 0)
    state->need[process_id][SOLAR_POWER] = max_solar;
    state->need[process_id][GRID_POWER] = max_grid;
    state->need[process_id][BATTERY_POWER] = max_battery;
}

// Safety Check Algorithm (DFS-based to find safe sequence)
bool bankers_safety_check(BankersAlgorithmState* state, int* safe_sequence, 
                          bool* visited, int depth) {
    // Base case: all processes included in safe sequence
    if (depth == state->num_processes) {
        return true;
    }
    
    // Try to find a process that can complete
    for (int i = 0; i < state->num_processes; i++) {
        if (visited[i]) continue;
        
        // Check if process i's needs can be satisfied with available resources
        bool can_satisfy = true;
        for (int j = 0; j < state->num_resources; j++) {
            if (state->need[i][j] > state->available[j]) {
                can_satisfy = false;
                break;
            }
        }
        
        if (can_satisfy) {
            // Assume process i completes, so release its allocated resources
            for (int j = 0; j < state->num_resources; j++) {
                state->available[j] += state->allocated[i][j];
            }
            
            visited[i] = true;
            safe_sequence[depth] = i;
            
            // Recursively try to find a safe sequence for remaining processes
            if (bankers_safety_check(state, safe_sequence, visited, depth + 1)) {
                return true;
            }
            
            // Backtrack: reclaim the resources
            visited[i] = false;
            for (int j = 0; j < state->num_resources; j++) {
                state->available[j] -= state->allocated[i][j];
            }
        }
    }
    
    return false; // No safe sequence found
}

// Check if the system is in a SAFE state
bool bankers_is_safe(BankersAlgorithmState* state, int* safe_sequence) {
    // IMPORTANT: The safety-check simulation mutates `available` as it explores
    // completion sequences. Never run it against the live state, otherwise the
    // real `available` values can be permanently inflated.
    BankersAlgorithmState snapshot = *state;
    bool visited[MAX_PROCESSES] = {false};
    return bankers_safety_check(&snapshot, safe_sequence, visited, 0);
}

// Request resources (returns true if safe to allocate)
bool bankers_request_resources(BankersAlgorithmState* state, int process_id,
                               int req_solar, int req_grid, int req_battery) {
    if (process_id >= MAX_PROCESSES) return false;
    
    // Check if request exceeds available
    if (req_solar > state->available[SOLAR_POWER] ||
        req_grid > state->available[GRID_POWER] ||
        req_battery > state->available[BATTERY_POWER]) {
        return false;
    }
    
    // Check if request exceeds remaining need
    if (req_solar > state->need[process_id][SOLAR_POWER] ||
        req_grid > state->need[process_id][GRID_POWER] ||
        req_battery > state->need[process_id][BATTERY_POWER]) {
        return false;
    }
    
    // TENTATIVELY ALLOCATE
    state->allocated[process_id][SOLAR_POWER] += req_solar;
    state->allocated[process_id][GRID_POWER] += req_grid;
    state->allocated[process_id][BATTERY_POWER] += req_battery;
    
    state->need[process_id][SOLAR_POWER] -= req_solar;
    state->need[process_id][GRID_POWER] -= req_grid;
    state->need[process_id][BATTERY_POWER] -= req_battery;
    
    state->available[SOLAR_POWER] -= req_solar;
    state->available[GRID_POWER] -= req_grid;
    state->available[BATTERY_POWER] -= req_battery;
    
    // SAFETY CHECK
    int safe_sequence[MAX_PROCESSES];
    if (bankers_is_safe(state, safe_sequence)) {
        // System remains safe, allocation is approved
        return true;
    }
    
    // UNSAFE: ROLLBACK ALLOCATION
    state->allocated[process_id][SOLAR_POWER] -= req_solar;
    state->allocated[process_id][GRID_POWER] -= req_grid;
    state->allocated[process_id][BATTERY_POWER] -= req_battery;
    
    state->need[process_id][SOLAR_POWER] += req_solar;
    state->need[process_id][GRID_POWER] += req_grid;
    state->need[process_id][BATTERY_POWER] += req_battery;
    
    state->available[SOLAR_POWER] += req_solar;
    state->available[GRID_POWER] += req_grid;
    state->available[BATTERY_POWER] += req_battery;
    
    return false; // Allocation denied (unsafe)
}

// Release resources when process completes
void bankers_release_resources(BankersAlgorithmState* state, int process_id) {
    if (process_id >= MAX_PROCESSES) return;
    
    for (int i = 0; i < state->num_resources; i++) {
        state->available[i] += state->allocated[process_id][i];
        state->allocated[process_id][i] = 0;
        state->need[process_id][i] = state->maximum[process_id][i];
    }
}

// Print system state for debugging
void bankers_print_state(BankersAlgorithmState* state) {
    printf("\n=== BANKER'S ALGORITHM STATE ===\n");
    printf("Available Resources (Solar, Grid, Battery): [%d, %d, %d]\n",
           state->available[SOLAR_POWER], 
           state->available[GRID_POWER], 
           state->available[BATTERY_POWER]);
    
    printf("\nProcess Allocation States:\n");
    for (int i = 0; i < state->num_processes; i++) {
        printf("  Process %d:\n", i);
        printf("    Allocated: [%d, %d, %d]\n",
               state->allocated[i][SOLAR_POWER],
               state->allocated[i][GRID_POWER],
               state->allocated[i][BATTERY_POWER]);
        printf("    Need:      [%d, %d, %d]\n",
               state->need[i][SOLAR_POWER],
               state->need[i][GRID_POWER],
               state->need[i][BATTERY_POWER]);
    }
    printf("================================\n");
}

#endif // BANKERS_ALGORITHM_H
