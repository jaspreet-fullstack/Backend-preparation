# CI/CD Fundamentals

## 1. What is CI/CD?

### Continuous Integration (CI)

Developers frequently push small changes, and the system automatically:

```text
Code → Build → Test
```

The goal is to **find problems early**.

### Continuous Delivery

Every change that passes the pipeline is kept **ready for production**.

Production deployment may require **manual approval**.

```text
Code → Test → Build → Staging → Manual Approval → Production
```

### Continuous Deployment

Every change that passes all checks is **automatically deployed to production**.

```text
Code → Test → Build → Staging → Production
```

---

# 2. Typical CI/CD Pipeline

```text
Developer Push / Pull Request
            ↓
      Install Dependencies
            ↓
          Lint
            ↓
        Run Tests
            ↓
       Build Application
            ↓
     Build Docker Image
            ↓
      Push to Registry
            ↓
    Deploy to Staging
            ↓
       Smoke Tests
            ↓
      Production Deploy
            ↓
        Monitor
```

---

# 3. Important CI/CD Practices

### Build Once, Deploy Many

Build the application/Docker image **once** and use the same artifact in different environments.

```text
Build Image
     ↓
  Staging
     ↓
 Production
```

Don't rebuild a different image for production.

### Automated Testing

Run tests automatically during the pipeline:

- Unit tests
- Integration tests
- End-to-end tests (when needed)

### Security

- Don't store passwords/API keys in source code.
- Use CI/CD secrets or a secret manager.
- Give pipeline jobs only the permissions they need.

---

# 4. Common Deployment Strategies

Deployment strategies define **how a new version is released to users**.

- **Rolling Deployment** → Gradually replace old instances with new instances.
- **Blue-Green Deployment** → Run old and new environments separately, then switch traffic to the new version.
- **Canary Deployment** → Send a small percentage of traffic to the new version first, then gradually increase it.
- **Recreate Deployment** → Stop the old version and then start the new version; may cause downtime.
- **A/B Testing** → Send different users to different versions/features to compare results; mainly used for experimentation.

### Most Important for Interviews

Focus mainly on:

1. **Rolling**
2. **Blue-Green**
3. **Canary**

Know **Recreate** and **A/B Testing** as additional concepts.

---

# 5. Monitoring and Rollback

After deployment:

```text
Deploy
  ↓
Monitor
  ↓
Error rate / latency / CPU
  ↓
Problem?
  ↓
Rollback
```

Monitor things like:

- Error rate
- Response time/latency
- CPU and memory
- Request rate
- Application health

The team should have a way to quickly return to the previous working version.

---

# 6. Continuous Delivery vs Continuous Deployment

| Continuous Delivery | Continuous Deployment |
|---|---|
| Code is always ready for production | Code is automatically released |
| Production may require approval | No manual approval required |
| More control over releases | Faster releases |

### Example

**Continuous Delivery:**

```text
Code → Test → Build → Staging → Manual Approval → Production
```

**Continuous Deployment:**

```text
Code → Test → Build → Staging → Production
```

---

# 7. CI/CD Tools

Common tools include:

- GitHub Actions
- GitLab CI/CD
- Jenkins
- CircleCI
- AWS CodePipeline
- Azure DevOps

---

## Interview Answer

> **CI/CD automates building, testing, and deploying applications. CI focuses on frequently integrating and testing code changes. Continuous delivery keeps successful changes ready for production, while continuous deployment automatically releases them. Common deployment strategies are rolling, blue-green, and canary. Rolling gradually replaces instances, blue-green switches traffic between two environments, and canary starts with a small percentage of traffic before a full rollout.**