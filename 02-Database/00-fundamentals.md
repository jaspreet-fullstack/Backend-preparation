# Shared Database Fundamentals

These concepts apply across database families, but each engine implements them differently. PostgreSQL-specific SQL examples and MongoDB-specific document modeling are covered in their respective folders.

## Database vs. DBMS

A **database** is an organized collection of data. A **database management system (DBMS)** is the software that stores, queries, protects, and manages that data. PostgreSQL and MongoDB are DBMS products; an application database is a particular managed collection of its data and schema/documents.

## Constraints and data integrity

A **constraint** is a rule that prevents invalid data from being stored. Constraints protect correctness even when data is written by different application paths.

- Relational databases commonly enforce `NOT NULL`, `UNIQUE`, `CHECK`, primary-key, and foreign-key constraints.
- Document databases can validate document shapes and enforce unique indexes, but relationship and foreign-key behavior differs by engine.
- Keep essential invariants in the database where possible; application validation alone can be bypassed by another writer.

## Normalization and denormalization

**Normalization** organizes related facts to reduce duplication and prevent update anomalies. In relational databases this commonly means splitting entities into related tables and connecting them with keys.

**Denormalization** intentionally duplicates or precomputes data to make common reads faster or simpler. It can reduce joins or lookups, but writes must keep copies consistent.

These are design choices, not rules that one database family must always follow. In MongoDB, embedding related data is a common form of denormalization; references keep independently changing or unbounded data separate. See [MongoDB embedding vs. references](02-MongoDB/02-data-modeling-embedding-vs-references.md).

## ACID transactions

ACID describes transaction properties:

- **Atomicity:** All operations in the transaction commit, or none do.
- **Consistency:** A transaction preserves declared rules and invariants when moving the database from one valid state to another.
- **Isolation:** Concurrent transactions behave according to the database's isolation guarantees.
- **Durability:** A committed transaction survives failures covered by the database's durability configuration.

Both PostgreSQL and MongoDB support transactions, but the scope, defaults, and operational costs differ. PostgreSQL commonly groups relational updates in a transaction. MongoDB single-document writes are atomic, and multi-document transactions are available when an operation truly spans documents. See the engine-specific transaction notes for details.

## Choosing a database

Start from data relationships, common reads and writes, required invariants, transaction scope, and operational constraints. Choose the model that naturally supports them; do not assume SQL or NoSQL is universally faster or more scalable.
