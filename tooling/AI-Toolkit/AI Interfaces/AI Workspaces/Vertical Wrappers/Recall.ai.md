---
url: https://www.recall.ai/
date_created: 2026-06-22
date_modified: 2026-11-07
og_title: The API for Meeting Recording
og_description: Get transcripts, recordings, and metadata from Zoom, Google Meet, Teams, and more. Meeting Bot API, Desktop SDK, and Calendar API with 99.9% SLA.
og_image: https://cdn.prod.website-files.com/620d732b1f1f7b244ac89f0e/69fcc9bc6c9d2167440f8c15_548613c749a9368b718c1be6cdbf32c7_open-graph.png
og_favicon: https://cdn.prod.website-files.com/620d732b1f1f7b244ac89f0e/620d732c1f1f7b345dc89f34_Favicon%2032.png
og_type: website
og_last_fetch: 2026-11-07T07:14:28.909Z
tags:
  - AI-Meeting-Notes
  - AI-Transcribers
site_uuid: d9667b98-4da7-4589-81be-bb009b59fdc3
publish: true
title: Recall.ai
slug: recall-ai
at_semantic_version: 0.0.0.1
cf_last_run: 2026-11-07T07:16:06.427Z
cf_last_run_model: Perplexity sonar-pro
cf_retrieved_source_count: 1
cf_last_run_retrieval: 2026-11-07T07:16:06.427Z
---

[[Vocabulary/AI Powered Transcription|AI Transcription]]

[[Tooling/AI-Toolkit/AI Interfaces/AI Workspaces/Vertical Wrappers/Granola|Granola]]
[[Tooling/Productivity/Async Communication/Bubbles|Bubbles]]

Recall.ai is a developer infrastructure company for capturing and processing meeting data, rather than a consumer meeting-notes application. Its products provide access to recordings, transcripts, speaker labels, metadata, and real-time meeting interactions across major conferencing platforms. [^E1]

## Value Proposition & Features

Recall.ai lets developers add meeting capture to their own products without building and maintaining separate integrations for [[Tooling/Productivity/Web Meetings/Zoom|Zoom]], [[Google Meet]], [[Tooling/Productivity/Async Communication/Microsoft Teams|Microsoft Teams]], Webex, Slack, and in-person meetings. [^E1] Its positioning is to let product teams focus on applications built on meeting data while Recall.ai manages platform-specific capture reliability and edge cases. [8]

- **Meeting Bot API:** Bots can join Zoom, Google Meet, Microsoft Teams, and Webex meetings, capture meeting data, and run webpages inside calls for interactive voice-agent use cases. [1]
- **Desktop Recording SDK:** Provides desktop audio/video capture, acoustic echo cancellation, diarized recordings, and speaker-labeled transcripts. [2]
- **Calendar API and scheduling:** Developers can schedule bots through calendar integrations and provide a future `join_at` time for automated meeting attendance. [7]
- **Transcription infrastructure:** Recall.ai supports post-meeting and real-time transcription workflows through multiple speech-to-text providers. [4][6]
- **Output Media:** The `web_4_core` bot variant supports workloads that process audio, maintain WebSocket connections, and play generated speech inside meetings. [1]
- **Meeting metadata:** The platform exposes recordings, transcripts, and metadata for downstream applications. [^E1]
- **Reliability tooling:** The Desktop Recording SDK handles issues including device resilience, browser-tab isolation, network interruptions, and safe shutdown recovery. [8][10]

## Fundraising History

| Round | Date | Amount | Lead investor |
|---|---:|---:|---|
| Pre-seed / additional seed investments | Not specified | Not specified | Not specified |
| Seed | 2022-12-29 | $2.7M | Not specified |
| Series A | 2024-05-15 | $10.0M | Not specified |
| Series B | 2025-10-04 | $38.0M | Not specified |
| **Total** | — | **$50.7M reported** | — |

The retrieved company material reports total funding of $50.7 million and lists the Seed, Series A, and Series B amounts above. [^E1]

Investors: No reliable investor list was found in the available search results.

# Market Sizing

## Category, Market Size, and Category Growth

Recall.ai appears to operate in meeting-data infrastructure, developer APIs, recording SDKs, speech transcription infrastructure, and AI-meeting tooling. Its products are aimed at enabling other software companies to build meeting assistants, recorders, transcription products, and real-time meeting agents. [^E1][1]

No reliable analyst-firm or financial-journalism estimate for the specific Recall.ai addressable market was found in the available search results.

## Pricing

| Product | Published pricing |
|---|---|
| Meeting Bot API | No reliable public tier table found |
| Desktop Recording SDK | No reliable public tier table found |
| Mobile Recording SDK | No reliable public tier table found |
| Higher-resource `web_4_core` bots | Additional cost is indicated, but no reliable amount was found [1] |

# Competitive Landscape

## Who it's for, who it's not for

Recall.ai is for developers and product teams building meeting-centric software—such as AI note-taking tools, transcription products, meeting recorders, voice agents, and workflow applications—that need cross-platform capture without implementing every conferencing integration themselves. [^E1][1]

It is not primarily aimed at individuals seeking a standalone meeting-notes app; its APIs and SDKs are designed to be embedded into another product. [^E1]

