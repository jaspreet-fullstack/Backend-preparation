# MongoDB Common Interview Questions

### 1. What is MongoDB, and what does BSON mean?

MongoDB is a document database that stores documents in collections. BSON is its binary-encoded document representation, with types such as dates and binary data in addition to JSON-like values.

### 2. When should you embed documents vs. use references?

Embed bounded data that is commonly read and updated with its parent. Reference large, unbounded, shared, or independently changing data. Decide from access patterns and consistency needs.

### 3. Are MongoDB writes atomic?

A single-document write is atomic. Multi-document transactions are supported on replica sets and sharded clusters, but can add coordination and latency.

### 4. How do compound indexes work?

A compound index covers fields in a defined order. Queries can generally use its leading-field prefixes, so order it around important filters and sorts; validate with `explain("executionStats")`.

### 5. What is a replica set?

A group of MongoDB members that maintain copies of data. A primary accepts writes, secondaries replicate its oplog, and eligible members can elect a new primary after failure.

### 6. What are read concern and write concern?

Read concern controls the consistency/isolation guarantees of returned data. Write concern controls the acknowledgement required for a write, affecting durability, latency, and availability tradeoffs.

### 7. What is a shard key?

A shard key determines how documents are distributed across shards and how queries are routed. Choose one with good distribution and high relevance to common query patterns; a poor key can cause hot shards or scatter-gather reads.

### 8. When would you use a multi-document transaction?

Use one when a correctness invariant truly spans multiple documents and cannot be modeled as one atomic document operation. Keep it short and handle transient retries.

### 9. What is an aggregation pipeline?

An ordered sequence of stages that filters, groups, reshapes, joins, and sorts documents. Use stages such as `$match` and `$group`, and inspect plans and workload cost.

### 10. What is the maximum BSON document size, and why does it matter?

A BSON document is limited to 16 MiB. Avoid unbounded embedded arrays; store growing child data in a separate collection when appropriate.

### 11. How is sharding different from replication?

Sharding distributes different data across shards for capacity; replication keeps copies of the same data for availability and failover. A sharded deployment can replicate each shard.

### 12. How do you decide between MongoDB and PostgreSQL?

Compare data relationships, query patterns, transaction and integrity requirements, expected scale, and team operations. Choose the model that best fits the workload rather than assuming either is universally faster.
