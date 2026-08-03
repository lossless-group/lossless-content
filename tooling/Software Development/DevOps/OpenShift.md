---
url: https://www.redhat.com/en/technologies/cloud-computing/openshift
product_of: "[[organizations/RedHat|RedHat]]"
date_created: 2026-05-13
date_modified: 2026-07-17
og_title: Red Hat OpenShift
og_description: A unified application development platform that lets you build, modernize, and deploy applications at scale on your choice of hybrid cloud infrastructure.
og_image: https://www.redhat.com/themes/custom/rhdc/img/red-hat-social-share.jpg
og_favicon: https://www.redhat.com/favicon.ico
og_type: website
og_last_fetch: 2026-05-14T00:44:42.817Z
site_uuid: 293f9598-96a2-4cb3-ac24-35d420f8dc43
publish: true
title: OpenShift
slug: openshift
at_semantic_version: 0.0.0.1
tags:
  - Cloud-Infrastructure
  - Software-Supply-Chain
  - Software-Development
  - Developer-Tools
  - Dev-Ops-Tools
cf_last_run: 2026-07-17T20:46:11.596Z
cf_last_run_model: Perplexity sonar-pro
---

[[Vocabulary/Dev Ops|DevOps]]
[[concepts/Software Development Lifecycle|Software Development Lifecycle]]
[[organizations/RedHat|RedHat]]
[[Tooling/Software Development/Developer Experience/DevOps/Kubernetes|Kubernetes]]

# Value Proposition & Features

Red Hat **OpenShift** is an enterprise [[Tooling/Software Development/Developer Experience/DevOps/Kubernetes|Kubernetes]] platform that provides a **consistent hybrid cloud foundation** for building, deploying, and scaling containerized applications across on‑premises and multiple public clouds. [^r8696a] [^a9b5fu] It extends upstream Kubernetes with integrated security, CI/CD, monitoring, developer tooling, and enterprise support, offering a unified application development platform for modernizing and running workloads at scale. [^a9b5fu] [^30asmk] The platform is designed as an “enterprise lifecycle contract around Kubernetes, Linux and operators,” reducing unsupported assembly work and simplifying upgrades for large organizations. [^fj4dfm]

**Core product features (high level)**  
OpenShift is delivered as a complete, opinionated Kubernetes distribution that runs on Red Hat Enterprise Linux CoreOS and uses CRI‑O as its container runtime, shipping a full stack rather than a base layer to assemble yourself. [^30asmk] It includes a hardened security model (Security Context Constraints), built‑in CI/CD (OpenShift Pipelines, OpenShift GitOps), monitoring (Prometheus, Grafana), logging, service mesh, and an integrated image registry, all managed through a web and developer console. [^30asmk] [^6v9iyc] It supports hybrid and multi‑cloud deployments (bare metal, VMware, AWS/ROSA, Azure/ARO, GCP, and air‑gapped environments), with enterprise‑grade support and certified operators for common middleware and databases. [^30asmk] [^4x2w84]

**Key feature bullets (5–8, priority order)**

- **Enterprise Kubernetes distribution & hybrid cloud foundation** – Commercial Kubernetes platform (OpenShift Container Platform) running on RHEL CoreOS with CRI‑O, designed as a consistent hybrid cloud foundation for containerized applications. [^r8696a] [^30asmk]  
- **Integrated security and compliance** – Hardened security by default via Security Context Constraints, built‑in authentication/authorization, vulnerability scanning (e.g., Container Security Operator), and governance features aimed at regulated enterprises. [^6v9iyc] [^4x2w84] [^30asmk]  
- **Built‑in CI/CD and GitOps** – OpenShift Pipelines (Tekton‑based) and OpenShift GitOps (Argo CD‑based) provide integrated CI/CD and GitOps workflows without separate setup. [^30asmk] [^4x2w84]  
- **Developer and admin consoles** – A full web console and developer console allow deploying and managing applications and clusters without having to work directly with YAML or only CLI tools. [^6v9iyc] [^30asmk]  
- **Integrated image registry & Source‑to‑Image (S2I)** – Includes a built‑in container image registry with ImageStreams and S2I to turn source code into container images for quick deployments. [^4x2w84] [^30asmk]  
- **Service mesh and observability** – OpenShift Service Mesh (Istio/Envoy‑based) plus integrated monitoring (Prometheus, Grafana) and logging deliver traffic management, mutual TLS, and deep observability. [^30asmk]  
- **OpenShift Virtualization** – Add‑on feature to run and manage virtual machine workloads alongside containers in the same Kubernetes platform, built on KubeVirt. [^r8696a] [^pa2b12] [^30asmk]  
- **AI/ML platform (OpenShift AI)** – Enterprise AI/ML layer (formerly OpenShift Data Science) for model training, serving, pipelines, and AI‑assisted operations (Lightspeed) on top of OpenShift. [^30asmk]  

