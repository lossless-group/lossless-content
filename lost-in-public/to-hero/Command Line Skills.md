---
title: Command Line Skills
lede: Learn how to use the command line effectively.
date_initialized: 2025-03-07
date_authored_current_draft: 
date_authored_final_draft: 
date_first_published: 
date_last_updated: 
at_semantic_version: 0.0.0.1
authors:
  - Michael Staton
status: To-Do
augmented_with: Windsurf Cascade on Claude 3.5 Sonnet
category: To-Hero
tags: [Command-Line]
date_created: 2025-03-23
date_modified: 2025-07-23
site_uuid: 506da224-92e9-4800-b902-d9a1872537d3
publish: true
slug: command-line-skills
---

Check for ports that are open.
```bash
lsof -i :4321,4322
```

Kill running ports
```bash
lsof -ti:4321-4323 | xargs -r kill
```

Check for node processes in the filesystem observers
```bash
ps aux | grep -i "node.*tidyverse" | grep -v grep
```

Save the output of a command to a file.  In this example, `pnpm build`:
```bash
pnpm build 2>&1 | tee build_output.txt
```
