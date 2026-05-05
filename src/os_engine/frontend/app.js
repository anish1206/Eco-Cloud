const rawLog = `==================================================
 ECO-CLOUD OS KERNEL 
==================================================

[BANKER'S ALGORITHM] Initialized with Deadlock Avoidance.
  Available Resources: Solar=100W, Grid=200W, Battery=50W
  Max per Job: Solar=20W, Grid=50W, Battery=10W

[ROUND ROBIN] Adaptive quantum selected from actual job bursts.
  Quantum Rule: P80(burst_times)
  Context-switch overhead: 0.5 sec
  Selected Quantum: 3 sec
==================================================


[ADMISSION CONTROL] [+] JOB_001 Created & Queued.
                    -> State Transition: [NEW] ->[READY]
                    -> Process ID: 0 (for Banker's Algorithm)

[CORE 2] [*] DISPATCHING JOB_001
      -> Context Switching... (Loading Registers)
      -> State Transition: [READY] -> [RUNNING]
      -> [SYSTEM CALL] Requesting 50 Watts (Mode: KERNEL)
      -> [BANKER'S ALGORITHM] Checking safe allocation for Process 0...
      -> [HARDWARE] Access GRANTED (Safe State Maintained).
      -> Allocated: Solar=16W, Grid=50W, Battery=8W
      -> Available: Solar=84W, Grid=150W, Battery=42W
      -> Round Robin Quantum: 3 sec
      -> Executing slice for 3 seconds (Remaining before slice: 3 seconds)

[ADMISSION CONTROL] [+] JOB_002 Created & Queued.
                    -> State Transition: [NEW] ->[READY]
                    -> Process ID: 1 (for Banker's Algorithm)

[CORE 1] [*] DISPATCHING JOB_002
      -> Context Switching... (Loading Registers)
      -> State Transition: [READY] -> [RUNNING]
      -> [SYSTEM CALL] Requesting 50 Watts (Mode: KERNEL)
      -> [BANKER'S ALGORITHM] Checking safe allocation for Process 1...
      -> [HARDWARE] Access GRANTED (Safe State Maintained).
      -> Allocated: Solar=16W, Grid=50W, Battery=8W
      -> Available: Solar=68W, Grid=100W, Battery=34W
      -> Round Robin Quantum: 3 sec
      -> Executing slice for 3 seconds (Remaining before slice: 3 seconds)

[ADMISSION CONTROL] [+] JOB_003 Created & Queued.
                    -> State Transition: [NEW] ->[READY]
                    -> Process ID: 2 (for Banker's Algorithm)

[ADMISSION CONTROL] [+] JOB_004 Created & Queued.
                    -> State Transition: [NEW] ->[READY]
                    -> Process ID: 3 (for Banker's Algorithm)
[CORE 2] [-] FINISHED JOB_001
      -> State Transition: [RUNNING] -> [TERMINATED]
      -> Final Outcome: SUCCESS (Energy Consumed)
      -> [BANKER'S ALGORITHM] Releasing allocated resources for Process 0...
--------------------------------------------------

[CORE 2] [*] DISPATCHING JOB_003
      -> Context Switching... (Loading Registers)
      -> State Transition: [READY] -> [RUNNING]
      -> [SYSTEM CALL] Requesting 50 Watts (Mode: KERNEL)
      -> [BANKER'S ALGORITHM] Checking safe allocation for Process 2...
      -> [HARDWARE] Access GRANTED (Safe State Maintained).
      -> Allocated: Solar=16W, Grid=50W, Battery=8W
      -> Available: Solar=68W, Grid=100W, Battery=34W
      -> Round Robin Quantum: 3 sec
      -> Executing slice for 1 seconds (Remaining before slice: 1 seconds)

[ADMISSION CONTROL] [+] JOB_005 Created & Queued.
                    -> State Transition: [NEW] ->[READY]
                    -> Process ID: 4 (for Banker's Algorithm)
[CORE 1] [-] FINISHED JOB_002
      -> State Transition: [RUNNING] -> [TERMINATED]
      -> Final Outcome: SUCCESS (Energy Consumed)
      -> [BANKER'S ALGORITHM] Releasing allocated resources for Process 1...
--------------------------------------------------

[CORE 1] [*] DISPATCHING JOB_004
      -> Context Switching... (Loading Registers)
      -> State Transition: [READY] -> [RUNNING]
      -> [SYSTEM CALL] Requesting 50 Watts (Mode: KERNEL)
      -> [BANKER'S ALGORITHM] Checking safe allocation for Process 3...
      -> [HARDWARE] Access GRANTED (Safe State Maintained).
      -> Allocated: Solar=16W, Grid=50W, Battery=8W
      -> Available: Solar=68W, Grid=100W, Battery=34W
      -> Round Robin Quantum: 3 sec
      -> Executing slice for 1 seconds (Remaining before slice: 1 seconds)
[CORE 2] [-] FINISHED JOB_003
      -> State Transition: [RUNNING] -> [TERMINATED]
      -> Final Outcome: SUCCESS (Energy Consumed)
      -> [BANKER'S ALGORITHM] Releasing allocated resources for Process 2...
--------------------------------------------------

[CORE 2] [*] DISPATCHING JOB_005
      -> Context Switching... (Loading Registers)
      -> State Transition: [READY] -> [RUNNING]

[ADMISSION CONTROL] [+] JOB_006 Created & Queued.
                    -> State Transition: [NEW] ->[READY]
                    -> Process ID: 5 (for Banker's Algorithm)
      -> [SYSTEM CALL] Requesting 50 Watts (Mode: KERNEL)
      -> [BANKER'S ALGORITHM] Checking safe allocation for Process 4...
      -> [HARDWARE] Access GRANTED (Safe State Maintained).
      -> Allocated: Solar=16W, Grid=50W, Battery=8W
      -> Available: Solar=68W, Grid=100W, Battery=34W
      -> Round Robin Quantum: 3 sec
      -> Executing slice for 3 seconds (Remaining before slice: 3 seconds)
[CORE 1] [-] FINISHED JOB_004
      -> State Transition: [RUNNING] -> [TERMINATED]
      -> Final Outcome: SUCCESS (Energy Consumed)
      -> [BANKER'S ALGORITHM] Releasing allocated resources for Process 3...
--------------------------------------------------

[ADMISSION CONTROL] [+] JOB_007 Created & Queued.
                    -> State Transition: [NEW] ->[READY]
                    -> Process ID: 6 (for Banker's Algorithm)

[CORE 1] [*] DISPATCHING JOB_006
      -> Context Switching... (Loading Registers)
      -> State Transition: [READY] -> [RUNNING]
      -> [SYSTEM CALL] Requesting 50 Watts (Mode: KERNEL)
      -> [BANKER'S ALGORITHM] Checking safe allocation for Process 5...
      -> [HARDWARE] Access GRANTED (Safe State Maintained).
      -> Allocated: Solar=16W, Grid=50W, Battery=8W
      -> Available: Solar=68W, Grid=100W, Battery=34W
      -> Round Robin Quantum: 3 sec
      -> Executing slice for 1 seconds (Remaining before slice: 1 seconds)

[ADMISSION CONTROL] [+] JOB_008 Created & Queued.
                    -> State Transition: [NEW] ->[READY]
                    -> Process ID: 7 (for Banker's Algorithm)
[CORE 1] [-] FINISHED JOB_006
      -> State Transition: [RUNNING] -> [TERMINATED]
      -> Final Outcome: SUCCESS (Energy Consumed)
      -> [BANKER'S ALGORITHM] Releasing allocated resources for Process 5...
--------------------------------------------------

[CORE 1] [*] DISPATCHING JOB_007
      -> Context Switching... (Loading Registers)
      -> State Transition: [READY] -> [RUNNING]
      -> [SYSTEM CALL] Requesting 50 Watts (Mode: KERNEL)
      -> [BANKER'S ALGORITHM] Checking safe allocation for Process 6...
      -> [HARDWARE] Access GRANTED (Safe State Maintained).
      -> Allocated: Solar=16W, Grid=50W, Battery=8W
      -> Available: Solar=68W, Grid=100W, Battery=34W
      -> Round Robin Quantum: 3 sec
      -> Executing slice for 1 seconds (Remaining before slice: 1 seconds)
[CORE 2] [-] FINISHED JOB_005
      -> State Transition: [RUNNING] -> [TERMINATED]
      -> Final Outcome: SUCCESS (Energy Consumed)
      -> [BANKER'S ALGORITHM] Releasing allocated resources for Process 4...
--------------------------------------------------

[CORE 2] [*] DISPATCHING JOB_008
      -> Context Switching... (Loading Registers)
      -> State Transition: [READY] -> [RUNNING]
      -> [SYSTEM CALL] Requesting 50 Watts (Mode: KERNEL)
      -> [BANKER'S ALGORITHM] Checking safe allocation for Process 7...
      -> [HARDWARE] Access GRANTED (Safe State Maintained).
      -> Allocated: Solar=16W, Grid=50W, Battery=8W
      -> Available: Solar=68W, Grid=100W, Battery=34W
      -> Round Robin Quantum: 3 sec
      -> Executing slice for 3 seconds (Remaining before slice: 3 seconds)
[CORE 1] [-] FINISHED JOB_007
      -> State Transition: [RUNNING] -> [TERMINATED]
      -> Final Outcome: SUCCESS (Energy Consumed)
      -> [BANKER'S ALGORITHM] Releasing allocated resources for Process 6...
--------------------------------------------------
[CORE 2] [-] FINISHED JOB_008
      -> State Transition: [RUNNING] -> [TERMINATED]
      -> Final Outcome: SUCCESS (Energy Consumed)
      -> [BANKER'S ALGORITHM] Releasing allocated resources for Process 7...
--------------------------------------------------

==================================================
 SYSTEM SHUTDOWN: All jobs processed.
==================================================
 EXECUTION SUMMARY:
 -> Total Jobs Processed       : 8
 -> Time Slices Executed       : 8
 -> Preemptions                : 0
 -> Successful Terminations    : 8
 -> Failed Terminations        : 0 (Unsafe allocation prevented)

[BANKER'S ALGORITHM] Final State:
 -> Total Resources Allocated  : 8 jobs

=== BANKER'S ALGORITHM STATE ===
Available Resources (Solar, Grid, Battery): [100, 200, 50]

Process Allocation States:
  Process 0:
    Allocated: [0, 0, 0]
    Need:      [20, 50, 10]
  Process 1:
    Allocated: [0, 0, 0]
    Need:      [20, 50, 10]
  Process 2:
    Allocated: [0, 0, 0]
    Need:      [20, 50, 10]
  Process 3:
    Allocated: [0, 0, 0]
    Need:      [20, 50, 10]
  Process 4:
    Allocated: [0, 0, 0]
    Need:      [20, 50, 10]
  Process 5:
    Allocated: [0, 0, 0]
    Need:      [20, 50, 10]
  Process 6:
    Allocated: [0, 0, 0]
    Need:      [20, 50, 10]
  Process 7:
    Allocated: [0, 0, 0]
    Need:      [20, 50, 10]
================================
==================================================`;

