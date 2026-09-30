# Content Delivery Networks (CDNs)

A **CDN** is a network of servers in different locations. It stores copies of cacheable files near users, making delivery faster and reducing requests to the origin (the main server).

## Key points

- Commonly used for images, scripts, stylesheets, downloads, and other cacheable responses.
- A cache key identifies which request a saved copy belongs to. TTL (time to live) says how long to keep it before it expires.
- Remove old copies by letting them expire, clearing them directly, or changing the file's versioned URL.
- Private or user-specific responses must not be shared across users accidentally.
- If the CDN has no saved copy (a cache miss), it asks the origin, which still needs capacity for that traffic.

## Interview answer

Use a CDN for files that can safely be copied near users. It can make delivery faster and reduce work for the main server; keep copies fresh and never expose one user's private response to another.