## Viable Alternatives

- **Build in-house:** Maximum control, but requires maintaining integrations, capture reliability, transcription pipelines, and platform-specific edge cases. [8]
- **Meeting-platform APIs:** Useful when supporting only one provider, but less suitable for a unified cross-platform capture layer.
- **Speech-to-text APIs:** Appropriate when audio is already available, but they do not replace meeting joining, recording, scheduling, or desktop capture infrastructure.
- **Desktop capture frameworks:** Can provide lower-level recording capabilities, but require teams to handle echo cancellation, device changes, interruptions, and other production issues themselves. [2][8]

## Competitor Table

| Competitor | Description |
|---|---|
| [Recall.ai](https://www.recall.ai/) | Cross-platform meeting bots, desktop recording SDKs, transcription workflows, and meeting-data APIs. [^E1] |
| [AssemblyAI](https://www.assemblyai.com/) | Speech and voice-agent infrastructure that can be paired with meeting-capture systems; Recall.ai’s own example integrates AssemblyAI with its Meeting Bot API. [1] |
| [Soniox](https://soniox.com/) | Speech-to-text provider supported by Recall.ai for post-meeting and real-time transcription workflows. [6] |
| [xAI](https://x.ai/) | Speech-to-text provider supported by Recall.ai for real-time meeting-bot transcription. [4] |
| In-house platform integrations | Internally built capture infrastructure that replaces a third-party meeting-data layer but requires ongoing maintenance for conferencing and device-specific behavior. [8] |


***

# Sources

[1]: 2026, Oct 14. [recall.ai](https://www.recall.ai/). [How to build an AI voice agent for meetings | Recall.ai Blog](https://www.recall.ai/blog/how-to-build-an-ai-voice-agent). Updated: 2026, Oct 27. Generated: 2026, Nov 07. [Perplexity](https://www.perplexity.ai/) API response.
[2]: 2026, Oct 14. [recall.ai](https://www.recall.ai/). [Acoustic echo cancellation in desktop meeting recording](https://www.recall.ai/blog/acoustic-echo-cancellation). Updated: 2026, Nov 06. Generated: 2026, Nov 07. [Perplexity](https://www.perplexity.ai/) API response.
[3]: 2026, Oct 31. [docs.recall.ai](https://docs.recall.ai/). [Grok (xAI)](https://docs.recall.ai/v1.10/docs/grok-xai). Updated: 2026, Nov 07. Generated: 2026, Nov 07. [Perplexity](https://www.perplexity.ai/) API response.
[4]: 2026, Nov 04. [docs.recall.ai](https://docs.recall.ai/). [Grok (xAI) - Getting Started with Recall.ai](https://docs.recall.ai/docs/grok-xai). Updated: 2026, Nov 07. Generated: 2026, Nov 07. [Perplexity](https://www.perplexity.ai/) API response.
[5]: 2026, Nov 04. [recall.ai](https://www.recall.ai/). [A deep dive into desktop capture APIs on Windows: WASAPI | Recall.ai Blog](https://www.recall.ai/blog/windows-wasapi?02578d5c_page=11). Updated: 2026, Nov 06. Generated: 2026, Nov 07. [Perplexity](https://www.perplexity.ai/) API response.
[6]: 2026, Nov 04. [docs.recall.ai](https://docs.recall.ai/). [Soniox](https://docs.recall.ai/docs/soniox). Updated: 2026, Nov 07. Generated: 2026, Nov 07. [Perplexity](https://www.perplexity.ai/) API response.
[7]: 2026, Oct 26. [docs.recall.ai](https://docs.recall.ai/). [Creating and scheduling bots](https://docs.recall.ai/v1.10/docs/creating-and-scheduling-bots). Updated: 2026, Nov 06. Generated: 2026, Nov 07. [Perplexity](https://www.perplexity.ai/) API response.
[8]: 2026, Nov 04. [recall.ai](https://www.recall.ai/). [A deep dive into desktop capture APIs on Windows: WASAPI | Recall.ai Blog](https://www.recall.ai/blog/windows-wasapi?02578d5c_page=8). Generated: 2026, Nov 07. [Perplexity](https://www.perplexity.ai/) API response.
[9]: 2026, Oct 14. [recall.ai](https://www.recall.ai/). [Acoustic echo cancellation in desktop meeting recording | Recall.ai Blog](https://www.recall.ai/blog/acoustic-echo-cancellation?02578d5c_page=1). Updated: 2026, Nov 06. Generated: 2026, Nov 07. [Perplexity](https://www.perplexity.ai/) API response.
[10]: 2026, Oct 14. [docs.recall.ai](https://docs.recall.ai/). [Desktop Recording SDK Safe Shutdown and Recovery](https://docs.recall.ai/docs/dsdk-safe-shutdown). Updated: 2026, Nov 05. Generated: 2026, Nov 07. [Perplexity](https://www.perplexity.ai/) API response.

## Sources (retrieved)

[^E1]: [recall.ai](https://www.recall.ai/). [Recall.ai](https://www.recall.ai/). Generated: 2026, Nov 07. [Exa.ai](https://exa.ai) API response.
