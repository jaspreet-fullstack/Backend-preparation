# Kafka Producers, Consumers, and Consumer Groups

- A **producer** writes records to a topic. A record key helps Kafka choose its partition.
- A **consumer** reads records and tracks its position using offsets.
- A **consumer group** is a set of consumers sharing the work for a topic. Within one group, a partition is assigned to at most one consumer at a time.
- Different groups each read the topic independently, so separate services can process the same events.

```text
                         +-> Group A: inventory consumers
Producer -> Kafka topic -|
                         `-> Group B: analytics consumers
```

If a group has fewer consumers than partitions, some consumers handle several partitions. If it has more consumers than partitions, some consumers sit idle. When group membership changes, Kafka reassigns partitions (a **rebalance**), which can briefly pause work.

## Interview example

The inventory service and analytics service each use their own group to read `orders`. Inventory can process current orders while analytics replays or processes the stream separately.

## Interview answer

Use a consumer group to share partitions among workers. Use separate groups when different services each need their own copy of the topic's events and their own reading position.