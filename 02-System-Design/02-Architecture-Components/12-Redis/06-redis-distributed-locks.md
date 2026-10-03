# Redis Distributed Locks

A **distributed lock** lets only one worker at a time enter a critical section across multiple application servers. Redis can grant a short-lived lock atomically:

```text
SET lock:inventory:42 <unique-token> NX PX 30000
```

`NX` means “only if the key does not exist”; `PX` sets an expiry in milliseconds. A unique token identifies the worker that acquired the lock.

## Safe release and failure risks

- Release the lock only if its saved token still matches yours. Use an atomic script so another worker's lock is not deleted by mistake.
- The expiry is a lease: if a worker pauses longer than the lease, another worker may acquire the lock while the first is still running.
- For critical writes, use a fencing token (an increasing number) that the protected database or service checks, so an old worker cannot overwrite newer work.
- A lock does not make a multi-step database update transactional; use database transactions for that guarantee.

## Interview answer

Use a lock only when work must be exclusive across servers. Explain how it is acquired, how ownership is checked before release, what happens when a worker pauses, and whether the protected resource can reject stale lock holders.