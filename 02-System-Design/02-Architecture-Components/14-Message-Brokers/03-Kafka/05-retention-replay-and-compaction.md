# Kafka Retention, Replay, and Compaction

Kafka normally keeps records for a configured time or size limit, even after a consumer has read them. Each consumer group tracks its own offsets, so it can read at its own pace.

## Replay

A consumer can move its offset back and read retained records again. This is useful for rebuilding a search index or fixing a consumer after a bug. Replay can put load on Kafka and downstream services, so plan capacity and avoid repeating side effects.

## Log compaction

With **log compaction**, Kafka keeps the latest record for each key (and deletion markers called tombstones for a configured period). It is useful for keeping the latest state per entity, but it is not a full history of every update.

```text
Key user-7: name=A -> name=B -> name=C
Compacted view:             name=C
```

## Interview answer

Use retention when consumers need a replayable event history for a limited period. Use compaction when consumers need the latest value per key. State the retention window and how replay avoids repeating external actions.