const eventTypes = [
  { id: "all", label: "All" },
  { id: "admission", label: "Admission" },
  { id: "dispatch", label: "Dispatch" },
  { id: "allocation", label: "Allocation" },
  { id: "slice", label: "Time Slice" },
  { id: "finish", label: "Finish" }
];

const summary = {
  quantum: null,
  totalJobs: null,
  slices: null,
  preemptions: null,
  success: null,
  failed: null,
  available: null,
  maxPerJob: null,
  contextSwitch: null
};

const stateUsage = new Set();
const events = [];
const counters = {
  transitions: 0,
  admissions: 0,
  dispatches: 0,
  allocationsGranted: 0,
  allocationsDenied: 0,
  slices: [],
  finishes: 0,
  cores: {
    1: { dispatches: 0, finishes: 0 },
    2: { dispatches: 0, finishes: 0 }
  }
};
const bankerState = {
  available: null,
  processes: []
};
const jobs = new Map();
const runningJobs = { 1: null, 2: null };

const getJob = (jobId) => {
  if (!jobs.has(jobId)) {
    jobs.set(jobId, {
      jobId,
      processId: null,
      burstTime: null,
      remainingBefore: null,
      remaining: null,
      lastSlice: null,
      state: "NEW",
      mode: "USER",
      energyGranted: null,
      allocation: null,
      outcome: null,
      coreId: null,
      systemCalls: 0,
      requestWatts: null
    });
  }
  return jobs.get(jobId);
};

