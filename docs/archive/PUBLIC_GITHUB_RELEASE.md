# PUBLIC GITHUB RELEASE — COMPLETE SECURITY AUDIT AND PROJECT PREPARATION

## Your Role

Act as a senior software engineer, application security engineer, DevOps engineer, and open-source maintainer.

Your task is to inspect the ENTIRE project in the currently opened folder, fix its problems, improve its quality, and prepare it for a professional public GitHub release.

This is a real project intended for public visibility. Security and privacy are mandatory.

## 1. ABSOLUTE SECURITY REQUIREMENTS

**THE PROJECT MUST NOT CONTAIN ANY REAL SECRET OR PRIVATE INFORMATION WHEN PUBLISHED.**

This includes, but is not limited to:

- API keys and access tokens.
- Passwords and database credentials.
- JWT secrets, session secrets, and authentication keys.
- Private keys, certificates, and service-account credentials.
- Stripe or other payment-provider secret keys.
- Cloud-provider credentials and private deployment tokens.
- SMTP passwords and email-provider credentials.
- OAuth client secrets and refresh tokens.
- Production database URLs and connection strings.
- Private webhook URLs and signing secrets.
- Personal information, private customer data, and production records.
- Secret values embedded in source code, comments, configuration files, tests, documentation, or examples.
- Sensitive information contained in logs, local databases, backups, and generated files.
- Secrets exposed in Git history, branches, tags, or other repository objects that might be published.

Treat this requirement as a release-blocking condition.

Never print actual secret values in reports, terminal output, screenshots, or generated documentation. Identify findings by file, line number where safe, and secret category, using redacted values only.

Do not send project contents or credentials to external services for scanning.

## 2. PROTECT THE ORIGINAL PROJECT

The current folder is the public-release copy.

- Work only inside the currently opened project directory.
- Never modify the original Desktop project.
- Never access or modify unrelated project folders.
- Do not push, publish, deploy, or upload anything.
- Do not connect or push to any existing GitHub remote.
- Do not delete the folder named `.git_backup_private_history`.
- Do not restore the old Git repository.
- Do not execute destructive commands or remove files before checking their purpose.
- Preserve existing application functionality and user data.
- If you cannot confirm that an operation is restricted to the current project folder, stop and ask for approval.

The `.git` directory was previously renamed to `.git_backup_private_history`. This backup may contain private Git history and secrets. It must never be included in the public release.

## 3. INSPECT THE ENTIRE PROJECT

Analyze all relevant project files and folders, including:

- Frontend and backend source code.
- Package manifests, lockfiles, and dependency configuration.
- Environment configuration.
- Authentication and authorization.
- Database schemas, migrations, seeds, and connection handling.
- API endpoints and middleware.
- Payment integrations and external services.
- File uploads and storage.
- Logging and error handling.
- Tests and development tools.
- Docker and deployment configuration, if present.
- Documentation and GitHub-related files.
- Hidden files and directories.
- Existing build and test scripts.

Understand the actual architecture before changing anything.

Do not assume a technology, feature, or dependency is present without verifying it.

## 4. ENVIRONMENT FILES AND CONFIGURATION

The project has previously contained:

- `client/.env`
- `server/.env`

Inspect the project to identify every environment variable used by the application.

Perform the following:

1. Keep real environment files local and private.
2. Ensure real `.env` files are excluded by `.gitignore`.
3. Review `.gitignore` for all relevant environment-file naming patterns, including `.env`, `.env.local`, `.env.production`, and similar files.
4. Account for framework-specific environment variables and exceptions.
5. Create appropriate `.env.example` templates with variable names and safe placeholder values only.
6. Never copy real credentials into example files.
7. Separate frontend-public configuration from backend-only secrets.
8. Ensure private server credentials cannot be exposed through frontend code or client-side environment-variable prefixes.
9. Document how developers obtain their own credentials and configure the application.
10. Verify that the project can be configured without any real production credentials being committed.

Do not delete necessary local environment files merely to clean the public copy. Keep them private and excluded from the release.

## 5. SEARCH FOR SECRETS EVERYWHERE

Perform a thorough local inspection of:

- Source code and configuration.
- All tracked and untracked files.
- Hidden files and nested folders.
- Documentation and example code.
- Test fixtures and mock data.
- Logs, dumps, caches, and generated artifacts.
- Git metadata, if available and safe to inspect.
- The renamed `.git_backup_private_history` directory, without modifying it.

Look for hardcoded credentials, token formats, private URLs, sensitive connection strings, and suspicious high-entropy strings.

Use local scanning tools when available. Do not rely on a single regular expression or scanner.

Distinguish between real credentials, public identifiers, harmless test placeholders, and false positives.

Never expose the actual values in your report.

If a credential may have been exposed previously, recommend revoking or rotating it. Removing it from the current files is not enough to invalidate it.

## 6. GIT HISTORY AND PUBLICATION SAFETY

