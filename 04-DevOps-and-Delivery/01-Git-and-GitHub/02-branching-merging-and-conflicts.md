# Git Branching, Merging, and Conflicts

Branches allow developers to work on features independently and later combine their changes.

## 1. Merge vs Rebase

### Merge

Combines two branches and may create a **merge commit**.

```text
main     ──────── M
             \   /
feature       ──
```

- Keeps the original branch history.
- Does not rewrite existing commits.

### Rebase

Moves/replays your commits on top of another branch.

```text
Before:
main     ───── A ─── B
              \
feature        C ─── D

After rebase:
main     ───── A ─── B ─── C' ─── D'
```

- Creates new commit IDs.
- Produces a linear history.
- Avoid rebasing commits that other developers are already using.

**Main difference:**

> Merge → **Combines histories**  
> Rebase → **Replays commits on a new base**

---

## 2. Merge Conflicts

A conflict occurs when Git **cannot automatically combine changes**.

```text
Developer A → changes the same line
Developer B → changes the same line
                     ↓
                  Conflict
```

### Resolve Conflict

```bash
git status
git diff

# Edit conflicted files and remove conflict markers

git add <file>
git merge --continue
# or
git rebase --continue
```

After resolving:

1. Check the conflicted files.
2. Decide the correct code.
3. Remove conflict markers.
4. Test the code.
5. Stage the resolved files.
6. Continue the merge/rebase.

---

## 3. Undoing Changes

### `HEAD`

`HEAD` points to the **current commit** you are working on.

```text
main
  ↓
 HEAD
  ↓
Current commit
```

Common references:

```text
HEAD     → Current commit
HEAD~1   → Previous commit
HEAD~2   → Two commits before
HEAD^    → Parent of current commit
```

These references are commonly used with commands like `reset`, `revert`, and `restore`.

---

### `git restore`

`git restore` is mainly used to **restore file content**. It does not remove or undo a commit from Git history.

#### Discard uncommitted changes

```bash
git restore file.js
```

Restores `file.js` to the version from the current `HEAD` commit.

#### Remove file from staging

```bash
git restore --staged file.js
```

Removes the file from the staging area but **keeps the changes** in the working tree.

#### Restore a file from an older commit

```bash
git restore --source=<commit> file.js
```

Restores the file's content from that commit into the working tree.

---

### `git revert`

Used to **undo an already committed change**.

```bash
git revert <commit>
```

It creates a **new commit** that reverses the changes from the specified commit.

Best for commits that are already pushed/shared.

---

### `git reset`

Moves the current branch pointer to another commit.

```text
--soft   → Keep changes staged
--mixed  → Keep changes unstaged
--hard   → Discard changes
```

Be careful with `--hard`, especially on shared branches.

---

### `git cherry-pick`

Applies a specific commit to the current branch.

```bash
git cherry-pick <commit>
```

Useful when you need **one particular commit** from another branch.

---

## Quick Comparison

| Command | Purpose |
|---|---|
| `git restore` | Restore file content |
| `git revert` | Undo a commit with a new commit |
| `git reset` | Move branch pointer/history |
| `git cherry-pick` | Apply a specific commit |

## Interview Answer

> **Branches allow developers to work independently. Merge combines branch histories, while rebase replays commits on a new base. Conflicts happen when Git cannot automatically combine changes, so we resolve and test the files before continuing. `git restore` restores file content, `git revert` safely undoes a committed change, and `git reset` moves the branch pointer.**