const lines = rawLog.split(/\r?\n/);
let currentProcessId = null;
let readingBanker = false;
let lastAdmissionJobId = null;
let stateContextJobId = null;
let currentCoreContext = null;
let lastSelectedJobId = null;
let lastFinishJobId = null;
let lastAllocationEventIndex = null;
let lastFinishEventIndex = null;
let simulateUnsafe = false;

lines.forEach((line) => {
  const trimmed = line.trim();
  if (!trimmed) {
    return;
  }

  const quantumMatch = trimmed.match(/Selected Quantum: (\d+) sec/);
  if (quantumMatch) {
    summary.quantum = Number(quantumMatch[1]);
  }

  const contextMatch = trimmed.match(/Context-switch overhead: ([0-9.]+) sec/);
  if (contextMatch) {
    summary.contextSwitch = Number(contextMatch[1]);
  }

  const availableMatch = trimmed.match(/Available Resources: Solar=(\d+)W, Grid=(\d+)W, Battery=(\d+)W/);
  if (availableMatch) {
    summary.available = [Number(availableMatch[1]), Number(availableMatch[2]), Number(availableMatch[3])];
  }

  const maxMatch = trimmed.match(/Max per Job: Solar=(\d+)W, Grid=(\d+)W, Battery=(\d+)W/);
  if (maxMatch) {
    summary.maxPerJob = [Number(maxMatch[1]), Number(maxMatch[2]), Number(maxMatch[3])];
  }

  const summaryMatch = trimmed.match(/Total Jobs Processed\s+: (\d+)/);
  if (summaryMatch) {
    summary.totalJobs = Number(summaryMatch[1]);
  }

  const slicesMatch = trimmed.match(/Time Slices Executed\s+: (\d+)/);
  if (slicesMatch) {
    summary.slices = Number(slicesMatch[1]);
  }

  const preemptMatch = trimmed.match(/Preemptions\s+: (\d+)/);
  if (preemptMatch) {
    summary.preemptions = Number(preemptMatch[1]);
  }

  const successMatch = trimmed.match(/Successful Terminations\s+: (\d+)/);
  if (successMatch) {
    summary.success = Number(successMatch[1]);
  }

  const failedMatch = trimmed.match(/Failed Terminations\s+: (\d+)/);
  if (failedMatch) {
    summary.failed = Number(failedMatch[1]);
  }

  const stateMatch = trimmed.match(/State Transition: \[(.*?)\] -> ?\[(.*?)\]/);
  if (stateMatch) {
    stateUsage.add(stateMatch[1]);
    stateUsage.add(stateMatch[2]);
    counters.transitions += 1;
    if (stateContextJobId) {
      const job = getJob(stateContextJobId);
      job.state = stateMatch[2];
      stateContextJobId = null;
    }
  }

  if (trimmed.includes("BANKER'S ALGORITHM STATE")) {
    readingBanker = true;
  }

  if (readingBanker) {
    const bankerAvailableMatch = trimmed.match(/Available Resources \(Solar, Grid, Battery\): \[(\d+), (\d+), (\d+)\]/);
    if (bankerAvailableMatch) {
      bankerState.available = [
        Number(bankerAvailableMatch[1]),
        Number(bankerAvailableMatch[2]),
        Number(bankerAvailableMatch[3])
      ];
    }

    const processMatch = trimmed.match(/Process (\d+):/);
    if (processMatch) {
      currentProcessId = Number(processMatch[1]);
      bankerState.processes.push({ id: currentProcessId, allocated: null, need: null });
    }

    const allocatedMatch = trimmed.match(/Allocated: \[(\d+), (\d+), (\d+)\]/);
    if (allocatedMatch && currentProcessId !== null) {
      const target = bankerState.processes.find((p) => p.id === currentProcessId);
      if (target) {
        target.allocated = [
          Number(allocatedMatch[1]),
          Number(allocatedMatch[2]),
          Number(allocatedMatch[3])
        ];
      }
    }

    const needMatch = trimmed.match(/Need:\s+\[(\d+), (\d+), (\d+)\]/);
    if (needMatch && currentProcessId !== null) {
      const target = bankerState.processes.find((p) => p.id === currentProcessId);
      if (target) {
        target.need = [
          Number(needMatch[1]),
          Number(needMatch[2]),
          Number(needMatch[3])
        ];
      }
    }
  }

  const admissionMatch = trimmed.match(/\[ADMISSION CONTROL\] \[\+\] (JOB_\d+)/);
  if (admissionMatch) {
    counters.admissions += 1;
    const job = getJob(admissionMatch[1]);
    job.state = "NEW";
    lastAdmissionJobId = admissionMatch[1];
    stateContextJobId = admissionMatch[1];
    events.push({
      type: "admission",
      title: "Admission",
      description: `${admissionMatch[1]} enters READY queue`,
      detail: "Long-term scheduler admits a new job into the ready queue.",
      jobId: admissionMatch[1]
    });
  }

  const processMatch = trimmed.match(/Process ID: (\d+)/);
  if (processMatch && lastAdmissionJobId) {
    const job = getJob(lastAdmissionJobId);
    job.processId = Number(processMatch[1]);
  }

  const dispatchMatch = trimmed.match(/\[CORE (\d+)\] \[\*\] DISPATCHING (JOB_\d+)/);
  if (dispatchMatch) {
    counters.dispatches += 1;
    counters.cores[Number(dispatchMatch[1])].dispatches += 1;
    const job = getJob(dispatchMatch[2]);
    job.coreId = Number(dispatchMatch[1]);
    job.mode = "USER";
    runningJobs[job.coreId] = job.jobId;
    currentCoreContext = job.coreId;
    stateContextJobId = job.jobId;
    events.push({
      type: "dispatch",
      title: `Core ${dispatchMatch[1]} dispatch`,
      description: `${dispatchMatch[2]} loads into CPU`,
      detail: "Context switch moves the process into RUNNING.",
      jobId: dispatchMatch[2],
      coreId: Number(dispatchMatch[1])
    });
  }

  const systemCallMatch = trimmed.match(/Requesting (\d+) Watts/);
  if (systemCallMatch && currentCoreContext && runningJobs[currentCoreContext]) {
    const job = getJob(runningJobs[currentCoreContext]);
    job.mode = "KERNEL";
    job.systemCalls += 1;
    job.requestWatts = Number(systemCallMatch[1]);
    events.push({
      type: "syscall",
      title: "System call",
      description: `${job.jobId} requests ${job.requestWatts} W`,
      detail: "User process enters kernel mode to request energy.",
      jobId: job.jobId,
      coreId: currentCoreContext,
      requestWatts: job.requestWatts
    });
  }

  const allocationMatch = trimmed.match(/Access (GRANTED|DENIED)/);
  if (allocationMatch) {
    const granted = allocationMatch[1] === "GRANTED";
    if (granted) {
      counters.allocationsGranted += 1;
    } else {
      counters.allocationsDenied += 1;
    }
    if (currentCoreContext && runningJobs[currentCoreContext]) {
      const job = getJob(runningJobs[currentCoreContext]);
      job.energyGranted = granted;
      job.mode = "USER";
    }
    events.push({
      type: "allocation",
      title: granted ? "Energy granted" : "Energy denied",
      description: granted ? "Safe state maintained" : "Unsafe state blocked",
      detail: granted
        ? "Banker's Algorithm verified a safe sequence before granting resources."
        : "Banker's Algorithm rejected the request to avoid deadlock.",
      safe: granted,
      jobId: currentCoreContext ? runningJobs[currentCoreContext] : null,
      coreId: currentCoreContext
    });
    lastAllocationEventIndex = events.length - 1;
  }

  const allocationDetailMatch = trimmed.match(/Allocated: Solar=(\d+)W, Grid=(\d+)W, Battery=(\d+)W/);
  if (allocationDetailMatch && currentCoreContext && runningJobs[currentCoreContext]) {
    const job = getJob(runningJobs[currentCoreContext]);
    job.allocation = {
      solar: Number(allocationDetailMatch[1]),
      grid: Number(allocationDetailMatch[2]),
      battery: Number(allocationDetailMatch[3])
    };
    if (lastAllocationEventIndex !== null) {
      events[lastAllocationEventIndex].allocation = { ...job.allocation };
    }
  }

  const availableAfterMatch = trimmed.match(/Available: Solar=(\d+)W, Grid=(\d+)W, Battery=(\d+)W/);
  if (availableAfterMatch && lastAllocationEventIndex !== null) {
    events[lastAllocationEventIndex].availableAfter = {
      solar: Number(availableAfterMatch[1]),
      grid: Number(availableAfterMatch[2]),
      battery: Number(availableAfterMatch[3])
    };
  }

  const sliceMatch = trimmed.match(/Executing slice for (\d+) seconds \(Remaining before slice: (\d+) seconds\)/);
  if (sliceMatch) {
    const slice = Number(sliceMatch[1]);
    const remainingBefore = Number(sliceMatch[2]);
    if (currentCoreContext && runningJobs[currentCoreContext]) {
      const job = getJob(runningJobs[currentCoreContext]);
      if (job.burstTime === null) {
        job.burstTime = remainingBefore;
      }
      job.lastSlice = slice;
      job.remaining = Math.max(remainingBefore - slice, 0);
    }
    counters.slices.push(slice);
    events.push({
      type: "slice",
      title: "Time slice",
      description: `CPU executes for ${slice} seconds`,
      detail: "Round Robin time slice executes the current job.",
      jobId: currentCoreContext ? runningJobs[currentCoreContext] : null,
      coreId: currentCoreContext,
      remainingBefore,
      remainingAfter: Math.max(remainingBefore - slice, 0)
    });
  }

  const finishMatch = trimmed.match(/\[CORE (\d+)\] \[\-\] FINISHED (JOB_\d+)/);
  if (finishMatch) {
    counters.finishes += 1;
    counters.cores[Number(finishMatch[1])].finishes += 1;
    const job = getJob(finishMatch[2]);
    job.state = "TERMINATED";
    job.coreId = Number(finishMatch[1]);
    runningJobs[job.coreId] = null;
    currentCoreContext = job.coreId;
    stateContextJobId = job.jobId;
    lastFinishJobId = job.jobId;
    events.push({
      type: "finish",
      title: `Core ${finishMatch[1]} finished`,
      description: `${finishMatch[2]} terminates`,
      detail: "Resources are released and the process enters TERMINATED.",
      jobId: finishMatch[2],
      coreId: Number(finishMatch[1])
    });
    lastFinishEventIndex = events.length - 1;
  }

  const outcomeMatch = trimmed.match(/Final Outcome: (SUCCESS|FAILED)/);
  if (outcomeMatch && lastFinishJobId) {
    const job = getJob(lastFinishJobId);
    job.outcome = outcomeMatch[1];
    if (lastFinishEventIndex !== null) {
      events[lastFinishEventIndex].outcome = outcomeMatch[1];
    }
  }
});

