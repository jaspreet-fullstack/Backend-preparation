# Kafka Topics, Partitions, and Offsets

Kafka is a **distributed event streaming system**. It stores messages in **topics**, which are divided into **partitions**.

## 1. Topic

A **topic** is a named stream of related messages.

Example:

```text
orders
payments
notifications
```

> **Topic = Category of messages**

## 2. Partition

A topic is divided into **partitions**.

Each partition is an **ordered log**, and new messages are added to the end.

```text
orders
├── Partition 0 → A → B → C
└── Partition 1 → D → E → F
```

> **Partition = Ordered log inside a topic**

More partitions allow more consumers to process messages in parallel.

## 3. Offset

Each message has an **offset**, which identifies its position within a partition.

```text
Partition 0:
Offset 0 → A
Offset 1 → B
Offset 2 → C
```

> **Offset = Position of a message in a partition**

Consumers use offsets to track where they are in the partition.

## 4. Message Key

A message **key** can be used to decide which partition receives the message.

Messages with the same key are normally sent to the **same partition**, preserving their order.

Example:

```text
user-42 → Partition 0
user-42 → Partition 0
user-42 → Partition 0
```

## Important

> **Ordering is guaranteed within a partition, not across the entire topic.**

## Easy Memory

> **Topic = Category**  
> **Partition = Ordered log**  
> **Offset = Position**  
> **Key = Helps choose partition**

## Interview Answer

> **Kafka stores messages in topics, and topics are divided into partitions. Each partition is an ordered log, and every message has an offset that identifies its position. A message key can route related messages to the same partition, which preserves their order. Kafka guarantees ordering within a partition, not across the whole topic.**