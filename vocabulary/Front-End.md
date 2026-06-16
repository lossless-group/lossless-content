---
date_modified: 2026-06-16
site_uuid: 4a3faede-a49a-4ad8-bd85-d2fc717f7914
date_created: 2025-04-06
aliases:
  - Frontend
  - frontend
cf_last_run: 2026-06-16T01:09:11.545Z
cf_last_run_model: Perplexity sonar-pro
tags:
  - User-Interface
  - User-Experience
  - Customer-Experience
  - Developer-Patterns
  - Client-Side
title: Front-End
slug: front-end
at_semantic_version: 0.0.1.1
for_clients:
  - Laerdal
  - Tonguc
  - Param
---


Usually involves heavy use of [[JavaScript]], [[Tooling/Software Development/Programming Languages/CSS|CSS]], and [[Tooling/Software Development/Programming Languages/HTML|HTML]].  Where the [[Vocabulary/User Interface|User Interface]] lives, accounts for most of the [[Vocabulary/User Experience|User Experience]].


[[concepts/Explainers for Tooling/Web Frameworks|Frameworks]] that create more functionality include [[React]], [[Vue.js]], [[Tooling/Enterprise Jobs-to-be-Done/Freshworks|Freshworks]], and [[HTMX]] and [[Unpoly]]. [[Tooling/Software Development/Developer Experience/DevTools/Tauri|Tauri]], [[Tooling/Software Development/Developer Experience/DevTools/Electron|Electron]]. 


https://youtu.be/YO7R0rYWDl8?si=U1747FwJFkggngVc

https://youtube.com/playlist?list=PL4-IK0AVhVjP27yZLwW-gkPggRps0CCnP&si=OknQq_dqvUhG_Pg2

https://youtu.be/D0PRkgSh47M?si=q-j_UQyI2nQc6Dyu

https://youtu.be/GjkQNAZbxKY?is=qGbF7u3VbOVU3oar

# Defining and Describing Front-End

