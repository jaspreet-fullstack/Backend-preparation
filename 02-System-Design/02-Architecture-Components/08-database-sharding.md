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

## Partitioning vs. sharding vs. replication

| Term | What happens to the data | Main reason |
| --- | --- | --- |
| **Partitioning** | Splits one dataset into smaller parts. Horizontal partitioning splits rows; vertical partitioning splits columns. Parts may be on one server or several. | Make data easier to manage or spread work. |
| **Sharding** | Horizontal partitioning that puts different rows on different database servers. Each server holds only part of the dataset. | Add storage and request capacity across servers. |
| **Replication** | Keeps copies of the same data on multiple servers. | Improve read capacity or keep data available after a server fails. |

```text
Partitioning:  all rows -> [Part A] + [Part B]
Sharding:      [Part A] -> Server 1   [Part B] -> Server 2
Replication:   Server 1 [same data] -> Server 2 [copy of same data]
```

A system can shard its data and replicate each shard for availability. In interviews, clarify whether “partitioning” means splitting data within one database or distributing those parts across servers; terminology can vary between systems.

## Interview answer

Partitioning splits a dataset; sharding places horizontal partitions on different servers; replication copies data. Consider sharding when one database cannot handle the data size or request load. Explain the partition key, request routing, and queries that need several shards.