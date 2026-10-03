# Redis vs Memcached (OPTIONAL)

Both **Redis and Memcached** are fast, in-memory key-value stores commonly used for caching.

| | **Redis** | **Memcached** |
|---|---|---|
| Data | Multiple data types | Simple key-value |
| Persistence | Supported | No |
| Replication | Supported | Basic / client-side |
| Cluster | Redis Cluster | Client-side distribution |
| Best for | Cache + advanced features | Simple caching |

## When to Use

**Redis:** Use when you need features like **Hashes, Lists, Sets, Sorted Sets, Streams, persistence, replication, or distributed locks**.

**Memcached:** Use when you only need a **simple, fast cache**.

### Easy Memory

> **Memcached = Simple cache**  
> **Redis = Cache + more features**

## Interview Answer

> **Both Redis and Memcached are in-memory caching systems. Memcached is simpler and mainly provides basic key-value caching, while Redis supports multiple data types, persistence, replication, and features like Streams and distributed locks. I would use Memcached for simple caching and Redis when additional features are required.**