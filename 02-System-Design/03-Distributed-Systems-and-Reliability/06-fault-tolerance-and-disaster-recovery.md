# Fault Tolerance and Disaster Recovery

**Fault tolerance** means the system continues working when a component fails, ideally with little or no interruption.

**Disaster recovery (DR)** means restoring the system and its data after a major failure or outage.

> Fault tolerance = keep running. Disaster recovery = recover after failure.

## 1. Fault Tolerance

The goal is to prevent one component failure from bringing down the whole application. The system may continue at reduced capacity while traffic is routed around the failed component.

### Example: Application server failure

```text
Load balancer
	|-- Server A [failed]
	|-- Server B [healthy] <- serves traffic
	`-- Server C [healthy] <- serves traffic
```

Health checks detect that Server A is unhealthy, and the load balancer sends requests to healthy servers. The application remains available, though it may have less capacity.

### Common techniques

- Multiple application servers and load balancing.
- Health checks and automatic or manual failover.
- Database replicas and redundant infrastructure.
- Graceful degradation so core features continue when an optional component fails.

## 2. Disaster Recovery

Disaster recovery handles major failures that cannot be solved by switching away from one failed component, such as a regional outage, widespread data corruption, or accidental deletion.

### Example: Regional outage

```text
Region A [unavailable]
			 |
			 v
		 failover or restore
			 |
			 v
Region B [service restored]
```

Depending on the recovery design, Region B may already be running, may be a warm standby, or may need to be built and restored after the outage.

### Common techniques

- Database and object-storage backups.
- Cross-region replication or backup copies.
- Standby infrastructure or a multi-region deployment.
- Documented recovery procedures and regular recovery tests.

## 3. RTO - Recovery Time Objective

**RTO** is the maximum acceptable time to restore the service after an outage.

```text
RTO = 30 minutes
Outage begins -> service must be restored within 30 minutes
```

RTO affects the recovery approach: restoring from backups usually takes longer than failing over to a ready standby.

## 4. RPO - Recovery Point Objective

**RPO** is the maximum amount of recent data, measured in time, that the business can afford to lose after an outage.

```text
Failure occurs: 10:10
Latest recoverable data: 10:05
Possible data loss: 5 minutes
```

With an RPO of 5 minutes, the recovery point should be no more than 5 minutes behind the failure. Backups or replication must be frequent and reliable enough to meet that target.

## 5. Fault Tolerance vs. Disaster Recovery

| | Fault tolerance | Disaster recovery |
|---|---|---|
| Goal | Keep the service running through component failures | Restore service and data after a major outage |
| Typical failure | Server, process, or component failure | Regional outage, widespread corruption, or major data loss |
| Common techniques | Redundancy, health checks, load balancing, failover | Backups, cross-region copies, restore procedures, standby regions |
| Downtime | Ideally none or brief interruption | Some downtime may be expected |
| Measures | Availability and failover behavior | RTO and RPO |

## 6. Important Interview Points

- Redundancy helps prevent a single component failure from taking down the service.
- Failover redirects work to a healthy component; it may be automatic or manual.
- Replicas can improve availability, but they are not a substitute for backups against accidental deletion or corruption.
- A backup is useful only if restore has been tested.
- RTO is how quickly the service must recover; RPO is how much recent data loss is acceptable.
- Multi-region deployment can protect against regional failure, but increases cost and operational complexity.

## 7. Interview Answer

> Fault tolerance means designing a system to keep working when components fail, for example with multiple servers, health checks, and failover. Disaster recovery restores service after a major event such as a regional outage or data loss, using backups or another region. RTO defines how quickly service must be restored, while RPO defines how much recent data the business can afford to lose.