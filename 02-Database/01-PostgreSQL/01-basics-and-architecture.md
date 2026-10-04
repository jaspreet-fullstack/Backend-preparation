# PostgreSQL Basics and Architecture

PostgreSQL is an **open-source RDBMS** that stores data in tables and uses SQL.

It is a good choice when the application needs **relationships, constraints, joins, and reliable transactions**.

## 1. Core Concepts

- **Database** → Contains schemas.
- **Schema** → Contains tables, views, indexes, and other objects.
- **Table** → Stores data in rows and columns.
- **Primary Key** → Uniquely identifies a row.
- **Foreign Key** → Creates a relationship between tables.
- **JSONB** → Stores and queries JSON data when some fields are semi-structured.

Example:

```text id="9n0k7e"
Database
   ↓
Schema
   ↓
Tables
   ├── users
   └── orders
```

## DDL vs. DML

| Category | Full name | Purpose | PostgreSQL examples |
|---|---|---|---|
| **DDL** | Data Definition Language | Defines or changes database objects and schema | `CREATE TABLE`, `ALTER TABLE`, `DROP TABLE` |
| **DML** | Data Manipulation Language | Inserts, changes, or removes table rows | `INSERT`, `UPDATE`, `DELETE` |

```sql
-- DDL: define the table structure
CREATE TABLE products (
      id BIGINT PRIMARY KEY,
      name TEXT NOT NULL
);

-- DML: change table data
INSERT INTO products (id, name) VALUES (1, 'Keyboard');
UPDATE products SET name = 'Mechanical keyboard' WHERE id = 1;
DELETE FROM products WHERE id = 1;
```

`SELECT` reads rows. It is often grouped with DML in general explanations, but is also commonly called **DQL (Data Query Language)**.

## 2. Request Flow

```text id="b2y8kp"
Application
     ↓
Connection Pool
     ↓
PostgreSQL
     ↓
Parse → Plan → Execute
     ↓
Result
```

### Connection Pool

Creating too many PostgreSQL connections uses **memory and CPU**.

A connection pool keeps a limited number of connections and **reuses them** across requests.

> **Connection Pool = Reuse a limited number of DB connections**

A pooler such as **PgBouncer** can also manage and reuse PostgreSQL connections.

## 3. When to Use PostgreSQL

PostgreSQL is a good fit when:

- Data has **relationships**.
- You need **joins**.
- You need strong **constraints**.
- Multiple operations need to succeed or fail together using **transactions**.
- You need flexible SQL queries.

## Interview Answer

> **PostgreSQL is an open-source relational database that stores structured data in tables. I would choose it when the application needs relationships, joins, constraints, and reliable transactions. In production, I would also consider indexes, connection pooling, backups, and how the database will scale with increasing traffic.**