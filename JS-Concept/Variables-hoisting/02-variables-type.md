# Variable Declaration — `var`, `let`, `const`

JavaScript provides three keywords to declare variables:

* `var`
* `let`
* `const`

The main differences between them are:

1. **Scope**
2. **Hoisting**
3. **Reassignment**
4. **Redeclaration**

---

## 1. `var`

`var` is **function-scoped**.

It can be accessed throughout the function in which it is declared.

`var` is hoisted and initialized with `undefined`.

It can be:

* ✅ Reassigned
* ✅ Redeclared

### Reassignment

We can change the value of a variable declared using `var`.

```js
var a = 10;

a = 20;

console.log(a); // 20
```

### Redeclaration

We can declare the same variable again using `var`.

```js
var a = 10;

var a = 20;

console.log(a); // 20
```

### Hoisting

```js
console.log(a); // undefined

var a = 10;
```

The declaration is hoisted, but the assignment happens later.

Conceptually:

```js
var a;

console.log(a); // undefined

a = 10;
```

---

## 2. `let`

`let` is **block-scoped**.

A block is anything inside `{ }`, such as an `if`, `for`, or `while` block.

`let` is hoisted, but it is not initialized during hoisting.

It remains in the **Temporal Dead Zone (TDZ)** until execution reaches its declaration.

It can be:

* ✅ Reassigned
* ❌ Redeclared in the same scope

### Reassignment

```js
let a = 10;

a = 20;

console.log(a); // 20
```

### Redeclaration

Redeclaring a `let` variable in the same scope causes an error.

```js
let a = 10;

let a = 20;

// SyntaxError: Identifier 'a' has already been declared
```

### Block Scope

```js
{
    let a = 10;

    console.log(a); // 10
}

console.log(a); // ReferenceError
```

`a` is available only inside the block.

### Hoisting and TDZ

```js
console.log(a); // ReferenceError

let a = 10;
```

The variable is hoisted, but it cannot be accessed before its declaration because it is in the **Temporal Dead Zone (TDZ)**.

---

## 3. `const`

`const` is also **block-scoped**.

Like `let`, `const` is hoisted but remains in the **Temporal Dead Zone (TDZ)** until its declaration is executed.

It can be:

* ❌ Reassigned
* ❌ Redeclared in the same scope

### Reassignment

A `const` variable cannot be reassigned.

```js
const a = 10;

a = 20;

// TypeError: Assignment to constant variable.
```

### Redeclaration

A `const` variable cannot be redeclared in the same scope.

```js
const a = 10;

const a = 20;

// SyntaxError: Identifier 'a' has already been declared
```

### Block Scope

```js
{
    const a = 10;

    console.log(a); // 10
}

console.log(a); // ReferenceError
```

### Hoisting and TDZ

```js
console.log(a); // ReferenceError

const a = 10;
```

---

# Quick Comparison

| Feature                     | `var`       | `let`    | `const`  |
| --------------------------- | ----------- | -------- | -------- |
| Scope                       | Function    | Block    | Block    |
| Hoisted                     | Yes         | Yes      | Yes      |
| Initialized during hoisting | `undefined` | No — TDZ | No — TDZ |
| Reassignment                | ✅ Yes       | ✅ Yes    | ❌ No     |
| Redeclaration               | ✅ Yes       | ❌ No     | ❌ No     |
| TDZ                         | ❌ No        | ✅ Yes    | ✅ Yes    |

---

# Easy Rule to Remember

```text
var   → Function scoped + Reassign + Redeclare

let   → Block scoped + Reassign + No Redeclare

const → Block scoped + No Reassign + No Redeclare
```

---

# Recommended Usage

In modern JavaScript:

```js
const → use by default
let   → use when the value needs to change
var   → mostly encountered in older JavaScript code
```

Example:

```js
const name = "Jaspreet";

let age = 25;

age = 26;
```
