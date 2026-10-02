## API Lifecycle

API lifecycle covers how an API is designed, changed, maintained, and eventually replaced without unnecessarily breaking existing clients.

## 1. API Versioning

API versioning means maintaining different versions of an API so that we can change or improve the API without unexpectedly breaking existing clients.

For example, imagine your current API returns:

```
Request: 
GET /api/users/123

Response:

{
  "id": 123,
  "name": "Jaspreet"
}

Later, want to change the response:

{
  "userId": 123,
  "fullName": "Jaspreet Kaur"
}

```
`If existing frontend/mobile applications still expect id and name, changing the existing API can break those clients.`

Instead, you can create a new version:

```
/api/v1/users/123
/api/v2/users/123

Now:

v1 → old contract
v2 → new contract

```

Existing clients can continue using v1, while newer clients can move to v2.

## 3. Why Do We Need API Versioning?

Suppose we have one backend application, and its APIs are consumed by multiple frontend applications or repositories, such as:

1. Order Management System

2. Mobile Application

3. Admin Dashboard

4. Partner Application

All these applications consume the same backend APIs.

Now, if we directly modify an existing API's request or response structure, it might break the applications that are already using it.

To avoid this problem, we use API versioning.

## 3. What are Different approaches to API Versioning

**A URI/URL Versioning (Most common):**

This approach is simple, readable, and easy to maintain.

We include the version directly in the API URL.

```
/api/v1/users
/api/v2/users
/api/v3/users
```

**B Query Parameter Versioning:**

We pass the version as a query parameter.

/api/users?version=1
/api/users?version=2

**C Header-Based Versioning:**

We pass the API version through request headers.

GET /api/users
Accept: application/vnd.myapp.v2+json

The backend identifies the requested version from the header and returns the corresponding response.

**D. Custom Header Versioning:**
We can also use a custom header:

GET /api/users

API-Version: 2


## 4.Deprecation

Deprecation means marking an existing API or feature as no longer recommended for new development and informing consumers that it will be removed or unsupported in the future, while keeping it available temporarily for migration.

## 5. Backward compatibility
Backward compatibility means ensuring that new changes do not break existing clients or integrations that depend on the previous API contract. Api versioning is Backword compatibility.

## 6. Bulk operations 
It allow us to process multiple resources in a single API request, reducing network overhead and improving efficiency compared with making individual requests for every resource

## 7. Partial Update
A partial update allows a client to modify only specific fields of an existing resource without sending or replacing the entire resource. PATCH is commonly used for this purpose