function renderSummary() {
  const container = document.getElementById("summary-cards");
  const items = [
    { label: "Quantum", value: summary.quantum ? `${summary.quantum} sec` : "--" },
    { label: "Jobs", value: summary.totalJobs ?? "--" },
    { label: "Slices", value: summary.slices ?? "--" },
    { label: "Preemptions", value: summary.preemptions ?? "--" },
    { label: "Success", value: summary.success ?? "--" },
    { label: "Failed", value: summary.failed ?? "--" }
  ];

  container.innerHTML = items
    .map(
      (item) => `
      <div class="stat-card">
        <h4>${item.label}</h4>
        <div class="value">${item.value}</div>
      </div>`
    )
    .join("");
}

function renderConfig() {
  const config = document.getElementById("run-config");
  const items = [
    { label: "Available Solar", value: summary.available ? `${summary.available[0]}W` : "--" },
    { label: "Available Grid", value: summary.available ? `${summary.available[1]}W` : "--" },
    { label: "Available Battery", value: summary.available ? `${summary.available[2]}W` : "--" },
    { label: "Max Solar/Job", value: summary.maxPerJob ? `${summary.maxPerJob[0]}W` : "--" },
    { label: "Max Grid/Job", value: summary.maxPerJob ? `${summary.maxPerJob[1]}W` : "--" },
    { label: "Max Battery/Job", value: summary.maxPerJob ? `${summary.maxPerJob[2]}W` : "--" }
  ];

  config.innerHTML = items
    .map(
      (item) => `
      <div class="panel-row">
        <span>${item.label}</span>
        <span>${item.value}</span>
      </div>`
    )
    .join("");
}

