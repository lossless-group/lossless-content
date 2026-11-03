---
date_created: 2024-09-03
date_modified: 2026-11-02
site_uuid: def4f0af-2f83-40ad-84ba-baf5f4904823
title: The Irony of UI Stability
lede: "UI stability often wins over constant change — consistency keeps users loyal."
date_authored_initial_draft: 2024-09-03
date_authored_current_draft: 2026-11-02
at_semantic_version: 0.0.1.0
status: Draft
augmented_with: Claude Code on Claude Opus 5.5 (1M context)
category: 'Counterintutive-Approaches'
portrait_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/essays/2025-05-04_portraitimage_The-Irony-of-UI-Stability_410acf60-00c2-4d68-b61d-7eef6001972c_IyKpnTXDMZ.jpg
image_prompt: "The White House flying a flag labeled 'User Interface', symbolizing the authority and stability of enduring UI design. The mood is iconic, institutional, and subtly humorous."
banner_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/essays/2025-05-04_bannerimage_The-Irony-of-UI-Stability_f6f04203-502a-4768-bbbd-b55859ba4178_3URG5i33q.jpg
tags: [Software-Development, Design-Practices, UI-Design]
authors: 
  - Michael Staton
publish: true
---

Look at what the biggest consumer internet companies have changed over the last fifteen years. Their infrastructure, many times. Their business models. Their ranking systems, their ad systems, their ownership, in one case even their name.

Now look at what you actually touch. [[organizations/Amazon|Amazon]] is still a search box, a results list and a buy button. [[organizations/WhatsApp|WhatsApp]] is still a list of chats. [[organizations/Facebook|Facebook]] is still a feed. [[organizations/X|Twitter]] is still a column of short posts, whatever you call it now.

Here's the irony. **The most visible part of a software company is the part that can least afford to change.** Yet it's the part with whole teams hired to change it.

The image at the top of this essay is the White House for a reason. Administrations come and go, and they rearrange everything inside. The building stays, and everyone knows where the front door is.

## Reddit Rebuilt the Engine and Kept the Car

[[organizations/Reddit|Reddit]] is the cleanest example. [[Sources/People/Aaron Swartz|Aaron Swartz]], whose company merged with Reddit in its first year, helped rewrite the software that ran the site. Users kept using it. Reddit's 2005 design then stayed the basis of the site until 2018. [^bh1iwq]

By then, Steve Huffman was saying new users were turned off because Reddit looked like a "dystopian Craigslist." He had a point, and the company shipped its redesign. Then it did something revealing: it left the old site running at old.reddit.com. In 2024 the old domain lost its dedicated login flow, but site admins still said they had "no plans" to remove it. [^bh1iwq]

Thirteen years of a site that looked out of date, and it was still the door a lot of people wanted to use.

## Digg Burned the Building Down

Digg is the same story with the opposite ending.

In August 2010, Digg v4 launched and removed features its community relied on, including bury, favorites and the upcoming pages. Users declared a "quit Digg day" for August 30 and used Digg's own auto-submit feature to fill the front page with links to Reddit. Traffic fell by a quarter in the following month, while Reddit's grew 230% that year. By July 2012, Digg's monthly unique visitors were down 90% from the peak, and the brand, website and technology sold to Betaworks for $500,000. [^cwtzki]

Digg didn't die because the new design was ugly. It died because the new version took away what people had built habits around, and a familiar alternative was one tab away.

Snapchat learned a cheaper version of this in 2018. More than 1.2 million people signed a petition against its redesign. When Kylie Jenner tweeted that she'd stopped opening the app, Snap's stock fell 6% that day and about $1.3 billion of market capitalization went with it. [^v1mv52]

## Why Users Hate It (and They're Not Wrong)

It's tempting for product teams to treat this as people being resistant to change. I think users are being rational.

Using an interface is a skill, and it took your customers time to acquire it. Once the skill sinks in, they stop seeing the interface and just do the task. A redesign takes that skill away and makes them think about your product, when they came to think about something else. You've raised their costs and called it an upgrade.

Jakob Nielsen put the wider version in one line: users spend most of their time on other sites. [^ddnr25] Your product is rarely the center of anyone's day. People bring their expectations from everywhere else, and they don't want to relearn the basics for you.

There's also an incentive problem underneath this. A designer gets promoted for shipping the new thing. Nobody gets promoted for leaving a working screen alone.

## What to Do Instead

The lesson isn't to never redesign. Reddit's concern about new users was real, and a product can absolutely age out of its market. But the existing users pay for a redesign, and the benefit goes to people who aren't customers yet. That trade should be made on purpose.

- **Change the engine freely.** Rebuild everything your users can't see. They'll only notice that it got faster.
- **Add before you remove.** New capability rarely starts a revolt. Taking away something people rely on does. Digg's removed features did more damage than its new look.
- **Leave the old door open.** old.reddit.com looks like technical debt, but it's also a pressure valve. An opt-out turns a mutiny into a preference.
- **Watch your best users, not your averages.** The people who've built the deepest habits lose the most in a redesign, and they often create what everyone else came for.

Technology moves fast, and people's hands don't. The companies that seem to understand this best look like they aren't doing anything at all.

***
### Citations

[^bh1iwq]: [Reddit](https://en.wikipedia.org/wiki/Reddit). Wikipedia. Accessed 2026-11-02.
[^cwtzki]: [Digg](https://en.wikipedia.org/wiki/Digg). Wikipedia. Accessed 2026-11-02.
[^v1mv52]: 2018, Feb 23. Alex Hern. [Kylie Jenner helps to wipe $1bn from Snapchat with tweet over redesign woes](https://www.theguardian.com/technology/2018/feb/22/snapchat-redesign-12m-signature-petition-social-media-app-kylie-jenner-celebrities). The Guardian.
[^ddnr25]: [Jakob's Law of Internet User Experience](https://www.nngroup.com/videos/jakobs-law-internet-ux/). Nielsen Norman Group.