### Selected core features (2–3 sentences each)

**1. Enterprise Kubernetes platform & hybrid cloud deployment**  
OpenShift Container Platform is Red Hat’s commercial enterprise Kubernetes distribution that ships as a complete bundle, adding security controls, developer tooling, CI/CD, monitoring, and a service mesh on top of upstream Kubernetes. [^30asmk] [^4x2w84] It runs consistently across bare metal, VMware, AWS (ROSA), Azure (ARO), GCP, and supports air‑gapped deployments, enabling uniform application lifecycle management across hybrid and multi‑cloud environments. [^30asmk] [^a9b5fu]

**2. Security & governance**  
OpenShift enforces a hardened security model by default, including Security Context Constraints that prevent containers from running as root unless explicitly allowed, plus integrated authentication and authorization. [^6v9iyc] [^4x2w84] It provides vulnerability scanning tools like the Container Security Operator that monitor running pods and retrieve image vulnerability data from registries such as Quay, helping enterprises meet compliance requirements. [^4x2w84]

**3. CI/CD and GitOps automation**  
OpenShift includes OpenShift Pipelines (based on Tekton) for cloud‑native CI/CD and OpenShift GitOps (based on Argo CD) for Git‑driven deployment automation, reducing the need for separate tooling. [^30asmk] [^4x2w84] These built‑in capabilities standardize application delivery workflows across teams and environments, integrating with the platform’s security and observability features. [^30asmk]

**4. Developer & admin experience**  
The platform offers a comprehensive web console and dedicated developer console where developers can deploy applications and manage resources without directly editing Kubernetes YAML, supporting diverse team skill sets. [^6v9iyc] [^30asmk] OperatorHub provides a GUI for discovering and installing Kubernetes Operators, including Red Hat‑certified and community operators, simplifying lifecycle management of stateful services such as databases and middleware. [^30asmk]

**5. OpenShift Virtualization (VMs with containers)**  
OpenShift Virtualization is a native feature/add‑on that lets teams run existing VM workloads alongside containerized apps within the same OpenShift cluster, using a unified Kubernetes operating model. [^r8696a] [^pa2b12] Built on KubeVirt, it treats virtual machines as Kubernetes‑native objects that can be managed with standard APIs, kubectl, and the OpenShift web console, providing a migration path for VMware workloads via the Migration Toolkit for Virtualization. [^pa2b12] [^30asmk]

**6. Service mesh & observability stack**  
OpenShift Service Mesh, built on Istio and Envoy, delivers traffic management, observability, and mutual TLS between microservices deployed on the platform. [^30asmk] Combined with integrated monitoring (Prometheus, Grafana) and logging, it gives operators fine‑grained visibility and control over distributed applications without separately assembling these components. [^30asmk]

**7. OpenShift AI (AI/ML platform on OpenShift)**  
OpenShift AI is Red Hat’s enterprise AI/ML platform, formerly known as OpenShift Data Science, providing capabilities for model training, serving, and pipeline management atop OpenShift. [^30asmk] It includes Lightspeed, an AI‑assisted operations feature that supports natural‑language cluster administration, targeting heavy AI workloads and operational efficiency. [^30asmk] [^a6ngme]

---

## Screenshots

No reliable official screenshot URLs were found that can be clearly identified and reused as standalone image assets for OpenShift Container Platform. No reliable source found.

---

## Product Roadmap / Announcements

As of July 17, 2026,

- **2026‑06** – OpenShift 4.22 release highlighted in “In the Clouds (E53) | OpenShift 4.22 is here ft. Daniel Messer,” describing major advancements across networking, infrastructure operations, workload orchestration, and AI enablement for the hybrid cloud platform. [^r5qdmi]  
- **2026‑06** – TechZine coverage of OpenShift 4.21 and 4.22 notes introduction of advanced Dynamic Resource Allocation for GPUs in 4.21 and extended AI workload support and virtualization capabilities, positioning the platform for heavy AI workloads and unified VM/container operations. [^a6ngme]  

