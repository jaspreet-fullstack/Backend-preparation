# Database Replication

**Replication** keeps copies of database data on more than one server. It can keep data available after a failure and let multiple servers handle reads.

## Common setup

- The **primary** accepts updates; **replicas** copy those updates.
- **Synchronous replication** waits for copies to confirm an update. This can make saved data safer, but adds delay and may block writes if a replica is unavailable.
- **Asynchronous replication** confirms the write before copies catch up. It is faster, but a replica may briefly show old data (replication lag).

```text
Writes -> Primary -> Replica A
				   -> Replica B
```

## Tradeoffs to mention

- Reads from a replica may be behind the latest write.
- **Failover** means switching to a healthy server when one fails; choose the new primary carefully so two servers do not accept conflicting writes.
- Replication makes copies; it does not split data or write work across servers.

## Interview answer

Replication keeps extra copies for availability or more read capacity. In an interview, say whether copies update before or after a write is confirmed, then discuss old reads and failover.