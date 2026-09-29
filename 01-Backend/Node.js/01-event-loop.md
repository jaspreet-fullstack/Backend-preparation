# Node.js Event Loop

## 1. What is the Event Loop?

-- The Event Loop is the mechanism in Node.js that allows JavaScript 
   to handle asynchronous operations without blocking the main JavaScript thread.
-- The event loop continuously checks whether there are callbacks or tasks ready 
   to execute and pushes them onto the JavaScript call stack when the stack is free.

## 2. Why do we need an Event Loop?
-- We need the Event Loop because Node.js executes JavaScript primarily on a single thread.
-- The Event Loop allows Node.js to handle asynchronous operations without blocking that thread.
-- While an I/O operation is in progress, Node.js can continue processing other requests. 
-- Once the operation completes, its callback or Promise continuation is scheduled, and the 
   Event Loop allows it to execute when the JavaScript thread is available.


## 3. Event Loop phases

A simplified Node.js Event Loop model is:

````
Timers
  ↓
Pending callbacks
  ↓
Idle / Prepare
  ↓
Poll
  ↓
Check
  ↓
Close callbacks
```

### Timers

Handles callbacks scheduled by:

``` js
setTimeout()
setInterval()
```

Timer delay is a minimum threshold, not a guarantee of exact
execution time.

### Pending callbacks

-- Pending callbacks are callbacks that could not be executed immediately, 
   so Node.js keeps them pending and executes them in a later iteration of the Event Loop.
-- They are mainly related to certain system-level I/O operations.

### Poll

The Poll phase handles I/O-related callbacks and determines whether it
should wait for more I/O. 
(file i/o, database query)

### Check

The Check phase executes:

``` js
setImmediate()
```

### Close callbacks

Handles close-related events such as socket close callbacks.

## 4. Microtasks

Node.js has two important microtask-related queues:

``` text
process.nextTick()
Promise callbacks / queueMicrotask()
```

`process.nextTick()` has special priority in Node.js.

After a callback runs, Node drains the nextTick queue and then the
regular microtask queue before continuing with other Event Loop work.

Example:

``` js
console.log("1");

setTimeout(() => console.log("2"), 0);
setImmediate(() => console.log("3"));

Promise.resolve().then(() => console.log("4"));
queueMicrotask(() => console.log("5"));

process.nextTick(() => console.log("6"));

console.log("7");
```

OUTPUT:

```
1
7
6
4
5
```

The relative ordering of `setTimeout(0)` and `setImmediate()` from the
main module is not something to blindly memorize as always fixed.

## 4. Event Loop inside an I/O callback

``` js
const fs = require("fs");

console.log("1");

fs.readFile(__filename, () => {
  console.log("2");

  setTimeout(() => console.log("3"), 0);
  setImmediate(() => console.log("4"));

  process.nextTick(() => console.log("5"));
  Promise.resolve().then(() => console.log("6"));
});

console.log("7");
```

Ordering:

``` text
1
7
2
5
6
4
3
```

## 6. CPU-heavy work

This blocks the main JavaScript thread:

```
for (let i = 0; i < 10_000_000_000; i++) {
  // CPU-heavy work
}
```

The Event Loop does not magically move synchronous CPU-heavy JavaScript
to another thread.

For CPU-heavy work consider:

-   Worker Threads
-   background workers
-   child processes
-   separate services

## questions

### Q. Is Node.js single-threaded?

Yes, Node.js is single-threaded **with respect to JavaScript execution on its main thread**.
Node.js uses V8 to execute JavaScript on the main thread, and the Event Loop allows it to handle many 
concurrent I/O operations without creating a separate thread for every request.
However, Node.js itself is not completely single-threaded. It can use additional threads through mechanisms 
such as `worker_threads`, and its runtime also relies on operating-system facilities and libuv for asynchronous operations.
For CPU-intensive JavaScript work, we can use Worker Threads so that the main Event Loop is not blocked.
So, the most accurate way to say it is:

**“Node.js has a single main JavaScript thread and an Event Loop, but the overall Node.js runtime can use multiple threads and processes when required.”**


### Q3. What is the difference between Event Loop and thread pool?
The Event Loop and Thread Pool have different responsibilities in Node.js.

The **Event Loop runs JavaScript callbacks on the main thread** and coordinates asynchronous operations.
It allows Node.js to handle multiple requests without blocking the main thread.
The **Thread Pool is a set of worker threads provided by libuv**. It is used for certain operations that 
cannot be handled efficiently through the operating system's asynchronous APIs, such as some file system 
operations, image processing, video encoding, large calculation.
For example, if I call `fs.readFile()`, Node.js can use the libuv thread pool to perform the file-system work. 
Once the operation is completed, its callback is scheduled so that the Event Loop can execute the JavaScript callback.

So, in simple terms:

**Event Loop = manages and executes callbacks**

**Thread Pool = performs certain background operations**

They work together, but they are not the same thing.

### Q. Does setTimeout(fn, 0) run immediately?
No. Zero means the timer becomes eligible after the minimum delay. It
still depends on the Event Loop and whether the JavaScript thread is
available.

### Q5. Does CPU-heavy code block Node.js?

Yes, if it is synchronous JavaScript. The code executes on the main
JavaScript thread, so while it is running, the Event Loop cannot
process other JavaScript callbacks on that thread.

## Short answer

Node.js executes JavaScript primarily on one main thread. The Event
Loop coordinates asynchronous work, while libuv and the operating
system handle asynchronous I/O and certain operations through the
thread pool. Synchronous CPU-heavy JavaScript can block the Event
Loop, so CPU-intensive work may need Worker Threads or background
processing.
