## Backend Production Foundation

## 1. Timeouts 
A timeout defines how long your application should wait for an operation before giving up.
- Timeouts are the time limit for a request to complete.
- If a request takes too long to complete, it will be aborted.
- Timeouts are important to prevent requests from hanging indefinitely. 

**Example:** setTimeout(() => {
  console.log('Timeout');
}, 5000);

** Interview Answer: ** 
A timeout prevents a request from waiting indefinitely for a dependency. 
In production, I set appropriate timeouts for database queries, HTTP calls, external APIs, and other network operations. 


## 2. Retries
- A retry defines how many times your application should try to complete an operation before giving up.
- If an operation fails, it will be retried.
- If an operation fails multiple times, it will be aborted.
- But retry only for GET requests, not for POST, PUT, DELETE requests.

**Example:** fetch(url, {
    method: 'GET',
    retry: 3
});


## 3. Graceful Shutdown
A graceful shutdown is a process of shutting down your application in a way that is safe and without data loss.
- If an application is shutting down, it should not lose any data, connection,session,etc.

**Example:**: 
Now you're deploying a new version.

You don't want to suddenly kill the server.
You want to let the server finish the current requests and then shut down.

**Example:**
server.close(() => {
  console.log('Server is shutting down');
});

## 4. Load Balancing
- Load balancing is a technique to distribute traffic across multiple servers to improve performance and availability.
- Load balancing is important to prevent a single server from becoming a bottleneck.

**Example:**
loadBalancer.addServer(server1);
loadBalancer.addServer(server2);


## 5. Health Checks
- Health checks are a way to check the health of a server.
- Health checks are important to prevent a server from becoming unhealthy.
- A load balancer or Kubernetes can call a health check endpoint to check the health of a server.

**Example:**
server.get('/health', (req, res) => {
  res.send('OK');
});

if the health check endpoint is not responding, the load balancer or Kubernetes will consider the server unhealthy and will stop sending traffic to it

** Interview Answer: ** 
Health checks ensure server availability and prevent downtime during updates.



## 6. Readiness Checks
- Readiness checks are a way to check if a server is ready to accept traffic.
- Readiness checks are important to prevent a server from becoming unresponsive.
- A load balancer or Kubernetes can call a readiness check endpoint to check if a server is ready to accept traffic.
- Readiness is slightly different from health/liveness.
- Readiness asks: "Is this application ready to receive traffic?"
- Health/liveness asks: "Is this application alive?"

**Example** 
server.get('/readiness', (req, res) => {
  res.send('OK');
});

if the readiness check endpoint is not responding, the load balancer or Kubernetes will consider the server not ready and will stop sending traffic to it

## 7. Config and Secrets
- Config and secrets are a way to store configuration and sensitive data.
- You should not hard-code production configuration or secrets inside your source code.
- You should use a configuration management tool to store and manage your configuration and secrets.
- You should use a secret management tool to store and manage your secrets.

**Configuration might look like this:** 
{
    PORT: 3000,
    DATABASE_URL: 'mongodb://localhost:27017/mydatabase',
    REDIS_URL: 'redis://localhost:6379',
    API_URL: 'https://api.example.com',
    NODE_ENV: 'production',
};

** Secrets might look like this: ** 
{
    DATABASE_PASSWORD: 'mysecretpassword',
    API_KEY: 'myapikey',
    API_SECRET: 'myapisecret',
    API_TOKEN: 'myapitoken',
    API_TOKEN: 'myapitoken',
}

## 8. Logging
- Logging is a way to log the performance of a server.
- Logging is important to prevent a server from becoming unresponsive.
- Logging is important to debug, monitor, audit, comply with regulations, improve the security, performance, scalability, reliability of the server.
- Logging is important to monitor the server.

**Example:** 
logger.info('Server is running');
logger.error('Server is not running');
logger.warn('Server is slow');
logger.debug('Server is busy');
logger.trace('Server is down');

## 9. Backward-Compatible Deployments:
- Backward-compatible deployment means the new application version continues to support existing clients, APIs, and data formats during the transition.
- This is important because old and new versions of an application may temporarily run at the same time.
- For database changes, an expand-and-contract approach can be used so old and new application versions can safely coexist.

Example
Old Frontend ─────┐
                  ├──> New Backend
New Frontend ─────┘

The new backend should continue supporting the old frontend until all clients have migrated.

Database Example

Instead of immediately removing an existing column:

1. Add the new column
2. Deploy code supporting old + new structure
3. Migrate the data
4. Update all clients
5. Remove the old column later

This is commonly called an expand-and-contract migration.

## 10. Monitoring
- Monitoring is a way to monitor the performance of a server.
- Monitoring is important to prevent a server from becoming unresponsive.

**Example:**
monitor.log('Server is running');
monitor.log('Server is not running');
