# CI/CD Common Interview Questions

### 1. What is CI?

Continuous integration frequently merges small changes and automatically builds and tests them so integration problems are found early.

### 2. What is the difference between continuous delivery and continuous deployment?

Continuous delivery keeps changes ready for release, often with a human approval. Continuous deployment automatically releases changes that pass the required gates.

### 3. What is an artifact, and why build once?

An artifact is a versioned output such as a package or container image. Building once and promoting the same immutable artifact avoids environment-specific rebuild differences.

### 4. What is the difference between a cache and an artifact?

A cache speeds up future work and can be evicted or recomputed. An artifact is a build output that should be identified, retained, and promoted reliably.

### 5. How do you protect secrets in a pipeline?

Use a secret manager or CI secret store, restrict credentials to the smallest scope, avoid printing them, and prefer short-lived identity federation over long-lived keys where possible.

### 6. How would you roll out a high-risk change?

Deploy progressively, such as canary or blue/green, monitor health and business indicators, and pause or roll back if thresholds fail. Ensure rollback accounts for data and schema changes.

### 7. What is GitHub Actions?

A GitHub automation service that runs YAML workflows in response to events using jobs, steps, and hosted or self-hosted runners.

### 8. What are Jenkins controllers and agents?

The controller schedules and coordinates jobs; agents execute build steps. Isolate agents because pipeline jobs execute code and may be untrusted.

### 9. How should database migrations fit into CI/CD?

Test migrations, make changes backward-compatible where possible, separate schema and application rollout when needed, and plan for rollback or forward repair of data changes.

### 10. What should happen when a pipeline stage fails?

Stop promotion, report actionable logs, preserve useful test/build artifacts, avoid exposing secrets, and leave the last known-good deployment serving traffic.
