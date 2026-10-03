# PostgreSQL Schema, Data Types, and Queries

Design the schema around entities, relationships, integrity rules, and the queries the application actually needs.

## Schema design

- Give each table a primary key and use foreign keys for relationships that must be enforced.
- Normalize repeated facts into related tables to reduce update anomalies; denormalize only for a measured access-pattern need.
- Use constraints such as `NOT NULL`, `UNIQUE`, `CHECK`, and foreign keys to reject invalid data at the database boundary.
- Choose types that match meaning: `BIGINT` for large integer identifiers, `NUMERIC` for exact decimal amounts, `TIMESTAMPTZ` for instants in time, and `JSONB` for queryable flexible attributes.
- Change production schemas with reviewed, repeatable migrations. For large tables, consider whether a migration locks or rewrites data.

## SQL keys

- **Candidate key:** Any minimal column set that uniquely identifies a row.
- **Primary key:** The candidate key chosen as the table's main identifier; it must be unique and not null.
- **Alternate key:** A candidate key not selected as the primary key; enforce it with a `UNIQUE` constraint.
- **Foreign key:** A column or column set that references a key in another table and enforces the relationship.
- **Composite key:** A key made from multiple columns, such as `(order_id, line_number)`.
- **Natural vs. surrogate key:** A natural key has business meaning, such as an externally assigned code; a surrogate key is generated for database identity. Choose stable identifiers and enforce business uniqueness separately when needed.

## Example

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

SELECT id, total
FROM orders
WHERE customer_id = 42
ORDER BY created_at DESC;
```

## Common SQL query building blocks

`WHERE` filters input rows before grouping. Aggregate functions such as `COUNT`, `SUM`, `AVG`, `MIN`, and `MAX` compute values over rows. `GROUP BY` forms groups, `HAVING` filters those groups, and `ORDER BY` sorts the final result.

```sql
SELECT customer_id, COUNT(*) AS order_count, SUM(total) AS revenue
FROM orders
WHERE created_at >= TIMESTAMPTZ '2026-01-01 00:00:00+00'
GROUP BY customer_id
HAVING SUM(total) > 100
ORDER BY revenue DESC;
```

### JOINs

Joins combine related rows. `INNER JOIN` returns matching pairs; `LEFT JOIN` keeps every left-side row and fills missing right-side values with `NULL`; `FULL JOIN` keeps unmatched rows from both sides. Choose the join based on whether unmatched rows should remain in the result.

```sql
SELECT c.id, o.id AS order_id
FROM customers AS c
LEFT JOIN orders AS o ON o.customer_id = c.id;
```

### Subqueries and CTEs

A **subquery** is a query nested inside another query. It can be used as a value, a row source, or a membership test with `EXISTS` / `IN`.

A **CTE** (common table expression) names a query result for use by the following statement. It can make multi-step queries easier to read; a CTE is not automatically faster than an equivalent subquery.

```sql
WITH customer_totals AS (
    SELECT customer_id, SUM(total) AS revenue
    FROM orders
    GROUP BY customer_id
)
SELECT customer_id, revenue
FROM customer_totals
WHERE revenue > 1000;
```

### Window functions

Window functions calculate across related rows without collapsing them into one row per group. `PARTITION BY` defines each window, and `ORDER BY` defines its order.

```sql
SELECT customer_id, id, total,
       ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY created_at DESC) AS order_rank
FROM orders;
```

### UNION

`UNION` combines compatible result sets and removes duplicates. `UNION ALL` keeps duplicates and usually avoids the extra de-duplication work. The queries must return the same number of columns with compatible types in corresponding positions.

## Views, functions, and procedures

- A **view** is a named query; it normally stores the query definition, not a separate result. A materialized view stores results and must be refreshed.
- A **function** returns a value or set and can be called from SQL expressions or queries.
- A **procedure** is invoked with `CALL` and is used for procedural workflows; transaction control is available only in supported invocation contexts.
- **Interview relevance:** Know why these objects exist and when to use them, but prioritize query design, constraints, indexes, and transaction correctness. Keep business logic in the application unless database-side logic provides a clear consistency or operational benefit.

## Interview considerations

- Model many-to-many relationships with a join table when both sides need independent querying or constraints.
- Keep monetary values exact; floating-point types can introduce rounding error.
- Add indexes for important query patterns, but design them with the index and query-plan notes in [PostgreSQL indexes and query plans](03-indexes-and-query-plans.md).
- Use `JSONB` when fields are genuinely flexible; frequently queried, constrained data often belongs in typed columns.