function renderStates() {
  const container = document.getElementById("state-chips");
  const chips = Array.from(stateUsage).sort();
  container.innerHTML = chips.map((state) => `<span>${state}</span>`).join("");
}

function renderMetrics() {
  const quantum = document.getElementById("rr-quantum");
  const available = document.getElementById("banker-available");
  if (summary.quantum) {
    quantum.textContent = `Quantum: ${summary.quantum} sec`;
  }
  if (summary.available) {
    available.textContent = `Available: ${summary.available.join(" / ")} W`;
  }
}

function renderConceptDetails() {
  const pcb = document.getElementById("pcb-details");
  const rr = document.getElementById("rr-details");
  const quantumDetail = document.getElementById("quantum-details");
  const contextDetail = document.getElementById("context-details");
  const banker = document.getElementById("banker-details");
  const syscall = document.getElementById("syscall-details");
  const sync = document.getElementById("sync-details");
  const queue = document.getElementById("queue-details");

  const buildRows = (items) =>
    items
      .map(
        (item) => `
        <div class="detail-row">
          <span>${item.label}</span>
          <span>${item.value}</span>
        </div>`
      )
      .join("");

  pcb.innerHTML = buildRows([
    { label: "Jobs admitted", value: counters.admissions },
    { label: "State transitions", value: counters.transitions },
    { label: "Jobs finished", value: counters.finishes }
  ]);

  const averageSlice = counters.slices.length
    ? (counters.slices.reduce((sum, value) => sum + value, 0) / counters.slices.length).toFixed(1)
    : "--";

  rr.innerHTML = buildRows([
    { label: "Quantum", value: summary.quantum ? `${summary.quantum} sec` : "--" },
    { label: "Avg slice", value: `${averageSlice} sec` },
    { label: "Preemptions", value: summary.preemptions ?? "--" },
    { label: "Context switch", value: summary.contextSwitch ? `${summary.contextSwitch} sec` : "--" }
  ]);

  quantumDetail.innerHTML = buildRows([
    { label: "Rule", value: "P80(burst_times)" },
    { label: "Selected", value: summary.quantum ? `${summary.quantum} sec` : "--" },
    { label: "Slices executed", value: summary.slices ?? "--" }
  ]);

  contextDetail.innerHTML = buildRows([
    { label: "Overhead", value: summary.contextSwitch ? `${summary.contextSwitch} sec` : "--" },
    { label: "Dispatches", value: counters.dispatches },
    { label: "Transitions", value: counters.transitions }
  ]);

  const totalRequests = counters.allocationsGranted + counters.allocationsDenied;
  banker.innerHTML = buildRows([
    { label: "Requests", value: totalRequests },
    { label: "Granted", value: counters.allocationsGranted },
    { label: "Denied", value: counters.allocationsDenied },
    {
      label: "Available",
      value: summary.available ? `${summary.available.join(" / ")} W` : "--"
    }
  ]);

  syscall.innerHTML = buildRows([
    { label: "System call", value: "sim_request_resource()" },
    { label: "Mode switch", value: "USER -> KERNEL" },
    { label: "Energy request", value: "Solar / Grid / Battery" }
  ]);

  sync.innerHTML = buildRows([
    { label: "Semaphores", value: "empty_slots, full_slots" },
    { label: "Mutexes", value: "queue, energy, print" },
    { label: "Goal", value: "safe shared state" }
  ]);

  queue.innerHTML = buildRows([
    { label: "Producer", value: "job_generator" },
    { label: "Consumers", value: "CPU cores" },
    { label: "Queue flow", value: "NEW -> READY" }
  ]);
}

function computeP80(values) {
  if (!values.length) {
    return { quantum: 0, ordered: [] };
  }
  const ordered = [...values].sort((a, b) => a - b);
  const index = Math.max(Math.ceil(0.8 * ordered.length) - 1, 0);
  return { quantum: ordered[index], ordered };
}

function renderQuantumTool() {
  const table = document.getElementById("quantum-table");
  const result = document.getElementById("quantum-result");
  if (!table || !result) {
    return;
  }

  const jobList = Array.from(jobs.values())
    .filter((job) => typeof job.burstTime === "number")
    .map((job) => ({ id: job.jobId, burst: job.burstTime }));

  const baseValues = jobList.length
    ? jobList
    : [
        { id: "JOB_A", burst: 2 },
        { id: "JOB_B", burst: 3 },
        { id: "JOB_C", burst: 1 }
      ];

  table.innerHTML = [
    `<div class="quantum-head">Job</div>`,
    `<div class="quantum-head">Burst</div>`,
    ...baseValues.flatMap(
      (job, index) => [
        `<div class="quantum-row">${job.id}</div>`,
        `<input class="quantum-input" type="number" min="1" value="${job.burst}" data-idx="${index}" />`
      ]
    )
  ].join("");

  const recalc = () => {
    const inputs = Array.from(table.querySelectorAll(".quantum-input"));
    const bursts = inputs.map((input) => Number(input.value || 0)).filter((value) => value > 0);
    const { quantum, ordered } = computeP80(bursts);
    const formula = `Q = P80(burst_times)`;
    result.innerHTML = `
      <div>${formula}</div>
      <div>Sorted: [${ordered.join(", ")}]</div>
      <div>Selected quantum: <strong>${quantum || "--"} sec</strong></div>
    `;

    const quantumDetail = document.getElementById("quantum-details");
    if (quantumDetail) {
      quantumDetail.innerHTML = `
        <div class="detail-row"><span>Rule</span><span>P80(burst_times)</span></div>
        <div class="detail-row"><span>Selected</span><span>${quantum || "--"} sec</span></div>
        <div class="detail-row"><span>Jobs</span><span>${bursts.length}</span></div>
      `;
    }
  };

  table.addEventListener("input", (event) => {
    if (event.target.classList.contains("quantum-input")) {
      recalc();
    }
  });

  const recalcButton = document.getElementById("quantum-recalc");
  if (recalcButton) {
    recalcButton.onclick = recalc;
  }

  recalc();
}

