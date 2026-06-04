---
url: https://cozystack.io/
date_created: 2026-06-01
date_modified: 2026-06-01
description_site_cp: Transform a set of bare metal servers into an intelligent system with a simple REST API for spawning Kubernetes clusters, Databases-as-a-Service, virtual machines, load balancers, HTTP caching services, and other services with ease.
og_title: "Cozystack: Free Cloud Platform based on Kubernetes"
og_description: Transform a set of bare metal servers into an intelligent system with a simple REST API for spawning Kubernetes clusters, Databases-as-a-Service, virtual machines, load balancers, HTTP caching services, and other services with ease.Use Cozystack to build your own cloud or provide cost-effective development environments.
og_image: https://cozystack.io/img/cozystack-social.png
og_favicon: https://cozystack.io/favicon.ico
og_site_name: Cozystack
og_type: website
og_last_fetch: 2026-06-01T21:22:33.078Z
site_name: Cozystack
tags:
  - Dev-Ops-Tools
  - Developer-Tools
  - Kubernetes
  - Server-Management-Tools
  - Cloud-Infrastructure
  - Self-Hosting-Cloud
for_clients:
  - Param
  - Tonguc
  - Dynamiq
  - Parslee
  - Chroma
  - FullStackVC
  - Laerdal
site_uuid: 4dede7de-9924-4a0c-82ed-b61d6e196816
publish: true
title: Cozystack
slug: cozystack
at_semantic_version: 0.0.0.1
cf_last_run: 2026-06-01T21:28:00.177Z
cf_last_run_model: Perplexity sonar-pro
---

[[Tooling/Software Development/Developer Experience/DevOps/Kubernetes|Kubernetes]]
[[Vocabulary/Bare Metal Servers]]
[[concepts/Explainers for Tooling/Databases-as-a-Service]]


# Value Proposition & Features

Cozystack is an open-source **platform for building your own cloud on bare‑metal servers**, exposing a simple REST API to create Kubernetes clusters, databases, VMs, load balancers, HTTP caching, and related services. It is a **CNCF Sandbox project** aiming to let organizations run “full‑featured private clouds or AWS alternatives on owned or leased hardware,” reducing dependence on public clouds and improving cost efficiency. [^kxbe2w] Cozystack targets teams that want cloud‑like self-service and automation while keeping full control over infrastructure and data. [^kxbe2w]

Core product capabilities include orchestrating multiple services (Kubernetes, DBaaS, VMs, load balancers, caching) on top of bare metal through an integrated control plane and API. It provides a framework for **specialized clouds**, such as high‑performance AI/ML platforms or compliance-driven environments, using GitOps and platform‑engineering patterns. [^kxbe2w] The platform is designed to let teams build “self-service developer platforms” on top of it and run production‑grade clouds with observability, governance, and automation built in. [^kxbe2w]

**Key features (in priority order)**

- **Bare‑metal to cloud transformation** – turns a set of bare‑metal servers into “an intelligent system” with a REST API for spawning Kubernetes clusters, DBaaS, VMs, load balancers, HTTP caching, and other services.  
- **Kubernetes cluster management** – manages multiple Kubernetes clusters as a first‑class service, with ongoing work on reliability fixes such as kubevirt‑CSI driver improvements for persistent volume attach failures. [^zl1zvg]  
- **Database‑as‑a‑Service** – exposes databases as managed services (DBaaS) on top of the same infrastructure, accessible via the platform’s API.  
- **Virtual machines and KubeVirt integration** – provisions virtual machines alongside containers, leveraging KubeVirt (implied by the kubevirt‑CSI driver in releases) to support VM workloads in the same environment. [^zl1zvg]  
- **Load balancers & HTTP caching** – offers API-driven creation of load balancers and HTTP caching services as part of the cloud stack.  
- **Framework for specialized / AI clouds** – promoted as a “flexible framework for building specialized clouds, including high-performance AI/ML platforms.”[^kxbe2w]  
- **Compliance & data residency** – supports “compliance-driven environments” and helps organizations such as banks meet strict data residency and digital sovereignty requirements by running locally under their control. [^kxbe2w]  
- **Cost optimization vs public cloud** – CNCF event materials claim that switching from public cloud services to bare-metal servers running Cozystack can cut infrastructure bills “by 2 to 5 times.”[^kxbe2w]  

## Screenshots

No reliable source found with official Cozystack UI screenshots that are clearly identified and hosted by the project.

## Product Roadmap / Announcements

As of June 1, 2026,

- **2026‑05‑29** – CozySummit Virtual 2026 announced as a CNCF virtual project event, highlighting roadmap themes such as production deployments, built‑in compliance, hyperscaler alternatives, GitOps automation, and community maintainership as focus areas for Cozystack. [^kxbe2w]  
- **2026‑05‑06** – Cozystack GitHub v0.2.2 patch release shipped, including “two kubevirt-csi-driver reliability fixes for persistent-volume attach failures and a platform fix that makes OpenSearch available in the project service catalog again,” indicating ongoing stability and catalog improvements. [^zl1zvg]  

## Recent Developments (last 90 days)

- **2026‑05‑29** – CNCF announced “CozySummit Virtual 2026,” a Cozystack-focused virtual summit covering architecture, compliance, hyperscaler alternatives, automation & GitOps, and community practices, signaling active community and ecosystem growth. [^kxbe2w]  
- **2026‑05‑06** – Cozystack v0.2.2 patch release on GitHub addressed kubevirt‑CSI driver reliability issues for persistent volumes and restored OpenSearch in the service catalog. [^zl1zvg]  

# History and Origin Story

