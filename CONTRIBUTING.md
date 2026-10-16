# Contributing to CarVenta

Thank you for your interest in contributing to **CarVenta**! We welcome contributions from developers of all skill levels to help make CarVenta the premier open-source mobility and fleet management platform.

Please review this document to understand our contribution guidelines, development workflow, and coding standards.

---

## 🧭 Code of Conduct

We are committed to providing a welcoming, inclusive, and harassment-free environment for everyone. Please be respectful, constructive, and collaborative in all issues, pull requests, and discussions.

---

## 🛠 Getting Started

### 1. Fork & Clone

Fork the repository on GitHub, then clone your fork locally:

```bash
git clone https://github.com/<your-username>/CarVenta.git
cd CarVenta
```

### 2. Set Up the Development Environment

Install dependencies for both backend and frontend:

```bash
# Setup backend
cd server
npm install
cp .env.example .env
# Fill in local development variables in server/.env

# Setup frontend
cd ../client
npm install
cp .env.example .env
```

Start both servers in development mode:

```bash
# Terminal 1 (Backend)
cd server
npm run dev

# Terminal 2 (Frontend)
cd client
npm run dev
```

---

## 🌿 Branching Strategy

Always create a new branch from `main` for your work:

- `feature/<short-description>`: New functionality or UI enhancements.
- `fix/<short-description>`: Bug fixes or security patches.
- `docs/<short-description>`: Documentation additions or updates.
- `refactor/<short-description>`: Code improvements without functional changes.
- `perf/<short-description>`: Performance optimizations.

Example:
```bash
git checkout -b feature/dynamic-date-picker
```

---

## 📝 Commit Conventions

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` A new feature for the user
- `fix:` A bug fix
- `docs:` Documentation changes only
- `style:` Formatting, missing semicolons, etc. (no code change)
- `refactor:` Refactoring production code (neither a bug fix nor a feature)
- `perf:` Performance improvements
- `test:` Adding or updating tests
- `chore:` Maintenance tasks, dependency updates, configuration changes

Examples:
- `feat(client): add real-time telemetry gauges to cockpit HUD`
- `fix(server): prevent double booking on confirmed rental dates`
- `docs(readme): add environment variable inventory table`

---

## 🧪 Quality Standards & Testing

Before submitting a pull request, ensure:

1. **Frontend Builds Cleanly**:
   ```bash
   cd client
   npm run build
   ```
2. **Backend Syntax Check**:
   ```bash
   cd server
   node --check server.js
   ```
3. **No Secrets or Credentials**:
   - Never commit `.env` or `.env.*` files.
   - Never commit API keys, tokens, or personal identifiers.
4. **Code Quality**:
   - Write clean, readable code with descriptive variable and function names.
   - Maintain existing architecture patterns (MVC on the backend, reusable component hierarchy on the frontend).

---

## 🚀 Submitting a Pull Request

1. **Push your branch to GitHub**:
   ```bash
   git push origin feature/your-feature-name
   ```
2. **Open a Pull Request**:
   - Navigate to the original repository on GitHub.
   - Click **"New Pull Request"** and select your feature branch.
3. **PR Description**:
   - Provide a clear summary of what changes were made and why.
   - Link any related issues (e.g., `Fixes #12`).
   - Include screenshots or GIFs for any UI changes.
4. **Code Review**:
   - Address any comments or feedback from the maintainers.
   - Keep commits organized and rebase onto `main` if needed.

Thank you for contributing to CarVenta!
