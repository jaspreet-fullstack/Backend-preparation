# Redis Use Cases and Tradeoffs

## Common uses

| Use | Redis feature |
| --- | --- |
| Cache frequently read data | Keys with TTL and an eviction policy |
| Store login sessions | Keys with an expiry time |
| Count events or enforce limits | Atomic counters or scripts |
| Show a leaderboard | Sorted sets |
| Send live updates or process retained events | Pub/Sub or Streams |

## When Redis fits

Redis is a good fit when low response time matters and the data can be kept in memory. It is also useful when its built-in types make an operation simple, such as a leaderboard.

## Tradeoffs to mention

- RAM costs more than disk and limits how much data fits on a server.
- Network calls to Redis still take time; a hot key can overload one server.
- Eviction, expiry, failover, or a bad write can remove or delay data.
- Persistence and replicas help recovery, but their settings determine what data could be lost after a failure.
- Keep a durable database as the source of truth when the application cannot lose the data; rebuildable cache data can be loaded again.

## Interview answer

Use Redis for data that benefits from fast shared access and fits its memory and recovery limits. Name the Redis feature, state whether Redis is a cache or the source of truth, and explain expiry, capacity, and failure handling.