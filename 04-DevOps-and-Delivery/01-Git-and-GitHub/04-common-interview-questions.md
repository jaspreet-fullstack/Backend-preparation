# Git and GitHub Common Interview Questions

### 1. What is the difference between Git and GitHub?

Git is a distributed version-control system. GitHub hosts Git repositories and adds pull requests, reviews, access controls, issues, and automation.

### 2. What is the staging area?

It is the index of changes selected for the next commit. It lets a developer commit only part of the current working-tree changes.

### 3. What is the difference between `git fetch` and `git pull`?

Fetch downloads remote refs without integrating them. Pull fetches and then merges or rebases the selected remote changes into the current branch.

### 4. What is the difference between merge and rebase?

Merge combines histories and can preserve a branch point; rebase replays commits onto another base and rewrites their IDs. Do not rewrite shared history without coordination.

### 5. How do you resolve a merge conflict?

Inspect the conflicted changes, choose the intended final content, remove conflict markers, run tests, stage the resolution, and continue the merge or rebase.

### 6. How do you undo a commit that has already been pushed?

Usually use `git revert` to create a new inverse commit. Avoid reset/force-push on shared branches unless the team explicitly coordinates a history rewrite.

### 7. What does `.gitignore` do?

It keeps matching untracked files from being added accidentally. It does not remove a file already tracked in Git; that file must be untracked separately.

### 8. How do GitHub branch protections help?

They can require pull-request reviews and passing status checks before changes reach a protected branch, reducing the chance of unreviewed or failing code being merged.

### 9. How should secrets be handled in GitHub?

Never commit secrets. Use a managed secret store or scoped GitHub Actions secrets, restrict access, rotate exposed credentials, and avoid printing them in logs.
