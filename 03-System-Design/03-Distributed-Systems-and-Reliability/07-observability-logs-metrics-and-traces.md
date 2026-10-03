# Observability: Logs, Metrics, and Traces

- **Logs** are records of events, such as an error or a user action.
- **Metrics** are numbers measured over time, such as request count, error count, and response time.
- **Traces** follow one request through several services and show where it slowed down or failed.

## Common Production Tools

These are widely used options, not a required stack. Choose based on the cloud provider, scale, budget, existing infrastructure, and operational skills.

| Area | Common tools | Typical role |
|---|---|---|
| Logs | Elastic Stack (Elasticsea
rch, Logstash, Kibana), Splunk, Grafana Loki, AWS CloudWatch Logs | Collect, search, retain, and analyze application and infrastructure logs. |
| Metrics | Prometheus with Grafana, Datadog, AWS CloudWatch Metrics | Collect time-series measurements, build dashboards, and alert on thresholds or service-level objectives. |
| Traces | OpenTelemetry with Jaeger or Grafana Tempo; Datadog APM, New Relic, or AWS X-Ray | Instrument and follow requests across services to find latency and errors. |
| Multiple signals | Datadog, New Relic, Dynatrace, Splunk Observability, or cloud-provider suites | Provide a managed experience across logs, metrics, traces, dashboards, and alerting. |

**OpenTelemetry (OTel)** is an open standard and set of SDKs and collectors for generating and exporting telemetry. It is not, by itself, a storage or dashboard product; telemetry can be sent to compatible backends such as Prometheus, Jaeger, Tempo, or commercial platforms.

Example self-managed stack: OpenTelemetry for instrumentation, Prometheus and Grafana for metrics and dashboards, Loki or Elastic for logs, and Tempo or Jaeger for traces. A managed platform can reduce the work of running and upgrading these components.

## Interview reminders

- Give each request an ID so its logs and trace can be found across services.
- Track what users notice, such as availability and response time, and alert when targets are missed.
- Watch for services reaching their limits, such as a full queue or exhausted connections.
- Do not put passwords, tokens, or unnecessary personal details in logs.

## Short answer

Logs explain what happened, metrics show whether the system is getting better or worse, and traces show where a request spent its time. Together they help teams find and fix problems.