---

## Recent Developments (past 90 days)

- **OpenShift 4.22 release (June 2026)** – Red Hat announced OpenShift 4.22, emphasizing improvements in networking, infrastructure operations, workload orchestration, and AI enablement for enterprise hybrid cloud environments. [^r5qdmi]  
- **Coverage of virtualization & AI readiness (June 2026)** – TechZine reported that OpenShift 4.21 and subsequent updates introduced advanced Dynamic Resource Allocation for GPUs and enhanced OpenShift Virtualization, allowing VMs, containers, and advanced AI applications to run side by side under a unified operational model. [^a6ngme]  
- **Platform engineering adoption discussion (2026)** – OnlineITGuru highlighted increasing OpenShift adoption driven by platform engineering practices, citing features like self‑service infrastructure, automated deployment pipelines, standardized environments, and security automation. [^uu6m1u]  

---

# History and Origin Story

Red Hat OpenShift originated as Red Hat’s commercial Kubernetes container platform, evolving into OpenShift Container Platform that combines Kubernetes, Red Hat Enterprise Linux CoreOS, cluster operators, Operator Lifecycle Manager, registries, support policies, and certified integrations into a unified operating model. [^fj4dfm] [^r8696a] It is “best understood as an enterprise lifecycle contract around Kubernetes, Linux and operators,” positioning OpenShift as a full‑stack, opinionated platform for enterprises seeking a stable and supported path to adopt and upgrade Kubernetes across hybrid cloud environments. [^fj4dfm] [^30asmk]

# Market Sizing

## Category, Market Size, and Category Growth

OpenShift fits primarily into the categories of **enterprise Kubernetes platform**, **container orchestration**, and **hybrid cloud application platform**, with use across cloud infrastructure, DevOps tooling, and software development pipelines. [^a9b5fu] [^30asmk] [^uu6m1u] Analyst‑grade quantitative market size figures for OpenShift specifically were not found, but it participates in the wider market for Kubernetes management platforms and hybrid cloud infrastructure, which analysts commonly describe as fast‑growing due to enterprise cloud‑native adoption and AI workload expansion. [^a6ngme] [^uu6m1u]

## Pricing

Public, precise SKU‑level pricing for OpenShift Container Platform is not listed in the consulted sources; one Brazilian consulting article notes that OpenShift uses **core‑based licensing**, which significantly impacts cost for large deployments. [^26vpip] Overall, OpenShift is positioned as an enterprise subscription product with Red Hat support SLAs, typically negotiated per customer rather than via transparent list pricing. [^4x2w84] [^r8696a]

| Tier | Description | Price |
|------|-------------|-------|
| Enterprise subscription (core‑based licensing) | Commercial OpenShift Container Platform and related services, licensed per core with Red Hat enterprise support SLAs. [^26vpip] [^r8696a] | No public pricing |

# Competitive Landscape

## Who it's for, who it's not for

OpenShift is for **large and mid‑size enterprises** that need a fully integrated, supported Kubernetes platform with hardened security, multi‑cloud deployment options, and standardized DevOps tooling, particularly in regulated industries or complex hybrid environments. [^6v9iyc] [^uu6m1u] [^30asmk] Organizations that prioritize platform engineering, self‑service infrastructure, automated pipelines, and security automation across diverse teams benefit from OpenShift’s opinionated stack and enterprise lifecycle support. [^uu6m1u] [^fj4dfm]

OpenShift is typically not ideal for **small teams or cost‑sensitive organizations** that are comfortable assembling their own Kubernetes stack and using unmanaged or minimally managed cloud Kubernetes services, due to licensing by core and the operational surface area of its features. [^26vpip] [^30asmk] It may also be less suited to scenarios where maximum DIY flexibility and minimal vendor lock‑in are favored over an opinionated, vendor‑supported distribution, since OpenShift adds platform conventions and support contracts around upstream Kubernetes. [^fj4dfm] [^26vpip]

## Viable Alternatives

