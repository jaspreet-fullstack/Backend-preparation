## What is Protocol

A protocol is a predefined set of rules and standards that allows two or more systems to communicate.
It defines how data is formatted, transmitted, received, and interpreted. For example, HTTP defines how clients and servers communicate over the web, while TCP provides reliable data transmission between systems.

## Type of protocols
HTTP, HTTPS , TCP, UDP, SMPT, FTP,Websocket, SSH

## HTTP Caching
Http caching is way to cache http response basically and reuse it later, instead of requesting the same resource from the server every time.
-- HTTP caching = store a response temporarily so future requests can be served faster.

**HTTP caching headers**
## -- 1. Cache-Control:- Cache-Control: max-age=3600
The response can be considered fresh for 3600 seconds (1 hour).

-- Cache-Control: no-cache  
you must validate it with the server before reusing it.

-- Cache-Control: max-age=600  (The cached response can be considered fresh for 600 seconds. )
-- Cache-Control: public, max-age=3600 (The response can be cached by shared caches such as CDNs. useful for images,css,js)
-- Cache-Control: private, max-age=600  ( The response contains user-specific or sensitive data. It can only be cached by the end-user's local browser or device)

## --2. ETag  
Basically through this we can check response is changed or not.
If the content is unchanged, the server replies with an empty 304 status code instead of resending the entire file, saving bandwidth

## --2. Last-Modified: Wed, 21 Oct 2026 07:28:00 GMT

-  The server delivers the resource along with a timestamp of when it was last changed.
-  When the browser needs the resource again, it sends that exact timestamp back to the server inside an If-Modified-Since request header:

## Q: What is HTTP caching?
HTTP caching is a mechanism where HTTP responses are stored by clients, proxies, or CDNs and reused for subsequent requests. It reduces latency, bandwidth usage, and server load. HTTP caching is controlled mainly through headers such as Cache-Control, ETag, and Last-Modified.

## Q. What is idempotent and non-idempotent
idempotency is when repeating the same request produces the same reponse,
requests can be retried because of: Network failures
Timeouts
Client retries
Load balancer retries
Duplicate requests

**Non-Idempotent**: Post as it used to create new item.

## Q. Which HTTP methods are idempotent?
GET, HEAD, PUT, DELETE,OPTIONS

## Q: HTTP caching vs Redis caching
--HTTP Cache: Usually caches the HTTP response.  
--Redis Cache:- Usually caches application/server data.
--HTTP caching reduces network/server work.
--Redis/application caching reduces backend/database work. 

## Q. What is HTTP Content Negotiation?
 Content negotiation is the process through which a client and server determine the representation format of a resource, such as JSON, XML, or HTML.

## Q.What is Content-Type?

Content-Type specifies the media type of the request or response body.