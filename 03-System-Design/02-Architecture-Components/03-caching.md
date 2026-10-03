# Caching and Cache Invalidation

A **cache** stores copies of data in a faster layer so applications can serve requests with lower latency and reduce work on the primary database. The database is usually the **source of truth**.

A **cache hit** means the requested key is present. A **cache miss** means it is absent or expired, so the application or cache must fetch it from the source. A **TTL (time to live)** limits how long an entry remains valid in the cache.

## 1. Caching Strategies

### 1. Cache-Aside (Lazy Loading)

The application checks the cache first. On a miss, it reads from the database, returns the result, and stores it in the cache.

```text
Application -> Cache
                  | hit: return cached value
                  ` miss -> Database -> populate cache -> return value
```

- **Good for:** Read-heavy applications and data that should be loaded only when requested.
- **Benefits:** The application controls what gets cached; unused data does not occupy cache space.
- **Trade-off:** The first request after a miss is slower, and cached data can become stale unless it is invalidated or expires.

### 2. Read-Through

The application reads through the cache. On a miss, the cache itself loads the value from the backing store, saves it, and returns it.

```text
Application -> Cache -- miss --> Database
                    <-- value --
              <-- cached value
```

- **Good for:** Systems where a cache library or service can own the load behavior.
- **Benefits:** Keeps cache-loading logic out of application request handlers.
- **Trade-off:** The cache needs a loader integration; behavior on errors and stale data must be understood.

### 3. Write-Through

Writes go through the cache, which synchronously writes the value to the backing store before confirming success.

```text
Application -> Cache -> Database
             <-- success after both writes --
```

- **Good for:** Data that is frequently read after being written and where write consistency matters.
- **Benefits:** Reduces the chance that a successful write leaves the cache behind the database.
- **Trade-off:** Writes have more latency; coordinating the cache and database still requires care.

### 4. Write-Behind / Write-Back

The cache accepts a write first and persists it to the database asynchronously, usually in a batch or background process.

```text
Application -> Cache -> acknowledge write
                         |
                         `-> asynchronous database write
```

- **Good for:** High write throughput where a short persistence delay is acceptable.
- **Benefits:** Can reduce database write load and improve write latency.
- **Trade-off:** A cache failure before persistence can lose acknowledged writes; ordering and retry behavior need a plan.

### 5. Write-Around

Writes go directly to the database and bypass the cache. A later read loads the value into the cache.

```text
Write: Application -> Database
Read:  Application -> Cache -- miss --> Database -> populate cache
```

- **Good for:** Data that is written often but rarely read, such as one-time imports or archival records.
- **Benefit:** Avoids filling the cache with data that may never be read.
- **Trade-off:** The first read after a write is a cache miss.

## 2. Cache Invalidation Strategies

**Cache invalidation** removes or updates a cached value when it is no longer valid. It answers: "How does the cache learn that the source data changed?"

### 1. TTL-Based Invalidation

Give each entry an expiration time. After the TTL, it is treated as expired and a later read reloads it.

```text
Cache entry created -> TTL counts down -> entry expires -> next read reloads it
```

- **Good for:** Data where bounded staleness is acceptable.
- **Trade-off:** A value can be stale until expiration; a short TTL increases cache misses and source load.

### 2. Explicit / Manual Invalidation

An application or operator explicitly deletes or updates a key after a change. This is a general mechanism; application-managed cache-aside invalidation is described below.

```text
Data changes -> explicitly delete or update related cache key
```

- **Good for:** Admin actions, targeted purges, and applications that know which keys a write affects.
- **Trade-off:** Missing an affected key can leave stale data behind.

### 3. Event-Based Invalidation

The data owner publishes an event after a change. A consumer uses it to delete or refresh related cache keys.

```text
Database update -> change event -> invalidation consumer -> cache key deleted/refreshed
```

- **Good for:** Multiple services or caches that need to react to the same data change.
- **Trade-off:** Delivery is often asynchronous, so stale data may remain briefly. Reliable event delivery, retries, and idempotent consumers matter.

### 4. Version-Based Invalidation

Include a version in the cache key. When the data changes, use a new version so readers stop requesting the old key.

