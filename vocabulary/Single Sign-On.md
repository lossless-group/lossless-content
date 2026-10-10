---
date_modified: 2026-10-09
site_uuid: 41f2b94b-b723-4b84-a993-7900c6101db3
date_created: 2025-04-06
aliases:
  - SSO
  - Single Sign On
cf_last_run: 2026-05-10T03:17:51.761Z
cf_last_run_model: Perplexity sonar-pro
publish: true
title: Single Sign-On
slug: single-sign-on
at_semantic_version: 0.0.0.1
tags:
  - State-Of-The-Art-Practices
  - User-Experience
  - Authorization
  - Security-First
  - API-Security
  - Technology-Trends
---

# Defining and Describing Single Sign-On

*_Single Sign-On (SSO) is a authentication mechanism allowing users to access multiple applications and services with one set of login credentials, streamlining user experience in SaaS-heavy startup stacks.* [^2k1rd8] [^99lgjx]

Innovation consultants emphasize SSO because startups racing to product-market fit must minimize user friction to boost adoption and retention, while founders weigh early decisions on IdP selection against scaling costs and security risks. [^99lgjx] The term applies to federated identity protocols like SAML 2.0, where an identity provider (IdP) brokers access to service providers (SPs), but not to local password managers or basic session cookies. [^2k1rd8] [^99lgjx] [^44clku] In market dynamics, adopting SSO enables organizational change by centralizing identity for remote teams, but poor implementation can create vendor lock-in or compliance hurdles for growing ventures. [^7y3ytx]

# Disambiguation

## Primary sense — the innovation-consulting sense
_A technology and business practice enabling users to authenticate once via an identity provider (IdP) to access multiple service providers (SPs), often using SAML 2.0, to reduce login friction in multi-app environments._ [^2k1rd8] [^99lgjx]

- Commonly deployed in startup SaaS stacks for "better experience for users because they can use their existing credentials to authenticate and don't have to enter credentials as often," integrating with tools like Cloud Identity, Entra ID, or Duo. [^99lgjx]
- Acts as an IdP authenticating users before permitting access to SP applications, with policies like [[Vocabulary/Multi-Factor Authentication|Multi-Factor Authentication]] (MFA) per app, e.g., "require that users of one application complete two-factor authentication at every login, but only once every seven days when accessing a different application." [^2k1rd8]
- Differs from password sync or local auth: "You don't have to synchronize passwords," as SSO federates identity without storing credentials in each app. [^99lgjx]
- Not basic session management; requires standards like SAML for exchange of "authentication and authorization data between a SAML IdP and SAML service providers." [^99lgjx]

## Other senses
- **No other senses identified**: SSO refers exclusively to this federated authentication practice in technology and business contexts; no innovation-relevant variants like non-digital or unrelated usages appear in sources.

# Adjacent Vocabulary

- **Synonyms**: 
  - Federated Identity: Emphasizes cross-domain trust, often via SAML or OIDC, vs. SSO's user-facing seamlessness. [^99lgjx]
  - Identity Federation: Broader protocol focus, synonymous in SAML contexts but highlights provisioning. [^99lgjx]
  - Universal Login: Startup-friendly term for SSO portals, shading toward consumer UX. [^2k1rd8]

- **Antonyms**: 
  - Multi-Factor Authentication per App: Forces repeated logins, opposing SSO's single credential goal. [^2k1rd8]
  - Siloed Authentication: App-specific logins creating credential sprawl. [^99lgjx]

- **Adjacent terms**: [[SAML 2.0]], [[Identity Provider]], [[Service Provider]], [[Vocabulary/Multi-Factor Authentication]], [[Zero Trust]], [[SCIM]]

# Usage in Practice
- "Duo Single Sign-On is our cloud-hosted SSO product which layers Duo's strong authentication and flexible policy engine on top of an application's login using [[Vocabulary/Security Assertion Markup Language|Security Assertion Markup Language]] (SAML) 2.0." — Duo documentation [^2k1rd8]
- "Using SSO can provide several advantages: You enable a better experience for users because they can use their existing credentials to authenticate and don't have to enter credentials as often." — [[Tooling/Software Development/Cloud Infrastructure/Google Cloud|Google Cloud]] Architecture Center [^99lgjx]
- "After you configure SSO, your users can sign in by using their Microsoft Entra credentials." — Microsoft Entra docs [^44clku]
- "By creating a [[Tooling/Software Development/Cloud Infrastructure/Cloudflare|Cloudflare]] SSO connector, you can enforce SSO to the Cloudflare dashboard with the identity provider (IdP) of your choice. SSO will be enforced for every user in your email domain." — Cloudflare Fundamentals [^7y3ytx]
- "Configure single sign-on (SSO) for your add-in so users don't have to sign-in to Employee Center." — ServiceNow docs [^91bap7]

# Common Misuses
- Calling basic session cookies or [[projects/Emergent-Innovation/Standards/JSON Web Tokens|JWT]] tokens "SSO" — better suited: **[[Session Management]]**, as SSO requires IdP federation across apps. [^2k1rd8] [^99lgjx]
- Equating SSO with password vaulting (e.g., [[1Password]] sharing) — better suited: **Shared Credentials**, lacking federated standards like SAML. [^99lgjx]
- Marketing "passwordless" as SSO without IdP integration — better suited: **Passwordless Authentication**, which may still demand per-app biometrics. [^2k1rd8]
- Using "SSO" for [[SCIM]] user provisioning — better suited: **Identity Provisioning**, as SSO handles auth, not account sync. [^ydogg5]


***

# Sources

[^2k1rd8]: [Duo Single Sign-On for Generic SAML Service Providers](https://duo.com/docs/sso-generic)
[^99lgjx]: [Single sign-on | Cloud Architecture Center](https://docs.cloud.google.com/architecture/identity/single-sign-on)
[^44clku]: [Enable SAML single sign-on for an enterprise application](https://learn.microsoft.com/en-us/entra/identity/enterprise-apps/add-application-portal-setup-sso)
[^7y3ytx]: [Set up dashboard SSO - Cloudflare Fundamentals](https://developers.cloudflare.com/fundamentals/manage-members/dashboard-sso/)
[^91bap7]: [Configure single sign-on for ServiceNow Add-in for Microsoft 365](https://www.servicenow.com/docs/r/de-DE/employee-service-management/employee-experience-foundation/configure-sso-sn-addin-ms365.html)
[^ydogg5]: [Single sign-on (SSO) Overview | dbt Developer Hub](https://docs.getdbt.com/docs/platform/manage-access/sso-overview)
[7]: [Understanding SP SSO URL and SP Entity ID in Coverity SAML ...](https://community.blackduck.com/s/article/Understanding-SP-SSO-URL-and-SP-Entity-ID-in-Coverity-SAML-Configuration)
[8]: [Configuring OneTrust with Microsoft Entra ID for Single Sign-On (SSO ...](https://my.onetrust.com/s/article/UUID-a7b17766-2c40-02b1-89c9-17205192d513)
[9]: [SAML: Signing an Entity Metadata File - Talis Support](https://support.talis.com/hc/en-gb/articles/17337805847069-SAML-Signing-an-Entity-Metadata-File)