function renderFilters() {
  const filterRow = document.getElementById("event-filters");
  filterRow.innerHTML = eventTypes
    .map(
      (type, index) => `
      <button data-filter="${type.id}" class="${index === 0 ? "active" : ""}">${type.label}</button>`
    )
    .join("");
}

let currentFilter = "all";
let currentIndex = 0;
let currentGlobalIndex = 0;

function buildSimulationState(untilIndex) {
  const queue = [];
  const cores = { 1: null, 2: null };
  const completed = [];

  events.slice(0, untilIndex + 1).forEach((event) => {
    if (event.type === "admission" && event.jobId) {
      queue.push(event.jobId);
    }

    if (event.type === "dispatch" && event.jobId) {
      const queueIndex = queue.indexOf(event.jobId);
      if (queueIndex !== -1) {
        queue.splice(queueIndex, 1);
      }
      cores[event.coreId] = event.jobId;
    }

    if (event.type === "finish" && event.jobId) {
      if (cores[event.coreId] === event.jobId) {
        cores[event.coreId] = null;
      }
      completed.push(event.jobId);
    }
  });

  return { queue, cores, completed };
}

function renderSimulation() {
  const queueLane = document.getElementById("queue-lane");
  const core1 = document.getElementById("core-1");
  const core2 = document.getElementById("core-2");
  const done = document.getElementById("done-lane");

  const state = buildSimulationState(currentGlobalIndex);

  queueLane.innerHTML = state.queue
    .map((job) => `<div class="job-chip" data-job-id="${job}">${job}</div>`)
    .join("");
  core1.innerHTML = state.cores[1]
    ? `<div class="job-chip" data-job-id="${state.cores[1]}">${state.cores[1]}</div>`
    : "";
  core2.innerHTML = state.cores[2]
    ? `<div class="job-chip" data-job-id="${state.cores[2]}">${state.cores[2]}</div>`
    : "";
  done.innerHTML = state.completed
    .map((job) => `<div class="job-chip" data-job-id="${job}">${job}</div>`)
    .join("");
}

function renderCoreStats() {
  const container = document.getElementById("core-stats");
  const state = buildSimulationState(currentGlobalIndex);

  container.innerHTML = [1, 2]
    .map((coreId) => {
      const activeJob = state.cores[coreId] || "Idle";
      const dispatches = counters.cores[coreId].dispatches;
      const finishes = counters.cores[coreId].finishes;
      return `
        <div class="core-card">
          <h4>Core ${coreId}</h4>
          <div class="core-row"><span>Active</span><span>${activeJob}</span></div>
          <div class="core-row"><span>Dispatches</span><span>${dispatches}</span></div>
          <div class="core-row"><span>Finished</span><span>${finishes}</span></div>
        </div>`;
    })
    .join("");
}

function findLastAllocation(index) {
  for (let i = index; i >= 0; i -= 1) {
    const event = events[i];
    if (event.type === "allocation") {
      return event;
    }
  }
  return null;
}

function findLastAllocationForJob(index, jobId) {
  for (let i = index; i >= 0; i -= 1) {
    const event = events[i];
    if (event.type === "allocation" && event.jobId === jobId) {
      return event;
    }
  }
  return null;
}

