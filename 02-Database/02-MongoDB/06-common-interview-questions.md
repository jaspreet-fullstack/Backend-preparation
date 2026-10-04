# MongoDB Common Interview Questions

### 1. What is MongoDB, and what does BSON mean?

**MongoDB** is a NoSQL document database that stores data as documents inside collections.

**BSON** = Binary JSON. It is MongoDB's binary format for storing documents and supports additional types like dates and binary data.

---

### 2. When should you embed documents vs. use references?

**Embed** when data is small, bounded, and usually accessed with the parent.

**Reference** when data is large, unbounded, shared, or independently updated.

---

### 3. Are MongoDB writes atomic?

Yes. A **single-document write is atomic**.

MongoDB also supports **multi-document transactions** when multiple documents need to be changed atomically.

---

### 4. How do compound indexes work?

A **compound index** indexes multiple fields in a specific order.

```js
db.orders.createIndex({
  customerId: 1,
  createdAt: -1
});
```

Field order matters, and queries can generally use the index starting from its leading fields.

---

### 5. What is a Replica Set?

A **Replica Set** is a group of MongoDB servers that maintain copies of the same data.

```text
       Primary
       /     \
 Secondary  Secondary
```

- Primary → handles writes
- Secondary → replicates data
- Primary failure → election → new primary

---

### 6. What are Read Concern and Write Concern?

**Read Concern** controls the consistency level of reads.

**Write Concern** controls how much acknowledgment is required for a write.

---

### 7. What is a Shard Key?

A **shard key** determines how documents are distributed across shards and helps MongoDB route queries.

A poor shard key can cause **hot shards** or **scatter-gather queries**.

---

### 8. When would you use a Multi-Document Transaction?

Use a transaction when multiple documents must be updated **atomically**.

Example:

```text
Account A → -₹100
Account B → +₹100
```

Both operations should succeed or both should fail.

---

### 9. What is an Aggregation Pipeline?

An **aggregation pipeline** processes documents through multiple stages.

Common stages:

```text
$match → $group → $sort → $limit
```

- `$match` → filter
- `$group` → group/calculate
- `$sort` → sort
- `$lookup` → join collections

---

### 10. What is the Maximum BSON Document Size?

A MongoDB BSON document can be at most **16 MiB**.

This is important when embedding data because unbounded arrays can make a document too large.

---

### 11. How is Sharding different from Replication?

**Replication** keeps copies of the same data for **high availability**.

**Sharding** distributes different data across multiple servers for **scaling**.

```text
Replication → Same data → Multiple servers

Sharding → Different data → Different servers
```

---

### 12. How do you decide between MongoDB and PostgreSQL?

Consider:

- Data relationships
- Query patterns
- Transaction requirements
- Data structure
- Scalability requirements

Choose the database based on the **workload and data model**, not simply because one is SQL or NoSQL.