# Circuit Breakers and Backpressure

A **circuit breaker** is a guard around calls to another service. If too many calls fail, it temporarily stops sending new calls so the problem does not spread and the other service can recover.

## Circuit breaker states

- **Closed**: calls flow normally; the system counts failures.
- **Open**: calls stop for a short time and may use a backup response instead.
- **Half-open**: a few test calls check whether the other service is working again.

```text
Closed --failure threshold--> Open
Open --cooldown-------------> Half-open
Half-open --success---------> Closed
Half-open --failure---------> Open
```

**Backpressure** protects a busy service from receiving more work than it can handle. It can slow the sender, limit the waiting queue, or reject extra work.

```text
Producer -> [bounded queue] -> Consumer
			   |
		   queue full
			   v
		slow or reject producer
```

## Interview distinction

A circuit breaker stops calls to a failing service; backpressure slows or rejects incoming work when a service is overloaded. In an interview, explain when each activates, what happens to rejected work, and how normal operation resumes.

## Short answer

A circuit breaker limits calls to a failing dependency; backpressure limits incoming work when a service is overloaded. Explain how each recovers and what happens to the affected requests.