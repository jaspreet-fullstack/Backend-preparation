# Observability: Logs, Metrics, and Traces

- **Logs** are records of events, such as an error or a user action.
- **Metrics** are numbers measured over time, such as request count, error count, and response time.
- **Traces** follow one request through several services and show where it slowed down or failed.

## Interview reminders

- Give each request an ID so its logs and trace can be found across services.
- Track what users notice, such as availability and response time, and alert when targets are missed.
- Watch for services reaching their limits, such as a full queue or exhausted connections.
- Do not put passwords, tokens, or unnecessary personal details in logs.

## Short answer

Logs explain what happened, metrics show whether the system is getting better or worse, and traces show where a request spent its time. Together they help teams find and fix problems.