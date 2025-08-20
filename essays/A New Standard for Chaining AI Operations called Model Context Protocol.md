---
site_channel:
  - Keeping-Up
date_created: 2025-03-15
date_modified: 2025-07-30
site_uuid: ca6eed65-4ae5-4c20-bb47-efbcaa5d2524
title: A New API Standard for chaining AI -- Model Context Protocol
lede: Chain and sequence AI operations with Model Context Protocol, a game-changer for AI use and code generation.
date_authored_initial_draft: 2025-03-14
date_authored_current_draft: 2025-07-08
at_semantic_version: 0.0.0.6
status: To-Do
augmented_with: Perplexity AI
category: AI-Workflows
portrait_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/essays/2025-05-04_portraitimage_A-New-API-Standard-for-chaining-AI--Model-Context-Protocol_91774ddc-d674-4da7-b4aa-8c47d7f4785b_IAhoWjZkN.jpg
image_prompt: A futuristic flowchart showing multiple AI models chained together, exchanging data and context. The visual is technical, precise, and emphasizes interoperability.
banner_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/essays/2025-05-04_bannerimage_A-New-API-Standard-for-chaining-AI--Model-Context-Protocol_6a1365bf-c926-4bd6-ab5b-f4d2e6d02cbe_i-PdP_VjT.jpg
tags: [Model-Context-Protocols, AI-Workflows, Code-Generators, Agentic-AI, AI-Human-Workflow]
authors:
  - Michael Staton
---

Anthropic launched the Model Context Protocol on November 25, 2024, [^8cac05] it was a game-changer for AI use and code generation. It allowed for the chaining of AI operations, which made it possible to create complex workflows that could be used to generate code, documents, and other content.

:::image-gallery
 - /visuals/repVector__Prompt.svg
 - /visuals/repVector__Reminder.svg
 - /visuals/repVector__Specification.svg
 :::
 
