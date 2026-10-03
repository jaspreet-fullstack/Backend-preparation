# MongoDB Replica Sets, Sharding, and Backups

## Replica sets

A replica set maintains multiple copies of the same data. One member is primary for writes; secondary members replicate the primary's oplog and may serve reads according to read preference. If the primary becomes unavailable, eligible members hold an election for a new primary.

- Replication is normally asynchronous, so secondaries can lag.
- Reads from a secondary can be stale. Use read preference and read concern based on the feature's consistency requirements.
- Write concern controls how many members must acknowledge a write; stronger acknowledgement can improve durability but may increase latency or reduce write availability during failures.

## Sharding

Sharding distributes documents across shards when a single replica set cannot meet storage or throughput needs. The shard key determines placement and strongly affects query routing and load balance.

- Choose a shard key with enough cardinality and an even distribution of writes and reads.
- A monotonic key can concentrate new writes on one shard; a poorly targeted key can create scatter-gather queries.
- Rebalancing moves data and adds operational work. Sharding does not automatically make every query faster.

## Backups and recovery

Use consistent backups appropriate to the deployment, protect copies from the same failure domain, and regularly test restoration. Define recovery time objective (RTO) and recovery point objective (RPO); replication alone is not a backup against accidental deletes or corruption that replicate to every member.

## Interview answer

Explain how a replica set handles member failure, what stale secondary reads and write concern mean, when the data volume or throughput justifies sharding, how the shard key routes queries, and how backups meet recovery objectives.
