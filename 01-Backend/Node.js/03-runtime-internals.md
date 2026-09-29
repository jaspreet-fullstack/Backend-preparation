## 1. V8 Engine 
 V8 is Google's JavaScript engine, originally developed for Chrome and also used by Node.js.

Node.js itself is not the JavaScript engine.
Node.js have V8 and libuv

                Node.js
                   │
       ┌───────────┴───────────┐
       │                       │
      V8                    libuv
       │                       │
 JavaScript execution      Async I/O,
                           Event Loop,
                           Thread Pool

                           What V8 does

**V8 handles things like :**
Parsing JavaScript , Compiling JavaScript , Executing JavaScript , Memory allocation , Garbage collection , JavaScript objects , Functions , Closures , Execution contexts.

V8 is responsible for parsing and executing JavaScript, optimizing frequently executed code using JIT compilation, and managing JavaScript memory and garbage collection.

So, in simple terms, Node.js provides the runtime environment, while V8 is responsible for executing the JavaScript code.

## 2. Libuv

-- libuv is a cross-platform C library used by Node.js to provide asynchronous I/O functionality.
-- It provides the Event Loop and integrates Node.js with operating-system-level asynchronous I/O. 
-- It also provides a thread pool for CPU heavy work/certain operations such as some filesystem, DNS, cryptographic, and compression operations.
-- This allows Node.js to handle many I/O operations without blocking the main JavaScript execution thread.


## 3. Libuv Thread Pool
Node.js executes JavaScript primarily on a single main thread, but some operations can require blocking or CPU-intensive system work.
libuv provides a thread pool so certain operations can be performed away from the main JavaScript thread.
Examples include some filesystem operations, DNS operations, cryptographic operations, and compression.
The default libuv thread pool size is typically **4 threads,** and it can be configured using the UV_THREADPOOL_SIZE environment variable.
The important point is that not every asynchronous operation uses the thread pool. Some I/O operations are handled directly through operating-system asynchronous mechanisms.
Example:- UV_THREADPOOL_SIZE=8 node server.js

## 4. Event Loop Blocking 

Event Loop blocking means that the main JavaScript thread is busy executing synchronous work and therefore cannot process other callbacks or JavaScript tasks.
For example, if I perform a very large synchronous loop or CPU-intensive calculation inside a request handler, that work runs on the main JavaScript thread.
While that code is executing, the Event Loop cannot process other JavaScript callbacks, so other incoming requests may be delayed.
Therefore, CPU-intensive synchronous operations should generally be moved to Worker Threads, background workers, child processes, or separate services depending on the use case.


## 5. CPU-bound vs I/O-bound
A CPU-bound workload spends most of its time performing computation on the CPU. Examples include large calculations, image processing, video encoding, and other computationally intensive operations.

An I/O-bound workload spends most of its time waiting for external resources, such as a database, filesystem, network API, or another service.

Node.js is particularly effective for I/O-bound workloads because asynchronous I/O allows the main JavaScript thread to continue processing other work while external operations are in progress.

CPU-bound synchronous JavaScript is different because it executes on the main JavaScript thread and can block the Event Loop. For CPU-heavy workloads, I would consider Worker Threads, background workers, child processes, or a separate service.

 ```
 CPU-bound
    ↓
CPU doing heavy computation
    ↓
Main JS thread can become blocked

I/O-bound
    ↓
Waiting for DB / network / filesystem
    ↓
Main JS thread can process other work

```

**Ques. Why is Node.js well suited for I/O-heavy applications**
Node.js is good for I/O-heavy applications because it uses non-blocking, asynchronous I/O and an Event Loop.

For example, when Node.js sends a database query or API request, it doesn't wait there doing nothing. It can handle other requests while waiting for the result.

Once the operation is completed, Node.js processes the result through the Event Loop.

That's why Node.js works well for applications like APIs, real-time apps, and network services, where many I/O operations happen at the same time.






