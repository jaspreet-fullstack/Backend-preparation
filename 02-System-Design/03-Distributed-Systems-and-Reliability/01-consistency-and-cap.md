# Consistency and CAP

**Consistency** describes how up to date a read must be after data changes. With strong consistency, a later read sees a completed write. With eventual consistency, copies may be briefly different but should catch up.

## Consistency tradeoffs

- Choose strong consistency when an old answer could cause an incorrect action, such as spending the same account balance twice.
- Eventual consistency can be suitable when a short delay is acceptable, such as a like count or analytics report.
- Keeping copies in sync may add response time or cause the system to reject some requests during a network failure. Allowing reads from an out-of-date copy can keep more requests working, but users may briefly see old data.
- Choose the weakest consistency that still keeps the feature correct; not every part of a system needs the same rule.

## CAP Theorem

The **CAP theorem** says that a distributed system cannot guarantee all three properties at the same time **when a network partition occurs**:

1. **Consistency (C)**
2. **Availability (A)**
3. **Partition Tolerance (P)**

During a network partition, the key choice is between consistency and availability.

### 1. Consistency (C)

Every read gets the most recent completed write or an error, as if there were one up-to-date copy of the data.

```text
Write balance = 50
Read from Server A -> 50
Read from Server B -> 50
```

### 2. Availability (A)

Every request to a node that has not failed receives a response. That response may contain stale data.

```text
Server A unavailable
Request -> Server B -> response
```

### 3. Partition Tolerance (P)

The system continues operating despite a network failure that prevents nodes from communicating. The nodes may still be running but cannot exchange updates.

```text
Server A  <-- network partition -->  Server B
```

In a distributed system, partitions can happen, so the practical CAP choice is usually about behavior **during the partition**:

- A **CP-style** system rejects or delays some requests when it cannot safely keep data consistent, often requiring a quorum of nodes to agree.
- An **AP-style** system continues responding on both sides, but data may temporarily diverge and require reconciliation after communication recovers.

### Why can't we guarantee all three during a partition?

Suppose both replicas store a balance of 100, then the network connection between them breaks. A user writes a new balance of 50 to Server A.

**Choice 1: Preserve consistency (CP behavior).** Server A cannot confirm that Server B has the same value. The system waits or rejects some requests until it can safely coordinate, reducing availability during the partition.

```text
Server A: write 50
Server B: cannot be reached
Request: wait or return an error
```

**Choice 2: Preserve availability (AP behavior).** Both sides continue responding independently. Server A may return 50 while Server B still returns 100; the system must reconcile divergent updates after communication recovers.

```text
Read Server A -> 50
Read Server B -> 100
Later: reconcile after the partition heals
```

CAP does not mean a system permanently picks any two properties in all situations. The tradeoff applies when a partition occurs; without a partition, a system can often provide both consistent and available responses.

## Interview reminders

- Decide how fresh the data must be for this feature; not every read needs the strongest guarantee.
- Consider whether an old answer or no answer would be worse for the user.
- CAP is about behavior during a partition, not a simple claim that a system permanently chooses only two of three properties.

## Short answer

During a network split, the system may reject some requests to keep answers up to date, or answer with possibly old data so more requests can succeed. Choose based on what the feature needs.