# Backend Preparation

This repository is a set of study notes and practice exercises for JavaScript, backend development, Node.js, and system design interviews.

## Contents

### JavaScript Concepts

- [Variables](JS-Concept/01-what-is-variables.md)
- [Variable types](JS-Concept/02-variables-type.md)
- [Scope](JS-Concept/03-scope.md)
- [Scope chain](JS-Concept/04-scope-chain.md)
- [Temporal Dead Zone (TDZ)](JS-Concept/05-TDZ.md)
- [Data types](JS-Concept/06-DataTypes.md)
- [Type coercion](JS-Concept/07-type%20coercion.md)
- [Conditions](JS-Concept/08-if-else-conditions.md/conditions.md)
- [Loops](JS-Concept/09-loops/loops.md)

### JavaScript Practice

- [Find the largest number](JS-Concept/08-if-else-conditions.md/find-largest-number.js)
- [FizzBuzz](JS-Concept/08-if-else-conditions.md/fizz-buzz.js)
- [Print even numbers](JS-Concept/09-loops/print-even-number.js)
- [Print numbers from 1 to 10](JS-Concept/09-loops/Print-number%281to10%29.js)
- [Reverse a string](JS-Concept/09-loops/reverString.js)
- [Sum numbers](JS-Concept/09-loops/sumof-allNumbers.js)

### Backend Fundamentals

- [Web and networking](01-Backend/Backend-Fundamentals/01-web-and-networking.md)
- [Backend architecture](01-Backend/Backend-Fundamentals/02-Backend-architecture.md)
- [Operating system and runtime basics](01-Backend/Backend-Fundamentals/03-os-&-runtym-basiis.md)
- [Backend production](01-Backend/Backend-Fundamentals/04-backend-production.md)
- [HTTP protocol](01-Backend/Backend-Fundamentals/05-http-protocol.md)

### Node.js

- [Event loop](01-Backend/Node.js/01-event-loop.md)
- [Asynchronous concepts](01-Backend/Node.js/02-Async-concept.md)
- [Runtime internals](01-Backend/Node.js/03-runtime-internals.md)
- [Memory and processes](01-Backend/Node.js/04-memory-processes.md)
- [Streams and buffers](01-Backend/Node.js/05-Streams-&-buffer.md)

### System Design Interview Preparation

#### Interview Basics

- [Interview approach](02-System-Design/01-Interview-Basics/01-system-design-interview-approach.md)
- [Requirements and constraints](02-System-Design/01-Interview-Basics/02-requirements-and-constraints.md)
- [Back-of-the-envelope estimation](02-System-Design/01-Interview-Basics/03-back-of-the-envelope-estimation.md)
- [Latency, throughput, availability, and scalability](02-System-Design/01-Interview-Basics/04-latency-throughput-availability-and-scalability.md)
- [API design](02-System-Design/01-Interview-Basics/05-api-design.md)
- [Data modeling](02-System-Design/01-Interview-Basics/06-data-modeling.md)

#### Architecture Components

- [Load balancers and reverse proxies](02-System-Design/02-Architecture-Components/01-load-balancers-and-reverse-proxies.md)
- [Content delivery networks (CDNs)](02-System-Design/02-Architecture-Components/02-cdns.md)
- [Caching and cache invalidation](02-System-Design/02-Architecture-Components/03-caching-and-cache-invalidation.md)
- [SQL vs. NoSQL databases](02-System-Design/02-Architecture-Components/04-sql-vs-nosql-databases.md)
- [Database indexes](02-System-Design/02-Architecture-Components/05-database-indexes.md)
- [Horizontal and vertical scaling](02-System-Design/02-Architecture-Components/06-horizontal-and-vertical-scaling.md)
- [Database replication](02-System-Design/02-Architecture-Components/07-database-replication.md)
- [Database sharding](02-System-Design/02-Architecture-Components/08-database-sharding.md)
- [Message queues and pub/sub](02-System-Design/02-Architecture-Components/09-message-queues-and-pub-sub.md)
- [Object storage](02-System-Design/02-Architecture-Components/10-object-storage.md)
- [Search systems](02-System-Design/02-Architecture-Components/11-search-systems.md)
- [Consistent hashing](02-System-Design/02-Architecture-Components/12-consistent-hashing.md)
- **Redis:**
	- [Basics and data types](02-System-Design/02-Architecture-Components/13-Redis/01-redis-basics-and-data-types.md)
	- [Instances, replication, and Sentinel](02-System-Design/02-Architecture-Components/13-Redis/02-instances-replication-and-sentinel.md)
	- [Redis Cluster and hash slots](02-System-Design/02-Architecture-Components/13-Redis/03-redis-cluster-and-hash-slots.md)
	- [Persistence, TTL, and eviction](02-System-Design/02-Architecture-Components/13-Redis/04-persistence-ttl-and-eviction.md)
	- [Redis Pub/Sub and Streams](02-System-Design/02-Architecture-Components/13-Redis/05-redis-pubsub-and-streams.md)
	- [Redis distributed locks](02-System-Design/02-Architecture-Components/13-Redis/06-redis-distributed-locks.md)
	- [Redis rate limiting](02-System-Design/02-Architecture-Components/13-Redis/07-redis-rate-limiting.md)
	- [Use cases and tradeoffs](02-System-Design/02-Architecture-Components/13-Redis/08-redis-use-cases-and-tradeoffs.md)
	- [Optional: Redis vs. Memcached](02-System-Design/02-Architecture-Components/13-Redis/09-memcached-optional-comparison.md)
