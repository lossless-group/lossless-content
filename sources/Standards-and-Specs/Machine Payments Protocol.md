---
url: https://mpp.dev/
og_title: Machine Payments Protocol
og_description: Charge for API requests, tool calls, and content with HTTP 402 payments co-developed by Tempo and Stripe.
og_image: https://mpp.dev/og.png
og_favicon: https://mpp.dev/favicon.svg
og_site_name: Machine Payments Protocol
og_type: website
og_last_fetch: 2026-11-05T23:15:42.152Z
date_created: 2026-11-05
date_modified: 2026-11-06
tags:
  - Agentic-Commerce
  - API-Standards
  - Agentic-Payments
  - Agentic-Finance
site_uuid: 353856af-1a78-4993-bf9b-6317bee33170
publish: true
title: Machine Payments Protocol
slug: machine-payments-protocol
at_semantic_version: 0.0.0.1
cf_last_run: 2026-11-06T21:54:59.348Z
cf_last_run_model: Perplexity sonar-pro
aliases:
  - MPP
---

[[organizations/Stripe|Stripe]]
[[concepts/Explainers for AI/Agentic Commerce|Agentic Commerce]]

## Value Proposition & Features

Machine Payments Protocol (MPP) is a payment protocol and developer toolkit for charging machine clients for API requests, tool calls, and content through HTTP 402 payment challenges. Its official SDK supports Tempo stablecoin payments, [[organizations/Stripe|Stripe]] Shared Payment Tokens, and EVM-compatible payment methods. [^89izyc] [^8raboq] [^96qmcu]

- **HTTP 402 payment challenges:** Servers return structured payment challenges that clients can satisfy before accessing a protected resource. [^96qmcu] [^esfyh6]
- **Multiple payment rails:** The SDK can expose ordered EVM charge offers, [[Tempo Payments]] charges, Stripe-backed stablecoin charges, and Stripe Shared Payment Tokens. [^89izyc] [^8raboq] [^96qmcu] [^k0uttk]
- **Payment verification and settlement:** Server methods validate credentials, verify payment terms, and—where applicable—settle on-chain transfers. [^ka9a26] [^msp5s5]
- **Non-mutating validation:** `validateCredential` checks credentials without settling, reserving funds, or broadcasting a payment. [^ka9a26]
- **Stripe integration:** Eligible settlements can be recorded as Stripe `PaymentIntent` objects, with support for customers, tax calculations, metadata, and receipts. [^89izyc] [^k0uttk]
- **Stablecoin and fee sponsorship support:** Tempo methods can use stablecoins, optional MACH swaps, and configurable fee-payer policies. [^msp5s5]
- **Replay and challenge binding:** Challenges can receive an HMAC-SHA256-derived identifier from server-side parameters and a secret key. [^6fnj5y]
- **Developer [[Vocabulary/SDK|SDK]]:** The TypeScript SDK exposes server methods, clients, challenges, credentials, and payment lifecycle helpers. [^89izyc] [^ka9a26] [^96qmcu]

The protocol is particularly compatible with agentic-commerce tooling that needs fast settlement and low fees, and it can fit alongside [[Tooling/AI-Toolkit/Agentic AI/Kite Payments|Kite Payments]] when downstream systems need an agent-facing payment rail.

## Product Roadmap / Announcements

As of February 19, 2026, the available official results expose SDK documentation and implementation updates rather than a dated public roadmap or announcement list. The indexed documentation shows recent updates to core challenge APIs and Tempo payment methods, but does not provide enough evidence to reconstruct a formal roadmap. [^msp5s5] [^6fnj5y] [^6rcu29]

# History and Origin Story

The available official results identify MPP as a protocol implemented through the `mppx` TypeScript SDK and show integrations co-developed around Tempo and Stripe payment infrastructure, but they do not provide a reliable founding date, founder list, or detailed origin story. [^89izyc] [^8raboq] [^msp5s5]

# Market Sizing

## Category, Market Size, and Category Growth

MPP fits the categories of machine-to-machine payments, API monetization, agentic commerce, and developer payment infrastructure because its documented functions let servers issue payment challenges and accept machine credentials for API access. [^ka9a26] [^96qmcu] [^esfyh6] No reliable market-size or category-growth estimate specific to MPP was found.

# Competitive Landscape

