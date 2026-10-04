# PostgreSQL Indexes and Query Plans

## 1. What is an Index?

An **index** helps PostgreSQL find rows faster without scanning the entire table.

```text
Without Index:
Query → Scan entire table → Find rows

With Index:
Query → Index → Find matching rows → Get data
```

### Trade-off

Indexes make **reads faster**, but they:

- Use extra storage
- Make `INSERT`, `UPDATE`, and `DELETE` slightly slower because the index also needs to be updated

**Easy Memory:**

> Index = Faster reads, extra storage + slower writes

---

## 2. Common Index Types

### B-tree

The **default and most commonly used** index.

Good for:

- `=`
- `<`, `>`, `<=`, `>=`
- `BETWEEN`
- `ORDER BY`

Example:

```sql
CREATE INDEX idx_users_email
ON users(email);
```

Useful for:

```sql
SELECT *
FROM users
WHERE email = 'vishal@gmail.com';
```

**Easy Memory:**

> B-tree = Default choice for most queries

---

### GIN (Generalized Inverted Index)

Useful when one row contains **multiple searchable values**, especially:

- `JSONB`
- Arrays
- Full-text search

Example:

```sql
CREATE INDEX idx_products_data
ON products USING GIN(data);
```

**Easy Memory:**

> GIN = JSONB / Array / Full-text search

### B-tree vs. Inverted Index

An **inverted index is a type of index**, not the opposite of having an index. In PostgreSQL, GIN means **Generalized Inverted Index**. A B-tree is the usual choice for ordered scalar keys; an inverted index maps each searchable value or term to the rows that contain it.

| Structure | How it maps data | Good for |
|---|---|---|
| **B-tree** | An ordered key maps to matching row locations | Equality, ranges, and sorting on scalar values |
| **Inverted index (GIN)** | A value or term maps to a list of rows containing it | Searching elements within arrays, `JSONB`, and full-text documents |

For example, if product rows contain tag arrays, a GIN index can map each tag to the matching product rows:

```text
Product 1: [database, sql]
Product 2: [database, postgres]

Inverted index:
database -> Product 1, Product 2
sql      -> Product 1
postgres -> Product 2
```

GIN is useful for containment or membership searches, but it is not a replacement for B-tree: it does not provide the same ordered range and sorting behavior, and maintaining it can add write cost.

---

### BRIN (Block Range INdex)

Useful for **very large tables** where column values follow the physical order of rows.

Common example:

```text
Orders inserted over time:

10:00
10:01
10:02
10:03
...
```

A timestamp column often works well with BRIN in large append-heavy tables.

**Easy Memory:**

> BRIN = Huge table + data follows physical order

---

### Partial Index

An index that covers **only some rows** based on a condition.

Example:

```sql
CREATE INDEX idx_active_users
ON users(email)
WHERE active = true;
```

This index only contains active users.

Useful when queries frequently target a specific subset.

**Easy Memory:**

> Partial Index = Index only the rows you need

---

# 3. Composite Index

A **composite index** contains multiple columns.

Example:

```sql
CREATE INDEX idx_orders_customer_date
ON orders(customer_id, created_at);
```

This can help:

```sql
SELECT *
FROM orders
WHERE customer_id = 42
ORDER BY created_at DESC;
```

### Column Order Matters

For:

```text
(customer_id, created_at)
```

It is very useful when querying:

```sql
WHERE customer_id = 42
```

or:

```sql
WHERE customer_id = 42
ORDER BY created_at DESC;
```

But it is generally **less useful for a query using only**:

```sql
WHERE created_at = ...
```

because `customer_id` is the first column.

**Easy Memory:**

> Composite index → **column order matters**

---

# 4. EXPLAIN

`EXPLAIN` shows **how PostgreSQL plans to execute a query**.

```sql
EXPLAIN
SELECT *
FROM orders
WHERE customer_id = 42;
```

It helps you see things like:

- Sequential Scan
- Index Scan
- Join strategy
- Estimated rows
- Sort operations

---

# 5. EXPLAIN ANALYZE

`EXPLAIN ANALYZE` actually **runs the query** and shows the actual execution information.

```sql
EXPLAIN ANALYZE
SELECT id, total
FROM orders
WHERE customer_id = 42
ORDER BY created_at DESC
LIMIT 20;
```

It helps compare:

```text
Estimated:
Planner expected 100 rows

Actual:
Query returned 95 rows
```

### BUFFERS

You can also use:

```sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT ...
```

`BUFFERS` shows information about PostgreSQL's data-page reads/hits, helping identify I/O-heavy queries.

**Important:**

> `EXPLAIN ANALYZE` executes the query, so be careful with `UPDATE`, `DELETE`, or other mutating queries.

---

# 6. Sequential Scan vs Index Scan

### Sequential Scan

PostgreSQL scans the table rows to find matches.

```text
Table
 ↓
Row 1
Row 2
Row 3
Row 4
...
 ↓
Find matching rows
```

### Index Scan

PostgreSQL uses the index to find relevant rows.

```text
Query
 ↓
Index
 ↓
Matching row locations
 ↓
Table
```

An index is **not always better**.

For a small table or a query returning a large percentage of rows, PostgreSQL may correctly choose a sequential scan.

---

# 7. Important Interview Points

- Don't create indexes on every column.
- Index columns used frequently in `WHERE`, `JOIN`, and sometimes `ORDER BY`.
- Composite index column order matters.
- Indexes improve reads but add write overhead.
- Indexes consume storage.
- Use `EXPLAIN` to understand the query plan.
- Use `EXPLAIN ANALYZE` to see actual execution.
- The PostgreSQL planner may choose a sequential scan even when an index exists.

## Easy Memory

```text
B-tree    → Most common / equality / range / sorting
GIN       → JSONB / Array / Full-text
BRIN      → Huge table + ordered data
Partial   → Only selected rows
Composite → Multiple columns; order matters
EXPLAIN   → See query plan
ANALYZE   → Actually run + see actual performance
```

## Interview Answer

> "An index helps PostgreSQL find rows faster without scanning the entire table. B-tree is the default for most equality and range queries, while GIN is useful for JSONB and full-text search, BRIN for very large ordered tables, and partial indexes for specific subsets. Indexes improve reads but consume storage and add write overhead, so I create them based on actual query patterns and validate them using EXPLAIN ANALYZE."