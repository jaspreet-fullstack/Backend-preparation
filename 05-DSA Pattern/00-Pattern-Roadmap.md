# 🎯 Pattern-Based DSA Roadmap

## Interview Preparation Roadmap

**Arrays → Hashing → Strings → Linked Lists → Stacks/Queues → Heaps → Trees → Graphs → Greedy → Backtracking → Dynamic Programming → Advanced Patterns**

> **Goal:** Build pattern recognition, implementation speed, debugging discipline, and the ability to explain time/space complexity clearly.

---

# How to Use This Roadmap

- Learn the **pattern** before memorizing individual solutions.
- For every problem, first write the **brute-force idea**, then derive the optimized approach.
- Dry-run with a small example before coding.
- After coding, test edge cases deliberately.
- Track mistakes by category:
  - Pattern recognition
  - Implementation
  - Edge case
  - Complexity
  - Syntax
- Use this cycle:

**Learn → Practice → Re-solve**

- Do not move on just because you watched a solution. Move on when you can reproduce the pattern independently.

---

# Core DSA Patterns

| Area | Patterns to Master |
|---|---|
| Arrays | Sliding Window, Two Pointers, Prefix Sum, Kadane, Intervals, Matrix |
| Hashing | Frequency Map, Set, Prefix/State Hashing |
| Binary Search | Boundary Search, Answer Search, Rotated Arrays |
| Sorting | Merge Sort, Quick Sort, Counting Sort, Custom Comparator |
| Strings | Anagrams, Palindromes, Substrings, Two Pointers, Frequency |
| Linked Lists | Reverse, Fast/Slow, Merge, Reordering |
| Stacks / Queues | Stack, Monotonic Stack, Queue, Deque |
| Heap | Top-K, Kth Element, Two Heaps, Scheduling |
| Trees | DFS/BFS, Height, Diameter, LCA, Path Problems |
| BST | Search, Insert/Delete, Validation, Floor/Ceil |
| Graphs | BFS, DFS, Components, Cycle Detection, Topological Sort |
| Greedy | Intervals, Scheduling, Local-choice proofs |
| DP | 1D, 2D, Knapsack, Subsequences, Grid DP |
| Backtracking | Subsets, Permutations, Combinations, Constraint Search |
| Advanced | Union-Find, Trie, Shortest Paths, MST, Bitmask DP |

## Topic Notes

- [Arrays, hashing, and searching](01-Arrays-Hashing-Searching.md)
- [Strings, linked lists, stacks, and queues](02-Strings-LinkedLists-Stacks-Queues.md)
- [Heaps, trees, and graphs](03-Heaps-Trees-Graphs.md)
- [Greedy, backtracking, and DP](04-Greedy-Backtracking-DP.md)
- [Advanced DSA patterns](05-Advanced-DSA-Patterns.md)

---


# Pattern Recognition Guide

## Array

```text
Contiguous?
    ↓
Sliding Window / Prefix Sum

Sorted?
    ↓
Two Pointers / Binary Search

Maximum contiguous sum?
    ↓
Kadane

Intervals?
    ↓
Sort + Interval Pattern
```

---

## Hashing

```text
Need frequency?
    ↓
HashMap

Need existence?
    ↓
HashSet

Need previous cumulative state?
    ↓
Prefix/State Hashing
```

---

## Stack

```text
Nested structure?
    ↓
Stack

Matching brackets?
    ↓
Stack

Previous/next greater/smaller?
    ↓
Monotonic Stack
```

---

## Queue

```text
Level-by-level?
    ↓
Queue / BFS

Sliding window maximum/minimum?
    ↓
Deque / Monotonic Deque
```

---

## Heap

```text
Repeated min/max?
    ↓
Heap

Top-K?
    ↓
Heap

Dynamic median?
    ↓
Two Heaps
```

---

## Tree

```text
Child results?
    ↓
DFS

Level-based?
    ↓
BFS

Ancestor relationship?
    ↓
LCA

Ordering property?
    ↓
BST
```

---

## Graph

```text
Unweighted shortest path?
    ↓
BFS

Explore connectivity?
    ↓
DFS / BFS

Directed dependencies?
    ↓
Topological Sort

Dynamic connectivity?
    ↓
Union-Find

Weighted shortest path?
    ↓
Dijkstra

Negative edge weights?
    ↓
Bellman-Ford

Minimum total connection?
    ↓
MST
```

---

## Backtracking

```text
Need all possibilities?
    ↓
Backtracking

Choose → Explore → Undo
```

---

## DP

```text
Overlapping subproblems?
    ↓
DP

Can define a reusable state?
    ↓
DP

Take / Skip?
    ↓
Knapsack-style DP
```

---


# Recommended Core Order

Follow the roadmap in this order:

```text
1. Arrays
2. Hashing
3. Two Pointers
4. Sliding Window
5. Prefix Sum
6. Kadane
7. Binary Search
8. Sorting
9. Strings
10. Linked Lists
11. Stack
12. Monotonic Stack
13. Queue / Deque
14. Heap / Priority Queue
15. Two Heaps
16. Trees
17. Binary Search Tree
18. Graphs
19. Topological Sort
20. Intervals
21. Greedy
22. Backtracking
23. Dynamic Programming
24. Union-Find
25. Trie
26. Shortest Path
27. Minimum Spanning Tree
28. Bit Manipulation
29. Advanced DP / Bitmask
```

---


# Practice Strategy

## Stage 1 — Learn the Pattern

Understand:

- What problem does the pattern solve?
- When should you recognize it?
- What is the standard template?
- What is the time complexity?
- What is the space complexity?

---

## Stage 2 — Easy Problems

Solve approximately:

```text
3–5 problems
```

Focus on:

- Pattern recognition
- Basic implementation
- Edge cases

---

## Stage 3 — Medium Problems

Solve approximately:

```text
5–10 problems
```

Focus on:

- Recognizing variations
- Combining patterns
- Optimization
- Clean implementation

---

## Stage 4 — Re-solve

After some time, solve the same problems without looking at the solution.

The goal is:

```text
Problem
   ↓
Recognize Pattern
   ↓
Recall Template
   ↓
Implement
```

---


# Problem-Solving Template

For every problem, follow this process:

## 1. Understand

Identify:

- Input
- Output
- Constraints
- Edge cases

---

## 2. Brute Force

Ask:

```text
What is the most straightforward solution?
```

Write down:

- Time complexity
- Space complexity

---

## 3. Identify the Pattern

Ask:

```text
Is this:

Array?
Hashing?
Two Pointers?
Sliding Window?
Prefix Sum?
Binary Search?
Stack?
Heap?
Tree?
Graph?
Greedy?
Backtracking?
DP?
```

---

## 4. Optimize

Look for:

- Hashing
- Sorting
- Two pointers
- Sliding window
- Prefix state
- Binary search
- Heap
- Monotonic stack
- BFS/DFS
- DP

---

## 5. Dry Run

Use a small example.

Track:

```text
Variables
Pointers
State
Data structure
Answer
```

---

## 6. Edge Cases

Always check:

- Empty input
- One element
- Duplicate values
- Negative values
- Zero
- Already sorted
- Reverse sorted
- Maximum constraints
- All same values

---

## 7. Complexity

Always be able to explain:

```text
Time: O(...)
Space: O(...)
```