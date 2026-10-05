# Docker Volumes, Networking, and Compose

## 1. Docker Volumes

A container's normal writable storage is **temporary**. If the container is removed, that data can be lost.

For data that must survive container recreation, use persistent storage.

## Types of Docker Storage

### 1. Named Volume

Docker manages the storage.

```bash
docker volume create postgres-data
```

Useful for databases and other persistent container data.

```text
Container → Named Volume → Data persists
```

Commonly used when Docker should manage the persistent storage.

---

### 2. Bind Mount

Maps a folder/file from the **host machine** into the container.

```bash
docker run -v ./src:/app/src my-app
```

Commonly used for local development.

```text
Host folder ↔ Container folder
```

The host directly controls the files.

---

### 3. Tmpfs

Stores data in **memory** and does not persist after the container stops.

```text
Container
    ↓
Tmpfs
    ↓
Memory
```

Useful for temporary or sensitive data that should not be written to disk.

---

## Important Volume Commands

### Create a volume

```bash
docker volume create postgres-data
```

### List volumes

```bash
docker volume ls
```

### Inspect a volume

```bash
docker volume inspect postgres-data
```

### Remove a volume

```bash
docker volume rm postgres-data
```

### Use a named volume

```bash
docker run -v postgres-data:/var/lib/postgresql/data postgres
```

### Use a bind mount

```bash
docker run -v ./src:/app/src my-app
```

### Use tmpfs

```bash
docker run --tmpfs /tmp my-app
```

### Remove unused volumes

```bash
docker volume prune
```

**Important:** Be careful with `docker volume rm` and `docker volume prune` because they can permanently remove stored data.

**Important:** A Docker volume is persistent storage, but it is **not automatically a backup**.

---

# 2. Docker Networking

Docker networking allows containers to **communicate with each other and with external systems**.

Containers on the same user-defined network can communicate using **container/service names**.

```text
api → db:5432
```

## Types of Docker Networks

### 1. Bridge

The **default network type** for containers on a single Docker host.

```text
Container A ──┐
              ├── Bridge Network
Container B ──┘
```

Commonly used for local applications.

User-defined bridge networks also provide **automatic DNS/service-name discovery**.

---

### 2. Host

The container shares the **host's network namespace**.

```text
Container
    ↓
Host Network
```

There is no separate container network isolation.

Useful when the application needs direct access to the host network.

---

### 3. None

Disables networking for the container.

```text
Container
    ↓
No Network
```

Useful when a container does not need network access.

---

### 4. Overlay

Used to connect containers across **multiple Docker hosts**, commonly with Docker Swarm.

```text
Host 1                  Host 2
┌──────────┐            ┌──────────┐
│ Container│            │ Container│
└────┬─────┘            └────┬─────┘
     └──── Overlay Network ───┘
```

---

### 5. Macvlan

Gives containers their own **MAC addresses** so they can appear as physical devices on the network.

Less commonly used than bridge networks.

---

## Important Networking Commands

Create and manage a network:

```bash
docker network create app-network
docker network ls
docker network inspect app-network
docker network rm app-network
```

- `create` → Create a network
- `ls` → List networks
- `inspect` → View network details
- `rm` → Remove a network

Connect/disconnect a running container:

```bash
docker network connect app-network my-container
docker network disconnect app-network my-container
```

Run a container on a specific network:

```bash
docker run --network app-network my-app
```

---

## Port Mapping

```bash
docker run -p 8080:3000 my-app
```

```text
Host:       8080
              ↓
Container:  3000
```

Use `-p` when the **host or an external client** needs to access the container.

Containers on the same Docker network usually don't need port publishing to communicate with each other.

---

# 3. Docker Compose

**Docker Compose** is used to define and run **multiple containers together** using a YAML file.

For example:

```text
API
 ↓
PostgreSQL
 ↓
Redis
```

## Simple Example

```yaml
services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgres://app:password@db:5432/app
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:17
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: password
      POSTGRES_DB: app
    volumes:
      - postgres-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app -d app"]
      interval: 5s
      timeout: 3s
      retries: 10

volumes:
  postgres-data:
```

Here:

- `api` → Application container
- `db` → PostgreSQL container
- `ports` → Exposes API to the host
- `environment` → Environment variables
- `depends_on` → Controls startup dependency
- `volumes` → Persists PostgreSQL data
- `healthcheck` → Checks whether PostgreSQL is ready

The API can connect to PostgreSQL using:

```text
db:5432
```

because Compose creates a network where services can discover each other by service name.

---

# 4. Common Compose Commands

```bash
docker compose up
docker compose up -d
docker compose down
docker compose ps
docker compose logs
docker compose logs -f
```

- `up` → Start services
- `up -d` → Start in background
- `down` → Stop and remove services
- `ps` → List services
- `logs` → View logs
- `logs -f` → View logs in real time

---

## Interview Answer

> **Docker volumes provide ways to persist or share container data. The main types are named volumes, bind mounts, and tmpfs. Named volumes are Docker-managed and commonly used for persistent data, bind mounts map host files into containers, and tmpfs stores temporary data in memory. Docker networking allows containers to communicate with each other and external systems.**