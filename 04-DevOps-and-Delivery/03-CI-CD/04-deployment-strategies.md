# Deployment Strategies

Deployment strategies define **how a new version is released to users**.

## 1. Rolling Deployment

Replace old instances with new ones **gradually**.

```text
Before:
v1  v1  v1  v1

During:
v2  v1  v1  v1
v2  v2  v1  v1
v2  v2  v2  v1

After:
v2  v2  v2  v2
```

### Advantages

- No need to stop the entire application.
- Uses existing infrastructure.
- Good for normal production deployments.

### Disadvantages

- During deployment, **v1 and v2 run together**.
- Both versions should be compatible with the database/API.

### Interview Answer

> Rolling deployment gradually replaces old application instances with new ones, allowing the service to remain available during deployment.

---

## 2. Blue-Green Deployment

Run **two separate environments**:

- Blue → Current production version
- Green → New version

```text
             Load Balancer
                  ↓
             Blue (v1)
                  ↓
               Users

             Green (v2)
             New Version
```

After testing Green:

```text
Before:
Users → Blue (v1)

After:
Users → Green (v2)
```

If there is a problem, traffic can be switched back:

```text
Users → Blue (v1)
```

### Advantages

- Very fast rollback.
- New version can be tested before receiving traffic.
- Minimal downtime.

### Disadvantages

- Requires additional infrastructure/resources.
- Database changes can make rollback more difficult.

### Interview Answer

> Blue-green deployment maintains two environments. The current version serves traffic while the new version is deployed and tested separately. Traffic is then switched to the new version, and rollback can be done by switching traffic back.

---

## 3. Canary Deployment

Release the new version to a **small percentage of users first**.

```text
                 Load Balancer
                      ↓
             ┌────────┴────────┐
             ↓                 ↓
          v1: 90%           v2: 10%
          Users             Users
```

If everything looks good:

```text
v1: 50% → 10% → 0%
v2: 50% → 90% → 100%
```

### Advantages

- Reduces deployment risk.
- Real users can test the new version.
- Problems can be detected before full rollout.

### Disadvantages

- More complex traffic management.
- Need good monitoring and metrics.

### Interview Answer

> Canary deployment sends a small percentage of traffic to the new version first. If metrics and error rates look good, traffic is gradually increased until the new version serves all users.

---

## 4. Recreate Deployment

Stop the old version first and then start the new version.

```text
v1 → Stop
       ↓
    Deploy v2
       ↓
v2 → Start
```

There can be **downtime** during the deployment.

### Advantages

- Simple.
- Useful when old and new versions cannot run together.

### Disadvantages

- Causes downtime.
- Not suitable for applications requiring high availability.

### Interview Answer

> Recreate deployment stops the old version before starting the new version. It is simple but causes downtime, so it's mainly useful when running both versions simultaneously isn't possible.

---

## 5. A/B Testing

A/B testing sends users to **different versions based on specific rules** to compare behavior.

```text
              Users
                ↓
          Traffic Router
           ↙          ↘
       Version A    Version B
          50%          50%
```

For example:

```text
Version A → Old checkout
Version B → New checkout
```

Then compare metrics such as:

- Conversion rate
- User engagement
- Error rate
- Performance

### Important

A/B testing is primarily a **product/feature experimentation strategy**, not just a deployment strategy.

### Interview Answer

> A/B testing sends different users to different versions of a feature and compares business or user metrics. It's mainly used for experimentation rather than simply deploying a new version.

---

# 5. Deployment Strategy Comparison

| Strategy | Main Idea | Rollback | Resource Usage | Complexity |
|---|---|---|---|---|
| **Rolling** | Replace instances gradually | Medium | Low | Low |
| **Blue-Green** | Two environments, switch traffic | Very Fast | High | Medium |
| **Canary** | Small traffic first | Fast | Medium | Medium/High |
| **Recreate** | Stop old, start new | Slow | Low | Low |
| **A/B Testing** | Compare versions/features | Fast | Medium | High |

### Most Important for Interviews

Focus mainly on:

1. **Rolling Deployment**
2. **Blue-Green Deployment**
3. **Canary Deployment**

Know **Recreate** and **A/B Testing** as additional concepts.

---

# Monitoring and Rollback

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