## Who it's for, who it's not for

MPP is for API providers, tool developers, and content services that want machine clients or autonomous agents to pay per request using standardized HTTP 402 challenges and programmable settlement methods. [^ka9a26] [^96qmcu] [^esfyh6]

It is not clearly intended as a consumer checkout product, a standalone wallet, or a general-purpose human payments dashboard; the available documentation centers on server SDK integration, credential verification, and machine settlement. [^89izyc] [^ka9a26] [^k0uttk]

## Viable Alternatives

- **x402:** A viable alternative or adjacent protocol for EVM-based HTTP payment challenges; MPP’s EVM method can be configured with an x402 facilitator. [^96qmcu]
- **Stripe Shared Payment Tokens:** A viable rail for Stripe-centric implementations, though within MPP it is presented as an integrated payment method rather than a complete protocol alternative. [^k0uttk]
- **Direct Tempo payments:** A lower-level alternative for applications willing to integrate Tempo settlement without MPP’s challenge and credential lifecycle abstractions. [^msp5s5]
- **Custom EVM payment integration:** A viable option for teams that need their own verification, replay protection, and settlement logic instead of MPP’s server methods. [^ka9a26] [^96qmcu]

## Competitor Table

| Competitor | Description |
|---|---|
| [x402](https://x402.org/) | EVM-oriented HTTP payment infrastructure that MPP can use through a configured facilitator. [^96qmcu] |
| [Stripe](https://stripe.com/) | Mainstream payment infrastructure whose Shared Payment Tokens and PaymentIntents are integrated into MPP. [^89izyc] [^k0uttk] |
| [Tempo](https://tempo.xyz/) | Stablecoin payment infrastructure used by MPP for on-chain charges, subscriptions, swaps, and fee sponsorship. [^9713k3] [^msp5s5] |
| Custom EVM settlement | Bespoke payment implementation for teams that need direct control over credential checks, chain-state validation, replay protection, and settlement. [^ka9a26] [^96qmcu] |


***

# Sources

[^89izyc]: 2026, Nov 02. [mpp.dev](https://mpp.dev/). [stripe.create | MPP - Machine Payments Protocol](https://mpp.dev/sdk/typescript/server/Method.stripe.create). Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[^9713k3]: 2026, Nov 02. [mpp.dev](https://mpp.dev/). [Method.tempo.renewSubscription | MPP - Machine Payments Protocol](https://mpp.dev/sdk/typescript/server/Method.tempo.renewSubscription). Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[^ka9a26]: 2026, Nov 02. [mpp.dev](https://mpp.dev/). [mppx.validateCredential | MPP - Machine Payments Protocol](https://mpp.dev/sdk/typescript/server/Mppx.validateCredential). Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[^8raboq]: 2026, Nov 02. [mpp.dev](https://mpp.dev/). [stripe](https://mpp.dev/sdk/typescript/server/Method.stripe). Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[^msp5s5]: 2026, Nov 02. [mpp.dev](https://mpp.dev/). [Method.tempo.charge](https://mpp.dev/sdk/typescript/server/Method.tempo.charge). Updated: 2026, Nov 04. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[^96qmcu]: 2026, Nov 02. [mpp.dev](https://mpp.dev/). [evm server method](https://mpp.dev/sdk/typescript/server/Method.evm). Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[^6fnj5y]: 2026, Oct 26. [mpp.dev](https://mpp.dev/). [Challenge.from](https://mpp.dev/sdk/typescript/core/Challenge.from). Updated: 2026, Oct 31. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[^6rcu29]: 2026, Oct 26. [mpp.dev](https://mpp.dev/). [Challenge.meta](https://mpp.dev/sdk/typescript/core/Challenge.meta). Updated: 2026, Oct 31. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[^k0uttk]: 2026, Oct 26. [mpp.dev](https://mpp.dev/). [stripe.spt | MPP](https://mpp.dev/sdk/typescript/server/Method.stripe.spt). Updated: 2026, Oct 24. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
[^esfyh6]: 2026, Oct 26. [mpp.dev](https://mpp.dev/). [Challenge.fromResponseList](https://mpp.dev/sdk/typescript/core/Challenge.fromResponseList). Updated: 2026, Oct 31. Generated: 2026, Nov 06. [Perplexity](https://www.perplexity.ai/) API response.
