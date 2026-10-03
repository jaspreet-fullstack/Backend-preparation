# Redis Cluster and Hash Slots

Redis Cluster splits keys across multiple primary servers so the dataset and request load do not depend on one server. It uses **16,384 hash slots**: Redis maps each key to a slot, and each primary owns a range of slots.

```text
Key -> hash slot -> primary that owns the slot
                      |              |
                  Primary A       Primary B
                  slots 0..X      slots X+1..16383
```

## Key points

- When servers are added or removed, slots can move between primaries (resharding).
- Replicas can be assigned to primaries to help with failover.
- Multi-key operations generally require the keys to be in the same slot. Hash tags, such as `{user42}:profile` and `{user42}:settings`, make Redis hash the text inside the braces so related keys land together.
- Clients need to understand cluster redirects and route requests to the server that owns each slot.

## Cluster vs. Sentinel

Redis Cluster splits keys across primaries and can use replicas for failover. Sentinel monitors a primary/replica setup and coordinates failover, but does not split the dataset.

## Interview answer

Choose Redis Cluster when one Redis server cannot hold the data or handle the request load. Explain how keys map to slots, how slots move, and how multi-key operations are kept on one slot.