function renderSafeState() {
  const indicator = document.getElementById("safe-indicator");
  const detail = document.getElementById("safe-detail");
  const matrixGrid = document.getElementById("matrix-grid");
  const allocation = lastSelectedJobId
    ? findLastAllocationForJob(currentGlobalIndex, lastSelectedJobId)
    : findLastAllocation(currentGlobalIndex);

  if (!allocation) {
    indicator.className = "safe-indicator";
    indicator.textContent = "No allocation yet";
    detail.textContent = "Step through the timeline to see a safe-state decision.";
    matrixGrid.innerHTML = "";
    return;
  }

  const safeState = simulateUnsafe ? false : allocation.safe;
  indicator.className = `safe-indicator ${safeState ? "safe" : "unsafe"}`;
  indicator.textContent = safeState ? "SAFE STATE" : "UNSAFE STATE";
  const jobLabel = allocation.jobId || "Unknown job";
  const coreLabel = allocation.coreId ? `Core ${allocation.coreId}` : "Unknown core";
  const unsafeNote = simulateUnsafe
    ? "Override: request exceeds available resources, allocation denied."
    : "";
  detail.innerHTML = `
    <div>Decision: ${safeState ? "Granted" : "Denied"}</div>
    <div>Job: ${jobLabel}</div>
    <div>Core: ${coreLabel}</div>
    ${unsafeNote ? `<div>${unsafeNote}</div>` : ""}
  `;

  const max = summary.maxPerJob
    ? { solar: summary.maxPerJob[0], grid: summary.maxPerJob[1], battery: summary.maxPerJob[2] }
    : null;
  const alloc = allocation.allocation || null;
  const need = max && alloc
    ? { solar: Math.max(max.solar - alloc.solar, 0), grid: Math.max(max.grid - alloc.grid, 0), battery: Math.max(max.battery - alloc.battery, 0) }
    : null;
  const availableAfter = allocation.availableAfter || null;
  const availableBefore = alloc && availableAfter
    ? {
        solar: availableAfter.solar + alloc.solar,
        grid: availableAfter.grid + alloc.grid,
        battery: availableAfter.battery + alloc.battery
      }
    : null;
  const request = alloc && availableBefore
    ? {
        solar: availableBefore.solar + 10,
        grid: availableBefore.grid + 20,
        battery: availableBefore.battery + 5
      }
    : null;
  const unsafeAvailableAfter = availableBefore
    ? {
        solar: Math.max(availableBefore.solar - (request ? request.solar : 0), 0),
        grid: Math.max(availableBefore.grid - (request ? request.grid : 0), 0),
        battery: Math.max(availableBefore.battery - (request ? request.battery : 0), 0)
      }
    : null;

  const finalAvailableAfter = simulateUnsafe ? unsafeAvailableAfter : availableAfter;

  const rows = [
    { label: "Max", values: max },
    { label: "Alloc", values: alloc },
    { label: "Need", values: need },
    { label: "Request", values: simulateUnsafe ? request : null },
    { label: "Avail (Before)", values: availableBefore },
    { label: "Avail (After)", values: finalAvailableAfter }
  ].filter((row) => row.values);

  if (rows.length === 0) {
    matrixGrid.innerHTML = "";
    return;
  }

  matrixGrid.innerHTML = [
    "<div class=\"matrix-head\"></div>",
    "<div class=\"matrix-head\">Solar</div>",
    "<div class=\"matrix-head\">Grid</div>",
    "<div class=\"matrix-head\">Battery</div>",
    ...rows.flatMap((row) => [
      `<div class=\"matrix-row-label\">${row.label}</div>`,
      `<div class=\"matrix-cell\">${row.values.solar}W</div>`,
      `<div class=\"matrix-cell\">${row.values.grid}W</div>`,
      `<div class=\"matrix-cell\">${row.values.battery}W</div>`
    ])
  ].join("");
}

function buildJobSnapshot(untilIndex, jobId) {
  if (!jobId || !jobs.has(jobId)) {
    return null;
  }
  const base = jobs.get(jobId);
  const snapshot = {
    jobId: base.jobId,
    processId: base.processId,
    coreId: base.coreId,
    state: "NEW",
    mode: "USER",
    burstTime: base.burstTime,
    remainingBefore: base.remainingBefore,
    remaining: base.remaining,
    lastSlice: base.lastSlice,
    requestWatts: null,
    energyGranted: null,
    allocation: null,
    outcome: null
  };

  events.slice(0, untilIndex + 1).forEach((event) => {
    if (event.jobId !== jobId) {
      return;
    }
    if (event.type === "admission") {
      snapshot.state = "READY";
    }
    if (event.type === "dispatch") {
      snapshot.state = "RUNNING";
      snapshot.coreId = event.coreId;
    }
    if (event.type === "syscall") {
      snapshot.mode = "KERNEL";
      snapshot.requestWatts = event.requestWatts;
    }
    if (event.type === "allocation") {
      snapshot.mode = "USER";
      snapshot.energyGranted = event.safe;
      if (event.allocation) {
        snapshot.allocation = event.allocation;
      }
    }
    if (event.type === "slice") {
      snapshot.lastSlice = event.remainingBefore - event.remainingAfter;
      if (snapshot.burstTime === null || snapshot.burstTime === undefined) {
        snapshot.burstTime = event.remainingBefore;
      }
      snapshot.remainingBefore = event.remainingBefore;
      snapshot.remaining = event.remainingAfter;
    }
    if (event.type === "finish") {
      snapshot.state = "TERMINATED";
      snapshot.outcome = event.outcome || snapshot.outcome;
    }
  });

  return snapshot;
}

function renderJobInspector() {
  const grid = document.getElementById("pcb-grid");
  const lifecycle = document.getElementById("lifecycle-steps");
  const job = lastSelectedJobId ? buildJobSnapshot(currentGlobalIndex, lastSelectedJobId) : null;
  const jobAllocation = lastSelectedJobId
    ? findLastAllocationForJob(currentGlobalIndex, lastSelectedJobId)
    : null;

  if (!job) {
    grid.innerHTML = "<div class=\"pcb-row\"><span>Job</span><span>--</span></div>";
    lifecycle.innerHTML = ["NEW", "READY", "RUNNING", "TERMINATED"]
      .map((state) => `<span>${state}</span>`)
      .join("");
    return;
  }

  if (simulateUnsafe && jobAllocation) {
    job.energyGranted = false;
  }

  const allocationText = job.allocation
    ? `${job.allocation.solar}/${job.allocation.grid}/${job.allocation.battery} W`
    : "--";

  const renderBarRow = (label, value, max) => {
    if (value === null || value === undefined || value === "--") {
      return `
        <div class="pcb-row">
          <span>${label}</span>
          <span class="pcb-value">--</span>
        </div>`;
    }
    const percent = max ? Math.min((value / max) * 100, 100) : 0;
    return `
      <div class="pcb-row">
        <span>${label}</span>
        <div class="pcb-bar"><div class="pcb-bar-fill" style="width: ${percent}%"></div></div>
        <span class="pcb-value">${value}</span>
      </div>`;
  };

  const burstMax = job.burstTime || job.remaining || 0;
  const sliceMax = summary.quantum || job.lastSlice || 1;
  const requestMax = summary.maxPerJob ? summary.maxPerJob.reduce((sum, val) => sum + val, 0) : 1;
  const modeIsKernel = job.mode === "KERNEL";
  const modeSwitch = `
    <div class="mode-switch ${modeIsKernel ? "kernel" : "user"}">
      <span class="mode-label">USER</span>
      <div class="mode-track"><div class="mode-knob"></div></div>
      <span class="mode-label">KERNEL</span>
    </div>`;

  grid.innerHTML = [
    `<div class="pcb-row"><span>Job ID</span><span class="pcb-value">${job.jobId}</span></div>`,
    `<div class="pcb-row"><span>Process ID</span><span class="pcb-value">${job.processId ?? "--"}</span></div>`,
    `<div class="pcb-row"><span>Core</span><span class="pcb-value">${job.coreId ?? "--"}</span></div>`,
    `<div class="pcb-row"><span>State</span><span class="pcb-value">${job.state ?? "--"}</span></div>`,
    `<div class="pcb-row"><span>Mode</span>${modeSwitch}</div>`,
    renderBarRow("Burst time", job.burstTime ?? null, burstMax),
    renderBarRow("Remaining (before)", job.remainingBefore ?? null, burstMax),
    renderBarRow("Remaining", job.remaining ?? null, burstMax),
    renderBarRow("Last slice", job.lastSlice ?? null, sliceMax),
    renderBarRow("Request (W)", job.requestWatts ?? null, requestMax),
    `<div class="pcb-row"><span>Energy</span><span class="pcb-value">${job.energyGranted === null ? "--" : job.energyGranted ? "Granted" : "Cannot grant"}</span></div>`,
    `<div class="pcb-row"><span>Allocation</span><span class="pcb-value">${allocationText}</span></div>`,
    `<div class="pcb-row"><span>Outcome</span><span class="pcb-value">${job.outcome ?? "--"}</span></div>`
  ].join("");

  const lifecycleSteps = ["NEW", "READY", "RUNNING", "TERMINATED"];
  lifecycle.innerHTML = lifecycleSteps
    .map(
      (state) => `<span class="${job.state === state ? "active" : ""}">${state}</span>`
    )
    .join("");
}

