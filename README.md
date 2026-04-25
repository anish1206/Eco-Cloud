# Eco-Cloud: Carbon-Aware Data Center Scheduler  
### A Multi-Disciplinary Simulation of Green Cloud Computing

![Language](https://img.shields.io/badge/Language-C++%20%7C%20Python-blue)
![Focus](https://img.shields.io/badge/Focus-OS%20%7C%20DSA%20%7C%20AI-green)
![Status](https://img.shields.io/badge/Status-In%20Development-orange)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

---

## Project Overview

**Eco-Cloud** is an advanced academic simulation of a data center operating system. Unlike traditional schedulers that optimize only for speed (Performance), Eco-Cloud optimizes for:

- Environmental Impact (Carbon Footprint)  
- Hardware Health (Thermal Efficiency)  

This project bridges three core domains:

1. Operating Systems  
2. Data Structures & Algorithms  
3. Artificial Intelligence  

The system integrates kernel-level scheduling, efficient algorithm design, and predictive machine learning to simulate next-generation sustainable cloud computing.

---

## System Architecture

The system operates as a **Discrete Event Simulation** with tightly integrated modules.

```mermaid
graph TD
    A[ML Intelligence Engine] -->|Predict Carbon & Thermal Trends| B[Shared Config / JSON Policy]
    B -->|Dynamic Scheduling Policy| C[OS Kernel Engine]
    C -->|Optimization Requests| D[DSA Engine]
    D -->|Optimized Data Structures| C
    C -->|Performance & Carbon Logs| E[B-Tree Storage]
```

---

# Detailed Syllabus Mapping

---

## Part 1: Operating System Concepts (25+)

### Unit I: Introduction & System Structure

- **Batch Processing:** The simulation processes batches of jobs from CSV trace files.  
- **System Calls:** Simulates interaction between user jobs and the kernel (e.g., `sim_request_resource()`).  
- **Kernel Mode vs User Mode:** A privilege flag inside the Process Control Block.

---

### Unit II: Process Management

- **Process Control Block (PCB):** Contains PID, State, Registers, and Carbon Profile.  
- **7-State Model:** New, Ready, Running, Blocked, Terminated, Ready-Suspend, Blocked-Suspend.  
- **Context Switching:** Simulated tick overhead for saving and restoring registers.  
- **Multithreading:** Simulation uses threads to represent multiple CPU cores.  
- **Independent vs Cooperating Processes:** Jobs share a global energy budget.  
- **Producer–Consumer:** Job generator produces workloads; scheduler consumes them.  
- **Critical Section:** Carbon and thermal log updates.  
- **Mutex Locks:** Protect shared energy grid state.  
- **Semaphores:** Control ready queue capacity.

---

### Unit III: Process Scheduling

- **Long-Term Scheduler:** Admission control for jobs entering the system.  
- **Short-Term Scheduler:** CPU allocation decisions.  
- **Preemptive Scheduling:** Low-carbon and high-priority jobs can interrupt execution.

#### Scheduling Algorithms

- **FCFS**  
- **Round Robin (Adaptive Quantum)**  
- **Priority Scheduling (Green-first)**  
- **Aging and Starvation Prevention**

**Round Robin quantum selection in `os_engine`:** the quantum is computed at runtime from the actual burst-time set for the current run using the 80th percentile rule:

$$
Q = P_{80}(burst\_times)
$$

This keeps the scheduler workload-driven rather than arbitrary. Context-switch overhead is still simulated as runtime cost, but it is not used in the quantum formula.

In this simulator, the job burst times are generated for the run itself, so the quantum can change from run to run depending on the observed workload.

#### Scheduling Metrics

- Throughput  
- Turnaround Time  
- Waiting Time  

---

### Unit IV: Deadlocks

- **Resource Modeling:** CPU cores, memory, and power (Solar, Grid, Battery).  
- **Resource Allocation Graph:** Tracks allocation and need across multiple resource types.  
- **Safe State Detection:** Ensures grid remains in a safe state (all processes can complete).  
- **Banker's Algorithm:** Sophisticated deadlock avoidance strategy that:
  - Maintains maximum resource requirements per process
  - Checks safety before each allocation
  - Prevents unsafe allocations that could lead to deadlock
  - Handles multiple energy sources simultaneously (Solar, Grid, Battery)

---

### Unit V: Memory Management

- Variable partition allocation.  
- Best Fit vs First Fit strategies.  
- External fragmentation analysis.  
- Paging with frame allocation.

---

### Unit VI: I/O and Miscellaneous

- Thermal interrupt simulation.  
- SCAN disk scheduling for efficient logging.

---

## Part 2: Data Structures & Algorithms (Core Engine)

These are implemented manually without STL shortcuts.
### 1. Fibonacci Heap

**Role:** Dynamic ready queue.

**Why:** Supports efficient priority updates in O(1) amortized time.


### 2. Splay Tree

**Role:** Active job cache.

**Why:** Exploits locality of reference for fast repeated access.


### 3. Trie / Compressed Trie

**Role:** Efficient job ID storage.


### 4. B-Tree

**Role:** Disk indexing and log storage.

### 5. Huffman Coding

**Role:** Compression of simulation logs.

### 6. Bin Packing

**Role:** Energy-efficient server consolidation.


### 7. Graph Algorithms

**Role:** Network routing and energy-aware communication.

### 8. ARIMA Forecasting

**Role:** Carbon intensity prediction.


## Part 3: Machine Learning Intelligence

The module relies solely on a Deep Reinforcement Learning (DRL) agent acting as a cluster scheduler to dynamically manage preemption based on the grid carbon state.

### Features

- Dynamic Deep Reinforcement Learning (DRL) agent for priority sorting.
- Balancing Job Completion Time against carbon limits.

The model generates scheduling policies dynamically through the reinforcement environment.

---

# Repository Structure

```text
Eco-Cloud/
├── data/                  # Carbon datasets
├── docs/                  # Research and architecture
├── src/
│   ├── os_engine/
│   ├── ds_engine/
│   ├── ml_engine/
│   └── integration/
├── tests/
└── README.md
```

---

## Getting Started

### Prerequisites

- C++17 or higher  
- Python 3.8+  
- pandas, statsmodels, scikit-learn  

---

### Installation

Clone the repository:

```bash
git clone https://github.com/YourUsername/Eco-Cloud.git
cd Eco-Cloud
```

Run ML engine:

```bash
cd src/ml_engine
pip install -r requirements.txt
python generate_forecast.py
```

Compile simulation:

```bash
cd ../..
g++ -o eco_sim src/os_engine/*.cpp src/ds_engine/*.cpp
```

Run:

```bash
./eco_sim
```

---

## Contribution Workflow

We follow a strict feature-branch workflow.

1. Pick an issue  
2. Create a branch:

```bash
git checkout -b feature/your-task-name
```

3. Implement feature  
4. Open pull request  
5. Code review  
6. Merge  


---

# Research Goal

**Enhancing Carbon-Aware Data Center Scheduling Using Machine Learning-Assisted Predictive Models and Thermal Anomaly Detection**

---

```mermaid
    sequenceDiagram
    participant Main as Main Thread (OS Boot)
    participant Prod as Producer (Job Generator)
    participant Q as Ready Queue (Shared Memory)
    participant Core1 as CPU Core 1 (Consumer)
    participant Core2 as CPU Core 2 (Consumer)
    participant Src1 as Energy Source 1
    participant Src2 as Energy Source 2

    Main->>Prod: pthread_create()
    Main->>Core1: pthread_create()
    Main->>Core2: pthread_create()
    
    rect rgb(28, 38, 52)
        Note over Prod: Concept: Process Creation
        Prod->>Prod: Create PCB (PID, Burst, Mode: USER)
        Note over Prod: [STATE: NEW]
    end

    %% PRODUCER LOGIC 
    Note over Prod, Q: Concept: Semaphores & Mutex (Bounded Buffer)
    alt Queue Capacity is Full (empty_slots == 0)
        Prod-->>Prod: sem_wait(&empty_slots) -> THREAD BLOCKED
    else Queue has Space
        Prod->>Q: sem_wait(&empty_slots) -> PROCEED
        Prod->>Q: pthread_mutex_lock(&queue_mutex)
        
        Q-->>Q: Insert PCB into Ready Queue
        Note over Q: [STATE: NEW] ➔ [STATE: READY]
        
        Q->>Prod: pthread_mutex_unlock(&queue_mutex)
        Prod->>Core1: sem_post(&full_slots) -> WAKES IDLE CPU
    end

    %% CONSUMER LOGIC (SHOWING BOTH CORES)
    Note over Core1, Core2: Concept: Multi-Core Synchronization
    
    %% CORE 2 SCENARIO (EMPTY QUEUE)
    alt Queue is Empty (full_slots == 0)
        Core2-->>Core2: sem_wait(&full_slots) -> CORE 2 GOES TO SLEEP
    end

    %% CORE 1 SCENARIO (HAS JOB)
    alt Queue has Jobs (full_slots > 0)
        Core1->>Q: sem_wait(&full_slots) -> PROCEED
        Core1->>Q: pthread_mutex_lock(&queue_mutex)
        
        Q-->>Core1: Extract PCB from Ready Queue
        Core1->>Q: pthread_mutex_unlock(&queue_mutex)
        Core1->>Prod: sem_post(&empty_slots) -> WAKES PRODUCER
    end

    %% EXECUTION & CONTEXT SWITCHING
    rect rgb(30, 46, 40)
        Note over Core1: Concept: Context Switching
        Core1->>Core1: usleep(500000) - Load Hardware Registers
        Note over Core1: [STATE: READY] ➔ [STATE: RUNNING]
    end

    %% SYSTEM CALLS & HARDWARE ACCESS
    rect rgb(52, 34, 34)
        Note over Core1, Src1: Concept: Privilege Escalation & System Calls
        Core1->>Core1: trigger sim_request_resource()
        Core1->>Core1: Mode = KERNEL_MODE
        
        Core1->>Src1: pthread_mutex_lock(&energy_mutex)
        
        rect rgb(56, 34, 48)
            Note over Src1, Src2: Concept: Banker's Algorithm (Deadlock Avoidance)
            Src1->>Src1: bankers_request_resources()
            
            alt Allocation Does NOT Lead to Unsafe State
                Src1-->>Src2: Tentatively Allocate Resources
                Src1-->>Src1: bankers_is_safe() ➔ TRUE
                Src1-->>Src2: GRANT Request (System remains safe)
                Note over Src1, Src2: Resources allocated across [Source 1, Source 2]
            else Allocation Would Break Safety
                Src1-->>Src2: Rollback Tentative Allocation
                Src1-->>Src1: bankers_is_safe() ➔ FALSE
                Src1-->>Src2: DENY Request (Deadlock prevented)
                Note over Src1, Src2: [STATE: BLOCKED] (Resource wait if needed)
            end
        end
        
        Src1->>Core1: pthread_mutex_unlock(&energy_mutex)
        Core1->>Core1: Mode = USER_MODE
    end

    %% ROUND ROBIN TIME-SLICE DECISION
    rect rgb(27, 43, 61)
        Note over Core1, Q: Concept: Round Robin (Adaptive Quantum)
        Core1->>Core1: slice = min(remaining_time, rr_time_quantum)
        Core1->>Core1: sleep(slice) - Execute Time Slice

        alt remaining_time > 0 after slice
            Note over Core1: [STATE: RUNNING] ➔ [STATE: READY] (Preempt)
            Core1->>Q: Requeue PCB at rear
            Core1->>Core1: Continue with next ready job
        else remaining_time == 0
            Note over Core1: Job completed in current slice
        end
    end

    %% TERMINATION
    rect rgb(58, 58, 58)
        Note over Core1: Concept: CPU Execution & Termination
        Core1->>Core1: Release resources and finalize job
        Note over Core1: [STATE: RUNNING] ➔ [STATE: TERMINATED]
    end
    
    %% ECO-CLOUD EXTENSION CALLOUT
    Note over Prod: ECO-CLOUD RESEARCH EXTENSION:<br/>Jobs delayed due to energy conditions will be moved to<br/>[STATE: READY_SUSPEND] or [STATE: BLOCKED_SUSPEND]

```



Built for Academic Year 2025–2026  
Department of CSE (AIML)
