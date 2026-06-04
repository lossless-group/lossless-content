---
date_created: 2026-05-06
date_modified: 2026-05-06
---


## Analytics Platforms for Multi-Site Use

Based on your "show don't tell" ethos and need to track interest across ~20 sites without enterprise-level complexity, here's your shortlist. [^o1vaum] [^m97et3] [^73rn2h] [^v61rti]

### Best Overall Matches

**[[Tooling/Software Development/Lego-Kit Engineering Tools/Umami|Umami]]** [^b1v13b] [^o1vaum]
- Open-source (MIT license), self-host or cloud
- Cloud pricing starts around $20/month for multiple sites
- Extremely lightweight, single-page dashboard
- No cookies, GDPR-compliant by default
- Node.js-based, works with PostgreSQL or MySQL
- Strong API for custom integrations
- Actively developed since 2020, now has paid cloud option

**[[Tooling/Enterprise Jobs-to-be-Done/Fathom Analytics]]** [^5pp90x] [^s9fv5p] [^japbr0]
- $15/month for up to 50 sites (flat rate, not per-site)
- Privacy-first, no cookie banners needed
- Forever data retention even on basic plan
- Ecommerce/event tracking included
- Perfect for agencies - best sites-per-dollar ratio
- Not self-hostable, but extremely low maintenance

**[[Tooling/Enterprise Jobs-to-be-Done/OpenPanel]]** [^v61rti] [^o1vaum]
- Combines web + product analytics ([[Tooling/Enterprise Jobs-to-be-Done/Mixpanel]]-like features)
- AGPL-3.0 license, self-host free
- Cloud starts at $2.50/month
- Real-time tracking, cookieless
- Event tracking beyond just pageviews
- Newer but production-ready

### Established Heavy Hitters

**[[Tooling/Enterprise Jobs-to-be-Done/Plausible|Plausible]]** [^o1vaum] [^v61rti]
- AGPL-3.0, self-host or cloud ($9/month starting)
- Ultra-simple, privacy-first pageview analytics
- Clean dashboard, real-time data
- Requires ClickHouse database (slightly more complex to self-host)
- Most similar to what you've seen

**[[Tooling/Enterprise Jobs-to-be-Done/Matomo|Matomo]]** [^4y4gn9] [^5rjo6s] [^o1vaum]
- GPL-3.0, most mature option (used by EU Commission)
- Self-host free, cloud €29/month
- Most feature-complete Google Analytics replacement
- Can import historical GA data
- Heavier infrastructure requirements
- 1M+ websites use it

**[[PostHog]]** [^c3wunh] [^zwi6fq] [^o1vaum]
- MIT license, free self-host
- Cloud has generous free tier (1M events/month)
- Product analytics + web analytics + session replay + feature flags
- More developer-focused, might be overkill
- Supports multi-domain tracking with some setup [^fglc24] [^tr37w4]
- Best if you want experimentation capabilities

### Lighter Alternatives Worth Knowing

**[[Simple Analytics]]** [^jo8hou] [^b2kvpc]
- $5-$19/month tiers, agency plan available
- One-line script, no events manager
- Privacy guarantees (no cookies, no IP storage)
- Treats each subdomain as separate site
- Less customization than others

**[[Pirsch Analytics]]** [^o1vaum]
- Server-side tracking (works with ad blockers)
- Go-based, AGPL-3.0
- Cookieless fingerprinting approach
- Unique advantage: client-side blockers don't affect it

### Your Best Bets

Given your profile - technical sophistication, "just want it to work," willing to pay to avoid maintenance, need multi-site - I'd prioritize:

1. **Fathom** if you want zero-think SaaS (50 sites for $15/month is absurd value)
2. **Umami** if you want the self-host option with good cloud alternative
3. **OpenPanel** if you want product analytics depth beyond pageviews

All three handle multi-domain elegantly, won't require per-site setup complexity, and align with your "track what's getting traction" use case. [^73rn2h] [^v61rti]

***
# Sources

