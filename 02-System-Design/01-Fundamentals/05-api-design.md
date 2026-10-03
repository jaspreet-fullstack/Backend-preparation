# API Design

An API defines how a client asks a service to do something and what response it gets. In an interview, start from the main user actions and the data clients need.

## Quick checklist

- Identify resources and operations; use clear, consistent names.
- Define request fields, response shape, and relevant status codes.
- Decide how clients filter results and split large result sets into pages (pagination).
- Consider authentication, authorization, validation, and rate limits.
- Plan how the API can change without breaking existing clients (versioning).
- Decide what happens when a client retries. For payments, an idempotency key can stop the same request from charging twice.

## Example

```text
POST /v1/short-urls
Request:  { "url": "https://example.com/page" }
Response: { "shortUrl": "https://sho.rt/a1b2" }
```

## Interview reminder

Explain choices that affect the design, such as pagination, safe retries, and whether the client waits for a result or the work happens later.