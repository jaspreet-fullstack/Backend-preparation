## Ques1: What is Api versioning why we need it?

API versioning is a technique that we use to manage changes in APIs without breaking existing applications that consume them.

For example, suppose we have a single backend API used by multiple applications, such as an Order Management System, Mobile Application, and Admin Dashboard.

Now, if we change the existing API response structure, it might break the frontend applications because they are already dependent on the old response format.

To avoid this issue, we use API versioning.

For example, we can maintain `/api/v1/orders` for existing applications and introduce `/api/v2/orders` for new requirements.

V1 will continue returning the old response structure, while V2 will return the updated response structure. This allows both versions to work simultaneously without affecting existing clients.

There are different approaches to API versioning, such as URL-based versioning, query parameter versioning, and header-based versioning. In my projects, I would generally prefer URL-based versioning because it is simple and easy to understand.

We don't need to create a new version for every small change. We generally introduce a new version when there is a breaking change, such as removing or renaming fields or changing the response structure.

Once all existing clients migrate to the new version, we can deprecate the older version and eventually remove it after proper communication.

So, the main purpose of API versioning is to maintain backward compatibility and allow us to introduce new changes without breaking existing applications.

## Ques 2: What is Deprecation

**Deprecation** means officially announcing that a feature, API, or API version is still available and supported for now, but it is **planned to be removed or no longer supported in the future**.

For example, suppose we have:

`GET /api/v1/orders`

and we introduce:

`GET /api/v2/orders`

We don't immediately remove V1 because some existing applications may still be using it. Instead, we **deprecate V1**, inform the API consumers to migrate to V2, and give them a defined migration period.

After the agreed period, once consumers have migrated, we can **remove V1**.

So, the flow is:

**V1 Active → V1 Deprecated → Migration to V2 → V1 Removed**

**Interview one-liner:**

> "Deprecation means marking an existing API or feature as no longer recommended for new development and informing consumers that it will be removed or unsupported in the future, while keeping it available temporarily for migration."

