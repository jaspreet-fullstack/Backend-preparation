# SQL vs. NoSQL Databases

Choose a database based on how the system uses its data, what must be kept correct, and how it will be run. Do not assume one type is always faster or scales better.

| SQL | NoSQL |
| --- | --- |
| Data is stored in related tables with a defined structure | Data may be stored as key-value pairs, documents, wide columns, or graphs |
| Supports joins between tables and transactions (all-or-nothing updates) | The best features depend on the specific database type |
| Often a good fit when relationships and reliable multi-step updates matter | Often a good fit when its data shape matches the main reads and writes |

## Interview reminders

- SQL databases can scale horizontally with suitable architectures; NoSQL systems still involve tradeoffs and constraints.
- Consider the common reads and writes, what updates must stay together, data freshness, how data may be split across servers, and team experience.
- Be specific about the NoSQL model; the term covers different database types.

## Interview answer

Start with the main reads and writes and what must remain correct. Then choose a relational or specific NoSQL model that fits, and explain its tradeoffs as the system grows.