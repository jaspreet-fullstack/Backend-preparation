## Ques1 Explain what an API endpoint is?
An API endpoint is a specific URL or URI through which a client communicates with a server to access a particular resource or perform an operation.

For example, GET /users/123 can be an endpoint used to retrieve a specific user. Similarly, POST /users can be used to create a new user.

An endpoint is usually defined by a combination of the HTTP method and the URL path, and it tells the server what operation the client wants to perform.

## Ques2: Can you explain the difference between SQL and NoSQL databases?
SQL and NoSQL are two different approaches to storing and managing data.

SQL databases are relational databases that store data in structured tables with predefined schemas. They support relationships between tables using keys and provide powerful querying capabilities using SQL. Examples include PostgreSQL and MySQL.

NoSQL databases are generally designed for more flexible data models. They can store data as documents, key-value pairs, wide-column data, or graphs, depending on the database. They are useful when we need flexible schemas, high scalability, or when the data doesn't fit naturally into a relational model. MongoDB is an example of a document-based NoSQL database.

For example, if I have a well-defined application with strong relationships between entities, such as customers, orders, and payments, SQL can be a good choice. If the data structure changes frequently or I need a flexible document-based model, NoSQL can be a better fit.

## Ques3: Can you describe a typical HTTP request/response cycle?
The HTTP request-response cycle is the process through which a client communicates with a server using HTTP.

First, the client sends an HTTP request to a specific API endpoint. The request contains information such as the HTTP method, URL, headers, and sometimes a request body.

The request reaches the server, where the application processes it. The server may perform authentication, validation, business logic, and database operations depending on the request.

After processing the request, the server sends an HTTP response back to the client. The response contains an HTTP status code, response headers, and usually a response body containing the requested data or an error message.

For example, when a client sends `GET /users/123`, the server processes the request, retrieves the user data from the database, and returns a response such as `200 OK` with the user information.

So, the basic flow is: **Client → HTTP Request → Server → Processing → HTTP Response → Client.**

## Ques4: How would you handle file uploads in a web application?
I would handle file uploads by first validating the file on the server, including its size, MIME type, extension, and other security-related checks.

For small files, the client can send the file to the backend using `multipart/form-data`. The backend validates the file and then uploads it to object storage such as Amazon S3 rather than storing the file directly on the application server.

For larger files, I would prefer a pre-signed URL approach. The backend generates a short-lived pre-signed URL, and the client uploads the file directly to S3. This reduces the load on the backend server and is more scalable.

After the upload succeeds, I would store the file metadata, such as the file key, original filename, size, MIME type, and upload information, in the database.

I would also consider security measures such as authentication and authorization, file-size limits, allowed file types, filename sanitization, malware scanning when required, and preventing users from directly executing uploaded files.

So the basic flow would be:

Client → Backend → Generate upload permission/URL → Object Storage → Store file metadata in Database.

For large-scale applications, I would generally prefer direct-to-object-storage uploads using pre-signed URLs.

`For file uploads, there are two common approaches.`

For smaller files, the client can send the file to the backend using `multipart/form-data`. The backend authenticates and authorizes the request and validates the file, such as its size, MIME type, and allowed extension. Then the backend uploads the file to Amazon S3, while we store the file metadata or S3 object key in the database.

For larger files or applications with high traffic, I would prefer using a pre-signed URL. In this approach, the client first requests an upload URL from the backend. The backend authenticates the user and generates a short-lived pre-signed URL for S3. The client then uploads the file directly to S3 using that URL, so the file does not need to pass through our backend.

After the upload is successful, we can store the S3 object key and other metadata in our database.

This approach reduces backend bandwidth and server load and is more scalable for large files.

## Ques5: What is pre-signed URL? Why we need this.
A pre-signed URL is a temporary URL that gives the client permission to upload or download a specific file from Amazon S3 without exposing our AWS credentials.

For example, when a user clicks an upload button, the frontend first calls our backend and requests an upload URL. The backend authenticates the user and generates a short-lived pre-signed URL for S3.

The frontend then uses that URL to upload the actual file directly to S3. So the file does not need to pass through our backend.

This reduces backend load and is especially useful for large files such as videos or images.



