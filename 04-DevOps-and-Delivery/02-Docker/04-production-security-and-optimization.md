# Docker Production Security and Optimization

## Security

- Run as a non-root user and grant only the Linux capabilities the process needs.
- Use minimal, maintained base images; pin versions or digests according to the update policy.
- Scan images and dependencies, rebuild for security updates, and track image provenance where required.
- Keep secrets out of source, build context, image layers, and logs. Inject secrets at runtime through a managed secret store.
- Do not mount the Docker socket into an application container; it grants powerful host control.
- Apply CPU and memory limits, read-only filesystems where possible, and network restrictions appropriate to the service.

## Runtime behavior

- A container should run one primary service process and handle `SIGTERM` gracefully so deployments can drain requests.
- Expose a health endpoint or health check that reflects whether the service can do useful work; distinguish liveness from readiness when the platform supports both.
- Send logs to stdout/stderr so the runtime can collect them; avoid writing important logs only into the container filesystem.
- Keep configuration external to the image so one image can move between environments.

## Image efficiency

- Use multi-stage builds to keep compilers and development dependencies out of runtime images.
- Use `.dockerignore` and order stable dependency steps before frequently changing source files to improve cache reuse.
- Measure image size and startup time; smaller is not automatically better if it harms security or reliability.
- Promote the same tested image digest from staging to production rather than rebuilding different bytes from the same tag.

## Interview answer

Discuss non-root execution, secret handling, minimal patched images, resource limits, signal handling, health checks, and immutable artifact promotion. Explain the risk each control reduces.
