# Git Fundamentals

Git is a distributed version-control system. Each developer has a local repository containing project history and can exchange commits with remote repositories such as GitHub.

## Core model

```text
Working tree -> Staging area (index) -> Local repository -> Remote repository
    edit          git add                 git commit         git push
```

- **Working tree:** Current checked-out files.
- **Staging area:** The exact changes selected for the next commit.
- **Commit:** A snapshot with a parent commit, author, message, and content changes.
- **Branch:** A movable name pointing to a commit; `HEAD` identifies the current checkout.
- **Remote:** A named reference to another repository, commonly `origin`.

## Daily workflow

```bash
git status
git add src/feature.js
git diff --staged
git commit -m "Add feature"
git fetch origin
git push -u origin feature-branch
```

`git fetch` downloads remote references without integrating them. `git pull` fetches and then integrates changes, usually by merge or rebase depending on configuration.

## Useful distinctions

- `git diff` shows unstaged changes; `git diff --staged` shows staged changes.
- A commit records a local snapshot; pushing publishes commits to a remote.
- `.gitignore` prevents untracked matching files from being added by accident, but does not untrack a file already committed.
- Git history is local until pushed. A remote is not a backup unless its retention and access controls meet backup needs.

## Interview answer

Describe Git as a content-addressed history of snapshots. Explain how working changes move through staging and commits, and how branches and remotes let teams collaborate without sharing one mutable working directory.
