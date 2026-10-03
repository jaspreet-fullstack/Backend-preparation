# Redis Instances, Replication, and Sentinel

A **Redis instance** is one running Redis server.

## 1. Common Setups

### Standalone
One Redis server.

> **Simple, but no failover.**

### Primary + Replica
- **Primary** handles writes.
- **Replica** copies data from the primary.
- Replication is usually asynchronous, so a replica can briefly be behind.

> **Replica = Copy of primary data**

### Redis Sentinel
Sentinel monitors the primary and replicas.

If the primary fails:
1. Sentinel detects the failure.
2. Promotes a replica to primary.
3. Helps clients discover the new primary.

> **Sentinel = Monitoring + automatic failover**

Sentinel **does not split data** across servers.

### Redis Cluster
Redis Cluster splits data across **multiple primary servers** using hash slots.

> **Cluster = Sharding + failover**

## 2. Easy Comparison

| Setup | Main purpose |
|---|---|
| **Standalone** | Simple setup |
| **Primary + Replica** | Replication / read scaling |
| **Sentinel** | Automatic failover |
| **Redis Cluster** | Sharding + failover |

## 3. Tradeoffs

- Replicas can have **replication lag**.
- Failover takes some time.
- Clients must reconnect or discover the new primary.
- More servers mean more operational complexity.

## Interview Answer

> **A standalone Redis instance is the simplest setup. With primary-replica replication, the primary handles writes and replicas copy its data. Sentinel monitors these instances and can promote a replica if the primary fails. If we need to split data across multiple primary servers, we use Redis Cluster.**