# Docker Common Interview Questions

### 1. What is the difference between an image and a container?

An image is a read-only packaged template; a container is a running process created from that image with an isolated writable layer and runtime configuration.

### 2. How are containers different from virtual machines?

Containers isolate processes while sharing a host kernel. VMs virtualize hardware and run a guest OS, giving a different isolation and resource model.

### 3. What is a Docker image layer?

A layer is a reusable filesystem change produced during an image build. Build cache can reuse unchanged steps; order instructions so stable dependencies are built before frequently changing source.

### 4. Why use a multi-stage build?

It separates build tools and intermediate output from the runtime image, often reducing size and attack surface.

### 5. What belongs in `.dockerignore`?

Files that are not needed to build the image, such as `.git`, local dependencies, logs, and local secrets. This also keeps the build context small and prevents accidental secret inclusion.

### 6. How should persistent data be stored?

Use a volume or external storage rather than relying on a container's ephemeral writable layer. Back up persistent data separately.

### 7. How do containers communicate?

Attach them to an appropriate Docker network; on a user-defined network, services can generally resolve one another by name. Publish ports only when access from the host or outside network is needed.

### 8. How do you pass secrets to containers?

Do not bake secrets into images or source. Inject them at runtime using a managed secret facility with least-privilege access.

### 9. Is Docker Compose a production orchestrator?

Compose is useful for local multi-container environments and some simple deployments, but it does not replace a scheduler designed for production health management, rescheduling, and cluster-level scaling.

### 10. How should a container handle shutdown?

Run the application so it receives termination signals, stop accepting new work, drain in-flight requests, and exit before the platform's shutdown deadline.
