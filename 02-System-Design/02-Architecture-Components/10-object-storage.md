# Object Storage

**Object storage** holds large files such as images, documents, backups, and videos. Each file is stored as an object with a unique key (its name or ID) and optional details, called metadata.

## When it fits

- Files that are too large or awkward to store in regular database rows.
- File storage that can grow separately from the application servers.
- File delivery through a CDN, or direct upload/download with controlled access.

## Interview tradeoffs

- Store searchable details and file ownership in a database when needed.
- A **signed URL** is a temporary link that grants limited access to a file.
- Decide how long files are kept and how the system handles a file being changed or deleted while its database record still exists.

## Interview answer

Keep large files in object storage and save searchable details separately when needed. In an interview, explain who can access a file, how it is delivered, and how old files are removed.