---
date_created: 2025-06-08
date_modified: 2025-12-07
tags: [Git, Version-Control, Open-Source-Collaborations]
---

# GitHub Forks

## Overview

A GitHub fork is a personal copy of another user's repository that lives in your GitHub account. Forks enable you to freely experiment with changes without affecting the original project.

## Key Concepts

### GitHub Forks vs Git

| Feature | GitHub Forks | Git (Native) |
|---------|-------------|-------------|
| **Type** | GitHub platform feature | Version control system |
| **Forking** | One-click fork button | Manual process required |
| **Connection** | Maintains link to original | No automatic tracking |
| **Pull Requests** | Built-in PR system | No native PR system |

## How to Fork a Repository

1. Navigate to the repository on GitHub
2. Click the "Fork" button in the top-right corner
3. Select your account as the destination

## Working with Your Fork

### Initial Setup

1. **Clone your fork locally**:
   ```bash
   git clone https://github.com/YOUR-USERNAME/REPOSITORY-NAME.git
   cd REPOSITORY-NAME
   ```

2. **Add the original repository as upstream**:
   ```bash
   git remote add upstream https://github.com/ORIGINAL-OWNER/REPOSITORY-NAME.git
   ```

### Making Changes

1. **Create a new branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make and commit your changes**:
   ```bash
   git add .
   git commit -m "Your descriptive commit message"
   ```

3. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

4. **Create a Pull Request (PR)** through GitHub's web interface

### Keeping Your Fork Updated

1. **Fetch changes from upstream**:
   ```bash
   git fetch upstream
   ```

2. **Merge changes into your main branch**:
   ```bash
   git checkout main
   git merge upstream/main
   ```

3. **Push updates to your fork**:
   ```bash
   git push origin main
   ```

## Best Practices

1. **Always work on branches** - Never commit directly to `main`
2. **Keep your fork updated** - Regularly sync with the upstream repository
3. **Write clear commit messages** - Follow conventional commits when possible
4. **Keep PRs focused** - One feature/bugfix per pull request
5. **Delete merged branches** - Keep your repository clean

## Common Issues

1. **Merge conflicts** - Resolve conflicts before creating a PR
2. **Outdated fork** - Always update before creating new branches
3. **Permission issues** - Make sure you have the correct access rights

## Advanced Topics

- **Managing multiple remotes** - Work with multiple forks
- **Rebasing** - Keep your commit history clean
- **GitHub Actions** - Automate testing and deployment
- **Fork syncing** - Automate the update process

The integration between Git (the version control system) and GitHub (the hosting platform) is what makes forking so powerful and user-friendly.

 Recommended: Separate Branch Strategy

  Keep main clean (tracks upstream), put customizations on a deploy branch:

  cd /path/to/your/papermark

  # 1. Add upstream remote (one-time)
  git remote add upstream https://github.com/mfts/papermark.git

  # 2. Verify remotes
  git remote -v
  # origin    https://github.com/lossless-group/papermark.git (fetch)
  # upstream  https://github.com/mfts/papermark.git (fetch)

  # 3. Create a deployment branch for your customizations
  git checkout -b deploy
  # Add railway.json, .railpackignore, any config changes
  git add .
  git commit -m "Add Railway deployment configuration"
  git push origin deploy

  # 4. Configure Railway to deploy from 'deploy' branch
  # (In Railway dashboard: Settings > Source > Branch)

  Syncing with Upstream

  When Papermark releases updates:

  # 1. Fetch upstream changes
  git fetch upstream

  # 2. Update your main branch
  git checkout main
  git merge upstream/main
  git push origin main

  # 3. Rebase your deploy branch onto updated main
  git checkout deploy
  git rebase main

  # 4. Resolve any conflicts, then force push
  git push origin deploy --force-with-lease

  Visual Representation

  upstream/main:  A---B---C---D---E  (Papermark releases)
                           \
  your main:      A---B---C---D---E  (mirrors upstream)
                               \
  your deploy:    A---B---C---D---E---X---Y  (X, Y = your customizations)

  Alternative: Merge Instead of Rebase

  If you prefer not to rewrite history:

  git checkout deploy
  git merge main
  # Resolve conflicts
  git push origin deploy

  This creates merge commits but avoids force-pushing.

  Protect Your Customizations

  Create a .github/CODEOWNERS or document which files are your customizations:

  # Files that are lossless-group customizations (don't sync from upstream)
  railway.json
  .railpackignore
  # Any other custom configs

  Quick Reference Commands

  # Daily workflow
  git fetch upstream
  git checkout main && git merge upstream/main && git push
  git checkout deploy && git rebase main && git push --force-with-lease

  # See what's different between your deploy and upstream
  git log upstream/main..deploy --oneline

  # See your custom files
  git diff main..deploy --name-only

  Railway Configuration

  Point Railway to your deploy branch:
  - Settings → Source → Branch: deploy

  This way Railway always deploys your customized version, while main stays sync-able with
  upstream.