Cozystack is described by Stack Overflow as an open-source project led by **Andrei Kvapil**, who is the founder of infrastructure company Ænix and a core developer of Cozystack, focused on enabling organizations to “build a cloud” instead of renting one from hyperscalers. [^2ca7tc] CNCF classifies Cozystack as a **CNCF Sandbox project**, indicating its adoption into the cloud native ecosystem and providing a governance framework under which it is being developed and promoted via events like CozySummit. [^2qcyrw] [^kxbe2w] The project’s trajectory emphasizes moving from traditional public‑cloud dependence toward self-hosted, bare‑metal‑backed clouds designed for cost savings, sovereignty, and platform‑engineering use cases. [^kxbe2w] [^2ca7tc]

## Fundraising History

No reliable source found describing any formal venture funding rounds, amounts, or investors specifically for Cozystack.

| Round | Date | Amount | Lead investor |
|-------|------|--------|---------------|
| –     | –    | –      | –             |
| **Total** | – | – | – |

**Investors (alphabetical)**  
No reliable investor information found.

## Notable Team Members

**Andrei Kvapil – Core developer / project leader**  
Stack Overflow’s cloud engineering content identifies Andrei Kvapil as the “founder of Ænix and core developer of Cozystack,” where he discusses building clouds instead of renting them, indicating he is a key technical and strategic leader behind Cozystack’s design and direction. [^2ca7tc]

No additional named leaders for Cozystack itself were found in reputable sources.

# Market Sizing

## Category, Market Size, and Category Growth

Cozystack fits primarily in the **private cloud / on‑premises cloud platform** and **platform engineering / internal developer platform (IDP)** categories, as it enables organizations to build “full-featured private clouds or AWS alternatives on owned or leased hardware” and self-service developer platforms. [^kxbe2w] This situates it within the broader cloud infrastructure and platform‑as‑a‑service markets, but no source provides Cozystack‑specific TAM figures; global private cloud and platform‑engineering market estimates are discussed broadly by analysts but not directly tied to Cozystack in the available sources, so no specific numbers can be cited from them.

## Pricing

No public pricing

No reliable public source describes Cozystack pricing; as an open-source CNCF Sandbox project, its core software appears to be freely available via GitHub, but no official price list or commercial offering details are published. [^kxbe2w] [^zl1zvg]

## Revenue Trajectory Estimates

No reliable source found with revenue, ARR, or commercial metrics for Cozystack.

# Competitive Landscape

## Who it's for, who it's not for

Cozystack is for organizations that want to **run their own cloud on owned or leased hardware**, including enterprises seeking to reduce public cloud costs by “2x–5x,” teams needing strict data residency and sovereignty (for example in banking), and platform engineering groups building self-service developer platforms on top of Kubernetes, VMs, and DBaaS. [^kxbe2w] It also targets regional providers or “local players” that want to compete with global public clouds by offering local IaaS/PaaS services backed by their own bare‑metal infrastructure. [^kxbe2w]

Cozystack is not an ideal fit for teams that prefer fully managed, pay‑as‑you‑go public cloud services and do not want to operate hardware, Kubernetes, or complex infrastructure themselves. [^kxbe2w] [^2ca7tc] It is also less suitable for very small teams or projects without in‑house SRE/platform expertise, where the operational overhead of running a private cloud stack would outweigh the cost savings vs using managed services from hyperscalers. [^kxbe2w] [^2ca7tc]

## Viable Alternatives

- **OpenStack** – mature open-source platform for building private clouds with compute, storage, and networking, widely used for on‑prem IaaS as an alternative to public clouds.  
- **Harvester (by SUSE)** – open-source HCI and virtualization platform built on Kubernetes that allows running VMs and containers on bare metal, similar in spirit to building a private cloud.  
- **Platform9** – managed hybrid cloud and Kubernetes platform that lets organizations run cloud‑like infrastructure on their own hardware with SaaS management.  
- **VMware Cloud Foundation** – commercial stack for private and hybrid clouds providing virtualization, networking, and management, often used by enterprises as an internal cloud platform.  

(Competitors are inferred from category; no source lists them explicitly alongside Cozystack.)

## Competitor Table

| Competitor | Description |
|-----------|-------------|
| [OpenStack] | Open-source software platform for building and managing private and public clouds, providing IaaS capabilities such as compute, storage, and networking on owned infrastructure. |
| [Harvester] | Open-source hyperconverged infrastructure solution built on Kubernetes that runs VMs and containers on bare metal, enabling private cloud‑like environments. |
| [Platform9] | SaaS-managed hybrid cloud and Kubernetes platform that lets organizations run cloud workloads on their own data centers or edge locations with centralized control. |
| [VMware Cloud Foundation] | Integrated software stack combining vSphere, vSAN, NSX, and management tools to create and operate enterprise private and hybrid clouds. |


***

# Sources

[^2qcyrw]: [Managing Kubernetes clusters just got a whole lot simpler. - YouTube](https://www.youtube.com/shorts/inQ9mvnESuA)
[^kxbe2w]: [CozySummit Virtual 2026 | CNCF](https://community2.cncf.io/events/details/cncf-virtual-project-events-hosted-by-cncf-presents-cozysummit-virtual-2026/)
[3]: [Is Kubernetes architecture ready for a major shift? - YouTube](https://www.youtube.com/shorts/87gmWSEwCxg)
[4]: [cozystack/copy-fail-blocker: BPF-LSM mitigation for CVE ... - GitHub](https://github.com/cozystack/copy-fail-blocker)
[5]: [Is a major disruption worth a fix? Cozystack wants to know. - YouTube](https://www.youtube.com/shorts/PdBv2eNqZ4o)
[^zl1zvg]: [Releases · cozystack/cozystack - GitHub](https://github.com/cozystack/cozystack/releases)
[^2ca7tc]: [cloud - The Stack Overflow Blog](https://stackoverflow.blog/cloud/)
