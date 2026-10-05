
## 1. What is Typescript.
TypeScript is a superset of JavaScript that adds static typing and compile-time type checking. It helps us catch errors during development and makes large applications easier to maintain. TypeScript is eventually converted to JavaScript, which runs normally in Node.js or the browser.

How it works with JS:

```
TypeScript
   ↓
Adds types
   ↓
Compile-time checking
   ↓
JavaScript
   ↓
Node.js / Browser
   ↓
Runtime

```

## Ques: What is Static vs Dynamic Typing?

Static typing:- 
In a statically typed language, the type of a variable is checked before the program runs.So it catches the error during compile/type-check time. 
It checks type before execution.

Dynamic typing:
In a dynamically typed language, types are determined and checked while the program is running.JavaScript allows the variable to change its type.
It checks type at runtime.

## Ques: What is Compile Time and Runtime ?

**Compile time** = the stage before the program is executed.

                 For Example:- TypeScript can detect error before your application actually runs.

**Runtime**:- when the program is actually executing.
When Node.js actually executes these instructions, that's runtime.

At runtime, things such as these happen:

Functions execute,
Variables get values,
API requests happen,
Database queries happen,
Files are read,
Timers execute,
Event loop handles asynchronous work


**TypeScript checks types before runtime. After TypeScript is converted to JavaScript, the JavaScript executes normally through the JavaScript runtime, including the call stack and event loop in Node.js.**

## 2. TypeScript compiler options / type-checking rules.

* **`strictNullChecks`** — Checks `null` and `undefined` separately.
    Prevents us from accidentally using a value that might be null or undefined.

    **Simple:** If a value can be null, TypeScript forces us to handle that possibility.

* **`noImplicitAny`** — Prevents TypeScript from silently assigning `any` type when it cannot determine a type. Forces us to define the type explicitly.
 **Simple:** Don't allow TypeScript to automatically assume any.

* **`strictFunctionTypes`** — Performs stricter type checking when assigning or passing functions.

* **`strictPropertyInitialization`** — Ensures class properties are properly initialized before they are used.
* **`noImplicitThis`** — Prevents incorrect or unclear use of `this`.
Makes sure TypeScript knows what this refers to.

## Ques: What is strict: true?
strict is a master switch for TypeScript's strict type-checking rules.This enables a all group of strict checking options that we have and we generally do not need to write all of them individually

## Ques: Can I use only strictNullChecks: true?

yes, This enables only that particular rule.

## 3. Generics
Generics allow us to write reusable code where the type is decided when the code is used, while still maintaining type safety.

```
We use generic:
function getValue<T>(value: T): T {
  return value;
}
```
T is not a special keyword. It is just a name we give to the generic type parameter.

You can use other valid names:

```
function getValue<Type>(value: Type): Type {
  return value;
}
```

**Simple:** I don't know the type yet. When someone uses this function, I'll know the type

## 4. Utility Types

Utility types are built-in TypeScript types that transform existing types.
We have multople Utilities that are used to transform types.

| Utility Type    | Simple meaning                | Common backend use             |
| --------------- | ----------------------------- | ------------------------------ |
| `Partial<T>`    | Make everything optional      | PATCH/update                   |
| `Required<T>`   | Make everything required      | Complete objects               |
| `Readonly<T>`   | Prevent property reassignment | Config/immutable data          |
| `Pick<T, K>`    | Keep selected properties      | API response/DTO               |
| `Omit<T, K>`    | Remove selected properties    | Hide password/internal fields  |
| `Record<K,T>`   | Define key/value object       | Permissions/config maps        |
| `ReturnType<T>` | Get function return type      | Reuse function types           |
| `Parameters<T>` | Get function parameters       | Reuse function parameter types |



**Ques: Why do we need Utility?**

Now imagine you need a user object for updating a user.

When updating a user, the user might send only name and other keys are not required So you could create another type manually, But this creates duplication we can fix this with Utility Types.


```
Example:

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  age: number;
}

type UpdateUser = Partial<User>;

This automatically makes all properties optional.

{
  id?: number;
  name?: string;
  email?: string;
  age?: number;
}

```




                         User
                          │
          ┌───────────────┼────────────────┐
          │               │                │
          ▼               ▼                ▼
      Create User     Update User      API Response
          │               │                │
          ▼               ▼                ▼
       Omit id      Partial<User>   Omit password

Instead of creating three separate interfaces manually, we can use Utility Types.

## 5. Narrowing
Type narrowing is the process of making a broad type more specific based on runtime checks.

For example, if a variable has the type string | number, I can use typeof to determine which type I actually have.

```
function print(value: string | number) {
  if (typeof value === "string") {
    // TypeScript knows: value is string
    console.log(value.toUpperCase());
  } else {
    // TypeScript knows: value is number
    console.log(value.toFixed(2));
  }
}
```

## 6. DTO (Data Transfer Object)

A DTO is an object/type/class, It defines the structure of data transferred between different layers or between the client and server. In backend applications, DTOs are commonly used to define API request and response contracts.

```
For example, client sends payload:

{
  "name": "Jaspreet",
  "email": "test@example.com",
  "password": "123456"
}

we can define DTO: 

interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}

It Tells us: When creating a user, we expect name, email, and password.

Then controller can expect:
function createUser(data: CreateUserDto) {
  // ...
}
```

**Ques: Why do we need DTO?**

-- We use DTOs to define a clear data contract, improve type safety, avoid passing unnecessary fields between layers, and keep API models separate from database entities.
-- Without a DTO , The code doesn't clearly communicate what the API expects with DTO expected structure is clear.

```
Without DTO:- 

app.post("/users", (req, res) => {
  const user = req.body;

  // What fields are expected?
  // Is email required?
  // Is age a number?
});

WITH DTO:- 

interface CreateUserDto {
  name: string;
  email: string;
  age: number;
}

app.post("/users", (req, res) => {
  const data: CreateUserDto = req.body;
});

```

## 7. Compile-time type checking

-- TypeScript checks your code before the program runs.

-- This checking happens during development/building, not when an HTTP request arrives.

-- TypeScript reports an error during development or build time.

## 8. Runtime validation
 Runtime validation means checking actual data while the application is running. For example, when an API receives a request body, we can validate whether required fields exist and whether their values have the correct format before passing the data to the service layer.