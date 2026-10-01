# Consistent Hashing

**Consistent hashing** assigns keys and servers positions on a circular hash space. A key belongs to the next server found moving clockwise around the circle.

```text
          [Server A]
        /            \
   [Key K]          [Server B]
        \            /
          [Server C]

Key K is stored on the next server clockwise from its position.
```

## Why it is useful

- When a server is added or removed, only keys near that server's position usually need to move.
- With simple `hash(key) % server_count`, changing the server count can move many keys.
- Virtual nodes give each real server several positions, helping spread keys more evenly.

## Where it is used

Consistent hashing can distribute cache keys or data partitions across servers. It can reduce how much data must move when a cluster changes, but it does not guarantee perfectly even load; very popular keys still need separate handling.

## Interview answer

Use consistent hashing when keys must be spread across a changing set of servers and moving lots of keys would be costly. Explain how keys map to servers, what happens when a server joins or leaves, and how hot keys are handled.