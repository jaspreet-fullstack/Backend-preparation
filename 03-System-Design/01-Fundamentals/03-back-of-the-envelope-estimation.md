# Back-of-the-Envelope Estimation

Use rough estimates to understand how much traffic, storage, and network capacity the system may need. State your assumptions; a reasonable estimate is more useful than false precision.

## Useful calculations

```text
Average QPS = requests per day / 86,400
Peak QPS = average QPS * estimated peak factor
Daily storage = objects per day * average object size
Bandwidth = requests per second * average response size
```

## Example

If 10 million users each make 10 requests per day:

```text
100 million requests/day / 86,400 ~= 1,160 average QPS
At a 3x peak factor ~= 3,500 peak QPS
```

QPS means queries (or requests) per second. For storage, include how long data is kept. Say whether your estimate includes extra copies, indexes, and metadata.

## Interview reminders

- Round numbers and keep units visible.
- Separate average load from peak load.
- State assumptions such as active users, requests per user, average response size, and how long data is kept.
- Use estimates to motivate design choices, not as an end in themselves.