[^o1vaum]: [Open Source Analytics Tools: 2026 Survey of Privacy-First ...](https://openpanel.dev/articles/open-source-web-analytics)
[^m97et3]: [10 privacy-first analytics tools worth exploring in 2026](https://usermaven.com/blog/privacy-first-analytics-tools)
[^73rn2h]: [10 Best Web Analytics Tools in 2026 (Tested and Compared)](https://bootstrap.build/articles/best-web-analytics-tools/)
[^v61rti]: [Self-Hosted Web Analytics 2026 — Plausible vs Matomo vs ...](https://openpanel.dev/articles/self-hosted-web-analytics)
[^b1v13b]: [Top 8 Open-source Big Data Tools for 2026](https://addepto.com/blog/top-8-open-source-big-data-tools-for-2026/)
[^5pp90x]: [Simple and sustainable pricing](https://usefathom.com/pricing)
[^s9fv5p]: [Fathom Analytics Pricing [2025]](https://www.simpleanalytics.com/resources/analytics-pricing/fathom-analytics-pricing-and-a-better-alternative)
[^japbr0]: [Fathom Analytics Pricing Plans (2026) - CompareTiers](https://comparetiers.com/tools/fathom-analytics)
[^4y4gn9]: [Comparing the top data analytics platforms of 2026](https://matomo.org/blog/2026/01/data-analytics-platforms/)
[^5rjo6s]: [Matomo: Privacy-first Google Analytics Alternative - App ...](https://matomo.org)
[^c3wunh]: [8 best open source analytics tools you can self-host](https://posthog.com/blog/best-open-source-analytics-tools)
[^zwi6fq]: [Self-host PostHog - Docs](https://posthog.com/docs/self-host)
[^fglc24]: [How to set up cross-domain tracking in PostHog](https://posthog.com/tutorials/cross-domain-tracking)
[^tr37w4]: [Cross-Domain Product Analytics with PostHog | by Jonny Schult](https://www.yeti.co/blog/cross-domain-product-analytics-with-posthog-2)
[^jo8hou]: [Privacy-Focused Simple Analytics (Google ...](https://www.reddit.com/r/SaaS/comments/1rsxhdb/privacyfocused_simple_analytics_google_analytics/)
[^b2kvpc]: [Install Simple Analytics](https://www.simpleanalytics.com/guides/install-simple-analytics)
[^9jw1tg]: [The 5 Best Open Source Analytics Agents in 2026 - nao Labs](https://getnao.io/blog/open-source-analytics-agent-builder-playbook/)
[^v98hcq]: [10 Best Web Analytics Tools to Use in 2026 (Free & Paid)](https://www.hr.com/en/app/blog/2025/11/10-best-web-analytics-tools-to-use-in-2026-free-pa_mhqftcuj.html)
[^gdpjq7]: [Synology: Best Selfhosted Alternatives to Google Analytics](https://mariushosting.com/synology-best-selfhosted-alternatives-to-google-analytics/)
[^afny90]: [12 Best Free Web Analytics Tools for Startups in 2026](https://swetrix.com/blog/free-web-analytics-tools)
[^jn52kt]: [A list of free self-hosted Google Analytics alternatives](https://matteosonoio.it/google-analytics-alternatives/)
[^thgy70]: [Data Software Options 2026](https://www.viewpointanalysis.com/post/data-software-options-2026)
[^e8c0cb]: [Self-hosted analytics: Plausible or Umami? : r/selfhosted](https://www.reddit.com/r/selfhosted/comments/18yrxs3/selfhosted_analytics_plausible_or_umami/)
[^xxn45v]: [Infrastructure](https://usefathom.com/pricing/infrastructure)
[^9xdcqs]: [Pricing](https://www.fathomhq.com/pricing)
[^qa10n9]: [Fathom Analytics Review 2026: Honest Deep-Dive, Pricing ...](https://prettyinsights.com/fathom-analytics-review/)
[^zone0d]: [How to Track Multiple Websites on an Analytics Dashboard](https://www.cyfe.com/blog/track-multiple-websites-analytics-dashboard/)
[^je5voq]: [Fathom Pricing: Is It Worth It in 2026?](https://tldv.io/blog/fathom-cost/)
[^4pi48f]: [I can import Google Analytics from two different websites](https://community.simpleanalytics.com/t/i-can-import-google-analytics-from-two-different-websites-what-will-it-look-like-on-the-dashboard/38)
[^3oe8ga]: [Fathom Pricing 2026: Plans, Costs & Comparison](https://checkthat.ai/brands/fathom/pricing)
