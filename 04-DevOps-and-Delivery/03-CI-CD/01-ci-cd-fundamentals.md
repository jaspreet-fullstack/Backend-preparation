# CI/CD Fundamentals

**Continuous integration (CI)** frequently integrates small changes and automatically builds and tests them. **Continuous delivery** keeps every passing change deployable but may require an approval to release it. **Continuous deployment** automatically releases each change that passes the production gates.

## Typical pipeline

```text
Commit / pull request
        |
        v
Install -> Lint -> Unit tests -> Integration tests
        |
        v
Build one immutable artifact or container image
        |
        v
Publish -> Deploy to staging -> Smoke checks
        |
        v
Approval or automated production rollout -> Monitor / rollback
```

## Core principles

- Give fast feedback with focused checks early; run slower tests later or in parallel where useful.
- Build the artifact once and promote the same artifact through environments; do not rebuild different contents for production.
- Make deployments repeatable, observable, and recoverable. A rollback plan must account for database migrations and irreversible side effects.
- Keep credentials out of source and artifacts. Give pipeline jobs only the permissions they need.
- Use automated tests and deployment strategies such as rolling, canary, or blue/green based on risk and service architecture.
- Separate deploying code from enabling behavior when feature flags help reduce rollout risk.

## Interview distinction

- **Continuous delivery:** The system is always ready to release; a human or policy may approve production deployment.
- **Continuous deployment:** Passing changes are released to production automatically.

## Interview answer

Describe the path from a commit to a tested immutable artifact, how it is promoted and deployed, which quality/security gates apply, and how the team detects and recovers from a bad release.
