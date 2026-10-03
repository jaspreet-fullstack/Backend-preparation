# MongoDB Data Modeling: Embedding vs. References

Model documents around application access patterns: which data is read together, which data changes together, and how large each record can grow.

## Embed related data when

- The child data is bounded and commonly read with its parent.
- The data can be updated atomically as one document.
- Duplicating a small value is acceptable and avoids frequent lookups.

Example: an order document can embed a bounded shipping-address snapshot so the historical order retains the address used at purchase time.

## Use references when

- Related data is large, unbounded, or independently queried and updated.
- Many records share one entity, and duplicating its full details would make updates expensive or inconsistent.
- The relationship is many-to-many or children have their own lifecycle.

Example: keep a customer document separate from orders when customers can have an unbounded number of orders.

## Tradeoffs and safeguards

- Embedding can make reads simpler but duplicates data; update duplicated fields deliberately.
- References avoid duplication but require additional queries or aggregation lookups.
- Avoid unbounded arrays inside a document. MongoDB documents have a maximum BSON size of 16 MiB, so large or ever-growing child collections should be stored separately.
- Use schema validation for important fields even when the collection's schema is flexible.

## Interview approach

Start from the most common reads and writes, choose document boundaries, then discuss update consistency, growth limits, and index needs. Avoid choosing embedding or references as a universal rule.
