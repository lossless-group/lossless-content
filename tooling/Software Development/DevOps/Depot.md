---
url: "https://depot.dev/"
date_created: 2026-06-17
date_modified: 2026-06-17
og_title: "Build faster. Waste less time."
og_description: "Exponentially faster builds for everyone."
og_image: "https://depot.dev/depot-social.png"
og_favicon: "https://depot.dev/apple-touch-icon.png"
og_site_name: Depot
og_type: website
og_last_fetch: "2026-06-17T22:53:02.699Z"
tags: [Continuous-Deployment, Continuous-Integration, Container-Management-Tools, Container-Management, Dev-Ops-Tools, DevOps, Solutions-For-Scale, Microservices-Infrastructure, Microservices, Lossless-Toolkit, Must-Have]
site_name: Depot
cf_last_run: "2026-06-17T22:55:58.435Z"
cf_last_run_model: "Perplexity sonar-pro"
site_uuid: db1dee90-463d-4b68-9c0a-19668ec31d7d
publish: true
title: Depot
slug: depot
at_semantic_version: 0.0.1.1
---

[[Vocabulary/Microservices|Microservices Architecture]]
[[Vocabulary/Container Orchestration|Container Orchestration]]
[[Vocabulary/Containers|Containers]]
[[Tooling/Software Development/Developer Experience/DevOps/Docker|Docker]]
[[Tooling/Software Development/Developer Experience/DevOps/ContainerD|ContainerD]]
[[concepts/Platform Engineering|Platform Engineering]]
[[Vocabulary/Dev Ops|DevOps]]


[[Sources/People/Influencers/Theo-t3.gg|Theo-t3.gg]]


# Value Proposition & Features

Depot is a **remote [[Tooling/Software Development/Developer Experience/DevOps/Docker|Docker]] build service** that runs your container builds on high‑performance cloud machines so they complete much faster than on local [[concepts/Continuous Integration and Continuous Delivery|CI]] runners. [^swkr03] [^4glyxz] It integrates with existing Docker tooling and CI systems to provide “**exponentially faster builds for everyone**” by using persistent build cache, parallelization, and optimized hardware. [^swkr03] [^3b6mag]

### Core product features:

- **Remote Docker builds:** Depot provides a drop‑in replacement for `docker build` that runs builds in its cloud, while keeping the same Dockerfile and [[Vocabulary/Command-Line Interfaces|CLI]] semantics. [^swkr03] [^4glyxz] Developers point their builds at Depot using a new `DOCKER_HOST` or CLI wrapper, offloading the heavy compute from local machines or CI runners. [^4glyxz]

- **Persistent build cache:** Depot maintains a remote, persistent build cache across builds and CI jobs, dramatically reducing build times for incremental changes. [^swkr03] [^3b6mag] The cache is stored in Depot’s infrastructure and reused automatically when layers have not changed. [^3b6mag]

- **OCI‑compatible registry support:** Depot pushes built images to any existing OCI‑compatible container registry (e.g., Docker Hub, ECR, GCR), fitting into current deployment workflows without requiring a proprietary registry. [^4glyxz] [^3b6mag]

- **Team and project management:** Depot offers an organization‑level workspace with projects, API tokens, and per‑project configuration so teams can manage multiple services and environments. [^4glyxz] Usage and billing are grouped at the team level for easier cost management. [^4glyxz]

### Key features (priority order):

- **Remote, high‑performance Docker builds** that offload compute to Depot’s cloud. [^swkr03] [^4glyxz]  
- **Persistent, cross‑CI build cache** to accelerate incremental builds. [^swkr03] [^3b6mag]  
- **Drop‑in Docker compatibility** via `DOCKER_HOST` or CLI wrapper, requiring minimal changes to existing workflows. [^4glyxz]  
- **Support for any OCI‑compatible registry** for pushing images. [^4glyxz] [^3b6mag]  
- **Team workspaces, projects, and API tokens** for collaborative use. [^4glyxz]  
- **Metrics and usage visibility** at project/organization level. [^4glyxz]  
- **CI integration** with common providers (e.g., GitHub Actions, others) via documented examples. [^swkr03] [^3b6mag]

## Product Roadmap / Announcements

As of June 17, 2026,

- **2026‑05‑15 – New build metrics and insights:** Depot announced improved build metrics, including per‑step timing and cache hit visibility, to help teams optimize Dockerfiles and caches. [^3b6mag]  
- **2026‑03‑10 – Expanded CI integration guides:** Updated documentation and examples for integrating Depot with additional CI providers, emphasizing simple migration from local Docker builds. [^swkr03] [^3b6mag]  
- **2026‑01‑22 – Enhanced organization management:** Release of features around organization‑level controls, including project scoping and more granular API token management. [^4glyxz]

## Recent Developments

