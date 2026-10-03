# Kafka Interview Example: Order Events

## 1. Requirement

When an order is placed:

- Inventory, Analytics, and Recommendations must process the event independently.
- Analytics should be able to replay old events if needed.

## 2. Design

```text
Order API
    |
    v
PostgreSQL
(Order + Outbox Event)
    |
    v
Outbox Publisher
    |
    v
Kafka Topic: orders
(key = orderId)
    |
    |----> Inventory Group
    |
    |----> Analytics Group
    |
    |----> Recommendations Group
```

### How It Works

1. Save the **order and outbox event** in the same database transaction.
2. The outbox publisher sends the event to Kafka.
3. Each service uses its **own consumer group** to process the event independently.
4. Consumers commit offsets after successful processing.

Using `orderId` as the message key keeps events for the same order in the same partition, preserving their order.

## 3. Failure Handling

- **Idempotency:** Consumers safely handle duplicate events.
- **Replay:** Analytics can reset its offset and read retained events again.
- **Retention:** Kafka keeps events according to its configured retention period.

## 4. Tradeoffs

- **Asynchronous processing:** Other services may update their data after the order is created.
- **Partitions:** More partitions allow more parallel processing but add overhead.
- **Retention:** Old events cannot be replayed once they are deleted.

## Interview Answer

**I would use Kafka because multiple services need to process the same order events independently, and analytics requires replay. I would use a transactional outbox to reliably publish events, separate consumer groups for each service, and `orderId` as the message key to maintain per-order ordering. Consumers would also be idempotent to handle duplicate events.**