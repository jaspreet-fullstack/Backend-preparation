# Conditions in JavaScript

Conditions are used to execute different code based on a condition.

JavaScript provides different ways to handle conditions:

* if
* if...else
* else if
* Nested if
* Ternary operator
* switch

## if

`if` is used to execute code when a condition is true.

```js
if (age >= 18) {
    console.log("Adult");
}
```

## if...else

`if...else` is used when there are two possible outcomes.

```js
if (age >= 18) {
    console.log("Adult");
} else {
    console.log("Minor");
}
```

## else if

`else if` is used when there are multiple conditions.

```js
if (age >= 18) {
    console.log("Adult");
} else if (age >= 13) {
    console.log("Teenager");
} else {
    console.log("Child");
}
```

## Nested if

A nested `if` means an `if` statement inside another `if` statement.

```js
if (isLoggedIn) {
    if (isAdmin) {
        console.log("Admin");
    }
}
```

## Ternary Operator

The ternary operator is a short way to write a simple `if...else`.

Syntax:

```js
condition ? valueIfTrue : valueIfFalse;
```

Example:

```js
let age = 20;

let result = age >= 18 ? "Adult" : "Minor";

console.log(result);
```

Use ternary for simple conditions. Use `if...else` for complex conditions.

## switch

`switch` is used to compare one value with multiple possible values.

```js
let day = "Monday";

switch (day) {
    case "Monday":
        console.log("Start of week");
        break;

    case "Friday":
        console.log("Weekend is near");
        break;

    default:
        console.log("Another day");
}
```

`break` stops the switch after a matching case.

`default` runs when none of the cases match.

## Falsy Values

Falsy values are values that are treated as `false` in a condition.

```text
false
0
-0
0n
""
null
undefined
NaN
```

Example:

```js
if ("") {
    console.log("True");
} else {
    console.log("False");
}

// False
```

All other values are truthy.

Example:

```js
if ("Hello") {
    console.log("True");
}

// True
```

Empty arrays and objects are also truthy.

```js
Boolean([]); // true
Boolean({}); // true
```

## Quick Summary

```text
if          → checks a condition

if...else   → two possible outcomes

else if     → multiple conditions

nested if   → if inside another if

ternary     → short form of if...else

switch      → compares one value with multiple cases

falsy       → values treated as false
```
