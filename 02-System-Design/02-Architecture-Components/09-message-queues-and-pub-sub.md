# Message Queues and Pub/Sub

Both patterns let one service hand work to another without waiting for it to finish. This helps handle slow work and sudden traffic bursts.

## Difference

- In a **queue**, workers share the work; each task is normally handled by one worker.
- In **pub/sub** (publisher/subscriber), a publisher sends an event to a topic on a broker. Subscribers choose topics they care about, and the broker delivers the event to them. The publisher does not need to know which services subscribe.

```text
Queue:  Producer -> Queue -> Worker A or Worker B

Pub/sub:
Publisher -> Topic -> Subscriber A
					-> Subscriber B
```

## RabbitMQ and Kafka

- **RabbitMQ** is a message broker mainly used for asynchronous communication and task-based workloads. Producers send messages to exchanges, which route them to queues, and consumers process and acknowledge those messages. If processing fails, messages can be requeued or sent to a dead-letter queue for retry or further handling.
- **Kafka** is a distributed event-streaming platform designed for high-throughput and durable event processing. Producers publish records to partitioned topics, and consumers read them using offsets. Records are retained based on the configured retention policy, so multiple consumer groups can independently consume or replay the same events.
- Both can support asynchronous messaging. Choose based on delivery, routing, replay, throughput, and ordering needs; they are not strict substitutes for one another.

For deeper interview notes, see [how to choose a broker](14-Message-Brokers/01-how-to-choose.md), the [RabbitMQ notes](14-Message-Brokers/02-RabbitMQ/01-components-and-message-flow.md), the [Kafka notes](14-Message-Brokers/03-Kafka/01-topics-partitions-and-offsets.md), and the [RabbitMQ vs. Kafka comparison](14-Message-Brokers/04-rabbitmq-vs-kafka.md).

## How to choose

| Need | Good starting choice |
| --- | --- |
| Send each task to one worker; use flexible routing, acknowledgements, and retries | **RabbitMQ** |
| Keep an event stream so several applications can read independently or replay old events | **Kafka** |

Before choosing, ask: Does each message represent work to complete, or an event other services may need to read later? Do consumers need independent replay? How much traffic and ordering does the system require? Also check the team's operational experience and the broker's delivery guarantees.

## Example: E-commerce orders

Suppose an order should create one fulfillment job. Any available worker can process it, and failed work should be retried. I would start with **RabbitMQ**: it routes the job to a worker, tracks acknowledgement, and supports retry and dead-letter handling.

If the requirement changes so inventory, analytics, and recommendations each need to read every `OrderCreated` event at their own pace, and analytics may need to replay older events, I would choose **Kafka** for that event stream.

```text
One fulfillment job -> RabbitMQ -> one available worker
Order event stream  -> Kafka -> inventory, analytics, recommendations
```

For an interview, state the message behavior you need first, then name the broker and explain the tradeoff. Do not choose by product popularity alone.

## Tradeoffs and failure handling

- Messages may arrive late, more than once, or in a different order.
- An **acknowledgement** confirms work finished. Retry failures, and move repeatedly failing messages to a **dead-letter queue** for review.
- Make handling safe to repeat (idempotent) in case a message is delivered twice.
- Preserve order only where the feature needs it; strict ordering can limit how much work runs at once.

## Interview answer

Use a queue for background tasks shared among workers, or pub/sub when several services need the same event. Explain retries, duplicate messages, and whether order matters.