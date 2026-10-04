# GitHub Actions

GitHub Actions runs automation in response to repository events. A workflow is YAML stored under `.github/workflows/`.

## Main building blocks

- **Event:** Trigger such as `push`, `pull_request`, a schedule, or manual dispatch.
- **Workflow:** The full automation definition.
- **Job:** A group of steps running on a GitHub-hosted or self-hosted runner.
- **Step:** A shell command or reusable action.
- **Artifact:** Output retained or passed between jobs, such as test reports or a built package.
- **Cache:** Reusable dependencies or build data; a cache is an optimization, not an authoritative artifact store.

## Example CI workflow

```yaml
name: CI

on:
  pull_request:
  push:
    branches: [main]

permissions:
  contents: read

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm test
```

For production workflows, pin third-party actions to reviewed full commit SHAs where practical, grant least-privilege `permissions`, protect deployment environments, and use short-lived credentials through OIDC federation when supported.

## Security and reliability

- Treat pull-request code as untrusted, especially contributions from forks; do not expose production secrets to it.
- Avoid unsafe use of untrusted event fields in shell commands.
- Use protected environments and required reviews for sensitive deployments.
- Prefer ephemeral hosted runners for untrusted jobs. Self-hosted runners need isolation and cleanup because jobs can leave data behind.
- Store artifacts with clear retention and provenance; do not rely on dependency caches as release artifacts.

## Interview answer

Explain the trigger, runner, job dependencies, test gates, artifact flow, permissions, secret handling, and how a production deployment is approved and monitored.
