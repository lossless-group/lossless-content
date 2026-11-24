---
title: "Stow on Steroids: a Symlink & Submodule Repo Manager"
lede: One source of truth for skills, context, memories and packages, showing up wherever each agent harness expects them, with the one-to-many links easy to see and prune.
date_authored_initial_draft: 2026-11-22
date_authored_current_draft: 2026-11-22
date_authored_final_draft:
date_first_published:
date_last_updated:
at_semantic_version: 0.0.0.1
augmented_with:
  - Claude Code on Claude Opus 5.5
category: Open-Specification
date_created: 2026-11-22
date_modified: 2026-11-23
status: Stub
publish: false
site_uuid: f741c848-2b41-4db7-8720-9fbc31dc1733
hex_code: 2mvqcp
tags:
  - Agent-Skills
  - Symlinks
  - Git-Submodules
  - GNU-Stow
  - Agent-Harnesses
  - Context-Engineering
authors:
  - Michael Staton
type: Specs
image_prompt: A muscular robot switchboard operator plugging hundreds of labeled cables from one central source box into many different machines and offices, with a clean wiring diagram pinned on the wall behind. Comic and technical.
banner_image: https://ik.imagekit.io/xvpgfijuw/Image-Gin/2026-11/Stow-on-Steroids-a-Symlink-_-Submodule-Repo-Manager_banner_image_1795477853465_tO6zqLzYS.webp
portrait_image: https://ik.imagekit.io/xvpgfijuw/Image-Gin/2026-11/Stow-on-Steroids-a-Symlink-_-Submodule-Repo-Manager_portrait_image_1795477853821_wRu2Oc-lr.webp
square_image: https://ik.imagekit.io/xvpgfijuw/Image-Gin/2026-11/Stow-on-Steroids-a-Symlink-_-Submodule-Repo-Manager_square_image_1795477854244_lUIkBCejS.webp
banner_image_taller: https://ik.imagekit.io/xvpgfijuw/Image-Gin/2026-11/Stow-on-Steroids-a-Symlink-_-Submodule-Repo-Manager_banner_image_taller_1795477854603_zY_zctirQ.webp
---

## Thesis

Agents like working in git-based version control and are completely fluent in it. It's a good way to collaborate and save work.

Agent skills, documentation, context, memories, packages and more are spreading across filesystems. Each agent harness has its own idea of where to save them. People use several harnesses and switch between them.

What's missing underneath is a way to keep a single source of truth while letting useful files appear in many locations. It should also be quick and easy to see, understand, manage and prune those one-to-many relationships.

## Open questions

- Where does GNU Stow stop being enough? Nested items need hand-made links, and renames leave stale links behind.
- When should a copy be a symlink, and when should it be a submodule?
- What does a view of every source and all its appearances look like?
