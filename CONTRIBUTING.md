# 🚀 Contribution Guide for Lynkeer

Welcome to Lynkeer!  
This document explains how we work with Git, branches, pull requests, hotfixes, conflict resolution, and our GitHub protection rules.
<br><br>

---

# 🏗️ Branch Strategy

We use a simple and effective branching model, inspired by Git Flow.

| Branch | Purpose |
|--------|---------|
| `main` | Production-ready, live code. Always stable. |
| `staging` | Pre-production testing environment. |
| `develop` | Latest integrated development work. |
| `feature/*` | New features, improvements, or bug fixes under development. |
| `hotfix/*` | Urgent patches directly for production issues. |

## Protected Branches

The following branches are protected:
|Branch | Protection|
|-------|-----------|
|main, staging, develop | ✅ Protected - No direct pushes allowed|

#### Protection rules include:
- All changes must go through Pull Requests (PRs).
- At least one review is required.
- Passing CI checks (if configured) are required.
- Branch must be up-to-date with target before merging.
<br><br>
---

# 📦 Creating New Work

All new work (features, improvements, fixes) follows this process:

- Start from the latest `develop`.
- Create a new feature branch:  
Naming conventions:
  - `feature/login-page`
  - `feature/fix-payment-bug`
  - `feature/add-user-profile`

## Commands:

```bash
git checkout develop
git pull
git checkout -b feature/your-branch-name
```

### Features Workflow
1. Create a feature/* branch from develop.
2. Implement your changes.
3. Open a Pull Request into develop.
4. After approval, merge into develop.
5. Periodically, merge develop into staging for testing.
6. Once staging is fully validated, merge staging into main.

### Visual Flow
```bash
feature/* → Pull Request → develop
                      ↓
(develop) → Pull Request → staging
                      ↓
(staging) → Pull Request → main
```
<br>

---

# 🔥 Hotfixes (Urgent Patches)

Hotfixes address critical production issues quickly and safely.

### Hotfix Workflow:
1. Create a hotfix branch from main:

    ``` bash
    git checkout main
    git pull
    git checkout -b hotfix/fix-critical-issue
    ```

2. Apply your fix.
3. Open a Pull Request into main.
    - Mark it as Hotfix in the PR title or labels.
4. After merging into main, create two more Pull Requests:
    - From main → develop
    - From main → staging
5. Merge these PRs after review.

### Visual Flow

```bash
hotfix/* → Pull Request → main
                    ↓
(main) → Pull Request → develop
(main) → Pull Request → staging
```
<br>

---

# ⚔️ Handling Merge Conflicts

Merge conflicts are a normal part of team collaboration. Here's the process:

1. When Git shows a conflict, fetch the latest develop:
    ```bash
    git checkout feature/your-branch-name
    git pull origin develop
    ```
2. Git will show conflicting files. Open them and look for conflict markers:
    ```
    <<<<<<< HEAD
    (code from develop)
    =======
    (code from your feature branch)
    >>>>>>> feature/your-branch-name
    ```
3. Manually edit to resolve the conflicts.
4. After resolution:
    ```bash
    git add .
    git commit
    git push
    ```
5. Your PR will update automatically and can be merged once reviewed again.