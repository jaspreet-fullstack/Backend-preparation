# Kafka Topics, Partitions, and Offsets

Kafka is a distributed event log. It stores records in **topics**, which are split into **partitions** so they can be stored and read across multiple brokers.

- A **topic** is a named stream of related records, such as `orders`.
- A **partition** is an ordered log within a topic. New records are appended to its end.
- An **offset** is a record's position in one partition.
- A **key** can keep related records in the same partition, which preserves their order relative to one another.

```text
Topic: orders
Partition 0: offset 0 -> order A -> offset 1 -> order B
Partition 1: offset 0 -> order C -> offset 1 -> order D
```

Ordering is guaranteed within a partition, not across all partitions in a topic. More partitions can allow more work at once, but choosing the right key and partition count matters.

## Interview answer

Kafka stores events in partitioned topics. Offsets let consumers track their position, and a message key can keep related events ordered in the same partition.