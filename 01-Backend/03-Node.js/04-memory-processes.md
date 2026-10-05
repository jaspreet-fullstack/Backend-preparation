## Memory & processes


## 1. What is the Call Stack?

The call stack is a data structure used by the JavaScript runtime to keep track of function execution.

When a function is called, a stack frame is added to the call stack. When the function finishes execution, its frame is removed.

JavaScript executes synchronous code through the call stack, which is why a long-running synchronous operation can block the main JavaScript thread and prevent other callbacks from being processed.

Call Stack

                 CALL STACK
            ┌─────────────────┐
            │    function C() │  ← Currently executing
            ├─────────────────┤
            │    function B() │
            ├─────────────────┤
            │    function A() │
            ├─────────────────┤
            │   Global / main │
            └─────────────────┘
                    │
                    ▼
              LIFO Order
        Last In → First Out

## 2. What is the Heap Memory?
The heap is mainly used for dynamically allocated data, especially objects and arrays.
It handle learge amount of data. it's size is also flexible 

## 3. What is the Stack Memory?
The stack mainly keeps information needed for currently executing functions.
it handles less amount of data. 
Example 

While add() is executing, the stack contains information related to that function call, such as:
When add() finishes, its stack frame is removed.
```
function add(a, b) {
  const result = a + b;
  return result;
}

add(10, 20);

```

Stack → "What is executing right now?"
Heap → "What data has been dynamically allocated?"


## 3.What is Garbage Collection?
JavaScript is a garbage-collected language.
It is the process of automatically removing memory that the application no longer needs.
If unused objects were never removed, memory would keep increasing and eventually the application could run out of memory.
Garbage collection is an automatic process in Node.js that identifies objects that are no longer reachable or needed and frees their heap memory.


## 4. Memory leak
A memory leak happens when our application keeps references to objects that are no longer needed.

Because those objects are still reachable, the V8 Garbage Collector cannot remove them. As a result, memory usage can keep increasing and may eventually cause the Node.js process to run out of memory.

**Ques: How do you find and fix Memory Leaks in Node.js?**

If I suspect a memory leak in a Node.js application, I first monitor the application's memory usage using process.memoryUsage().

```
console.log(process.memoryUsage());

It gives values such as:

{
  rss: ...,
  heapTotal: ...,
  heapUsed: ...,
  external: ...,
  arrayBuffers: ...
}

heapUsed is useful for checking how much V8 heap memory is currently being used.

I check whether heapUsed keeps increasing over time under a similar workload and whether memory is being reclaimed after Garbage Collection.
```
**1. Take Heap Snapshots**

If memory keeps growing, I can take a heap snapshot using Node.js/V8:

const v8 = require('node:v8');

v8.writeHeapSnapshot();

This generates a **.heapsnapshot file** that can be opened in Chrome DevTools.
I can then investigate:

Which objects are taking memory?, 
Why are they still alive?, 
What is referencing them?, 
Where is that reference coming from?, 

I can take snapshots at different points in time and compare them to find objects that are continuously being retained.

**2. Find the Root Cause**

Common causes of memory leaks include:

Unbounded caches,
Global references,
Event listeners that are not removed,
Timers that are not cleared,
Large arrays that keep growing,
Closures retaining unnecessary objects,
Loading large amounts of data into memory,

**3. Fix the Leak**
The solution depends on the root cause.

For example:

Add cache limits or expiration (TTL),
Remove unnecessary references,
Remove event listeners when they are no longer needed,
Clear timers using clearTimeout() / clearInterval(),
Use pagination instead of loading everything at once,
Use streams for processing large files,
Limit the amount of data stored in memory,

**4. Verify the Fix**
After fixing the issue, I reproduce the same workload again and monitor memory usage.
The goal is to verify that:

Memory increases during work
Garbage Collection
Unused memory is reclaimed
Memory becomes stable

## Final Answer

If I suspect a memory leak in a Node.js application, I first monitor memory usage using process.memoryUsage() and check whether heapUsed keeps increasing under a similar workload.
If memory keeps growing, I take heap snapshots and analyze them using Chrome DevTools. I compare snapshots to find objects that are continuously being retained and then inspect their retaining references to find out why the Garbage Collector cannot remove them.

