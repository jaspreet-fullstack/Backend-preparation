# Fault Tolerance and Disaster Recovery

**Fault tolerance** keeps the most important parts of a service working when something fails. **Disaster recovery** restores the service and its data after a major outage or data loss.

## Key points

- Keep extra copies in separate places that are unlikely to fail together; check service health and practice switching to a healthy copy (failover).
- If an optional feature fails, keep core features working where possible.
- Test restoring backups; a backup is useful only if it can be restored.
- **RTO** is how quickly service must be restored. **RPO** is how much recent data, measured by time, the system can afford to lose.
- Running in more than one geographic region can survive a regional outage, but adds cost and makes keeping copies in sync harder.

## Interview answer

In an interview, say what must keep working, what happens when a server or region fails, how service is restored, and how much downtime or recent data loss is acceptable.