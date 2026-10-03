# Redis Basics

Redis is an **in-memory data store** that keeps active data in RAM for fast access. It is commonly used for caching, sessions, counters, leaderboards, queues, and event processing. Redis can also persist data to disk, but its durability should match the application's requirements.

## 1. Common Data Types

| Type | What it stores | Example use |
|---|---|---|
| **String** | Text, numbers, or bytes | Cache value, counter, session token |
| **Hash** | Fields grouped under one key | User profile |
| **List** | Ordered items | Simple work queue |
| **Set** | Unique items | Users who liked a post |
| **Sorted Set** | Unique items ordered by score | Leaderboard |
| **Stream** | Ordered events with IDs | Event processing |

```text
Application → Redis (RAM) → Fast result
                    |
                    └→ Optional disk persistence
```

## 2. Common Use Cases

| Use | Redis feature |
|---|---|
| Cache frequently read data | TTL + eviction |
| Store login sessions | Keys with expiry |
| Count events / rate limits | Atomic counters / scripts |
| Leaderboards | Sorted sets |
| Live updates / event processing | Pub/Sub / Streams |

### Example

```text
SET session:42 user-7 EX 3600
```

Stores `user-7` for **1 hour**. `EX` sets expiration in seconds.

## 3. When Redis Fits

Redis is a good fit when:

- **Low latency** matters.
- Data can fit in memory.
- Shared fast access is required.
- Redis data types simplify the operation.

## 4. Tradeoffs

- **RAM is expensive and limited** compared with disk.
- Redis requests still involve **network latency**.
- A **hot key** can overload a single Redis server.
- Expiry or eviction can remove data.
- Persistence and replicas improve recovery, but **some data loss may still be possible** depending on configuration.
- For critical data, keep a **durable database as the source of truth**. Redis can then be rebuilt if needed.