![Side‑by‑side diagram of a web app showing the browser-based front-end (UI, React components, CSS) talking via APIs to a back-end service layer and database](https://www.seobility.net/en/wiki/images/0/04/Frontend-vs-Backend.png)

_“Front‑end” in a startup or innovation context usually means the **user‑facing layer of a digital product**—what runs in the browser, mobile app, or client and directly mediates the customer’s experience with the underlying system._

For innovation work, **front‑end** applies whenever you are talking about the client‑side interface, logic, and performance that users see and interact with: web and mobile UIs, in‑app flows, dashboards, and any presentation layer sitting on top of APIs or back‑end services. [^el085j] It does **not** usually cover databases, internal batch jobs, or infrastructure, even though front‑end and back‑end must be designed together for product-market fit and scalability. [^el085j] An innovation consultant cares about the front‑end because it is where **adoption friction, conversion, and retention** are most directly felt, and where architectural choices (e.g., single‑page app vs. server‑rendered, use of a Backend‑for‑Frontend) can dramatically change time‑to‑market, experimentation speed, and security posture. [^hd1xqv] [^el085j] In platform and API products, consultants also look at “front‑end” from the perspective of how client apps talk to the platform securely and reliably (e.g., OAuth for browser‑based apps). [^hd1xqv] [^el085j]

# Disambiguation

## Primary sense — the innovation-consulting sense

**Front‑end (client‑side / user interface layer)**: the **user‑facing, client‑side portion of an application**—typically browser or mobile code—that renders UI, handles interaction, and calls back‑end APIs over the network. [^1mvja1] [^el085j]

- In web applications, standards bodies and security guidance treat “browser‑based apps” as front‑ends that execute in the user agent (the browser) and communicate with back‑end services or APIs over HTTP using mechanisms like [[projects/Emergent-Innovation/Standards/OAuth|OAuth]] 2.0. [^el085j] These front‑ends own presentation and interaction, while delegating data persistence and heavy business logic to servers. [^el085j]
- Modern front‑ends increasingly consume “backend for frontend” (BFF) gateways: frameworks like Duende BFF sit “between your frontend and backend APIs” and act as a security gateway, explicitly framing the front‑end as the external, user‑facing side of the system. [^hd1xqv] This pattern highlights that front‑end is about the edge where users and untrusted browsers meet the system, not the internal service mesh. [^hd1xqv]
- In complex platforms such as smart‑home systems, developer docs separate *frontend* concepts like entity state formatting, [[content-areas/general/vocabulary/Decarbonization|Decarbonization]], and [[Vocabulary/User Interface|UI]] behavior from core integration logic, underlining that the front‑end is the layer that formats and presents state to users according to their profile and preferences. [^1mvja1] Here, “front‑end” is tightly linked to [[Vocabulary/User Experience|UX]], internationalization, and real‑time feedback loops. [^1mvja1]
- Front‑end is *not* simply “anything that talks to a user”; customer data platforms, for example, have a “Real‑time Customer Profile” that powers consistent experiences “no matter where or when they interact,” but these profile APIs are back‑end capabilities that front‑ends consume rather than part of the front‑end itself. [^r1ym06] The front‑end is the consumer and interpreter of such APIs, not the underlying profile or decisioning engine. [^r1ym06]

## Other senses

### 1. Front-end as network or SSL “client-facing side”

**Front‑end (network / [[projects/Emergent-Innovation/OpenSSL|OpenSSL]] profile sense)**: in networking and infrastructure, the *front‑end* is the **entity that receives requests from a client**, such as the client‑facing side of a load balancer or SSL termination point. [^f247fh]

- Citrix NetScaler, for example, defines the “front‑end profile” as containing “parameters applicable to a front‑end entity (the entity that receives requests from a client)” and distinguishes it from the back‑end profile facing origin servers. [^f247fh] This sense matters to innovation work when architects decide where to terminate TLS, which protocols (HTTP/1 vs [[projects/Emergent-Innovation/Standards/HTTPS|HTTPS]]/2) to negotiate on the **front‑end SSL profile**, and how that affects performance. [^f247fh]
- In platform security designs, this “front‑end entity” is often the API gateway or edge proxy that enforces rate limits, authentication, and ALPN protocol choices before traffic reaches internal services. [^f247fh] While not strictly a UI, it is still the “front‑end” of the system in network terms and shapes latency, reliability, and integration experience. [^f247fh]

- Also used generically in hardware systems (e.g., front‑end electronics) or organizational charts (“front‑end operations”) to mean the client‑facing portion, but these uses rarely carry additional, distinct innovation‑consulting content beyond the general “user‑facing side” notion and are typically subsumed into UX, sales, or service design conversations.

# Etymology and Origin

(omitted: “front‑end” is a plain English compound—“front” + “end”—used in its intuitive sense of the outward‑facing side of a system, and its adoption into software and innovation vocabulary is a straightforward metaphor from physical front/back.)

# Adjacent Vocabulary

- **Synonyms**
  - **Client‑side** – Emphasizes that code runs on the user’s device or browser rather than on servers; often used in security specs for “browser‑based apps.”[^el085j]
  - **User interface (UI) layer** – Highlights screens, layout, and interaction patterns; slightly narrower, focusing more on presentation than on all client‑side logic. [^1mvja1]
  - **Presentation layer** – Classic architectural term for the tier that handles display and input, often mapped directly to the front‑end in three‑tier applications. [^1mvja1]
  - **[[Vocabulary/Edge Computing|Edge Computing]] app / edge client** – Used when front‑end logic runs close to the user at the network edge; emphasizes deployment topology more than UX concerns. [^f247fh]

- **Antonyms**
  - **Back‑end** – The server‑side services, databases, and business logic that front‑ends call over APIs; not directly exposed to end‑users. [^hd1xqv] [^el085j]
  - **Infrastructure / plumbing** – Underlying networks, servers, and platforms that support both front‑end and back‑end, usually invisible to users. [^f247fh]

- **Adjacent terms**
  - [[Backend for Frontend (BFF)]] – Pattern where a dedicated back‑end service is tailored to the needs of a specific front‑end. [^hd1xqv]
  - [[Vocabulary/Single-Page Applications|SPA]] – Front‑end architecture where most logic runs in the browser and navigation happens client‑side. [^el085j]
  - [[Vocabulary/API Gateways|API Gateway]] – Edge service that often acts as the network “front‑end” of back‑end APIs. [^f247fh]
  - [[OAuth 2.0]] – Standard used by browser‑based front‑ends to obtain access tokens securely. [^el085j]
  - [[Customer data platform (CDP)]] – Back‑end system whose profiles and events are surfaced through front‑ends for personalized experiences. [^r1ym06]
  - [[Vocabulary/User Experience|User Experience]] – Broader discipline encompassing front‑end design, flows, and perceived performance. [^1mvja1]

# Usage in Practice

- The [[organizations/Internet Engineering Task Force|IETF]]’s OAuth guidance for browser apps frames the front‑end explicitly as a browser‑based application that must be treated as a public client: “This specification details the threats, attack consequences, security considerations and best practices that must be taken into account when developing browser‑based applications,” i.e., front‑ends that run in the user’s browser and call APIs. [^el085j]
- [[Duende]], describing the Backend‑for‑Frontend pattern for web apps, writes that its library “helps you build secure, modern web applications by acting as a security gateway between your frontend and backend APIs,” illustrating common startup practice where a React or similar front‑end talks to a BFF instead of directly to microservices. [^hd1xqv]
- Adobe’s platform docs implicitly position the front‑end as the consumer of a [[concepts/Explainers for Tooling/Realtime Applications|Realtime Applications]] Customer Profile back‑end: “Use Real-time Customer Profile to drive coordinated, consistent and relevant experiences for your customers no matter where or when they interact with your brand,” with those interactions implemented in front‑end experiences across channels. [^r1ym06]
- Home Assistant’s developer documentation treats “frontend data” as a distinct concern: “These methods allow you to format the state and attributes of an entity. The value will be localized using user profile settings,” showing a front‑end focused on presenting system state in a user‑friendly, localized way. [^1mvja1]

# Common Misuses

- **Calling any client integration a “front‑end” even when there is no user interface.** For machine‑to‑machine API consumers or backend services that call APIs, the more accurate term is **client** or **service consumer**, not front‑end. [^el085j]
- **Labeling an API gateway or edge proxy as the “front‑end” in product discussions.** While network docs may call it a front‑end entity, in product and innovation conversations it is clearer to call this component an **API gateway** or **edge**, reserving “front‑end” for actual user‑facing experiences. [^f247fh]
- **Using “front‑end” interchangeably with “UX” or “[[Vocabulary/UI Design|UI Design]].”** Front‑end encompasses implementation and architecture (performance, security, frameworks), while **UX design** properly covers research, interaction design, and user testing; conflating them hides important skill and responsibility boundaries. [^1mvja1]
- **Describing server‑rendered templates only as “[[Vocabulary/Backend Development|Back-End]]” and ignoring they are also front‑end.** HTML and templates generated on the server still comprise the **front‑end UI** from a user’s perspective; a more precise distinction is between **server‑rendered front‑end** and **client‑rendered front‑end** rather than front‑end vs. back‑end. [^el085j]


***

# Sources

[^hd1xqv]: [Getting Started - Single Frontend - Duende Software Docs](https://docs.duendesoftware.com/bff/getting-started/single-frontend/)
[^f247fh]: [SSL profile infrastructure - Product Documentation - NetScaler](https://docs.netscaler.com/en-us/citrix-adc/current-release/ssl/ssl-profiles/ssl-enabling-the-default-profile.html)
[3]: [EJBCA - Open Source PKI Certificate Authority - Admin Guide](https://ca.mibcon.cz/ejbca/doc/adminguide.html)
[^r1ym06]: [Real-time Customer Profile API - Adobe Developer](https://developer.adobe.com/experience-platform-apis/references/profile)
[5]: [EJBCA Release Notes Summary - Keyfactor Docs](https://docs.keyfactor.com/ejbca/latest/ejbca-release-notes-summary)
[^1mvja1]: [Frontend data - Home Assistant Developer Docs](https://developers.home-assistant.io/docs/frontend/data/)
[^el085j]: [draft-ietf-oauth-browser-based-apps-26](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-browser-based-apps)
[8]: [User management | Clerk Docs](https://clerk.com/docs/guides/users/managing)
