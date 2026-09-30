# Horizontal and Vertical Scaling

**Vertical scaling (scale up)** gives one machine more power, such as CPU, memory, or storage. **Horizontal scaling (scale out)** adds more machines or service instances.

| Approach | Main benefit | Main tradeoff |
| --- | --- | --- |
| Vertical | Usually simpler because work stays on one machine | Limited by that machine; its failure can stop the whole service |
| Horizontal | Adds capacity by spreading work across machines | Needs traffic sharing and may need data splitting or coordination |

```text
Vertical:   [one server] -> [larger server]
Horizontal: [load balancer] -> [server] [server] [server]
```

## Interview reminders

- Application servers that do not keep user data in their own memory are easier to add or remove.
- A load balancer shares requests, but it does not fix shared-data or database limits by itself.
- Splitting a database across machines (sharding) needs a key that spreads data and requests evenly.
- Find the part that is actually overloaded; adding servers elsewhere may not help.

## Short answer

Vertical scaling makes one machine larger; horizontal scaling adds machines. Scaling out can handle more load, but the system must share traffic and data across those machines.