# System Design Fundamentals

## 1. Latency, Throughput, Bandwidth, Availability, and Scalability

These are some of the most important metrics and concepts used when designing backend systems.

| Term | Meaning |
| --- | --- |
| **Latency** | Time taken to complete one operation or request. |
| **Throughput** | Amount of work completed per unit of time, often measured in requests per second (RPS). |
| **Bandwidth** | Amount of data a network connection can transfer per second. |
| **Availability** | How often a system is operational and able to successfully serve requests. |
| **Scalability** | Ability of a system to handle increasing users or workload while maintaining acceptable performance. |

### Latency

Latency is the **time taken for one request or operation to complete**.

Example:

```text
Client → API → Database → API → Client

Total time = 200 ms

Latency = 200 ms
```

Lower latency generally means faster response times.

---

### Throughput

Throughput is the **amount of work a system can complete in a given period**.

For backend systems, it is commonly measured as:

```text
Requests Per Second (RPS)
```

Example:

```text
System processes 5,000 requests/sec

Throughput = 5,000 RPS
```

---

### Bandwidth

Bandwidth is the **maximum amount of data that can be transferred through a network connection per unit of time**.

Example:

```text
Network bandwidth = 1 Gbps
```

This describes how much data the network can carry, not how many requests the application processes.

---

### Availability

Availability measures how often a system is **up and able to serve requests successfully**.

Example:

```text
99.9% availability
```

This means the system is expected to be available for 99.9% of the defined measurement period.

---

### Scalability

Scalability is the ability of a system to **handle increasing workload by adding resources**.

For example:

```text
1,000 users
     ↓
10,000 users
     ↓
1,000,000 users
```

A scalable system can increase its capacity to handle this growth.

---

# 2. Common System Design Tradeoffs

System design usually involves tradeoffs. Improving one property can affect another.

### Caching

Caching can:

- Reduce latency
- Reduce database load
- Improve throughput

But:

- Cached data can become stale.
- Cache invalidation adds complexity.

```text
Without cache:

Client → API → Database

With cache:

Client → API → Cache
              ↓
        Cache Miss
              ↓
          Database
```

---

### Replication

Replication keeps multiple copies of data.

```text
             Primary DB
             /        \
            ↓          ↓
       Replica 1    Replica 2
```

Benefits:

- Higher read capacity
- Better availability
- Redundancy

Tradeoff:

- Replicas may temporarily lag behind the primary.
- More infrastructure and synchronization complexity.

---

### Strong Consistency

Strong consistency means that after a successful write, subsequent reads return the latest value.

Example:

```text
WRITE balance = ₹500
        ↓
READ balance
        ↓
₹500
```

Tradeoff:

- Maintaining strong consistency across distributed systems can increase latency.
- During some failures, the system may need to reject or delay requests.

---

# 3. Scaling

### Vertical Scaling

Increase the resources of a single machine.

```text
Before:

4 CPU
8 GB RAM

        ↓

After:

16 CPU
32 GB RAM
```

Advantages:

- Simple
- Usually requires fewer architectural changes

Limitations:

- Hardware has an upper limit.
- Can remain a single point of failure.
- Larger machines can become expensive.

---

### Horizontal Scaling

Add more machines/instances.

```text
             Load Balancer
             /     |     \
            ↓      ↓      ↓
         Server  Server  Server
            A      B      C
```

Advantages:

- Can handle more traffic.
- Provides redundancy.
- Can scale by adding instances.

Challenges:

- Requires load balancing.
- Application state must be handled correctly.
- May require shared storage, caching, partitioning, or coordination.

---

# 4. Concurrency, Parallelism, and Asynchronous Work

These concepts describe **how work is executed**.

## Concurrency

Concurrency means **multiple tasks can make progress during overlapping periods of time**.

The tasks do not necessarily execute at exactly the same moment.

Example:

```text
Single CPU

Task A → Task B → Task A → Task B
```

A single processor can switch between tasks.

### Backend example

A Node.js server can handle multiple requests concurrently:

```text
Request A → waiting for DB
Request B → processing
Request C → waiting for API
Request A → DB response
```

The server doesn't need to finish Request A before starting Request B.

---

## Parallelism

Parallelism means **multiple tasks are actually executing at the same time**, typically using multiple CPU cores or machines.

Example:

```text
Core 1 → Task A
Core 2 → Task B
Core 3 → Task C
```

This is useful for CPU-intensive work.

Examples:

- Video processing
- Image processing
- Large calculations
- Data processing

---

## Asynchronous Work

Asynchronous work means the caller **does not have to wait for the operation to finish before continuing**.

Example:

```text
Start database request
        ↓
Continue doing other work
        ↓
Database response arrives
        ↓
Process result
```

Asynchronous does **not automatically mean parallel**.

For example, Node.js can perform asynchronous I/O while JavaScript execution remains on a single main thread.

---

# 5. Concurrency vs Parallelism vs Asynchronous Work

| Concept | Meaning | Example |
| --- | --- | --- |
| **Concurrency** | Multiple tasks make progress during overlapping periods | Server handling multiple requests |
| **Parallelism** | Multiple tasks execute at the same time | Two CPU cores processing two tasks |
| **Asynchronous** | Caller continues without waiting for completion | Database/API request |

### Easy way to remember

```text
Concurrency
→ Multiple tasks are in progress.

Parallelism
→ Multiple tasks are executing at the same time.

Asynchronous
→ Don't wait for the operation to finish.
```

---

# 6. Performance Troubleshooting

When a system is slow, don't immediately assume the database is the problem.

Identify where the latency is coming from:

```text
Client
  ↓
Network
  ↓
Load Balancer
  ↓
Application
  ↓
Cache
  ↓
Database
  ↓
External Services
```

Measure each part and identify the bottleneck.

For example:

```text
Total latency = 500 ms

Network       = 50 ms
Application   = 100 ms
Cache         = 10 ms
Database      = 320 ms
External API  = 20 ms
```

Here, the database is the largest contributor to latency.

---

# 7. SLI, SLO, and SLA

These are commonly used when defining system reliability and performance targets.

### SLI — Service Level Indicator

A **measurement** of system performance.

Examples:

```text
Latency
Availability
Error rate
Throughput
```

---

### SLO — Service Level Objective

The **target** for an SLI.

Example:

```text
SLO:

P95 latency < 200 ms
Availability > 99.9%
```

---

### SLA — Service Level Agreement

A **formal agreement** with customers about the expected level of service.

It may include consequences if the agreed service level is not met.

### Easy way to remember

```text
SLI → What we measure

SLO → What target we set

SLA → What we formally promise
```