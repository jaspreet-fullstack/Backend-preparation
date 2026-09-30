# Consistency and CAP

**Consistency** describes how up to date a read must be after data changes. With strong consistency, a later read sees a completed write. With eventual consistency, copies may be briefly different but should catch up.

## CAP in an interview

CAP describes a tradeoff during a **network partition** (when some servers cannot communicate). While the network is split, a distributed system cannot promise both up-to-date answers and a successful answer to every request. The practical question is: should the system reject a request, or answer using data that may be old?

## Interview reminders

- Decide how fresh the data must be for this feature; not every read needs the strongest guarantee.
- Consider whether an old answer or no answer would be worse for the user.
- CAP is about behavior during a partition, not a simple claim that a system only ever has two of three properties.

## Short answer

During a network split, the system may reject some requests to keep answers up to date, or answer with possibly old data so more requests can succeed. Choose based on what the feature needs.