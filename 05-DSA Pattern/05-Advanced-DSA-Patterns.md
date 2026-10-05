# Advanced DSA Patterns

## 24. Union-Find / Disjoint Set Union

**Use when:**

- You need to maintain connected components dynamically.
- You repeatedly connect groups.
- You need to determine whether two nodes belong to the same component.

#### Core Operations

```text
find(x)
union(a, b)
```

#### Optimizations

- Path Compression
- Union by Rank
- Union by Size

#### Example Problems

- Number of Connected Components
- Redundant Connection
- Accounts Merge
- Kruskal's Algorithm

---


## 25. Trie

**Use when:**

- Prefix matching is important.
- You need efficient word lookup.
- You need autocomplete-style operations.
- You need dictionary-based searching.

#### Common Operations

- Insert
- Search
- Starts With
- Prefix search

#### Structure

```text
             root
            /    \
           c      t
          /        \
         a          o
        /            \
       t              p
```

#### Example Problems

- Implement Trie
- Design Add and Search Words
- Word Search II
- Replace Words

---


## 26. Shortest Path

### BFS Shortest Path

**Use when:**

- The graph is unweighted.
- Every edge has equal cost.

#### Complexity

```text
O(V + E)
```

---

### Dijkstra's Algorithm

**Use when:**

- Edge weights are non-negative.
- You need shortest paths.

#### Typical Data Structure

```text
Priority Queue
     ↓
minimum distance node
     ↓
relax neighbors
```

#### Complexity

With a binary heap:

```text
O((V + E) log V)
```

#### Example Problems

- Network Delay Time
- Path With Minimum Effort
- Cheapest Flights Within K Stops

---

### Bellman-Ford

**Know the concept for:**

- Negative edge weights.
- Negative cycle detection.

#### Complexity

```text
O(V × E)
```

---


## 27. Minimum Spanning Tree

**Goal:**

Connect all vertices with minimum total edge weight.

#### Important Algorithms

- Kruskal's Algorithm
- Prim's Algorithm

#### Kruskal

Uses:

```text
Sorting + Union-Find
```

#### Prim

Uses:

```text
Priority Queue + Graph
```

#### Example Problems

- Min Cost to Connect All Points
- Minimum Spanning Tree
- Connecting Cities With Minimum Cost

---


## 28. Bit Manipulation

### Important Operations

```text
x & y   → AND
x | y   → OR
x ^ y   → XOR
~x      → NOT
x << k  → left shift
x >> k  → right shift
```

#### Common Patterns

- XOR cancellation
- Check/set/clear bit
- Count set bits
- Power of two
- Bit masks
- Subset representation

#### Example Problems

- Single Number
- Single Number II
- Counting Bits
- Number of 1 Bits
- Missing Number
- Subsets using Bitmask

---


## 29. Advanced DP / Bitmask DP

**Use when:**

- The state contains a set of selected items.
- The number of elements is small enough for `2^N` states.
- You need to represent subsets efficiently.

#### Bitmask Example

For:

```text
[A, B, C]
```

Possible subsets can be represented as:

```text
000
001
010
011
100
101
110
111
```

#### Common Patterns

- State compression
- Subset DP
- Traveling Salesman style DP
- Assignment problems

#### Example Problems

- Traveling Salesman Problem
- Minimum Cost Assignment
- Shortest Path Visiting All Nodes
- Partition to K Equal Sum Subsets

---

