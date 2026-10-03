# Kafka Scaling and Rebalancing

Kafka scales work across **partitions** and brokers. Partitions are the units that can be stored and consumed in parallel.

## Scaling consumers

- In one consumer group, a partition is assigned to at most one consumer at a time.
- Adding consumers can increase parallel work only while there are unassigned partitions. Extra consumers remain idle.
- If membership changes, Kafka reassigns partitions; this is a **rebalance** and can briefly pause processing.
- A slow group falls behind. The difference between the newest offset and the group's offset is called **consumer lag**.

## Scaling partitions

- More partitions can increase parallelism, but use more broker resources and add operational work.
- Too few partitions limit consumer parallelism; too many can add overhead.
- A hot key can send too much work to one partition. Increasing a topic's partition count may also change where future records for a key go, so consider ordering requirements before changing it.

## Interview answer

Estimate the needed parallelism, choose enough partitions for expected consumer work, and leave capacity for growth. Explain rebalances, lag, and how keys distribute traffic.