```text
user:123:v1 -> old value
user:123:v2 -> new value
```

- **Good for:** Content releases, configuration snapshots, and data with a clear version or generation number.
- **Trade-off:** Old versions occupy space until they expire or are evicted.

### 5. Cache-Aside Invalidation

With cache-aside, the application writes to the database and then deletes the corresponding cache key. The next read misses, loads the current database value, and repopulates the cache.

```text
Write path: Application -> Database update -> delete cache key
Read path:  Application -> Cache miss -> Database read -> populate cache
```

- **Good for:** A common, simple cache-aside read/write design.
- **Trade-off:** A failure between the database update and cache deletion can leave stale data; TTL is often kept as a backstop. Concurrent reads and writes can also race, so stricter freshness needs additional coordination.

## 3. Cache Eviction Policies

**Eviction** chooses entries to remove when cache capacity is limited. This differs from invalidation: eviction is about capacity, while invalidation is about whether data is still valid.

### 1. LRU (Least Recently Used)

Removes the entry that has not been accessed for the longest time. It is useful when recent access predicts future access.

### 2. LFU (Least Frequently Used)

Removes the entry with the fewest accesses. It is useful when consistently popular items should stay cached, though old popularity can mislead after traffic patterns change.

### 3. FIFO (First In, First Out)

Removes the entry that has been in the cache the longest, regardless of how recently or frequently it was accessed. It is simple but may remove popular data.

### 4. Random Eviction

Removes a randomly selected entry. It is simple and has low tracking overhead, but it does not use access patterns to protect valuable entries.

### 5. TTL-Based Eviction

Removes entries whose TTL has expired. Expiration is time-based cleanup, not a capacity-aware policy by itself; a cache may combine TTL expiration with LRU, LFU, or another policy when it reaches its size limit.

| Policy | Removes based on |
|---|---|
| LRU | Least recent access |
| LFU | Least frequent access |
| FIFO | Oldest insertion time |
| Random | Random selection |
| TTL-based | Expiration time |

## 4. Cache Reliability / Failure Handling

Caching reduces work during normal operation, but misses, bursts, or cache failures can overload the database. Design protections for the failure mode, not just the cache hit path.

### 1. Cache Stampede (Thundering Herd)

A stampede occurs when many requests try to load the same missing or expired key at once, sending duplicate work to the database.

```text
Popular key expires
       |
       +--> Request 1 --> Database
       +--> Request 2 --> Database
       +--> Request 3 --> Database
       `--> many more requests
```

**Mitigations:**

- **Request coalescing / singleflight:** Let one request load a key while concurrent requests wait for its result.
- **Stale-while-revalidate:** Return a still-usable stale value while one worker refreshes it in the background.
- **Early refresh:** Refresh popular entries before they expire.
- **Distributed lock:** Coordinate refresh work across application instances when in-process coalescing is not enough.

### 2. Cache Penetration

Penetration occurs when requests repeatedly ask for keys that do not exist. Every cache miss then reaches the database.

```text
Request for nonexistent ID -> cache miss -> database says not found
```

**Mitigations:**

- **Input validation:** Reject malformed or impossible IDs before querying the database.
- **Negative caching:** Cache "not found" results briefly so repeated requests do not repeatedly reach the database.
- **Bloom filter:** Check whether a key is definitely absent before querying the database. A Bloom filter can produce false positives (it may say "possibly present" for an absent key), but a correctly maintained filter has no false negatives. False positives still go to the database; definitely absent keys can be rejected early.
- **Rate limiting:** Limit abusive or unusually high request rates.

### 3. Cache Avalanche

An avalanche occurs when many entries expire together, or when the cache becomes unavailable, causing a sudden wave of requests to the backing store.

```text
Many keys expire or cache fails -> requests bypass cache -> database load spikes
```

**Mitigations:**

- **TTL jitter:** Add a random offset to TTLs so entries do not all expire at the same time.
- **Prewarming:** Load important data before a predictable traffic spike or cache restart.
- **High availability:** Use replicas and failover where appropriate to reduce the chance of total cache loss.
- **Protect the database:** Use timeouts, rate limits, circuit breakers, and load shedding. A fallback to the database should be controlled because unrestricted fallback can overload it.

### 4. Hot Keys

A hot key receives disproportionate traffic and can overload the cache node that owns it, even when the cache has a high overall hit rate.

**Mitigations:** Replicate or locally cache frequently read values, coalesce concurrent loads, and consider sharding or splitting data when the access pattern allows it. Replicas and local copies need a freshness strategy.

### 5. Cache Failure

A cache is usually a performance layer, not the source of truth. If it becomes unavailable, the application may fall back to the database, serve a safe stale value, or fail selected requests. Choose per workload and protect the database from a sudden unbounded fallback surge.

**Protection mechanisms:** Short timeouts, circuit breakers, request limits, load shedding, stale fallbacks where safe, and database capacity protections.

## 5. Consistency and Distributed Caching

The database is usually authoritative, while the cache can briefly contain stale data. Decide how much staleness the product can tolerate and choose invalidation, TTL, or coordination accordingly.

A **distributed cache** is shared by multiple application instances. Redis is a common example.

```text
App 1 --+
App 2 --+--> Shared cache
App 3 --+
```

It provides a shared view across application instances and avoids each process maintaining an unrelated local copy. It also adds network latency and makes cache availability a dependency to plan for.

### Redis Cluster

Redis Cluster distributes keys across nodes using hash slots and can use replicas for availability and failover.

```text
Redis Cluster
  Node 1 -> some hash slots
  Node 2 -> some hash slots
  Node 3 -> some hash slots
