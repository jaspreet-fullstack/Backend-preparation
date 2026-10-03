# Kafka Ordering, Delivery, and Idempotency

## Ordering

Kafka preserves order **within one partition**. Use the same record key, such as `orderId`, to put related events in the same partition. Kafka does not promise a single order across all partitions.

## Delivery behavior

- **At-most-once**: commit the offset before processing. A crash can skip work, but a record is not intentionally processed again.
- **At-least-once**: process first and commit the offset after success. A crash before the commit can cause the record to be processed again.
- Make consumers **idempotent** (safe to run twice), for example by recording processed event IDs or using an idempotent database update.
- An idempotent producer helps avoid duplicate writes to Kafka when a producer retries. Kafka transactions can provide exactly-once processing within Kafka workflows; writes to an external database still need their own deduplication or transaction design.

## Interview answer

Choose at-most-once only if losing some work is acceptable. At-least-once is common when work must not be skipped, but consumers must handle duplicates. State where ordering is required and how it is preserved.