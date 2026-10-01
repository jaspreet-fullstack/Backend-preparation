# Redis Pub/Sub and Streams

Both features send messages between services, but they keep different delivery history.

| Feature | How it works | Good fit |
| --- | --- | --- |
| **Pub/Sub** | Sends a message to subscribers that are listening now; messages are not kept for offline subscribers to replay. | Live updates where missing an event is acceptable. |
| **Streams** | Saves ordered entries with IDs; consumer groups can share work and acknowledge entries. | Work or events that may need retry, tracking, or replay. |

```text
Pub/Sub:  Publisher -> channel -> active subscribers
Streams:  Producer -> retained stream -> consumer group -> acknowledgements
```

## Interview tradeoffs

- With Pub/Sub, a disconnected subscriber misses messages.
- With Streams, plan how long entries are kept, how failed work is retried, and how the stream is trimmed so it does not grow forever.
- Redis Streams are useful for many event-processing needs, but do not assume they replace every dedicated message broker.

## Interview answer

Use Pub/Sub for live notifications that do not need replay. Use Streams when messages need to remain available for consumers to process, acknowledge, or replay later.