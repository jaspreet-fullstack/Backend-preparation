# RabbitMQ Acknowledgements, Retries, and Dead-Letter Queues

An acknowledgement tells RabbitMQ that a consumer finished a message. Delivery and retry settings decide what happens when work fails.

## Consumer handling

- With **manual acknowledgement**, the consumer acks only after the work succeeds. If it fails first, RabbitMQ can deliver the message again; duplicate work is possible.
- With **automatic acknowledgement**, RabbitMQ treats the message as handled when it sends it. A consumer crash can lose unfinished work.
- Use a bounded retry plan. Immediate requeue can create a tight failure loop; delayed retries can use a retry queue with a TTL (time to live).
- A **dead-letter exchange (DLX)** can route rejected, expired, or repeatedly failed messages to a dead-letter queue for inspection or later handling.
- Set a **prefetch** limit to cap how many unacknowledged messages one consumer holds at a time.

```text
Queue -> Consumer --success--> ack
                    `--failure--> retry -> repeated failure -> dead-letter queue
```

## Producer confirms

Publisher confirms tell a producer whether RabbitMQ accepted a published message. They are different from consumer acknowledgements, which report that processing finished.

## Interview answer

Use manual acknowledgements when work must not be considered done before processing succeeds. Explain duplicate handling, bounded retries, dead-lettering, and producer confirms separately.