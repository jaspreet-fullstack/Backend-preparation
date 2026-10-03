# Redis Cluster and Hash Slots

Redis Cluster is used when **one Redis server is not enough** to handle the required data or traffic.

It distributes data across multiple **primary servers**.

## 1. Hash Slots

Redis Cluster divides the key space into **16,384 hash slots**.

A hash slot is simply a **logical partition used to decide which primary server stores a key**.

The basic flow is:

```text
Key → Hash Slot → Primary Server
```

Example:

```text
user:42
   ↓
Hash
   ↓
Slot 5000
   ↓
Primary A
```

Another key might go to another primary:

```text
user:100
   ↓
Hash
   ↓
Slot 12000
   ↓
Primary B
```

A slot can contain **many keys**. The 16,384 slots are not a limit on the number of keys.

---

## 2. How Data Is Distributed

Different primary servers own different slots.

```text
Primary A → Slots 0–5000
Primary B → Slots 5001–10000
Primary C → Slots 10001–16383
```

This distributes the data and request load across multiple servers.

---

## 3. Resharding

When a server is added or removed, Redis can **move slots between primary servers**.

This is called **resharding**.

Example:

```text
Before:

Primary A → 0–8000
Primary B → 8001–16383

After adding Primary C:

Primary A → 0–5000
Primary B → 5001–11000
Primary C → 11001–16383
```

This helps distribute the load more evenly.

---

## 4. Replicas and Failover

Each primary can have one or more replicas.

```text
Primary A
    ↓
Replica A1

Primary B
    ↓
Replica B1
```

If a primary fails, its replica can be promoted to become the new primary.

So Redis Cluster provides:

- **Horizontal scaling** through multiple primaries
- **High availability** through replicas and failover

---

## 5. Multi-Key Operations

Redis Cluster works best when related keys are stored on the **same slot**.

For example:

```text
user:42:profile
user:42:settings
```

These could end up on different slots.

To force related keys into the same slot, use a **hash tag**:

```text
{user42}:profile
{user42}:settings
```

Redis hashes the text inside `{}`.

Therefore, both keys go to the same hash slot.

This is useful for operations that need to work with multiple keys together.

---

## 6. Cluster vs Sentinel

| | Redis Cluster | Redis Sentinel |
|---|---|---|
| Main purpose | Scaling + High Availability | High Availability |
| Splits data | ✅ Yes | ❌ No |
| Multiple primaries | ✅ Yes | ❌ Normally one primary |
| Replicas | ✅ Yes | ✅ Yes |
| Automatic failover | ✅ Yes | ✅ Yes |
| Horizontal data scaling | ✅ Yes | ❌ No |

### Easy way to remember

> **Sentinel → One dataset, monitor and fail over the primary.**

> **Cluster → Split the dataset across multiple primaries and provide failover with replicas.**

---

## Interview Answer

> **Redis Cluster is used when a single Redis server cannot handle the required data size or traffic. Redis divides the key space into 16,384 hash slots, and each primary owns a set of those slots. A key is mapped to a slot, which determines the primary where it is stored. Redis can move slots between nodes during resharding, and replicas provide failover. Sentinel, on the other hand, is mainly for monitoring a primary-replica setup and handling failover; it does not shard the dataset.**