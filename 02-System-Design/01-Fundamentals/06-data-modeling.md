# Data Modeling

Design the data model from the system's needs and access patterns (how the system reads and writes data), not from a preference for a particular database.

## Quick checklist

- Identify the main things to store, how they relate, and the questions the system must answer.
- Consider a relational database when links between records and reliable multi-step updates matter.
- Consider key-value or document databases when their data shape fits the main reads and writes.
- Add indexes to speed up important searches, knowing they use space and can slow updates.
- If data is split across machines, choose a partition key that spreads work evenly and avoids an overloaded partition.
- Copy data to speed up reads only when the extra copies and harder updates are worth it.
- State consistency, retention, and transaction requirements.

## Interview prompt

Ask: “What does the system read and write most often, and what must each operation guarantee?” Those answers guide how data is organized and where it is stored.

## Short answer

Model around the important access patterns and correctness requirements. Then choose storage and indexes that support them, while explaining the tradeoffs for writes, reads, consistency, and scale.