# PostgreSQL Basics and Architecture

PostgreSQL is an open-source relational database that stores structured data in tables and uses SQL. It is often chosen when relationships, constraints, flexible queries, and reliable transactions are important.

## Core concepts

- A database contains schemas; schemas contain tables, views, indexes, and other objects.
- Rows represent records and columns have defined data types.
- Primary keys identify rows; foreign keys enforce relationships between tables.
- PostgreSQL supports transactions, constraints, joins, and extensions. `JSONB` can store and query semi-structured fields, but does not replace relational modeling by default.

## Request path

```text
Application -> connection pool -> PostgreSQL
                                  |-- parse and plan SQL
                                  |-- read or update data
                                  `-- commit transaction and return result
```

PostgreSQL commonly uses a server process for each client connection. Creating and maintaining too many connections consumes memory and CPU, so production applications usually connect through a bounded connection pool.

An application pool reuses a small set of database connections across requests. A pooler such as PgBouncer can also multiplex many application clients onto fewer PostgreSQL server connections. Set pool sizes with the total number of application instances and database capacity in mind; otherwise, every instance can create its own oversized pool.

## When it fits

- Data has relationships and needs joins or referential integrity.
- Several changes must succeed or fail together.
- The application needs flexible SQL queries and constraints.

## Interview answer

Choose PostgreSQL when relational queries and transaction correctness matter. Discuss schema and indexes, connection limits, read/write load, backups, and how the database will scale as usage grows.
