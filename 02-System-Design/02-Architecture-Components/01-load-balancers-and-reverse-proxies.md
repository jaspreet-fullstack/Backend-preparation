# Load Balancers and Reverse Proxies

A **reverse proxy** is a front door for backend services: it receives requests and passes them to the right service. A **load balancer** spreads requests across service instances and avoids ones that are unhealthy.

## Key points

- Layer 4 routing uses connection details such as IP address and port. Layer 7 routing can also use web request details such as host or URL path.
- Round robin takes turns; least connections picks the service with fewer active requests.
- A reverse proxy may route requests, check access, or handle TLS (the encryption setup for HTTPS).
- Use a backup or managed failover so one failed load balancer does not stop all traffic.

## Forward proxy vs. reverse proxy

- **Forward proxy:** Represents clients when they access external services. For example, a company can route employee web traffic through a forward proxy to enforce access policies, filter destinations, or log outbound requests.
- **Reverse proxy:** Represents backend servers when clients access an application. For example, a website can use a reverse proxy to terminate HTTPS and route requests to application servers without exposing those servers directly.

```text
Forward proxy: clients -> proxy -> external services
Reverse proxy: clients -> proxy -> backend servers
```

## AWS Application and Network Load Balancers

**ALB (Application Load Balancer)** and **NLB (Network Load Balancer)** are managed load balancers in AWS Elastic Load Balancing.

| | ALB | NLB |
|---|---|---|
| Layer | Layer 7 | Layer 4 |
| Traffic | HTTP and HTTPS | TCP, UDP, and TLS connections |
| Routing | Can route by host, path, and other HTTP request details | Routes connections using network information, not URL paths |
| Useful when | The application needs web-aware routing and features | The application needs high throughput, low latency, or static IP addresses |

### Use cases and examples

- **ALB:** Use for websites, web applications, and HTTP APIs that need host- or path-based routing. For example, route `shop.example.com/api` to an API service and `shop.example.com/images` to a separate service.
- **NLB:** Use for TCP or UDP services such as gaming, IoT, or legacy applications, especially when clients need stable IP addresses or the workload needs very high connection throughput. For example, direct TCP connections from devices to healthy ingestion servers.
- These are common architecture patterns, not recommendations tied to a specific company; select based on protocol, routing needs, and operational constraints.

```text
ALB: HTTP/HTTPS, Layer 7

Client
	|
	| HTTPS request
	v
ALB (host/path rules)
	|-- /api ------> API target group
	`-- /images ---> Image target group

NLB: TCP/UDP, Layer 4

Client or device
	|
	| TCP/UDP to NLB address
	v
NLB
	|---> Healthy target 1
	`---> Healthy target 2
```

ALB and NLB are AWS-managed services. NGINX and Envoy are proxy software that can be deployed and operated in different environments, including in front of or alongside cloud load balancers.

## NGINX and Envoy use cases

- **NGINX:** Often used at the edge of a system to terminate TLS, route requests by host or path, balance traffic across application servers, serve static files, and apply caching or rate limits.

```text
Browser
	|
	| HTTPS
	v
NGINX (TLS termination and HTTP routing)
	|-- /api -----> API servers
	`-- /static --> Static files or cache
```

- **Envoy:** Often used between services, commonly as a sidecar proxy in a service mesh. It can route service-to-service traffic and provide service discovery (finding and tracking available service instances and their network addresses as they change, often through a registry or DNS), retries, timeouts, circuit breaking, and telemetry.

```text
Service A app
	|
	v
Envoy sidecar A
	|
	| service-to-service traffic
	v
Envoy sidecar B
	|
	v
Service B app
```

- **Choosing between them:** Both can act as Layer 7 proxies. The right choice depends on the deployment and operational needs; NGINX is a common edge proxy, while Envoy is designed for dynamic service-to-service traffic and mesh integrations.

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