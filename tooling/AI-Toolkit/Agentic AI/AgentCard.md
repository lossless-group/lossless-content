---
url: https://agentcard.com/
date_created: 2026-10-28
date_modified: 2026-11-07
og_title: Let agents buy anything online
og_description: Let your users' AI agents pay with their own card, saved once and approved with a passkey, Face ID or voice (early access). For teams building agents.
og_image: https://agentcard.com/og.png
og_favicon: https://agentcard.com/icon.svg?icon.3a4zde8xc_e4t.svg
og_site_name: Agentcard
og_type: website
og_last_fetch: 2026-11-07T07:34:32.944Z
aliases:
  - Agentcard
site_name: Agentcard
tags:
  - Agentic-AI
  - Agentic-Commerce
  - Check-It-Out
  - AI-Toolkit
  - E-Commerce-Platforms
site_uuid: 989bd886-3f86-4da4-ab16-87f923fcfa8d
publish: true
title: AgentCard
slug: agentcard
at_semantic_version: 0.0.0.1
cf_last_run: 2026-11-07T07:35:43.114Z
cf_last_run_model: Perplexity sonar-pro
---

## Value Proposition & Features

Agentcard is a developer-focused payment platform for AI agents. Its Vault lets users save their own card once, protect it with a phone passkey, and approve purchases with Face ID while retaining card rewards and ordinary bank dispute rights. [^o5c9xh] [^hl7y2b]

Core features include:

- **Vault:** White-labeled wallet for users’ existing Visa, Mastercard, or Amex cards; no KYC is required. [^tt420h] [^ouo7yt]
- **Passkey protection:** Card details are encrypted so the agent, builder, and Agentcard cannot read them; reported storage uses AES-256-GCM with per-card keys. [^602zcc]
- **Purchase approval:** Face ID approval is supported, with configurable auto-approval thresholds and timestamped approval records. [^tt420h] [^ouo7yt]
- **Purchase Agent:** A REST `POST /buy` request or MCP `buy` tool accepts plain-language intent, completes merchant checkout, and returns confirmation. [^o5c9xh] [^602zcc]
- **MCP integration:** OAuth connectivity is available for Claude Code, Claude Desktop, Cursor, and compatible MCP clients. [^tt420h] [^gw06lw]
- **Developer interfaces:** The platform advertises REST APIs, organization-scoped bearer keys, webhooks, CLIs, SDKs, and hosted wallet links. [^gw06lw] [^y7ip9y]
- **Issuing:** Builders can fund single-use or reusable virtual Visa cards through a separate wallet model using USDC on Base; KYC is required. [^tt420h] [^hl7y2b]

This payment flow pairs naturally with [[Tooling/AI-Toolkit/Agentic AI/Rye|Rye]] for agent-driven commerce orchestration.

# Market Sizing

## Category, Market Size, and Category Growth

Agentcard appears to operate across **agentic commerce**, **AI-agent payment infrastructure**, and **virtual-card/payment credential management**, based on its wallet, issuing, MCP, and automated-checkout products. [^tt420h] [^gw06lw] No reliable market-size or category-growth estimate was identified in the available results.

## Pricing

| Product | Published pricing |
|---|---|
| Vault | Free for up to 5,000 users; enterprise pricing thereafter. [^76xa2f] [^hl7y2b] |
| Purchase Agent | $0.15 per request; free during beta. [^o5c9xh] [^gw06lw] |
| Issuing | $5,000 per month plus 1% revenue share. [^tt420h] [^hl7y2b] |

# Competitive Landscape

## Who it's for, who it's not for

Agentcard is aimed at teams building AI-agent products that need users to authorize purchases, preserve users’ existing card relationships, or create builder-funded virtual cards. [^tt420h] [^hl7y2b] Its MCP, REST, SDK, webhook, and hosted-link interfaces target developers integrating payments into agent workflows. [^gw06lw] [^y7ip9y]

It is not a clear fit for ordinary human checkout, teams seeking a conventional corporate-card program, or organizations unwilling to use a vendor-managed automated checkout layer. Issuing also requires KYC and a separate funded wallet model. [^tt420h] [^hl7y2b]

## Viable Alternatives

- **Stripe Link:** A conventional saved-payment and checkout option for applications, but not presented in the available results as an equivalent end-to-end agent checkout service. [^ouo7yt]
- **Privacy.com and bank virtual card numbers:** Useful for virtual-card controls, but generally less agent-native than Agentcard’s MCP and Purchase Agent interfaces. [^ouo7yt]
- **Brex and Ramp:** Corporate-card and spend-management alternatives aimed primarily at businesses and employees rather than consumer-authorized agent purchases. [^ouo7yt]
- **Direct card issuing platforms:** Relevant when builders need funded virtual cards, though Agentcard differentiates itself with agent-specific approval and checkout tooling. [^v1m2ps]

