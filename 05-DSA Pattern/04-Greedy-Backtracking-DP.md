# Greedy, Backtracking, and Dynamic Programming

## 20. Intervals

**Use when:**

- Problems contain ranges such as `[start, end]`.
- Intervals overlap.
- You need merging or scheduling.

#### Common Patterns

- Sort by start time
- Sort by end time
- Merge overlapping intervals
- Detect overlap
- Insert interval
- Remove interval
- Meeting scheduling

#### Example Problems

- Merge Intervals
- Insert Interval
- Non-overlapping Intervals
- Meeting Rooms
- Meeting Rooms II
- Minimum Number of Arrows to Burst Balloons

---


## 21. Greedy

**Use when:**

- A locally optimal choice can lead to a globally optimal solution.
- You can prove why choosing the current best option is safe.

#### Common Patterns

- Sort + greedy
- Interval greedy
- Scheduling
- Resource allocation
- Two-pointer greedy
- Heap + greedy

#### Example Problems

- Jump Game
- Jump Game II
- Gas Station
- Assign Cookies
- Partition Labels
- Activity Selection
- Non-overlapping Intervals

#### Important Interview Point

Do not simply say:

> "Greedy works."

Be able to explain **why the local choice is safe**.

---


## 22. Backtracking

**Use when:**

- You need to explore multiple possible choices.
- You need all valid combinations/permutations.
- You need constraint-based search.

#### General Template

```text
choose
   ↓
explore
   ↓
undo
```

#### Common Patterns

- Subsets
- Permutations
- Combinations
- Combination Sum
- Constraint search
- Board problems

#### Example Problems

- Subsets
- Permutations
- Combinations
- Combination Sum
- Generate Parentheses
- Letter Combinations of a Phone Number
- N-Queens
- Sudoku Solver

---


## 23. Dynamic Programming

**Use when:**

- The problem contains overlapping subproblems.
- The problem has optimal substructure.
- A state can represent previous computation.

### DP Thinking

Ask:

1. What is the state?
2. What does the state represent?
3. What are the transitions?
4. What is the base case?
5. What is the final answer?
6. Can the space be optimized?

---

### Memoization

```text
Recursive Solution
       ↓
   Repeated State
       ↓
    Cache It
```

#### Advantages

- Natural recursive structure
- Only computes required states

---

### Tabulation

```text
Base Cases
    ↓
Build DP Table
    ↓
Final State
```

#### Advantages

- Iterative
- Avoids recursion overhead
- Often easier to optimize space

---

### 1D DP

#### Common Patterns

- Linear state
- Previous one/two states
- Take / skip decisions

#### Example Problems

- Climbing Stairs
- House Robber
- Min Cost Climbing Stairs
- Decode Ways

---

### 2D DP

#### Common Patterns

- Grid state
- Two-dimensional state
- String-to-string comparison

#### Example Problems

- Unique Paths
- Minimum Path Sum
- Longest Common Subsequence
- Edit Distance

---

### 0/1 Knapsack

**Use when:**

- Each item can be selected at most once.

#### Core Idea

```text
Take
  OR
Skip
```

#### Example Problems

- 0/1 Knapsack
- Partition Equal Subset Sum
- Target Sum

---

### Unbounded Knapsack

**Use when:**

- An item can be selected multiple times.

#### Example Problems

- Coin Change
- Coin Change II
- Unbounded Knapsack
- Rod Cutting

---

### Subsequence DP

#### Important Problems

- Longest Common Subsequence
- Longest Increasing Subsequence
- Longest Palindromic Subsequence
- Distinct Subsequences

---

### Grid DP

**Use when:**

- The problem is represented as a grid.
- Movement has limited directions.
- The answer depends on previous cells.

#### Example Problems

- Unique Paths
- Unique Paths II
- Minimum Path Sum
- Dungeon Game

---

### String DP

#### Important Problems

- Edit Distance
- Longest Common Subsequence
- Word Break
- Distinct Subsequences
- Regular Expression Matching

---

