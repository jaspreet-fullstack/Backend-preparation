# RabbitMQ Acknowledgements, Retries, and Dead-Letter Queues

## 1. Acknowledgement (Ack)

An **acknowledgement** tells RabbitMQ that the consumer has **successfully processed the message**.

### Manual Ack

Consumer sends `ack` **after successful processing**.

```text id="4q3v6m"
Queue → Consumer → Process → Success → Ack
```

If processing fails before the ack, RabbitMQ can deliver the message again.

> **Manual Ack = Acknowledge after successful processing**

### Automatic Ack

RabbitMQ considers the message handled as soon as it delivers it to the consumer.

If the consumer crashes while processing, the message can be lost.

> **Auto Ack = Less reliability**

## 2. Retries

If processing fails, the message can be retried.

Avoid unlimited immediate retries because they can create a **failure loop**.

A common approach:

```text id="zqzv7u"
Queue
  ↓
Consumer
  ↓ failure
Retry
  ↓
Try again
  ↓ repeated failure
Dead-Letter Queue
```

Retries can use a **retry queue + TTL** to delay the next attempt.

## 3. Dead-Letter Queue (DLQ)

A **Dead-Letter Exchange (DLX)** can route messages that cannot be processed successfully to a **dead-letter queue**.

This allows developers to inspect or handle failed messages separately.

## 4. Prefetch

**Prefetch** limits how many unacknowledged messages a consumer can receive at once.

> **Prefetch = Controls how much work a consumer can hold**

## 5. Producer Confirms

**Publisher confirms** tell the producer whether RabbitMQ accepted the published message.

Don't confuse:

- **Publisher Confirm** → Did RabbitMQ accept my message?
- **Consumer Ack** → Did the consumer successfully process my message?

## Interview Answer

> **With manual acknowledgements, the consumer sends an ack after successfully processing a message. If processing fails, the message can be retried. We should use bounded retries and eventually move repeatedly failed messages to a dead-letter queue. Prefetch controls how many unacknowledged messages a consumer can hold, while publisher confirms tell the producer whether RabbitMQ accepted the message.**