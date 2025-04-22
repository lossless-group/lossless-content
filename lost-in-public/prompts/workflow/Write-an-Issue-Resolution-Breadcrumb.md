---
title: Write an note that leaves a breadcrumb for future Issue Resolution
lede: Create comprehensive technical specifications for completed tasks and features
date: Sat Mar 15 2025 19:00:00 GMT-0500 (Central Daylight Time)
date_authored_initial_draft: 2025-03-29
date_authored_current_draft: 2025-03-29
date_authored_final_draft: null
date_first_published: null
date_last_updated: null
at_semantic_version: 0.0.0.1
status: To-Do
augmented_with: Windsurf Cascade on Claude 3.5 Sonnet
working_with: Windsurf IDE with Claude 3.5
category: Prompts
date_created: 2025-04-16
date_modified: 2025-04-16
image_prompt: "A digital breadcrumb trail leading to an issue resolution, with highlighted steps, solution icons, and a summary card. Visuals include path markers, bug icons, and a sense of guiding future developers to solutions."
portrait_image: "https://img.recraft.ai/bgQmboEhzjy2R1hr4vOsvbimsvNIkKfUZRaYpewUffc/rs:fit:1024:1820:0/raw:1/plain/abs://external/images/7b77b70f-530e-4c16-9362-e7577b58c8fd"
site_uuid: 828827c3-4a13-4f05-967f-d5eb837f5f05
tags:
  - Issue-Resolution
  - Implementation-Solutions
authors:
  - Michael Staton
---

# Write an note that leaves a breadcrumb for future Issue Resolution

## Output Directory
`/content/lost-in-public/issue-resolution`

## Disambiguation
An "Issue Resolution" is not a Changelog nor a Session Log.  

A Changelog is for external readers who are users of our service to see the latest changes that may affect their experience.  

A Session Log is for internal readers who are developers of our service to see the "inner workings" of trying to build and maintain code with AI Code Assistants. 

An Issue Resolution is for developers who may run into a similar issue, and may get some help out of the reference material. 

## Context:
Let's assume our future selves, another AI coding assistant, or you five minutes from now has no memory of the issue we had.... but is bound to run into it!  And bound to get stuck again!  

## Pattern:

1. What were we trying to do and why 
2. List incorrect attempts with the necessary code for someone to be able to comprehend the related codebase.  
2. Explain the "Aha!" moment, the eureka. How did we solve it?  
4. Put forth the final solution with the necessary code for someone to be able to comprehend the related codebase.

# Example

```markdown
# Essential Git Commands for Complex Integrations

This guide provides solutions for managing complex Git integrations, particularly in monorepos with multiple submodules. The commands below are essential tools for your workflow.

## Quick Command Reference

### Amending Commits
```bash
git commit --amend --no-edit
```

### Force Pushing (use with caution)
```bash
# Standard force push (dangerous)
git push --force origin development

# Safer force push (recommended)
git push --force-with-lease origin development
```

### Cleaning and Cache Management
```bash
# Remove directories from Git cache
git rm -r --cached scripts site_archive

# Delete backup files
find content/changelog--code -name "*.bak" -type f -delete

