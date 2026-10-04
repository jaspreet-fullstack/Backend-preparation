# GitHub Pull Requests and Collaboration

Git is the version-control system; GitHub is a hosting and collaboration platform built around Git repositories.

## Typical pull-request flow

```text
Create branch -> Commit changes -> Push branch -> Open pull request
      -> Review + automated checks -> Approve -> Merge -> Delete branch
```

A pull request (PR) proposes changes for review before they are merged. Reviewers discuss correctness, design, tests, security, and maintainability. Status checks can require tests, linting, and other automation to pass before merge.

## Collaboration controls

- Use protected branches to require reviews and passing checks for important branches.
- Keep PRs focused and small enough to review; describe behavior changes and testing clearly.
- Use CODEOWNERS or team rules to route reviews to maintainers.
- Resolve review feedback and keep the branch current according to the team's merge/rebase policy.
- Store credentials in a secret manager or GitHub Actions secrets, never in commits or PR comments.

## GitHub platform concepts

- **Repository:** Hosted Git history plus issues, PRs, settings, and automation.
- **Fork:** A separate copy under another account or organization, often used for external contributions.
- **Issue:** Tracks a bug, feature, or task; a PR can link to an issue.
- **Release/tag:** A named point in history used to identify a version; tags are not a substitute for verified build artifacts.

## Interview answer

Git records source history; GitHub adds remote hosting, review workflows, access controls, issues, and automation. Explain how branch protections and required checks prevent unreviewed or failing changes from reaching the main branch.
