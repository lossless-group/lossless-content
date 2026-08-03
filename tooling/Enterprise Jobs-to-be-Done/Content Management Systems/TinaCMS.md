---
url: https://tina.io/
date_created: 2024-04-12
date_modified: 2026-07-17
og_title: "GitHub’s #1 Headless CMS, powered by an awesome Visual Editor for Markdown"
og_description: Combine the power of GitHub and Markdown with TinaCMS for seamless content management. Empower developers and creators to edit, preview, and manage static and dynamic sites effortlessly.
og_image: https://tina.io/og/tina-og.png
og_favicon: https://tina.io/favicon/favicon.ico
og_site_name: Tina
og_type: website
og_last_fetch: 2026-07-17T20:14:26.720Z
tags:
  - Content-Management-Systems
  - Marketing-Toolkit
  - Founder-Toolkit
  - Open-Source-Alternatives
  - Low-Cost-Alternatives
  - Lossless-Toolkit
site_uuid: e7bd5bd3-14af-4fc8-83b6-27dab955b713
publish: true
title: TinaCMS
slug: tina-cms
at_semantic_version: 0.0.0.1
cf_last_run: 2026-07-17T20:18:47.729Z
cf_last_run_model: Perplexity sonar-pro
---

[[Simplified Alternatives]]
[[concepts/Explainers for Tooling/Content Management Systems|Content Management Systems]]
[[Vocabulary/Static Site Generators|Static Site Generators]]
[[concepts/Unbundling|Unbundling]]

# Value Proposition & Features

TinaCMS is a **developer-friendly, Git-backed, headless CMS** that lets teams manage content stored in [[projects/Emergent-Innovation/Standards/Markdown|Markdown]], [[Tooling/Software Development/Frameworks/Web Frameworks/MDX|MDX]], [[projects/Emergent-Innovation/Standards/JSON|JSON]], and similar files directly in their GitHub repositories, with a visual editing UI over those files. [^05h08q] [^q6380d] [^607iya] [^7jam36] It aims to “combine the power of GitHub and Markdown” with real-time visual editing and live preview so developers keep their existing workflows while non-technical editors get an intuitive interface. [^05h08q] [^q6380d] [^7jam36]

Core product capabilities include a **visual/contextual editor** that runs alongside the actual site, a **[[projects/Emergent-Innovation/Standards/GraphQL|GraphQL]] content API** generated from a [[Tooling/Software Development/Programming Languages/TypeScript|TypeScript]] schema, and optional **TinaCloud** managed services for auth, collaboration, media, and editorial workflow. [^05h08q] [^q6380d] [^607iya] [^sg1dtz] The system is **database-free** by default, with content stored as plain files in Git, and supports static-site generators and server-side rendered apps via framework integrations and CLI tooling. [^05h08q] [^q6380d] [^607iya] [^7jam36] [^sg1dtz]

**Key features (priority order):**

- **Git-backed content storage** (Markdown/MDX/JSON/YAML) with Git version control instead of a traditional database. [^05h08q] [^q6380d] [^607iya] [^7jam36]  
- **Visual/contextual editing** on the real page, with live preview and real-time editing for non-technical users. [^05h08q] [^q6380d] [^607iya] [^7jam36] [^sg1dtz]  
- **GraphQL content API** generated from a configurable schema, enabling typed queries like `post.author.firstName`. [^q6380d] [^607iya] [^sg1dtz]  
- **TinaCloud managed backend** adding auth, collaboration, [[concepts/Continuous Integration and Continuous Delivery|CI/CD]] hooks, editorial workflows, and per-seat access control. [^05h08q] [^607iya] [^sg1dtz]  
- **Drag-and-drop interface and reusable content blocks** for building and rearranging page sections. [^05h08q] [^8k99c9] [^sg1dtz]  
- **Role-based access control and SSO (on paid/enterprise plans)** for multi-user teams and organizations. [^607iya] [^7jam36]  
- **Media management** including repo-based media and hosted/external providers such as [[Tooling/Enterprise Jobs-to-be-Done/Cloudinary]], AWS S3, and [[Tooling/Software Development/Cloud Infrastructure/DigitalOcean|DigitalOcean]] Spaces. [^607iya] [^sg1dtz]  
- **CLI tools and framework integrations** (`tinacms dev`, schema in TypeScript) for local development and smooth developer onboarding. [^607iya] [^sg1dtz]

## Screenshots

No reliable source found for official screenshot URLs that can be clearly attributed to TinaCMS or tina.io.

