# Heaps, Trees, and Graphs

## 14. Heap / Priority Queue

**Use when:**

- You repeatedly need the minimum/maximum.
- You need Top-K elements.
- You need scheduling.
- You need streaming min/max.
- Sorting everything would be unnecessary.

#### Common Patterns

- Min heap
- Max heap
- Top-K
- Kth largest/smallest
- Scheduling
- Merge sorted streams

#### Example Problems

- Kth Largest Element
- Top K Frequent Elements
- K Closest Points to Origin
- Merge K Sorted Lists
- Task Scheduler

---


## 15. Two Heaps

**Use when:**

- You need to maintain lower and upper halves.
- You need a dynamic median.

#### Structure

```text
        Median
          ↓
   ┌─────────────┐
   │             │
Max Heap      Min Heap
lower half    upper half
```

#### Example Problems

- Find Median from Data Stream
- Sliding Window Median

---


## 16. Trees

### Tree DFS

**Use when:**

- The answer depends on child results.
- Recursive traversal naturally represents the problem.

#### Traversals

- Preorder
- Inorder
- Postorder

#### Example Problems

- Maximum Depth of Binary Tree
- Diameter of Binary Tree
- Invert Binary Tree
- Same Tree
- Balanced Binary Tree

---

### Tree BFS

**Use when:**

- Level-by-level processing is required.
- You need the minimum number of levels.
- You need the right/left view.

#### Example Problems

- Binary Tree Level Order Traversal
- Binary Tree Right Side View
- Minimum Depth of Binary Tree
- Zigzag Level Order Traversal

---

### Tree Path / State

**Use when:**

- You carry information from root to child.
- Path sum, maximum value, or ancestor information matters.

#### Example Problems

- Path Sum
- Path Sum II
- Binary Tree Maximum Path Sum
- All Root-to-Leaf Paths

---

### Lowest Common Ancestor

**Use when:**

- You need the lowest node that is an ancestor of two nodes.

#### Example Problems

- Lowest Common Ancestor of a Binary Tree
- Lowest Common Ancestor of a BST

---

### Tree Construction

#### Important Patterns

- Build tree from preorder/inorder
- Build tree from inorder/postorder
- Serialize/deserialize
- Tree traversal reconstruction

#### Example Problems

- Construct Binary Tree from Preorder and Inorder Traversal
- Serialize and Deserialize Binary Tree

---


## 17. Binary Search Tree

**Use the ordering property:**

```text
left < root < right
```

#### Important Patterns

- Search
- Insert
- Delete
- Validation
- Inorder traversal
- Floor
- Ceil
- Kth smallest
- Kth largest

#### Example Problems

- Search in a Binary Search Tree
- Insert into a Binary Search Tree
- Delete Node in a BST
- Validate Binary Search Tree
- Kth Smallest Element in a BST
- Lowest Common Ancestor of a BST

---


## 18. Graphs

### Graph Representation

#### Adjacency List

```text
0 → [1, 2]
1 → [0, 3]
2 → [0, 3]
3 → [1, 2]
```

#### Adjacency Matrix

```text
    0 1 2
0   0 1 1
1   1 0 1
2   1 1 0
```

---

### Graph DFS

**Use when:**

- Exploring connected regions.
- Finding components.
- Detecting cycles.
- Exploring all reachable nodes.

#### Example Problems

- Number of Islands
- Clone Graph
- Number of Connected Components
- Flood Fill

---

### Graph BFS

**Use when:**

- You need shortest path in an unweighted graph.
- You need level-by-level exploration.
- You need minimum number of steps.

#### Example Problems

- Rotting Oranges
- Word Ladder
- Shortest Path in Binary Matrix
- Open the Lock

---

### Connected Components

**Use when:**

- You need to determine how many disconnected groups exist.
- You need to group reachable nodes.

#### Example Problems

- Number of Connected Components
- Number of Provinces
- Number of Islands

---

### Cycle Detection

#### Undirected Graph

Use:

- DFS + parent
- Union-Find

#### Directed Graph

Use:

- DFS recursion-state tracking
- Topological sorting

#### Example Problems

- Graph Valid Tree
- Course Schedule
- Redundant Connection

---


## 19. Topological Sort

**Use when:**

- You have directed dependencies.
- One task must happen before another.
- You need a valid ordering.

#### Common Algorithms

- Kahn's Algorithm
- DFS-based Topological Sort

#### Important Concept

```text
A → B → C
```

Means:

```text
A must happen before B
B must happen before C
```

#### Example Problems

- Course Schedule
- Course Schedule II
- Alien Dictionary
- Parallel Courses

---

