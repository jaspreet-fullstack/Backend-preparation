# JavaScript Scope

**Scope** means the area of the code where a variable is accessible.

JavaScript mainly has three types of scope:

1. **Global Scope**
2. **Function Scope**
3. **Block Scope**

---

## 1. Global Scope

A variable declared in the global scope can be accessed from different parts of the code, subject to the rules of the environment.

Example:

```js
let a = 10;

function test() {
    console.log(a); // 10
}

test();

console.log(a); // 10
```

Here, `a` is declared outside the function, so it is available inside the function as well.

---

## 2. Function Scope

A function-scoped variable is accessible only inside the function where it is declared.

`var` is function-scoped.

Example:

```js
function test() {
    var a = 10;

    console.log(a); // 10
}

test();

console.log(a); // ReferenceError
```

Here, `a` is available inside `test()` but cannot be accessed outside the function.

---

## 3. Block Scope

A block is code written inside `{ }`, such as an `if`, `for`, or `while` block.

Variables declared with `let` and `const` are block-scoped.

Example:

```js
{
    let a = 10;
    const b = 20;

    console.log(a); // 10
    console.log(b); // 20
}

console.log(a); // ReferenceError
console.log(b); // ReferenceError
```

Here, `a` and `b` can only be accessed inside the block where they are declared.

---

## Function Scope vs Block Scope

### Function Scope

```js
function test() {
    var a = 10;

    console.log(a); // 10
}

test();

console.log(a); // ReferenceError
```

`a` is accessible only inside the function.

### Block Scope

```js
if (true) {
    let a = 10;

    console.log(a); // 10
}

console.log(a); // ReferenceError
```

`a` is accessible only inside the `if` block.

---

## Important Rule

```text
Global Scope  → Accessible from the global scope

Function Scope → Accessible within the function

Block Scope   → Accessible within the block
```

### Variable Scope Summary

| Keyword | Scope          |
| ------- | -------------- |
| `var`   | Function Scope |
| `let`   | Block Scope    |
| `const` | Block Scope    |
