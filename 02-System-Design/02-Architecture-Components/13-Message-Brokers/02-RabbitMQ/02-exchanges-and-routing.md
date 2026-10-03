# RabbitMQ Exchanges and Routing

An exchange uses its type and message details to choose which bound queues receive a message.

| Exchange type | Routing rule | Example use |
| --- | --- | --- |
| **Direct** | Exact match between routing key and binding key | Send `invoice.created` to an invoice queue |
| **Topic** | Match dot-separated words; `*` matches one word and `#` matches zero or more | `orders.*` matches `orders.created`; `orders.#` can also match `orders.us.created` |
| **Fanout** | Send to every queue bound to the exchange; routing key is ignored | Broadcast a status change to several services |
| **Headers** | Match message headers instead of a routing key | Route by a combination of message properties |

```text
Publisher -> Exchange -> matching bound queues
                |
          routing key or headers
```

## Interview example

If different workers handle `email`, `sms`, and `push`, a direct exchange can route each message to its matching queue. If several services must all receive `OrderCreated`, bind each service queue to a fanout exchange.

## Interview answer

Use direct routing for exact matches, topic routing for patterns, fanout to broadcast, and headers when routing depends on message properties. Choose the simplest rule that meets the requirement.