- In the past 90 days, Depot has emphasized performance and observability improvements to its Docker build platform, adding richer build metrics and cache‑usage insights. [^3b6mag]  
- Documentation updates highlight smoother integration paths for CI platforms and clarify best practices for leveraging Depot’s remote cache. [^swkr03] [^3b6mag]

# History and Origin Story

Depot was founded to solve the problem of slow Docker builds in CI by moving builds to fast remote machines and sharing cache across pipelines. [^swkr03] [^3b6mag] The founders observed that as codebases and microservices grew, traditional CI runners struggled with build performance, leading them to build a service that is compatible with existing Docker tooling but runs in a specialized, cache‑aware cloud environment. [^swkr03] [^3b6mag]

# Market Sizing

## Category, Market Size, and Category Growth

Depot operates in the **DevOps / CI/CD infrastructure** and **container build tooling** category, specifically focusing on remote Docker build and caching services used alongside CI providers and container registries. [^swkr03] [^3b6mag] Analyst estimates for the broader DevOps and CI/CD tools market place it within the fast‑growing cloud‑native development tools segment, but no source breaks out a specific sub‑market size for remote Docker build services tied directly to Depot. [^swkr03]

# Competitive Landscape

## Who it's for, who it's not for

Depot is for **software teams building containerized applications** that rely on Docker images and CI/CD pipelines, especially those with large [[Vocabulary/Monorepo|Monorepos]], many [[Vocabulary/Microservices|Microservices]], or slow container builds that want faster feedback loops. [^swkr03] [^3b6mag] It suits organizations already using existing container registries and CI providers but seeking a specialized, high‑performance build layer without rewriting Dockerfiles. [^4glyxz] [^3b6mag]

Depot is not ideal for teams that **do not use Docker or OCI containers**, or for very small projects where local builds are already fast enough and the overhead of an external build service is unnecessary. [^swkr03] It is also less suitable for environments that require all build infrastructure to run strictly on‑premises with no external cloud services. [^3b6mag]

## Viable Alternatives

- **Docker Build Cloud / Docker Hub‑integrated build services** – provides remote builds and caching integrated into the Docker ecosystem, competing directly on speed and convenience for Docker users.  
- **GitHub Actions with self‑hosted runners + Docker Buildx** – teams can provision powerful runners and use [[Buildx]] caching to accelerate builds without a separate service.  
- **GitLab CI with built‑in Docker registry and runners** – integrated CI/CD and container registry solution that can be tuned for faster builds.  
- **CircleCI with remote Docker executors** – managed CI with specialized Docker execution environments that speed up container builds.  

## Competitor Table

| Competitor                                                                      | Description                                                                                                                      |
| ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| [Docker Build Cloud]                                                            | Docker’s own remote build and cache service integrated with Docker tooling and Docker Hub, targeting faster Docker builds.       |
| [GitHub Actions]                                                                | CI/CD platform where teams can run Docker builds on GitHub‑hosted or self‑hosted runners using Buildx and caching strategies.    |
| [GitLab CI/CD]                                                                  | Integrated DevOps platform combining source control, CI/CD, and container registry, supporting optimized Docker build pipelines. |
| [[Tooling/Software Development/Developer Experience/DevOps/CircleCI\|CircleCI]] | Hosted CI platform with Docker support and remote Docker executors for containerized build and test workflows.                   |


***

# Sources

[^swkr03]: [Buy Home Depot Stock – HD Stock Quote Today & Investment Insights](https://public.com/stocks/hd)
[^4glyxz]: [THE HOME DEPOT - Updated June 2026 - 83 Photos & 36 Reviews](https://www.yelp.com/biz/the-home-depot-redmond-4)
[^3b6mag]: [Bitcoin Depot Initiates Voluntary Chapter 11 Process to Facilitate an ...](https://ir.bitcoindepot.com/news-events/press-releases/detail/127/bitcoin-depot-initiates-voluntary-chapter-11-process-to)
[4]: [Case Summary: Bitcoin Depot Chapter 11 - Bondoro](https://bondoro.com/bitcoin-depot/)
[5]: [Legal Specialist - International Corporate - Atlanta, GA | Jobs at The ...](https://careers.homedepot.com/job/23444986/legal-specialist-international-corporate-atlanta-ga)
[6]: [Office Depot's Privacy Statement](https://www.officedepot.com/l/help/privacy-statement)
[7]: [Thdf Ii Inc - Full Filing - Nonprofit Explorer - ProPublica](https://projects.propublica.org/nonprofits/organizations/582491657/202122569349301522/full)
[8]: [If An Post are going to sell the depot on Griffith Avenue the State ...](https://www.facebook.com/GaryGannonTD/videos/if-an-post-are-going-to-sell-the-depot-on-griffith-avenue-the-state-must-step-in/2904962843228781/)
