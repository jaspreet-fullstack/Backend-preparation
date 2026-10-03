# Latency, Throughput, Availability, and Scalability

| Term | Meaning |
| --- | --- |
| **Latency** | Time taken to complete an operation or request. |
| **Throughput** | Work completed per unit of time, often requests per second. |
| **Bandwidth** | Amount of data a network connection can carry per second. |
| **Availability** | How often the system is ready to successfully serve requests. |
| **Scalability** | Ability to handle more users or work while still meeting performance goals. |

## Common tradeoffs

- Caching can make reads faster and reduce database work, but cached data can become old and needs refreshing.
- Replication keeps extra database copies and can improve read capacity and availability, but copies may be behind recent writes.
- Vertical scaling adds resources to one machine; it is simple but has a hardware ceiling and can preserve a single point of failure.
- Horizontal scaling adds instances; it can increase capacity, but may require load balancing, shared-state handling, partitioning, or coordination.
- Strong consistency means later reads see completed writes; it can add delay or make some requests unavailable during failures.

## Interview prompt

When a system is slow, check whether the delay is in the client, network, service, or storage. Use measurements and the SLO (the target for speed or uptime) to decide what to improve.

## Short answer

Latency is how long one operation takes. Throughput is how many operations finish per second. Bandwidth is how much data can travel per second. A system can have high bandwidth but low throughput if it processes few requests, or low latency for one request but still handle few requests overall.