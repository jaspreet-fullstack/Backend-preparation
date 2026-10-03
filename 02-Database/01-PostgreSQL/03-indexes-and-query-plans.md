# PostgreSQL Indexes and Query Plans

An index lets PostgreSQL find rows without scanning an entire table. Indexes improve selected reads but use storage and add work to inserts, updates, and deletes.

## Common index types

- **B-tree:** Default choice for equality, range comparisons, and ordering.
- **GIN:** Useful for inverted lookups such as `JSONB` containment and full-text search.
- **BRIN:** Compact summaries for very large tables whose values correlate with physical row order, such as append-heavy time data.
- **Partial index:** Covers only rows matching a predicate, reducing index size when queries target a subset.

## Composite indexes

A composite index covers multiple columns. Column order matters: an index on `(customer_id, created_at)` is useful for queries filtering by `customer_id` and then sorting or filtering by `created_at`; it usually does not serve a query that filters only by `created_at` as effectively.

## Query plans

Use `EXPLAIN` to inspect the plan and `EXPLAIN (ANALYZE, BUFFERS)` to run the query and inspect actual timing and buffer activity. `ANALYZE` executes the query, so use care with expensive or mutating statements.

```sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT id, total
FROM orders
WHERE customer_id = 42
ORDER BY created_at DESC
LIMIT 20;
```

Check whether the plan scans too many rows, uses an appropriate index, sorts large result sets, or spends time reading from storage. The planner can correctly choose a sequential scan for small tables or low-selectivity filters.

## Interview reminders

- Index actual query patterns, not every column.
- A covering or composite index may help a frequent query, but validate with real plans and data distributions.
- Too many indexes consume space and slow writes; monitor and remove unused indexes carefully.
