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

## Common SQL Query Questions

Assume these tables for the examples:

```text
employees(id, name, department_id, salary, manager_id)
departments(id, name)
users(id, email)
customers(id, name)
orders(id, customer_id, amount, created_at)
```

### 1. Find the second-highest distinct salary

`DENSE_RANK` treats tied salaries as one rank, so this returns every employee tied at the second-highest salary.

```sql
WITH ranked AS (
	SELECT id, name, salary,
		   DENSE_RANK() OVER (ORDER BY salary DESC NULLS LAST) AS salary_rank
	FROM employees
)
SELECT id, name, salary
FROM ranked
WHERE salary_rank = 2;
```
Another way using DISTINCT + OFFSET
```sql
SELECT salary
FROM (
    SELECT DISTINCT salary
    FROM employees
    WHERE salary IS NOT NULL
    ORDER BY salary DESC
    LIMIT 1 OFFSET 1
) AS second_highest;
```

### 2. Find the highest-paid employee in each department

`RANK` preserves ties, so a department can return more than one employee.

```sql
WITH ranked AS (
	SELECT id, name, department_id, salary,
		   RANK() OVER (PARTITION BY department_id ORDER BY salary DESC NULLS LAST) AS salary_rank
	FROM employees
)
SELECT id, name, department_id, salary
FROM ranked
WHERE salary_rank = 1;
```

### 3. Find the top three distinct salaries in each department

```sql
WITH ranked AS (
	SELECT id, name, department_id, salary,
		   DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC NULLS LAST) AS salary_rank
	FROM employees
)
SELECT id, name, department_id, salary
FROM ranked
WHERE salary_rank <= 3
ORDER BY department_id, salary DESC;
```

### 4. Find duplicate email addresses

```sql
SELECT email, COUNT(*) AS occurrences
FROM users
GROUP BY email
HAVING COUNT(*) > 1;
```

### 5. Find employees earning more than their department average

```sql
SELECT id, name, department_id, salary
FROM (
    SELECT
        id,
        name,
        department_id,
        salary,
        AVG(salary) OVER (
            PARTITION BY department_id
        ) AS dept_avg_salary
    FROM employees
) AS e
WHERE salary > dept_avg_salary;
```

### 6. Find customers who have never placed an order

```sql
SELECT c.id, c.name
FROM customers AS c
WHERE NOT EXISTS (
	SELECT 1
	FROM orders AS o
	WHERE o.customer_id = c.id
);
```

`NOT EXISTS` avoids turning unmatched customers into `NULL`-extended rows and expresses the anti-join directly.

### 7. Find each customer's latest order

The `id` tie-breaker makes the result deterministic when two orders have the same timestamp.

```sql
WITH ranked AS (
	SELECT o.*,
		   ROW_NUMBER() OVER (
			   PARTITION BY customer_id
			   ORDER BY created_at DESC, id DESC
		   ) AS rn
	FROM orders AS o
)
SELECT id, customer_id, amount, created_at
FROM ranked
WHERE rn = 1;
```

### 8. Calculate order count and revenue per customer

The `LEFT JOIN` keeps customers who have no orders; `COALESCE` displays zero instead of `NULL` for their revenue.

```sql
SELECT c.id, c.name,
	   COUNT(o.id) AS order_count,
	   COALESCE(SUM(o.amount), 0) AS total_revenue
FROM customers AS c
LEFT JOIN orders AS o ON o.customer_id = c.id
GROUP BY c.id, c.name
ORDER BY total_revenue DESC;
```

For practice, be ready to explain tie behavior (`ROW_NUMBER`, `RANK`, or `DENSE_RANK`), how `NULL` values affect results, and which indexes could support each query.
