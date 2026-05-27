---
title: 'Win The Market On Getting Started'
lede: 'The new way to get traction and win the market is to make it easy to get started.'
date_authored_initial_draft: 2025-04-24
date_authored_current_draft: 2026-05-14
at_semantic_version: 0.0.1.1
status: Draft
augmented_with: 'Claude Opus 4.7 (1M context)'
category: 'Counterintuitive Approaches'
date_created: 2025-04-24
date_modified: 2026-05-14
site_uuid: bb01a67a-595a-4c0d-bc6b-694be9a497c0
portrait_image: 'https://ik.imagekit.io/xvpgfijuw/uploads/lossless/essays/2025-05-04_portraitimage_Win-the-Market-on-Getting-Started_f40c75ff-7ad0-4cdf-b4b9-6ff9d96ca818_0SvWcndXN.jpg'
image_prompt: 'On the left, a software engineering team of geeks is building a bus from spare parts.  Parts are all over the ground, they have grease and sweat all over their faces and hands. The bus looks far from finished.  On the right, a bus is already built and new and fancy.  The bus door is open, and the same software engineering team characters are clean and calm, getting on the bus with a ticket in hand.'
banner_image: 'https://ik.imagekit.io/xvpgfijuw/uploads/lossless/essays/2025-05-04_bannerimage_Win-the-Market-on-Getting-Started_e53e0c43-0f5f-4052-a8ea-06a7bbd5ebc5_Bfkt547qJ.jpg'
tags: [Marketing-Strategies, State-Of-The-Art-Practices, Explainers, Explorations, Additional-Context]
authors:
  - Michael Staton
---

As products and services mature, they tend to get more and more complicated to serve more and more customers who have more and more demands. Over time designers and product managers generally add more ideas and features to their products and services. This is a natural progression of the market, but it can be a barrier to entry for new customers. This is the point of view of [[Sources/Books/The Innovator's Dilemma|The Innovator's Dilemma]].

The result is often product suites that are intimidatingly complex for new customers to navigate.

The challenger's opening, then, is almost always the same: **collapse the cost of getting started to near-zero**, and use the runway that buys you to earn the second mile.

## From Scarcity to Abundance

For a long time, if you were doing business you used Microsoft Office. If you were doing design or creative work you used the Adobe Suite. If you wanted a website you hired a developer. If you wanted to accept payments you spent six weeks getting a merchant account underwritten. The barriers were not malicious. They were the natural consequence of products built for the customers who already existed — customers who could afford the install, the training budget, the IT department, the implementation consultant.

As internet and mobile changed the dynamics of reaching and serving customers, new tools emerged. More accurately, entrepreneurs designed and delivered new options. Distribution moved into the browser. Pricing moved to [[Vocabulary/Freemium|Freemium]]. Onboarding moved to a single click. The activation cost of an entire category — design, payments, video, scheduling, deployment, eventually databases and AI — fell by an order of magnitude or more.

Hundreds of billions in value have been created just by making software that is easy to get started with. 

## The Activation Cost Lens

Every product has an activation cost. It is the sum of everything a new customer must do, learn, pay for, or surrender before they get any value back. [[Vocabulary/Activation Cost]] has at least five components:

1. **Install** — Do I have to download something? Configure my machine? Wait?
2. **Configure** — Do I have to set up a project, a schema, a permission model, a workspace, a billing relationship, before anything happens?
3. **Learn** — Do I need expertise I don't have? A training course? A certification? A consultant?
4. **Sign up** — Do I have to give an email, a credit card, a phone number, before I see the product working?
5. **Pay** — Is there a price gate between me and the demo of the value?

Incumbents tend to be heavy on all five.  Their cost structures depend on customers who clear all five gates *before* knowing whether they got value. The incumbent's customer acquisition is a leap of faith, usually based on it being the default market standard.

The challenger's opportunity is to remove the gates.

## The Five Frictions and Who Killed Each

### Removed the install — won the browser

[[Tooling/Software Development/Design/Figma|Figma]] beat Sketch because Sketch required a Mac install, a plugin ecosystem, and file-sync gymnastics. Figma loaded in any tab. The whole team was inside before procurement could spell SaaS.

Canva beat the Adobe Creative Suite for the long tail of business communicators in roughly the same way — no $50/month subscription dance, no four-gigabyte download, no Pantone certification. Just a tab and a template.

