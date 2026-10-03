# MongoDB Queries and Aggregation

MongoDB queries select documents using filters and projections. An aggregation pipeline passes documents through ordered stages to filter, reshape, join, group, and sort results.

## Basic query

```javascript
db.orders.find(
  { customerId: 42, status: "paid" },
  { _id: 1, total: 1, createdAt: 1 }
).sort({ createdAt: -1 }).limit(20)
```

The filter, sort, and projection should match the application's actual query needs and available indexes.

## Common query operators

- **Comparison:** `$eq`, `$ne`, `$gt`, `$gte`, `$lt`, `$lte`, `$in`.
- **Logical:** `$and`, `$or`, `$not`, `$nor`.
- **Element and arrays:** `$exists`, `$type`, `$elemMatch`, `$all`.
- **Update operators:** `$set` replaces selected field values; `$inc` changes a number atomically; `$push` appends to an array; `$pull` removes matching array elements.

```javascript
db.orders.find({
  status: { $in: ["paid", "shipped"] },
  total: { $gte: 100 },
  items: { $elemMatch: { sku: "A-17", quantity: { $gt: 1 } } }
})
```

## Aggregation example

```javascript
db.orders.aggregate([
  { $match: { status: "paid" } },
  { $group: { _id: "$customerId", orderCount: { $sum: 1 }, revenue: { $sum: "$total" } } },
  { $sort: { revenue: -1 } },
  { $limit: 10 }
])
```

Common stages include `$match` to filter, `$project` to reshape, `$group` to aggregate, `$sort` to order, and `$lookup` to combine data from another collection. Put selective `$match` stages early when semantics allow, and inspect query plans for large workloads.

## Interview considerations

- Keep common read paths efficient with a model and indexes designed for their filters and sort order.
- Aggregation can move data processing to the database, but expensive stages and large intermediate results still need capacity and monitoring.
- Use pagination deliberately; avoid deep offset-like scans for large result sets when range/keyset pagination is more suitable.
- See [MongoDB indexes and transactions](04-indexes-and-transactions.md) for index design and atomicity.
