# RabbitMQ vs. Kafka

Both move messages between services, but their common models are different: RabbitMQ routes work to queues; Kafka stores a partitioned event log that consumers read by offset.

| Question | RabbitMQ | Kafka |
| --- | --- | --- |
| Common shape | A routed task waits in a queue for a worker | An event is appended to a topic partition |
| Multiple consumers | Workers on one queue share tasks; exchanges can route to several queues | Separate consumer groups can each read the same topic independently |
| Reading old messages | Queued messages are generally removed after successful acknowledgement | Retained records can be replayed while still within retention |
| Routing | Exchanges support direct, topic, fanout, and header-based routing | Producers choose a topic and key; partitions determine where records go |
| Ordering | Queue order can be affected by multiple consumers, retries, and redelivery | Order is preserved within a partition, not across the whole topic |

## Choose from the requirement

- Start with **RabbitMQ** when a job should go to a worker, with flexible routing, acknowledgement, retry, and dead-letter behavior.
- Start with **Kafka** when multiple applications need an event stream, high-volume partitioned processing, or replay from stored events.
- Either can support asynchronous systems. Compare delivery guarantees, ordering, scale, replay, operational skills, and failure handling for the specific workload.

## Interview answer

I would first clarify whether each message is work to complete or an event other services need to read later. Then I would select the broker that matches routing, retry, ordering, replay, scale, and operations requirements, and explain the tradeoffs.