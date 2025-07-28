---
title: Git Basics
description: Introduction to version control with Git
slug: git-basics
---

# Git Basics

## Version Control Made Simple

Learn the fundamentals of Git

---

## What is Git?

- **Distributed** version control system
- Created by Linus Torvalds in 2005
- Track changes in your code
- Collaborate with others
- Maintain project history

---

## Key Concepts

### Repository
A project tracked by Git

### Commit
A snapshot of your project

### Branch
An independent line of development

### Remote
A version of your repository hosted elsewhere

---

## Basic Commands

```bash
# Initialize a new repository
git init

# Clone an existing repository
git clone <url>

# Check status
git status
```

---

## Making Changes

```bash
# Stage changes
git add <file>
git add .

# Commit changes
git commit -m "Your message"

# Push to remote
git push origin main
```

---

## Branching

```bash
# Create new branch
git branch feature-name

# Switch branches
git checkout feature-name

# Create and switch
git checkout -b feature-name
```

--

### Why Branch?

- Work on features independently
- Keep main branch stable
- Easy collaboration
- Experiment safely

---

## Merging

```bash
# Merge branch into current
git merge feature-name

# Rebase (alternative)
git rebase main
```

⚠️ Use rebase carefully!

---

## Working with Remotes

```bash
# Add remote
git remote add origin <url>

# Fetch changes
git fetch

# Pull changes
git pull

# Push changes
git push
```

---

## Common Workflows

### Feature Branch Workflow

1. Create feature branch
2. Make changes
3. Commit frequently
4. Push to remote
5. Create pull request
6. Merge after review

---

## Best Practices

- **Commit often** with clear messages
- **Pull frequently** to stay updated
- **Branch** for new features
- **Review** before merging
- **Document** your changes

---

## Useful Commands

```bash
# View history
git log --oneline --graph

# Undo changes
git reset --hard HEAD~1

# Stash changes
git stash
git stash pop
```

---

# Practice Makes Perfect

Start using Git today!

[Back to presentations](/slides/)