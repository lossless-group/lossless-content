---
date_created: 2025-03-26
date_modified: 2025-03-26
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
