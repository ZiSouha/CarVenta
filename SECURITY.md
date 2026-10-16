# Security Policy

The CarVenta team and contributors take the security of our platform, our users, and their fleet data seriously. We appreciate your efforts to responsibly disclose vulnerabilities to us.

## Supported Versions

Only the latest release of CarVenta receives active security patches.

| Version | Supported          |
| ------- | ------------------ |
| 1.x     | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability within CarVenta, please do **NOT** open a public issue on GitHub. Public disclosure before a fix is published can put users at risk.

Instead, please submit a report via one of the following methods:

1. **GitHub Private Security Advisory**: Use the "Report a vulnerability" button under the **Security** tab of the CarVenta GitHub repository (recommended).
2. **Security Contact**: Email our security coordination team at `security@carventa.com` (or create a private repository advisory).

### What to Include in Your Report

To help us triage and resolve the issue quickly, please include:
- A clear description of the vulnerability and its potential impact.
- Step-by-step instructions or a minimal Proof of Concept (PoC) to reproduce the vulnerability.
- Affected endpoints, files, or components.
- Any suggested mitigations or patches, if available.

### Vulnerability Response Timeline

- **Initial Acknowledgment**: Within 48 hours of receipt.
- **Triage & Assessment**: Within 5 business days.
- **Resolution & Patch**: We aim to release a patch within 14 to 30 days depending on severity.
- **Public Disclosure**: Coordinated after the fix has been merged and released.

## Security Best Practices for Production Deployment

When deploying CarVenta to production environments, ensure you follow these essential security standards:

1. **Never Commit Secrets**: Ensure `.env` files are never committed to version control. Use `.env.example` as a template and inject environment variables via your hosting provider's secret manager (e.g., Render, Railway, AWS, Docker Secrets).
2. **Rotate Secrets Regularly**: Use strong, randomly generated keys (minimum 32 characters) for `JWT_SECRET`. Rotate secrets periodically.
3. **Database Security**: Restrict MongoDB Atlas IP whitelists to known server IP addresses. Never use `0.0.0.0/0` in production without strict user authentication.
4. **HTTPS / TLS**: Always enforce HTTPS in production for both API endpoints and the frontend client.
5. **CORS Configuration**: In production, configure CORS origin whitelisting in `server/server.js` to accept requests only from your verified frontend domain.
6. **Rate Limiting**: Enable reverse proxy or express rate limiting (`express-rate-limit`) in front of public API endpoints.
