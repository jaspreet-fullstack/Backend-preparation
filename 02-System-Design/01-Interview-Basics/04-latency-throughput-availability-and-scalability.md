# Latency, Throughput, Availability, and Scalability

| Term | Meaning |
| --- | --- |
| **Latency** | Time taken to complete an operation or request. |
| **Throughput** | Work completed per unit of time, often requests per second. |
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

Latency is how long an operation takes; throughput is how much work completes over time. Availability describes successful service, while scalability describes how the system handles growth.