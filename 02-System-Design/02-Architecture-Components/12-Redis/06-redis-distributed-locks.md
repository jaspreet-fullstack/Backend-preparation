# Redis Distributed Locks

A **distributed lock** ensures that **only one application server or worker performs a particular operation at a time**, even when multiple servers are running.

### Example

Suppose two workers try to update the same inventory:

```text id="z7v2kp"
Worker A ──┐
           ├── Update inventory
Worker B ──┘
```

Without a lock, both workers might update the same data at the same time.

With a lock:

```text id="m3x9qk"
Worker A → 🔒 Lock → Update inventory
Worker B → waits/rejected
```

---

## 1. Acquiring a Lock

Redis can create the lock atomically:

```redis id="q8y5nt"
SET lock:inventory:42 unique-token NX PX 30000
```

### Meaning

- `lock:inventory:42` → Lock key
- `unique-token` → Unique value identifying the worker
- `NX` → Create the key only if it doesn't already exist
- `PX 30000` → Lock expires after 30 seconds

If the command succeeds:

> The worker acquired the lock.

If the key already exists:

> Another worker currently holds the lock.

---

## 2. Why Does the Lock Expire?

Suppose the worker crashes while holding the lock:

```text id="a2j6vx"
Worker A
   ↓
Acquires lock
   ↓
💥 Worker crashes
```

Without an expiry, the lock could remain forever.

The TTL allows the lock to automatically expire:

```text id="c1s8wb"
Lock acquired
     ↓
30 seconds
     ↓
Lock expires
```

Another worker can then acquire the lock.

---

## 3. Safe Lock Release

A worker should **only delete the lock if it owns it**.

The unique token identifies the owner:

```text id="d9h2mp"
Worker A → token-A → Lock
Worker B → token-B → Lock
```

Before deleting the lock:

```text id="v3j7ks"
Is lock value == my token?
          ↓
         Yes
          ↓
       Delete
```

This check must be **atomic**.

### Redis Lua Script

A **Lua script** is a small script that Redis executes **inside Redis as one atomic operation**.

For example:

```lua
if redis.call("GET", KEYS[1]) == ARGV[1] then
    return redis.call("DEL", KEYS[1])
else
    return 0
end
```

Here:

- `KEYS[1]` → Lock key
- `ARGV[1]` → Our unique token
- `GET` → Check who owns the lock
- `DEL` → Delete only if the token matches

Why use Lua?

Without atomic execution, another worker could acquire the lock between the **check** and **delete** operations.

So:

> **Lua script = execute multiple Redis operations atomically as one operation.**

---

## 4. Lock Expiry Problem

Suppose:

```text id="x5m2qw"
Lock TTL = 30 seconds
```

But Worker A takes 40 seconds to finish:

```text id="f4y8vp"
0 sec  → Worker A gets lock
30 sec → Lock expires
31 sec → Worker B gets lock
40 sec → Worker A is still running
```

Now both workers may be working at the same time.

This is one of the important risks of distributed locks.

---

## 5. Fencing Tokens

A **fencing token** is an increasing number given to each new lock owner.

It helps prevent an **old worker** from modifying the protected resource after its lock has expired.

Example:

```text id="q7w3vn"
Worker A → Lock → Fencing token = 1

Lock expires

Worker B → Lock → Fencing token = 2
```

Now Worker A is old, while Worker B is the current owner.

Suppose Worker A finishes late and tries to update the database:

```text id="k9d4zs"
Worker A → token 1 → Database ❌

Worker B → token 2 → Database ✅
```

The database can be designed to accept only requests with a **newer fencing token**.

For example:

```text id="c8m5rx"
Database last token = 2

Request token = 1
→ Reject ❌

Request token = 3
→ Accept ✅
```

### Why is this useful?

It protects against a worker that:

- Holds an expired lock
- Gets paused for a long time
- Experiences a network delay
- Continues executing after another worker has taken over

### Easy way to remember

> **Lock = Who can work now?**

> **Fencing token = Prevent old workers from working after they should no longer be allowed.**

---

## 6. Lock vs Database Transaction

A Redis lock and a database transaction solve different problems.

**Distributed lock:**

> Prevent multiple workers from performing the same operation simultaneously.

**Database transaction:**

> Ensure multiple database operations succeed or fail together.

Depending on the use case, you may need both.

---

## Interview Answer

> **A Redis distributed lock ensures that only one worker performs a particular operation at a time across multiple servers. We can acquire it using `SET key value NX PX`, where `NX` ensures the lock doesn't already exist and `PX` gives it an expiry. We use a unique token to verify ownership before releasing the lock, and a Redis Lua script can make the ownership check and deletion atomic. A possible problem is that the lock can expire while the worker is still running. For critical operations, fencing tokens can be used so an old worker cannot modify the resource after another worker has taken over.**