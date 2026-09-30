# Search Systems

A dedicated **search system** builds a searchable copy of data. It supports searching words in text, sorting results by relevance, filtering, and counting results.

## Key points

- The search copy may update after the main database, so a new or changed item may not appear immediately.
- Keep the main database as the authoritative copy; the search index is only a copy built for searching.
- Plan how to rebuild the search copy and handle records that change or are deleted.
- Use a database for updates that must be exact; use search when people need flexible text searches and useful result ordering.

## Interview answer

Add a search system when users need to find words in content or see the most relevant matches first. Explain how data is copied from the main database and how you handle delays, updates, and rebuilding the search copy.