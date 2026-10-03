# RabbitMQ Durability, Scaling, and Failure Handling

## 1. Durability

If messages need to survive a RabbitMQ restart:

- **Durable Queue** → Queue survives broker restart.
- **Persistent Message** → Message can be saved to disk.
- **Quorum Queue** → Keeps replicated copies for better failure protection.

> **Durable queue + persistent message = Messages can survive restart**

Durability adds disk and replication overhead.

## 2. Scaling Consumers

To process messages faster, add more consumers to the same queue.

```text id="n9i2ke"
              → Worker A
Queue ───────→ Worker B
              → Worker C
```

Normally, **one message is delivered to one consumer**, so multiple consumers can process different messages in parallel.

### Prefetch

**Prefetch** controls how many unacknowledged messages a consumer can hold.

> **Prefetch = Limits in-flight messages per consumer**

## 3. Failure Handling

If a consumer fails before acknowledging a message, RabbitMQ can **redeliver the message**.

For repeated failures:

```text id="w4rj4m"
Queue
  ↓
Consumer
  ↓ failure
Retry
  ↓ repeated failure
DLQ
```

Use **retries + dead-letter queues** to prevent failed messages from being retried forever.

## Interview Answer

> **For durability, I use durable queues and persistent messages when messages must survive a broker restart. For better failure protection, quorum queues can keep replicated copies. To scale processing, I add multiple consumers to a queue and use prefetch to control in-flight messages. Failed messages can be retried and eventually moved to a dead-letter queue.**