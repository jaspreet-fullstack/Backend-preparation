# Database Replication

**Replication** keeps copies of database data on more than one server. It can keep data available after a failure and let multiple servers handle reads.

## Primary-Replica

In a primary-replica setup, the **primary** accepts writes and sends changes to one or more **replicas**. Applications may send reads to replicas to spread read traffic, while writes go to the primary.

If the primary fails, **failover** promotes a healthy replica. Promotion must be coordinated to avoid two servers accepting writes as primary at the same time.

```text
Writes -> Primary -> Replica A
				   -> Replica B
```

Replication copies the same data; it does not divide the dataset. If each server stores only part of the data, that is partitioning or sharding.

## Synchronous Replication

The primary waits for one or more replicas to acknowledge a write before confirming it to the application.

- **Benefit:** Reduces the chance of losing an acknowledged write if a server fails.
- **Trade-off:** Adds write latency. If a required replica is unavailable, writes may slow down or fail.

The exact durability guarantee depends on the database and its acknowledgment settings.

## Asynchronous Replication

The primary confirms a write before replicas have necessarily applied it. Replicas catch up in the background.

- **Benefit:** Usually lower write latency and less dependence on immediate replica availability.
- **Trade-off:** Replicas can serve stale data, and a primary failure before changes reach replicas can lose recent acknowledged writes during failover.

## Replication Lag

**Replication lag** is the delay between a change being committed on the primary and that change becoming available on a replica. It is common with asynchronous replication and can be measured as elapsed time or as the replica's position behind the primary's change log.

```text
T0: Primary commits balance = 80
T1: Application reads replica before it catches up -> balance = 100 (stale)
T2: Replica applies the change                 -> balance = 80
```

Lag can increase because of heavy write traffic, network delays, large transactions, or a replica that cannot apply changes as quickly as the primary produces them.

### Why lag matters

- A user may not see their own recent update if the next read goes to a lagging replica.
- Stale replica reads can affect decisions that require current data.
- If the primary fails, replicas that have not caught up may not contain the latest writes.

### Managing lag

- Send read-after-write or consistency-critical reads to the primary.
- Monitor replica lag and avoid routing reads to replicas that exceed an acceptable threshold.
- Reduce write pressure or scale and tune the replication path when replicas consistently fall behind.
- Choose synchronous or asynchronous replication based on the system's latency, availability, and data-loss requirements.

## Interview Answer

Replication keeps extra copies for availability or read capacity. Explain whether writes wait for replicas, how much replication lag is acceptable, what stale reads mean for users, and how failover handles writes that have not reached a replica.