[[Tooling/Productivity/Advanced Documents/Notion|Notion]] beat the assumption that you needed SharePoint, Confluence, a wiki, and three Office documents to run a small team. Same browser, same login, immediate writing surface.

Google Docs did this to Word before any of those. It is the canonical "the browser is enough" play.

### Removed the configuration step

Jira's project-setup wizard is a meme. Linear shipped with sane defaults and won the early-stage market because the first thing you did in Linear was *use* it, not *configure it for someone else's idea of how engineering works*.

Vercel and Netlify beat the AWS console for a generation of front-end developers because `git push` was the entire deployment pipeline. AWS asked you to learn IAM, S3, CloudFront, Route 53, and certificate management before serving an HTML file. Vercel asked you to commit.

Heroku did this in 2008. It was the original `git push to deploy`, and for a decade it was how anybody who didn't already know AWS shipped to production.

[[Tooling/Software Development/Databases/Supabase|Supabase]] is doing it again — Postgres + Auth + Row-Level Security + Storage + Realtime, configured before you arrive. The first ten minutes with Supabase produce a working backend; the first ten minutes with raw Postgres produce a partially-installed Postgres.

### Removed the expertise prerequisite

This is the deepest disruption, because removing expertise expands the addressable market itself, not just the conversion rate inside it.

Canva did not just replace the Adobe Suite for some designers. It made *non-designers* into design buyers. The category got bigger.

Webflow did the same for HTML/CSS. ChatGPT did it for the entire prior machine-learning API stack — the buyer of an LLM no longer needed to know what a tokenizer was. Midjourney did it for image generation. Cursor and Claude Code are doing it now for engineering itself.

Stripe's seven-line integration replaced the merchant-account underwriting nightmare. It is sometimes told as a developer-experience story, but the deeper move was that Stripe turned "accepting payments online" from a procurement exercise into a code exercise. The expertise required shifted from a business function to a thing the developer already had.

### Removed the signup wall

Loom is the most elegant example. Record your screen, get a URL, send the URL. The recipient — the person who actually generates Loom's network growth — never signs up. The signup is transactional and asymmetric: only one party pays the cost, and that party gets the value.

Calendly works the same way. One person sets up Calendly; the other person scheduling never has to. Zoom did it to WebEx — the receiver clicks a link and joins; no IT-managed install required.

The pattern is: **make one side of the transaction free of friction, and let that side carry the product into the next account.**

### Removed price as a gate

Robinhood's zero-commission play killed the hesitation around opening a brokerage account. The user no longer had to weigh whether the value was worth the per-trade cost; the per-trade cost was zero.

Discord beat the prior generation of voice software (TeamSpeak, Mumble) in part because hosting your own server cost money. Discord hosted for free, at consumer scale.

Notion and Figma's free tiers are the strongest version of this. They are not crippled free tiers; they are *deliberately useful free tiers*, good enough to be habit-forming long before any conversation about pricing. By the time someone is asked to pay, they have already integrated the tool into a daily workflow that would be painful to give up.

### Drop-in compatible with what was already there

Stripe again — one `<script>` tag, the existing checkout untouched.

Cursor is still VS Code; you didn't switch IDEs. Tailwind is still HTML and CSS; you didn't switch frameworks. Chroma is still a Python `pip install`; you didn't switch languages. The challenger met the customer where the customer already was.

This category is underrated. The other four reduce friction at the *start* of the customer's journey. The drop-in category reduces friction at the *start of the switch*. It is what allows challengers to recruit customers who were committed to an incumbent, by promising "you don't have to abandon what you've already built — just add this."

## Why This Works Now (and Didn't Before)

Four shifts made the "easy to get started" playbook possible at scale:

1. **The browser became a runtime.** No download, no IT, no Mac-vs-PC. The default surface is universal.
2. **Freemium became economically viable.** Cloud unit economics fell to the point where a free tier could be subsidized by paid tiers without bleeding out the company. When cloud was expensive, freemium meant suicide.
3. **Distribution became viral by default.** Social platforms, link sharing, and embedded media meant that one user's "I just made a Loom" was a free ad to twenty others. The challenger does not need to outspend the incumbent on marketing; they need to design the product such that the user *is* the marketing.
4. **AI is starting to remove the onboarding step itself.** A class of products is now using LLMs to *be* the onboarding — they ask what you want, configure themselves, and present the value. This is "easy to get started" taken to its logical conclusion: the start has been absorbed into the product.

