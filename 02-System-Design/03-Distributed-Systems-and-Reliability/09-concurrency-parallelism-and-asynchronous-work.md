# Concurrency, Parallelism, and Asynchronous Work

These terms describe different ways work can happen:

- **Concurrency**: multiple tasks make progress during overlapping time. A single processor can switch between tasks.
- **Parallelism**: multiple tasks literally run at the same time on different processor cores or machines.
- **Asynchronous work**: a caller starts work and continues without waiting for its result. The work may finish later; this alone does not mean it runs in parallel.

```text
Concurrency on one processor:  Task A -> Task B -> Task A -> Task B
Parallel work:                 Core 1: Task A
                               Core 2: Task B
Async request:                 Start work -> continue -> result arrives later
```

## Interview example

A web server can handle many concurrent requests while waiting for database responses. Those waits are asynchronous, but do not necessarily run JavaScript or application code in parallel. CPU-heavy work needs multiple cores or workers to run in parallel.

## Short answer

Concurrency is overlapping progress; parallelism is work happening at the same time; asynchronous work means the caller does not wait for completion. Explain which one the design needs and what resource does the work.