# Redis vs. Memcached (Optional)

Both are fast, in-memory key-value systems often used as caches. Memcached is optional interview knowledge; first understand the cache requirements, then compare the tools.

| Redis | Memcached |
| --- | --- |
| Supports strings plus data types such as hashes, lists, sets, sorted sets, and streams | Focuses on simple keys and values |
| Offers features such as persistence, replication, and Redis Cluster | Commonly used as an ephemeral cache; data can be lost when nodes restart or keys are evicted |
| Useful when the application needs Redis data types or Redis-specific features | Useful when a simple distributed cache is enough |

Both require a plan for expiration, memory limits, hot keys, and what happens on a cache miss. Memcached clients commonly choose a server for each key; Redis Cluster assigns keys to hash slots across its nodes.

## Example decision

For a basic cache of rendered product descriptions, Memcached may be enough. If the same service also needs sorted-set leaderboards or Redis Streams, Redis may be the better fit. Check the required features and operational environment rather than choosing by speed claims alone.

## Interview answer

Choose Memcached for a simple key-value cache when its feature set is enough. Choose Redis when its extra data types, persistence, replication, or cluster features are useful. In either case, keep cache data replaceable unless durability is deliberately designed.