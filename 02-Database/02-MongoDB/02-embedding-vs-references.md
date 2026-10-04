# MongoDB Data Modeling: Embedding vs References

MongoDB gives you two main ways to store related data:

1. **Embedding** → store related data inside the same document
2. **References** → store related data in separate documents and connect them using an ID

---

## 1. Embedding

Embedding means putting related data **inside the parent document**.

Example:

```json id="q2t5ra"
{
  "_id": 101,
  "name": "Vishal",
  "address": {
    "city": "Ludhiana",
    "country": "India"
  }
}
```

### Use Embedding When

- Data is **small and bounded**
- Data is usually **read together**
- Data is usually **updated together**
- You want to avoid extra queries

### Example: Order + Shipping Address

```json id="fz7r0n"
{
  "orderId": 1001,
  "customerId": 42,
  "shippingAddress": {
    "city": "Ludhiana",
    "pincode": "141001"
  }
}
```

This is useful because the order can keep the **address used at the time of purchase**.

Even if the customer later changes their address, the old order still has the original shipping address.

**Easy Memory:**

> **Embed = Read together → keep together**

---

# 2. References

References mean storing related data in **separate documents** and connecting them using an ID.

Example:

```json id="9z7h7a"
customers
{
  "_id": 42,
  "name": "Vishal"
}
```

```json id="7x1c4b"
orders
{
  "_id": 1001,
  "customerId": 42,
  "amount": 500
}
```

Here, the order refers to the customer using:

```text id="3q2qih"
customerId: 42
```

### Use References When

- Related data is **large**
- Related data can grow **without a fixed limit**
- Data is queried independently
- Data has its **own lifecycle**
- Many documents share the same entity
- Relationship is **many-to-many**

### Example: Customer → Orders

A customer may have:

```text id="p1jv6v"
Customer
   ↓
10 orders
   ↓
100 orders
   ↓
10,000 orders
```

Don't keep all orders inside the customer document.

Instead:

```text id="l2e1i8"
customers collection
        ↓
customerId

orders collection
        ↓
customerId
```

**Easy Memory:**

> **Reference = Large / independent / growing data → separate collection**

---

# 3. Embedding vs References

| | Embedding | References |
|---|---|---|
| Data location | Same document | Separate documents |
| Reads | Usually simpler | May need additional query/lookup |
| Duplication | Possible | Less duplication |
| Best for | Small related data | Large/independent data |
| Growth | Bounded | Good for unbounded data |
| Example | Order + address snapshot | Customer + orders |

---

# 4. Avoid Unbounded Arrays

Be careful with arrays that can grow forever.

Bad example:

```json id="5y7f9d"
{
  "_id": 42,
  "name": "Vishal",
  "orders": [
    // thousands or millions of orders
  ]
}
```

The array keeps growing and can make the document too large.

MongoDB has a **16 MiB maximum BSON document size**.

---

# 5. Embedding Can Duplicate Data

Suppose we store customer information inside every order:

```json id="85i0ah"
{
  "orderId": 101,
  "customer": {
    "name": "Vishal",
    "phone": "1234567890"
  }
}
```

If the customer changes their phone number, the old copies may need updating.

So embedding can create **data duplication**.

But sometimes duplication is intentional.

For example, keeping the shipping address inside an order is useful because we want the **historical address**.

---

## Interview Answer

> "In MongoDB, I choose embedding when related data is small, bounded, and usually read or updated together. I use references when the related data is large, independently queried, or can grow without a fixed limit. I also avoid unbounded arrays because MongoDB documents have a 16 MiB size limit. The decision should be based on the application's read and write patterns rather than a fixed rule."