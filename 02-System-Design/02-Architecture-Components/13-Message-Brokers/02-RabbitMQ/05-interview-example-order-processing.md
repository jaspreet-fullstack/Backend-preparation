# RabbitMQ Interview Example: Order Processing

## Requirement

When a customer places an order:

- Create a fulfillment job.
- Process multiple orders in parallel.
- Retry failed jobs.
- Move repeatedly failed jobs to a dead-letter queue.

## Design

```text
Client
  ↓
Order API
  ↓
Order Database
  ↓
RabbitMQ Exchange
  ↓
Fulfillment Queue
  ├── Worker A
  ├── Worker B
  └── Worker C
```

Each worker processes a message and sends an **ack only after successful processing**.

```text
Success → Ack
Failure → Retry
Repeated failure → Dead-Letter Queue
```

Workers should be **idempotent**, because a message can be delivered more than once.

### If Message Loss Is Unacceptable

There is a risk if the API:

```text
1. Saves order
2. Publishes to RabbitMQ
```

If the application crashes between these steps, the order is saved but the message may not be published.

Use a **Transactional Outbox**:

```text
Same DB Transaction
┌─────────────────────┐
│ Save Order          │
│ Save Outbox Event   │
└──────────┬──────────┘
           ↓
     Outbox Worker
           ↓
       RabbitMQ
           ↓
    Fulfillment Worker
```

The outbox event is a **database record** stored in PostgreSQL or any DB. A background worker reads pending records and publishes them to RabbitMQ.

## Tradeoffs

- **More workers** → higher processing capacity, but the database or downstream service can become the bottleneck.
- **Async processing** → API can respond before fulfillment finishes; order can show `PENDING`.
- **Retries** → improve reliability but need a limit to avoid infinite retry loops.
- **Dead-letter queue** → keeps repeatedly failed messages for inspection or replay.
- **Idempotency** → prevents duplicate processing when a message is redelivered.

## Interview Answer

> **I would use RabbitMQ to process fulfillment jobs asynchronously. The order API saves the order and publishes a job to RabbitMQ, where multiple workers can process orders in parallel. Workers acknowledge messages only after successful processing, with bounded retries and a dead-letter queue for repeated failures. I would make the workers idempotent because messages can be redelivered. If losing the message between the database write and RabbitMQ publish is unacceptable, I would use a transactional outbox.**