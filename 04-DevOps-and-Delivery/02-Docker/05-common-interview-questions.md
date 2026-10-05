# Docker Common Interview Questions

### 1. What is the difference between an image and a container?

An **image** is a read-only template containing the application and its dependencies. A **container** is a running instance of that image.

---

### 2. How are containers different from virtual machines?

Containers **share the host OS kernel** and are lightweight. VMs run a **separate guest OS**, so they are generally heavier and use more resources.

---

### 3. What is a Docker image layer?

A layer is a **filesystem change created during the Docker image build**.

Docker can reuse unchanged layers, which makes builds faster.

---

### 4. Why use a multi-stage build?

Multi-stage builds keep **build tools and development dependencies out of the final image**.

This makes the production image **smaller and more secure**.

---

### 5. What belongs in `.dockerignore`?

Files that are not needed to build the image, for example:

```text id="m9zj1a"
node_modules/
.git/
.env
*.log
dist/
```

It keeps the build context smaller and helps prevent accidentally copying secrets.

---

### 6. How should persistent data be stored?

Use **Docker volumes or external storage** instead of relying on the container's temporary filesystem.

For example:

```text id="ny2v8v"
Container → Volume → Persistent Data
```

---

### 7. How do containers communicate?

Containers can communicate through a **Docker network**.

On a user-defined network, containers can usually communicate using their **service/container names**.

Example:

```text id="k3j8ca"
api → db:5432
```

Use `-p` when the **host or external client** needs to access the container.

---

### 8. How do you pass secrets to containers?

Do not put secrets inside the Dockerfile or image.

Pass them at **runtime** using environment variables or a **secret management system**.

---

### 9. Is Docker Compose a production orchestrator?

Docker Compose is mainly used to **run multiple containers together**, especially for local development and testing.

For large production environments, tools such as **Kubernetes or cloud container platforms** provide more advanced scheduling, scaling, and recovery.

---

### 10. How should a container handle shutdown?

The application should handle **`SIGTERM`** and shut down gracefully.

For example:

```text id="l3s3bd"
SIGTERM
   ↓
Stop accepting new requests
   ↓
Finish current requests
   ↓
Close connections
   ↓
Exit
```

This prevents requests from being lost during deployments or restarts.

---

### 11. How do you see live code changes during Docker development without rebuilding the image every time?

Use **bind mounts** with a development server that supports **watch mode**, such as `nodemon` or NestJS `start:dev`.

```text
Local Code
    ↓
Bind Mount
    ↓
Container
    ↓
Watch Mode
    ↓
Application Reload
```

Example:

```yaml
services:
  api:
    build:
      context: .
      target: development
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    command: npm run start:dev
```

Now, when you change code locally, the change is immediately available inside the container and the watch process reloads the application.

```bash
docker compose up --build
```

You normally build the image initially, but **you don't need to rebuild it for every code change**.

**Interview answer:**

> For local Docker development, I use bind mounts to sync local source code with the container and run the application in watch mode, such as NestJS `start:dev` or nodemon. This allows code changes to be detected and the application to reload without rebuilding the Docker image every time.

---

### 12. What is the difference between `RUN`, `CMD`, and `ENTRYPOINT` in a Dockerfile?

- **`RUN`** → Executes a command **while building the image**.
- **`CMD`** → Defines the **default command** to run when the container starts. It can easily be overridden.
- **`ENTRYPOINT`** → Defines the **main command/application** of the container. It is less easily overridden.

Example:

```dockerfile
FROM node:22

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "start"]
```

Here:

```text
RUN npm install
      ↓
Runs during image build

CMD ["npm", "start"]
      ↓
Runs when container starts
```

### `CMD` vs `ENTRYPOINT`

```dockerfile
ENTRYPOINT ["node"]
CMD ["server.js"]
```

Running:

```bash
docker run my-app
```

runs:

```text
node server.js
```

If you provide another argument:

```bash
docker run my-app app.js
```

it runs:

```text
node app.js
```

So:

```text
RUN        → Build time
CMD        → Default runtime command
ENTRYPOINT → Main runtime command
```

**Interview answer:**

> `RUN` executes commands while building the Docker image, such as installing dependencies. `CMD` defines the default command when the container starts and can be overridden. `ENTRYPOINT` defines the main executable of the container and is useful when the container should always run a specific application.