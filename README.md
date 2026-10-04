# Backend Preparation

This repository is a set of study notes and practice exercises for JavaScript, backend development, Node.js, and system design interviews.

## Contents

### JavaScript Concepts

- [Variables](JS-Concept/Variables-hoisting/01-what-is-variables.md)
- [Variable types](JS-Concept/Variables-hoisting/02-variables-type.md)
- [Scope](JS-Concept/Variables-hoisting/03-scope.md)
- [Scope chain](JS-Concept/Variables-hoisting/04-scope-chain.md)
- [Temporal Dead Zone (TDZ)](JS-Concept/Variables-hoisting/05-TDZ.md)
- [Data types](JS-Concept/Variables-hoisting/06-DataTypes.md)
- [Type coercion](JS-Concept/Variables-hoisting/07-type%20coercion.md)
- [Conditions](JS-Concept/if-else-conditions/conditions.md)
- [Loops](JS-Concept/loop-concept/loops.md)

### JavaScript Practice

- [Find the largest number](JS-Concept/if-else-conditions/find-largest-number.js)
- [FizzBuzz](JS-Concept/if-else-conditions/fizz-buzz.js)
- [Print even numbers](JS-Concept/loop-concept/print-even-number.js)
- [Print numbers from 1 to 10](JS-Concept/loop-concept/Print-number%281to10%29.js)
- [Reverse a string](JS-Concept/loop-concept/reverString.js)
- [Sum numbers](JS-Concept/loop-concept/sumof-allNumbers.js)

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

### Database Engines

#### Shared Fundamentals

- [Database fundamentals: DBMS, constraints, normalization, and ACID](02-Database-Engines/00-Shared-Database-Fundamentals.md)

#### PostgreSQL

- [Basics and architecture](02-Database-Engines/01-PostgreSQL/01-basics-and-architecture.md)
- [Schema, data types, and queries](02-Database-Engines/01-PostgreSQL/02-schema-data-types-and-queries.md)
- [Indexes and query plans](02-Database-Engines/01-PostgreSQL/03-indexes-and-query-plans.md)
- [Transactions, isolation, and locking](02-Database-Engines/01-PostgreSQL/04-transactions-isolation-and-locking.md)
- [Replication, backups, and scaling](02-Database-Engines/01-PostgreSQL/05-replication-backups-and-scaling.md)
- [Common interview questions](02-Database-Engines/01-PostgreSQL/06-common-interview-questions.md)

#### MongoDB

- [Basics and document model](02-Database-Engines/02-MongoDB/01-basics-and-document-model.md)
- [Data modeling: embedding vs. references](02-Database-Engines/02-MongoDB/02-data-modeling-embedding-vs-references.md)
- [Queries and aggregation](02-Database-Engines/02-MongoDB/03-queries-and-aggregation.md)
- [Indexes and transactions](02-Database-Engines/02-MongoDB/04-indexes-and-transactions.md)
- [Replica sets, sharding, and backups](02-Database-Engines/02-MongoDB/05-replica-sets-sharding-and-backups.md)
- [Common interview questions](02-Database-Engines/02-MongoDB/06-common-interview-questions.md)

### System Design Interview Preparation

#### Fundamentals

- [Interview approach](03-System-Design/01-Fundamentals/01-system-design-interview-approach.md)
- [Requirements and constraints](03-System-Design/01-Fundamentals/02-requirements-and-constraints.md)
- [Back-of-the-envelope estimation](03-System-Design/01-Fundamentals/03-back-of-the-envelope-estimation.md)
- [Core system design fundamentals](03-System-Design/01-Fundamentals/04-basic-fundamentals.md)
- [API design](03-System-Design/01-Fundamentals/05-api-design.md)
- [Data modeling](03-System-Design/01-Fundamentals/06-data-modeling.md)

#### Architecture Components

