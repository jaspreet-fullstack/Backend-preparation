# Kafka Scaling and Rebalancing

Kafka scales by using **partitions** to process messages in parallel.

## 1. Scaling Consumers

In a consumer group:

> **One partition → One consumer at a time**

Example:

```text id="v3p8x1"
3 Partitions

P0 → Consumer A
P1 → Consumer B
P2 → Consumer C
```

If there are more consumers than partitions:

```text id="c9q1zr"
2 Partitions

P0 → Consumer A
P1 → Consumer B
       Consumer C → Idle
```

So adding consumers only helps when there are **available partitions**.

## 2. Rebalancing

When a consumer joins, leaves, or fails, Kafka **reassigns partitions** between consumers.

This is called a **rebalance**.

> **Rebalance = Redistribute partitions among consumers**

A rebalance can temporarily pause processing.

## 3. Consumer Lag

**Consumer lag** means how far behind a consumer group is from the latest messages.

```text id="s7v2ka"
Latest offset:   1000
Consumer offset:  900

Lag = 100
```

> **Lag = Messages the consumer group is behind**

High lag usually means consumers cannot keep up with the incoming workload.

## 4. Scaling Partitions

More partitions allow more consumers to work in parallel.

```text id="k8m3qx"
More partitions
      ↓
More consumers can work
      ↓
Higher parallelism
```

But too many partitions increase **broker resource usage and operational overhead**.

Also, a **hot key** can send most traffic to one partition, limiting parallelism.

## Easy Memory

> **Partitions → Parallelism**  
> **Consumers → Process partitions**  
> **Rebalance → Redistribute partitions**  
> **Lag → Consumer is behind**

## Interview Answer

> **Kafka scales consumer processing through partitions. In a consumer group, one consumer handles a partition at a time, so we need enough partitions for the desired parallelism. When consumers join or leave, Kafka rebalances the partitions. I would also monitor consumer lag to see whether consumers are keeping up with the incoming workload.**