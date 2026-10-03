# Redis Persistence, TTL, and Eviction

Redis stores active data in **RAM** for fast access. Persistence saves Redis data to **disk** so it can be recovered after a restart.

---

## 1. Redis Persistence

### RDB — Redis Database

RDB takes a **snapshot of the Redis data at a specific point in time** and saves it to disk.

Think:

> **RDB = Snapshot**

Example:

```text
10:00 → Snapshot saved
10:05 → New data
10:10 → Redis crashes

Data after 10:00 may be lost.
```

**Advantages:**
- Smaller files
- Faster recovery
- Good when some data loss is acceptable

**Disadvantage:**
- Recent changes after the last snapshot can be lost

---

### AOF — Append Only File

AOF records **write operations** made to Redis and saves them to disk.

Think:

> **AOF = Log of changes**

Example:

```text
SET user:1 Vishal
SET user:2 Rahul
DEL user:1
```

Redis can replay these commands to rebuild its data after a restart.

**Advantages:**
- Better durability
- Can lose less recent data

**Disadvantages:**
- Usually larger than RDB
- Recovery can take longer because commands need to be replayed

---

### RDB vs AOF

| | RDB | AOF |
|---|---|---|
| Stores | Snapshot | Write commands |
| Think | 📸 Snapshot | 📝 Log |
| File size | Smaller | Usually larger |
| Recovery | Faster | Can be slower |
| Recent data loss | More possible | Less possible |

Both can be enabled together.

---

# 2. TTL — Time To Live

**TTL** defines how long a key should remain in Redis before it expires.

Example:

```redis
SET session:42 user-7 EX 3600
```

This means:

```text
session:42
    ↓
Expires after 3600 seconds
    ↓
1 hour
```

TTL is commonly used for:

- Sessions
- OTPs
- Temporary data
- Cache entries

You can check the remaining TTL using:

```redis
TTL session:42
```

---

# 3. Eviction

**Eviction** means Redis automatically removes keys when it reaches its configured **memory limit**.

For example:

```text
Redis memory limit = 1 GB
        ↓
Memory becomes full
        ↓
Redis needs to remove keys
        ↓
Eviction policy decides what to remove
```

### Common eviction policies

- **LRU** — Remove keys that have not been used recently.
- **LFU** — Remove keys that are used least frequently.
- **noeviction** — Don't remove keys; reject new writes when memory is full.

---

## Interview Answer

> **Redis stores active data in memory. For persistence, RDB periodically saves snapshots to disk, while AOF records write operations and can provide better durability. TTL automatically expires keys after a specified time, while eviction removes keys when Redis reaches its memory limit. Common eviction policies include LRU and LFU, while noeviction rejects new writes when memory is full.**