```

Related: [[concepts/Explainers for AI/Model Context Protocol|Model Context Protocol]], [[Tooling/AI-Toolkit/Model Producers/Anthropic|Anthropic]], [[concepts/Explainers for AI/Chain of Draft|Chain of Draft]]

## What is the Model Context Protocol (MCP)?

The **Model Context Protocol (MCP)** is an open standard developed to enable secure, two-way integration between AI-powered applications (such as large language models and agents) and external data sources, tools, and services. Its primary goal is to standardize how AI systems access, retrieve, and act on real-world data, replacing the fragmented, custom integrations that previously dominated the ecosystem. [^8cac05] [^b51563] [^b479a8] [^081ad2]

MCP draws inspiration from the Language Server Protocol (LSP), which unified how code editors interact with programming languages. Similarly, MCP provides a universal API for connecting AI models with external systems, transforming the integration challenge from an “M×N” problem (each app to each tool) to an “M+N” problem (apps and tools each implement MCP once). [^b479a8] [^026f85] [^081ad2]

### How MCP Works

- **Architecture:** MCP uses a client-server model:
 - **Host applications:** LLM-powered tools (e.g., Claude Desktop, Copilot, AI IDEs).
 - **MCP clients:** Embedded in hosts, these handle communication with MCP servers.
 - **MCP servers:** Expose data, tools, or functions to AI systems via a standardized interface.
 - **Transport:** Communication occurs over JSON-RPC 2.0, using either local (STDIO) or remote (HTTP + SSE) channels. [^b51563] [^026f85]
- **Core Features:**
 - **Resources:** Read-only data sources (like files, databases, knowledge bases).
 - **Tools:** Functions or APIs the AI can call to perform actions.
 - **Prompts:** Predefined templates to optimize how tools/resources are used. [^b479a8] [^026f85]
- **Security & Consent:** MCP emphasizes explicit user consent, robust authorization, and clear UI for data access and tool usage. [^026f85] [^91430e]

## Who Has Adopted MCP?

MCP has seen rapid adoption across major technology companies, AI platforms, and open-source communities. Below is a summary of notable adopters and their use cases:

| Company/Service | Adoption Details | Source/Announcement |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------- |
| **Anthropic** | Creator of MCP; integrated into Claude Desktop and open-sourced core SDKs and servers | [^8cac05] [^b9fb3b] |
| **Block (Square)** | Early adopter, using MCP to build agentic systems for business automation | [^8cac05] |
| **Apollo** | Integrated MCP for enhanced AI-driven workflows | [^8cac05] |
| **Microsoft** | Adopted MCP in Copilot Studio and Azure AI Foundry Agent Service for seamless agent integration across Microsoft 365 | [^b778b7] [^3222d7] |
| **Amazon AWS** | Integrated MCP into AWS Bedrock agents for enterprise-scale, context-aware AI | [^b778b7] [^8d2e1f] |
| **GitHub** | Added MCP server support to GitHub AI assistants and VS Code extensions | [^b778b7] [^cecf76] |
| **Deepset** | Uses MCP to power context-aware RAG and AI pipelines | [^b778b7] |
| **Atlassian** | Announced MCP support for connecting structured knowledge to AI tools | [^b055c1] |
| **Cloudflare** | Integrated MCP for AI-driven security and automation workflows | [^b9fb3b] |
| **Zed, Replit, Codeium, Sourcegraph** | Enhanced AI coding assistants with MCP for deeper context and tool integration | [^8cac05] [^ce07e9] |
| **OpenAI, Google DeepMind** | Announced MCP support for their AI platforms | [^081ad2] [^cecf76] |
| **Windows 11** | Previewed MCP as a foundational layer for secure, interoperable agentic apps | [^91430e] |

## Recent Company Blog Announcements

- **Anthropic**: [Introducing the Model Context Protocol](https://www.anthropic.com/news/model-context-protocol) — Official announcement, architecture, and open-source SDKs. [^8cac05]
- **AWS**: [Unlocking the power of Model Context Protocol (MCP) on AWS](https://aws.amazon.com/blogs/machine-learning/unlocking-the-power-of-model-context-protocol-mcp-on-aws/) — Detailed overview and enterprise use cases. [^8d2e1f]
- **Microsoft**: [Announcing Model Context Protocol Support (preview) in Azure AI Foundry Agent Service](https://devblogs.microsoft.com/foundry/announcing-model-context-protocol-support-preview-in-azure-ai-foundry-agent-service/) — Preview announcement for Azure AI Foundry. [^3222d7]
- **Atlassian**: [Introducing Atlassian's Remote Model Context Protocol](https://www.atlassian.com/blog/announcements/remote-mcp-server) — Announcement of MCP integration for Atlassian products. [^b055c1]
- **Windows Blog**: [Securing the Model Context Protocol: Building a safer agentic future on Windows](https://blogs.windows.com/windowsexperience/2025/05/19/securing-the-model-context-protocol-building-a-safer-agentic-future-on-windows/) — Early preview of MCP in Windows 11. [^91430e]
- **Cloudflare**: [Early Adopters of the Model Context Protocol (MCP) & Open-Source Implementations](https://ardor.cloud/blog/early-adopters-mcp-open-source-implementations) — Overview of open-source MCP projects and industry adoption. [^b9fb3b]

## Summary

**Model Context Protocol** is rapidly becoming the backbone for connecting AI models with real-world data and tools in a secure, standardized way. Its adoption by leading cloud, productivity, and development platforms signals a shift toward more interoperable, agentic AI systems across the industry. [^8cac05] [^b778b7] [^081ad2] 


# Footnotes
***

[^b055c1]: [Introducing Atlassian's Remote Model Context Protocol ...](https://www.atlassian.com/blog/announcements/remote-mcp-server)
[^ce07e9]: [What Is Model Context Protocol (MCP)? A Quick Start Guide.](https://www.montecarlodata.com/blog-model-context-protocol-mcp)
[^ab3fc8]: [What is Model Context Protocol (MCP)? - IBM](https://www.ibm.com/think/topics/model-context-protocol)
[^294bde]: [Model Context Protocol (MCP)](https://www.assemblyai.com/blog/what-is-model-context-protocol-mcp)
[^2b1986]: [MCP 101: An Introduction to Model Context Protocol - DigitalOcean](https://www.digitalocean.com/community/tutorials/model-context-protocol)
[^68ef79]: [Model Context Protocol (MCP): A Guide With Demo Project](https://www.datacamp.com/tutorial/mcp-model-context-protocol)
[^7ce378]: [What is the Model Context Protocol (MCP)?](https://www.builder.io/blog/model-context-protocol)
[^fd1aa4]: [A beginners Guide on Model Context Protocol (MCP) - OpenCV](https://opencv.org/blog/model-context-protocol/)
[^a70c43]: [What is Model Context Protocol (MCP) in 2025](https://www.f22labs.com/blogs/what-is-model-context-protocol-mcp-in-2025/)
[^8cac05]: [Introducing the Model Context Protocol - Anthropic](https://www.anthropic.com/news/model-context-protocol)
[^b51563]: [What Is the Model Context Protocol (MCP) and How It Works](https://www.descope.com/learn/post/mcp)
[^b479a8]: [Model Context Protocol (MCP) an overview - Philschmid](https://www.philschmid.de/mcp-introduction)
[^081ad2]: [Model Context Protocol - Wikipedia](https://en.wikipedia.org/wiki/Model_Context_Protocol)
[^026f85]: [Specification - Model Context Protocol](https://modelcontextprotocol.io/specification/2025-06-18)
[^91430e]: [Securing the Model Context Protocol: Building a safer agentic ...](https://blogs.windows.com/windowsexperience/2025/05/19/securing-the-model-context-protocol-building-a-safer-agentic-future-on-windows/)
[^b9fb3b]: [Early Adopters of the Model Context Protocol (MCP) & ...](https://ardor.cloud/blog/early-adopters-mcp-open-source-implementations)
[^b778b7]: [Model Context Protocol Explained for Smarter Enterprise AI](https://www.designrush.com/agency/ai-companies/trends/model-context-protocol-explained)
[^3222d7]: [Announcing Model Context Protocol Support (preview) in ...](https://devblogs.microsoft.com/foundry/announcing-model-context-protocol-support-preview-in-azure-ai-foundry-agent-service/)
[^8d2e1f]: [Unlocking the power of Model Context Protocol (MCP) on ...](https://aws.amazon.com/blogs/machine-learning/unlocking-the-power-of-model-context-protocol-mcp-on-aws/)
[^cecf76]: [Adoption of the Model Context Protocol within the Java ...](https://www.infoq.com/news/2025/05/mcp-within-java-ecosystem/)


