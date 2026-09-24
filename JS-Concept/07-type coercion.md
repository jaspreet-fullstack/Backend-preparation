Type coercion 
## 1. What is Type Coercion?

**Type coercion** is when JavaScript automatically or manually converts a value from one data type to another.

Example:

let result = "5" + 2;

console.log(result);
```

Output:

```text
"52"
```

JavaScript converts `2` into a string and performs string concatenation.

---

# 2. Two Types of Type Conversion

JavaScript has two main types:


### Implicit Conversion:-  
Javascript automatically convert the type 

Example:- 
console.log(5+"5")

output:- 55

javascript automatically convert the type of 5 to string and perform string concatenation.

console.log ("5"-3)

output:- 2



### Explicit Conversion

we can manually convert the type of a value to another type.

Example:- 
console.log(Number("5"))

output:- 5
