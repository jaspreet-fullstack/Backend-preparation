# GitHub Pull Requests and Collaboration

**Git** is the version-control system.  
**GitHub** is a platform that hosts Git repositories and provides collaboration features.

## 1. Pull Request (PR)

A Pull Request is a request to **merge changes from one branch into another branch** after review.

### Typical Flow

```text
Create Branch
     ↓
Make Changes
     ↓
Commit
     ↓
Push Branch
     ↓
Open Pull Request
     ↓
Code Review + Tests
     ↓
Approve
     ↓
Merge
```

Reviewers check:

- Code quality
- Correctness
- Tests
- Security
- Maintainability

---

## 2. Branch Protection

**Branch protection** prevents unwanted changes to important branches such as `main`.

Common rules:

- Require Pull Request
- Require code review
- Require tests/checks to pass
- Prevent direct pushes

---

## 3. Useful GitHub Concepts

### Repository

A Git repository hosted on GitHub, along with features like PRs, Issues, and Actions.

### Fork

A separate copy of a repository under another account.

Commonly used when contributing to open-source projects.

### Issue

Used to track:

- Bugs
- Features
- Tasks

A Pull Request can be linked to an Issue.

### Release / Tag

A **tag** points to a specific commit, usually to mark a version.

Example:

```text
v1.0.0
v2.0.0
```

---

## 4. CODEOWNERS

`CODEOWNERS` defines who should review changes to specific files or directories.

Example:

```text
/backend/ @backend-team
/frontend/ @frontend-team
```

---

## 5. Secrets

Never commit passwords, API keys, or tokens to Git.

Use:

- GitHub Actions Secrets
- Environment variables
- Secret managers

---

## Interview Answer

> **Git is used for version control, while GitHub provides repository hosting and collaboration features. A typical workflow is to create a branch, commit and push changes, open a Pull Request, run reviews and automated checks, and then merge it into the main branch. Branch protection can require reviews and passing checks before merging.**