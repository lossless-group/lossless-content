---
github_repo_url: https://github.com/docker/buildx
product_of: "[[Tooling/Software Development/Developer Experience/DevOps/Docker|Docker]]"
date_created: 2026-06-17
date_modified: 2026-07-17
og_title: Docker CLI plugin for extended build capabilities with BuildKit
tags:
  - Container-Management-Tools
  - Developer-Tools
  - Dev-Ops-Tools
  - DevOps
cf_last_run: 2026-07-17T20:33:45.803Z
cf_last_run_model: Perplexity sonar-pro
for_clients:
  - Laerdal
  - Param
site_uuid: 729006bf-c322-4675-ac49-e67ddb937e6d
publish: true
title: Buildx
slug: buildx
at_semantic_version: 0.0.1.1
---

[[Tooling/Software Development/Developer Experience/DevOps/Docker|Docker]]
[[Vocabulary/Command-Line Interface|Command-Line Interface]]
[[Vocabulary/Containers|Containers]]
[[Vocabulary/Dev Ops|DevOps]]

# Value Proposition & Features

**Value Proposition (2–3 sentences)**  
[[Tooling/Software Development/Developer Experience/DevOps/Docker|Docker]] **Buildx** is a Docker CLI plugin that provides *extended image build capabilities* powered by [[Docker BuildKit]], enabling advanced, efficient, and portable container image builds beyond the legacy `docker build` command. [^tn8i2u] [^5nshp5] It offers a modern build frontend with support for multi-platform builds, advanced caching, build-time secrets, and improved performance, making it particularly valuable for DevOps teams and container-focused developers. [^tn8i2u] [^5nshp5] By integrating deeply with Docker while exposing BuildKit features, Buildx helps standardize complex [[concepts/Continuous Integration and Continuous Delivery|CI/CD Pipelines]] and cross‑architecture image workflows in a single, consistent tool. [^tn8i2u] [^5nshp5]

**Core Product Features (2–3 sentences each)**  

- **BuildKit‑powered extended builds**  
  Buildx acts as a frontend to **BuildKit**, the next‑generation Docker build engine, enabling features such as concurrent builds, build graphs, improved caching, and efficient layer management compared to classic Docker builds. [^tn8i2u] [^5nshp5] This integration allows developers to leverage advanced build options and performance optimizations with familiar Docker CLI workflows. [^tn8i2u] [^d3swku]

- **Multi‑platform image building**  
  Buildx supports building images for multiple CPU architectures (such as `linux/amd64`, `linux/arm64`, etc.) from a single Dockerfile, often in one command, and can output multi‑arch manifests suitable for registries. [^tn8i2u] [^5nshp5] This capability is essential for teams targeting heterogeneous environments including cloud VMs, ARM‑based servers, and edge devices. [^tn8i2u] [^d3swku]

- **Build configuration via drivers and contexts**  
  Buildx introduces configurable *builders* with different drivers (e.g., `docker`, `docker-container`) and build contexts, allowing builds to run locally, in separate BuildKit containers, or on remote nodes. [^tn8i2u] [^5nshp5] This modular configuration lets teams align build infrastructure with their CI/CD architecture and performance needs. [^tn8i2u] [^d3swku]

- **Advanced caching and reproducibility features**  
  With BuildKit under the hood, Buildx supports sophisticated cache controls, including cache imports/exports to registries or local storage, to significantly speed up repeated builds. [^tn8i2u] [^5nshp5] Reproducible builds and fine‑grained cache configuration help maintain consistent artifacts across environments and pipelines. [^tn8i2u] [^d3swku]

- **Integration with Docker CLI and ecosystem**  
  Buildx is distributed as a Docker CLI plugin, so users interact through familiar commands such as `docker buildx build` while still accessing advanced features. [^tn8i2u] [^5nshp5] This tight integration simplifies adoption in existing Docker workflows and tooling, including popular CI systems that already rely on Docker. [^tn8i2u] [^d3swku]

