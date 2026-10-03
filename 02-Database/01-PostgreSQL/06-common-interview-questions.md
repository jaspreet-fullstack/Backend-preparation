# PostgreSQL Common Interview Questions

### 1. What is PostgreSQL, and when would you choose it?

PostgreSQL is a relational DBMS with SQL, constraints, joins, indexes, and ACID transactions. Choose it when relationships, flexible queries, and multi-step correctness matter.

### 2. What is the difference between a primary key and a foreign key?

A primary key uniquely identifies a row. A foreign key references a key in another table and can enforce referential integrity.

### 3. What is the difference between `WHERE` and `HAVING`?

`WHERE` filters rows before grouping; `HAVING` filters groups after `GROUP BY` and aggregation.

### 4. When would you use `INNER JOIN` vs. `LEFT JOIN`?

Use `INNER JOIN` when only matching rows are needed. Use `LEFT JOIN` when every left-side row must remain, even without a match.

### 5. What is a CTE, and is it always faster than a subquery?

A CTE names a query result for use by the statement that follows. It often improves readability, but is not inherently faster; inspect the plan and PostgreSQL version/behavior.

### 6. What is a window function?

It calculates over related rows without collapsing them into one row per group, for example ranking each customer's orders with `ROW_NUMBER()`.

### 7. What does a composite index's column order affect?

It affects which filters and sorts can use the index. An index on `(customer_id, created_at)` is most useful for queries beginning with `customer_id`; check the plan for actual workloads.

### 8. What is the difference between `EXPLAIN` and `EXPLAIN ANALYZE`?

`EXPLAIN` shows the estimated plan. `EXPLAIN ANALYZE` executes the query and reports actual measurements, so use care with expensive or mutating statements.

### 9. How does MVCC help concurrency?

MVCC lets reads use row-version snapshots so ordinary readers and writers often do not block each other. Old versions eventually need cleanup by `VACUUM`.

### 10. What is the difference between optimistic and pessimistic locking?

Pessimistic locking acquires a lock before changing data. Optimistic locking checks a version or condition at write time and retries or reports a conflict if another writer changed the row.

### 11. When would you partition a PostgreSQL table?

Use partitioning to manage very large tables, support retention/maintenance, or let partition pruning skip irrelevant data. It does not by itself distribute data across multiple database servers.

### 12. Why use a connection pool?

A pool reuses a bounded number of connections and avoids the memory and scheduling cost of creating too many PostgreSQL connections. Size the pool across all application instances, not per instance alone.

### 13. How are replication and backup different?

Replication keeps copies current for availability or read scaling; accidental deletion or corruption may replicate too. Backups provide recovery points and should be tested.
