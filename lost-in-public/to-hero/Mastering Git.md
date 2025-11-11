---
date_created: 2025-03-21
date_modified: 2025-10-26
site_uuid: dc99c733-0a2e-4261-93a6-146650d3f664
publish: true
title: "Mastering Git"
slug: mastering-git
at_semantic_version: 0.0.1.1
---

Git is deceptively simple on the surface—clone, add, commit, push—until you need to undo something, investigate history, or handle large files. Then the real learning begins. This guide collects hard-won lessons from real-world Git use, organized not as a reference manual, but as a journey through progressively complex scenarios you'll actually encounter.

## Setting Up Your Foundation

Before diving into complex operations, let's establish a clean workspace. One of the first lessons every developer learns: system files like `.DS_Store` (macOS) or `.Thumbs.db` (Windows) don't belong in version control.

Rather than adding these to every project's `.gitignore`, set up a global ignore file:

```bash
echo ".DS_Store" >> ~/.gitignore_global
git config --global core.excludesfile ~/.gitignore_global
```

This tells Git to ignore patterns in `~/.gitignore_global` across *all* your repositories. You'll thank yourself later when you never accidentally commit editor configurations, OS artifacts, or IDE settings to shared repositories. It keeps your project-specific `.gitignore` files focused on actual project concerns.

## Understanding What Changed

The story of mastering Git often begins with a simple question: "What did I just commit?" Or worse: "What did *they* just commit?"

### Inspecting Recent History

To see what files changed in your last commit:

```bash
git log -1 --stat
```

To see the actual content differences:

```bash
git log -1 --patch
```

These commands become muscle memory once you realize how often you need to verify commits before pushing.

### Comparing Branches

When working across branches, especially before merging, you need visibility into differences. Here's a powerful trio of commands:

```bash
git diff master..development -- .
git diff --stat development..origin/master
git log --graph --oneline --decorate development origin/master
```

The `--stat` flag gives you a bird's-eye view of which files changed, while the `--graph` visualization shows the commit topology—essential for understanding divergent histories.

