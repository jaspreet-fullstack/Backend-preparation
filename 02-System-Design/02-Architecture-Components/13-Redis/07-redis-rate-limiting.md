# Rate Limiting with Redis

Redis can keep request counts or bucket state shared across application servers, so a user cannot bypass a limit by reaching a different server.

## Common approaches

- **Fixed window**: increment a key for the current time window and expire it at the window end. Keep increment and expiry together in an atomic script so a failure cannot leave a counter with no expiry.
- **Sliding log**: store request times in a sorted set and count those in the recent window. It is more exact but uses more memory and work.
- **Token bucket**: store the remaining tokens and last-refill time. An atomic script refills tokens and decides whether to allow the request.

```text
Application servers -> Redis atomic check -> allow or reject request
```

## Interview tradeoffs

- An atomic script prevents two servers from reading and changing the same limit at the same time incorrectly.
- A shared Redis check adds a network call; define behavior if Redis is slow or unavailable.
- Choose the limit key (user, API key, IP, or endpoint), window, and failure behavior from the product requirements.

## Interview answer

Use Redis when multiple application servers need one shared rate limit. Choose an algorithm based on burst behavior and accuracy, update its state atomically, and explain what happens if Redis cannot be reached.