**Key Features (5–8 bullets, priority order)**  
- **BuildKit‑based extended build capabilities as a Docker CLI plugin** (modern build engine with advanced graph, concurrency, and performance). [^tn8i2u] [^5nshp5]  
- **Multi‑platform image builds and multi‑architecture manifest creation** for heterogeneous deployment targets. [^tn8i2u] [^5nshp5]  
- **Configurable builders, drivers, and remote build contexts** for flexible local and CI/CD build infrastructure. [^tn8i2u] [^5nshp5]  
- **Advanced caching (import/export) for faster, reproducible builds** across runs and environments. [^tn8i2u] [^5nshp5]  
- **Deep Docker CLI integration** via the `docker-buildx` plugin, maintaining familiar commands while extending functionality. [^tn8i2u] [^5nshp5] [^d3swku]  
- **Continuous upstream enhancements, new features, and security fixes** via active release cycle (e.g., v0.35.0 update). [^5nshp5]  
- **Support for modern build workflows such as inline Dockerfile frontend features and BuildKit-specific options**. [^5nshp5] [^d3swku]  

## Product Roadmap / Announcements

As of July 17, 2026,

- **2026‑06‑18 – Release v0.35.0 for docker‑buildx (Fedora update)**: Fedora’s update notification announces **“Update to release v0.35.0”** for `docker-buildx`, including upstream enhancements, new features, fixes, and resolution of CVE‑2026‑39828 and related issues. [^5nshp5]  
- **Ongoing upstream enhancements (BuildKit and Buildx)**: The same Fedora advisory notes “Upstream enhancements, new features, and fixes,” indicating an active development roadmap focused on feature additions and security updates for Buildx. [^5nshp5]

Public, forward‑looking roadmap items beyond these release notes are not clearly documented in major sources; most references are to current releases and changelogs rather than future plans. [^5nshp5]

---

## Recent Developments (past 90 days)

- **2026‑06‑27 – Fedora 43 ships docker‑buildx v0.35.0**: Fedora’s security and update advisory FEDORA‑2026‑3cca6f41d4 confirms that Fedora 43 updated `docker-buildx` to version 0.35.0, addressing CVE‑2026‑39828 and other bugs, and bringing upstream enhancements and new features to Fedora users. [^5nshp5]  
- **Security hardening and bug fixes around Buildx/BuildKit**: The same advisory references multiple Red Hat bugzilla tickets and a CVE, showing active maintenance on Buildx’s security posture and stability in collaboration with distribution maintainers. [^5nshp5]

No additional major standalone news articles focused specifically on Buildx (distinct from Docker or BuildKit generally) were found in the last 90 days. [^5nshp5]

---

# History and Origin Story

Buildx originated as an official [[Tooling/Software Development/Developer Experience/DevOps/Docker|Docker]] project to expose **BuildKit**’s advanced build capabilities through the Docker CLI as a plugin, replacing or extending the older `docker build` workflow with a more modern, feature‑rich interface. [^tn8i2u] [^5nshp5] It evolved alongside BuildKit within the Docker ecosystem as container adoption grew and teams needed multi‑architecture builds, better performance, and more flexible caching and builder configurations, leading Docker to maintain Buildx as a first‑class open‑source tool rather than a separate company or standalone commercial product. [^tn8i2u] [^5nshp5]

# Market Sizing

## Category, Market Size, and Category Growth

Buildx fits within the **[[Container-Management Tools]]**, **[[Vocabulary/Developer Tools|Developer Tools]]**, and **DevOps tooling** categories as it is a Docker CLI plugin for extended build capabilities with BuildKit used in containerized application development and CI/CD. [^tn8i2u] [^d3swku] Broader market analyses consistently describe the containerization and DevOps tools market (including Docker‑related build tooling) as rapidly growing, driven by cloud‑native adoption, although no source breaks out Buildx specifically from Docker or container build tools as a separate market segment. [^tn8i2u] [^5nshp5] Precise market‑size figures for “Buildx” alone are not available; it is best considered part of the growth of Docker and container DevOps tooling in general. [^tn8i2u] [^5nshp5]

---

# Competitive Landscape

## Who it’s for, who it’s not for

