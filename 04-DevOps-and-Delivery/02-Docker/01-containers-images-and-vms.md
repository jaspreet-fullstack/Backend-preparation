# Docker Containers, Images, and Virtual Machines

Docker packages an application and its dependencies into an **image**, which can be used to create **containers**.

## 1. Key Terms

### Image

An **image** is a read-only template used to create containers.

It contains:

- Application code
- Dependencies
- Runtime
- Configuration

### Container

A **container** is a running instance of an image.

```text
Image → Container
```

Containers can be stopped, started, and recreated.

### Dockerfile

A **Dockerfile** contains instructions for building an image.

```dockerfile
FROM node:20
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "start"]
```

### Registry

A **registry** stores and distributes Docker images.

Examples:

- Docker Hub
- Private container registry

### Docker Engine

**Docker Engine** is the Docker platform that builds images and runs containers.

### Docker Daemon

The **Docker Daemon (`dockerd`)** is the background service that does the actual Docker work.

It manages:

- Images
- Containers
- Networks
- Volumes

```text
Docker CLI
   │
   ▼
Docker Daemon
   │
   ├── Images
   ├── Containers
   ├── Networks
   └── Volumes
```

---

## 2. Containers vs Virtual Machines

| Containers | Virtual Machines |
|---|---|
| Share the host OS kernel | Run a separate guest OS |
| Lightweight | More resource-intensive |
| Start quickly | Usually slower to start |
| Isolate processes | Virtualize a complete machine |

```text
Container:
Application
    ↓
Container
    ↓
Host OS Kernel
    ↓
Hardware


VM:
Application
    ↓
Guest OS
    ↓
Hypervisor
    ↓
Hardware
```

---

## 3. Image to Container Flow

```text
Dockerfile
    ↓
docker build
    ↓
Image
    ↓
docker run
    ↓
Container
```

Images can also be pushed to or pulled from a registry:

```text
Image → Registry
           ↓
       docker pull
           ↓
       Local Image
```

---

# 4. Common Docker Commands

## Build an Image

```bash
docker build -t my-app .
```

- `-t` → Assigns a name/tag to the image.
- `.` → Uses the current directory as the build context.

---

## List Images

```bash
docker images
```

or:

```bash
docker image ls
```

---

## Run a Container

```bash
docker run my-app
```

Run in background:

```bash
docker run -d my-app
```

Run with a name:

```bash
docker run -d --name my-container my-app
```

---

## List Containers

Running containers:

```bash
docker ps
```

All containers, including stopped ones:

```bash
docker ps -a
```

---

## Stop and Start a Container

```bash
docker stop my-container
docker start my-container
```

Restart:

```bash
docker restart my-container
```

---

## Remove a Container

```bash
docker rm my-container
```

Force remove a running container:

```bash
docker rm -f my-container
```

---

## Remove an Image

```bash
docker rmi my-app
```

---

## View Container Logs

```bash
docker logs my-container
```

Follow logs:

```bash
docker logs -f my-container
```

---

## Execute a Command Inside a Running Container

```bash
docker exec -it my-container bash
```

If Bash is unavailable:

```bash
docker exec -it my-container sh
```

---

## Pull an Image

```bash
docker pull node:20
```

---

## Tag an Image

```bash
docker tag my-app username/my-app:1.0
```

---

## Push an Image

```bash
docker push username/my-app:1.0
```

---

## View Docker Information

```bash
docker info
```

Docker version:

```bash
docker version
```

---

## 5. Most Important Commands

For interviews, remember these first:

```text
docker build  → Build image
docker images → List images
docker run    → Create/run container
docker ps     → List running containers
docker ps -a  → List all containers
docker stop   → Stop container
docker start  → Start container
docker logs   → View logs
docker exec   → Run command inside container
docker rm     → Remove container
docker rmi    → Remove image
docker pull   → Download image
docker push   → Upload image
```

## 6. Why Use Docker?

- Same environment across development, testing, and production.
- Package application with its dependencies.
- Easy to deploy and recreate applications.
- Makes running multiple application instances easier.

Docker itself does **not** automatically provide scalability or high availability. Those depend on how the containers are deployed and managed.

## Interview Answer

> **Docker packages an application and its dependencies into an image, and a container is a running instance of that image. The Docker CLI sends commands to the Docker Daemon, which manages images, containers, networks, and volumes.**