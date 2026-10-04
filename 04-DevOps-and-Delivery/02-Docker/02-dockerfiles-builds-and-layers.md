# Dockerfiles, Builds, and Image Layers

A Dockerfile describes how to build an image. Each build instruction can contribute a layer that Docker may reuse from cache when inputs have not changed.

## Example: Node.js service

```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
USER node
EXPOSE 3000
CMD ["node", "server.js"]
```

Use a Node version supported by the application and pin production base images deliberately. The example assumes the base image provides a `node` user and the app can run without root privileges.

## Build practices

- Add a `.dockerignore` file for `.git`, `node_modules`, local secrets, logs, and build output that should not enter the build context.
- Copy dependency manifests before application source so dependency installation can be cached when only source files change.
- Use `npm ci` with a lockfile for reproducible dependency installation.
- Keep images small; use multi-stage builds when build tools or development dependencies are not needed at runtime.
- Avoid embedding secrets in `ARG`, `ENV`, copied files, or image layers. Use build secrets for build-time access and runtime secret management for application credentials.
- Prefer exec-form `CMD` so the application receives termination signals correctly.

## Build and run

```bash
docker build -t orders-api:local .
docker run --rm -p 3000:3000 --env-file .env.local orders-api:local
```

Do not commit `.env.local`; use a safe local secret process. A built image should be immutable and promoted between environments rather than rebuilt with different contents for each environment.
