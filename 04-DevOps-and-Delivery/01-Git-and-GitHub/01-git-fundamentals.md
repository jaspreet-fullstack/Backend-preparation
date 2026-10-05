# Git Fundamentals

Git is a **distributed version-control system** used to track code changes and collaborate with other developers.

Each developer has a **local repository** containing the project's Git history.

## Core Model

```text
Working Tree → Staging Area → Local Repository → Remote Repository
    edit          git add          git commit          git push
```

- **Working Tree** → Your current files and changes.
- **Staging Area** → Changes selected for the next commit.
- **Commit** → A saved snapshot of changes.
- **Branch** → A pointer to a commit that allows independent development.
- **Remote** → Another Git repository, such as GitHub. Common name: `origin`.

## Daily Workflow

```bash
git status
git add src/feature.js
git diff --staged
git commit -m "Add feature"
git fetch origin
git push -u origin feature-branch
```

### `git fetch` vs `git pull`

- `git fetch` → Downloads changes from remote but does **not** integrate them.
- `git pull` → Fetches changes and then integrates them, usually using merge or rebase.

## Stashing Changes

`git stash` temporarily saves your **uncommitted changes** so you can switch branches or work on something else.

```bash
git stash
git stash list
git stash pop
git stash apply
```

- `git stash` → Save uncommitted changes.
- `git stash pop` → Apply changes and remove them from stash.
- `git stash apply` → Apply changes but keep them in stash.
- `git stash list` → Show saved stashes.

Example:

```text
Working on feature A
       ↓
Uncommitted changes
       ↓
git stash
       ↓
Clean working tree
       ↓
Switch branch / do other work
       ↓
git stash pop
       ↓
Changes restored
```

## `.gitignore`

`.gitignore` specifies files and folders that Git should **not track**.

Example:

```gitignore
node_modules/
.env
dist/
*.log
```

Important:

> `.gitignore` prevents untracked files from being added, but it does **not** stop tracking a file that was already committed.

To stop tracking an already tracked file but **keep it locally**:

```bash
git rm --cached .env
```

For a folder:

```bash
git rm -r --cached dist/
```

Then add it to `.gitignore` and commit the change.

```text
Already tracked
      ↓
git rm --cached
      ↓
No longer tracked by Git
      ↓
File still exists locally
```

## Important Differences

- `git diff` → Shows unstaged changes.
- `git diff --staged` → Shows staged changes.
- `git commit` → Saves changes to the local repository.
- `git push` → Sends local commits to the remote repository.
- Git history is **local until pushed**.

## Interview Answer

> **Git is a distributed version-control system used to track code changes and collaborate. Changes move from the working tree to the staging area using `git add`, then to the local repository using `git commit`, and finally to a remote repository using `git push`.**