`git log --graph --oneline --decorate development origin/master` produces the following:
![](https://i.imgur.com/l59Ng3S.png)

`git diff --stat development..origin/master` produces the following:
![](https://i.imgur.com/YpgDMoH.png)

### Quick Status Checks

Sometimes you just need quick answers:

```bash
git diff --name-only              # List modified files
git show                          # Show latest commit
git show --name-only 751a182      # Show specific commit's files
```

## When Things Go Wrong: Undoing and Fixing

The real test of Git knowledge is knowing how to undo mistakes. Here's where most developers level up.

### Unstaging Changes

Staged something you didn't mean to?

```bash
git reset
```

This unstages everything while keeping your changes intact—a lifesaver when you've reflexively run `git add .` without thinking.

### Removing Files from the Index

Need to untrack files without deleting them?

```bash
git rm --cached "path/to/file"         # Single file
git rm --cached -r packages            # Entire directory
git rm -rf --cached temp_old_repo      # Force recursive removal
```

The `--cached` flag means "remove from Git's tracking, but leave my working files alone."

### Amending Commits

Forgot to include a file in your last commit? Made a typo in the commit message?

```bash
git commit --amend --no-edit     # Amend without changing message
```

If you've already pushed, you'll need to rewrite remote history (use with caution):

```bash
git push --force-with-lease origin development
```

The `--force-with-lease` is safer than `--force` because it fails if someone else has pushed to the branch since your last fetch.

## Crisis Management: Removing Sensitive Files

Eventually, everyone commits something they shouldn't have—API keys, credentials, private data. This is where things get serious.

### The Wrong Way

Git's built-in `filter-branch` command works, but comes with a scary warning:

```bash
git filter-branch --index-filter 'git rm --cached --ignore-unmatch path/to/secret' COMMIT^..COMMIT
```

You'll see:
```
WARNING: git-filter-branch has a glut of gotchas generating mangled history
         rewrites. Hit Ctrl-C before proceeding to abort, then use an
         alternative filtering tool such as 'git filter-repo'
```

### The Right Way

Listen to Git's advice. Use `git filter-repo` instead:

```bash
brew install git-filter-repo

git filter-repo --invert-paths --path 'path/to/secret.env'
```

This tool is faster, safer, and designed specifically for rewriting history. After removing secrets from history, remember: if you already pushed, **the secret is compromised**. Rotate those credentials immediately.

## Branch Gymnastics

Git's branching model is powerful, but sometimes you need to move changes around in non-obvious ways.

### Moving Your Work to Another Branch

Realized you're on the wrong branch?

```bash
git switch -C development
```

The `-C` flag creates the branch if it doesn't exist, or resets it to your current HEAD if it does—essentially moving your current work to that branch name.

### Squash Merging with Conflict Resolution

When merging a feature branch into master, you might want to squash everything and prefer the feature branch's version during conflicts:

```bash
git checkout master
git merge -X theirs --squash development
git commit -m "feat(content): comprehensive update from development branch"
```

The `-X theirs` strategy says "when there's a conflict, use the version from the branch being merged in." The `--squash` creates a single commit instead of preserving the entire feature branch history.

## Working with Temporary Changes: Git Stash

Stashing is Git's way of letting you save work-in-progress without committing. Think of it as a clipboard for code changes.

### Basic Stashing

```bash
git stash save "WIP: working on feature X"    # Save with description
git stash list                                 # See all stashes
git stash show stash@{n}                       # Summary of changes
git stash show -p stash@{n}                    # Full diff
```

### Retrieving Stashed Work

```bash
git stash apply stash@{n}     # Apply without removing from stash
git stash pop stash@{n}       # Apply and remove from stash
git stash branch new-branch-name stash@{n}  # Create branch from stash
```

### Cleanup

```bash
git stash clear               # Remove all stashes (careful!)
```

The `branch` option is particularly useful when a stash has conflicts with your current branch—it creates a new branch from the commit where you created the stash, then applies the stashed changes there.

## Managing Large Files: Git LFS

Traditional Git struggles with large binary files. Every version of every large file lives in your repository's history, bloating clone times and disk usage. Git LFS (Large File Storage) solves this by storing pointers in your repository while keeping actual file contents on a separate server.

### When to Use Git LFS

Git LFS shines for:
- Binary files (`.psd`, `.zip`, `.dll`)
- Media files (images, audio, video)
- Large datasets
- Game assets
- Database dumps

### Setting Up LFS

```bash
git lfs install                  # One-time setup
git lfs track "*.psd"            # Track file patterns
git lfs ls-files                 # Show tracked files
git lfs pull                     # Download LFS files for current commit
git lfs push                     # Upload LFS files to remote
```

### Migrating Existing Files

Already have large files in your history?

```bash
git lfs migrate import --include="*.png" --everything
```

This rewrites history to move existing files into LFS. After migration, you'll need to clean the cache:

```bash
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch -r visuals/Screenshots/' \
  --prune-empty --tag-name-filter cat -- --all
```

## Advanced: Working with Submodules

Submodules let you include one Git repository inside another—perfect for shared libraries, themes, or when you need precise version control over dependencies.

### Fresh Clone Setup

When cloning a repository with submodules:

```bash
git clone <parent-repo>
git submodule update --init --recursive
```

### Updating Submodules

To pull the latest changes from submodule remotes:

```bash
git submodule update --remote
git fetch --all --recurse-submodules=yes
git submodule update --init --recursive --remote --force
```

### Making Changes to Submodules

Here's the workflow that trips up most people—you need to commit in *two* places:

**Inside the submodule:**
```bash
cd sites/cogs-site
# Make your edits
git add .
git commit -m "Your change"
git push origin main
```

**In the parent repository:**
```bash
cd ../..
git add sites/cogs-site
git commit -m "Bump cogs-site submodule to new commit"
git push
```

The parent repository stores a pointer to a specific commit in the submodule. When you update the submodule, you must also update this pointer.

### Updating to Latest

```bash
cd sites/cogs-site
git checkout main
git pull origin main
cd ../..
git add sites/cogs-site
git commit -m "Update cogs-site pointer to latest main"
git push
```

### Pinning to a Specific Version

```bash
cd sites/cogs-site
git fetch --tags
git checkout <tag-or-commit>
cd ../..
git add sites/cogs-site
git commit -m "Pin cogs-site to <version>"
git push
```

### Optional: Branch Tracking

Tell the parent repository which branch to track:

```bash
git config -f .gitmodules submodule.sites/cogs-site.branch main
git add .gitmodules
git commit -m "Track main for cogs-site"
```

### Common Pitfalls

- **Detached HEAD**: If you see this inside a submodule, run `git checkout main` before pulling
- **Forgetting the two-step commit**: Changes in the submodule won't appear in the parent until you commit the pointer update
- **Verification**: Always run `git status` in the parent to confirm the pointer changed

## Working with Remotes

### Renaming Remotes

When you fork a repository, you often want to rename `origin` to `upstream`:

```bash
git remote rename origin upstream
```

### Checking Repository Status

```bash
git --no-pager branch -a                # List all branches without pager
git rev-parse --is-inside-worktree      # Verify you're in a Git repo
```

### Custom Log Formatting

For a concise history view from a specific directory:

```bash
git -C /path/to/repo log -n 3 --pretty=format:"%h - %s (%cr)" development
```

This shows the last 3 commits on the development branch with abbreviated hash, subject, and relative date.

## Closing Thoughts

Mastering Git isn't about memorizing every flag and option. It's about building mental models for how Git stores history, understanding the difference between the working directory, the staging area, and the repository, and knowing which tools to reach for when things go wrong.

The commands in this guide represent real scenarios: secrets that needed purging, large files that crashed deployment pipelines, submodules that fell out of sync, and countless "what did I just do?" moments. Keep this guide handy. You'll need it.
