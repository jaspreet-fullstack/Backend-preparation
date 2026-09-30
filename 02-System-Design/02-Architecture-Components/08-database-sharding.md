# Database Sharding

**Sharding** splits a database's data across multiple servers. Each server stores one part, chosen using a **partition key** (a value used to decide where a record goes).

## Key points

- Choose a key that spreads records and requests evenly and is present in common queries.
- Hash-based splitting spreads keys; range-based splitting groups nearby values but may overload one server.
- An unevenly loaded server is a **hot shard**.
- Moving data between shards (rebalancing) and queries that need several shards add complexity.

```text
Request key -> Partition function -> Shard 1 / Shard 2 / Shard 3
```

## Sharding vs. replication

Sharding divides data among servers. Replication keeps copies on multiple servers. A system can use both.

## Interview answer

Consider sharding when one database cannot handle the data size or request load. Explain the partition key, how requests find the right server, and what happens when a query needs data from several shards.