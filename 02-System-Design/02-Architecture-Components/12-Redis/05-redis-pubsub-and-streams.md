# Redis Pub/Sub and Streams

Both Redis Pub/Sub and Redis Streams allow services to **send messages to other services**, but they handle messages differently.

## 1. Redis Pub/Sub

Pub/Sub sends a message to all subscribers that are **currently listening**.

```text
Publisher
    ↓
 Channel
  ↙   ↘
Sub A  Sub B
```

If a subscriber is offline when the message is published, **it misses the message**.

Think:

> **Pub/Sub = Live message**

### Good for

- Live notifications
- Real-time updates
- Chat notifications
- Events where missing a message is acceptable

---

## 2. Redis Streams

Streams **store messages in Redis** with unique IDs.

Consumers can read the messages later.

```text
Producer
    ↓
Redis Stream
    ↓
Consumer Group
  ↙       ↘
Worker A  Worker B
```

Consumers can **acknowledge** messages after processing them.

If processing fails, the message can be handled again.

Think:

> **Streams = Stored message**

### Good for

- Background jobs
- Event processing
- Work that needs acknowledgement
- Retryable processing
- Cases where messages may need to be read later

---

## 3. Pub/Sub vs Streams

| | Pub/Sub | Streams |
|---|---|---|
| Messages stored | ❌ No | ✅ Yes |
| Offline subscriber | Misses message | Can read later |
| Replay | ❌ | ✅ |
| Acknowledgement | ❌ | ✅ |
| Consumer groups | ❌ | ✅ |
| Best for | Live notifications | Event/work processing |

### Easy way to remember

> **Pub/Sub → "Listen now."**

> **Streams → "Store and process later."**

---

## 4. Important Considerations

### Pub/Sub

If the subscriber disconnects:

```text
Publisher → Message → ❌ Offline subscriber
```

The message is lost for that subscriber.

### Streams

Streams retain messages, so you need to decide:

- How long to keep messages
- When to remove/trim old messages
- How to retry failed messages
- How consumers acknowledge processed messages

---

## Interview Answer

> **Redis Pub/Sub is mainly for real-time messaging where subscribers receive messages only while they are connected, so offline subscribers can miss messages. Redis Streams store messages and support consumer groups and acknowledgements, making them better when messages need to be processed reliably, retried, or read later.**