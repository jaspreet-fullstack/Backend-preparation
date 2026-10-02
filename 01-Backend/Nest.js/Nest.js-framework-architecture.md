## 1. Why do we need Express.js or NestJS
Node.js provides the runtime environment to run JavaScript on the server.

Express.js and NestJS provide frameworks and structure that make it easier to build backend applications and APIs on top of Node.js.

## 2. What are Express.js and NestJS
Express.js and NestJS are both backend frameworks used with Node.js to build APIs and web applications.

Express.js is lightweight and flexible. It provides tools such as routing and middleware, but it does not force developers to follow a specific application structure. Developers can decide how to organize their controllers, services, routes, and other components.

NestJS provides a more structured and predefined architecture with modules, controllers, providers, dependency injection, guards, pipes, and interceptors.

Simple difference

Express.js → More flexibility and freedom

NestJS → More structure and predefined architecture

## 3. Why do we need NestJS if Node.js already exists?

**Node.js is a runtime environment that allows us to run JavaScript on the server, and we can build a backend directly using Node.js.**

However, as the application becomes larger, managing the application structure, dependency management, validation, authentication, and business logic can become difficult.

**NestJS is a backend framework built on top of Node.js that provides a predefined and structured architecture.** It gives us features like modules, controllers, providers, dependency injection, guards, pipes, and interceptors.

This helps us build large backend applications that are easier to organize, maintain, test, and scale.

So, **Node.js gives us the runtime, while NestJS gives us a structured way to build and manage a backend application.**

## 4. What is NestJS Architecture? / What does NestJS give us?


            NestJS Application
                           │
                    ┌──────┴──────┐
                    │   Modules    │
                    └──────┬──────┘
                           │
             ┌─────────────┼─────────────────────────┐
             │             │                         │
          Users          Orders                 Payments
          Module         Module                  Module
             │             │                       │
        ┌────┴────┐   ┌────┴────┐             ┌────┴────┐
        │         │   │         │             │         │
   Controller  Service Controller Service  Controller   Service
                   │
                   ▼
               Database




Flow:

```

Client
  ↓
Request
  ↓
Middleware
  ↓
Guard
  ↓
Pipe
  ↓
Controller
  ↓
Service
  ↓
Interceptor
  ↓
Response
  ↓
Client
```

**1. Modules:**

A module is a way to organize related functionality into a separate part of the application.
This makes large applications easier to maintain.

``` Example: 
@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}


src/
│
├── users/
│   ├── users.controller.ts
│   ├── users.service.ts
│   ├── users.module.ts
│   └── users.dto.ts
│
├── orders/
│   ├── orders.controller.ts
│   ├── orders.service.ts
│   └── orders.module.ts
│
└── app.module.ts


```

**2. Controllers:**
The controller handles incoming HTTP requests.


```
@Controller("users")
export class UsersController {

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }
}

```

**3. Providers:**

A provider is a class managed by NestJS that can be injected into other classes. Services are the most common type of provider, and they usually contain the business logic of the application, such as processing data or coordinating database operation. For example, UsersService can be registered as a provider and injected into UsersController.

**4. Dependency Injection:**

Dependency Injection is a design pattern where a class receives the dependencies it needs from outside instead of creating them itself. In NestJS, the framework's dependency injection system creates and provides these dependencies, usually through the constructor

**What happens without Dependency Injection? Why we need it ?**

For Example we have userController, 
So UsersService is a dependency of UsersController.

```
Without Dependency Injection 

The controller could create the service itself:

class UsersController {
  usersService = new UsersService();

  getUsers() {
    return this.usersService.getUsers();
  }
}

with Dependency Injection?

class UsersController {
  constructor(private usersService: UsersService) {}

  getUsers() {
    return this.usersService.getUsers();
  }
}

I need UsersService. Someone else, please give it to me."

NestJS does this for us.

```

**In Simple:**

Dependency Injection is a way of giving a class the things it needs instead of making the class create those things itself.

**5. Middleware:**

-- Process request before it reaches controller.

Middleware is used to process an incoming request before it reaches the controller. It is commonly used for things like logging, preprocessing, adding information to the request, etc. For authentication/authorization specifically, NestJS Guards are generally used.

```
Example:

function logger(req, res, next) {
  console.log(req.method, req.url);
  next();
}

```

**6. Guards:**

A Guard is used to determine whether a request is allowed to reach the controller. It is commonly used for authentication and authorization, such as checking whether a user is logged in or has the required role or permission.


It Checks:

Authentication, 
Authorization, 
Role checking, 
Permission checking

**7. Pipe:**

A Pipe is used to validate and transform incoming data before it reaches the controller method. For example, we can use pipes to validate DTOs or convert a string route parameter into a number.

```
For Example we get: 

GET /users/123

You expect 123 to be a number.

A pipe can convert/validate the value:

"123" → 123

Pipe can reject it because it isn't a valid number.

@Get(':id')
getUser(@Param('id', ParseIntPipe) id: number) {
  return this.usersService.getUser(id);
}

```

**8. Interceptor:**

An Interceptor is used to run logic before and after a controller method executes.So an interceptor can do something before the controller and also after the controller has produced a result.It is commonly used for logging, measuring execution time, transforming responses, and caching.

**9. Exception Filters:**

Exception filters handle errors thrown by your application and convert them into a proper HTTP response.

For example, we might want every error to have the same format:
```

{
  "statusCode": 404,
  "message": "User not found"
}

```

**How do we create an Exception Filter?**

Nest.js provides: 
@Catch()

```
@Catch(NotFoundException)
export class NotFoundExceptionFilter
  implements ExceptionFilter {

  catch(exception: NotFoundException, host: ArgumentsHost) {

    const response = host.switchToHttp().getResponse();

    response.status(404).json({
      statusCode: 404,
      message: "Resource not found",
    });
  }
}
```

**10. DTO**

DTO (Data Transfer Object) defines the structure of data that is transferred between the client and backend or between application layers.

**11. Validation:**

Validation checks whether incoming data satisfies the required rules before the application processes it.
If we want to validate Email must be valid email, age must be a number.
NestJS commonly uses ValidationPipe together with DTOs and validation libraries.

**12. Lifecycle Hooks**

A lifecycle hook is a method provided by NestJS that lets your application execute code at a particular stage of its lifecycle.

For Example:
onApplicationShutdown()

This method can run when the application is shutting down.

So:

Signal = notification that shutdown should happen.

Lifecycle hook = place where your application can execute code during that lifecycle event.

**Final Answer:**
Lifecycle hooks in NestJS are methods that allow us to execute custom logic at specific stages of the application or module lifecycle. For example, OnModuleInit runs when a module is initialized, 

OnApplicationBootstrap runs when the application has completed initialization, and 

OnApplicationShutdown runs during application shutdown. They are useful for initialization and cleanup tasks such as establishing or closing database connections.

## 5. Graceful Shutdown?

Graceful shutdown is the process of safely stopping an application without abruptly terminating ongoing work. When the application receives a shutdown signal, it stops accepting new requests, allows ongoing requests or jobs to complete, closes resources such as database connections and Redis connections, and then terminates the process. This is especially important during deployments and when running applications in containers or orchestration systems because it helps prevent dropped requests and incomplete operations.

`Stop new work → finish existing work → clean up resources → shut down.`
