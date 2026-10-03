# Kafka Interview Example: Order Events

## Requirement

After an order is placed, inventory, analytics, and recommendations each need to process the event independently. Analytics must be able to replay events after a processing bug.

## Design

```text
Order API -> Order database + outbox -> Kafka topic: orders
                                         | key = orderId
                       +-----------------+------------------+
                       v                 v                  v
                 Inventory group  Analytics group  Recommendations group
```

The order service writes the order and an outbox record in one database transaction. A publisher sends the outbox event to Kafka. Each service uses its own consumer group and offset, so one service's progress does not move another's. Using `orderId` as the key keeps events for one order in the same partition.

Consumers commit offsets after processing and use event IDs or idempotent updates to handle a repeated event safely. Analytics can reset its offset and replay retained events; protect downstream systems from the replay load.

## Tradeoffs to discuss

- Consumers may update their systems later than the order was placed; the order API should not promise immediate completion of every downstream action.
- Choose partition count and key based on expected traffic; one very popular key can create a hot partition.
- State how long events are retained and what happens when a consumer falls behind that period.

## Interview answer

I would choose Kafka because several independent services need the same order events and analytics needs replay. I would partition by order ID for per-order ordering and make consumers safe to retry.