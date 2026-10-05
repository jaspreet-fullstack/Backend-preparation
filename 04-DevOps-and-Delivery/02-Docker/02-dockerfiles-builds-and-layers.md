# Dockerfiles, Builds, and Image Layers

A **Dockerfile** contains instructions for building a Docker image.

Docker builds the image in **layers**. Layers can be cached and reused when the related instructions and inputs have not changed.

## 1. Example Dockerfile

```dockerfile id="s9w6j1"
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

USER node

EXPOSE 3000

CMD ["node", "server.js"]
```

### Important Instructions

- `FROM` → Base image.
- `WORKDIR` → Sets the working directory.
- `COPY <source> <destination>` → Copy everything from the current build context into /app inside the image..
- `RUN` → Executes a command while building the image.
- `USER` → User used to run the application.
- `EXPOSE` → Documents the container port.
- `CMD` → Default command when the container starts.

---

## 2. Docker Image Layers

Each Dockerfile instruction can create a **layer**.

```text id="c7zqtl"
FROM
 ↓
Layer
 ↓
COPY package*.json
 ↓
Layer
 ↓
RUN npm ci
 ↓
Layer
 ↓
COPY source code
 ↓
Layer
 ↓
Final Image
```

Docker can reuse cached layers when they haven't changed.

### Why Copy `package*.json` First?

```dockerfile id="bqz5v2"
COPY package*.json ./
RUN npm ci

COPY . .
```

If only your source code changes, Docker can reuse the cached `npm ci` layer instead of installing dependencies again.

---

## 3. `.dockerignore`

`.dockerignore` prevents unnecessary files from being sent to the Docker build context.

Example:

```text id="0v8r9m"
node_modules/
.git/
.env
*.log
dist/
```

This helps:

- Reduce build context
- Keep images cleaner
- Avoid accidentally including secrets

---

## 4. Multi-Stage Builds

Use **multi-stage builds** when you need build tools but don't need them in the final image.

```text id="u5br8k"
# Stage 1: Build
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build


# Stage 2: Production
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=build /app/dist ./dist

CMD ["node", "dist/server.js"]
```

```text id="0v8r9m"
Build Stage
├── TypeScript
├── Dev dependencies
├── Source code
└── npm run build
        ↓
      dist/
        ↓
Production Stage
├── Production dependencies only
└── dist/
```

This helps create **smaller production images**.

---

## 5. Secrets

Do not put secrets directly into the Dockerfile.

Avoid:

```dockerfile id="k1s4x2"
ENV DB_PASSWORD=mysecret
```

Also avoid copying `.env` files into the image.

Use:

- Build secrets for build-time credentials
- Runtime environment variables or secret managers for application secrets

---

## 6. Build and Run

Build the image:

```bash id="j8d7yp"
docker build -t orders-api:local .
```

Run the container:

```bash id="6v4mnr"
docker run --rm -p 3000:3000 --env-file .env.local orders-api:local
```

- `-p HOST_PORT:CONTAINER_PORT` → Maps host port `3000` to container port `3000`.
- `--env-file` → Loads environment variables.
- `--rm` → Removes the container automatically after it stops.

Do not commit `.env.local` to Git.

---

## 7. Important Practices

- Use a suitable and deliberate base image.
- Use `npm ci` with a lockfile for reproducible installs.
- Keep production images small.
- Use multi-stage builds when appropriate.
- Don't store secrets in images.
- Run applications as a non-root user when possible.
- Use exec-form `CMD`:

```dockerfile
CMD ["node", "server.js"]
```

## Interview Answer

> **A Dockerfile defines how an image is built. Docker creates image layers from the build instructions and can reuse unchanged layers through caching. We can improve builds by using `.dockerignore`, copying dependency files before source code, using multi-stage builds, and keeping secrets out of the image.**