- **Message Brokers:**
	- [How to choose a broker](02-System-Design/02-Architecture-Components/14-Message-Brokers/01-how-to-choose.md)
	- **RabbitMQ:**
		- [Components and message flow](02-System-Design/02-Architecture-Components/14-Message-Brokers/02-RabbitMQ/01-components-and-message-flow.md)
		- [Exchanges and routing](02-System-Design/02-Architecture-Components/14-Message-Brokers/02-RabbitMQ/02-exchanges-and-routing.md)
		- [Acknowledgements, retries, and dead-letter queues](02-System-Design/02-Architecture-Components/14-Message-Brokers/02-RabbitMQ/03-acks-retries-and-dead-letter-queues.md)
		- [Durability, scaling, and failure handling](02-System-Design/02-Architecture-Components/14-Message-Brokers/02-RabbitMQ/04-durability-scaling-and-failure-handling.md)
		- [Order-processing example](02-System-Design/02-Architecture-Components/14-Message-Brokers/02-RabbitMQ/05-interview-example-order-processing.md)
	- **Kafka:**
		- [Topics, partitions, and offsets](02-System-Design/02-Architecture-Components/14-Message-Brokers/03-Kafka/01-topics-partitions-and-offsets.md)
		- [Producers, consumers, and consumer groups](02-System-Design/02-Architecture-Components/14-Message-Brokers/03-Kafka/02-producers-consumers-and-consumer-groups.md)
		- [Replication and failure handling](02-System-Design/02-Architecture-Components/14-Message-Brokers/03-Kafka/03-replication-and-failure-handling.md)
		- [Ordering, delivery, and idempotency](02-System-Design/02-Architecture-Components/14-Message-Brokers/03-Kafka/04-ordering-delivery-and-idempotency.md)
		- [Retention, replay, and compaction](02-System-Design/02-Architecture-Components/14-Message-Brokers/03-Kafka/05-retention-replay-and-compaction.md)
		- [Scaling and rebalancing](02-System-Design/02-Architecture-Components/14-Message-Brokers/03-Kafka/06-scaling-and-rebalancing.md)
		- [Order-events example](02-System-Design/02-Architecture-Components/14-Message-Brokers/03-Kafka/07-interview-example-order-events.md)
	- [RabbitMQ vs. Kafka](02-System-Design/02-Architecture-Components/14-Message-Brokers/04-rabbitmq-vs-kafka.md)

#### Distributed Systems and Reliability

- [Consistency and CAP](02-System-Design/03-Distributed-Systems-and-Reliability/01-consistency-and-cap.md)
- [Synchronous vs. asynchronous communication](02-System-Design/03-Distributed-Systems-and-Reliability/02-synchronous-vs-asynchronous-communication.md)
- [Timeouts, retries, and idempotency](02-System-Design/03-Distributed-Systems-and-Reliability/03-timeouts-retries-and-idempotency.md)
- [Rate limiting and throttling](02-System-Design/03-Distributed-Systems-and-Reliability/04-rate-limiting-and-throttling.md)
- [Circuit breakers and backpressure](02-System-Design/03-Distributed-Systems-and-Reliability/05-circuit-breakers-and-backpressure.md)
- [Fault tolerance and disaster recovery](02-System-Design/03-Distributed-Systems-and-Reliability/06-fault-tolerance-and-disaster-recovery.md)
- [Observability: logs, metrics, and traces](02-System-Design/03-Distributed-Systems-and-Reliability/07-observability-logs-metrics-and-traces.md)
- [Authentication and authorization](02-System-Design/03-Distributed-Systems-and-Reliability/08-authentication-and-authorization.md)
- [Concurrency, parallelism, and asynchronous work](02-System-Design/03-Distributed-Systems-and-Reliability/09-concurrency-parallelism-and-asynchronous-work.md)
- [Event-driven architecture](02-System-Design/03-Distributed-Systems-and-Reliability/10-event-driven-architecture.md)

## How to Use These Notes

The numbered files provide a suggested order within each topic area. System Design notes are short interview refreshers: they focus on key ideas, tradeoffs, examples, and concise answers. JavaScript practice files contain small exercises that can be run with Node.js.