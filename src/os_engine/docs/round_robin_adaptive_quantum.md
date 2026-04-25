# Round Robin Scheduling and Adaptive Time Quantum

## Overview

The `os_engine` module now uses a **Round Robin (RR)** scheduling model. That means each job receives a limited CPU slice, and if it does not finish within that slice, it is preempted and placed back in the ready queue.

This is a better fit for a multi-core OS simulation because it demonstrates:

- preemption
- fairness among jobs
- queue-based rescheduling
- the effect of context-switch overhead

## What Round Robin Means Here

In this simulator, each job has a `burst_time` and a `remaining_time`.

Execution flow:

1. A CPU core dequeues the next READY job.
2. The job is switched to RUNNING.
3. The scheduler runs the job for at most one quantum.
4. If the job still has remaining work, it is preempted.
5. The job is returned to the rear of the ready queue.
6. The next job gets CPU time.

This continues until all jobs terminate.

## Time Quantum

The time quantum is **computed from the actual workload of the current run**. 

The current rule is:

$$
Q = P_{80}(burst\_times)
$$

Where:
- `P80(burst_times)` is the 80th percentile of the burst-time values generated for the current simulation run

The context-switch overhead is still present in the simulation as a real scheduling cost, but it is **not used to compute the quantum**.

## Why the 80th Percentile Works Well

That gives you:
- a quantum based on the real job mix
- a value that changes with the current workload
- a slice length that is neither too small nor arbitrary

If the job mix changes in a future run, the quantum changes too.

## Context-Switch Overhead

Even though the overhead is not part of the quantum formula anymore, it still matters in practice because every preemption costs CPU time.

That means:
- very small quanta create more switching
- more switching reduces useful execution time
- the scheduler should still be judged against overhead when discussing performance

In other words, the quantum is selected from the workload, and the overhead is a **separate runtime cost** used for evaluation, not selection.

## Current `os_engine` Behavior

The current implementation does the following:

- generates burst times for the current run
- sorts them
- computes the 80th-percentile-based quantum
- prints the selected quantum at startup
- runs each slice up to that quantum
- preempts unfinished jobs
- requeues them at the end of the ready queue

## Why This Is Better Than Fixed FCFS

Compared with FCFS, Round Robin provides:

- better fairness
- better demonstration of preemption
- easier comparison of scheduling behavior
- more realistic OS-style time slicing

Compared with a random quantum, this approach is superior because it is:

- workload-driven
- reproducible
- explainable
- tied to measurable system overhead

## Mentor-Friendly Summary

A clear way to explain the choice is:

> The Round Robin quantum is chosen dynamically from the current workload rather than fixed arbitrarily. We compute it from the 80th percentile of the current run's burst times so that roughly 80% of jobs complete in one slice, and we only use the context-switch factor as a lower-bound safety check. This keeps the scheduler fair, reduces unnecessary switching, and adapts to the actual job distribution.
> The Round Robin quantum is chosen dynamically from the current workload rather than fixed arbitrarily. We compute it from the 80th percentile of the current run's burst times so that roughly 80% of jobs complete in one slice. Context-switch overhead is still part of the simulation cost, but it is not used to pick the quantum itself. This keeps the scheduler fair, explainable, and workload-driven.

## Notes for Future Improvement

If you later want more realism, you can replace the percentile rule with:

- weighted average burst time
- percentile-based quantum selection
- a moving average across multiple runs
- separate quanta for interactive and batch workloads

For now, the 80th-percentile adaptive quantum is simple, defensible, and easy to explain.