## Product Roadmap / Announcements

As of July 17, 2026,

- **2026-07-10** – SentinelOne documents security guidance around upgrading to `tinacms` 3.9.3 and `@tinacms/mdx` 2.1.7 to address stored XSS, implying a recent release focused on security hardening. [^qf4iy4]  
- **2026-06-30** – O3 Security describes fixes for cross-origin `postMessage` handlers and rich-text URL sanitization issues in TinaCMS, indicating roadmap attention to editor security and OAuth flows. [^6igvtn]  
- **2026-03-01** – Reely.io’s capability listing references AI features (TinaGPT / AI Assist), GitHub Enterprise integration, and enterprise SSO, suggesting recent roadmap emphasis on AI-assisted editing and enterprise features. [^607iya]  

## Recent Developments

- **Security vulnerabilities and fixes (2026)** – O3 Security reports that TinaCMS previously had cross-origin `postMessage` handler issues and rich-text URL sanitization bypasses enabling stored XSS and session takeover; these were remediated through stricter origin checks and updated releases. [^6igvtn]  
- **CVE-2026-55661 (stored XSS)** – SentinelOne details a stored XSS vulnerability in TinaCMS and `@tinacms/mdx`, fixed in versions `tinacms` 3.9.3 and `@tinacms/mdx` 2.1.7, with guidance on content security policy and sanitization; this reflects active maintenance and security response. [^qf4iy4]  

# History and Origin Story

TinaCMS began as an **open-source project by Forestry.io**, created to provide a more flexible, inline-editing CMS experience that remained Git-backed rather than database-driven. [^05h08q] It evolved into a “Git and Markdown CMS” combining GitHub’s version control with a simple editor and later introduced **TinaCloud**, a managed service adding real-time collaboration, identity management, and advanced workflows to reduce self-hosting complexity. [^05h08q] Over time, TinaCMS positioned itself as a leading open-source headless CMS, emphasizing visual editing, GraphQL APIs, and a developer-first experience while expanding into enterprise and AI-assisted capabilities. [^q6380d] [^607iya] [^7jam36] [^sg1dtz]

# Market Sizing

## Category, Market Size, and Category Growth

TinaCMS is best categorized as an **open-source, Git-based, headless CMS** with visual editing, sitting within the broader **headless CMS** and **static site / Jamstack CMS** markets. [^05h08q] [^q6380d] [^607iya] [^7jam36] [^sg1dtz] Analyst-style content about WordPress alternatives describes TinaCMS as a headless CMS that “simplifies content management with real-time editing, Git-based workflows, and developer-friendly customization,” positioning it among modern CMS tools competing with traditional systems like WordPress. [^7jam36] No specific market-size figures for TinaCMS itself are reported; broader headless CMS market estimates are not directly tied to TinaCMS in the retrieved sources.

## Pricing

TinaCloud (the managed backend) is described as having **free and paid tiers**, with capabilities such as role-based access control and AI features limited to paid plans, and SSO and GitHub Enterprise integration on enterprise tiers. [^607iya] [^sg1dtz] [^7jam36]

| Tier / Plan        | Notes                                                                 |
|--------------------|------------------------------------------------------------------------|
| Local / self-hosted TinaCMS | Free, fully open-source, Git-backed CMS with visual editor and GraphQL API. [^05h08q] [^q6380d] [^607iya] [^sg1dtz] |
| TinaCloud Free     | Managed backend with basic auth and collaboration; free tier mentioned in 2026 comparison. [^607iya] [^sg1dtz] |
| TinaCloud Paid     | Adds role-based access control, editorial workflow, AI features (TinaGPT / AI Assist), and advanced capabilities. [^607iya] [^7jam36] [^sg1dtz] |
| Enterprise          | Includes SSO, GitHub Enterprise integration, and higher-level support and access controls. [^607iya] |

(Exact prices are not publicly listed in the cited sources; effectively **no public pricing** details beyond tier descriptions. [^607iya] [^sg1dtz])

## Revenue Trajectory Estimates

No reliable source found providing revenue, ARR, or growth figures for TinaCMS or TinaCloud.

# Competitive Landscape

## Who it's for, who it's not for

TinaCMS primarily targets **developer-led teams** building static or hybrid sites where content lives in Git repos—such as marketing sites, documentation, and product pages—who want a **visual editor for non-technical contributors** without giving up Git and file-based workflows. [^05h08q] [^q6380d] [^607iya] [^7jam36] [^sg1dtz] It suits organizations comfortable with TypeScript schemas, CLI tools, and GitHub-centric processes, and those who value inline, contextual editing over traditional form-based admin panels. [^05h08q] [^q6380d] [^607iya] [^sg1dtz]

