// Async Programming in Node.js

Async programming is one of the main reasons Node.js works well for I/O-heavy applications.
Instead of waiting for an operation like a database query, API call, or file operation to 
finish, Node.js can continue doing other work and handle the result later.
Node.js is designed around an asynchronous, event-driven model.

## 1. Callback:- 
A callback is a function that is passed to another function and called later when an asynchronous operation finishes.

**Callback problem: Callback Hell**
When multiple asynchronous operations depend on each other, callbacks can become deeply nested.
This makes the code harder to:read, maintain, debug, handle errors consistently

Promises and async/await make this flow easier to manage.

## 2. Promise:- 
A Promise represents the eventual result of an asynchronous operation.

A Promise has three states:

             Promise
                |
       ┌────────┼────────┐
       ↓        ↓        ↓
   pending   fulfilled  rejected


Pending:-Operation is still running.

Fulfilled:- Operation completed successfully.

Rejected:= Operation failed.

**Example:**

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("User fetched");
  }, 1000);
});

Using the Promise:

promise
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });

## resolve() && reject() 

resolve():-  means the operation completed successfully.
reject():-  means the operation failed.

## Promise Chaining
- Promises can be chained using .then().
- Each .then() can return another Promise.
- The next .then() waits for the Promise returned by the previous .then()

## .catch()

- .catch() can be placed at the end of the chain:
   getUser() .then(...) .then(...) .catch(...);

- Or it can be placed in the middle:
  getUser()
  .then(...)
  .catch((error) => {
    console.log(error);
    return fallbackData;
  })
  .then((data) => {
    console.log(data);
  });

➡️ catch() returns normally:
➡️ Promise becomes fulfilled
➡️ Next .then() can run.

   catch(() => {
   return "something";
   })

➡️ catch() throws:
➡️ Promise remains rejected
➡️ Next .then() is skipped
➡️ Next .catch() can handle it.

catch(() => {
  throw new Error("Failed");
})


If the catch handler returns a normal value, the error is considered handled and the returned value becomes the result of that Promise. Therefore, the next .then() can execute. If the catch handler throws an error or returns a rejected Promise, the chain remains rejected and the next .then() is skipped until another error handler catches it.


## Promise API's:
- (a):-  Promise.all() runs multiple promises together. It returns the results only when all promises succeed.
         If any one promise fails, Promise.all() rejects.

- (b):-  Promise.allSettled() Waits for all Promises to finish, regardless of whether they fulfilled or rejected.

`````
const results = await Promise.allSettled([
  getUser(),
  getOrders(),
  getProducts()
]);

console.log(results);

Output:- 
[
  { status: "fulfilled", value: ... },
  { status: "rejected", reason: ... },
  { status: "fulfilled", value: ... }
]


`````
Promise.allSettled() is useful when need the result of every operation, even if some operations fail. Unlike Promise.all(), one rejection does not cause the entire Promise to reject.

- ( c ):- Promise.race() Returns the result of the first Promise to settle.

   "Settle" means either:

   fulfilled
   rejected
   Promise.race() settles as soon as the first Promise settles, whether that Promise fulfills or rejects.

- ( d ) :- Promise.any() Returns the result of the first Promise to fulfill.
   Promise.any() is useful when I have multiple alternative sources and only need the first successful result. Rejections are ignored until all Promises reject.

If all Promises reject, it rejects with an AggregateError.


| API                    | Resolves when          | Rejects when                                             |
| ---------------------- | ---------------------- | -------------------------------------------------------- |
| `Promise.all()`        | **All** fulfill        | **Any one** rejects                                      |
| `Promise.allSettled()` | **All settle**         | It doesn't reject because of individual Promise failures |
| `Promise.race()`       | **First one settles**  | First settled Promise rejects                            |
| `Promise.any()`        | **First one fulfills** | **All** reject                                           |


## Questions: 

**1. when promise.all() we need to use**
   Imagine we're building a user dashboard.

   When the user opens the dashboard, we need:

   User profile
   Recent orders
   Notifications

   These requests are independent. we need all three before returning the dashboard response so in that case we can use promise.all().