- [Load balancers and reverse proxies](03-System-Design/02-Architecture-Components/01-load-balancers-and-reverse-proxies.md)
- [Content delivery networks (CDNs)](03-System-Design/02-Architecture-Components/02-cdns.md)
- [Caching and cache invalidation](03-System-Design/02-Architecture-Components/03-caching.md)
- [SQL vs. NoSQL databases](03-System-Design/02-Architecture-Components/04-sql-vs-nosql-databases.md)
- [Database indexes](03-System-Design/02-Architecture-Components/05-database-indexes.md)
- [Database replication](03-System-Design/02-Architecture-Components/06-database-replication.md)
- [Database sharding](03-System-Design/02-Architecture-Components/07-database-sharding.md)
- [Message queues and pub/sub](03-System-Design/02-Architecture-Components/08-message-queues-and-pub-sub.md)
- [Object storage](03-System-Design/02-Architecture-Components/09-object-storage.md)
- [Search systems](03-System-Design/02-Architecture-Components/10-search-systems.md)
- [Consistent hashing](03-System-Design/02-Architecture-Components/11-consistent-hashing.md)
- **Redis:**
	- [Basics and data types](03-System-Design/02-Architecture-Components/12-Redis/01-redis-basics.md)
	- [Instances, replication, and Sentinel](03-System-Design/02-Architecture-Components/12-Redis/02-instances-replication-and-sentinel.md)
	- [Redis Cluster and hash slots](03-System-Design/02-Architecture-Components/12-Redis/03-redis-cluster-and-hash-slots.md)
	- [Persistence, TTL, and eviction](03-System-Design/02-Architecture-Components/12-Redis/04-persistence-ttl-and-eviction.md)
	- [Redis Pub/Sub and Streams](03-System-Design/02-Architecture-Components/12-Redis/05-redis-pubsub-and-streams.md)
	- [Redis distributed locks](03-System-Design/02-Architecture-Components/12-Redis/06-redis-distributed-locks.md)
	- [Redis rate limiting](03-System-Design/02-Architecture-Components/12-Redis/07-redis-rate-limiting.md)
	- [Optional: Redis vs. Memcached](03-System-Design/02-Architecture-Components/12-Redis/08-memcached-optional-comparison.md)
- **Message Brokers:**
	- [RabbitMQ vs. Kafka](03-System-Design/02-Architecture-Components/13-Message-Brokers/01-rabbitmq-vs-kafka.md)
	- **RabbitMQ:**
		- [Components and message flow](03-System-Design/02-Architecture-Components/13-Message-Brokers/02-RabbitMQ/01-components-and-message-flow.md)
		- [Exchanges and routing](03-System-Design/02-Architecture-Components/13-Message-Brokers/02-RabbitMQ/02-exchanges-and-routing.md)
		- [Acknowledgements, retries, and dead-letter queues](03-System-Design/02-Architecture-Components/13-Message-Brokers/02-RabbitMQ/03-acks-retries-and-dead-letter-queues.md)
		- [Durability, scaling, and failure handling](03-System-Design/02-Architecture-Components/13-Message-Brokers/02-RabbitMQ/04-durability-scaling-and-failure-handling.md)
		- [Order-processing example](03-System-Design/02-Architecture-Components/13-Message-Brokers/02-RabbitMQ/05-interview-example-order-processing.md)
	- **Kafka:**
		- [Topics, partitions, and offsets](03-System-Design/02-Architecture-Components/13-Message-Brokers/03-Kafka/01-topics-partitions-and-offsets.md)
		- [Producers, consumers, and consumer groups](03-System-Design/02-Architecture-Components/13-Message-Brokers/03-Kafka/02-producers-consumers-and-consumer-groups.md)
		- [Replication and failure handling](03-System-Design/02-Architecture-Components/13-Message-Brokers/03-Kafka/03-replication-and-failure-handling.md)
		- [Ordering, delivery, and idempotency](03-System-Design/02-Architecture-Components/13-Message-Brokers/03-Kafka/04-ordering-delivery-and-idempotency.md)
		- [Retention, replay, and compaction](03-System-Design/02-Architecture-Components/13-Message-Brokers/03-Kafka/05-retention-replay-and-compaction.md)
		- [Scaling and rebalancing](03-System-Design/02-Architecture-Components/13-Message-Brokers/03-Kafka/06-scaling-and-rebalancing.md)
		- [Order-events example](03-System-Design/02-Architecture-Components/13-Message-Brokers/03-Kafka/07-interview-example-order-events.md)

