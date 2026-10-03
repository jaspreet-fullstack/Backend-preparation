# Rate Limiting with Redis

Redis can keep request counts or bucket state shared across application servers, so a user cannot bypass a limit by reaching a different server.

## Common approaches

| Algorithm | How it works | Main tradeoff |
| --- | --- | --- |
| **Fixed Window Counter** | Counts requests in set time blocks, then resets the count. | Simple and uses little memory, but users can send a burst at a block boundary. |
| **Sliding Window Log** | Saves each request time and counts requests in the most recent time period. | Accurate, but saves more data and needs more work. |
| **Sliding Window Counter** | Estimates the recent request count using parts of the current and previous time blocks. | Uses less memory than the log, but is an estimate. |
| **Token Bucket** | Tokens refill over time at fixed rate; each request uses one token. | Allows short bursts up to the bucket size while limiting the average rate. |
| **Leaky Bucket** | Holds requests in a queue and sends them out at a steady rate. | Smooths traffic, but adds waiting time; rejects requests if the queue is full. |

```text
Application servers -> Redis atomic check -> allow or reject request
```

## Interview tradeoffs

- An atomic script prevents two servers from reading and changing the same limit at the same time incorrectly.
- A shared Redis check adds a network call; define behavior if Redis is slow or unavailable.
- Choose the limit key (user, API key, IP, or endpoint), window, and failure behavior from the product requirements.

## Interview answer

Use Redis when multiple application servers need one shared rate limit. Choose an algorithm based on burst behavior and accuracy, update its state atomically, and explain what happens if Redis cannot be reached.