- **Native cloud Kubernetes services (e.g., Amazon EKS, Google GKE, Azure AKS)** – For teams wanting managed control planes with more DIY assembly of surrounding tools rather than a fully opinionated platform. [^4x2w84] [^6v9iyc]  
- **Rancher (SUSE Rancher)** – An alternative enterprise Kubernetes management platform focusing on multi‑cluster and multi‑distribution management with different licensing and ecosystem choices. Inferred from category, no direct source.  
- **[[VMware]] Tanzu Kubernetes Grid / Tanzu Application Platform** – Competes by integrating Kubernetes with VMware infrastructure and application tooling, relevant where VMware is already standard. Inferred from category, no direct source.  
- **IBM Cloud Kubernetes Service** – IBM’s managed Kubernetes offering for organizations preferring IBM Cloud but not necessarily OpenShift’s full stack; OpenShift on IBM Cloud co‑exists as a more opinionated option. [^a9b5fu]  
- **[[organizations/Canonical|Canonical]] Charmed Kubernetes / MicroK8s** – For organizations seeking open‑source Kubernetes distributions without the same commercial bundle as OpenShift, aiming for lighter‑weight or more DIY setups. Inferred from category, no direct source.  

## Competitor Table

| Competitor | Description |
|------------|-------------|
| [Amazon Elastic Kubernetes Service (EKS)]() | Managed Kubernetes control plane on AWS, providing scalable Kubernetes clusters with AWS integrations but requiring separate assembly of CI/CD, service mesh, and security tooling. [^4x2w84] |
| [Google Kubernetes Engine (GKE)]() | Google Cloud’s managed Kubernetes service offering high automation and integration with Google Cloud services, but without OpenShift’s bundled enterprise stack and opinionated security model. [^4x2w84] |
| [Azure Kubernetes Service (AKS)]() | Microsoft Azure’s managed Kubernetes platform that simplifies cluster operations on Azure, generally relying on additional Azure services rather than an integrated suite like OpenShift. [^6v9iyc] |
| [IBM Cloud Kubernetes Service]() | IBM Cloud’s managed Kubernetes offering that provides container orchestration on IBM Cloud; contrasted with Red Hat OpenShift on IBM Cloud, which adds a trusted, extended Kubernetes platform. [^a9b5fu] |
| [SUSE Rancher]() | Enterprise Kubernetes management platform that focuses on multi‑cluster operations across various distributions, offering an alternative to OpenShift’s tightly integrated, Red Hat‑curated stack. Inferred from category, no direct source. |


***

# Sources

[^fj4dfm]: [Red Hat's OpenShift Bet Is an Upgrade Path, Not a Kubernetes](https://btw.media/en/red-hats-openshift-bet-is-an-upgrade-path-not-a-kubernetes-shortcut)
[^a6ngme]: [Red Hat OpenShift tackles the tough virtualization headache](https://www.techzine.eu/blogs/infrastructure/142411/red-hat-openshift-tackles-the-tough-virtualization-headache/)
[^pa2b12]: [What is OpenShift Virtualization? Complete Guide - Portworx](https://portworx.com/knowledge-hub/openshift-virtualization-guide/)
[^6v9iyc]: [OpenShift vs Kubernetes: which platform to choose | Andes Digital](https://www.andesdigital.com/en/guias/openshift-vs-kubernetes-empresas-chile/)
[^26vpip]: [OpenShift vs Kubernetes Gerenciado: O Que a Empresa BR Precisa Saber (2026) | Audaks](https://audaks.com.br/blog/openshift-vs-kubernetes-gerenciado-brasil-2026)
[^a9b5fu]: [Understanding Red Hat OpenShift on IBM Cloud](https://cloud.ibm.com/docs/openshift?topic=openshift-overview)
[^uu6m1u]: [Online Courses | Online IT Certification Training | OnlineITGuru](https://onlineitguru.com/blog/why-is-platform-engineering-driving-openshift-adoption-in-2026)
[^4x2w84]: [OpenShift vs Kubernetes: What's the Difference? - Portworx](https://portworx.com/knowledge-hub/openshift-vs-kubernetes-whats-the-difference/)
[^r5qdmi]: [In the Clouds (E53) | OpenShift 4.22 is here ft. Daniel Messer](https://www.youtube.com/watch?v=_5yGl8_WPgA)
[^30asmk]: [What is OpenShift Container Platform? | Blog - Northflank](https://northflank.com/blog/what-is-openshift-container-platform)
[^r8696a]: [Red Hat OpenShift Container Platform](https://access.redhat.com/products/red-hat-openshift-container-platform/)
