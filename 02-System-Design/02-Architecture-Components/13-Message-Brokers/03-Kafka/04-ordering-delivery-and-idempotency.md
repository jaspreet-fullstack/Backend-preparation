# Kafka Ordering, Delivery, and Idempotency

## 1. Ordering

Kafka guarantees ordering **within a partition**.

If related messages need to stay in order, use the same **key**, such as `orderId`, so they go to the same partition.

```text id="j8x9m3"
order-101 → Partition 0
order-101 → Partition 0
order-101 → Partition 0
```

> **Same key → Same partition → Order preserved**

Kafka does **not** guarantee ordering across different partitions.

## 2. Delivery Guarantees

### At-Most-Once

Commit the offset **before processing**.

If the consumer crashes after committing but before processing:

> **Message can be lost, but it won't be processed again.**

### At-Least-Once

Process the message **first**, then commit the offset.

If the consumer crashes after processing but before committing:

> **Message can be processed again.**

This is commonly used when losing work is worse than duplicate processing.

## 3. Idempotency

Because at-least-once delivery can cause duplicates, consumers should be **idempotent**.

> **Idempotent = Processing the same message multiple times produces the same final result.**

Example:

```text id="1ok1a8"
Event ID: 123

First time  → Update order
Second time → Detect ID 123 → Skip
```

Common approaches:
- Store processed event IDs.
- Use database operations that are safe to repeat.

## Easy Memory

> **At-most-once → May lose, no duplicate**  
> **At-least-once → No intentional loss, may duplicate**  
> **Idempotency → Makes duplicates safe**

## Interview Answer

> **Kafka guarantees ordering within a partition, so I use the same key for events that must stay ordered. For delivery, at-most-once can lose messages, while at-least-once can deliver duplicates. I generally use at-least-once when work should not be lost and make the consumer idempotent so duplicate messages are safe to process.**