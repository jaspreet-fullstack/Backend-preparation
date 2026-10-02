# Loops in JavaScript

A loop is used to repeat the same code again and again.

Instead of writing the same line many times, we use a loop.

There are different types of loops in JavaScript. Let us understand each one in a simple way.


# 1. for loop

Use the for loop when you already know how many times you want to repeat something.

Example:

```js
for (let i = 0; i < 5; i++) {
    console.log(i);
}
```

Output:

```text
0
1
2
3
4
```

Meaning of this loop:

- i starts from 0
- the loop runs till i is less than 5
- after every run, i increases by 1

So this loop runs 5 times.


# 2. while loop

Use the while loop when you want to keep repeating something until a condition becomes false.

In while loop, the condition is checked first. If the condition is true, then the code runs.

Example:

```js
let i = 0;

while (i < 5) {
    console.log(i);
    i++;
}
```

Output:

```text
0
1
2
3
4
```

Important point:

If you forget to increase i, the loop will never stop.


# 3. do...while loop

The do...while loop is a little different.

First it runs the code one time.
Then it checks the condition.

So this loop always runs at least one time.

Example:

```js
let i = 10;

do {
    console.log(i);
} while (i < 5);
```

Output:

```text
10
```

Even though the condition is false, the code still ran once.


# 4. for...of loop

Use for...of when you want to get values from an array or a string.

Example with array:

```js
let arr = [10, 20, 30];

for (let val of arr) {
    console.log(val);
}
```

Output:

```text
10
20
30
```

Example with string:

```js
for (let char of "Hi") {
    console.log(char);
}
```

Output:

```text
H
i
```

Remember:

for...of gives values.


# 5. for...in loop

Use for...in when you want to get keys from an object.

Example:

```js
let user = {
    name: "Aman",
    age: 25
};

for (let key in user) {
    console.log(key, user[key]);
}
```

Output:

```text
name Aman
age 25
```

Remember:

for...in gives keys.

Do not use for...in on arrays. Use for...of for arrays.


# 6. break and continue

break and continue are used to control the loop.

## break

break stops the loop completely.

Example:

```js
for (let i = 0; i < 5; i++) {
    if (i === 3) break;
    console.log(i);
}
```

Output:

```text
0
1
2
```

When i becomes 3, the loop stops.

## continue

continue skips only the current step and moves to the next one.

Example:

```js
for (let i = 0; i < 5; i++) {
    if (i === 3) continue;
    console.log(i);
}
```

Output:

```text
0
1
2
4
```

When i becomes 3, that step is skipped. The loop continues.


# 7. Nested loops

Nested loop means one loop inside another loop.

Example:

```js
for (let i = 1; i <= 2; i++) {
    for (let j = 1; j <= 2; j++) {
        console.log(i, j);
    }
}
```

Output:

```text
1 1
1 2
2 1
2 2
```

Simple meaning:

For every value of the outer loop, the inner loop runs fully.


# 8. Array methods

These are easy methods to work with arrays.

## forEach

forEach is used to do something for each item.

```js
let arr = [1, 2, 3];

arr.forEach(v => console.log(v));
```

## map

map is used to create a new array by changing each item.

```js
let doubled = arr.map(v => v * 2);

// [2, 4, 6]
```

## filter

filter is used to keep only the items you want.

```js
let evens = arr.filter(v => v % 2 === 0);

// [2]
```


# Simple Summary

1. for - when you know how many times to repeat
2. while - when you want to repeat based on a condition
3. do...while - when the code must run at least once
4. for...of - when you want values from array or string
5. for...in - when you want keys from an object
6. break - stop the loop
7. continue - skip one step
8. forEach - do something for each item
9. map - make a new array
10. filter - keep only matching items


# Final Tip

- Use for when you know the count
- Use while when the condition decides the loop
- Use for...of for arrays
- Use for...in for objects
