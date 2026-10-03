# Redis Persistence, TTL, and Eviction

Redis stores data in memory for speed. Persistence options save data to disk so it can be restored after a restart; each option trades recovery needs against write cost.

## Persistence options

| Option | What it saves | Main tradeoff |
| --- | --- | --- |
| **RDB** | A snapshot of data at a point in time | Compact and quick to restore, but recent writes since the last snapshot may be lost. |
| **AOF** | A record of write commands | Can keep more recent changes, but the log can be larger and replay can take longer. |

Both can be enabled together. The right setup depends on how much data loss and recovery time the application can accept.

## Expiration and eviction

- **TTL** (time to live) sets when a key should expire.
- **Eviction** removes keys when Redis reaches its configured memory limit.
- Policies such as LRU (remove least recently used) or LFU (remove least frequently used) help choose keys to remove. `noeviction` rejects writes instead of removing keys.
- A key's expiry or eviction can remove it before the application expects; do not treat a cache as the only copy of important data unless the durability design supports it.

## Interview answer

Explain whether Redis data must survive restarts, choose snapshots, command logging, or both, then state what happens when memory fills: remove eligible keys or reject new writes.