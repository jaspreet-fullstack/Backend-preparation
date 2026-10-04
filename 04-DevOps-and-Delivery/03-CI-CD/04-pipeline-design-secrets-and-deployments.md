# CI/CD Pipeline Design, Secrets, and Deployments

A production pipeline should be reproducible, least-privileged, observable, and able to stop or recover safely when a check fails.

## Example end-to-end flow

```text
Pull request -> lint + tests + review -> merge
                                      |
                                      v
                         build image once + scan
                                      |
                                      v
                         publish immutable digest
                                      |
                                      v
                  deploy staging -> smoke/integration tests
                                      |
                          approval or policy gate
                                      v
                       canary/rolling production release
                                      |
                              monitor -> rollback
```

## Artifact promotion

Build an image or package once, identify it by immutable digest/version, and promote that exact artifact through environments. A mutable tag such as `latest` is convenient for development but is a poor release identity because the tag can point to different contents over time.

## Secrets and identity

- Store secrets in a dedicated secret manager or CI platform secret store; do not commit them, bake them into images, or print them in logs.
- Prefer short-lived workload identity or OIDC federation to long-lived cloud access keys when available.
- Scope credentials to the job, repository, environment, and action that needs them; rotate and revoke them.
- Treat pull requests and build scripts as code execution. Do not make production credentials available to untrusted jobs.

## Deployment and rollback

- Use staged rollouts (rolling, canary, or blue/green) to limit blast radius and verify health before full traffic shifts.
- Monitor service-level indicators during rollout and automatically pause or roll back on sustained failures.
- Make schema migrations backward-compatible where possible: deploy additive changes first, migrate data, then remove old fields in a later release.
- Rollback application code may not undo data changes. Plan forward fixes, migration recovery, and backups for destructive operations.
- Define who can approve production changes and keep an auditable record of what artifact was deployed.

## Interview checklist

Explain the trigger, quality gates, artifact identity, secret handling, deployment strategy, health checks, rollback decision, and how database migrations remain compatible across versions.
