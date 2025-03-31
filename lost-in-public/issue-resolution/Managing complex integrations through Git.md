---
title: Managing complex integrations through Git
date_authored_initial_draft: 2025-03-25
date_authored_final_draft: null
date_first_published: null
at_semantic_version: 0.0.0.1
authors:
  - Michael Staton
with_writing_assistant: Windsurf on Claude 3.7 Sonnet
category: Issue Resolution
tags:
  - Git
  - Loosely-Coupled-Architecture
  - Git-Submodules
date_created: 2025-03-25
date_modified: 2025-03-31
---

### Command Cheat sheet
```bash
git commit --amend --no-edit
```

```bash
git push --force origin development
```

```bash
git push --force-with-lease origin development
```

```bash
git rm -r --cached scripts site_archive
```

```bash
find content/changelog--code -name "*.bak" -type f -delete
```

```bash
for file in content/changelog--code/*.md; do cp "$file" "${file}.bak"; done
```

### Using `sed` Stream Editor to edit .gitmodules

#### Issue
When managing a monorepo with multiple submodules, we need to ensure that the development branch tracks development branches of submodules, while the master branch tracks master branches of submodules. This requires updating multiple lines in the .gitmodules file when switching branches.

#### Solution
Use `sed` (Stream EDitor) to perform a global replacement of branch specifications in .gitmodules:

```bash
# First, create a backup of .gitmodules
cp .gitmodules .gitmodules.bak

# Preview changes (prints what would change without modifying the file)
sed 's/branch = development/branch = master/g' .gitmodules | diff .gitmodules -

# If the preview looks correct, apply changes
sed -i '' 's/branch = development/branch = master/g' .gitmodules
```

#### Understanding the Command

1. `sed` - Stream EDitor, processes text line by line
2. `-i ''` - In-place edit flag (empty quotes required on macOS)
3. `'s/branch = development/branch = master/g'`
   - `s/` starts a substitution
   - `branch = development` is the pattern to find
   - `branch = master` is the replacement
   - `/g` means global (replace all occurrences)

#### Safety Notes

1. Always create a backup before modifying .gitmodules
2. Preview changes using diff before applying
3. The mdbook submodule (external tool) should have no branch specification
4. To revert: either restore from backup or swap 'master' and 'development' in the command