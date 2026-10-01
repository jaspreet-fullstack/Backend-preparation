# Redis Instances, Replication, and Sentinel

An **instance** is one running Redis server.

## Common setups

- **Standalone**: one instance. It is simple, but that server can become a limit or a single point of failure.
- **Primary and replica**: the primary accepts writes and replicas copy its data. Replication is usually asynchronous, so a replica can briefly be behind.
- **Redis Sentinel**: separate monitor processes check whether the primary is healthy. If it fails, Sentinel can promote a replica and help clients find the new primary.

```text
Application -> Primary -> Replica
                  ^          |
                  |          `-- copies data
             Sentinel monitors and can promote a replica
```

Sentinel provides monitoring and failover; it does **not** split data across servers. Redis Cluster handles data partitioning.

## Interview tradeoffs

Replication can improve read capacity and help recover from a server failure, but replicas may lag. Failover can take time, and clients must reconnect to the new primary.

## Interview answer

Use a standalone instance for a simple setup. Add replicas and Sentinel when failover is needed, and use Redis Cluster when the data must be split across multiple primary servers.