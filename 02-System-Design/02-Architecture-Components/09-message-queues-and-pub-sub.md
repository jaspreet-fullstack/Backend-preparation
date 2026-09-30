# Message Queues and Pub/Sub

Both patterns let one service hand work to another without waiting for it to finish. This helps handle slow work and sudden traffic bursts.

## Difference

- In a **queue**, workers share the work; each task is normally handled by one worker.
- In **pub/sub**, one event can be sent to several interested services.

```text
Queue:  Producer -> Queue -> Worker A or Worker B

Pub/sub:
Publisher -> Topic -> Subscriber A
					-> Subscriber B
```

## Tradeoffs and failure handling

- Messages may arrive late, more than once, or in a different order.
- An **acknowledgement** confirms work finished. Retry failures, and move repeatedly failing messages to a **dead-letter queue** for review.
- Make handling safe to repeat (idempotent) in case a message is delivered twice.
- Preserve order only where the feature needs it; strict ordering can limit how much work runs at once.

## Interview answer

Use a queue for background tasks shared among workers, or pub/sub when several services need the same event. Explain retries, duplicate messages, and whether order matters.