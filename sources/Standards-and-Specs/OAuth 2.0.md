---
cf_last_run: 2026-11-07T04:55:10.893Z
cf_last_run_model: Perplexity sonar-deep-research
date_created: 2026-10-18
date_modified: 2026-11-07
site_uuid: 2ba10bdf-7c63-4596-8b52-96b7f3d536c3
publish: true
title: OAuth 2.0
slug: oauth-20
at_semantic_version: 0.0.0.1
tags:
  - Open-Specifications
  - API-Standards
  - Authorization
  - User-Authorization
for_clients:
  - Laerdal
  - AI-Camp
  - Param
  - FullStackVC
  - ProfileHealth
  - Tonguc
---

# Snapshot

_OAuth 2.0 is the authorization substrate of the modern API economy: it replaced password-sharing with scoped, revocable delegation and became the base layer for sign-in, open banking, cloud identity, and now agent-to-tool access. [^ux6wpn] [^7oeytp] [^kdp5wh] [^kga6lo] Its strategic weakness is inseparable from its success—the 2012 framework was permissive enough to fit almost every platform, but loose enough that “OAuth 2.0 compliant” never guaranteed interoperability or safe defaults. [^xfcnu4] [^7bojdk]_

**Created by** [Eran Hammer-Lahav](https://datatracker.ietf.org/doc/draft-hammer-oauth2/), [David Recordon](https://github.com/davidrecordon/OAuth-2.0), and [Dick Hardt](https://github.com/dickhardt) (2010) · **Maintained by** IETF Web Authorization Protocol Working Group, chaired by [Hannes Tschofenig](https://datatracker.ietf.org/person/Hannes.Tschofenig@gmx.net) and Rifaat Shekh-Yusef, with Michael B. Jones as secretary · **Type:** de-jure. [^2xcvyd] [^aoidm4] [^yrcox8] [^rudbn3]

> “The OAuth 2.0 authorization framework enables a third-party application to obtain limited access to an HTTP service,” either on behalf of a resource owner or on the application’s own behalf. [^ux6wpn]

OAuth 2.0 is a standards-track authorization framework, published as RFC 6749 in October 2012 after a public drafting process that began in April 2010. [^8nb8l0] [^2xcvyd] It defines roles and token-acquisition patterns for delegated access, while leaving authentication, token format, client discovery, registration, and many deployment choices to companion specifications or implementers. [^ux6wpn] [^xfcnu4] It is worth profiling now because OAuth 2.1 is approaching IETF submission, the 2025 security BCP has formally retired unsafe modes, and AI-agent protocols such as MCP are extending OAuth into relationships its original architecture did not anticipate. [^yrcox8] [^potvl0] [^kga6lo] [^8cogpj]

# The Question this Spec Answers

Before [[projects/Emergent-Innovation/Standards/OAuth|OAuth]], third-party applications commonly needed a user’s long-term account credentials—or a proprietary, provider-specific authorization mechanism—to call an API on the user’s behalf; the original OAuth community formed because OpenID could identify a user but did not provide a general standard for delegated API access. [^qm3lx1] [^hsv4ok] That model gave applications excessive authority, made selective revocation difficult, trained users to disclose passwords, and forced every platform to invent its own integration contract. [^potvl0] [^k7jm51] OAuth 2.0 answers: **How can a resource owner authorize a client to obtain limited, time-bounded access to an HTTP service without transferring the owner’s long-term credentials to that client?** [^ux6wpn] By standardizing authorization servers, clients, resource servers, scopes, access tokens, and several grant patterns, it made reusable integrations across web applications, native apps, devices, service-to-service systems, financial APIs, and—through later profiles—AI tools economically tractable. [^dm2128] [^7iq9wh] [^kdp5wh] [^kga6lo]

# Identity & Status

| Field | OAuth 2.0 |
|---|---|
| **Full name** | **The OAuth 2.0 Authorization Framework**, commonly “OAuth 2.0” or “OAuth 2.” |
| **Type** | A standards-track authorization framework and protocol family, published as RFC 6749; it is not itself an authentication protocol. |
| **Authority type** | **De-jure.** RFC 6749 is an IETF Standards Track RFC produced through the IETF OAuth Working Group, with public drafts, mailing-list archives, named chairs, IESG review, and an RFC editor named on the cover. |
| **Created by** | The first public OAuth 2.0 draft named **Eran Hammer-Lahav of Yahoo!** as editor, **David Recordon of Facebook**, and **Dick Hardt** as authors; it also credited substantive participation by Allen Tom of Yahoo!, Brian Eaton of Google, Brent Goldman and Luke Shepard of Facebook, Raffi Krikorian of Twitter, and Yaron Goland of Microsoft. |
| **Created year** | **2010**. The first public OAuth 2.0 Internet-Draft was dated April 22, 2010. |
| **Original publisher** | **Internet Engineering Task Force**, through its Internet-Draft repository; the initial document was an individual Internet-Draft rather than an adopted working-group document. |
| **Final RFC editor** | **Dick Hardt**, affiliated with Microsoft on RFC 6749’s cover. |
| **Maintained by** | The active **IETF Web Authorization Protocol Working Group**; its current chairs are Hannes Tschofenig and Rifaat Shekh-Yusef, its secretary is Michael B. Jones, and its assigned Security Area Director is Deb Cooley. |
| **Current version** | **RFC 6749**, published October 2012, remains the core OAuth 2.0 framework; it has been updated by RFC 8252, RFC 8996, and RFC 9700. The in-progress consolidation and likely successor is **OAuth 2.1 draft-ietf-oauth-v2-1-17**, dated October 30, 2026. |
| **Lifecycle stage** | RFC 6749 is an IETF **Proposed Standard** and remains active, but important portions of its original operating envelope have been superseded by Best Current Practice guidance. OAuth 2.1 remains an active Working Group Internet-Draft with a December 2026 milestone for submission to the IESG. |
| **License** | Copyright is held by the IETF Trust and identified authors, subject to BCP 78 and the IETF Trust Legal Provisions; extracted code components use the Simplified BSD terms specified by those provisions. This is not a generic MIT or CC-BY publication license, and the document license does not itself grant patent rights; IETF patent disclosure operates through BCP 79. |
| **Canonical URL** | [RFC 6749 — The OAuth 2.0 Authorization Framework](https://datatracker.ietf.org/doc/html/rfc6749). |

Sources for Table: [^8nb8l0] [^qer553] [^ux6wpn] [^yrcox8] [^ofzvf8] [^2xcvyd] [^aoidm4] [^xvrw04] [^q2g0fd] [^638g9w] [^rudbn3] [^2nmjws] [^gzn18r] [^kedwc4] [^potvl0] [^4rkp8t] [^zau3zy] [^lrdqc0] [^9ogv2n]

The identity requires one distinction: OAuth 2.0’s **inception authors** and its **published-RFC editor** are not the same list. David Recordon edited the initial protocol text from OAuth 1.0 and OAuth WRAP, Eran Hammer-Lahav edited drafts through revision 26, and Dick Hardt took the document through final publication after Hammer withdrew. [^mvkm6n] [^1jfgog] [^h9yw3q]

# Why It Matters

## What it unlocks

| Unlock | Strategic significance |
|---|---|
| **Delegation without password transfer** | A user can approve limited third-party access while the authorization server retains control of the user’s primary credentials. This separates an integration’s authority from possession of the account password and permits access to be scoped, expired, or revoked independently. |
| **A common authorization architecture across client types** | OAuth 2.0 established reusable roles and flows for server-side web apps, browser clients, installed applications, limited-input devices, and machine clients; Google’s implementation alone documents web-server, client-side, installed, device, and service-account scenarios. |
| **Portable identity and sign-in layers** | OpenID Connect uses OAuth 2.0 as its authorization substrate and adds interoperable end-user authentication and profile claims, turning OAuth’s delegation machinery into the base for widely deployed federated sign-in. |
| **Regulated, consent-driven data portability** | UK Open Banking adopted FAPI—a hardened OAuth profile—for bank APIs, enabling customers and SMEs to authorize third-party financial services without giving those services bank passwords. |
| **Extensible high-assurance security** | PKCE, PAR, DPoP, mTLS, JAR, authorization-server metadata, and FAPI can harden the generic framework for interception resistance, request integrity, sender-constrained tokens, discovery, and high-value APIs. |
| **A reusable authorization layer for new protocol families** | MCP’s HTTP authorization model now requires OAuth Protected Resource Metadata and uses OAuth discovery to connect clients, protected tool servers, and authorization servers. |

Sources for Table: [^ux6wpn] [^yrq8kp] [^dm2128] [^7oeytp] [^kdp5wh] [^btl2xx] [^ssht0g] [^qcg79c] [^w2tn9l] [^kga6lo] [^iv2k8s]

## Impact it has had

| Impact | Evidence and consequence |
|---|---|
| **OAuth 1.0 was displaced as the mainstream baseline** | RFC 6749 explicitly obsoleted RFC 5849, and providers such as Atlassian and X have continued moving integrations from OAuth 1.0a to OAuth 2.0. |
| **Password-sharing and screen scraping lost legitimacy** | Modern open-banking APIs use tokenized OAuth access rather than handing raw bank credentials to aggregators; UK guidance layers OAuth 2.0 and OpenID Connect over mutually authenticated transport security. |
| **Cloud and SaaS authorization converged on a common vocabulary** | Google, Microsoft, GitHub, Salesforce, AWS Cognito, Okta, and many other platforms expose OAuth 2.0 authorization endpoints or grant flows, allowing client libraries and integration products to reuse the same broad model. |
| **A large implementation and services market emerged** | Microsoft says more than 720,000 organizations use Entra ID, Auth0 reports more than 2,000 enterprise customers and 42 million daily logins, and Okta says two-thirds of the Fortune 100 use its identity products. |
| **The original “implicit” and password grants are dying** | RFC 9700 says the resource-owner password credentials grant must not be used, while OAuth 2.1 omits both that grant and the implicit grant and makes PKCE the baseline for authorization-code clients. |
| **Regulators turned an Internet framework into procurement infrastructure** | UK Open Banking’s 2018 governance decision moved its security profile to FAPI, and the standards body has encouraged account-servicing institutions to obtain OpenID Foundation conformance certification. |
| **OAuth’s flexibility also preserved vendor variation** | The framework admits that its optional components and undefined discovery, registration, and capability mechanisms can yield non-interoperable implementations requiring provider-specific configuration. Aaron Parecki later catalogued those variations and observed that most implementations were not automatically interoperable. |
Sources for Table: [^8nb8l0] [^vsi26r] [^9hd935] [^x5xcpv] [^5pmyr2] [^dm2128] [^c34wl6] [^a4x292] [^r7mx66] [^rs8h57] [^2a515a] [^24nlfa] [^m66fm6] [^fhrwb1] [^potvl0] [^ai8dkq] [^vovvd7] [^xfcnu4] [^7bojdk]

# Position in the Ecosystem Stack

## What it depends on

| Dependency | Role beneath OAuth 2.0 |
|---|---|
| **HTTP and HTTP redirection** | OAuth’s authorization and token interactions are HTTP-based, and browser redirection carries the resource owner between the client and authorization server. |
| **TLS / HTTPS** | The authorization endpoint requires TLS, while current security guidance recommends end-to-end modern TLS between clients and resource servers. |
| **URI Generic Syntax, RFC 3986** | Redirect endpoints and other protocol locations are represented and validated as URIs. |
| **JSON** | Token and error responses use JSON structures; RFC 6749 normatively referenced the then-current JSON specification, RFC 4627. |
| **HTML form encoding** | Authorization and token parameters use `application/x-www-form-urlencoded` conventions. |
| **ABNF, RFC 5234** | RFC 6749 uses ABNF to define protocol-element syntax. |

Sources for Table: [^ux6wpn] [^z7kyrk] [^4w5gja] [^54zgao] [^r7f5zk] [^3k0mrk] [^wqs2iv]

## What depends on it

| Downstream specification or convention | Relationship to OAuth 2.0 |
|---|---|
| **OpenID Connect Core 1.0** | Adds authentication and end-user claims on top of OAuth 2.0. |
| **Financial-grade API 1.0 and 2.0** | Profiles OAuth for high-value, higher-assurance APIs, including banking and government deployments. |
| **User-Managed Access 2.0** | Uses OAuth roles and tokens to coordinate policy-based, asynchronous sharing of protected resources. |
| **IndieAuth** | Adds URL-based identity semantics to OAuth and is used by Micropub clients to obtain bearer tokens. |
| **Solid-OIDC** | Combines OAuth, OpenID Connect, DPoP, and WebID-oriented identity for decentralized Solid data pods. |
| **AT Protocol OAuth profile** | Uses OAuth 2.1 as its base and adds mandatory PKCE, PAR, DPoP, and URL-based client metadata for decentralized social-network clients. |
| **Model Context Protocol authorization** | Uses OAuth protected-resource metadata, authorization-server discovery, audience binding, and authorization-code patterns for remote tool access. |
| **Open-banking security profiles** | UK Open Banking and comparable ecosystems use FAPI and OpenID Connect as hardened OAuth-based security layers. |

Sources for Table: [^7oeytp] [^r62vj4] [^01rtqu] [^10oh9i] [^j43nly] [^bl16mb] [^t6tnfo] [^gj4mc4] [^pchte7] [^bsv19i] [^kga6lo] [^iv2k8s] [^kdp5wh] [^8z13h9]

## Companion specs

The operational OAuth 2.0 family is much larger than RFC 6749. The essential companions are RFC 6750 for bearer-token use, RFC 7636 for PKCE, RFC 8414 for authorization-server metadata, RFC 9126 for pushed authorization requests, and RFC 9449 for DPoP sender-constrained tokens. [^ssht0g] [^qcg79c] RFC 9700 is now the security baseline that interprets the older framework in light of attacks and deployment experience, while RFC 10017 supplies current guidance for browser-based applications. [^potvl0] [^9l0tl5]

**Strategic positioning:** OAuth controls the delegation seam between applications, authorization infrastructure, and APIs; owning the authorization server, client SDK, or policy layer at that seam creates distribution power across every product that must request, issue, validate, or govern access tokens. [^ux6wpn] [^j7os1m]

# Lineage

## Predecessors

| Predecessor | What it contributed and why the ecosystem moved on |
|---|---|
| **Credential sharing and proprietary API tokens** | These enabled integrations but gave third parties broad credentials, weak revocation, and vendor-specific behavior; OAuth replaced them with provider-issued, scoped tokens. |
| **OAuth Core 1.0 / RFC 5849** | OAuth 1.0 established delegated authorization and request signing, but imposed more client-side cryptographic complexity and had limited extensibility; OAuth 2.0 was a redesign informed by implementation experience and a session-fixation vulnerability. |
| **OAuth WRAP** | WRAP explored bearer-token and enterprise-friendly profiles; the first OAuth 2.0 draft explicitly combined WRAP with OAuth 1.0a. |
| **OpenID 1.x/2.0** | OpenID addressed authentication rather than delegated API access; the original OAuth community emerged because OpenID alone could not authorize a third-party application to use an API. |
| **SAML 2.0 and WS-* security stacks** | These supplied enterprise federation and assertion patterns but were heavier and less natural for consumer-web APIs; OAuth retained extension points for SAML assertions rather than attempting to replace every enterprise identity workflow. |

Sources for Table: [^k7jm51] [^yrq8kp] [^xli6se] [^d1btf5] [^h9yw3q] [^9i6akx] [^qm3lx1] [^hsv4ok] [^y4xo8e]

## Parallel efforts

| Parallel effort | Distinguishing bet and adoption signal |
|---|---|
| **SAML 2.0** | Uses signed XML assertions and established trust relationships, remaining common in enterprise workforce federation; OAuth and OpenID Connect instead emphasize HTTP APIs, tokens, and application delegation. |
| **AWS Signature Version 4** | Signs each AWS API request with service-, region-, and date-scoped derived credentials rather than using bearer-token delegation as the universal API model. |
| **IndieAuth** | Retains OAuth’s token machinery but identifies users and clients with URLs, minimizing dependence on a centralized client-registration authority. |
| **GNAP** | Starts from dynamic negotiation and key-bound requests rather than OAuth’s pre-registered client, grant-type, and bearer-token heritage; RFC 9635 explicitly says it is neither an OAuth extension nor directly compatible with OAuth 2.0. |

Sources for Table: [^qfvv1q] [^hwd785] [^icij64] [^blp2w4] [^p3foco]

## Likely successors

| Candidate | Status and succession thesis |
|---|---|
| **OAuth 2.1** | The direct, backward-conscious successor: an active IETF OAuth Working Group draft that consolidates RFC 6749, PKCE, native-app and browser guidance, and the security BCP into a safer baseline. Revision 17 was published October 30, 2026. |
| **GNAP, RFC 9635** | A clean architectural alternative for dynamic clients, negotiated interactions, and key-bound access; its own RFC expects GNAP and OAuth to coexist rather than predicting immediate replacement. |
| **AAuth and agent-authorization drafts** | Early proposals attempting to represent autonomous software, delegated missions, and agent-specific authority that conventional OAuth client registration does not model cleanly. |

Sources for Table: [^1is0vk] [^7wldv2] [^5byyc8] [^p3foco] [^8z8pvs] [^g96b1j]

OAuth 2.1 is the most likely successor to the **core document**, but not to the wider OAuth ecosystem; its stated purpose is consolidation rather than a clean-slate protocol. [^7wldv2] [^su3nmo]

# Governance & Stewardship

## Editors, chairs, and sponsoring participants

| Person | Role |
|---|---|
| **David Recordon** | Initial OAuth 2.0 protocol editor; the final RFC says his text was based on OAuth 1.0 and OAuth WRAP. |
| **Eran Hammer-Lahav** | Initial public-draft editor at Yahoo! and editor through draft 26; he withdrew before publication. |
| **Dick Hardt** | Co-author of the initial draft, author/editor of OAuth WRAP, final editor of RFC 6749 at Microsoft, and current co-author of OAuth 2.1. |
| **Aaron Parecki** | Current OAuth 2.1 co-author, OAuth.net maintainer, and active IETF OAuth participant. |
| **Torsten Lodderstedt** | OAuth 2.1 co-author and principal contributor to OAuth security guidance; he also helped draft RFC 6749’s security considerations. |
| **Blaine Cook and Peter Saint-Andre** | Chairs when the IETF OAuth Working Group was created in May 2009. |
| **Hannes Tschofenig and Rifaat Shekh-Yusef** | Current working-group chairs. |
| **Michael B. Jones** | Current working-group secretary. |
| **Lisa Dusseault, Peter Saint-Andre, and Stephen Farrell** | Area directors associated with production of RFC 6749. |

Sources for Table: [^h9yw3q] [^2xcvyd] [^mvkm6n] [^8nb8l0] [^ofzvf8] [^8ek4rf] [^nyf1fv] [^0gtke6] [^9h9mse] [^yrcox8] [^638g9w] [^rudbn3] [^q2g0fd]

RFC 6749 also names Blaine Cook, Peter Saint-Andre, Hannes Tschofenig, Barry Leiba, and Derek Atkins as chairs during its production, while its acknowledgements enumerate contributors from major web, identity, and enterprise-software communities. [^nyf1fv]

## Where decisions get made

Formal work occurs on the public `oauth@ietf.org` mailing list, whose archive is linked from each active draft, and in IETF OAuth Working Group meetings and interims. [^ofzvf8] [^8yv8lu] [^sh8kis] Draft state, adoption, shepherding, IESG review, errata, and milestones are recorded in the IETF Datatracker. [^yrcox8] [^lsb7i2] Extension registrations also flow through IANA registries and designated review mechanisms created by the RFC family. [^lxx66w] [^nyf1fv]

## Pace

The core framework took roughly two years and 31 working-group revisions from the first 2010 drafts to publication in October 2012. [^26uqoj] [^1zvaj8] OAuth 2.1 has moved more slowly: the working-group draft began in July 2020, reached revision 17 in October 2026, and was scheduled for IESG submission by the end of 2026. [^5byyc8] [^yrcox8] The broader family evolves continuously through separate RFCs and drafts rather than waiting for a monolithic core release; the 2026 calendar alone shows numerous interims alongside IETF 125 and 126 sessions. [^sh8kis]

## Versioning policy

OAuth uses **RFC numbers and independently versioned Internet-Drafts**, not semantic versioning. [^8nb8l0] [^ofzvf8] “OAuth 2.0” therefore names both RFC 6749 and a family of companion RFCs, BCPs, profiles, and registries, while “OAuth 2.1” is a named consolidation document rather than a point release deployed from a single codebase. [^ssht0g] [^7wldv2]

## Stewardship transition

OAuth began as a small, informal implementer community in 2006–2007 and moved into the IETF after OAuth Birds-of-a-Feather sessions in November 2008 and March 2009; the IETF OAuth Working Group formally started on May 12, 2009 with Blaine Cook and Peter Saint-Andre as chairs. [^hsv4ok] [^0gtke6] [^4fh4ul] The transition sought a formal standards-track process informed by OAuth 1.0 deployment experience, discovered security issues, and ideas from OAuth WRAP. [^xli6se] Governance consequently shifted from reputation-led community drafting to public IETF consensus, formal review, registries, and Security Area oversight. [^ux6wpn] [^yrcox8]

A second, more personal transition occurred in 2012. Eran Hammer-Lahav resigned as lead editor, removed his name, and left the working group after concluding that the result was overly extensible, less interoperable, and less secure than OAuth 1.0; Dick Hardt became the named final editor and RFC 6749 shipped three months later. [^qum8t2] [^oeh2hv] [^42t928] This was not a transfer to a new organization—the IETF remained steward—but it changed who held the pen and became the defining political story of the standard’s completion. [^8nb8l0] [^qum8t2]

## Political fault lines

The foundational dispute was **framework flexibility versus mandatory interoperability**. Enterprise participants wanted varied client types, assertion grants, and extension hooks, while Hammer argued those compromises made almost anything describable as OAuth 2.0 and weakened the shared protocol. [^qum8t2] [^3k3sa5] The second dispute was **bearer simplicity versus proof-of-possession security**: bearer tokens shipped as RFC 6750 while the contemporary MAC-token effort remained unfinished, leaving OAuth dependent on TLS until later mTLS and DPoP work restored sender constraint through extensions. [^feo9id] [^f9bzve] [^loegh0]

The present fault line is **compatibility versus safer defaults**. RFC 9700 and OAuth 2.1 retire modes still deployed by vendors, meaning a client using implicit flow, password credentials, redirect-pattern matching, or no PKCE may be valid under historical RFC 6749 behavior but fail against a hardened OAuth 2.1 server. [^potvl0] [^1is0vk]

# Adoption — by Tier

OAuth has no single reference implementation; adoption consists of authorization servers, hosted identity platforms, API-provider implementations, client libraries, and profiles. [^ux6wpn] [^xfcnu4]

## Incumbents

| Implementation                                                                                                                 | What it ships and relationship to OAuth 2.0                                                                                                                                                                                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Microsoft Entra ID](https://learn.microsoft.com/en-us/entra/identity-platform/v2-protocols)                                   | Hosted OAuth 2.0/OIDC platform supporting authorization code with PKCE, client credentials, device code, and Microsoft’s on-behalf-of flow; Microsoft reports more than 720,000 customer organizations.                                                                            |
| [Google Identity OAuth 2.0](https://developers.google.com/identity/protocols/oauth2)                                           | Authorization infrastructure for Google APIs, covering web-server, browser, installed, limited-input-device, and service-account scenarios.                                                                                                                                                                      |
| [Okta and Auth0](https://developer.okta.com/docs/concepts/auth-servers/)                                                       | [[Tooling/Enterprise Jobs-to-be-Done/Okta\|Okta]] and [[Tooling/Software Development/Lego-Kit Engineering Tools/Auth0\|Auth0]]: Commercial OAuth 2.0/OIDC authorization servers spanning workforce and customer identity; Auth0 reports 2,000-plus enterprise customers and 42 million logins per day. |
| [Keycloak](https://www.keycloak.org/)                                                                                          | Widely deployed open-source identity server with RFC 6749, PAR, DPoP, FAPI, device authorization, and partial token-exchange coverage.                                                                                                                                                                 |
| [Amazon Cognito](https://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito.html)                        | AWS-managed user directory and authorization server supporting authorization code, implicit, and client-credentials grants plus custom resource-server scopes.                                                                                                                               |
| [GitHub OAuth and GitHub Apps](https://docs.github.com/en/apps/oauth-apps)                                                     | [[Tooling/Software Development/Developer Experience/GitHub\|GitHub]]’s delegated API-access implementation; both OAuth Apps and GitHub Apps use OAuth 2.0, with authorization-code and device grants.                                                                                                  |
| [Salesforce Connected Apps](https://developer.salesforce.com/docs/platform/api-rest/guide/intro-oauth-and-connected-apps.html) | OAuth 2.0 access to [[Tooling/Products/Salesforce\|Salesforce]] REST resources through connected or external client applications and multiple authorization flows.                                                                                                                                     |

Sources for Table: [^c34wl6] [^7iq9wh] [^nfc3i1] [^24nlfa] [^dm2128] [^2a515a] [^m66fm6] [^hyb8z5] [^596z2b] [^rs8h57] [^2vb8u4] [^cvzp0j] [^a4x292] [^3llfrt] [^r7mx66] [^fm6r91]

### [Microsoft Entra ID](https://learn.microsoft.com/en-us/entra/identity-platform/v2-protocols)

**Steward:** Microsoft maintains Entra ID as the identity platform automatically associated with Microsoft 365, Azure, and Dynamics tenants. [^05r179]  
**Coverage of the spec:** It implements authorization code with PKCE, client credentials, device authorization, refresh-token behavior, and an on-behalf-of extension; legacy implicit flow remains available but Microsoft recommends migrating new and existing SPAs to authorization code. [^c34wl6] [^8vd9n8] [^7iq9wh] [^nfc3i1]  
**Adoption signal:** Microsoft reports that more than 720,000 organizations use Entra ID. [^24nlfa]  
**Why it matters:** Entra’s automatic distribution through Microsoft cloud subscriptions makes its OAuth interpretation a practical compatibility target for enterprise software, not merely one implementation among peers. [^05r179] [^9h5ye6]

### [Google Identity OAuth 2.0](https://developers.google.com/identity/protocols/oauth2)

**Steward:** Google operates the authorization endpoints and client libraries used to access Google APIs. [^dm2128] [^en2mi6]  
**Coverage of the spec:** Google documents different flows for web-server, client-side, installed, limited-input-device, and service-account applications, while its current guidance recommends PKCE and considers DPoP for replay resistance. [^dm2128] [^oqwk2v]  
**Adoption signal:** The same OAuth infrastructure gates delegated access to Google APIs and is exposed through consolidated Google Identity Services libraries for browser applications. [^dm2128] [^2gf2a7]  
**Why it matters:** Google’s API surface and browser distribution make its consent, scope, verification, and token-security policies influential implementation norms. [^evxm56] [^jdnnr1]

### [Keycloak](https://www.keycloak.org/)

**Steward:** Keycloak is an open-source identity project whose maintained server implements OAuth, OpenID Connect, SAML, and related profiles. [^hyb8z5]  
**Coverage of the spec:** It supports RFC 6749, PAR, device authorization, JAR, DPoP, and FAPI; its token-exchange V2 support remains limited to the internal-to-internal case. [^hyb8z5] [^596z2b]  
**Adoption signal:** Keycloak 26.4 promoted DPoP to full support and added final FAPI 2.0 security and message-signing profiles. [^499jg0]  
**Why it matters:** Keycloak is the principal open-source counterweight to hosted identity clouds and gives enterprises a self-operated implementation of new OAuth extensions. [^hyb8z5] [^h7e6ez]

## Challengers

| Implementation | What it ships and relationship to OAuth 2.0 |
|---|---|
| [Ory Hydra](https://www.ory.com/hydra) | Headless, cloud-native OAuth 2.0 and certified OpenID Connect server that delegates login and consent to an external application. |
| [Curity Identity Server](https://curity.io/product/) | Commercial authorization server centered on OAuth 2.0, OIDC, FAPI, token exchange, sender-constrained tokens, and API or AI access control. |
| [Ping Identity / PingAM](https://docs.pingidentity.com/pingam/8/am-oauth2/am-as-authz-server.html) | Enterprise authorization server with code, device, client-credentials and legacy grants plus mTLS, token exchange, UMA, and OpenID Connect. |
| [WSO2 Identity Server](https://wso2.com/identity-platform/identity-server/) | Deployable and cloud identity server with OAuth/OIDC authorization, token lifecycle, consent, JWT, and policy features. |
| [FusionAuth](https://fusionauth.io/docs/) | Developer-focused CIAM server claiming a full OAuth 2.0 implementation alongside OpenID Connect and SAML. |
| [Authlete](https://www.authlete.com/product) | Headless OAuth/OIDC protocol engine with unusually broad extension and conformance coverage, including FAPI 1.0/2.0, CIBA, DPoP, and verifiable-credential issuance. |
| [Spring Authorization Server](https://docs.spring.io/spring-authorization-server/reference/overview.html) | Java framework implementing OAuth 2.1 and OpenID Connect with code, client-credentials, refresh, device, PAR, DPoP, revocation, introspection, and metadata endpoints. |

Sources for Table: [^ark5l4] [^x2zghx] [^j7os1m] [^7ie621] [^a5bmh7] [^vjyu0c] [^zmt6a2] [^oo3rpo] [^f86va4] [^wj5vvb] [^clzi8e] [^pj9cz1] [^6oh0ib]

### [Ory Hydra](https://www.ory.com/hydra)

**Steward:** Ory maintains Hydra as an open-source server and as the protocol engine behind its managed and enterprise offerings. [^j19ee5] [^e1dyk6]  
**Coverage of the spec:** Hydra supports authorization code with PKCE, client credentials, refresh, device authorization, token exchange, and deprecated implicit flow; it deliberately leaves user and password management to an external login system. [^ark5l4]  
**Adoption signal:** Ory states that OpenAI operates Ory Hydra for authentication serving hundreds of millions of weekly active users. [^xnp1ze]  
**Why it matters:** Hydra separates protocol machinery from user experience and identity storage, representing the strongest headless, cloud-native alternative to full-suite identity platforms. [^ark5l4] [^x2zghx]

### [Authlete](https://www.authlete.com/product)

**Steward:** Authlete, Inc. maintains a hosted, headless protocol engine designed to be embedded behind an organization’s own authorization-service front end. [^clzi8e] [^6mywvo]  
**Coverage of the spec:** Authlete covers RFC 6749 plus FAPI 1.0 and 2.0, CIBA, DPoP, PAR, and newer OpenID profiles; it was the first production-ready product to receive FAPI certification and later received the first FAPI 2.0 Security Profile and Message Signing final certifications. [^pj9cz1] [^vo6nzk]  
**Adoption signal:** Named customers include Nubank, Minna Bank, Hokkoku Bank, Money Forward, and EARTHBRAIN. [^vo6nzk] [^6mywvo] [^wzsl6q]  
**Why it matters:** Authlete turns standards conformance into an outsourced component, enabling banks and API providers to retain their own customer journeys while delegating protocol churn to a specialist. [^6mywvo] [^rtb314]

### [Curity Identity Server](https://curity.io/product/)

**Steward:** Curity maintains a commercial authorization and identity platform focused on API access infrastructure. [^j7os1m] [^7ie621]  
**Coverage of the spec:** It issues OAuth access tokens and OpenID Connect ID tokens and adds FAPI, CIBA, token exchange, sender-constrained tokens, dynamic-agent clients, and configurable authentication journeys. [^j7os1m] [^7ie621]  
**Adoption signal:** Curity positions the product for application, API, non-human, and AI access while federating with Entra, Okta, Ping, ADFS, SAML, and legacy identity systems. [^7ie621]  
**Why it matters:** Curity represents the specialist high-assurance coalition: vendors competing less on basic OAuth support than on policy, banking profiles, token architecture, and migration from legacy IAM. [^7ie621]

## Innovators

| Implementation | What it explores |
|---|---|
| [AT Protocol OAuth](https://atproto.com/specs/oauth) | A decentralized OAuth 2.1 profile with PKCE, PAR, DPoP, and URL-addressed client metadata; Bluesky’s PDS and TypeScript SDK implement the server and client sides. |
| [Cloudflare Workers OAuth Provider](https://developers.cloudflare.com/agents/model-context-protocol/protocol/authorization/) | Serverless OAuth 2.1 authorization and resource-server components specialized for remote MCP servers and AI agents. |
| [Solid-OIDC](https://solidproject.org/TR/oidc) | Decentralized data-pod authorization combining OAuth, OIDC, Web identifiers, and DPoP-bound tokens. |
| [IndieAuth](https://www.w3.org/TR/indieauth/) | URL-native identity and bearer-token authorization for independent websites and Micropub clients. |
| [node-oidc-provider](https://github.com/panva/node-oidc-provider) | Embeddable, OpenID-certified OAuth 2.0 authorization server for Node.js frameworks and custom identity products. |
| [OAuth2 Proxy](https://github.com/oauth2-proxy/oauth2-proxy) | Reverse-proxy pattern that places OAuth/OIDC authentication in front of applications that were not designed to implement it. |
| [JavaScript Solid OIDC](https://github.com/JavaScriptSolidServer/solid-oidc) | A minimal single-file implementation of the Solid-OIDC flow, deliberately shrinking a complex profile to roughly 700 lines and 4 KB compressed. |

Sources for Table: [^zl2tl5] [^bsv19i] [^8hpmgo] [^9952ns] [^t6tnfo] [^0xqxw7] [^j43nly] [^icij64] [^a1c4to] [^26axst]

### [AT Protocol OAuth](https://atproto.com/specs/oauth)

**Steward:** Bluesky’s protocol team publishes the authoritative profile and maintains the reference PDS server component and TypeScript client SDK. [^nudo0y] [^zl2tl5]  
**Coverage of the spec:** The profile uses OAuth 2.1 and requires PKCE with S256, PAR, DPoP, and a URL-hosted client metadata document rather than relying only on conventional pre-registration. [^pchte7] [^bsv19i]  
**Adoption signal:** The Bluesky PDS implementation, official TypeScript SDK, and several independent applications already implement the profile. [^zl2tl5]  
**Why it matters:** AT Protocol tests whether OAuth can support portable identity and dynamically encountered servers in a decentralized social network without reverting to one platform-owned authorization service. [^nudo0y] [^zl2tl5]

### [Cloudflare Workers OAuth Provider](https://developers.cloudflare.com/agents/model-context-protocol/protocol/authorization/)

**Steward:** Cloudflare maintains the package as part of its Workers and Agents platform and describes it as implementing both authorization-server and resource-server roles for MCP. [^8hpmgo] [^bfype8]  
**Coverage of the spec:** Version 1 supports MCP 2026-07-28, protected-resource metadata, client-ID metadata documents, issuer identification, older dynamic-registration clients, resource-specific validation, and step-up authorization. [^9952ns] [^88td77]  
**Adoption signal:** Cloudflare reported production MCP launches by Asana, Atlassian, Block, Intercom, Linear, PayPal, Sentry, Stripe, Webflow, and 13 Cloudflare product teams, with customers testing the release candidate against production traffic. [^i0xywz]  
**Why it matters:** It is an early distribution point for OAuth’s expansion from human-facing SaaS integrations into remote AI-agent tool execution. [^kga6lo] [^i0xywz]

### [node-oidc-provider](https://github.com/panva/node-oidc-provider)

**Steward:** Filip Skokan, under the `panva` project identity, maintains an embeddable JavaScript authorization-server implementation. [^a1c4to]  
**Coverage of the spec:** It implements RFC 6749, OpenID Connect, and numerous extensions and can be mounted into Connect, Express, Fastify, Hapi, or Koa applications. [^a1c4to]  
**Adoption signal:** The repository had approximately 3,800 GitHub stars in November 2026. [^wjx9sp]  
**Why it matters:** It lets product teams build deeply customized authorization services without adopting a full external identity suite, making it a proving ground for emerging OAuth and OIDC features. [^a1c4to]

## Notable Holdouts

“Holdout” is necessarily qualified because OAuth is a framework, not a universal replacement for every API-signing system. **AWS’s core service APIs** continue to center Signature Version 4, which signs each request with service-, region-, and date-scoped derived credentials instead of treating bearer OAuth tokens as the default AWS API credential. [^hwd785] **GNAP’s designers** made the clearest standards-level rejection: RFC 9635 says GNAP is not an OAuth extension or directly compatible with it and targets use cases OAuth cannot address cleanly. [^p3foco] **X’s legacy API surface** retained OAuth 1.0a for some endpoints long after adding OAuth 2.0, although X has now set January 31, 2027 as the migration deadline for affected applications. [^n6etia] [^9hd935] **Stripe** supports OAuth but explicitly defaults many Stripe Apps to platform or restricted API keys, advising that most apps do not need an OAuth relationship unless the connected account must be merchant of record. [^5wd257] [^pjlr3w]

# Critique & Open Disputes

| Critic | Public argument |
|---|---|
| **Eran Hammer-Lahav** ([archived critique](https://gist.github.com/nckroy/dd2d4dfc86f7d13045ad715377b6a48f)) | “OAuth 2.0 is a bad protocol”: committee compromises produced something more complex, less interoperable, less complete, and less secure than OAuth 1.0, with safety dependent on expert implementers. |
| **Aaron Parecki** ([essay](https://aaronparecki.com/2015/01/15/8/so-you-implemented-an-oauth2-api)) | RFC 6749 leaves so many security and deployment questions unspecified that most implementations are not automatically interoperable. |
| **Daniel Fett, Ralf Küsters, and Guido Schmitz** ([formal analysis](https://arxiv.org/html/1601.01229v1)) | Their formal model uncovered previously unknown attacks that broke OAuth authorization and authentication guarantees until additional mitigations were applied. |
| **Justin Richer** ([interview](https://www.cisecurity.org/insights/blog/why-oauth-is-so-important-an-interview-with-justin-richer)) | OAuth has become a loose collection of related protocols whose implementers must profile correctly; GNAP adopts a dynamic-first trust model because OAuth assumes stronger prior relationships among participants. |
| **Dick Hardt** ([agent-authorization interview](https://blog.mailchannels.com/self-driving-software-what-oauth-cant-do-for-ai-agents-dick-hardt-hello/)) | OAuth was designed around relatively static server relationships and does not naturally handle an autonomous agent encountering a new resource and obtaining task-specific authority on the fly. |

Sources for Table: [^3k3sa5] [^7bojdk] [^xs864f] [^qfvv1q] [^qk6r4d]

The RFC’s editors acknowledged the central limitation directly: OAuth 2.0’s many optional components and undefined registration, discovery, and capability mechanisms were likely to produce “a wide range of non-interoperable implementations.” [^xfcnu4] Current browser guidance also concedes that OAuth gives a client no intrinsic mechanism to verify that an access token was intended for that client, one reason OAuth alone must not be mistaken for authentication. [^nxzcx3] [^qer553]

The deepest archived working-group split concerned bearer tokens versus cryptographic request binding. The working group shipped bearer-token usage but left MAC authentication unfinished; a decade later, DPoP and mTLS reintroduced proof-of-possession as optional companion mechanisms rather than properties of the base protocol. [^feo9id] [^f9bzve] [^loegh0]

# Frontier & Open Questions

| Open question | Likely driver and current status |
|---|---|
| **Will OAuth 2.1 finally reach RFC status without reopening compatibility disputes?** | Dick Hardt, Aaron Parecki, Torsten Lodderstedt, chairs Hannes Tschofenig and Rifaat Shekh-Yusef, and the OAuth WG control the path; revision 17 was active in October 2026 with an end-of-2026 IESG-submission milestone. |
| **How quickly can providers remove implicit and password grants without breaking installed customers?** | RFC 9700 and OAuth 2.1 set the policy, but Microsoft and other large platforms still expose legacy modes while recommending migration. |
| **Will sender-constrained tokens become the normal case rather than a high-assurance option?** | DPoP implementers including Keycloak, Google, FAPI vendors, and the OAuth WG will drive the answer; Keycloak has promoted DPoP to full support and Google now recommends considering it. |
| **Can OAuth represent autonomous agents, delegated missions, and human approval across multiple service hops?** | Competing individual drafts include AAuth, Agent Authorization Grant, transaction tokens for agents, and an OAuth agent-use-case analysis; IETF 126 devoted explicit agenda time to “Agents Use Cases & Gaps.” |
| **How should identity and authorization context propagate across trust domains?** | The OAuth Identity and Authorization Chaining draft had reached the RFC Editor queue by mid-2026, while the Transaction Tokens draft remained active and had passed through Working Group Last Call. |
| **Can native applications prove that a genuine, untampered client instance is requesting tokens?** | `draft-ietf-oauth-attestation-based-client-auth-12` had Working Group consensus and was waiting for write-up in October 2026; platform vendors and attestation providers will determine practical adoption. |
| **Can first-party applications replace the forbidden password grant without rebuilding every native login journey around browser redirection?** | Aaron Parecki and the first-party-apps authors are advancing an active WG draft, but the document itself warns that browser implementation complexity may outweigh the user-experience benefit. |
| **Will GNAP remain a specialist parallel protocol or become the clean-slate successor for dynamic systems?** | The GNAP community and implementers must prove deployment value; RFC 9635 currently anticipates coexistence and migration mapping rather than rapid replacement. |

Sources for Table: [^gzn18r] [^yrcox8] [^potvl0] [^8vd9n8] [^1is0vk] [^oqwk2v] [^ivn8pp] [^8z8pvs] [^g96b1j] [^8cogpj] [^8q5r2u] [^xp1bqg] [^i8nfyd] [^eec4yb] [^l6mwif] [^r6ove2] [^p3foco]

# Media, Voices, and Coverage

## Editor & Maintainer Voices

| Name | Platform | Why follow |
|---|---|---|
| **[Aaron Parecki](https://aaronparecki.com/tag/oauth2)** | Personal site | OAuth 2.1 co-author’s running commentary on drafts, PKCE, implementation traps, and IETF work. |
| **[Dick Hardt](https://github.com/dickhardt)** | GitHub and talks | Final RFC 6749 editor and OAuth 2.1 co-author, now publicly examining where OAuth fails for autonomous software. |
| **[OAuth.net](https://oauth.net/2/)** | Community reference maintained by active standards participants | Tracks core RFCs, security profiles, events, and active drafts without reducing OAuth to RFC 6749 alone. |
| **[IETF OAuth mailing list](https://mailarchive.ietf.org/arch/browse/oauth/)** | Public standards archive | The authoritative record for draft disputes, adoption calls, and working-group consensus. |
| **[IETF OAuth Datatracker](https://datatracker.ietf.org/wg/oauth/)** | Governance and document tracker | Names chairs, milestones, active documents, meetings, shepherds, and document status. |

Sources for Table: [^x3jgoo] [^8ek4rf] [^88om7w] [^qk6r4d] [^ssht0g] [^vr5ei7] [^ofzvf8] [^8yv8lu] [^yrcox8] [^lsb7i2]

## Implementer Coverage

| Name | Platform | Why follow |
|---|---|---|
| **[Google OAuth Best Practices](https://developers.google.com/identity/protocols/oauth2/resources/best-practices)** | Google for Developers | Documents operational token storage, incremental authorization, PKCE, DPoP, revocation, and scope policies at global-provider scale. |
| **[Microsoft identity platform OAuth documentation](https://learn.microsoft.com/en-us/entra/identity-platform/v2-protocols)** | Microsoft Learn | Shows how a major enterprise platform profiles OAuth across browser, native, service, device, and delegated-service scenarios. |
| **[Keycloak standards coverage](https://www.keycloak.org/securing-apps/specifications)** | Keycloak project | A useful public matrix of which OAuth-family RFCs are supported, previewed, or partial. |
| **[Ory Hydra](https://www.ory.com/hydra)** | Ory documentation | Strong coverage of headless authorization-server architecture and separation of login from protocol processing. |
| **[Authlete](https://www.authlete.com/product)** | Product and engineering resources | Tracks leading-edge FAPI, CIBA, DPoP, and verifiable-credential conformance earlier than many full-suite vendors. |
| **[Cloudflare MCP Authorization](https://developers.cloudflare.com/agents/model-context-protocol/protocol/authorization/)** | Cloudflare Developers | Documents the practical collision between OAuth, MCP discovery, remote tools, and serverless agent infrastructure. |

Sources for Table: [^oqwk2v] [^c34wl6] [^hyb8z5] [^ark5l4] [^clzi8e] [^vo6nzk] [^bfype8]

## Critic Coverage

| Name | Platform | Why follow |
|---|---|---|
| **[Eran Hammer-Lahav, “OAuth 2.0 and the Road to Hell”](https://gist.github.com/nckroy/dd2d4dfc86f7d13045ad715377b6a48f)** | Archived essay | The canonical insider critique of extensibility, bearer security, committee governance, and interoperability. |
| **[Daniel Fett, Ralf Küsters, and Guido Schmitz](https://arxiv.org/html/1601.01229v1)** | Academic security research | Formalized OAuth’s security properties, discovered new attacks, and proved a mitigated model. |
| **[Justin Richer](https://www.cisecurity.org/insights/blog/why-oauth-is-so-important-an-interview-with-justin-richer)** | Center for Internet Security interview | Explains why OAuth’s collection of profiles and prior-trust assumptions motivated GNAP’s dynamic-first design. |
| **[Aaron Parecki, “So You Implemented an OAuth 2.0 API”](https://aaronparecki.com/2015/01/15/8/so-you-implemented-an-oauth2-api)** | Personal essay | Catalogues the decisions RFC 6749 leaves open and therefore the real sources of cross-provider incompatibility. |

Sources for Table: [^3k3sa5] [^xs864f] [^qfvv1q] [^7bojdk]

## Conferences & Working Group Forums

| Forum | Platform | Why follow |
|---|---|---|
| **[OAuth Security Workshop](https://oauth.secworkshop.events/)** | Annual specialist workshop | The principal venue connecting academic researchers, IETF participants, implementers, and identity-security practitioners. |
| **[IETF OAuth meetings](https://datatracker.ietf.org/wg/oauth/meetings/)** | Public meetings, minutes, slides, and recordings | The formal venue for working-group draft advancement and live issue resolution. |
| **[Identiverse — State of OAuth](https://identiverse.com/video/the-state-of-oauth/)** | Conference talk | Aaron Parecki’s maintainer-level overview of OAuth 2.1 and the expanding companion-spec stack. |
| **[Changelog: “OAuth, It’s Complicated”](https://changelog.com/podcast/456)** | Podcast | A candid discussion with Parecki about PKCE, OAuth 2.1, GNAP, and why “OAuth 2” denotes a family rather than one interoperable protocol. |
| **[Identity, Unlocked — OAuth 2.1](https://auth0.com/blog/identity-unlocked-explained-episode-2/)** | Podcast and transcript | Vittorio Bertocci and Aaron Parecki explain the consolidation thesis and mandatory-PKCE direction behind OAuth 2.1. |

Sources for Table: [^wgic7x] [^53ik4k] [^sh8kis] [^i8z2fd] [^su3nmo] [^0esi3s]

# Adjacent Specs and Standards

| Spec | How it adjoins OAuth 2.0 |
|---|---|
| **OAuth 1.0 / RFC 5849** | Direct predecessor, retaining per-request signatures and a less extensible architecture. |
| **OAuth 2.1** | Intended consolidation of OAuth 2.0 with current PKCE, native-app, browser-app, and security best practices. |
| **OAuth 2.0 Bearer Token Usage / RFC 6750** | Defines the dominant access-token presentation method used with RFC 6749. |
| **Proof Key for Code Exchange / RFC 7636** | Protects authorization codes from interception and is becoming mandatory across client classes. |
| **OAuth 2.0 Security Best Current Practice / RFC 9700** | Updates the framework for known attacks and deprecates unsafe modes. |
| **OpenID Connect Core 1.0** | Adds authentication and identity claims above OAuth’s authorization layer. |
| **OAuth 2.0 Pushed Authorization Requests / RFC 9126** | Moves authorization-request payloads to a protected back channel before browser redirection. |
| **OAuth 2.0 DPoP / RFC 9449** | Binds tokens to a client-held key to reduce bearer-token replay. |
| **OAuth 2.0 Authorization Server Metadata / RFC 8414** | Standardizes endpoint and capability discovery. |
| **Financial-grade API 2.0** | High-assurance profile for valuable and regulated API transactions. |
| **Grant Negotiation and Authorization Protocol / RFC 9635** | Clean-slate, non-compatible parallel protocol for dynamic and negotiated authorization. |
| **Model Context Protocol Authorization** | Applies the OAuth family to remote AI-agent tools and protected resources. |

Sources for Table: [^8nb8l0] [^xli6se] [^7wldv2] [^zk8zwp] [^w2tn9l] [^ai8dkq] [^potvl0] [^7oeytp] [^93beci] [^loegh0] [^b1wagh] [^r62vj4] [^p3foco] [^kga6lo]


***

# Sources

[^lrdqc0]: 2012, Oct 01. [dl.acm.org](https://dl.acm.org/). [RFC 6749: The OAuth 2.0 Authorization Framework](https://dl.acm.org/doi/abs/10.17487/RFC6749). Updated: 2026, Nov 02. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[2]: [datatracker.ietf.org](https://datatracker.ietf.org/). [RFC 6749 - The OAuth 2.0 Authorization Framework](https://datatracker.ietf.org/doc/html/rfc6749). Updated: 2026, Oct 31. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[^4rkp8t]: 2016, Jan 07. [rfc-editor.org](https://www.rfc-editor.org/). [Best Current Practice for OAuth 2.0 Security](https://www.rfc-editor.org/rfc/rfc9700.html?ref=vulcode). Updated: 2026, Oct 19. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[4]: [rfc-editor.org](https://www.rfc-editor.org/). [rfc6749](https://www.rfc-editor.org/rfc/inline-errata/rfc6749.html). Updated: 2026, Oct 27. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[5]: [rfc-editor.org](https://www.rfc-editor.org/). [» RFC Editor](https://www.rfc-editor.org/rfc/rfc6749.html). Updated: 2026, Sep 24. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[6]: 2026, May 20. [datatracker.ietf.org](https://datatracker.ietf.org/). [The OAuth 2.0 Authorization Framework](https://datatracker.ietf.org/doc/rfc6749/history/). Updated: 2026, Nov 06. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[7]: [datatracker.ietf.org](https://datatracker.ietf.org/). [Web Authorization Protocol (oauth)](https://datatracker.ietf.org/wg/oauth/documents/). Updated: 2026, Nov 06. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[8]: 2020, Feb 11. [oauth.com](https://www.oauth.com/). [Background - OAuth 2.0 Simplified](https://www.oauth.com/oauth2-servers/background/?ref=hackernoon.com). Updated: 2026, Oct 06. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[9]: [datatracker.ietf.org](https://datatracker.ietf.org/). [OAuth 2.0 Security Best Current Practice](https://datatracker.ietf.org/doc/draft-ietf-oauth-security-topics/07/). Updated: 2026, Nov 06. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[10]: 2026, Apr 30. [ietf.org](https://www.ietf.org/). [A Comprehensive Roadmap for OAuth 2.0 Standards and ...](https://www.ietf.org/archive/id/draft-chen-oauth-roadmap-00.html). Updated: 2026, Oct 04. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[^9ogv2n]: [datatracker.ietf.org](https://datatracker.ietf.org/). [datatracker.ietf.org · doc · rfc9101RFC 9101 - The OAuth 2.0 Authorization Framework: JWT-Secured ...](https://datatracker.ietf.org/doc/rfc9101/). Updated: 2026, Nov 06. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[12]: [irurueta.com](https://www.irurueta.com/). [How OAuth Evolved - Irurueta Docs](https://www.irurueta.com/backend/oauth/history-and-evolution.html). Updated: 2026, Oct 31. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[13]: [datatracker.ietf.org](https://datatracker.ietf.org/). [Updates to OAuth 2.0 Security Best Current Practice](https://datatracker.ietf.org/doc/draft-ietf-oauth-security-topics-update/). Updated: 2026, Nov 06. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[14]: 2026, May 20. [datatracker.ietf.org](https://datatracker.ietf.org/). [OAuth 2.0 for Native Apps - Internet Engineering Task Force](https://datatracker.ietf.org/doc/rfc8252/history/). Updated: 2026, Nov 06. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[^zau3zy]: [datatracker.ietf.org](https://datatracker.ietf.org/). [The OAuth 2.0 Authorization Framework](https://datatracker.ietf.org/doc/draft-ietf-oauth-v2/31/). Updated: 2026, Nov 06. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[16]: [datatracker.ietf.org](https://datatracker.ietf.org/). [Active Internet-Drafts - IETF Datatracker](https://datatracker.ietf.org/doc/active/). Updated: 2026, Nov 07. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[^8nb8l0]: [datatracker.ietf.org](https://datatracker.ietf.org/). [OAuth](https://datatracker.ietf.org/wg/oauth/about/). Updated: 2026, Nov 06. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[18]: [datatracker.ietf.org](https://datatracker.ietf.org/). [The OAuth 2.1 Authorization Framework](https://datatracker.ietf.org/doc/draft-ietf-oauth-v2-1/). Updated: 2026, Nov 06. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[^ux6wpn]: [datatracker.ietf.org](https://datatracker.ietf.org/). [OAuth Identity and Authorization Chaining Across Domains](https://datatracker.ietf.org/doc/draft-ietf-oauth-identity-chaining/10/). Updated: 2026, Nov 06. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[^q2g0fd]: [datatracker.ietf.org](https://datatracker.ietf.org/). [Web Authorization Protocol (oauth) - datatracker.ietf.org](https://datatracker.ietf.org/group/oauth/documents/). Updated: 2026, Nov 06. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[21]: [datatracker.ietf.org](https://datatracker.ietf.org/). [draft-chen-oauth-roadmap-01 - A Comprehensive ...](https://datatracker.ietf.org/doc/draft-chen-oauth-roadmap/). Updated: 2026, Nov 06. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[^2nmjws]: [datatracker.ietf.org](https://datatracker.ietf.org/). [The OAuth 2.1 Authorization Framework](https://datatracker.ietf.org/doc/draft-ietf-oauth-v2-1/17/). Updated: 2026, Nov 06. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[^qm3lx1]: [datatracker.ietf.org](https://datatracker.ietf.org/). [Document Search - IETF Datatracker](https://datatracker.ietf.org/doc/search?name=draft-ietf-oauth-&rfcs=on&activedrafts=on&olddrafts=on). Updated: 2026, Oct 27. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[24]: [datatracker.ietf.org](https://datatracker.ietf.org/). [Web Authorization Protocol (oauth)](https://datatracker.ietf.org/wg/oauth/email/). Updated: 2026, Oct 31. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[25]: 2026, Apr 30. [datatracker.ietf.org](https://datatracker.ietf.org/). [draft-chen-oauth-roadmap-00 - IETF Datatracker](https://datatracker.ietf.org/doc/html/draft-chen-oauth-roadmap-00). Updated: 2026, Oct 30. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[26]: 2026, Oct 30. [datatracker.ietf.org](https://datatracker.ietf.org/). [History for draft-ietf-oauth-v2-1 -17](https://datatracker.ietf.org/doc/draft-ietf-oauth-v2-1/history/). Updated: 2026, Nov 07. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[27]: 2026, Nov 01. [ietf.org](https://www.ietf.org/). [AAuth - Agentic Authorization OAuth 2.1 Extension](https://www.ietf.org/archive/id/draft-rosenberg-oauth-aauth-02.html). Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[28]: [datatracker.ietf.org](https://datatracker.ietf.org/). [Writeups for charter-ietf-oauth-06](https://datatracker.ietf.org/doc/charter-ietf-oauth/writeup/). Updated: 2026, Nov 03. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[29]: [datatracker.ietf.org](https://datatracker.ietf.org/). [Web Authorization Protocol (oauth) - IETF Datatracker](https://datatracker.ietf.org/wg/oauth/history/). Updated: 2026, Oct 31. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[30]: [ietf.org](https://www.ietf.org/). [Intellectual property rights (IPR)](https://www.ietf.org/process/ipr/). Updated: 2026, Oct 02. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[^gzn18r]: [trustee.ietf.org](https://trustee.ietf.org/). [Corrected Legal Provisions Relating to IETF Documents](https://trustee.ietf.org/documents/trust-legal-provisions/tlp-5/). Updated: 2026, Oct 26. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[^yrcox8]: [datatracker.ietf.org](https://datatracker.ietf.org/). [RFC 6569: Guidelines for Development of an Audio Codec within ...](https://datatracker.ietf.org/doc/rfc6569/). Updated: 2026, Nov 06. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[^ofzvf8]: [datatracker.ietf.org](https://datatracker.ietf.org/). [RFC 8179 - Intellectual Property Rights in IETF Technology](https://datatracker.ietf.org/doc/rfc8179/). Updated: 2026, Nov 06. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[34]: [ietf.org](https://www.ietf.org/). [Guidelines to Authors of Internet-Drafts](https://www.ietf.org/ietf-ftp/ietf/1id-guidelines.html). Updated: 2026, Oct 31. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[35]: [datatracker.ietf.org](https://datatracker.ietf.org/). [RFC 5378 - Rights Contributors Provide to the IETF Trust](https://datatracker.ietf.org/doc/rfc5378/). Updated: 2026, Nov 06. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[^lsb7i2]: [trustee.ietf.org](https://trustee.ietf.org/). [Copyright - IETF Trust](https://trustee.ietf.org/assets/copyright/). Updated: 2026, Oct 07. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[37]: [trustee.ietf.org](https://trustee.ietf.org/). [The IETF Trust's Copyrights and Licenses](https://trustee.ietf.org/assets/the-ietf-trusts-copyrights-and-licenses/). Updated: 2026, Oct 13. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[38]: [datatracker.ietf.org](https://datatracker.ietf.org/). [RFC 3979 - Intellectual Property Rights in IETF Technology](https://datatracker.ietf.org/doc/rfc3979/). Updated: 2026, Oct 31. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[^i8nfyd]: [trustee.ietf.org](https://trustee.ietf.org/). [\[PDF\] IETF Trust Legal Provisions Relating to IETF Documents Effective ...](https://trustee.ietf.org/wp-content/uploads/IETF-TLP-4.pdf). Updated: 2026, Jul 19. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[40]: [trustee.ietf.org](https://trustee.ietf.org/). [Licenses – IETF Trust - Internet Engineering Task Force](https://trustee.ietf.org/assets/licenses/). Updated: 2026, Oct 21. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[41]: [datatracker.ietf.org](https://datatracker.ietf.org/). [RFC 3978 - IETF Rights in Contributions - IETF Datatracker](https://datatracker.ietf.org/doc/html/rfc3978). Updated: 2026, Oct 30. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[^kedwc4]: [datatracker.ietf.org](https://datatracker.ietf.org/). [Intellectual Property Rights in IETF Technology](https://datatracker.ietf.org/doc/draft-bradner-rfc3979bis/00/). Updated: 2026, Oct 25. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[43]: [datatracker.ietf.org](https://datatracker.ietf.org/). [The OAuth 2.0 Protocol draft-hammer-oauth2-00 - IETF Datatracker](https://datatracker.ietf.org/doc/draft-hammer-oauth2/). Updated: 2026, Sep 16. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[^638g9w]: [datatracker.ietf.org](https://datatracker.ietf.org/). [draft-ietf-oauth-v2-00](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-00). Updated: 2026, Oct 31. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[45]: [datatracker.ietf.org](https://datatracker.ietf.org/). [draft-recordon-oauth-v2-device-00](https://datatracker.ietf.org/doc/html/draft-recordon-oauth-v2-device). Updated: 2026, Oct 30. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[^qum8t2]: [datatracker.ietf.org](https://datatracker.ietf.org/). [https://datatracker.ietf.org/doc/draft-hammer-oaut...](https://datatracker.ietf.org/doc/draft-hammer-oauth2/00/bibtex/). Updated: 2026, May 23. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[47]: [datatracker.ietf.org](https://datatracker.ietf.org/). [draft-ietf-oauth-v2-bearer-00](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-bearer-00). Updated: 2026, Nov 01. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[48]: [datatracker.ietf.org](https://datatracker.ietf.org/). [The OAuth 2.0 Protocol draft-hammer-oauth2-00](https://datatracker.ietf.org/doc/html/draft-hammer-oauth2-00). Updated: 2026, Nov 01. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[49]: 2010, Mar 09. [github.com](https://github.com/). [GitHub - davidrecordon/OAuth-2.0: DRAFT](https://github.com/davidrecordon/OAuth-2.0). Updated: 2026, Oct 24. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[^oeh2hv]: 2010, Mar 09. [github.com](https://github.com/). [OAuth-2.0/draft-recordon-oauth-v2-upgrade.xml at master · davidrecordon/OAuth-2.0](https://github.com/davidrecordon/OAuth-2.0/blob/master/draft-recordon-oauth-v2-upgrade.xml). Updated: 2026, Oct 25. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
