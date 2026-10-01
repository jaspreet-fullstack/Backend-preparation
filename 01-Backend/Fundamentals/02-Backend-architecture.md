# Backend Architecture Notes

## 1. Client-Server Architecture

- Client sends a request, server processes it and sends a response.
- The server may run business logic, talk to a database or other services, then respond.
- The server does not have to access a database on every request sometime it respond from cached.
- Example: `GET /profile` -> server authenticates -> fetches user from DB -> returns response.

Flow:

```
Client -> HTTP Request -> Server -> Business Logic -> DB / Other Services
Client <- HTTP Response <- Server <-
```

Interview line:
- "Client-server is a model where the client sends a request and the server processes it, possibly using a database or other services, and returns a response."

---

## 2. Stateless vs Stateful

### Stateless

* The server does **not store client/session state locally** on a specific server instance between requests.
* **Any server instance can handle any request**, which makes horizontal scaling easier.
* The client typically sends the required authentication information, such as a **token**, with each request, and the server validates it.
* A **session ID cookie can still be used** if the actual session data is stored in a shared store such as **Redis**. 
In that case, the application servers remain stateless because no server instance depends on its own local session storage.


### Stateful
- Stateful means the application depends on state maintained from previous requests.
- The server keeps client information between requests.
- Example: the session is stored in Server A's memory. If the next request goes to Server B, B does not know the session.

### Why stateless scales easily
- Requests do not depend on one particular server.
- Add more instances behind a load balancer.
- Any instance can process any request.

### Solving the stateful scaling problem
- Sticky sessions: the load balancer keeps sending a user to the same server. It works but reduces scaling flexibility.
- Shared session store: keep sessions in Redis or a DB so every server can read them.

---

## 3. Monolith

A monolith is an architecture where the application's major functionality is packaged and deployed as a single application. It is simple to develop and operate initially, but as the system grows, the codebase can become tightly coupled and scaling or deploying individual parts independently becomes more difficult.

- A single deployed application and single deployable unit.
- The application's features and business logic are part of the same backend application.
- Typically, the entire application is built and deployed together.
- Example: Users, Orders, Payments, Products, and Subscriptions all exist within one backend application.

Pros:
- Simple to develop, test, and deploy
- Easy transactions (one DB)
- Low infrastructure and operationa.
- Easier to implement transactions across related functionality, especially when using a shared database.
- Local function/module calls are simpler than network calls between services.

Cons:
- Can become tightly coupled ("big ball of mud")
- Large codebase can become difficult to maintain.
- Scaling is all-or-nothing
- A small change may require redeploying the entire application.
- Multiple teams working in the same codebase can create coordination challenges.
- Large codebase slows down builds and teams

---

## 4. Modular Monolith

- Still one application and one deployment.
- Code is organized into well-defined modules with clear boundaries.
- Example modules: Users, Orders, Payments, Subscriptions, Notifications.

Rules:
- Each module should own and control its business logic and data access.
- Modules talk through public interfaces, not internals.
- Provides better organization and separation without introducing distributed-system complexity.
- Good stepping stone toward microservices.

Formula:
- Monolith = one application
- Modular monolith = one application + strong internal boundaries

---

## 5. Microservices

- An architecture where an application is divided into independently deployable services, usually organized around business/domain boundaries.
- Each service is responsible for a specific business capability.
- Each service should ideally own its data and control access to it.
- A separate database per service is a common approach, but it is not the only possible implementation.
- Separate repositories are common, but they are not required by the definition of microservices.

Each service can:
- Deploy independently.
- Scale independently.
- Be developed and maintained by a different team.
- Use different technologies when there is a valid reason.
- Own and manage its business data independently.

Example:

```
API Gateway -> User Service    -> User DB
            -> Order Service   -> Order DB
            -> Payment Service -> Payment DB
```

### When to choose microservices
I wouldn't choose microservices just because an application has many features. I would first identify clear business boundaries and then consider microservices when we have a real need for independent deployment, scaling, team ownership, or technology choices. For example, if the Payment Service receives significantly more traffic than the Notification Service, microservices allow us to scale those services independently.

- With microservices, each service can be scaled independently based on its traffic and resource requirements.
- Not just because there are many features (almost every app has many).
- Choose when there are clear domain boundaries and a real need for independent deployment, scaling, team ownership, or technology choices.
- Example: Payments has high traffic (10 instances), Notifications has low traffic (2 instances). Scale each separately.

### Problems introduced
- Network communication: calls can fail or be slow
- Distributed failures: one service down can affect others
- Distributed transactions: no simple ACID across databases (use sagas or eventual consistency)
- Observability: need centralized logging, metrics, tracing
- Infrastructure cost: more containers, DBs, pipelines
- Operational complexity: retries, timeouts, circuit breakers, service discovery, inter-service auth, versioning

Interview line:
- "Microservices provide independent deployment and scaling, but introduce distributed-system complexity like network failures, distributed transactions, observability needs, infrastructure cost, and operational overhead."

### Comparison

"The main difference is where the boundaries exist. In a monolith, most functionality is deployed as one unit. In a modular monolith, we maintain strong boundaries inside that single application. In microservices, those boundaries become independently deployable services, which provides independent scaling and deployment but introduces distributed-system complexity