function renderEvents() {
  const list = document.getElementById("event-list");
  const filtered = events
    .map((event, index) => ({ event, index }))
    .filter((item) => currentFilter === "all" || item.event.type === currentFilter);

  list.innerHTML = filtered
    .map(
      (item, index) => `
      <div class="event-item ${index === currentIndex ? "active" : ""}" data-index="${index}" data-global="${item.index}">
        <div class="event-tag">${item.event.type}</div>
        <div class="event-main">
          <div class="event-title">${item.event.title}</div>
          <div class="event-desc">${item.event.description}</div>
        </div>
      </div>`
    )
    .join("");

  if (filtered[currentIndex]) {
    currentGlobalIndex = filtered[currentIndex].index;
    updateDetail(filtered[currentIndex].event);
    if (filtered[currentIndex].event.jobId) {
      lastSelectedJobId = filtered[currentIndex].event.jobId;
    }
  }
  renderSimulation();
  renderCoreStats();
  renderSafeState();
  renderJobInspector();
}

function updateDetail(event) {
  const detail = document.getElementById("event-detail");
  if (!event) {
    detail.innerHTML = "<p>No events available for this filter.</p>";
    return;
  }
  detail.innerHTML = `
    <h4>${event.title}</h4>
    <p>${event.detail}</p>
    <p><strong>Context:</strong> ${event.description}</p>`;
}

function renderBankerState() {
  const availableGrid = document.getElementById("available-grid");
  const table = document.getElementById("banker-table");

  if (bankerState.available) {
    const labels = ["Solar", "Grid", "Battery"];
    availableGrid.innerHTML = bankerState.available
      .map(
        (value, index) => `
        <div class="resource-row">
          <span>${labels[index]}</span>
          <span>${value}W</span>
        </div>`
      )
      .join("");
  }

  table.innerHTML = bankerState.processes
    .map((process) => {
      const alloc = process.allocated ? process.allocated.join(" / ") : "-";
      const need = process.need ? process.need.join(" / ") : "-";
      return `
        <tr>
          <td>P${process.id}</td>
          <td>${alloc}</td>
          <td>${need}</td>
        </tr>`;
    })
    .join("");
}

function bindFilters() {
  const filterRow = document.getElementById("event-filters");
  filterRow.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) {
      return;
    }
    currentFilter = button.dataset.filter;
    currentIndex = 0;
    Array.from(filterRow.querySelectorAll("button")).forEach((btn) => {
      btn.classList.toggle("active", btn === button);
    });
    renderEvents();
  });
}

function bindStepper() {
  document.getElementById("step-next").addEventListener("click", () => {
    const filtered = events.filter((event) => currentFilter === "all" || event.type === currentFilter);
    if (filtered.length === 0) {
      return;
    }
    currentIndex = Math.min(currentIndex + 1, filtered.length - 1);
    renderEvents();
  });

  document.getElementById("step-prev").addEventListener("click", () => {
    const filtered = events.filter((event) => currentFilter === "all" || event.type === currentFilter);
    if (filtered.length === 0) {
      return;
    }
    currentIndex = Math.max(currentIndex - 1, 0);
    renderEvents();
  });

  document.getElementById("step-reset").addEventListener("click", () => {
    currentIndex = 0;
    renderEvents();
  });
}

function bindEventSelection() {
  document.getElementById("event-list").addEventListener("click", (event) => {
    const item = event.target.closest(".event-item");
    if (!item) {
      return;
    }
    currentIndex = Number(item.dataset.index);
    currentGlobalIndex = Number(item.dataset.global);
    renderEvents();
  });
}

function bindJobSelection() {
  const container = document.getElementById("run");
  container.addEventListener("click", (event) => {
    const chip = event.target.closest(".job-chip");
    if (!chip || !chip.dataset.jobId) {
      return;
    }
    lastSelectedJobId = chip.dataset.jobId;
    renderJobInspector();
  });
}

function bindUnsafeToggle() {
  const toggle = document.getElementById("unsafe-toggle");
  if (!toggle) {
    return;
  }
  toggle.addEventListener("change", (event) => {
    simulateUnsafe = event.target.checked;
    renderSafeState();
  });
}

function bindScrollButtons() {
  document.querySelectorAll("[data-scroll]").forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.dataset.scroll;
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

function init() {
  renderSummary();
  renderConfig();
  renderStates();
  renderMetrics();
  renderConceptDetails();
  renderQuantumTool();
  renderFilters();
  renderEvents();
  renderBankerState();
  renderSimulation();
  bindFilters();
  bindStepper();
  bindEventSelection();
  bindJobSelection();
  bindUnsafeToggle();
  bindScrollButtons();
}

init();
