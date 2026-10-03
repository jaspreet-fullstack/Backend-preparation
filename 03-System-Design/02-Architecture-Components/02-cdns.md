# Content Delivery Networks (CDNs)

A **CDN** is a network of servers in different locations. It stores copies of cacheable files near users, making delivery faster and reducing requests to the origin (the main server).

## Key points

- Commonly used for images, scripts, stylesheets, downloads, and other cacheable responses.
- A cache key identifies which request a saved copy belongs to. TTL (time to live) says how long to keep it before it expires.
- Remove old copies by letting them expire, clearing them directly, or changing the file's versioned URL.
- Private or user-specific responses must not be shared across users accidentally.
- If the CDN has no saved copy (a cache miss), it asks the origin, which still needs capacity for that traffic.

## Cloudflare and Amazon CloudFront

Both are globally distributed CDN services that cache content at edge locations close to users. They can also proxy requests to an origin, but they fit naturally into different ecosystems:

| | Cloudflare | Amazon CloudFront |
|---|---|---|
| Common role | CDN and edge network platform, often also providing authoritative DNS, reverse proxying, DDoS protection, and WAF features | AWS CDN configured with a distribution and one or more origins, such as S3, an ALB, or a custom web server |
| Good fit when | You want CDN and edge security features in front of origins across cloud providers | Your origin and security setup are primarily in AWS and you want AWS service integrations |
| Example | Cache public images and protect a public website/API at the edge | Serve a static site from S3 or cache assets for an application behind an ALB |

The choice depends on existing infrastructure, security needs, pricing, and operational requirements. Both can cache content and reduce origin load; neither makes private, user-specific responses safe to cache unless cache rules are configured correctly.

## Interview answer

Use a CDN for files that can safely be copied near users. It can make delivery faster and reduce work for the main server; keep copies fresh and never expose one user's private response to another.