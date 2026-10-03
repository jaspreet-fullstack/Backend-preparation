# Synchronous vs. Asynchronous Communication

In **synchronous communication**, one service waits for another service's response. In **asynchronous communication**, it hands off the work and continues; the work may be handled by a queue or another service later.

| Synchronous | Asynchronous |
| --- | --- |
| Direct request and response; caller waits for the result | Work happens later; caller may first get confirmation that it was accepted |
| Useful when the user needs an immediate result | Useful for slow work, traffic bursts, or notifying several services |
| Caller depends on the other service being available | Requires tracking work, retrying failures, and handling results that arrive later |

## Interview reminder

Choose based on whether the user needs the result right away and what must remain correct. For queued work, explain how it is confirmed, tracked, retried, and protected from being done twice.

## Short answer

Use synchronous calls when the caller needs an immediate result. Use asynchronous work when a task can finish later or needs to handle bursts, and explain how its result and failures are tracked.