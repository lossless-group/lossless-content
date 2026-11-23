---
title: "Zero-Complexity Content Repositories for Collaboration on Web Content"
lede: "Agents and developers get git. Everyone else gets a folder, a page of what changed, and an approve button, and it's the same repository underneath."
date_authored_initial_draft: 2026-11-22
date_authored_current_draft: 2026-11-22
date_authored_final_draft: null
date_first_published: null
date_last_updated: null
at_semantic_version: 0.0.0.1
augmented_with:
  - Claude Code on Claude Opus 5.5
category: Open-Specification
date_created: 2026-11-22
date_modified: 2026-11-22
status: Draft
publish: false
site_uuid: 92e7792d-dff5-4039-9bc1-be5d230c8cde
hex_code: 80bx7c
tags: [Content-Repositories, Collaboration, Version-Control, Markdown, Non-Technical-Users, Git]
authors:
  - Michael Staton
type: Specs
---

# Zero-Complexity Content Repositories for Collaboration on Web Content

## Why care?

Our sites read content from markdown in git, and our agents are fluent in both. The people whose content it is (clients, partners, a fundraising team) are not, and won't be. Today they collaborate by emailing us, which makes us the bottleneck and makes our work invisible to them.

Both self-generating specs depend on fixing this. A content farm or deal scout produces drafts, and someone who isn't us has to approve them. See [[Self-Generating-Content-Farm-for-Content-Marketing]] and [[Self-Generating-Deal-Scout-for-VC-Opportunity-Scans]].

## How we're building it

An open-source utility built in public, on the way to solving a problem we hit with every client site: startups, VCs and the organizations we build for.

## The idea

One repository, two faces:

- **For agents and developers:** a git repository of markdown and assets, with full history, branches and pull requests.
- **For everyone else:** a synced folder they can drop files into, a page showing what changed in plain language, and a way to approve, comment or edit in a browser. No terminal, no keys, no commits.

## What we already concluded

This has more prior thinking than either self-generating spec. The conclusions so far:

- **It's three layers, not one product.** Transport (getting files there), history (versions) and legibility (showing a person what changed). History is solved by existing tools, and legibility is the real gap. ([A Syncbox for Client Document Folders](../../ai-labs/context-v/explorations/A-Syncbox-For-Client-Document-Folders.md))
- **Git is already working as the history layer.** Mirror first, version later. ([Sync Corpora to R2, and Show Clients What Changed](../../ai-labs/context-v/plans/Sync-Corpora-to-R2-and-Show-Clients-What-Changed.md))
- **Show the change, not the diff.** A change record any engine can emit, rendered for someone who will never read a diff. ([Corpus Change Feed](../../ai-labs/corpora-builder/context-v/specs/Corpus-Change-Feed.md), Signed-Off)
- **Give collaborators capabilities, not secrets.** ([Secrets for Collaborators Who Will Never Open a Terminal](../../ai-labs/context-v/explorations/Secrets-for-Collaborators-Who-Will-Never-Open-a-Terminal.md))
- **The most recent thinking** is in `context-v/handoffs/On-the-Way-to-Collaboration-Around-Cloudflare-Artifacts.md` (2026-11-20), with Cloudflare Artifacts as git-compatible storage per collaborator.

Also relevant: the `ai-labs/studies/sync-and-content-version-control/` study (six reference systems profiled), [Self-Hosting the Vault via Ignis](../../content-farm/context-v/explorations/Self-Hosting-the-Vault-via-Ignis.md) (Obsidian in a browser), the Content Authoring Tools study kickoff, [Flave](../../ai-labs/flave-ai/context-v/specs/Master-Flave-An-Agent-Native-Document-Format-and-Publisher.md) as a document format and editor, and the Open Specs [[Markdown-Serve-an-API-for-Markdown-Content]] and [[Create-a-Collaborative-Markdown-based-Desktop-Publisher]].

## Requirements

1. **A collaborator never installs anything** beyond, at most, a sync client they already know.
2. **Every change has history** and can be undone, whoever made it.
3. **What changed is readable** by the person who has to approve it.
4. **Approval is one action**, and publishing follows from it.
5. **Agents work on the same files** with plain git.
6. **Private by default**, with what's published chosen per file.

## Open questions

- Is the browser editor Obsidian (via Ignis), Flave, a git-based CMS, or our own thin surface on LFM?
- Where does the repository live: GitHub, Cloudflare Artifacts, or R2 with git as history?
- How do approvals map to git: a merge, a frontmatter flag, a branch?
- How much of this is one product we could offer clients, versus setup per client?

## Related

- [[Self-Generating-Content-Farm-for-Content-Marketing]]
- [[Self-Generating-Deal-Scout-for-VC-Opportunity-Scans]]
- [[Markdown-Serve-an-API-for-Markdown-Content]]
- [[Create-a-Collaborative-Markdown-based-Desktop-Publisher]]
