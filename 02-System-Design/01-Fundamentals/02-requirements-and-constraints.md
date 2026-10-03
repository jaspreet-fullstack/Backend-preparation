# Requirements and Constraints

Before designing a system, first understand **what it needs to do** and **what constraints it must satisfy**.

## Functional Requirements

Define **what the system does**.

- Users and their actions
- Core features and workflows
- Inputs and outputs

**Example:** A URL shortener should create a short URL and redirect users to the original URL.

## Non-Functional Requirements

Define **how well the system should work**.

- **Latency** — How quickly the system responds.
- **Availability** — How reliably the system serves requests.
- **Scalability** — How much traffic or data the system can handle.
- **Durability** — Whether data survives failures.
- **Consistency** — How quickly updates become visible.
- **Security** — How the system protects data and users.
- **Cost** — Infrastructure and operational cost.

## Questions to Clarify

- What are the main user flows?
- What is in scope and out of scope?
- How many users and requests are expected?
- How much data will be stored?
- What latency and availability are required?
- Is strong or eventual consistency acceptable?
- Are there security, privacy, retention, or regional requirements?

## Interview Reminder

Requirements should **drive the architecture**. Clarify the important requirements first instead of choosing technologies immediately.