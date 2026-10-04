# PostgreSQL Transactions, Isolation, and Locking

## 1. Transaction

A **transaction** is a group of database operations that should succeed or fail **together**.

```sql
BEGIN;

UPDATE accounts
SET balance = balance - 20
WHERE id = 1;

UPDATE accounts
SET balance = balance + 20
WHERE id = 2;

COMMIT;
```

If something fails:

```sql
ROLLBACK;
```

### Easy Memory

> **Transaction = All succeed or all fail**

---

# 2. ACID

PostgreSQL transactions follow **ACID**:

| Property | Meaning |
|---|---|
| Atomicity | All operations succeed or none |
| Consistency | Data remains valid |
| Isolation | Concurrent transactions don't incorrectly interfere |
| Durability | Committed data survives supported failures |

**Easy Memory:**

> **A**ll or nothing → **C**orrect state → **I**solated → **D**ata survives

---

## MVCC

**MVCC = Multi-Version Concurrency Control**

Instead of directly overwriting a row, PostgreSQL keeps **different versions of the row so that transactions can work concurrently**.

```sql
Example:

Initial:
User balance = 100

Transaction A:
UPDATE balance → 200

PostgreSQL:
Old version → 100
New version → 200
```

Each transaction reads the row version that is **visible to its snapshot**.

This allows readers and writers to work concurrently without normal reads blocking updates.

After old versions are no longer needed, **VACUUM cleans them up**.

**Easy Memory:**

> MVCC = Keep multiple row versions → readers and writers can work concurrently.

---

# 4. Isolation Levels

Isolation controls **how much one transaction can see from other transactions**.

### Read Uncommitted

PostgreSQL treats it the same as **Read Committed**.

You **cannot read uncommitted data** from another transaction.

**Easy Memory:**
> No dirty reads.

---

### Read Committed

This is PostgreSQL's **default isolation level**.

A query sees only data that was **committed before that query started**.

Two queries in the same transaction can see **different data** if another transaction commits a change between them.

**Easy Memory:**
> Only committed data + each query gets a fresh view.

---

### Repeatable Read

The transaction uses a **stable snapshot**.

So repeated queries in the same transaction see a consistent view of the data.

Concurrent changes can cause the transaction to fail, so the application may need to retry.

**Easy Memory:**

> Repeatable Read = same snapshot during the transaction

---

### Serializable

The strongest isolation level.

PostgreSQL makes successful transactions behave as if they ran **one after another**.

It may abort a transaction when it detects a serialization conflict.

The application should **retry** the transaction safely.

**Easy Memory:**

> Serializable = strongest isolation + possible retry

---

## Isolation Levels — Easy Table

| Level | Important Point |
|---|---|
| Read Uncommitted | PostgreSQL treats it as Read Committed |
| Read Committed | **Default**, snapshot per statement |
| Repeatable Read | Stable snapshot |
| Serializable | Strongest, may require retry |

---

# 5. Locks

Locks control access when multiple transactions try to modify the same data.

### Row-Level Lock

Locks specific rows.

Example:

```sql
SELECT *
FROM accounts
WHERE id = 1
FOR UPDATE;
```

This locks the selected row so another transaction cannot modify it in conflicting ways until the lock is released.

### Table-Level Lock

Locks a larger part of the table.

Used by some DDL and other operations.

### Advisory Lock

Application-defined lock.

```text
Application
    ↓
Advisory Lock("order:123")
    ↓
Do some work
    ↓
Release lock
```

PostgreSQL doesn't know what the key means; the application defines its meaning.

---

# 6. Deadlock

A **deadlock** happens when transactions wait for each other.

```text
Transaction A
    ↓
Locks Row 1
    ↓
Waiting for Row 2

Transaction B
    ↓
Locks Row 2
    ↓
Waiting for Row 1
```

Neither can continue.

PostgreSQL detects the deadlock and **aborts one transaction**.

### How to reduce deadlocks

- Keep transactions short
- Acquire locks in a consistent order
- Avoid unnecessary locks
- Retry transient failures

**Easy Memory:**

> Deadlock = Transactions waiting for each other

---

# 7. Pessimistic Locking

**Lock first, then work.**

Example:

```sql
BEGIN;

SELECT *
FROM inventory
WHERE id = 42
FOR UPDATE;

UPDATE inventory
SET quantity = quantity - 1
WHERE id = 42;

COMMIT;
```

The row is locked before modifying it.

Useful when **conflicts are likely**.

**Easy Memory:**

> Pessimistic = **Lock first**

---

# 8. Optimistic Locking

**Don't lock first. Check for changes when updating.**

Usually uses a `version` column.

Example:

```text
id = 42
version = 7
```

Update:

```sql
UPDATE items
SET value = 'new-value',
    version = version + 1
WHERE id = 42
AND version = 7;
```

If **1 row** is updated:

```text
Success
```

If **0 rows** are updated:

```text
Someone else changed the row
→ Conflict
→ Reload / retry
```

**Easy Memory:**

> Optimistic = **Check version before updating**

---

# 9. Pessimistic vs Optimistic

| | Pessimistic | Optimistic |
|---|---|---|
| Approach | Lock first | Check for conflict |
| Example | `FOR UPDATE` | Version column |
| Best when | Conflicts likely | Conflicts uncommon |
| Problem | Waiting/blocking | Retries/conflicts |

---

# 10. Transaction Best Practices

### Keep transactions short

Long transactions can:

- Hold locks longer
- Increase contention
- Keep old MVCC versions around longer

### Use constraints

Put important rules in the database where possible.

Example:

```sql
CHECK (balance >= 0)
```

### Choose appropriate isolation

Don't always use `Serializable`.

Use the **weakest isolation level that still guarantees correctness**.

### Make retries safe

Deadlocks and serialization failures can require retries.

Make retryable operations **idempotent or otherwise safe to repeat**.

---

# Easy Interview Memory

```text
Transaction
    ↓
All succeed or all fail

MVCC
    ↓
Multiple row versions → better concurrency

Isolation
    ↓
Controls what transactions can see

Locks
    ↓
Control concurrent access

Pessimistic
    ↓
Lock first

Optimistic
    ↓
Check version

Deadlock
    ↓
Transactions waiting for each other
```

## Interview Answer

> "PostgreSQL uses transactions to group operations so they commit or roll back together. It uses MVCC to provide concurrency by maintaining row versions. PostgreSQL supports Read Committed, Repeatable Read, and Serializable isolation levels. For concurrency control, we can use row locks such as `FOR UPDATE` or optimistic locking with a version column. Transactions should be kept short, and applications should safely retry deadlocks or serialization failures."