It is less suitable for teams seeking a **fully non-technical, database-centric CMS** with no Git exposure, or complex editorial orgs locked into monolithic platforms like legacy WordPress or enterprise suites that require deep workflow, multi-site, and plugin ecosystems out of the box. [^7jam36] [^sg1dtz] It may also be a weaker fit for organizations unwilling to adopt Git-based content storage or to invest in developer setup for schemas and framework integration. [^sg1dtz]

## Viable Alternatives

- **Decap CMS (formerly Netlify CMS)** – Another Git-based CMS that provides a config-driven admin UI committing to GitHub on the user’s behalf, better for simpler, form-based editing with less developer schema work. [^sg1dtz]  
- **WordPress (headless or classic)** – A widely-used CMS and blogging platform with extensive plugins and themes; seen as a baseline that TinaCMS aims to modernize against as an open-source alternative. [^7jam36]  
- **Other open-source headless CMSs** – Analyst-style lists place TinaCMS among headless CMS competitors like Strapi or Directus, which offer API-driven content management but often use databases rather than Git. [^7jam36]  
- **Plone/Wagtail visual editors** – At events like FOSSASIA, alternative open-source visual editors for Plone and Wagtail are presented to reimagine headless CMS editing, overlapping conceptually with Tina’s visual editing niche. [^7rpey2]  

## Competitor Table

| Competitor                          | Description                                                                 |
|-------------------------------------|-----------------------------------------------------------------------------|
| [Decap CMS](https://decapcms.org)   | Git-based CMS with a config-driven admin panel that commits Markdown files via Git APIs, offering a free, form-centric editing UI. [^sg1dtz] |
| [WordPress](https://wordpress.org)  | Traditional and headless-capable CMS with a large plugin/theme ecosystem; TinaCMS is positioned as an open-source WordPress alternative for modern Git-based workflows. [^7jam36] |
| [Strapi](https://strapi.io)         | Popular open-source headless CMS using a database-backed content model and REST/GraphQL APIs rather than Git-based storage. [^7jam36] |
| [Directus](https://directus.io)     | Open-source data platform and headless CMS offering an admin app over SQL databases with API access, serving as another non-Git alternative. [^7jam36] |
| [Plone/Wagtail visual editors](https://fossasia.org) | Open-source visual editors for frameworks like Plone and Wagtail that provide WYSIWYG, drag-and-drop, and frontend-integrated editing similar in spirit to Tina’s visual UX. [^7rpey2] |


***

# Sources

[^05h08q]: [About TinaCMS | The Git and Markdown CMS](https://tina.io/about)
[^q6380d]: [Tina](https://ithub.global.ssl.fastly.net/tinacms)
[3]: [Build software better, together](https://ithub.global.ssl.fastly.net/topics/tinacms)
[^607iya]: [TinaCMS — Headless CMS](https://reely.io/t/tinacms)
[5]: [Best headless CMS? : r/astrojs](https://www.reddit.com/r/astrojs/comments/1uy5e6f/best_headless_cms/)
[^8k99c9]: [TinaCMS + Fumadocs: Bring Visual Editing to Your Docs | Hark Singh](https://tv.ssw.com/tinacms-fumadocs-visual-editing/)
[7]: [How to Make Your TinaCMS Site SEO and GEO Friendly for Google and AI Search](https://www.sorank.com/ar/cms-optimisation-geo-seo/tinacms)
[^6igvtn]: [GHSA-g5qx-h5f3-mp2f: tinacms](https://o3.security/vulnerability/GHSA-g5qx-h5f3-mp2f)
[^qf4iy4]: [CVE-2026-55661: Tina CMS Stored XSS Vulnerability - SentinelOne](https://www.sentinelone.com/vulnerability-database/cve-2026-55661/)
[^7jam36]: [10+ Best Open Source WordPress Alternatives in 2026](https://openalternative.co/alternatives/wordpress)
[^sg1dtz]: [Decap CMS vs TinaCMS (2026): Git-Based CMS Compared](https://unfoldcms.com/blog/decap-vs-tinacms-git-cms)
[^7rpey2]: [The Open-Source Visual Editor for Plone and Wagtail ...](https://www.facebook.com/fossasia/posts/reimagine-the-headless-cms-editing-experience-at-fossasia-summit-2026-as-dylan-j/1643467294449117/)
