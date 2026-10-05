# Arrays, Hashing, and Searching

## 1. Arrays & Number Theory

### Arrays / Traversal

**Use when:**

- You need a linear scan.
- You need min/max tracking.
- You need in-place modification.
- You need frequency or state tracking.

#### Example Problems

- Best Time to Buy and Sell Stock
- Move Zeroes
- Remove Duplicates from Sorted Array
- Majority Element
- Rotate Array
- Product of Array Except Self

---

### Sliding Window

**Use when:**

- The problem involves a contiguous subarray or substring.
- You need the longest/shortest window.
- You have a constraint that can be maintained while expanding/shrinking.

#### Types

- Fixed-size window
- Variable-size window
- Frequency-based window
- Minimum window
- Maximum window

#### Example Problems

- Maximum Average Subarray
- Longest Substring Without Repeating Characters
- Minimum Size Subarray Sum
- Longest Repeating Character Replacement
- Minimum Window Substring
- Permutation in String

---

### Two Pointers

**Use when:**

- Array/string is sorted.
- You need pairs or triples.
- You process from both ends.
- You need in-place partitioning.
- You need fast/slow movement.

#### Common Variations

- Opposite-direction pointers
- Same-direction pointers
- Fast/slow pointers
- Partition pointers

#### Example Problems

- Two Sum II
- 3Sum
- Container With Most Water
- Valid Palindrome
- Remove Duplicates from Sorted Array
- Move Zeroes

---

### Prefix Sum

**Use when:**

- You have repeated range-sum queries.
- You need cumulative information.
- A subarray condition can be expressed using two prefix states.

#### Example Problems

- Range Sum Query
- Subarray Sum Equals K
- Continuous Subarray Sum
- Range Sum Query 2D

---

### Kadane / Running State

**Use when:**

- You need the maximum/minimum sum of a contiguous subarray.
- You can maintain the best result ending at the current position.

#### Example Problems

- Maximum Subarray
- Maximum Circular Subarray
- Best Time to Buy and Sell Stock

---

### Matrix Traversal

**Use when:**

- The input is a 2D grid.
- You need row/column traversal.
- You need directional movement.
- You need boundary handling.

#### Common Patterns

- Row/column traversal
- Spiral traversal
- Direction vectors
- Boundary traversal
- In-place matrix transformation

#### Example Problems

- Spiral Matrix
- Rotate Image
- Set Matrix Zeroes
- Search a 2D Matrix
- Number of Islands

---

### Bit Manipulation

**Use when:**

- XOR cancellation is useful.
- You need bit masks.
- You need to set/clear/toggle bits.
- You need parity or powers of two.

#### Common Operations

- AND `&`
- OR `|`
- XOR `^`
- NOT `~`
- Left Shift `<<`
- Right Shift `>>`

#### Example Problems

- Single Number
- Counting Bits
- Power of Two
- Missing Number
- Number of 1 Bits

---

### Math / Number Theory

#### Important Topics

- GCD
- LCM
- Prime numbers
- Sieve of Eratosthenes
- Modular arithmetic
- Modular exponentiation
- Divisibility
- Factors

#### Example Problems

- GCD of Strings
- Happy Number
- Count Primes
- Pow(x, n)

---


## 2. Hashing

### Frequency Hashing

**Use when:**

- You need counts/frequencies.
- You need to detect duplicates.
- You need to compare character/element frequencies.

#### Example Problems

- Two Sum
- Valid Anagram
- Group Anagrams
- First Unique Character
- Top K Frequent Elements

---

### Hash Set

**Use when:**

- You only need existence/uniqueness.
- You need O(1) average lookup.
- You need to detect duplicates.

#### Example Problems

- Contains Duplicate
- Longest Consecutive Sequence
- Happy Number

---

### Prefix / State Hashing

**Use when:**

- A previous cumulative state can help solve the current state.
- You need to find subarrays satisfying a condition.

#### Example Problems

- Subarray Sum Equals K
- Continuous Subarray Sum
- Longest Subarray with Sum K
- Longest Subarray with Equal 0s and 1s

---


## 3. Two Pointers

**Use when:**

- Array/string is sorted.
- You need pairs/triples.
- You process from both ends.
- You need in-place partitioning.
- You need fast/slow movement.

#### Common Variations

- Opposite-direction pointers
- Same-direction pointers
- Fast/slow pointers
- Partition pointers

#### Example Problems

- Two Sum II
- 3Sum
- Container With Most Water
- Valid Palindrome
- Remove Duplicates from Sorted Array
- Move Zeroes

---


## 4. Sliding Window

**Use when:**

- The problem asks about a **contiguous** subarray/substring.
- You need the longest/shortest window.
- You have a constraint that can be maintained while expanding/shrinking.

#### Types

- Fixed-size window
- Variable-size window
- Frequency-based window
- Minimum window
- Maximum window

#### Example Problems

- Maximum Average Subarray
- Longest Substring Without Repeating Characters
- Minimum Size Subarray Sum
- Longest Repeating Character Replacement
- Minimum Window Substring
- Permutation in String

---


## 5. Prefix Sum

**Use when:**

- You have repeated range-sum queries.
- You need cumulative information.
- A subarray condition can be expressed using two prefix states.

#### Example Problems

- Range Sum Query
- Subarray Sum Equals K
- Continuous Subarray Sum
- Product of Array Except Self

---


## 6. Kadane's Algorithm

**Use when:**

- You need the maximum/minimum sum of a contiguous subarray.
- You can maintain the best result ending at the current position.

#### Example Problems

- Maximum Subarray
- Maximum Circular Subarray
- Best Time to Buy and Sell Stock

---


## 7. Binary Search

### Standard Binary Search

**Use when:**

- Data is sorted.
- The search space can be divided in half.

#### Example Problems

- Binary Search
- Search Insert Position
- First Bad Version

---

### Binary Search on Boundaries

**Use when:**

- You need the first/last occurrence.
- You need the first/last valid position.
- The condition changes from false → true or true → false.

#### Important Concepts

- Lower Bound
- Upper Bound
- First occurrence
- Last occurrence
- First valid position
- Last valid position

#### Example Problems

- Find First and Last Position
- Search Insert Position
- First Bad Version

---

### Binary Search on Rotated Arrays

**Use when:**

- A sorted array has been rotated.
- One half remains sorted.

#### Example Problems

- Search in Rotated Sorted Array
- Find Minimum in Rotated Sorted Array
- Search in Rotated Sorted Array II

---

### Binary Search on Answer

**Use when:**

- The answer lies in a numerical range.
- You can write a `can(mid)` / feasibility function.
- Feasibility is monotonic.

#### Pattern

```text
Search Space
      ↓
   choose mid
      ↓
 can(mid)?
   /     \
 yes      no
 ↓        ↓
shrink   shrink
```

#### Example Problems

- Koko Eating Bananas
- Capacity to Ship Packages Within D Days
- Split Array Largest Sum
- Minimum Days to Make M Bouquets

---


## 8. Sorting

**Use when sorting simplifies the next step.**

#### Common Uses

- Two pointers
- Intervals
- Greedy
- Duplicate detection
- Ordering elements
- Custom ranking

### Important Sorting Algorithms

- Merge Sort
- Quick Sort
- Counting Sort
- Heap Sort
- Custom Comparator

#### Example Problems

- Sort Colors
- Merge Intervals
- Meeting Rooms
- Largest Number

---

