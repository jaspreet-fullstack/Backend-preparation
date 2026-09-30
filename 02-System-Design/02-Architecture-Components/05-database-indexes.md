# Database Indexes

An **index** is a lookup structure that helps a database find matching rows without checking every row in the table.

## Key points

- Add indexes to columns used often to filter, join, or sort results.
- A combined index covers more than one column; its column order affects which searches it can speed up.
- Indexes can speed up reads, but take space and make inserts, updates, and deletes slower.
- An index on a column with very few different values may not help much.
- Check the database's query plan (how it will run the query) before adding an index.

## Interview answer

Find the most common or slow searches, then index the fields they use. Mention the extra storage and slower writes, and check that the database actually uses the index.