# Kafka Replication and Failure Handling

Kafka keeps **multiple copies of partitions** on different brokers so data can survive a broker failure.

## 1. Leader and Followers

Each partition has:

- **Leader** → Handles reads and writes.
- **Followers** → Copy data from the leader.
- **ISR (In-Sync Replicas)** → Replicas that are sufficiently caught up with the leader.

```text id="8q4k9v"
             Partition
                |
             Leader
            /      \
       Follower   Follower
```

If the leader fails, Kafka can choose an **in-sync follower** as the new leader.

> **Leader = Handles requests**  
> **Follower = Copies data**  
> **ISR = Up-to-date replicas**

## 2. Producer `acks`

`acks` controls how much confirmation the producer waits for.

| `acks` | Meaning | Durability |
|---|---|---|
| `0` | No broker confirmation | Lowest |
| `1` | Leader confirms | Medium |
| `all` | Required in-sync replicas confirm | Highest |

### `acks=0`

Producer does not wait for Kafka's confirmation.

> **Fast, but messages can be lost without the producer knowing.**

### `acks=1`

The leader confirms the message to the producer.

> **Better, but the message can be lost if the leader fails before replication.**

### `acks=all`

Producer waits for the required in-sync replicas to confirm.

> **Best durability, but writes can fail if not enough replicas are available.**

### If Acknowledgement Is Not Received

If the producer **does not receive the required acknowledgement**, Kafka considers the send **unsuccessful**.

The producer can **retry** the message if retries are configured. If retries are exhausted, the producer reports an error to the application.

```text id="w5x8nd"
Producer
   ↓
Kafka
   ↓
Required ACK ❌
   ↓
Retry
   ↓
Still fails
   ↓
Producer reports error
```

> **No required ACK → Send fails → Retry if configured → Error if retries are exhausted**

## Easy Memory

> `acks=0` → **Don't wait**  
> `acks=1` → **Leader confirms**  
> `acks=all` → **Replicas confirm**

## Interview Answer

> **Kafka replicates each partition across multiple brokers. The leader handles reads and writes, while followers copy the data. In-sync replicas are sufficiently caught-up replicas that can become the new leader if the current leader fails. The producer's `acks` setting controls how much confirmation it waits for: `0` is fastest, `1` waits for the leader, and `all` waits for the required in-sync replicas. If the required acknowledgement is not received, the send is considered unsuccessful and the producer can retry based on its configuration.**