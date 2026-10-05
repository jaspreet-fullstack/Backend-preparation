# Jenkins

Jenkins is an **automation server used for CI/CD**.

It can automatically:

```text id="z5e8d3"
Code → Build → Test → Deploy
```

Jenkins is commonly used to automate software build, testing, and deployment processes.

---

# 1. Jenkins Architecture

```text id="f3m3kq"
Developer
    ↓
Git Push / Pull Request
    ↓
Jenkins Controller
    ↓
Jenkins Agent
    ↓
Build → Test → Deploy
```

### Controller

The **controller** manages Jenkins.

Responsibilities:

- Manage jobs/pipelines
- Schedule builds
- Assign jobs to agents
- Store Jenkins configuration
- Provide Jenkins UI

The controller usually **should not run heavy builds**.

---

### Agent

An **agent** is the machine that actually executes the pipeline.

For example:

```text id="0fqm4s"
Controller
    ↓
Agent
    ↓
npm install
npm test
docker build
```

Agents can have different environments/tools depending on the project.

---

### Jenkinsfile

A `Jenkinsfile` defines the CI/CD pipeline as code.

It is usually stored inside the Git repository:

```text id="w0i6q3"
my-project/
├── src/
├── package.json
└── Jenkinsfile
```

---

### Plugins

Jenkins uses plugins to add functionality.

Examples:

- Git
- Docker
- Kubernetes
- Slack
- AWS

Plugins allow Jenkins to integrate with different tools.

---

# 2. Jenkins Pipeline

A pipeline defines the steps Jenkins should execute.

Example:

```groovy id="z5j7gt"
pipeline {
    agent any

    stages {
        stage('Test') {
            steps {
                sh 'npm ci'
                sh 'npm test'
            }
        }

        stage('Build') {
            steps {
                sh 'docker build -t my-app .'
            }
        }
    }
}
```

Flow:

```text id="w2w0m6"
Git Push
   ↓
Jenkins
   ↓
Test
   ↓
Build
   ↓
Deploy
```

---

# 3. Common Jenkins Pipeline Stages

A typical backend pipeline might be:

```text id="p1ukj6"
Checkout Code
     ↓
Install Dependencies
     ↓
Lint
     ↓
Run Tests
     ↓
Build Application
     ↓
Build Docker Image
     ↓
Push Image to Registry
     ↓
Deploy
```

---

# 4. Jenkins Security

Important practices:

- **Protect Jenkins access** → Don't expose Jenkins publicly without proper security.
- **Use credentials securely** → Don't put passwords/API keys directly in Jenkinsfile.
- **Use least privilege** → Give jobs only the permissions they need.
- **Keep Jenkins and plugins updated** → Reduces security vulnerabilities.
- **Isolate agents** → Don't allow untrusted jobs to access sensitive systems.
- **Backup Jenkins configuration** → Helps recover Jenkins after failure.

---

# 5. Jenkins vs GitHub Actions

| Jenkins | GitHub Actions |
|---|---|
| Separate automation server | Built into GitHub |
| Usually self-hosted | GitHub-hosted runners available |
| Highly customizable | Easy GitHub integration |
| Uses Jenkinsfile | Uses YAML workflows |
| Requires Jenkins maintenance | Less infrastructure to manage |

---

## Interview Answer

> **Jenkins is an automation server commonly used for CI/CD. It has a controller that manages and schedules jobs and agents that execute those jobs. We define pipelines using a Jenkinsfile stored in the Git repository. A typical pipeline checks out code, installs dependencies, runs tests, builds the application or Docker image, pushes the image to a registry, and deploys it.**