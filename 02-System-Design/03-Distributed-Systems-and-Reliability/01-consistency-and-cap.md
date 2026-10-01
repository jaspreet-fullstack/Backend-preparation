# Consistency and CAP

**Consistency** describes how up to date a read must be after data changes. With strong consistency, a later read sees a completed write. With eventual consistency, copies may be briefly different but should catch up.

## Consistency tradeoffs

- Choose strong consistency when an old answer could cause an incorrect action, such as spending the same account balance twice.
- Eventual consistency can be suitable when a short delay is acceptable, such as a like count or analytics report.
- Keeping copies in sync may add response time or cause the system to reject some requests during a network failure. Allowing reads from an out-of-date copy can keep more requests working, but users may briefly see old data.
- Choose the weakest consistency that still keeps the feature correct; not every part of a system needs the same rule.

## CAP in an interview

CAP describes a tradeoff during a **network partition** (when some servers cannot communicate). While the network is split, a distributed system cannot promise both up-to-date answers and a successful answer to every request. The practical question is: should the system reject a request, or answer using data that may be old?

## Interview reminders

- Decide how fresh the data must be for this feature; not every read needs the strongest guarantee.
- Consider whether an old answer or no answer would be worse for the user.
- CAP is about behavior during a partition, not a simple claim that a system only ever has two of three properties.

## Short answer

During a network split, the system may reject some requests to keep answers up to date, or answer with possibly old data so more requests can succeed. Choose based on what the feature needs.