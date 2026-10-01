# Redis Basics and Data Types

Redis is an in-memory data store: it keeps data in RAM for fast access. It is often used as a cache, but its data types also support counters, rankings, queues, and event streams. Redis can save data to disk, but decide whether it meets the durability needs before using it as the only copy.

## Common data types

| Type | What it stores | Example use |
| --- | --- | --- |
| **String** | Text, numbers, or bytes | Cache value, counter, session token |
| **Hash** | Fields grouped under one key | User profile fields |
| **List** | Ordered items | Simple work queue |
| **Set** | Unique items | Set of users who liked a post |
| **Sorted set** | Unique items ordered by score | Leaderboard |
| **Stream** | Ordered events with IDs | Event processing with consumer groups |

```text
Application -> Redis in RAM -> fast result
                   |
                   `-> optional disk persistence
```

## Example

```text
SET session:42 user-7 EX 3600
```

This stores a session value for one hour; `EX` sets its expiration time in seconds.

## Interview answer

Use Redis when fast access to in-memory data or its built-in data types fit the workload. Explain which data type you need, how long data should live, and what happens if Redis loses data or becomes unavailable.