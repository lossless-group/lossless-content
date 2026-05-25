---
date_created: 2026-05-15
date_modified: 2026-05-15
title: Obsidian Overhauls Its Plugin Ecosystem
slug: obsidian-overhauls-its-plugin-ecosystem
tags: [Obsidian, Plugin-Ecosystems, Knowledge-Tools, Software-Supply-Chain, Open-Source-Governance]
---

https://obsidian.md/blog/future-of-plugins/

## Why This Matters

On May 12, 2026, Obsidian launched a comprehensive overhaul of its plugin and theme distribution model. The old system — submissions reviewed once via GitHub PRs, then trusted forever — is gone. In its place: a dedicated community site, a developer dashboard, and an automated review system that scans **every version** of every plugin for security and code quality, not just the first one.

For a tool whose value is almost entirely a function of its plugin ecosystem (~4,000+ plugins and themes at launch), this is the most consequential infrastructure change Obsidian has shipped in years. It's also a direct response to a real problem: between initial submission and version N+1, malicious or sloppy code could quietly land in users' vaults with no second look.

## What Changed

### A Community Site Replaces the GitHub-PR Model
Plugins and themes now live at a dedicated community directory with dozens of categories (Integrations, Bases, Charts, and more), real search and filtering, and per-project detail pages that surface safety information. Previously, browsing happened in-app against a registry backed by GitHub PRs.

### Developer Dashboard
All 4,000+ existing plugins and themes were migrated automatically. Developers claim their projects by connecting GitHub and then submit, manage, and track status through a unified interface — no more "open a PR against `obsidianmd/obsidian-releases` and wait."

### Automated Review on Every Version
This is the architectural shift. The old model reviewed initial submissions manually; subsequent versions went unreviewed. The new system scans every release for security and code-quality signals. Obsidian reports the automated system cleared a backlog of **2,300+ queued submissions within days** of launch.

### Safety Surface for Users
- Automated malware scanning and vulnerability detection
- Safety scorecards visible on every project page
- Planned next: capability disclosures, verified-author badges, privacy labels

### Developer Requirements
- New and updated plugins must pass automated review before appearing in the directory
- Local preview scans are available via an ESLint plugin or through the dashboard
- **Closed-source plugins are no longer accepted for new submissions**

## What Developers Need to Do

1. Claim existing projects in the dashboard by linking GitHub.
2. Run the ESLint-based preview scan locally before every release — catching issues before submission is faster than round-tripping through review.
3. If you maintain closed-source code in the registry, understand it's grandfathered, not future-proof.
4. Treat the scorecard as a public artifact — capability disclosures and privacy labels are coming, and your project page will reflect them.

## What End Users Get

Lower friction. Faster reviews mean shorter waits between a developer shipping and users installing. Safety scorecards make it possible to compare two plugins on more than just stars and download counts. The trade-off — installing now flows through the community site rather than purely in-app — is a small one for the safety upgrade.

## What's Missing (For Now)

Obsidian has not committed to a deadline for phasing out non-compliant older plugins, saying only that it will "work closely with community developers to define that transition." That ambiguity is probably correct given the install base, but it does mean the safety floor for the ecosystem is "new and updated plugins" until that line is drawn.

## Our Take

Obsidian's plugin model has always been one of its biggest strengths and one of its quietest risks — a long tail of community code with thin guardrails between a developer's account and a user's vault. Moving from one-time human review to per-version automated review is the right architectural call, and pairing it with public safety scorecards aligns the incentives.

The interesting second-order effect: this is the kind of move that makes Obsidian more legible to organizations that previously couldn't justify the supply-chain risk. Verified-author badges and capability disclosures, when they land, push that further. Worth watching whether this opens up institutional adoption that the GitHub-PR era foreclosed.
