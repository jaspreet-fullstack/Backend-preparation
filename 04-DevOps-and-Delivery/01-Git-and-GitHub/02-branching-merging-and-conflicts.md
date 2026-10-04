# Git Branching, Merging, and Conflicts

Branches let developers work on changes independently, then integrate those changes into a shared branch.

## Merge vs. rebase

- **Merge** combines histories and may create a merge commit. It preserves the fact that work happened on separate branches.
- **Rebase** replays commits onto a new base and creates new commit IDs. It produces a linear history, but rewrites the rebased commits.
- Avoid rebasing commits that teammates already use unless the team coordinates; rewritten history can disrupt collaborators.

```text
Merge:  main ---- M
             \  /
              feature

Rebase: main ---- feature commits replayed on new main
```

## Resolving conflicts

A conflict occurs when Git cannot automatically combine edits. Inspect each conflicted file, decide the intended final content, remove conflict markers, run tests, stage the resolution, and finish the merge or rebase.

```bash
git status
git diff
# edit conflicted files
git add path/to/resolved-file
git merge --continue  # or: git rebase --continue
```

## Undoing work safely

- `git restore <file>` discards unstaged working-tree changes to a file.
- `git restore --staged <file>` removes it from the staging area while keeping edits.
- `git revert <commit>` creates a new commit that undoes an earlier commit; useful for shared history.
- `git reset` moves the current branch pointer. Soft and mixed modes can keep changes; hard mode discards local changes and should be used only when intentional.
- `git cherry-pick <commit>` applies a selected commit onto the current branch, creating a new commit.

## Interview answer

Use short-lived branches and merge through reviewed pull requests. Choose merge or rebase based on history policy, avoid rewriting shared commits, and use revert rather than rewriting published history when undoing a production change.
