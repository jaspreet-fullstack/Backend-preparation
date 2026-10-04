# MongoDB Replica Sets, Sharding, and Backups

## 1. Replica Sets

A **replica set** keeps multiple copies of the same data.

```text
          Primary
         /       \
    Secondary  Secondary
```

- **Primary** → handles writes.
- **Secondary** → copies data from the primary.
- If the primary fails → a secondary can be elected as the new primary.
- Replication is normally **asynchronous**, so secondaries can lag.
- Reading from a secondary can return **stale data**.
- **Write concern** controls how much acknowledgment is required for a write.

**Easy Memory:**

> Replica Set = **Replication + High Availability**

---

## 2. Sharding

**Sharding** distributes data across multiple servers (**shards**) to handle large data and high traffic.

```text
              MongoDB
                 │
       ┌─────────┼─────────┐
       ▼         ▼         ▼
     Shard 1   Shard 2   Shard 3
```

- **Shard key** determines where documents are stored.
- Good shard key → distributes data and load evenly.
- Poor shard key → can create **hot shards** or inefficient queries.

### Hot Shard

A **hot shard** is a shard receiving **much more traffic or data than other shards**.

```text
Shard 1  → 20% traffic
Shard 2  → 20% traffic
Shard 3  → 60% traffic 🔥
```

This creates a bottleneck even though the database is sharded.

**Easy Memory:**

> Sharding = **Distribute data across servers**  
> Hot Shard = **One shard gets overloaded**

---

## 3. Backups

Backups are used to **recover data** after accidental deletion, corruption, or major failures.

> **Replication is not a backup.**

If data is accidentally deleted on the primary, that deletion can also replicate to secondaries.

### RPO — Recovery Point Objective

**RPO = How much data loss is acceptable?**

Example:

```text
RPO = 10 minutes
→ We can tolerate losing up to 10 minutes of data.
```

### RTO — Recovery Time Objective

**RTO = How quickly the system should recover?**

Example:

```text
RTO = 30 minutes
→ System should be recovered within 30 minutes.
```

**Easy Memory:**

> RPO → **How much data can we lose?**  
> RTO → **How much time can we take to recover?**

---

## Interview Answer

> **Replica sets provide high availability by maintaining multiple copies of data and electing a new primary if the current one fails. Sharding distributes data across multiple servers for higher scale, but a poor shard key can create hot shards. Backups provide recovery from data loss, while RPO defines acceptable data loss and RTO defines acceptable recovery time.**