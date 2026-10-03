# Object Storage

**Object storage** holds large files such as images, documents, backups, and videos. Each file is stored as an object with a unique key (its name or ID) and optional details, called metadata.

## When it fits

- Files that are too large or awkward to store in regular database rows.
- File storage that can grow separately from the application servers.
- File delivery through a CDN, or direct upload/download with controlled access.

## Common services

| Service | Organization | Common large-file upload approach |
|---|---|---|
| **Amazon S3** | Objects are stored in buckets and addressed by object keys. | S3 Multipart Upload: start an upload, upload numbered parts, then complete the upload with the part numbers and ETags returned for those parts. |
| **Azure Blob Storage** | Blobs are stored in containers within a storage account. Block blobs are commonly used for files. | Stage blocks with block IDs, then commit the ordered block list to create the blob. |

Both services support access control, metadata, lifecycle management, and temporary scoped access links (presigned URLs in S3; SAS URLs in Azure). These are examples of the same object-storage design pattern, though their APIs and limits differ.

## Signed and Presigned URLs

A **signed URL** is a URL with a cryptographic signature that the storage service can verify. The signature proves the request was authorized and its signed parameters have not been changed.

A **presigned URL** is AWS S3's term for a signed URL created ahead of time by a trusted application. It grants limited access to a specific object and action, such as uploading with `PUT` or downloading with `GET`, for a limited time. The client can use it directly without receiving the application's cloud credentials. For multipart uploads, the application can issue a separate presigned URL for each part.

```text
Client -> Application: request access to a file
Application -> Client: short-lived URL for one object/action
Client -> Object storage: use URL to upload or download directly
```

Azure provides a similar mechanism with a **Shared Access Signature (SAS)** URL. A SAS token grants scoped, time-limited permissions; it is similar in purpose to an S3 presigned URL, but uses Azure's SAS terminology and authorization model.

Treat these URLs like temporary credentials: anyone who obtains one may use its permissions until it expires. Restrict the object, operation, and expiry; use HTTPS; and avoid exposing URLs in logs, analytics, or public pages.

## Multipart / Chunked Uploads

For a large file or unreliable network, split the file into parts and upload them independently. The client can retry only failed parts and may upload several parts in parallel, avoiding the need to restart the whole file.

```text
Client -> Application: request upload session
Application -> Client: upload ID + temporary, scoped part URLs
Client -> Object storage: upload parts (retry failed parts)
Client -> Application: finish upload + part identifiers/checksums
Application -> Object storage: validate and complete/commit parts
Application -> Database: mark file as complete
```

### Typical process

1. The client asks the application to start an upload. The application authenticates the user, checks file permissions and expected size/type, and creates an upload session.
2. The application returns an upload ID and short-lived, narrowly scoped URLs or credentials for the parts. The client uploads directly to object storage so large file bytes do not pass through application servers.
3. The client uploads parts with stable part numbers or block IDs. It records each successful part's provider-returned identifier and retries only failed parts with bounded retries and backoff. Use supported checksum features to verify integrity; an S3 multipart ETag is not necessarily a whole-object checksum.
4. The client asks the application to finish, sending the upload ID and the successful part list. The application verifies ownership, expected parts, size, and checksums where supported.
5. The application completes the multipart upload in S3 or commits the block list in Azure. Only after successful completion should the file be marked available in application metadata.

### Failure handling and security

- Keep upload-session state and the list of completed parts so a client can resume after a disconnect.
- Limit part size, parallelism, total file size, and session lifetime; exact service limits depend on the provider.
- Make start/finish operations safe to retry, and do not expose the object as complete before the provider confirms completion.
- Abort abandoned uploads and configure lifecycle cleanup for incomplete multipart uploads or uncommitted blocks where supported, so they do not consume storage indefinitely.
- Use short-lived scoped credentials or signed URLs; do not put permanent cloud credentials in a client.
- Validate file ownership, expected content type, final size, and checksums. Do not trust a filename or client-supplied metadata as proof that a file is safe.

## Interview tradeoffs

- Store searchable details and file ownership in a database when needed.
- Signed and presigned URLs provide temporary, scoped access; see [Signed and Presigned URLs](#signed-and-presigned-urls).
- Decide how long files are kept and how the system handles a file being changed or deleted while its database record still exists.

## Interview answer

Keep large files in object storage and save searchable details separately when needed. In an interview, explain who can access a file, how it is delivered, and how old files are removed.