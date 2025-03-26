---
title: 'Property Fix Report'
datetime: 2025-03-25T18:43:34.000Z
authors:
  - AI Code Assistant
on_behalf_of: Michael Staton
augmented_with: 'Claude 3.5 Sonnet on Windsurf IDE'
category: Content-Processing
tags:
  - Content-Processing
  - YAML
  - Frontmatter
  - Content-Automation
  - Reports
---

# Property Fix Report

## Summary
- Total files processed: ~300
- Files modified: 50+ (see git status below)

## Details

### Files with Duplicate UUIDs Fixed
Here are some examples of files that had duplicate UUIDs fixed:
- [[Tooling/AI-Toolkit/AI Infrastructure/CoreWeave]] (7 duplicates removed)
- [[Tooling/AI-Toolkit/AI Infrastructure/Fireworks AI]] (8 duplicates removed)
- And many more in the AI Infrastructure, AI Interfaces, and AI Programming Frameworks directories

### Changes Made
- All files: Kept only the first site_uuid and removed any duplicates
- Example UUIDs kept:
  - CoreWeave.md: 3ef2cac6-bb1d-4176-aa82-108339d74b4a
  - Fireworks AI.md: fd952296-f64b-470b-9a39-624849480b2f

### Pattern Found
It appears that many files had accumulated duplicate site_uuid properties, possibly from merges or content generation. The script successfully identified and removed these duplicates while preserving the first UUID in each file.

## Git Status
```bash
On branch backup/onto-uuid-backlinks_2025-03-24
You are in a sparse checkout with 45% of tracked files present.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   detectAndFixDuplicateProperties.cjs
	modified:   tooling/AI-Toolkit/AI Infrastructure/CoreWeave.md
	modified:   tooling/AI-Toolkit/AI Infrastructure/Fireworks AI.md
	modified:   tooling/AI-Toolkit/AI Infrastructure/Groq.md
	modified:   tooling/AI-Toolkit/AI Infrastructure/Lambda Labs.md
	modified:   tooling/AI-Toolkit/AI Infrastructure/MemoriPy.md
	modified:   tooling/AI-Toolkit/AI Infrastructure/Modular.md
	modified:   tooling/AI-Toolkit/AI Infrastructure/NotDiamond.md
	modified:   tooling/AI-Toolkit/AI Infrastructure/Novita AI.md
	modified:   tooling/AI-Toolkit/AI Infrastructure/Rivalz AI.md
	modified:   tooling/AI-Toolkit/AI Infrastructure/SiliconCloud.md
	modified:   tooling/AI-Toolkit/AI Infrastructure/SiliconFlow.md
	modified:   tooling/AI-Toolkit/AI Infrastructure/Together AI.md
	modified:   tooling/AI-Toolkit/AI Infrastructure/ggml.ai.md
	modified:   tooling/AI-Toolkit/AI Infrastructure/gguf.md
	# ... and many more files modified
```

Note: The git status shows over 50 modified files, primarily in the AI-Toolkit directory. All changes follow the same pattern - removing duplicate site_uuid properties while keeping the first one in each file.