```

Some multi-key operations require the keys to be on the same node. **Hash tags** can place related keys in the same hash slot:

```text
user:{123}:profile
user:{123}:orders
user:{123}:settings
```

The shared `{123}` tag is used to calculate the slot for each key. Consider network latency, node failures, replication, failover, hot keys, consistency, and multi-key operation constraints when designing a cluster.

## 6. Related Redis Coordination: Locks and Fencing Tokens

A **distributed lock** coordinates workers so that only one worker at a time attempts a protected operation. A common Redis acquisition command is:

```text
SET lock:key unique-token NX PX 10000
```

`NX` creates the key only if it does not exist; `PX` sets its expiration in milliseconds. The unique token identifies the owner. Release the lock only if its stored token still matches, using an atomic compare-and-delete operation (typically a Lua script). Otherwise, an expired lock could be deleted by an old owner after another worker acquired it.

Lock expiry can still allow a paused worker to resume after a newer worker has acquired the lock. For critical writes, **fencing tokens** can help: the lock service issues increasing numbers, and the protected resource rejects operations carrying an older token.

```text
Worker A gets token 41; pauses
Worker B gets token 42; writes accepted
Worker A resumes with token 41; write rejected
```

A Redis lock is a coordination mechanism; it does not replace a database transaction.

## 7. Interview Checklist

When proposing a cache, be ready to explain:

1. What data is safe and useful to cache?
2. Which read and write strategy fits the access pattern?
3. What is the cache key and TTL?
4. How are updates invalidated, and how stale can data be?
5. What eviction policy applies when the cache is full?
6. How are stampedes, penetration, avalanche, and hot keys handled?
7. What happens if the cache is slow or unavailable?
8. How is the database protected during a cache outage?
9. Is the cache local or distributed, and how is it scaled?
10. Are Redis Cluster or multi-key operations involved?

## 8. Quick Definitions

- **Cache-aside:** The application checks the cache; on a miss, it reads the source and populates the cache.
- **TTL:** The time an entry may remain in the cache before expiring.
- **Invalidation:** Removing or updating cached data that is no longer valid.
- **Eviction:** Removing entries to manage cache capacity.
- **Stampede:** Concurrent requests rebuild the same missing or expired entry.
- **Penetration:** Requests for nonexistent data repeatedly bypass the cache and reach the source.
- **Avalanche:** Many expirations or a cache outage create a sudden surge of source traffic.
- **Hot key:** A key that receives disproportionate traffic and can overload its cache node.
- **Distributed cache:** A cache shared by multiple application instances.
- **Fencing token:** An increasing token used to reject stale workers after a lock changes owners.