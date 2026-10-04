# PostgreSQL Replication, Backups, and Scaling

## 1. WAL

**WAL = Write-Ahead Log**

PostgreSQL records database changes in the WAL **before writing the changed data to the main data files**.

```text
Transaction
    ↓
Write change to WAL
    ↓
Write data to database files
```

If PostgreSQL crashes, it can use the WAL to **recover changes**.

### Easy Memory

> **WAL = Record changes first → use them for recovery**

---

# 2. Replication

**Replication** means keeping copies of the PostgreSQL database on other servers.

```text
             ┌── Read Replica 1
             │
Primary ─────┼── Read Replica 2
             │
             └── Read Replica 3
```

The primary handles writes and sends WAL changes to replicas.

### Primary

Usually handles:

- `INSERT`
- `UPDATE`
- `DELETE`
- Writes

### Read Replica

Usually handles:

- `SELECT`
- Read-heavy traffic

---

# 3. Asynchronous Replication

The primary **doesn't wait for the replica** before confirming the write.

```text
Client
  ↓
Primary → WAL → Replica
  ↓
Success
```

The replica may be slightly behind.

This is called **replication lag**.

If the primary fails before the replica receives the latest changes:

```text
Recent writes
     ↓
May be missing on replica
```

### Easy Memory

> **Async = Faster writes, but replica can lag**

---

# 4. Synchronous Replication

The primary waits for the required replica to confirm the WAL has been received/durable according to the configured synchronous mode before completing the write.

```text
Client
  ↓
Primary
  ↓
Replica
  ↓
Confirmation
  ↓
Client gets success
```

This reduces the risk of losing recent committed writes if the primary fails.

Trade-off:

> **More durability → potentially higher write latency and less availability when required replicas are unavailable.**

### Easy Memory

> **Sync = Safer writes, but slower**

---

# 5. Read Replica Problem

Suppose:

```text
1. User updates profile
       ↓
   Primary

2. User immediately requests profile
       ↓
   Read Replica
```

The replica may not have received the latest change yet.

So the user might temporarily see **old data**.

For read-after-write operations, you may send the read to the **primary** or use an appropriate consistency strategy.

### Easy Memory

> **Replica = may return slightly old data**

---

# 6. Replication vs Backup

These are **not the same**.

### Replication

```text
Primary → Replica
```

Keeps another copy for:

- Read scaling
- High availability
- Failover

### Backup

```text
Database → Backup Storage
```

Used for:

- Accidental deletion
- Data corruption
- Disaster recovery
- Point-in-time recovery

If someone accidentally deletes data on the primary, that deletion can also reach the replica.

So:

> **Replica ≠ Backup**

---

# 7. Backups

### `pg_dump`

Creates a logical backup of a database or selected objects.

Useful for:

- Database migration
- Object-level backup
- Portable exports

Example:

```bash
pg_dump mydb > backup.sql
```

---

# 8. PITR

**PITR = Point-in-Time Recovery**

It allows you to restore the database to a specific point in time.

Usually:

```text
Base Backup
     +
WAL Archives
     ↓
Restore
     ↓
Replay WAL
     ↓
Choose recovery point
```

Example:

```text
10:00 → Base backup
10:30 → New order
10:45 → New order
11:00 → Accidental DELETE

Need:
Restore database to 10:59
```

PITR can replay WAL until the desired recovery point.

### Easy Memory

> **PITR = Restore database to a specific time**

---

# 9. Scaling PostgreSQL

## Vertical Scaling

Increase resources of the existing server.

```text
Before:
4 CPU + 16 GB RAM

       ↓

After:
16 CPU + 64 GB RAM
```

Simple, but eventually you hit hardware limits.

---

## Read Replicas

If the main problem is **too many reads**:

```text
                 ┌── Replica 1
                 │
Application ──→ Primary
                 │
                 └── Replica 2
```

Writes → Primary

Reads → Replicas

Useful for read-heavy systems.

---

## Connection Pooling

Opening too many database connections can consume resources.

A **connection pool** reuses a limited number of connections.

```text
Many Requests
      ↓
Connection Pool
      ↓
Limited DB Connections
      ↓
PostgreSQL
```

---

## Caching

Frequently requested data can be cached in something like Redis.

```text
Application
    ↓
Redis Cache
    ↓ cache miss
PostgreSQL
```

This reduces database reads.

---

# 10. Table Partitioning

Partitioning divides one large logical table into smaller partitions.

```text
orders
   │
   ├── orders_2024
   ├── orders_2025
   └── orders_2026
```

### Types

#### Range Partitioning

Based on ranges.

Example:

```text
2024
2025
2026
```

Good for time-based data.

#### List Partitioning

Based on specific values.

Example:

```text
India
USA
UK
```

#### Hash Partitioning

Rows are distributed based on a hash of a column.

```text
Hash(customer_id)
       ↓
Partition 1
Partition 2
Partition 3
```

### Partition Pruning

If a query only needs one partition, PostgreSQL can skip irrelevant partitions.

```text
Query:
WHERE created_at >= '2026-01-01'

        ↓

Only relevant partitions
        ↓
Scan
```

### Easy Memory

> **Partitioning = Split one large table into smaller pieces**

Partitioning can help with very large tables and maintenance, but it **doesn't automatically make every query faster**.

---

# 11. Sharding

**Sharding** means distributing data across **multiple database servers**.

```text
                Application
                     ↓
                  Router
               /     |     \
              ↓      ↓      ↓
           DB 1    DB 2    DB 3
```

For example:

```text
Users 1–1M     → DB 1
Users 1M–2M    → DB 2
Users 2M–3M    → DB 3
```

Sharding can provide more capacity, but adds complexity:

- Routing
- Cross-shard queries
- Transactions
- Rebalancing
- Operational complexity

Usually consider it **after simpler scaling options are insufficient**.

---

# Easy Comparison

| Feature | Purpose |
|---|---|
| WAL | Recovery + replication |
| Replication | Keep database copies |
| Read Replica | Scale reads / failover |
| Backup | Recover lost/corrupted data |
| PITR | Recover to a specific time |
| Vertical Scaling | More CPU/RAM/storage |
| Connection Pool | Manage DB connections |
| Caching | Reduce database reads |
| Partitioning | Split one large table |
| Sharding | Distribute data across servers |

---

# Easy Memory

```text
WAL
 ↓
Record changes

Replication
 ↓
Copy changes to replicas

Backup
 ↓
Recover data

PITR
 ↓
Recover to a specific time

Read Replicas
 ↓
Scale reads

Partitioning
 ↓
Split one large table

Sharding
 ↓
Split data across servers
```

## Interview Answer

> "For PostgreSQL scaling, I would first optimize queries and indexes, use connection pooling and caching, and add read replicas for read-heavy workloads. For very large tables, partitioning can help with query pruning and maintenance. If a single PostgreSQL deployment still cannot handle the workload, sharding can distribute data across servers, but it adds significant complexity. For reliability, I would use WAL-based replication and proper backups with PITR."   