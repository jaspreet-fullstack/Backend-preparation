# Database Indexes

An **index** is a separate lookup structure that helps a database find matching records without scanning every row or document. SQL and document databases both use indexes, but their available index types and implementation details vary.

## Why indexes help

An index maps indexed values to locations of matching records. The database can seek through this structure and fetch only matching records instead of reading the whole collection/table. Indexes are most useful for frequent filters, joins, sorts, and uniqueness checks.

## Common index structures

### B-tree

A B-tree keeps keys ordered in a balanced tree. It commonly supports equality and range lookups, and can help with sorting. B-tree-style indexes are the default for many common query patterns in PostgreSQL and MongoDB.

### Hash

A hash index maps a key through a hash function to a bucket. It is designed for equality lookups, not ranges or ordered scans. Hash-index support and behavior are database-specific, so check the engine's documentation and query plan before choosing one.

## Composite / compound indexes

A composite (SQL) or compound (MongoDB) index includes multiple fields. Field order matters: an index on `(customer_id, created_at)` can support a query filtering by `customer_id` and sorting by `created_at`, but usually cannot efficiently serve a query on `created_at` alone. The exact rules vary by engine; design the order around real query filters and sort patterns.

## Index tradeoffs: when indexes hurt

- Indexes consume disk and memory and add work to inserts, updates, and deletes.
- Low-selectivity fields (fields with few distinct values) may not narrow a search enough to justify an index, though a combined or partial index may still help.
- Small tables may be faster to scan than to traverse an index.
- Too many, overlapping, or unused indexes increase write costs and maintenance work.
- A query may not use an index if its expressions, types, sort order, or predicates do not match the index definition.
- Never add an index only because a field exists; confirm that it improves a significant query.

## Verify with a query plan

Use the database's explain facility to see whether a query scans the collection/table or uses an index, how many records it examines, and whether it performs a large sort. A query planner may correctly choose a scan for small data sets or unselective filters.

## Interview answer

Start with common slow queries and index their filter, join, and sort patterns. Explain the index structure, field order, extra storage and write cost, and how you verified the query plan. Link engine-specific behavior to the PostgreSQL or MongoDB notes.