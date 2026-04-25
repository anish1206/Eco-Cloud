// src/os_engine/PCB.h
#ifndef PCB_H
#define PCB_H

// 1. 7-State Model
typedef enum {
    STATE_NEW,
    STATE_READY,
    STATE_RUNNING,
    STATE_BLOCKED,
    STATE_TERMINATED,
    STATE_READY_SUSPEND,
    STATE_BLOCKED_SUSPEND
} ProcessState;

// 2. Kernel Mode vs User Mode
typedef enum {
    USER_MODE,
    KERNEL_MODE
} PrivilegeMode;

// 3. Process Control Block (PCB)
typedef struct {
    char job_id[16];
    int burst_time;
    int remaining_time;
    int memory_req;
    
    ProcessState state;
    PrivilegeMode mode;
    
    // Eco-Profile Tracking
    double carbon_footprint;
    int energy_allocated;    // 1 if successful, 0 if denied
    
    // Banker's Algorithm Tracking
    int process_id;          // ID for banker's algorithm resource tracking
} PCB;

// Helper to convert state enum to string for printing
const char* getStateName(ProcessState state) {
    switch(state) {
        case STATE_NEW: return "NEW";
        case STATE_READY: return "READY";
        case STATE_RUNNING: return "RUNNING";
        case STATE_BLOCKED: return "BLOCKED";
        case STATE_TERMINATED: return "TERMINATED";
        case STATE_READY_SUSPEND: return "READY_SUSPEND";
        case STATE_BLOCKED_SUSPEND: return "BLOCKED_SUSPEND";
        default: return "UNKNOWN";
    }
}

#endif