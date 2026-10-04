# MongoDB Queries and Aggregation

MongoDB provides:

- **Queries** → Find and filter documents
- **Updates** → Modify documents
- **Aggregation** → Process and analyze documents

---

# 1. Basic Query

Example:

```javascript
db.orders.find(
  { customerId: 42, status: "paid" },
  { _id: 1, total: 1, createdAt: 1 }
)
.sort({ createdAt: -1 })
.limit(20);
```

### What does it do?

```text
Filter
  ↓
customerId = 42
status = "paid"

  ↓

Projection
  ↓
Return only _id, total, createdAt

  ↓

Sort
  ↓
Latest orders first

  ↓

Limit
  ↓
Return 20 orders
```

### Important Methods

| Method | Purpose |
|---|---|
| `find()` | Find documents |
| `sort()` | Sort results |
| `limit()` | Limit number of results |

---

# 2. Projection

Projection controls **which fields are returned**.

```javascript
db.users.find(
  {},
  { name: 1, email: 1 }
);
```

Returns:

```text
name
email
```

instead of the entire document.

`_id` is included by default unless you explicitly exclude it:

```javascript
{ name: 1, email: 1, _id: 0 }
```

**Easy Memory:**

> Projection = Choose which fields to return.

---

# 3. Common Query Operators

## Comparison Operators

```text
$eq   → equal
$ne   → not equal
$gt   → greater than
$gte  → greater than or equal
$lt   → less than
$lte  → less than or equal
$in   → matches any value in a list
```

Example:

```javascript
db.orders.find({
  total: { $gte: 100 }
});
```

Means:

> Find orders where `total >= 100`.

---

# 4. Logical Operators

```text
$and → all conditions
$or  → any condition
$not → not
$nor → none of the conditions
```

Example:

```javascript
db.users.find({
  $or: [
    { age: { $lt: 18 } },
    { age: { $gt: 60 } }
  ]
});
```

Means:

> Find users younger than 18 OR older than 60.

---

# 5. Array Operators

```text
$elemMatch → array element must satisfy multiple conditions
$all       → array contains all specified values
```

Example:

```javascript
db.orders.find({
  items: {
    $elemMatch: {
      sku: "A-17",
      quantity: { $gt: 1 }
    }
  }
});
```

Means:

> Find orders where an array element has `sku = A-17` AND quantity greater than 1.

---

# 6. Element Operators

```text
$exists → checks whether a field exists
$type   → checks the BSON data type
```

Example:

```javascript
db.users.find({
  phone: { $exists: true }
});
```

Means:

> Find users who have a `phone` field.

---

# 7. Update Operators

### `$set`

Changes a field.

```javascript
db.users.updateOne(
  { _id: 1 },
  { $set: { name: "Vishal" } }
);
```

### `$inc`

Increases/decreases a number.

```javascript
db.products.updateOne(
  { _id: 1 },
  { $inc: { stock: -1 } }
);
```

Stock decreases by 1.

### `$push`

Adds an item to an array.

```javascript
db.users.updateOne(
  { _id: 1 },
  { $push: { skills: "Redis" } }
);
```

### `$pull`

Removes matching items from an array.

```javascript
db.users.updateOne(
  { _id: 1 },
  { $pull: { skills: "Redis" } }
);
```

### Easy Memory

```text
$set  → change value
$inc  → change number
$push → add to array
$pull → remove from array
```

---

# 8. Aggregation

**Aggregation** is used when you need to **process or analyze multiple documents**.

It works like a pipeline:

```text
Documents
    ↓
$match
    ↓
$group
    ↓
$sort
    ↓
$limit
    ↓
Result
```

---

# 9. Aggregation Example

Find the top 10 customers by revenue:

```javascript
db.orders.aggregate([
  { $match: { status: "paid" } },

  {
    $group: {
      _id: "$customerId",
      orderCount: { $sum: 1 },
      revenue: { $sum: "$total" }
    }
  },

  { $sort: { revenue: -1 } },

  { $limit: 10 }
]);
```

### Step 1: `$match`

```javascript
{ $match: { status: "paid" } }
```

Only keeps paid orders.

```text
All orders
    ↓
Paid orders
```

### Step 2: `$group`

```javascript
{
  $group: {
    _id: "$customerId",
    orderCount: { $sum: 1 },
    revenue: { $sum: "$total" }
  }
}
```

Groups orders by customer and calculates:

- Number of orders
- Total revenue

### Step 3: `$sort`

```javascript
{ $sort: { revenue: -1 } }
```

Sorts revenue from **highest to lowest**.

### Step 4: `$limit`

```javascript
{ $limit: 10 }
```

Returns only the **top 10 customers**.

---

# 10. Common Aggregation Stages

| Stage | Purpose |
|---|---|
| `$match` | Filter documents |
| `$project` | Select/reshape fields |
| `$group` | Group and calculate |
| `$sort` | Sort results |
| `$limit` | Limit results |
| `$skip` | Skip results |
| `$lookup` | Combine data from another collection |
| `$unwind` | Expand array elements into separate documents |

### Easy Memory

> `$match` → filter  
> `$group` → group/calculate  
> `$sort` → sort  
> `$limit` → limit  
> `$lookup` → join  
> `$unwind` → expand array

---

# 11. `$lookup`

`$lookup` is used to combine data from another collection.

It is similar to a **JOIN in SQL**.

Example:

```javascript
db.orders.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customerId",
      foreignField: "_id",
      as: "customer"
    }
  }
]);
```

```text
orders
   ↓
$lookup
   ↓
customers
   ↓
Combined result
```

**Easy Memory:**

> `$lookup` = MongoDB equivalent of a JOIN

---

# 12. `$unwind`

`$unwind` takes an **array field** and creates a **separate document for each array element**.

Suppose:

```javascript
{
  orderId: 101,
  items: ["Laptop", "Mouse", "Keyboard"]
}
```

Using:

```javascript
{ $unwind: "$items" }
```

produces:

```text
{ orderId: 101, items: "Laptop" }
{ orderId: 101, items: "Mouse" }
{ orderId: 101, items: "Keyboard" }
```

### Why use it?

It allows you to **process each array element separately**.

Example:

```javascript
db.orders.aggregate([
  { $unwind: "$items" },
  {
    $group: {
      _id: "$items",
      count: { $sum: 1 }
    }
  }
]);
```

This can be used to find how many times each product was ordered.

**Easy Memory:**

> `$unwind` = Array → separate document for each element

**Interview Line:**

> "`$unwind` breaks an array into separate documents so each array element can be processed individually."

---

# 13. Pagination

For small datasets, you may use:

```javascript
.skip(20)
.limit(20)
```

For very large datasets, deep `skip()` can become inefficient.

A common alternative is **cursor/range-based pagination** using an indexed field such as `_id` or `createdAt`.

```text
Page 1
   ↓
last_id = 100

Page 2
   ↓
find documents where _id > 100
```

**Easy Memory:**

> Large dataset → prefer cursor/range pagination over deep `skip()`.

---

# 14. Query Performance

Design your:

- Document structure
- Indexes
- Filters
- Sort order

around the application's **actual query patterns**.

For large workloads, inspect the query plan:

```javascript
db.orders.find({
  customerId: 42
}).explain("executionStats");
```

This helps understand how MongoDB executes the query.

---

## Interview Answer

> "MongoDB queries use filters and projections to find and return documents. For more complex processing, I use the aggregation pipeline, where stages such as `$match`, `$group`, `$sort`, `$lookup`, and `$unwind` process documents step by step. For performance, I design indexes around actual query patterns and use cursor-based pagination for large datasets."