The previous Git metadata backup must remain private.

- Never include `.git_backup_private_history` in the public release.
- Do not create a new repository or connect a remote during this task.
- Determine whether any old Git history could accidentally be published.
- Explain how the final public repository can be initialized with a completely fresh Git history.
- Do not claim historical secrets are absent if the relevant history has not been inspected.
- Do not copy the old Git metadata into the new repository.
- Review nested repositories, submodules, and Git LFS configuration where applicable.
- Ensure the future public initial commit contains only explicitly approved release files.

A clean working tree does not prove that secrets were never committed previously.

## 7. FIX AND IMPROVE THE PROJECT

After establishing the security findings, improve the project within the current copied folder.

Prioritize:

- Fixing genuine bugs.
- Preserving existing working features.
- Improving code structure and maintainability.
- Removing unnecessary debug output and unused files when safe.
- Improving error handling and input validation.
- Reviewing authentication and authorization.
- Fixing unsafe database access and insecure API behavior.
- Improving dependency management.
- Ensuring configuration is reproducible.
- Improving accessibility and responsive design where relevant.
- Adding or improving appropriate tests.
- Avoiding unnecessary dependencies and overengineering.

Do not rewrite the entire application without a clear technical reason.

Do not replace working features with mock implementations.

Do not claim that an integration works if it has not been verified.

## 8. PROFESSIONAL GITHUB DOCUMENTATION

Prepare the appropriate public-facing documentation:

### README.md

Include:

- Project name and concise description.
- Main features that actually exist.
- Technology stack.
- Screenshots or clearly marked screenshot placeholders.
- Architecture and folder structure.
- Prerequisites.
- Installation instructions.
- Environment setup.
- Database setup and migrations, if applicable.
- Development and production commands.
- Testing instructions.
- Troubleshooting.
- Known limitations.
- Contribution and licensing information where appropriate.

### Other files

Create or improve these when appropriate:

- `.gitignore`
- `.env.example` files
- `SECURITY.md`
- `CONTRIBUTING.md`
- `LICENSE`, only after documenting the licensing decision and obtaining the owner's approval
- `CHANGELOG.md`, if useful
- `.github/workflows/` for suitable automated checks

Documentation must be accurate, clear, and professional.

Never include real secrets, private information, production URLs that should remain private, or fabricated claims.

## 9. BUILD, TEST, AND VALIDATE

Use the actual project configuration to determine the correct commands.

Where possible and safe:

- Install or validate dependencies.
- Run linting and type checking.
- Run unit and integration tests.
- Build the frontend and backend.
- Verify configuration validation.
- Check that the application starts using documented setup instructions.
- Run local security checks.
- Check for vulnerable or abandoned dependencies.
- Confirm that no real credentials are required in committed files.

Do not use production credentials or production data.

Do not perform destructive database operations, production requests, or external deployments.

Record the actual results of each check. Clearly distinguish passed checks, failed checks, skipped checks, and checks that could not be performed.

## 10. REQUIRED RELEASE REPORT

Create `PUBLIC_GITHUB_RELEASE_REPORT.md` inside the current project folder.

Include:

1. Executive summary.
2. Actual project architecture and technology stack.
3. Changes made and why.
4. Files created, updated, or removed.
5. Security findings, with secret values redacted.
6. Environment-variable inventory containing names only.
7. Secret-scanning results and limitations.
8. Git-history risks and whether historical inspection was completed.
9. Dependency and vulnerability findings.
10. Build, lint, type-check, and test results.
11. Documentation and repository improvements.
12. Remaining issues and required manual actions.
13. A final public-release checklist.

Never include actual secrets or private credentials in this report.

## 11. FINAL PUBLICATION GATE

The project must NOT be declared ready for public release if:

- A real secret remains in a file intended for publication.
- A sensitive file is not properly excluded.
- Git history may expose secrets and has not been safely addressed.
- Private data or credentials are present.
- Critical security findings remain unresolved.
- Essential installation or configuration instructions are missing.
- Important checks have failed without disclosure.

If any of these conditions apply, clearly mark the release as BLOCKED and explain the remaining work without exposing sensitive information.

Do not publish or push the project under any circumstances.

## 12. EXECUTION INSTRUCTIONS

Work systematically:

1. Confirm the current project directory.
2. Establish a safe file inventory.
3. Audit the project and its security.
4. Identify and remediate secrets in the current release files.
5. Improve code quality and documentation.
6. Run safe validation checks.
7. Generate the final report.
8. Re-scan the exact files intended for publication.
9. Clearly list anything that still prevents release.

You are authorized to make safe, necessary changes inside the current copied project folder. Preserve the original project, preserve the private backup, and do not publish anything.

**The ultimate goal is a professional, functional, well-documented, independently publishable GitHub project with no real secrets or private information in the files or Git history that will be made public. Security takes priority over appearance and convenience.**