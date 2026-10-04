# Docker Containers, Images, and Virtual Machines

Docker packages an application with its runtime dependencies into an image that can be started as one or more containers.

## Key terms

- **Image:** Read-only template made of filesystem layers and configuration.
- **Container:** A running, isolated process created from an image. It can be stopped and recreated; writable container state is generally ephemeral.
- **Registry:** Stores and distributes images, such as Docker Hub or a private registry.
- **Dockerfile:** Instructions used to build an image.
- **Docker Engine:** Builds images and creates/runs containers using operating-system isolation features.

## Containers vs. virtual machines

| Containers | Virtual machines |
|---|---|
| Isolate processes while sharing the host kernel | Virtualize hardware and run a guest operating system |
| Usually start quickly and use fewer resources | Provide a separate guest OS boundary and usually use more resources |
| Require compatible host-kernel capabilities | Can run a different supported guest OS on a hypervisor |

Containers are not full virtual machines. Isolation depends on host configuration and should not be treated as a security boundary without hardening.

## Image-to-container flow

```text
Dockerfile -> build -> Image -> run -> Container process
                         |
                         `-> push/pull through registry
```

## Why teams use containers

- Consistent runtime and dependencies across local, test, and production environments.
- Repeatable deployments and easy horizontal replication.
- Clear packaging boundary between application and host.

Containers do not automatically make an application scalable, secure, or highly available. Those properties depend on orchestration, configuration, resource limits, health checks, and application design.

## Interview answer

An image is the packaged template; a container is an isolated process created from it. Explain what belongs in the image, what should be mounted or injected at runtime, and how the same immutable image moves through environments.
