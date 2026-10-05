# CI/CD Common Interview Questions

### 1. What is CI?

CI stands for **Continuous Integration**. Developers frequently push small changes, and the system automatically builds and tests them to find problems early.

---

### 2. What is the difference between Continuous Delivery and Continuous Deployment?

**Continuous Delivery** keeps the application ready for production, but deployment may require manual approval.

**Continuous Deployment** automatically deploys changes to production after all checks pass.

---

### 3. What is an artifact, and why build once?

An **artifact** is the output of a build, such as a Docker image or compiled application.

We build it **once** and use the same artifact in staging and production so the tested version is exactly what gets deployed.

---

### 4. What is the difference between a cache and an artifact?

A **cache** stores reusable data to make future builds faster.

An **artifact** is the actual build output that we deploy or keep.

```text id="xyp7h5"
Cache    → Speed up builds
Artifact → Deployable output
```

---

### 5. How do you protect secrets in a pipeline?

Store secrets in a **secret manager or CI/CD secret store**.

Don't put them in source code, Docker images, or logs.

Give credentials only the permissions they need.

---

### 6. How would you roll out a high-risk change?

Use a gradual deployment strategy such as **canary or blue-green**.

Monitor error rate, latency, and application health. If something goes wrong, pause the deployment or roll back.

---

### 7. What is GitHub Actions?

GitHub Actions is a **CI/CD automation tool built into GitHub**.

It uses YAML workflows that run jobs and steps on GitHub-hosted or self-hosted runners.

---

### 8. What are Jenkins controllers and agents?

The **Jenkins controller** manages and schedules jobs.

The **Jenkins agent** actually executes the build, test, or deployment steps.

```text id="wj3qye"
Controller
    ↓
Agent
    ↓
Build / Test / Deploy
```

---

### 9. How should database migrations fit into CI/CD?

Test migrations before production and make them **backward-compatible** when possible.

For example:

```text id="s6v3c7"
Add new column
      ↓
Deploy new code
      ↓
Migrate data
      ↓
Remove old column later
```

Remember that rolling back application code does **not automatically roll back database changes**.

---

### 10. What should happen when a pipeline stage fails?

The pipeline should **stop the deployment**, show useful logs, and prevent the failed version from reaching production.

The last known-good version should continue serving traffic.

```text id="w3k7c2"
Pipeline fails
     ↓
Stop
     ↓
Fix problem
     ↓
Last good version remains
```