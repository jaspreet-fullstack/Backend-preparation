# PostgreSQL Replication, Backups, and Scaling

## Replication and read replicas

The **write-ahead log (WAL)** is an append-only record of database changes. PostgreSQL writes the relevant WAL record before flushing the changed data page to its main data files; after a crash, it replays WAL to recover committed changes. This is the write-ahead rule behind crash recovery.

PostgreSQL can stream WAL records from a primary to standby servers. With asynchronous replication, the primary need not wait for a standby, so replicas can lag and a failover may lose recent writes. Synchronous replication can reduce that risk at the cost of write latency and availability when required standbys are unreachable.

Read replicas can serve suitable read-only queries, but a read immediately after a write may need to go to the primary to avoid stale results. Replication provides copies; it does not by itself provide a complete backup or automatic failover policy. Failover orchestration and client reconnection need to be designed.

## Backups and recovery

- Use logical backups, such as `pg_dump`, for portable database or object-level exports.
- Combine a base backup with a continuous archive of WAL to restore the backup and replay changes up to a chosen time. This is **point-in-time recovery (PITR)**.
- Encrypt and isolate backups from the primary account or failure domain.
- Regularly test restores and measure actual recovery time and recoverable data point against RTO/RPO.

## Scaling

- Scale up CPU, memory, and storage when the database host is the bottleneck and larger instances remain viable.
- Use connection pooling, query tuning, caching, and read replicas to address the specific bottleneck.
- **Declarative table partitioning** divides one logical table into child tables using a partition key:
	- **Range:** ranges such as time periods.
	- **List:** explicit values such as region or category.
	- **Hash:** distributes rows by a hash of the key.
- Partition pruning can skip irrelevant partitions when a query filters on the partition key. Partitioning can simplify retention and maintenance for large tables, but it does not automatically make every query faster or distribute data across independent servers.
- Sharding across servers adds routing, transaction, and rebalancing complexity. Consider it only after measuring that one PostgreSQL deployment cannot meet the workload needs.

## Interview answer

Explain the write primary, how replicas lag and are promoted, which reads can tolerate staleness, how backups enable point-in-time recovery, and the failure and load limits your design targets.
