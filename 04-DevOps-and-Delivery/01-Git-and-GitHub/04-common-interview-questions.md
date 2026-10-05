# Git and GitHub Common Interview Questions

### 1. What is the difference between Git and GitHub?

**Git** is a version-control system used to track code changes.

**GitHub** is a platform that hosts Git repositories and provides features like Pull Requests, code reviews, Issues, and automation.

---

### 2. What is the staging area?

The **staging area** contains the changes selected for the next commit.

```bash
git add file.js
```

It allows you to choose which changes should be included in the next commit.

---

### 3. What is the difference between `git fetch` and `git pull`?

- `git fetch` → Downloads remote changes but does **not** integrate them.
- `git pull` → Downloads remote changes and then **merges or rebases** them into the current branch.

---

### 4. What is the difference between merge and rebase?

- **Merge** → Combines two branch histories; may create a merge commit.
- **Rebase** → Replays commits on top of another branch.

Rebase creates new commit IDs, so avoid rebasing shared commits.

---

### 5. How do you resolve a merge conflict?

1. Check the conflicted files.
2. Choose the correct code.
3. Remove conflict markers.
4. Test the code.
5. Stage the resolved files.
6. Continue the merge or rebase.

```bash
git add <file>
git merge --continue
```

---

### 6. How do you undo a commit that has already been pushed?

Use:

```bash
git revert <commit>
```

`git revert` creates a **new commit that undoes the previous commit**.

Avoid `reset` and force-push on shared branches unless the team agrees.

---

### 7. What does `.gitignore` do?

`.gitignore` tells Git which **untracked files/folders should not be added**.

Example:

```gitignore
node_modules/
.env
dist/
*.log
```

It does **not** stop tracking a file that has already been committed.

To stop tracking an already tracked file but **keep it locally**:

```bash
git rm --cached .env
```

For a folder:

```bash
git rm -r --cached dist/
```

Then add it to `.gitignore` and commit the change.

---

### 8. How do GitHub branch protections help?

Branch protection can require:

- Pull Request reviews
- Passing tests/checks
- No direct pushes

This helps prevent unreviewed or failing code from reaching important branches like `main`.

---

### 9. How should secrets be handled in GitHub?

Never commit passwords, API keys, or tokens to Git.

Use:

- GitHub Actions Secrets
- Environment variables
- Secret managers

If a secret is accidentally exposed, **rotate/revoke it immediately**.

---

### 10. What is the difference between `git revert`, `git reset`, and `git restore`?

- **`git revert`** → Undoes a commit by creating a **new commit**. Safe for shared/pushed history.
- **`git reset`** → Moves the **branch pointer** to another commit and can rewrite history.
- **`git restore`** → Restores **file content**; mainly used for working-tree or staging changes.

Example:

```text
git revert  → Undo a commit with a new commit
git reset   → Move the branch pointer
git restore  → Restore file content
```
---

### 11. What is `git stash` and when do you use it?

`git stash` temporarily saves your uncommitted changes so you can switch branches or work on something else.

```bash
git stash
git stash pop
```

Use it when you have unfinished changes but need a clean working tree.

---

### 12. What is `git cherry-pick`?

`git cherry-pick` applies a **specific commit** from another branch to the current branch.

```bash
git cherry-pick <commit>
```

It is useful when you need only one particular commit instead of merging the entire branch.

---

### 13. What is a Fast-Forward Merge?

A **fast-forward merge** happens when the target branch has no new commits, so Git can simply move the branch pointer forward.

```text
Before:

main     A → B
              \
feature        C → D

After:

main     A → B → C → D
```

No merge commit is created.

---

### 14. What is `git reflog`?

`git reflog` records previous movements of `HEAD` and branch references in your **local repository**.

```bash
git reflog
```

It is useful for recovering commits after commands like `git reset`.

Example:

```bash
git reset --hard HEAD@{1}
```

This can move the branch back to a previous position recorded in the reflog.

> **Important:** Reflog is mainly a local recovery mechanism and is not shared with the remote repository.