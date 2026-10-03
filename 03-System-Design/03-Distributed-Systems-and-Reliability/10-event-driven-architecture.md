# Event-Driven Architecture

In an **event-driven system**, a service publishes an event when something has happened, and other services react to it. An event is a fact, such as `OrderPlaced`, not a request telling another service exactly what to do.

```text
Order service -> Event broker -> Inventory service
                            -> Email service
                            -> Analytics service
```

## When to use it

- Several services need to react to the same change.
- Work can happen later instead of delaying the user's request.
- Services should be able to change or scale independently.

## Tradeoffs to discuss

- The user may not see every update immediately because consumers process events later.
- Events may be delivered more than once, so handlers should be safe to repeat.
- Plan for retries, failed events, ordering needs, and how event formats change over time.
- Use a request/response call when the caller needs an immediate answer; do not make every interaction an event.

## Interview answer

Use events to notify independent services that something has happened. Explain how events are stored and delivered, how consumers handle duplicates or failures, and whether the system can tolerate delayed updates.