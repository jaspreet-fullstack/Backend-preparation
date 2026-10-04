# Shared Database Fundamentals

These are common database concepts that apply to **PostgreSQL, MongoDB, and other databases**.

## 1. Database, DBMS, and RDBMS

- **Database** → Collection of stored data.
- **DBMS** → Software that stores, manages, and queries data.
- **RDBMS** → DBMS that stores data in **tables (rows and columns)** and supports relationships between tables.

```text
Database → Data
DBMS     → Software that manages data
RDBMS    → DBMS based on relational tables
```

**PostgreSQL** is an **RDBMS**.

**MongoDB** is a **NoSQL document database**, not an RDBMS.

> **RDBMS = Relational Database Management System**

## 2. Entity, Schema, and Model

### Entity

An **entity** is a real-world object or concept that we store data about.

Examples:

```text
User
Order
Product
Payment
```

> **Entity = What we store information about**

### Schema

A **schema** defines the **structure of the data**.

For example, a User schema might define:

```text
User
├── id
├── name
├── email
└── createdAt
```

> **Schema = Structure / rules of the data**

### Model

A **model** is the application's representation of an entity and its data structure, usually used by the application/ORM to interact with the database.

Example:

```text
User Entity
     ↓
User Schema
     ↓
User Model
     ↓
Database
```

> **Entity = What**  
> **Schema = Structure**  
> **Model = Application representation used to work with the data**

**Note:** The exact meaning of "model" depends on the framework/ORM. For example, Mongoose models provide an interface for MongoDB documents, while ORMs such as Prisma or Sequelize provide application-level models.

## 3. Constraints

A **constraint** is a rule that prevents invalid data.

Common constraints:

- `PRIMARY KEY` → Uniquely identifies a row.
- `FOREIGN KEY` → Maintains relationships between tables.
- `UNIQUE` → Prevents duplicate values.
- `NOT NULL` → Value is required.
- `CHECK` → Value must satisfy a condition.

> **Constraints = Protect data correctness**

Database constraints are important because application-level validation alone can be bypassed by another service or writer.

## 4. Normalization

**Normalization** reduces duplicate data by splitting related data into separate tables.

Example:

```text
Users
id | name

Orders
id | user_id | amount
```

> **Normalization = Reduce duplication**

## 5. Denormalization

**Denormalization** intentionally duplicates data to make reads faster or simpler.

> **Denormalization = Duplicate data for faster reads**

The tradeoff is that duplicated data must be kept consistent.

## 6. ACID

ACID describes the properties of reliable transactions.

- **Atomicity** → All operations succeed or none do.
- **Consistency** → Data remains valid according to database rules.
- **Isolation** → Concurrent transactions don't incorrectly interfere.
- **Durability** → Committed data survives supported failures.

> **A = All or nothing**  
> **C = Valid state**  
> **I = Transactions don't interfere incorrectly**  
> **D = Committed data survives failure**

Both PostgreSQL and MongoDB support transactions, but their behavior differs.

## 7. Choosing a Database

Choose based on:

- Data relationships
- Read/write patterns
- Transaction requirements
- Consistency requirements
- Scale
- Operational requirements

> **Choose the database based on the workload and data model, not simply because SQL or NoSQL is "faster."**

## Interview Answer

> **An RDBMS stores data in related tables and provides features such as constraints and transactions. PostgreSQL is an RDBMS, while MongoDB is a NoSQL document database. I choose between them based on data relationships, read/write patterns, transaction requirements, consistency, and scalability needs.**