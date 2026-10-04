# MongoDB Basics and Document Model

MongoDB is a **NoSQL document database**.

It stores data as **BSON documents** inside **collections**, which are inside databases.

```text
MongoDB
  ↓
Database
  ↓
Collection
  ↓
Document
  ↓
Fields
```

Example:

```json
{
  "_id": 101,
  "name": "Vishal",
  "email": "vishal@gmail.com",
  "address": {
    "city": "Ludhiana",
    "country": "India"
  }
}
```

---

## 1. Document

A **document** is a single record in MongoDB.

It contains fields and can contain **nested objects and arrays**.

```json
{
  "name": "Vishal",
  "skills": ["Node.js", "PostgreSQL"],
  "address": {
    "city": "Ludhiana"
  }
}
```

### `_id`

Every document has an `_id` that uniquely identifies it **within its collection**.

```json
{
  "_id": 101,
  "name": "Vishal"
}
```

MongoDB automatically creates an `ObjectId` if you don't provide one.

**Easy Memory:**

> Document = one record

---

## 2. Collection

A **collection** is a group of related documents.

Similar to a **table in SQL**, but documents can have different structures.

```text
users collection

Document 1:
{ name: "Vishal", age: 25 }

Document 2:
{ name: "Rahul", age: 30, city: "Delhi" }
```

MongoDB allows this flexible structure.

However, keeping a **consistent structure** is usually easier for queries, indexes, and maintenance.

**Easy Memory:**

> Collection ≈ Table  
> Document ≈ Row

---

## 3. Flexible Schema

MongoDB does not require every document to have exactly the same fields.

Example:

```json
// Document 1
{
  "name": "Vishal",
  "age": 25
}
```

```json
// Document 2
{
  "name": "Rahul",
  "age": 30,
  "company": "ABC"
}
```

Both can exist in the same collection.

You can also use **schema validation** when you want MongoDB to enforce certain rules.

**Easy Memory:**

> MongoDB = Flexible schema, but you can still enforce rules.

---

# 4. Embedded / Nested Data

MongoDB allows related data to be stored inside the same document.

Example:

```json
{
  "_id": 101,
  "name": "Vishal",
  "address": {
    "city": "Ludhiana",
    "country": "India"
  }
}
```

This is useful when the data is usually **read or updated together**.

### Easy Memory

> Keep related data together when it is commonly accessed together.

---

# 5. Atomicity

A write to a **single document is atomic**.

That means:

> The operation on that document either completes or does not take effect.

MongoDB also supports **multi-document transactions**, but they add complexity and overhead.

So when possible, design the document so related data that needs atomic changes can live in the same document.

---

# 8. MongoDB Architecture

A simple production setup can look like:

```text
Application
     ↓
MongoDB Driver
     ↓
Replica Set
     ↓
Primary + Secondaries
```

For a sharded deployment:

```text
Application
     ↓
MongoDB Driver
     ↓
mongos Router
     ↓
Shards
```

---

# When to Use MongoDB

MongoDB is a good fit when:

- Data naturally fits a **document structure**
- Nested data is commonly read together
- Flexible schema is useful
- Access patterns are known
- Horizontal scaling may be needed

Example:

```json
{
  "orderId": 101,
  "customer": {
    "name": "Vishal",
    "email": "vishal@gmail.com"
  },
  "items": [
    {
      "product": "Laptop",
      "quantity": 1
    },
    {
      "product": "Mouse",
      "quantity": 2
    }
  ]
}
```

This order can naturally be stored as one document.

---

## Interview Answer

> "MongoDB is a NoSQL document database that stores BSON documents inside collections. It provides a flexible document model, supports nested data, and single-document writes are atomic.I would choose MongoDB when the data naturally fits documents and the application's access patterns benefit from that model."