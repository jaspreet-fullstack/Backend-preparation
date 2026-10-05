# GitHub Actions

GitHub Actions is a **CI/CD automation tool built into GitHub**.

It can automatically **build, test, and deploy** your application when something happens in a repository.

Workflows are written in YAML and stored in:

```text
.github/workflows/
```

---

# 1. Main Concepts

### Event

Defines **when the workflow should run**.

Examples:

```yaml
on:
  push:
  pull_request:
  workflow_dispatch:
```

- `push` → Runs when code is pushed.
- `pull_request` → Runs when a PR is created/updated.
- `workflow_dispatch` → Allows manual execution.

---

### Workflow

The complete automation file.

Example:

```text
Workflow
   ↓
Jobs
   ↓
Steps
```

---

### Job

A group of steps that runs on a machine called a **runner**.

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
```

---

### Step

An individual command or action inside a job.

```yaml
steps:
  - uses: actions/checkout@v4
  - run: npm ci
  - run: npm test
```

- `uses` → Uses a reusable GitHub Action.
- `run` → Executes a shell command.

---

### Runner

The machine that executes the job.

Common example:

```yaml
runs-on: ubuntu-latest
```

GitHub provides hosted runners, or you can use your own **self-hosted runner**.

---

### Artifact

A file produced by a workflow that you want to keep or pass to another job.

Examples:

- Build files
- Test reports
- ZIP/package files

```text
Build → Artifact → Deploy
```

---

### Cache

Stores reusable data to make workflows faster.

For example, caching npm dependencies.

```text
First run  → Download dependencies
Next run   → Reuse cache
```

**Important:** Cache is for performance; it should not be treated as the official release artifact.

---

# 2. Simple CI Workflow

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22

      - run: npm ci
      - run: npm test
```

Flow:

```text
Push / PR
    ↓
GitHub Actions
    ↓
Runner
    ↓
Checkout Code
    ↓
Install Dependencies
    ↓
Run Tests
```

If the tests fail, the workflow fails.

---

# 3. GitHub Actions for CI/CD

A typical pipeline can be:

```text
Push Code
    ↓
Run Tests
    ↓
Build Application
    ↓
Build Docker Image
    ↓
Push Image to Registry
    ↓
Deploy
```

---

# 4. Secrets

Never put passwords, API keys, or cloud credentials directly in the workflow file.

Use:

**GitHub Repository → Settings → Secrets and variables → Actions**

Example:

```yaml
env:
  DATABASE_PASSWORD: ${{ secrets.DATABASE_PASSWORD }}
```

Secrets are injected when the workflow runs.

---

# 5. Important Security Practices

- Don't expose production secrets to untrusted pull requests.
- Give workflows only the permissions they need.
- Protect production deployments with GitHub Environments and approvals.
- Use short-lived cloud credentials when possible instead of long-lived access keys.
- Be careful when using user-controlled values inside shell commands.

For most interviews, remember:

```text
Secrets + Permissions + Environment Protection
```

---

# 6. GitHub Actions vs Jenkins

| GitHub Actions | Jenkins |
|---|---|
| Built into GitHub | Separate tool |
| YAML workflows | Pipeline configuration |
| Easy GitHub integration | Highly customizable |
| GitHub-hosted runners available | Usually manage Jenkins infrastructure |
| Good for modern GitHub-based CI/CD | Common in existing enterprise setups |

---

## Interview Answer

> **GitHub Actions is a CI/CD tool built into GitHub. We define workflows using YAML files inside `.github/workflows`. A workflow is triggered by events such as push or pull requests and contains jobs and steps that run on runners. We can use it to install dependencies, run tests, build Docker images, push them to a registry, and deploy the application. Secrets and permissions should be managed securely.**