## Competitor Table

| Competitor | Description |
|---|---|
| [Stripe Link](https://stripe.com/link) | Saved-payment infrastructure and checkout functionality for conventional application flows. [^ouo7yt] |
| [Privacy.com](https://privacy.com/) | Virtual-card controls for users and businesses, including cards designed to limit exposure of primary card credentials. [^ouo7yt] |
| [Brex](https://www.brex.com/) | Corporate-card and spend-management platform for businesses. [^ouo7yt] |
| [Ramp](https://ramp.com/) | Corporate-card, expense, and spend-management platform. [^ouo7yt] |


***

# Sources

[^o5c9xh]: 2026, Oct 22. [agentcard.com](https://agentcard.com/). [Frequently Asked Questions](https://agentcard.com/info/blog/solution-recommendation/yes-agentcard-s-purchase-agent-completes-the-entire-checkout-for-your-ai-agent). Updated: 2026, Nov 05. Generated: 2026, Nov 07. [Perplexity](https://www.perplexity.ai/) API response.
[^76xa2f]: 2026, Oct 13. [agentcard.com](https://agentcard.com/). [SOLUTION / RECOMMENDATION - Agentcard](https://agentcard.com/info/blog/recommended/solution-recommendation). Updated: 2026, Oct 31. Generated: 2026, Nov 07. [Perplexity](https://www.perplexity.ai/) API response.
[^tt420h]: 2026, Oct 17. [agentcard.com](https://agentcard.com/). [Payment Tools That Plug Into Claude Desktop and ChatGPT for ...](https://agentcard.com/info/blog/listicle/payment-tools-that-plug-into-claude-desktop-and-chatgpt-for-hands-off-agent). Updated: 2026, Oct 28. Generated: 2026, Nov 07. [Perplexity](https://www.perplexity.ai/) API response.
[^hl7y2b]: 2026, Oct 19. [agentcard.com](https://agentcard.com/). [Frequently Asked Questions](https://agentcard.com/info/task/blog/best-payment-platforms-software-ai-agents). Updated: 2026, Oct 28. Generated: 2026, Nov 07. [Perplexity](https://www.perplexity.ai/) API response.
[^gw06lw]: 2026, Oct 13. [agentcard.com](https://agentcard.com/). [End-to-End Agent Payments on Traditional Card Rails, No ...](https://agentcard.com/info/blog/recommended/end-to-end-agent-payments-on-traditional-card-rails-no-stablecoins-required). Updated: 2026, Nov 01. Generated: 2026, Nov 07. [Perplexity](https://www.perplexity.ai/) API response.
[^y7ip9y]: 2026, Oct 13. [agentcard.com](https://agentcard.com/). [Virtual Card Options for AI Agent Products, Ranked by Agent-Native Fit](https://agentcard.com/info/blog/recommended/virtual-card-options-for-ai-agent-products-ranked-by-agent-native-fit). Updated: 2026, Nov 06. Generated: 2026, Nov 07. [Perplexity](https://www.perplexity.ai/) API response.
[^602zcc]: 2026, Oct 22. [agentcard.com](https://agentcard.com/). [Frequently Asked Questions](https://agentcard.com/info/blog/solution-recommendation/agent-payment-tools-without-identity-verification-how-to-let-your-ai-agent-buy). Updated: 2026, Nov 06. Generated: 2026, Nov 07. [Perplexity](https://www.perplexity.ai/) API response.
[^ouo7yt]: 2026, Oct 28. [agentcard.com](https://agentcard.com/). [4 Payment Platforms Designed for Agents, Not Humans - Agentcard](https://agentcard.com/info/blog/listicle/4-payment-platforms-designed-for-agents-not-humans). Updated: 2026, Nov 05. Generated: 2026, Nov 07. [Perplexity](https://www.perplexity.ai/) API response.
[^v1m2ps]: 2026, Oct 17. [agentcard.com](https://agentcard.com/). [8 Card Issuing Platforms for AI Agents: Purpose-Built vs ...](https://agentcard.com/info/task/blog/8-card-issuing-platforms-ai-agents). Updated: 2026, Nov 07. Generated: 2026, Nov 07. [Perplexity](https://www.perplexity.ai/) API response.
[10]: 2026, Oct 17. [agentcard.com](https://agentcard.com/). [Autonomous AI Payments for Early-Stage Teams - Agentcard](https://agentcard.com/info/task/blog/autonomous-ai-payments-early-stage-teams). Updated: 2026, Nov 05. Generated: 2026, Nov 07. [Perplexity](https://www.perplexity.ai/) API response.
