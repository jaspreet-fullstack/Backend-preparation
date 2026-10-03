# RabbitMQ vs Kafka

Both are used for **asynchronous communication**, but their main use cases are different.

| | **RabbitMQ** | **Kafka** |
|---|---|---|
| Main idea | **Message broker / task queue** | **Event streaming platform** |
| Message handling | Message goes to a queue for processing | Event is stored in a topic partition |
| Multiple consumers | Consumers in one queue **share the work** | Different consumer groups can **read independently** |
| Replay | Not the main use case | **Supported through retention and offsets** |
| Routing | Exchanges + routing keys | Topic + partition + key |
| Ordering | Mainly within a queue; multiple consumers can affect processing order | **Within a partition** |
| Common use | Background jobs, task processing | Events, analytics, event-driven systems |

## When to Use

### RabbitMQ

Use when:

- A **job needs to be processed by a worker**.
- You need flexible routing.
- You need acknowledgements, retries, and dead-letter queues.

Example:

```text id="r7j4va"
Order → RabbitMQ → Payment Worker
```

> **RabbitMQ = "Process this job."**

### Kafka

Use when:

- Multiple services need the **same events**.
- You need high-volume event processing.
- Events need to be **stored and replayed**.

Example:

```text id="j2x8fd"
Order Event → Kafka
                ├→ Inventory
                ├→ Analytics
                └→ Recommendations
```

> **Kafka = "Here is an event; different services can read it."**

## Easy Memory

> **RabbitMQ → Task / Worker / Queue**  
> **Kafka → Event / Stream / Replay**

## Interview Answer

> **RabbitMQ is commonly used for task processing where messages are routed to workers, with features like acknowledgements, retries, and dead-letter queues. Kafka is commonly used for event streaming where multiple services can independently consume and replay retained events. I would choose based on whether the requirement is mainly task processing or event streaming, along with routing, ordering, replay, scale, and failure-handling needs.**