---

## 6. Layered Architecture (Controller - Service - Repository)

Layered architecture divides an application into separate layers based on responsibility. In a typical backend, the controller handles HTTP concerns, the service contains business logic, and the repository handles data access. This separation improves maintainability, testability, and reduces coupling.
```
Client -> Controller -> Service -> Repository -> Database
```

### Controller
- Handles HTTP concerns: route, method, params, query, body, auth integration, status codes.
- Reads query parameters
- Reads request body
- Converts the service result into an HTTP response.
- No business logic.

### Service
- Business logic and use cases.
- Coordinates repositories and other services.
- Calls external services when required.
- Returns a result or business outcome, not an HTTP response.

### Repository
- Data access only (DB queries, Create,Read query ORM calls).
- Its responsibility is to communicate with the database or persistence layer.

Example:

async findById(id: string) {
  return this.prisma.product.findUnique({
    where: { id }
  });
}

---

## 7. Dependency Injection (DI)

-  Dependency Injection is a design technique where a class receives the dependencies it needs from outside instead of creating them itself. It reduces coupling and makes the code easier to test, maintain, and change.

Bad (tight coupling):

```typescript
class UserService {
  private repository = new UserRepository();
}
```

Good (constructor injection):

```typescript
class UserService {
  constructor(private repository: UserRepository) {}
}
```

NestJS example:

```typescript
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
}
```

Benefits:
- Loose coupling
- Easy testing (inject a mock repository, no real DB)
- Easy replacement of implementations
- Better maintainability

Related terms:
- Inversion of Control (IoC): the principle
- DI: the technique
- DI container: the framework that wires objects (Nest, Spring, .NET)
- Composition root: the one place where everything is wired

---

## 8. SOLID Principles
SOLID is a set of five object-oriented design principles that help us write code that is:

Maintainable
Testable
Flexible
Reusable
Less tightly coupled
S → Single Responsibility Principle
O → Open/Closed Principle
L → Liskov Substitution Principle
I → Interface Segregation Principle
D → Dependency Inversion Principle

### S - Single Responsibility
- A class or module has one primary responsibility and one main reason to change.
- Example: UserService, PaymentService, OrderService, EmailService instead of one GodService.

### O - Open/Closed
- Open for extension, closed for modification.
- We should be able to add new behavior without repeatedly modifying stable existing code.
- Example: a PaymentProvider interface with Stripe and PayPal implementations. Adding a new provider does not change existing logic.

### L - Liskov Substitution
- A subtype/child must be usable wherever the base type/parent is expected, without breaking expected behavior.
- Example: if Bird has `fly()`, then Penguin extending Bird breaks the contract.
- Another violation: a subclass throwing NotImplemented for an inherited method.

### I - Interface Segregation
- Do not force clients to depend on methods they do not use.
- Prefer small, focused interfaces.
- Example: split Worker into Workable, Eatable, Sleepable instead of one fat interface.

### D - Dependency Inversion
- High-level business logic shouldn't depend directly on low-level implementation details.
- OrderService depends on a PaymentProvider abstraction, not on Stripe directly.
- DI is the mechanism, DIP is the principle.

---

## 9. DDD Basics
DDD = Domain-Driven Design

DDD is an approach to designing software around the business domain, business concepts, and business rules.
Instead of starting with: "What database tables and APIs do we need?".
we first understand:"What business problem are we solving, and what are the important business rules?"

## Why Use DDD?
-- Organize complex business logic
-- Understand the business domain clearly
-- Use consistent business terminology
-- Create clear boundaries between different parts of the system
-- Reduce tightly coupled business logic
-- Make large applications easier to maintain

## Q: What is Domain-Driven Design?

Domain-Driven Design is an approach to designing software around the business domain, its concepts, and its rules. It helps us manage complex business logic by identifying entities, value objects, aggregates, and bounded contexts, while using a common language between developers and business stakeholders.

## Q: When would you use DDD?

I would consider DDD when the application has complex business rules and multiple business domains where clear boundaries and consistent business terminology are important.

## DDD Pattern/concept
--
| Concept                 | Simple meaning                                                      |
| ----------------------- | ------------------------------------------------------------------- |
| **Domain**              | The business problem/area the software solves                       |
| **Entity**              | Object where identity matters                                       |
| **Value Object**        | Object where value matters, not identity                            |
| **Aggregate**           | Group of related domain objects treated as one consistency boundary |
| **Aggregate Root**      | Main entry point that controls the aggregate                        |
| **Bounded Context**     | Clear boundary around a particular business model                   |
| **Ubiquitous Language** | Shared terminology between developers and business experts          |


---

## 10. Common Terminology Mistakes to Avoid

| Wrong | Correct |
|---|---|
| Stateful = same connection | Stateful = app depends on state from previous requests |
| Stateless = always bearer token | Stateless is not only JWT |
| Monolith = one repo | Monolith = one deployable unit |
| Microservices = separate repos | Microservices = independently deployable, domain-based services |
| Service handles the HTTP response | Service returns a result, controller builds the response |
| Liskov = child should not depend on parent | Liskov = child must honor the parent's contract |
| I = Integration | I = Interface Segregation |