Buildx is for **DevOps engineers, [[concepts/Platform Engineering|Platform Engineering]] teams, and container‑focused developers** who use Docker and need advanced build features such as multi‑architecture images, BuildKit caching, and flexible builders across local machines and CI/CD pipelines. [^tn8i2u] [^5nshp5] It fits organizations already invested in Docker tooling and registries, especially those deploying to diverse CPU architectures or seeking more efficient and reproducible image builds than classic `docker build` provides. [^tn8i2u] [^d3swku]

Buildx is less suitable for teams that do not use Docker or containers, or that rely on alternative build systems such as Bazel, Nix, or non‑Docker image builders tied to other runtimes or orchestrators. [^tn8i2u] [^5nshp5] It may also be unnecessary for small projects with simple single‑architecture builds where the standard Docker build command suffices and advanced BuildKit features are not required. [^tn8i2u] [^d3swku]

---

## Viable Alternatives

- **[[Kaniko]]** – A tool for building container images inside Kubernetes or CI environments without requiring a Docker daemon, used as an alternative to Docker‑based build workflows for secure, in‑cluster builds. [^tn8i2u]  
- **[[Tooling/Software Development/DevOps/Buildah]]** – A container image building tool (often paired with [[Tooling/Software Development/Cloud Infrastructure/Podman|Podman]]) that can build OCI images without a running Docker daemon, appealing to environments moving away from Docker. [^tn8i2u]  
- **[[Tooling/Software Development/Developer Experience/DevTools/Bazel|Bazel]] container_image rules** – Bazel’s rules for building container images integrate with its build graph and reproducible build features, suitable for organizations standardizing on Bazel rather than Docker’s build stack. [^tn8i2u]  
- **Google Cloud Build / other cloud‑native build services** – Managed services that build container images in the cloud from source repositories, offering an alternative to local or self‑managed Docker Buildx setups. [^tn8i2u]  

*(Alternatives are chosen based on their role as container image build tools and DevOps build infrastructure; explicit Buildx comparison pages are not common, so rationale is inferred from their documented capabilities for container builds.) [^tn8i2u]*

## Competitor Table

| Competitor                                                                  | Description                                                                                                                                                                                          |
| --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Kaniko](Kaniko)                                                            | Tool for building container images from Dockerfiles within Kubernetes or containerized CI environments without requiring a Docker daemon, often used as a secure alternative to Docker‑based builds. |
| [Buildah](Tooling/Software%20Development/DevOps/Buildah.md)                                                          | OCI‑compliant image builder that works without a Docker daemon and integrates with Podman, providing an alternative image build workflow to Docker Buildx for Linux environments.                    |
| [[Tooling/Software Development/Developer Experience/DevTools/Bazel\|Bazel]] | Build rules in Bazel for producing container images as part of Bazel’s reproducible build system, suitable for organizations using Bazel for monorepo and large‑scale builds.                        |
| [Google Cloud Build](Google Cloud Build)                                    | Managed cloud service that builds container images and other artifacts from source repositories, offloading build execution from local Docker or Buildx setups.                                      |
 Sources: [^tn8i2u]

***

# Sources

[1]: [buildxapp.net: Home](https://buildxapp.net/)
[2]: [ADU Rules in Lakeville, MA - BuildX](https://buildx.com/adu-rules-massachusetts/lakeville/)
[3]: [Buildix ERP | AI Building Material ERP for Lumber Yards](https://buildingmaterial.ai/)
[4]: [Valance Cost (2026 Prices) - BuildX](https://buildx.pro/costs/valance)
[^tn8i2u]: [docker-buildx - extra (x86_64)](https://packages.cachyos.org/package/extra/x86_64/docker-buildx)
[6]: [Buildex - App Store](https://apps.apple.com/de/app/buildex/id6760982526)
[^5nshp5]: [Fedora alert FEDORA-2026-3cca6f41d4 (docker-buildx)](https://lwn.net/Articles/1079936/)
[^d3swku]: [docker-buildx installieren - Automic Vault](https://www.automicvault.com/de/pkg/brew/docker-buildx/)
