# MongoDB Indexes and Transactions

## 1. MongoDB Index

An **index** helps MongoDB find documents faster without scanning the entire collection.

```text id="0o6qv4"
Without Index:
Query → Scan all documents → Find match

With Index:
Query → Index → Find matching documents
```

### Trade-off

Indexes:

- Make some reads faster
- Use extra storage
- Make writes slightly slower because indexes must also be updated

**Easy Memory:**

> Index = Faster reads + extra storage + slower writes

---

# 2. Common Index Types

## Single-Field Index

Index on one field.

```javascript id="72j1my"
db.users.createIndex({ email: 1 });
```

Useful for:

```javascript id="t1m2x8"
db.users.find({ email: "vishal@gmail.com" });
```

---

## Compound Index

Index on multiple fields.

```javascript id="07fqgp"
db.orders.createIndex({
  customerId: 1,
  createdAt: -1
});
```

Useful for queries such as:

```javascript id="dbn1id"
db.orders.find({
  customerId: 42
}).sort({
  createdAt: -1
});
```

### Important

**Field order matters.**

For:

```text id="6ppp6b"
{ customerId: 1, createdAt: -1 }
```

`customerId` is the first field, so queries using `customerId` can make good use of the index.

**Easy Memory:**

> Compound index = Multiple fields + field order matters

---

# 3. Multikey Index

A **multikey index** indexes values inside an array field.

Example document:

```javascript id="u6b8r1"
{
  name: "Vishal",
  skills: ["Node.js", "MongoDB", "Redis"]
}
```

Index:

```javascript id="2e1kzq"
db.users.createIndex({ skills: 1 });
```

Now MongoDB can efficiently query:

```javascript id="1x3e0q"
db.users.find({
  skills: "Redis"
});
```

**Easy Memory:**

> Multikey = Index an array field

---

# 4. Unique Index

A **unique index** prevents duplicate values.

Example:

```javascript id="8o4lpn"
db.users.createIndex(
  { email: 1 },
  { unique: true }
);
```

Now two users cannot have the same email.

```text id="p6h0lz"
user1 → vishal@gmail.com ✅

user2 → vishal@gmail.com ❌
```

**Easy Memory:**

> Unique index = Prevent duplicates

---

# 5. Text Index

A **text index** is used for text search.

```javascript id="g0k5x4"
db.products.createIndex({
  description: "text"
});
```

Then:

```javascript id="d9k5m3"
db.products.find({
  $text: {
    $search: "wireless keyboard"
  }
});
```

**Easy Memory:**

> Text index = Text search

---

# 6. TTL Index

**TTL = Time To Live**

A TTL index automatically removes documents after a configured amount of time.

Example:

```javascript id="1qyds8"
db.sessions.createIndex(
  { createdAt: 1 },
  { expireAfterSeconds: 3600 }
);
```

The session becomes eligible for deletion after 1 hour.

Important:

> TTL deletion is **automatic but not exact to the second**. MongoDB removes expired documents asynchronously.

**Easy Memory:**

> TTL = Automatically remove old documents

---

# 7. Check Index Usage

Use:

```javascript id="8q3e8h"
db.users.find({
  email: "vishal@gmail.com"
}).explain("executionStats");
```

This helps you see:

- Documents examined
- Documents returned
- Query plan
- Index usage

### Important

Don't create indexes on every field.

Too many indexes:

- Use more storage
- Increase write cost
- Increase memory usage

**Easy Memory:**

> Create indexes based on actual query patterns.

---

# 8. MongoDB Atomicity

A **single-document write is atomic**.

For example:

```javascript id="4o6ybr"
db.accounts.updateOne(
  { _id: 1 },
  {
    $inc: { balance: -100 }
  }
);
```

The update to that document happens **as one atomic operation**.

This is one reason MongoDB document design is important.

If related data can naturally stay inside one document, you can often avoid a multi-document transaction.

---

# 9. MongoDB Transactions

MongoDB also supports **multi-document transactions**.

Use a transaction when multiple documents must be changed **together**.

Example:

```text id="85d0sj"
Account A → -100
Account B → +100
```

Both should succeed:

```text id="gq3k6h"
Transaction
     ↓
A -100
B +100
     ↓
COMMIT
```

If one fails:

```text id="54n8kt"
A -100
B failed
     ↓
ROLLBACK
     ↓
Both changes undone
```

---

# 10. Keep Transactions Short

Avoid long-running transactions.

Long transactions can:

- Increase resource usage
- Increase contention
- Increase latency

Make retryable transactions **safe to run again** because transient errors can require retries.

---

# 11. Read Concern and Write Concern

These control **consistency and durability** in MongoDB.

## Write Concern

Controls **how much confirmation MongoDB requires before acknowledging a write**.

```text
Application
     ↓
  Write
     ↓
 MongoDB
     ↓
How much confirmation is required?
```

Common:

- `w: 0` → No acknowledgment
- `w: 1` → Primary acknowledges the write
- `w: "majority"` → Majority of voting members acknowledge the write

**Easy Memory:**

> Write Concern = **How safely should my write be acknowledged?**

---

## Read Concern

Controls **what consistency level a read should provide**.

Common:

- `local` → Returns locally available data
- `majority` → Returns majority-committed data
- `linearizable` → Read the latest majority-committed value as of the time the read happens.

**Easy Memory:**

> Read Concern = **How consistent should my read be?**

---

## Interview Answer

> "MongoDB indexes improve read performance but add storage and write overhead, so I create them based on actual query patterns. Common indexes include single-field, compound, multikey, unique, text, and TTL indexes. A single-document write is atomic by default. I use multi-document transactions only when multiple documents need to change atomically, and I keep those transactions short and safely retryable."