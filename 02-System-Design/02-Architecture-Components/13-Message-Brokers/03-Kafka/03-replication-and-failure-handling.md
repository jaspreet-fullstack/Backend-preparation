# Kafka Replication and Failure Handling

Kafka can keep copies of each partition on different brokers so a broker failure does not automatically lose the partition.

- The **leader replica** handles reads and writes for a partition.
- **Follower replicas** copy records from the leader.
- **In-sync replicas (ISR)** are replicas that are caught up enough to be considered current.
- If the leader fails, Kafka can elect an in-sync replica as the new leader.

```text
Producer -> Leader replica -> Follower replica
                         `-> Follower replica
                leader fails: elect an in-sync follower
```

## Producer acknowledgements

- `acks=0`: producer does not wait for broker confirmation; faster, but a record can be lost without the producer knowing.
- `acks=1`: leader confirms the record; a leader failure before replication can still lose it.
- `acks=all`: wait for the current in-sync replicas to confirm, subject to broker settings such as `min.insync.replicas`. This improves durability but can reject writes if too few replicas are available.

Replication and acknowledgement settings trade write availability and speed against the chance of losing a confirmed record. They do not remove the need to understand the cluster's configuration.

## Interview answer

Explain which replicas can become leader and what producer acknowledgement level is required. Connect the choice to acceptable data loss and behavior when replicas are unavailable.