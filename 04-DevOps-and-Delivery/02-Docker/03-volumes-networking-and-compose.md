# Docker Volumes, Networking, and Compose

## Container storage

A container's writable layer is ephemeral. Data that must outlive the container belongs in persistent storage.

- **Named volume:** Managed by Docker and suited to persistent container data, such as a local development database.
- **Bind mount:** Maps a host path into a container, useful for local source-code development; it couples the container to the host filesystem.
- **Tmpfs:** Temporary in-memory mount for data that should not persist to disk.

Back up persistent data separately; a volume is not automatically a backup.

## Networking

Containers on a user-defined Docker network can discover each other by service/container name. Publish a port with `-p host:container` when a host or external client needs to reach it. Services within one private network can usually connect to each other without publishing every port to the host.

## Docker Compose

Compose defines a multi-container application in a YAML file. It is commonly used for local development and integration tests; production scheduling and high availability usually require an orchestrator or managed platform.

```yaml
services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgres://app:local-only@db:5432/app
    depends_on:
      db:
        condition: service_healthy
  db:
    image: postgres:17
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: local-only
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

The credentials above are for a local example only. Use environment-specific secret management outside local development.

## Interview reminders

- `depends_on` can order startup; use health checks or application retries to handle service readiness.
- Containers can be recreated, so do not rely on their writable layer for durable data.
- Compose is a development/deployment description, not by itself a production orchestrator.
