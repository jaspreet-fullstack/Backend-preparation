# Requirements and Constraints

## Functional requirements

Describe **what the system does**: its users, core actions, and expected outputs.

Example: a URL shortener creates a short URL and redirects visitors to the original URL.

## Non-functional requirements

Describe **how well the system must work**:

- **Latency**: how long a request takes.
- **Availability**: how often the system can serve requests.
- **Scale**: how many users, requests, or records it must handle.
- **Durability**: whether saved data survives failures.
- **Consistency**: how up to date reads must be after a write.
- **Security and cost**: how data is protected and what the system can spend.

## Questions to clarify

- Which user flows are in scope? What can be left out?
- How many users, requests, and stored objects should the design support?
- What latency and availability targets matter?
- Must a read show a recent write immediately, or is a short delay acceptable?
- Are there data retention, privacy, or regional constraints?

## Interview reminder

Prioritize requirements instead of treating every feature as equally important. Requirements guide the design; do not choose technologies before understanding them.

## Short answer

Functional requirements define system behavior. Non-functional requirements define qualities and limits, such as scale, latency, availability, and consistency. Clarifying both keeps the design focused.