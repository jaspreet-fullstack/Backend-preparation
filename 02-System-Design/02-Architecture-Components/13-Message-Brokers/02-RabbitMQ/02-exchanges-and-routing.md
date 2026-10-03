# RabbitMQ Exchanges and Routing

An **exchange** receives a message and decides **which queue(s) should receive it** based on its exchange type.



| Exchange Types | How it routes | Easy memory |
|---|---|---|
| **Direct** | Exact routing key match | **Exact match** |
| **Topic** | Pattern match using `*` and `#` | **Pattern match** |
| **Fanout** | Sends to every bound queue | **Broadcast** |
| **Headers** | Matches message headers | **Header-based** |

### Direct

Routing key must exactly match the binding key.

```text
routing key:  order.created
binding key:  order.created  → Match
```

**Use:** When you need exact routing.

### Topic

Uses patterns:

- `*` → exactly one word
- `#` → zero or more words

Example:

```text
orders.*  → orders.created
orders.#  → orders.created
orders.#  → orders.india.created
```

**Use:** When you need pattern-based routing.

### Fanout

Sends the message to **every queue bound to the exchange**.

```text
              → Queue A
Exchange  ───→ Queue B
              → Queue C
```

Routing key is **ignored**.

**Use:** Broadcasting an event to multiple services.

### Headers

Routes messages based on **message headers** instead of the routing key.

**Use:** When routing depends on multiple message properties.

## Interview Answer

> **RabbitMQ has four common exchange types. Direct uses an exact routing-key match, Topic supports pattern matching, Fanout broadcasts to all bound queues, and Headers routes based on message headers.**