# Docker Production Security and Optimization

## 1. Security

- **Run as non-root user** → Reduces the impact if the container is compromised.
- **Use minimal, updated images** → Smaller attack surface and fewer vulnerabilities.
- **Scan images and dependencies** → Find security vulnerabilities before deployment.
- **Keep secrets outside the image** → Never put passwords, API keys, or tokens in code or Dockerfiles. Use environment variables or a secret manager.
- **Don't mount Docker socket** → `/var/run/docker.sock` gives powerful control over the Docker host.
- **Set resource limits** → Limit CPU and memory to prevent one container from consuming all host resources.
- **Use read-only filesystem when possible** → Prevent unnecessary writes inside the container.

---

## 2. Runtime Best Practices

- **One primary service per container** → For example, one container for API and another for PostgreSQL.
- **Handle `SIGTERM` gracefully** → Allows the application to finish current requests before shutting down.
- **Use health checks** → Helps determine whether the application is healthy and ready to receive traffic.
- **Send logs to stdout/stderr** → Docker and the deployment platform can collect them easily.
- **Keep configuration outside the image** → The same image can be used in development, staging, and production with different configurations.

---

## 3. Image Optimization

- **Use multi-stage builds** → Keep build tools and development dependencies out of the final image.
- **Use `.dockerignore`** → Don't copy unnecessary files like `node_modules`, `.git`, and logs.
- **Use Docker layer caching** → Copy dependency files before source code so dependencies don't reinstall when only source code changes.

Example:

```dockerfile
COPY package*.json ./
RUN npm ci

COPY . .
```

- **Use specific image versions** → Avoid relying on `latest` in production.
- **Promote the same tested image** → Build and test an image once, then use that same image in production instead of rebuilding it.

---

## Interview Answer

> **For Docker production security, I would run containers as non-root users, use minimal and updated images, scan images for vulnerabilities, and keep secrets outside the image. I would also apply CPU and memory limits, use health checks, handle SIGTERM for graceful shutdown, and use multi-stage builds and `.dockerignore` to optimize images.**