Common causes include unbounded caches, global references, event listeners, timers, large arrays, and closures retaining unnecessary objects.

Once I identify the root cause, I remove the unnecessary reference or add proper cleanup, such as cache expiration, removing listeners, clearing timers, pagination, or streams.

Finally, I reproduce the same workload and verify that memory is being properly reclaimed and no longer keeps growing.


## 5. worker_threads:- 
Node.js provides the worker_threads module to run JavaScript in parallel on separate threads within the same Node.js process. It is mainly useful for CPU-intensive JavaScript work, not normal I/O operations.

**1. Why do we need Worker Threads?**

Normally, JavaScript code runs on Node.js's main thread.
Suppose we do a CPU-heavy operation and run this directly on the main thread.
This can make the application slow because the main JavaScript thread cannot process other callbacks while doing the synchronous CPU-heavy work.

```
With a worker
                    ┌── Main Thread
Request ────────────┤
                    │
                    └── Worker Thread
                         ↓
                    Heavy calculation

``` 
The heavy calculation runs on another thread, so the main thread can continue handling other work.

Node.js specifically recommends workers for CPU-intensive JavaScript operations and notes that they generally don't provide much benefit for I/O-intensive work.

**2. When should we use Worker Threads?**
Use them when the task is CPU-bound.

Examples:

Image processing, 
Video processing, 
Large data transformations, 
Complex calculations, 
CPU-heavy encryption/compression, 
Parsing very large data, 
Generating complex report

**3. When should we NOT use Worker Threads?**
Don't use workers just because something is asynchronous or I/O operation like fetch data from api.
You don't need a Worker Thread just to make an HTTP request.

Node's asynchronous I/O mechanisms are generally more appropriate for I/O work.


__________________________________________________________
**Final Answer What are Worker Threads:**

Worker Threads allow us to run JavaScript code in separate threads within the same Node.js process.

They are mainly useful for CPU-intensive tasks because heavy CPU work on the main JavaScript thread can block the Event Loop and delay other requests.

For example, if we need to perform image processing, complex calculations, or large data transformations, we can move that work to a Worker Thread. The main thread can then continue handling other requests.

The main thread and worker communicate using message passing such as worker.postMessage() and parentPort.postMessage().

Worker Threads are generally not needed for normal I/O operations such as database queries or HTTP requests because Node.js already provides asynchronous I/O for those operations.

So, in simple terms:

CPU-bound work → Worker Threads

I/O-bound work → Async I/O

## 6. child_process

A child process is a separate operating-system process created by a Node.js application.

Node.js provides the child_process module to execute external programs, commands, scripts, or other processes. For example, we can use it to run a Python script, shell command, ImageMagick, or another Node.js application.

The child process has its own memory and execution environment, so it is isolated from the parent Node.js process.

Node provides APIs such as:

spawn() → run a command/process and stream its input/output

exec() → run a command and get the complete output

fork() → create another Node.js process 

and provides an IPC channel for communication between the parent and child.

We commonly use child processes when we need to run external programs or isolate work into a separate process

**Ques.Why use child_process?**

Use it when you need to:

Run another program/command
Run a Python script from Node.js
Execute shell commands
Isolate work in a separate process
Run another Node.js application

A child process has its own memory and its own Event Loop.

**Important Note:-**

Worker thread → another thread inside the same Node.js process.

Child process → completely separate OS process with separate memory.


## 7. Cluster:- 

cluster allows you to create multiple Node.js processes (workers) so that your application can use multiple CPU cores.
Each worker is a separate Node.js process with its own:

separate OS processes, each with its own memory, 
Event Loop, V8 instance, Heap, Memory

Node's cluster module allows these workers to share the same server port and distribute incoming connection.
```
Normallly:

Server
   ↓
Node.js process
   ↓
Event Loop
   ↓
CPU core


With Cluster:

                 ┌── Worker 1 → CPU core
                 │
Incoming requests → Worker 2 → CPU core
                 │
                 ├── Worker 3 → CPU core
                 │
                 └── Worker 4 → CPU core

All four workers can handle requests through the same port 3000.

```

**Diff b/w Replica and Cluster**

Cluster = multiple Node.js processes on the same machine/server sharing the server port.

Multiple server replicas/instances = multiple machines/VMs/containers running your application, usually behind a load balancer.



