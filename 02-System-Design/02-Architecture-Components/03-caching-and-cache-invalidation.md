# Caching and Cache Invalidation

A cache keeps frequently used data in a faster place, so the application does not need to fetch it from the main database every time. The main database remains the source of truth (the authoritative copy).

## 1. Cache-aside Pattern

The application checks the cache first. On a miss, it reads from the main database, returns the result, and saves a copy in the cache. This works well when data is read often; updates need a plan to keep the copy fresh.

```text
Application -> Cache --hit--> Return value
					  |
					 miss
					  v
				  Database
					  |------> Populate cache
					  `------> Return value
```

## 2. Cache Hit, Miss, and TTL

A **hit** means the requested value is in the cache. A **miss** means the application must fetch it elsewhere. **TTL** (time to live) sets when a cached value expires; it limits how long a copy stays, but the copy can be out of date before then.

## 3. LRU and LFU

- **LRU** removes the value that has gone unused the longest; useful when recently used values are likely to be needed again.
- **LFU** removes the value used the fewest times; useful when popular values should stay in the cache.
- Both track usage, and either can make poor choices if user behavior changes suddenly.

## 4. Cache Invalidation and Consistency

When data changes, delete or refresh its cached copy, or use a new versioned key. TTL is a backup plan, not an immediate update. The database and cache can get out of step if one update succeeds and the other fails. In an interview, say whether briefly old data is acceptable and how reads behave just after a write.

## 5. Cache Stampede / Thundering Herd

Many requests try to reload the same value after it expires or is removed. Let one request reload while the others wait (request coalescing), refresh it early, or return the old value while one request refreshes it (stale-while-revalidate).

## 6. Cache Penetration

Repeated requests for missing or invalid keys always miss and hit the database. Check inputs, briefly cache “not found” results (negative caching), or use a Bloom filter: a small check that can rule out keys that are definitely absent.

## 7. Cache Avalanche

Many values expire at once, or the cache stops working, causing a sudden burst of database requests. Add a random delay to expiry times (TTL jitter), load important values ahead of time, and reject or defer extra work if needed.

## 8. Hot Keys

A **hot key** is one value requested far more often than others, which can overload the server holding it. Spread reads across copies or combine duplicate requests; remember that every copy must be updated when the value changes.

## 9. Distributed Caching and Redis Cluster

A distributed cache is shared by all application servers, rather than keeping a separate copy on each one. Redis Cluster splits keys into groups (hash slots) across servers and can keep extra copies for failover. Consider network delay, what happens when a server fails, and Redis operations that need keys on the same server.

## 10. Distributed Locks with Redis

For brief coordination, Redis can grant a lock only if nobody else holds it, and expire it after a time limit: `SET key token NX PX ttl`. Save a unique token and delete the lock only if that token still matches; otherwise you could delete another worker's lock. A paused worker may wake after its lock expires. For critical writes, use an increasing fencing number that the protected system checks, so an old lock holder cannot overwrite newer work. A Redis lock does not replace a database transaction.

## Interview Check

Be ready to explain what is cached, how keys are chosen, how entries stay fresh, what happens on misses and cache failure, and how the source of truth is protected from a traffic surge.