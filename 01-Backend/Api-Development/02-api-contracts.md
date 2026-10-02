# API Contracts, Validation, and Serialization

## 1. What is an API contract?

An API contract defines the expected request and response structure between a client and a server.

It typically specifies:

* Fields
* Data types
* Required fields
* Validation rules
* Response structure
* Error format
* Behavior such as status codes and pagination

The contract is the agreement both sides rely on so the API behaves predictably.

### Interview Answer

> An API contract is the agreed request and response shape between a client and a server. It covers fields, types, required data, validation, response format, errors, and expected behavior such as status codes.

---

## 2. What is validation?

Validation checks whether incoming data satisfies the expected structure, type, format, and business rules before it is processed.

Invalid data should be rejected early, usually with a client-error status such as `400` or `422`, so the application does not process bad input.

---

## 3. What are the types of validation?

| Type | One-line definition |
| --- | --- |
| Required field validation | Checks whether mandatory fields are present in the request. |
| Type validation | Checks whether a value has the expected data type, such as string, number, boolean, or array. |
| Format validation | Checks whether a value follows a required format, such as email, UUID, URL, or date. |
| Length validation | Checks whether a string or collection satisfies minimum or maximum length requirements. |
| Range validation | Checks whether a numeric or date value falls within an allowed minimum or maximum range. |
| Pattern validation | Checks whether a value matches a predefined pattern or regular expression. |
| Structural validation | Checks whether the request has the expected object structure, nested fields, and data shape. |
| Business validation | Checks whether the request is allowed according to application or domain-specific rules. |
| Cross-field validation | Checks whether multiple fields satisfy a rule when considered together. |
| Uniqueness validation | Checks whether a value does not already exist where uniqueness is required. |

Example:

```json
{
  "email": "user@example.com",
  "age": 25
}
```

Here, validation can check that `email` is present and well-formed, `age` is a number in an allowed range, and the overall object has the expected shape.

### Interview Answer

> Validation checks incoming data against the API contract before processing. It includes required fields, types, formats, structure, uniqueness, and business rules so invalid requests fail early.

---

## 4. What is serialization?

Serialization converts application data or objects into a representation suitable for transmission or storage, such as JSON.

Example:

```text
Application object
  → serialize
  → JSON sent in the HTTP response
```

### Common types of serialization

* JSON
* XML
* Protocol Buffers
* MessagePack
* YAML
* Form-encoded data

JSON is the most common format for REST APIs.

---

## 5. What is deserialization?

Deserialization converts data received from an external representation, such as JSON, into an application object or usable internal data structure.

Example:

```text
JSON request body
  → deserialize
  → application object
  → validate
  → process
```

Serialization and deserialization are inverse operations: one prepares data to send, the other turns received data back into something the application can use.

### Interview Answer

> Serialization converts internal objects into a format such as JSON for transmission or storage. Deserialization converts received JSON (or another format) back into application objects.

## What is the difference between offset and cursor pagination?

Both are used for pagination, so they can look the same at first. The real difference is how the next page is located.

Offset pagination uses a number to skip a specific number of records and then returns the next set of records.

Suppose we have 10,0000 users:

```
1  2  3  4  5  6  7  8  9  10, .... ,10,000

we want 10 users per page

Request Page 2:
GET /users?limit=10&offset=10

Output:

Skip 10
↓
Give me 11–20

So:

offset = 0 → start from the beginning

```
Cursor means “start from this particular record and give me the next records.

```
Example:
Request

GET /users?limit=3&after=3

Offset is simpler and supports direct page navigation, while cursor pagination is generally better for large or frequently changing datasets because it avoids large offsets and provides more stable pagination. 

With cursor pagination, the API returns a nextCursor with the first response, and the client sends that cursor in the next request to continue from the previous position.

**Simple:**

Offset tells the database how many records to skip, while a cursor tells it where to continue from.