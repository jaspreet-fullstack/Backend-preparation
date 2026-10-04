# Jenkins

Jenkins is an automation server commonly used to run CI/CD pipelines. Teams host and operate a Jenkins controller and assign work to build agents.

## Architecture

```text
Git push / webhook
        |
        v
Jenkins controller -- schedules --> Build agent
        |                               |
        |                         checkout, test, build
        |                               |
        `---- status / logs <----- artifact -> registry
```

- **Controller:** Stores job configuration, coordinates scheduling, and presents UI/API. Avoid running untrusted heavy builds on the controller.
- **Agent:** Executes jobs in an environment with the needed tools; use isolated, preferably ephemeral agents for safer reproducible builds.
- **Jenkinsfile:** Pipeline-as-code stored with the application, usually written with Declarative or Scripted Pipeline syntax.
- **Plugins:** Extend integrations but add compatibility, maintenance, and supply-chain risk; keep the plugin set small and patched.

## Pipeline as code

```groovy
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
                sh 'docker build -t example/app:${BUILD_NUMBER} .'
            }
        }
    }
}
```

This is an illustrative pipeline: production should publish an immutable artifact, use managed credentials, and deploy through controlled environments rather than relying only on a build number tag.

## Operations and security

- Restrict controller and agent access; use a credentials store and narrow credential scope.
- Keep Jenkins and plugins patched, back up controller configuration, and test restore procedures.
- Separate jobs/agents by trust level; a job that executes repository code can run arbitrary commands on its agent.
- Prefer external artifact registries and log storage with retention policies.

## Interview answer

Describe controller/agent responsibilities, a version-controlled Jenkinsfile, isolated workers, credential handling, artifact publication, and the operational work of maintaining Jenkins and its plugins.
