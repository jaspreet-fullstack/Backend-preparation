# Data Types in JavaScript

A **data type** defines what type of value can be stored in a variable.

JavaScript has two main types of data types:

1. Primitive Data Types
2. Non-Primitive Data Types

## Primitive Data Types

JavaScript has 7 primitive data types:

* String
* Number
* Boolean
* Undefined
* Null
* BigInt
* Symbol

## Non-Primitive Data Types

Common non-primitive data types are:
It store collections of data
* Object
* Array
* Function

### Object

An object is a collection of **key-value pairs**.

### Array

An array is an **ordered collection of values**.

### Function

A function is a **reusable block of code**.

---

## Primitive vs Non-Primitive

**Primitive:** Represents a single value and is immutable.

**Non-Primitive:** Can contain multiple values or behavior and is generally mutable.

### Immutable

Immutable means the value **cannot be changed after it is created**.

Primitive values are immutable.

### Mutable

Mutable means the value **can be changed after it is created**.

Objects and arrays are mutable.

---

## `typeof null`

```js
typeof null; // "object"
```

`null` is a primitive value, but `typeof null` returns `"object"` because of a historical behavior in JavaScript.

---

## `undefined` vs `null`

**undefined:** A variable is declared but no value is assigned.

```js
let a;
console.log(a); // undefined
```

**null:** Represents an intentional absence of a value.

```js
let a = null;
```

Simple difference:

```text
undefined → value is not assigned
null      → intentional absence of value
```

---

## NaN

`NaN` means **Not-a-Number**.

It represents an invalid numerical result.

```js
"hello" / 2; // NaN
```

`NaN` is **not a separate data type**.

```js
typeof NaN; // "number"
```

---

# Interview Questions

### Q1. What are the two main types of data types in JavaScript?

Primitive and Non-Primitive.

### Q2. How many primitive data types are there?

There are 7 primitive data types:

String, Number, Boolean, Undefined, Null, BigInt, and Symbol.

### Q3. What is the difference between primitive and non-primitive data types?

Primitive values are single values and are immutable.

Non-primitive values can contain multiple values and are generally mutable.

### Q4. What is the difference between `undefined` and `null`?

`undefined` means a value has not been assigned.

`null` means the absence of a value is intentionally assigned.

### Q5. Why does `typeof null` return `"object"`?

Because of a historical behavior in JavaScript.

### Q6. What is the type of `NaN`?

`number`.

```js
typeof NaN; // "number"
```

### Q7. Is NaN a data type?

No. `NaN` is a special value of the `number` type.

### Q8. What is mutable and immutable?

**Immutable:** Cannot be changed after creation.

**Mutable:** Can be changed after creation.
