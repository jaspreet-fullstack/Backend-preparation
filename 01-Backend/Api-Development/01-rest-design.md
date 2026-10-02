# REST Design & Resource-Oriented URLs

## 1. What is REST?

REST stands for **Representational State Transfer**.

REST is an architectural style used to design APIs around **resources**.

A resource can be:

* User
* Product
* Order
* Game
* Ticket

REST APIs use standard HTTP methods to perform operations on these resources.

Example:

```http
GET    /users
POST   /users
GET    /users/123
PATCH  /users/123
DELETE /users/123
```

---

## 2. What is a Resource in REST?

A resource is an entity or data that an API exposes to clients.

Examples:

```text
/users
/products
/orders
/tickets
```

A specific resource can be identified using an ID:

```http
/users/123
/products/456
/orders/789
```

---

## 3. What is Resource-Oriented URL Design?

Resource-oriented URL design means that the URL represents a **resource**, not an action.

### Bad

```http
GET /getUsers
POST /createUser
POST /deleteUser
POST /updateUser
```

### Good

```http
GET    /users
POST   /users
PATCH  /users/123
DELETE /users/123
```

The URL identifies the resource, while the HTTP method describes the operation.

---

## 4. Why should REST URLs use nouns instead of verbs?

URLs should generally represent resources using nouns.

Example:

```http
GET /users
```

Here:

* `/users` = resource
* `GET` = operation

Instead of:

```http
GET /getUsers
```

The operation `get` is already represented by the HTTP method.

### Interview Answer

> REST APIs generally use nouns in URLs because the URL identifies the resource, while the HTTP method defines the operation performed on that resource.

---

## 5. Should URLs use singular or plural nouns?

A common REST convention is to use **plural nouns** for collections.

Example:

```http
/users
/products
/orders
```

For an individual resource:

```http
/users/123
/products/456
/orders/789
```

This keeps the API consistent and predictable.

---

##  What is the difference between path parameters and query parameters?

### Path Parameter

Used to identify a specific resource.

```http
GET /users/123
```

Here:

```text
123
```

is a path parameter.

### Query Parameter

Used for optional operations such as:

* Filtering
* Searching
* Sorting
* Pagination

Example:

```http
GET /users?role=admin&page=2
```

---

##  What makes a REST API predictable?

A predictable REST API usually has:

* Consistent resource naming
* Consistent URL structure
* Standard HTTP methods
* Meaningful HTTP status codes
* Consistent request/response formats
* Consistent error responses
* Clear pagination/filtering conventions

Example:

```http
GET /users
GET /users/123

GET /orders
GET /orders/123
```

The structure is easy for clients to understand.




```text
URL        → What resource?
HTTP Method → What operation?
Query Params → How to filter/sort/paginate?
```

## Ques: What do you understand by HTTP semantics?
HTTP semantics define what HTTP operations mean and how they are expected to behave.

HTTP semantics define the meaning and expected behavior of HTTP requests and responses. They specify how HTTP methods such as GET, POST, PUT, PATCH, DELETE, and QUERY should behave, including properties like safety and idempotency. They also cover how status codes, headers, caching, and other HTTP mechanisms should be interpreted. Understanding HTTP semantics helps us design APIs that behave predictably for clients, retries, caches, and other infrastructure.

## Ques: What is an idempotent HTTP method?

An idempotent method is one where making the same request multiple times has the same intended effect on server state as making it once.

## Ques: Why is DELETE idempotent?

Because after the resource has been deleted, repeating the same DELETE request does not produce another intended state change. The response may differ, but the resulting server state remains consistent with the requested deletion.

## Ques: How do you decide which HTTP status code to return?

I choose the status code based on the semantics of the operation and the reason for failure. For successful operations I commonly use 200, 201, or 204. For client-side problems I use appropriate 4xx codes such as 400, 401, 403, 404, 409, 422, and 429. For unexpected server or infrastructure failures I use 5xx codes such as 500, 502, 503, or 504. The goal is to make the API behavior predictable for clients and infrastructure.

## Ques: Why should APIs have a consistent error response format?

A consistent error format makes APIs easier for frontend clients, other services, monitoring systems, and developers to consume. Clients can depend on stable fields such as an error code, message, details, and request ID instead of implementing different error-handling logic for every endpoint.