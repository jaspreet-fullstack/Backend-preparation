# System Design Interview Approach

## A simple flow

1. **Clarify the scope**: identify the users and the main actions the system must support.
2. **Confirm requirements**: ask about expected size, speed, uptime, data freshness, and limits.
3. **Estimate the load**: roughly estimate requests, stored data, and network traffic.
4. **Define the API and data model**: decide how clients use the service and how its data is stored.
5. **Draw the high-level design**: show the main services, storage, and how requests or background work move between them.
6. **Explore tradeoffs and failures**: find likely bottlenecks (parts that limit capacity) and explain how failures are handled.

## Interview reminders

- State assumptions and invite the interviewer to correct them.
- Keep the first design simple; add complexity only to meet a requirement.
- Explain why each component is needed and what it makes better or harder.
- Leave time to discuss bottlenecks, failure cases, and possible improvements.

## Short answer

Start by clarifying requirements and scale, then propose a simple high-level design. Deepen the parts that matter most, explaining tradeoffs and failure handling as you go.