# Kafka Retention, Replay, and Compaction

## 1. Retention

Kafka keeps messages for a configured **time or size limit**, even after consumers have read them.

> **Retention = How long Kafka keeps messages**

Each consumer group has its own **offset**, so different groups can read the same messages at different speeds.

## 2. Replay

A consumer can move its offset back and **read old messages again**, as long as they are still retained.

Example:

```text id="7n6k2p"
Message 1 → Message 2 → Message 3 → Message 4
                    ↑
              Consumer reads again
```

**Use:** Rebuilding data, fixing a consumer, or reprocessing events.

> **Replay = Read old messages again**

Be careful: replaying can repeat external actions, so consumers should be **idempotent**.

## 3. Log Compaction

Log compaction keeps the **latest value for each key**.

Example:

```text id="z2p7kt"
user-7 → name=A
user-7 → name=B
user-7 → name=C

After compaction:
user-7 → name=C
```

> **Compaction = Keep latest value per key**

It is useful when you mainly need the **latest state**, not the complete history.

## Easy Memory

> **Retention → Keep messages for some time**  
> **Replay → Read old messages again**  
> **Compaction → Keep latest value per key**

## Interview Answer

> **Kafka retention controls how long messages are kept, even after they are consumed. Replay allows a consumer to read retained messages again by moving its offset back. Log compaction keeps the latest value for each key and is useful when we need the latest state of an entity rather than its complete history.**