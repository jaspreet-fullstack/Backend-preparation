# How to Choose a Message Broker

First describe what the message means and what the receiver must do. Choose the broker after clarifying the requirements.

| Ask | Points toward |
| --- | --- |
| Is this one task that should be completed by one worker, with retries and flexible routing? | **RabbitMQ** |
| Is this an event record that several applications read independently or replay later? | **Kafka** |
| Must each message reach a particular queue based on routing rules? | Often **RabbitMQ** |
| Do you need a retained, high-volume event stream split into partitions? | Often **Kafka** |

## Interview checklist

- How many producers and consumers are there? Does every consumer need every message?
- Can a message be lost, delivered twice, or delayed? What is the retry and dead-letter plan?
- Must messages stay ordered? If so, is ordering needed per key or for the whole system?
- Do consumers need to replay old messages? How long should messages be kept?
- What traffic and message size are expected, and what can the team operate reliably?

## Short answer

I would choose RabbitMQ for routed work that a worker must complete and acknowledge. I would choose Kafka when multiple consumers need a retained event stream they can read independently or replay. I would confirm delivery, ordering, scale, and operations requirements before deciding.