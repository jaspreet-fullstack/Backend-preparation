# Timeouts, Retries, and Idempotency

- **Timeout**: the maximum time to wait for another service. Keep it within the total time allowed for the full request.
- **Retry**: try a failed operation again. Limit retries and wait longer between attempts (exponential backoff); add a small random delay (jitter) so clients do not all retry together.
- **Idempotency**: repeating an operation has the same result as doing it once.

## Interview reminders

- A timed-out write may have succeeded even if the reply was lost; retrying it could repeat the action.
- Use an idempotency key (a unique request ID) so the service can recognize and ignore a duplicate request.
- Do not retry at every service layer: retries can multiply traffic and make an outage worse.
- Decide which errors are retryable and stop after a limit.

## Short answer

Set a maximum wait, retry only likely temporary failures a limited number of times, and use a unique request ID when repeating an action must not repeat its effect.