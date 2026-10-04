# PostgreSQL Schema, Data Types, and Queries

Design the database based on **entities, relationships, constraints, and actual queries**.

## 1. Schema Design

- Give each table a **Primary Key**.
- Use **Foreign Keys** for relationships.
- Use constraints like `NOT NULL`, `UNIQUE`, and `CHECK`.
- Normalize data to reduce unnecessary duplication.
- Use denormalization only when it improves an important read pattern.
- Choose suitable data types.

Common types:

| Type | Use |
|---|---|
| `BIGINT` | Large integer IDs |
| `NUMERIC` | Exact money/decimal values |
| `TEXT` | Text |
| `BOOLEAN` | True/false |
| `TIMESTAMPTZ` | Date and time with timezone |
| `JSONB` | Flexible JSON data |

Use **migrations** to safely change the production schema.

## 2. SQL Keys

- **Candidate Key** → Any column(s) that can uniquely identify a row.
- **Primary Key** → Candidate key chosen as the main identifier.
- **Alternate Key** → Candidate key not chosen as primary key; usually enforced with `UNIQUE`.
- **Foreign Key** → References a key in another table.
- **Composite Key** → Key made from multiple columns.
- **Natural Key** → Real-world/business value, e.g. email.
- **Surrogate Key** → Generated ID, e.g. `id`.

> **Primary Key = Main identifier**  
> **Foreign Key = Relationship**  
> **Composite Key = Multiple columns**

## 3. Example

```sql
CREATE TABLE customers (
    id BIGINT PRIMARY KEY,
    email TEXT NOT NULL UNIQUE
);

CREATE TABLE orders (
    id BIGINT PRIMARY KEY,
    customer_id BIGINT NOT NULL REFERENCES customers(id),
    total NUMERIC(12, 2) NOT NULL CHECK (total >= 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

## 4. Common SQL

### WHERE

Filters rows.

```sql
SELECT *
FROM orders
WHERE customer_id = 42;
```

### GROUP BY

Groups rows for aggregation.

```sql
SELECT customer_id, COUNT(*) AS order_count
FROM orders
GROUP BY customer_id;
```

### HAVING

Filters groups after `GROUP BY`.

```sql
SELECT customer_id, SUM(total) AS revenue
FROM orders
GROUP BY customer_id
HAVING SUM(total) > 1000;
```

### ORDER BY

Sorts the result.

```sql
SELECT *
FROM orders
ORDER BY created_at DESC;
```

> **WHERE → Filter rows**  
> **GROUP BY → Create groups**  
> **HAVING → Filter groups**  
> **ORDER BY → Sort results**

## 5. JOINs

JOINs combine data from multiple tables.

- **(INNER) JOIN** → Only matching rows.
- **LEFT (OUTER) JOIN** → All rows from the left table + matching rows from the right.
- **RIGHT (OUTER) JOIN** → All rows from the right table + matching rows from the left..
- **FULL (OUTER) JOIN** → All rows from both tables.

```sql
SELECT c.id, o.id AS order_id
FROM customers c
LEFT JOIN orders o
    ON o.customer_id = c.id;
```

> **INNER = Matching**  
> **LEFT = Everything from left**  
> **RIGHT = Everything from right**  
> **FULL = Everything from both**

## 6. Subquery and CTE (Common Table Expression)

**Subquery** → Query inside another query.

**CTE (`WITH`)** → Gives a name to a query result, making complex queries easier to read.

```sql
WITH customer_totals AS (
    SELECT customer_id, SUM(total) AS revenue
    FROM orders
    GROUP BY customer_id
)
SELECT *
FROM customer_totals
WHERE revenue > 1000;
```

> **Subquery = Query inside query**  
> **CTE = Named query result**

## 7. Window Functions

Window functions calculate values across related rows **without combining them into one row**.

Example:

```sql
SELECT
    customer_id,
    id,
    total,
    ROW_NUMBER() OVER (
        PARTITION BY customer_id
        ORDER BY created_at DESC
    ) AS rank
FROM orders;
```

> **GROUP BY → Combines rows**  
> **Window function → Keeps rows and calculates across them**

## 8. UNION

Combines results from multiple queries.

- `UNION` → Removes duplicates.
- `UNION ALL` → Keeps duplicates and is usually faster.

```text
UNION      → Combine + remove duplicates
UNION ALL  → Combine + keep duplicates
```

## 9. Views, Functions, and Procedures

- **View** → Saved query that behaves like a virtual table.
- **Materialized View** → Stores the query result and needs refreshing.
- **Function** → Returns a value/result and can be called from SQL.
- **Procedure** → Called using `CALL` and is used for procedural operations.

> For interviews, prioritize **queries, joins, indexes, constraints, and transactions** over database-side programming.

## 10. Interview Considerations

- Use a **join table** for many-to-many relationships.
- Use `NUMERIC` for **money**, not floating-point types.
- Add indexes based on important query patterns.
- Use `JSONB` for genuinely flexible data.
- Frequently queried or constrained data usually belongs in **proper typed columns**.

## Interview Answer

> **When designing a PostgreSQL schema, I first identify entities and relationships, then define primary keys, foreign keys, constraints, and appropriate data types. For queries, I use joins, grouping, CTEs, subqueries, and window functions based on the requirement. I also consider indexes and query patterns to keep important queries efficient.**