# RabbitMQ Components and Message Flow

RabbitMQ is a message broker: it accepts messages from producers, routes them to queues, and delivers them to consumers.

## Main components

- **Producer** creates and sends a message.
- **Exchange** receives the message and decides which queue or queues should get it.
- **Binding** is the rule connecting an exchange to a queue.
- **Routing key** is a label used by some exchange types to choose a queue.
- **Queue** holds messages until consumers process them.
- **Consumer** receives a message and performs the work.
- **Acknowledgement (ack)** tells RabbitMQ that the consumer finished the message.

```text
Producer -> Exchange --binding/routing rule--> Queue -> Consumer
                                                        |
                                                        `-- ack -> remove message
```

If a consumer fails before acknowledging, RabbitMQ can make the message available again, depending on how the queue and consumer are configured. Consumers should be safe if work is delivered more than once.

## Example

An order service publishes `CreateShipment` to an exchange. The exchange routes it to a shipping queue, and one available worker creates the shipment and acknowledges the message.

## Interview answer

Explain how a message moves from producer to exchange to queue to consumer, then say when it is acknowledged and what happens if the consumer fails.