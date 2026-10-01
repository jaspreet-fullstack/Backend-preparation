# RabbitMQ Durability, Scaling, and Failure Handling

## Keeping messages through restart

- Declare a queue **durable** so the queue definition survives a broker restart.
- Publish messages as **persistent** so RabbitMQ can save them with the queue.
- For stronger broker-node fault tolerance, consider **quorum queues**, which keep replicated copies. Confirm the required durability and performance settings for the RabbitMQ version in use.
- Durability settings add disk and replication work; they do not replace backups or correct consumer handling.

## Scaling

- Add consumers to process more messages from a queue in parallel. A message is normally delivered to one consumer, not every consumer.
- Use prefetch to avoid one slow consumer holding too many unacknowledged messages.
- A RabbitMQ cluster lets clients connect through multiple nodes, but a queue's leader and queue type affect how that queue scales and survives failure.
- Separate queues by work type when their processing speed, priority, or retry behavior differs.

```text
Producers -> Queue -> Worker A
                   -> Worker B
                   -> Worker C
```

## Interview answer

State whether messages must survive a restart, then explain durable queues, persistent messages, and replicated queue choices. For more processing capacity, add consumers and control in-flight work with prefetch.