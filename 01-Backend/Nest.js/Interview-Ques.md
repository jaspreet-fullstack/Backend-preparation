## Ques 1: What is NestJS and why do we use it when Node.js already exists?
Node.js is a JavaScript runtime that allows us to run JavaScript on the server. We can build APIs directly with Node.js, but as an application grows, managing the architecture and dependencies ourselves can become difficult.

NestJS is a backend framework built on top of Node.js that provides a structured and opinionated architecture using modules, controllers, providers, dependency injection, guards, pipes, and interceptors.

NestJS usually uses Express or Fastify underneath for HTTP handling. So NestJS doesn't replace Node.js; it uses Node.js as its runtime and provides a structured way to build scalable backend applications.

## Ques2. Explain the architecture of NestJS.

NestJS follows a **modular architecture**. A module groups related functionality. Controllers are responsible for handling incoming HTTP requests, while providers or services contain business logic. NestJS uses dependency injection to provide services to controllers and other providers.

It also provides guards for authorization, pipes for validation and transformation, interceptors for request and response processing, middleware for general request preprocessing, and exception filters for centralized error handling

## Ques3. What is the difference between Middleware, Guards, Pipes and Interceptors?

Middleware is generally used for request preprocessing, such as logging or modifying the request. Guards determine whether a request is allowed to proceed, so they're commonly used for authentication and authorization. Pipes are used for validating and transforming incoming data. Interceptors wrap the execution of a request and can be used for logging, response transformation, caching, or measuring execution time.

Remember:

```
Middleware  → Prepare request
Guard       → Allow / deny
Pipe        → Validate / transform
Interceptor → Wrap request/response
Controller  → Handle request
Service     → Business logic
```

## Ques 4: How does validation work in NestJS?

NestJS commonly uses ValidationPipe together with class-validator and class-transformer. We define validation rules in the DTO, and the validation pipe checks incoming request data before it reaches the controller. We can configure the pipe globally to automatically validate requests and reject invalid data

## Ques5: What are Exception Filters in NestJS?

Exception filters are used to handle exceptions and customize the error response returned to the client. They allow us to handle specific exceptions or all exceptions and provide a consistent error response format. They can also be used for centralized error logging.

## Ques 6: What are Interceptors and when would you use them?
Interceptors wrap the execution of a request handler. They can execute logic before and after the handler. I would use interceptors for cross-cutting concerns such as logging execution time, transforming responses, caching, or collecting metrics