# What happens when a user enters a URL in the browser

When a user enters a URL, the browser first checks its cache, then resolves the domain to an IP address using DNS. It establishes a connection to the server, using TCP for HTTP/1.1 and HTTP/2, or QUIC over UDP for HTTP/3. For HTTPS, TLS then secures the connection with encryption, integrity, and certificate-based server authentication. The browser sends an HTTP request, which may pass through a CDN (e.g., Cloudflare), WAF, firewall, reverse proxy, or load balancer before reaching the backend server. The CDN can serve cached content directly without contacting the backend. The backend authenticates the user, validates the input, runs the business logic, and may query a database such as PostgreSQL or MongoDB, often with a cache like Redis in front. It then returns an HTTP response: HTML for a page load, or usually JSON for an API request. Finally, the browser renders the page (DOM, CSSOM, layout, paint), and the frontend updates its state and UI with the data it received.


When you enter a URL such as:

https://example.com/products

the browser goes through roughly this flow:

Browser
   ↓
DNS
   ↓
IP Address
   ↓
TCP / QUIC Connection
   ↓
TLS (HTTPS)
   ↓
HTTP Request
   ↓
CDN / Cloudflare / WAF
   ↓
Load Balancer / Reverse Proxy
   ↓
Backend Server
   ↓
Database
   ↓
Backend Response
   ↓
Browser
   ↓
Render UI

## Step 1: Browser reads the URL
Example: `https://www.example.com/products`
- `https` = protocol (secure). Default port is **443**.
- `http` = not secure. Default port is **80**.
- `www.example.com` = the website name
- `/products` = the page you want


## Step 2: Browser checks its own memory (cache)
Before going anywhere, the browser asks: "Do I already have this page saved?"
- If yes and it's still fresh, it shows it immediately (fastest).
- If no, it continues to the next step.

## Step 3: DNS finds the address
DNS — Domain Name System
Computers communicate using IP addresses, but humans use domain names.
Computers understand IP addresses (like `34.120.10.5`), not names.
**DNS (Domain Name System)** is like a phone book: it converts
`example.com` → `34.120.10.5`.

The browser checks its cache, then the OS, then the ISP, and finally the DNS servers.
If the site uses a CDN, DNS gives the address of the **nearest CDN server**.


## Step 4: TCP builds the connection
After finding the IP, the browser needs a reliable connection with the server.

For traditional HTTPS over TCP, TCP establishes the connection using a 3-way handshake:
Browser and server say hello to each other first (called the **3-way handshake**):
1. Browser/Client: "Are you there?" (SYN)
2. Server: "Yes, are you ready?" (SYN-ACK)
3. Browser: "Yes, ready!" (ACK)

Now a reliable connection is open.

## Step 5: TLS/SSL makes it secure
**TLS = Transport Layer Security** (SSL is the older version).
- The server shows its **certificate** (like an ID card) to prove it is genuine.
- Browser and server agree on a secret key.
- From now on, all data is **encrypted**, so nobody in between can read it.
TLS secures communication between the browser and server by providing encryption, integrity, and authentication.

## Step 6: Browser sends the HTTP request

Once the connection is ready, the browser sends an HTTP request.

Example:

GET /products H
TTP/1.1
Host: example.com

The request can contain:

Method
URL/path
Headers
Cookies
Body, when applicable

Common methods:

GET     → Fetch data
POST    → Create/send data
PUT     → Replace/update data
PATCH   → Partially update data
DELETE  → Delete data

## Step 7: Request passes through the security and server layers
After the HTTP request is created, it may reach an edge/security layer before reaching your backend.

This layer can include:

CDN:- 
WAF
DDoS protection
TLS termination
Caching
Reverse proxy

cdn:- A CDN is a network of servers distributed across different locations.
Its main purpose is to deliver static/content resources from a location closer to the user.
For example:

User in India
      ↓
CDN Edge Server in India
      ↓
Cached image/CSS/JS

Instead of always requesting the original server:

User → AWS server in US

the CDN may serve cached content from a nearby edge location.

CDN commonly caches:
Images,CSS, JavaScript, Videos, Fonts
Static files
Interview answer:

A CDN distributes and caches content at edge locations closer to users, reducing latency and load on the origin server.

| Layer | Simple meaning | Job |
|-------|----------------|-----|
| **CDN** | Shops in many cities | Stores copies of files near the user, so the page loads faster. If it has the file (**cache hit**), the request stops here. If not (**cache miss**), it goes ahead. |
| **WAF** | Smart security guard | Checks the *content* of the request and blocks attacks like SQL injection, XSS, and bots. |
| **Firewall** | Main gate | Checks *who and where*: allows or blocks by IP address and port. |
| **Load Balancer** | Traffic police | Sends each request to a free, healthy server so no server gets overloaded. |
| **Server (GCP VM)** | The kitchen | Runs your code and prepares the response. |
| **Cache (Redis)** | Quick-access shelf | Keeps frequently used data, so the database isn't called every time. |
| **Database** | Storeroom | Stores the actual data. Used only if the cache doesn't have it. |

## Load Balancer

If you have multiple backend servers:

              ┌── Server 1
User → Load Balancer ├── Server 2
              └── Server 3

The load balancer distributes requests across healthy servers.

This improves:

Scalability
Availability
Fault tolerance

## Backend Server

The backend receives the request and processes it.

For example:
GET /api/products
Backend might use: Node.js

The response goes back through the same path.
- Status code: **200** OK, **301** redirect, **404** not found, **500** server error
- Body: HTML, CSS, JS, etc.
- The CDN and browser may save (cache) it for next time

## Step 9: Browser shows the page
This happens on the **user's device**, not on the server.
1. HTML becomes the **DOM** (page structure)
2. CSS becomes the **CSSOM** (styles)
3. Both combine into the **render tree**
4. Browser calculates **layout** (sizes and positions), then **paints** the pixels
5. JavaScript runs and can change the page
6. Images, CSS, and JS files are fetched with more requests
If using React/Next.js, rendering can involve:

CSR → Client-Side Rendering
SSR → Server-Side Rendering
SSG → Static Site Generation
Hydration → Attaching React behavior to server-rendered HTML


## Where caching happens
1. Browser cache (user's device)
2. DNS cache (browser, OS, ISP)
3. CDN cache (edge servers)
4. Redis / Memcached (application cache)
5. Database cache (inside the DB)

## "What is the difference between HTTP/1.1, HTTP/2 and HTTP/3"
HTTP/1.1 uses TCP and has limited request concurrency. 
HTTP/2 also uses TCP but introduces multiplexing, allowing multiple streams over a single connection, along with header compression.
HTTP/3 uses QUIC over UDP instead of TCP, providing multiplexed streams with less impact from packet loss and faster connection establishment in many situations.