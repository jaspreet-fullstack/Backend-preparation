# PostgreSQL Transactions, Isolation, and Locking

A transaction groups database operations so they commit together or roll back together. PostgreSQL provides ACID transactions and uses multiversion concurrency control (MVCC) so readers can commonly proceed without blocking writers.

## MVCC

PostgreSQL's **MVCC** keeps row versions so a query can read a consistent snapshot while concurrent transactions make changes. A normal read usually does not block a writer, and a writer usually does not block a normal read. Updates create new row versions; `VACUUM` reclaims space from obsolete versions when they are no longer needed.

## Isolation levels

- **Read Uncommitted:** PostgreSQL treats this as Read Committed; dirty reads are not allowed.
- **Read Committed:** PostgreSQL's default. Each statement sees rows committed before that statement began; two statements in one transaction may see different committed data.
- **Repeatable Read:** Statements in a transaction use a stable snapshot. Concurrent updates can cause a transaction to fail and require retry.
- **Serializable:** Provides behavior equivalent to a serial order for successful transactions. PostgreSQL may abort a transaction to prevent a serialization anomaly, so applications must retry safely.

## Locks and contention

Updates and explicit locks can block competing transactions. Row-level locks protect selected rows; table-level locks protect broader operations. `SELECT ... FOR UPDATE` locks selected rows so another transaction cannot update them until the lock is released. Advisory locks let applications coordinate on keys, but the database does not enforce what the key means.

Keep transactions short, acquire locks in a consistent order where possible, and investigate lock waits and deadlocks. PostgreSQL detects deadlocks and aborts one participant; the application should be prepared to retry transient failures.

### Optimistic vs. pessimistic locking

- **Pessimistic locking** acquires a lock before changing data. For example, `SELECT ... FOR UPDATE` is useful when conflicts are likely or the operation must reserve a row while it works. Other transactions may wait.
- **Optimistic locking** lets work proceed without an initial lock and checks for a conflict at update time, often with a version column: `UPDATE items SET value = 'new-value', version = version + 1 WHERE id = 42 AND version = 7`. If no row is updated, another writer changed it; reload and retry or report a conflict.
- Choose based on conflict rate and cost of retrying. Optimistic checks still use database transactions and locks internally while applying the write.

```sql
BEGIN;
UPDATE accounts SET balance = balance - 20 WHERE id = 1;
UPDATE accounts SET balance = balance + 20 WHERE id = 2;
COMMIT;
```

Both account changes commit together. If a step fails, roll back rather than leaving a partial transfer.

## Interview reminders

- Put related invariants in transactions and enforce them with constraints where possible.
- Choose the weakest isolation level that preserves correctness.
- Keep transactions short; long-running transactions can retain old row versions and increase contention.
- Make retryable transactions idempotent or otherwise safe to run again.