# Create backup files
for file in content/changelog--code/*.md; do cp "$file" "${file}.bak"; done
```

# Managing Submodule Branch Tracking

## The Challenge: Synchronizing Branch States
When managing a monorepo with multiple submodules, we need to ensure that:
- The development branch tracks development branches of submodules
- The master branch tracks master branches of submodules

This requires updating multiple lines in the .gitmodules file when switching branches.

## Solution: Using Stream Editor (sed)

### Basic Workflow
```bash
# First, create a backup of .gitmodules
cp .gitmodules .gitmodules.bak

# Preview changes (prints what would change without modifying the file)
sed 's/branch = development/branch = master/g' .gitmodules | diff .gitmodules -

# If the preview looks correct, apply changes
sed -i '' 's/branch = development/branch = master/g' .gitmodules
```

### Understanding the Command
1. `sed` - Stream EDitor, processes text line by line
2. `-i ''` - In-place edit flag (empty quotes required on macOS)
3. `'s/branch = development/branch = master/g'`
   - `s/` starts a substitution
   - `branch = development` is the pattern to find
   - `branch = master` is the replacement
   - `/g` means global (replace all occurrences)

### Safety Notes
1. Always create a backup before modifying .gitmodules
2. Preview changes using diff before applying
3. The mdbook submodule (external tool) should have no branch specification
4. To revert: either restore from backup or swap 'master' and 'development' in the command

# Real-World Example: Merging Development into Master

## The Challenge
We needed to consolidate all the development work from various submodules and the monorepo into their respective master branches. This involved:
1. Merging development changes in each submodule to their master branches
2. Updating the monorepo's master branch to point to these new master states
3. Ensuring all submodules track their master branches when the monorepo is on master

## Learning Through Failure: Our Attempts

### Attempt 1: Direct Merge with Submodules
```bash
git checkout master
git merge development --no-ff
```
Failed because: Submodules were still pointing to development branches, causing conflicts.

### Attempt 2: Trying to Clean Untracked Files
```bash
git clean -f && git checkout master
```
Failed because: Couldn't handle nested .git directories in submodules properly.

### Attempt 3: Attempting to Reset Submodules
```bash
git submodule deinit -f md-cookbook && git submodule update --init md-cookbook
```
Failed because: Still had untracked files preventing branch switch.

### Attempt 4: Complex Merge with Unrelated Histories
```bash
git merge development --no-ff --allow-unrelated-histories
```
Failed with multiple conflicts in submodules and files.

## The "Aha!" Moment
We realized that:
1. Each submodule needs to be handled independently first
2. The monorepo's master branch should simply take all content from development
3. The .gitmodules file needs to be updated to track master branches

## Final Solution

### 1. For Each Submodule:
```bash
# Example for md-cookbook
cd md-cookbook
git checkout master
git merge development --no-ff -m "docs: Enhance cookbook documentation and clarify project scope"
git push origin master
cd ..

# Repeat for other submodules (content, site_archive, etc.)
```

### 2. Update Monorepo Master:
```bash
# Checkout master and take all development changes
git checkout master
git checkout development -- .
git add .
git commit -m "monorepo: Consolidate development changes into master"
git push origin master
```

### 3. Update Branch Tracking:
```bash
# Update .gitmodules to track master branches
sed -i '' 's/branch = development/branch = master/g' .gitmodules
git add .gitmodules
git commit -m "config: Update submodules to track master branches"
git push origin master
```

## Key Learnings
1. Handle submodule merges first, independently in each submodule
2. Don't try to merge the monorepo while submodules are in a mixed state
3. Use `git checkout --theirs` or similar when you want to take all changes from one branch
4. Remember to update .gitmodules to track the correct branches
5. Push changes in both submodules and monorepo to maintain consistency

## Best Practices for Next Time
1. First merge and push all submodule changes to their respective master branches
2. Then update the monorepo's master branch to take all development changes
3. Finally update .gitmodules to ensure proper branch tracking
4. Always push changes to maintain remote synchronization

# Switching Back to Development

After merging to master, you'll often need to switch back to development. Here's how to do it in one command:

```bash
# Switch monorepo and all submodules (except mdbook) back to development
sed -i '' 's/branch = master/branch = development/g' .gitmodules && \
git add .gitmodules && \
git commit -m "config: Update submodules to track development branches" && \
git checkout development && \
git submodule foreach 'if [ "$path" != "mdbook" ]; then git checkout development || true; fi'
```

## Understanding the Command
This command performs several operations in sequence:
1. `sed -i '' 's/branch = master/branch = development/g' .gitmodules`
   - Updates .gitmodules to track development branches
   - The `-i ''` flag makes changes in-place (empty quotes required on macOS)

2. `git add .gitmodules && git commit`
   - Stages and commits the .gitmodules changes
   - Ensures branch tracking is properly recorded

3. `git checkout development`
   - Switches the monorepo to its development branch

4. `git submodule foreach 'if [ "$path" != "mdbook" ]; then git checkout development || true; fi'`
   - Runs a command in each submodule
   - The `if` condition excludes the mdbook submodule (external dependency)
   - `|| true` ensures the command continues even if one submodule fails
   - Switches each submodule to its development branch

## Safety Notes
1. This command assumes all submodules (except mdbook) have a development branch
2. The `|| true` prevents the command from failing if any submodule is in an unexpected state
3. Always commit or stash local changes before running this command
4. Verify the state of critical submodules after switching