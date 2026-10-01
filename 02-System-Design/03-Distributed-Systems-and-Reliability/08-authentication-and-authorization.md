# Authentication and Authorization

**Authentication** verifies who a user or service is. **Authorization** decides what that identity is allowed to do.

## Key points

- Check a user's login or a service's identity, then check that it is allowed to perform the requested action on the requested data.
- Give each user and service only the access it needs (least privilege).
- Protect passwords and tokens while they travel over the network and while they are stored. Never put secrets in logs or URLs.
- When services call one another, pass identity safely and check access at the service that owns the data.
- Enforce access rules on the server; a client-side check alone can be bypassed.

## Interview answer

First check who is making the request (authentication), then check what they may do (authorization). Give only the access needed and enforce the check on the server.