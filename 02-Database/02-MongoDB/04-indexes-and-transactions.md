# MongoDB Indexes and Transactions

Indexes improve selected reads by allowing MongoDB to locate matching documents without scanning the whole collection. They consume storage and add work to writes, so create them for measured query patterns.

## Common index types

- **Single-field and compound:** Support filters and sorts on selected fields. Compound field order matters; use the index prefix that matches important queries.
- **Multikey:** Indexes values inside array fields.
- **Unique:** Enforces uniqueness for indexed values.
- **Text:** Supports text search with configured tokenization and language behavior.
- **TTL:** Removes eligible documents after a configured time; expiration is asynchronous, not an exact scheduler.

Use `explain("executionStats")` to inspect examined documents, returned documents, and the chosen plan. Avoid indexing every field: excess indexes slow writes and increase storage and memory pressure.

## Atomicity and transactions

A single-document write is atomic, including updates to embedded fields. Multi-document transactions are available on replica sets and sharded clusters, but they add coordination and latency.

- Prefer a document shape that keeps common updates within one document when that is a natural model.
- Use a transaction when a true multi-document invariant requires all-or-nothing behavior.
- Keep transactions short and handle transient transaction errors with safe retries.
- Set read concern and write concern to match durability and consistency requirements; stronger acknowledgements can increase latency.

## Interview reminder

Explain whether the invariant fits in one document, which indexes serve the main filters and sorts, and why a transaction is or is not needed.
