---
title: How to manage gnarly routing with Static Site Generators
lede: Guidlines for how to manage dynamic and static routing with Static Site Generators
date_authored_initial_draft: 2025-07-21
date_authored_current_draft: 2025-07-21
date_first_published: 
date_last_updated: 2025-07-21
date_created: 2025-06-14
date_modified: 2025-07-21
at_semantic_version: 0.0.0.2
status: To-Do
augmented_with: Windsurf Cascade on SWE-1
category: Guidelines
site_uuid: a341b2e3-1ba5-9bdc-accb-a475b6a70e4b
tags: [Dynamic-Routing, Route-Mapping, Static-Site-Generators]
authors:
  - Michael Staton
image_prompt:
---

Pseudo-code for route resolution  
1. Check if path matches existing curated routes → serve normally  
2. If not found, check content directory for exact path match  
3. If found, serve content with appropriate layout  
4. If still not found, check for redirects/aliases  
5. Finally, show 404 with suggestions