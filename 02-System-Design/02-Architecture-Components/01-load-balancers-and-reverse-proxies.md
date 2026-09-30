# Load Balancers and Reverse Proxies

A **reverse proxy** is a front door for backend services: it receives requests and passes them to the right service. A **load balancer** spreads requests across service instances and avoids ones that are unhealthy.

## Key points

- Layer 4 routing uses connection details such as IP address and port. Layer 7 routing can also use web request details such as host or URL path.
- Round robin takes turns; least connections picks the service with fewer active requests.
- A reverse proxy may route requests, check access, or handle TLS (the encryption setup for HTTPS).
- Use a backup or managed failover so one failed load balancer does not stop all traffic.

## Request flow

```text
Client
	|
	v
Reverse proxy / load balancer
	|               |
	v               v
Service A       Service B
```

## Interview answer

A load balancer spreads traffic across healthy service instances. A reverse proxy receives requests for backend services and may also route traffic or handle HTTPS encryption.