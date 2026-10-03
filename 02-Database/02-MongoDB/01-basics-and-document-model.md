# MongoDB Basics and Document Model

MongoDB is a document database. It stores BSON documents in collections, grouped inside databases. Documents can have flexible fields, while schema validation can enforce rules where needed.

## Core concepts

- A document is a record with fields and nested values; `_id` uniquely identifies it within a collection.
- Collections group related documents. Documents in one collection may vary in shape, but consistent structure makes queries and indexes easier to operate.
- A single-document write is atomic. Multi-document transactions are supported, but a data model that keeps common atomic work in one document is often simpler.
- Replica sets provide copies and automatic primary election; sharding distributes data across multiple shards.

```text
Application -> MongoDB driver -> replica set or mongos router
                                      |             |
                                  primary      secondaries
```

## When it fits

- The data naturally forms nested documents and is commonly read or updated together.
- The application needs a flexible document model and can design around known access patterns.
- The team can operate and monitor a distributed database deployment.

## Interview answer

Choose MongoDB when document-shaped data and its access patterns fit the workload. Explain document boundaries, consistency requirements, indexes, replica-set behavior, and the shard key if horizontal distribution is needed.