#### Distributed Systems and Reliability

- [Consistency and CAP](03-System-Design/03-Distributed-Systems-and-Reliability/01-consistency-and-cap.md)
- [Synchronous vs. asynchronous communication](03-System-Design/03-Distributed-Systems-and-Reliability/02-synchronous-vs-asynchronous-communication.md)
- [Timeouts, retries, and idempotency](03-System-Design/03-Distributed-Systems-and-Reliability/03-timeouts-retries-and-idempotency.md)
- [Rate limiting and throttling](03-System-Design/03-Distributed-Systems-and-Reliability/04-rate-limiting-and-throttling.md)
- [Circuit breakers and backpressure](03-System-Design/03-Distributed-Systems-and-Reliability/05-circuit-breakers-and-backpressure.md)
- [Fault tolerance and disaster recovery](03-System-Design/03-Distributed-Systems-and-Reliability/06-fault-tolerance-and-disaster-recovery.md)
- [Observability: logs, metrics, and traces](03-System-Design/03-Distributed-Systems-and-Reliability/07-observability-logs-metrics-and-traces.md)
- [Concurrency, parallelism, and asynchronous work](03-System-Design/03-Distributed-Systems-and-Reliability/09-concurrency-parallelism-and-asynchronous-work.md)
- [Event-driven architecture](03-System-Design/03-Distributed-Systems-and-Reliability/10-event-driven-architecture.md)

### DevOps and Delivery

#### Git and GitHub

- [Git fundamentals](04-DevOps-and-Delivery/01-Git-and-GitHub/01-git-fundamentals.md)
- [Branching, merging, and conflicts](04-DevOps-and-Delivery/01-Git-and-GitHub/02-branching-merging-and-conflicts.md)
- [Pull requests and collaboration](04-DevOps-and-Delivery/01-Git-and-GitHub/03-github-pull-requests-and-collaboration.md)
- [Common interview questions](04-DevOps-and-Delivery/01-Git-and-GitHub/04-common-interview-questions.md)

#### Docker

- [Containers, images, and VMs](04-DevOps-and-Delivery/02-Docker/01-containers-images-and-vms.md)
- [Dockerfiles, builds, and layers](04-DevOps-and-Delivery/02-Docker/02-dockerfiles-builds-and-layers.md)
- [Volumes, networking, and Compose](04-DevOps-and-Delivery/02-Docker/03-volumes-networking-and-compose.md)
- [Production security and optimization](04-DevOps-and-Delivery/02-Docker/04-production-security-and-optimization.md)
- [Common interview questions](04-DevOps-and-Delivery/02-Docker/05-common-interview-questions.md)

#### CI/CD

- [CI/CD fundamentals](04-DevOps-and-Delivery/03-CI-CD/01-ci-cd-fundamentals.md)
- [GitHub Actions](04-DevOps-and-Delivery/03-CI-CD/02-github-actions.md)
- [Jenkins](04-DevOps-and-Delivery/03-CI-CD/03-jenkins.md)
- [Pipeline design, secrets, and deployments](04-DevOps-and-Delivery/03-CI-CD/04-pipeline-design-secrets-and-deployments.md)
- [Common interview questions](04-DevOps-and-Delivery/03-CI-CD/05-common-interview-questions.md)

## How to Use These Notes

The numbered files provide a suggested order within each topic area. System Design notes are short interview refreshers: they focus on key ideas, tradeoffs, examples, and concise answers. JavaScript practice files contain small exercises that can be run with Node.js.