**2. when promise.allSettled() we need to use**
Imagine an admin dashboard that displays statistics from multiple services:
User service, Payment service, Analytics service, Notification service

Suppose the Analytics service is temporarily down.
WE still want to display the user, payment, and notification information instead of failing the entire dashboard.

**3. How would you implement a timeout for an external API request using Promises?**
Use Promise.race() between the API request and a timeout Promise. Whichever settles first determines the result. If the timeout settles first, I can reject the operation and return an appropriate error.

## 3. async/await

- Async/await is a cleaner syntax for working with Promises.
- It makes asynchronous code easier to read, maintain, debug, and handle errors using normal try/catch.
- Under the hood, async/await still uses Promises.
- An async function always returns a Promise even if I return a normal string value then it still wrap that in promise.

**Questions**
## What does await actually do?
await pauses the execution of the current async function until the Promise settles. It does not block the Node.js Event Loop.

While the asynchronous operation, such as a database query or API request, is in progress, Node.js can continue handling other requests and tasks. Once the Promise settles, the paused async function resumes execution.

## Does await block the Event Loop?
No. await pauses only the execution of the current async function. It does not block the Node.js Event Loop, so Node.js can continue processing other work.

## Can await be used outside an async function?
Yes we can, Traditionally, await could only be used inside an async function. However, modern JavaScript also supports top-level await in ES modules.
Top-level simply means directly at the main/root level of a file, not inside a function, loop, or block. without top-level this was not allowed
Because await was only allowed inside an async function:


## 4. Sequential vs Concurrent Operations

- Sequential means one operation starts after the previous operation finishes.
- Concurrent means multiple independent operations can be started without waiting for each other.\
- We use it when the operations depend on each other.

Concurrent execution means we start multiple independent asynchronous operations without waiting for each other. In Node.js, we can use Promise.all() for this. It can reduce the total waiting time because the operations can progress at the same time

**1. Sequential Operations**

Use sequential execution when the second operation depends on the result of the first operation.

const user = await getUser();
const orders = await getOrders(user.id);

getOrders() cannot start until we get the user's id.

**2. Concurrent Operations**

Use concurrent execution when operations are independent of each other.

const [users, products] = await Promise.all([
  getUsers(),
  getProducts()
]);

Both operations can start without waiting for each other.
For example, if:

getUsers()     → 2 seconds
getProducts()  → 3 seconds

Sequential execution could take approximately: 2 + 3 = 5 seconds
Concurrent execution can take approximately:  max(2, 3) = 3 seconds
So concurrency can reduce the total waiting time.

## 5. Error Propagation
Error propagation means an error can move from the function where it occurred to the calling function until it is handled. With async/await, when an awaited Promise is rejected, await throws the rejection reason, which can be handled using try/catch.

## 6. Cancellation
Stopping or requesting the stopping of an asynchronous operation that is no longer needed.user cancels a request, request times out, client disconnects, application is shutting down
Without cancellation, the server might continue doing unnecessary work.
Example:- Suppose the external API takes 30 seconds.
But your client only waits 5 seconds. If the client disconnects. The backend may still have an unnecessary request running then calcellation allow us to say:"The result isn't needed anymore.
Stop the operation if possible.".

Node.js provides AbortController and AbortSignal for APIs that support cancellation.

## 7. Concurrency vs Parallelism

Concurrency: Multiple tasks are making progress during the same period.
Parallelism: Multiple tasks are actually executing at the same time, usually using multiple CPU cores/threads.

**Q1. Why Concurrency Matters in Node.js**
While the database is processing the query, Node.js doesn't need to sit there doing nothing.

It can handle other events: start DB Query, Handle other HTTP Request, process another callback (file operations).

## 8. Concurrency Limits

Running thousands of operations at once is not always a good idea.we might allow only 10 at a time.
If there are 10,000 users, this could create a very large number of operations at once.
Possible problems: API rate limits, database connection pool exhaustion, high memory usage, too many open connections
increased load on external services

A concurrency limit controls how many asynchronous operations are allowed to be in progress at the same time.


## What is the difference between cancellation and timeout?
Cancellation → We stop an operation because we no longer need it.
Timeout → We stop an operation because it took too long.Stop waiting after 5 seconds