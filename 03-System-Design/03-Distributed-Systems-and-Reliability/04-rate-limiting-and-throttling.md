# Rate Limiting and Throttling

**Rate limiting** sets how many requests a user, client, or endpoint can make in a time period. **Throttling** slows or rejects requests when a service is too busy.

## Common algorithms

| Algorithm | How it works | Main tradeoff |
| --- | --- | --- |
| **Fixed Window Counter** | Counts requests in set time blocks, then resets the count. | Simple and uses little memory, but users can send a burst at a block boundary. |
| **Sliding Window Log** | Saves each request time and counts requests in the most recent time period. | Accurate, but saves more data and needs more work. |
| **Sliding Window Counter** | Estimates the recent request count using parts of the current and previous time blocks. | Uses less memory than the log, but is an estimate. |
| **Token Bucket** | Tokens refill over time at fixed rate; each request uses one token. | Allows short bursts up to the bucket size while limiting the average rate. |
| **Leaky Bucket** | Holds requests in a queue and sends them out at a steady rate. | Smooths traffic, but adds waiting time; rejects requests if the queue is full. |

```text
Refill tokens over time
			 |
		 [o o o] -- request uses token --> allow
			 |
		  [empty] -- request -----------> reject or wait
```

## Interview reminders

- Choose who or what the limit applies to: for example, a user, client key, IP address, or endpoint.
- Decide whether each server counts requests separately or all servers share one count.
- Tell rejected clients they sent too many requests (HTTP 429) and, if possible, when to try again.
- Rate limiting protects capacity and fairness; it does not replace authentication or authorization.

## Short answer

Choose an algorithm based on whether the system should allow bursts, how exact the count must be, and how much memory it can use. Explain how limits are shared across servers and what response the client receives.