## The Trap: Easy Start ≠ Won Market — For The Pioneer

"Make it easy to get started" is a strategy, not a finish line. The trap is winning the first mile and losing the second.

[[Tooling/Productivity/Advanced Documents/Notion|Notion]] is the canonical case. The product that gets a five-person team productive in an afternoon often collapses into a search-and-permissions problem at two hundred pages. The fix is real engineering work — search, hierarchy, governance — and not every challenger does it in time.

Firebase made prototyping a backend feel like magic, and then the schema rigidity bit teams hard once their data model evolved. Several of those teams moved to Supabase, which is now playing the same "easy to get started" hand — and which now has to answer the same question Firebase didn't: what happens at the second mile?

The strongest version of the thesis is therefore not *"make onboarding easy."* It is:

> **Make onboarding so easy that you earn the runway to fix the hard parts later, with the user already inside the tent.**

Stripe and Figma earned that runway. Their early onboarding was so frictionless that they captured the buyer before the buyer had decided what scale meant, and they used the lead time to build the enterprise features the incumbent had assumed were prerequisites. By the time the customer needed those features, the incumbent's other advantages — brand, lockin, switching cost — had eroded.

The challenger has to use the early lead to build the late-game capabilities. The customer's first impression is the recruitment; their fifth year is the retention. A product that wins on Day 1 and loses by Year 3 has not won the market — it has rented it.

## The Category Outlives the Pioneer

There is a second, more hopeful version of the same story: sometimes the pioneer doesn't win the market they create, but the *category* they create becomes massive, and the playbook compounds for whoever keeps iterating on it.

Heroku is the cleanest example. In 2008 they invented `git push to deploy` and built a beloved product. Then Salesforce acquired them in 2010, and the next decade was a slow erosion — pricing changes, slower iteration, plans deprecated, the brand cooled. Heroku itself did not win the market.

But look at the market Heroku opened. "Easier to ship than AWS" is now a tens-of-billions-of-dollars category with [[Tooling/Software Development/Cloud Infrastructure/Vercel|Vercel]], Netlify, Railway, [[Tooling/Software Development/Cloud Infrastructure/Replit|Replit]], Render, Fly.io, and Cloudflare Workers all competing for it, each iterating on the same core insight Heroku shipped first: *the developer should not have to learn the cloud to deploy to it.* The customers Heroku trained — the generation who came of age believing `git push` was the deploy command — never went back. They just kept picking newer products that honored the original contract.

The lesson is not that "easy to get started" fails. The lesson is that the pattern outlives the pioneer. Sometimes the company that opens the door is not the company that walks through it. But the door opens for a reason, and it stays open. If you are advising a challenger, the corollary is uncomfortable but important: even if you do not win the market you create, the market itself is real, durable, and someone will win it. Better that someone be you. Failing that, better that the category exist.

There is a darker version of this — pioneers who lose so badly that the category dies with them — but it is rare. Most often, the company that proved an activation cost could be collapsed becomes the warning label on a much bigger industry.

## What "Getting Started" Looks Like for Your Product

If you are advising a founder or operating one, the diagnostic questions are simple to ask and uncomfortable to answer honestly:

- **How long from "I heard about this" to "I saw it work for me"?** Measure in minutes. If the answer is days, you have lost.
- **What is the first thing the customer has to *do* — not read, not sign, not pay — before getting value?** If it is anything other than "use the product," that thing is your activation cost.
- **What is the cheapest path from someone seeing it to someone sending it to a colleague?** If the share requires the colleague to sign up first, you have built a closed graph instead of an open one.
- **What can the user accomplish before they have given you a credit card?** If the answer is "nothing meaningful," you have priced before you have proven.
- **Where is the cliff?** If your product is famous for being easy to start with, it is probably also approaching a moment where it becomes hard to keep using. Where is that moment, and what is your plan for the customer who reaches it?

The questions are not separable. A product that is easy to start, hard to share, and impossible to scale has not won the market on getting started. It has lost the market in slow motion.

## Closing

Hundreds of billions in value have been created by entrepreneurs who decided that the customer's first ten minutes mattered more than the incumbent's twenty years of accumulated features. They were right. They will keep being right as long as the incumbents keep adding features faster than they remove friction.

The challenger's job is not to build a better product. It is to build a product the customer can actually start using. Everything else is a follow-up to that first move.

# Footnotes
***
