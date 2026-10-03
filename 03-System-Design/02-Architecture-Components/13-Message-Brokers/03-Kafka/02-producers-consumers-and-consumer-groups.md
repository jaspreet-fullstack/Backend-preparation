# Kafka Producers, Consumers, and Consumer Groups

## 1. Producer

A **producer** sends messages to a Kafka topic.

```text
Producer → Topic
```

The message **key** can determine which partition receives the message.

> **Producer = Writes messages**

## 2. Consumer

A **consumer** reads messages from Kafka and tracks its position using **offsets**.

> **Consumer = Reads messages**

## 3. Consumer Group

A **consumer group** is a group of consumers that **share the work** of reading a topic.

```text
Topic: orders

Partition 0 → Consumer A
Partition 1 → Consumer B
Partition 2 → Consumer C
```

Within one consumer group, a partition is normally assigned to **only one consumer at a time**.

### Important

- **Consumers < Partitions** → Some consumers handle multiple partitions.
- **Consumers > Partitions** → Some consumers are idle.
- When consumers join or leave, Kafka may **rebalance** the partitions.

## 4. Multiple Consumer Groups

Different consumer groups can read the **same topic independently**.

```text
                    ┌→ Group A → Inventory
Producer → Topic ───┤
                    └→ Group B → Analytics
```

Each group maintains its **own offsets**.

So both Inventory and Analytics can process the same events independently.

## Easy Memory

> **Producer = Writes**  
> **Consumer = Reads**  
> **Consumer Group = Shares the work**  
> **Different Groups = Independent readers**

## Interview Answer

> **A Kafka producer writes messages to a topic, while consumers read them and track their position using offsets. A consumer group allows multiple consumers to share the partitions of a topic. If different services need to process the same events independently, they use separate consumer groups.**