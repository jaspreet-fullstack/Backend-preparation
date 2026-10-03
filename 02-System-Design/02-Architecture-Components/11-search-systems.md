# Search Systems

A dedicated **search system** builds a searchable copy of data. It supports searching words in text, sorting results by relevance, filtering, and counting results.

## Key points

- The search copy may update after the main database, so a new or changed item may not appear immediately.
- Keep the main database as the authoritative copy; the search index is only a copy built for searching.
- Plan how to rebuild the search copy and handle records that change or are deleted.
- Use a database for updates that must be exact; use search when people need flexible text searches and useful result ordering.

## Elasticsearch and OpenSearch

**Elasticsearch** and **OpenSearch** are distributed search engines used for full-text search, relevance ranking, filters, and aggregations. They are useful when a relational database's built-in search is not enough for the required query flexibility, relevance, or search scale. For simple search and modest traffic, database full-text search may be sufficient.

Keep the primary database as the source of truth and treat the search index as a derived, rebuildable copy. A common indexing flow is:

```text
Application -> Primary database -> Outbox / CDC -> Queue -> Indexer -> Search index
User query -> Search API -> Elasticsearch / OpenSearch -> Ranked results
```

In an interview, cover these decisions:

- **Consistency:** Indexing is often asynchronous, so results may briefly be stale. Use the database for operations that require authoritative, current data.
- **Data pipeline:** Propagate creates, updates, and deletes reliably. Make indexing idempotent, retry failures, and monitor queue depth and indexing lag.
- **Relevance and schema:** Choose document fields, analyzers/tokenization, filters, and ranking signals to match actual search requirements.
- **Scaling and availability:** Search engines distribute indexes across shards and can replicate them. Explain how you would size and monitor the cluster; too many small shards add overhead.
- **Rebuilds:** Keep enough source data to recreate the index. For schema changes, build a new index and switch an alias after validation rather than leaving the application on a partially rebuilt index.
- **Technology choice:** Elasticsearch and OpenSearch address similar distributed-search problems. Choose based on required features, hosting environment, ecosystem, support, and operational constraints.

## Interview answer

Add a search system when users need flexible full-text queries, filters, or relevance-ranked results beyond what the primary database can efficiently provide. Elasticsearch or OpenSearch can serve those queries, while the database remains authoritative. Explain the indexing pipeline, acceptable indexing delay, relevance model, failure recovery, and how to rebuild the index.