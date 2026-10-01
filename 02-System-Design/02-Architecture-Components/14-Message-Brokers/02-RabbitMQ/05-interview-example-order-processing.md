# RabbitMQ Interview Example: Order Processing

## Requirement

When a customer places an order, create one fulfillment job. Workers can process different orders in parallel. Failed jobs should be retried, and repeated failures should be visible to the team.

## Design

```text
Client -> Order API -> Order database
                           |
                     publish job
                           v
                    RabbitMQ exchange
                           |
                           v
                    Fulfillment queue
                     /             \
                 Worker A         Worker B
                     |
              success: ack
              repeated failure: dead-letter queue
```

The API saves the order, then publishes a job. A worker processes one job and acknowledges it only after success. Use bounded retries and route repeated failures to a dead-letter queue. Make the worker idempotent (safe to run the same job twice), because a crash after completing work but before the ack can cause redelivery.

If losing a job between saving the order and publishing it is unacceptable, discuss a **transactional outbox**: save the order and an outbox record in the same database transaction, then have a publisher send that record to RabbitMQ.

## Tradeoffs to mention

- The order API can respond before fulfillment finishes; show the customer a pending status.
- More workers increase throughput, but the database or fulfillment service may become the next bottleneck.
- A dead-letter queue needs alerting and an operational process to inspect or replay jobs.

## Interview answer

I would use RabbitMQ because each order creates a task for one worker, with acknowledgement and retry behavior. I would make processing idempotent and use an outbox if the order and message must not get out of sync.