---
date_created: 2025-08-21
date_modified: 2025-08-21
tags: [Open-Specifications]
for_clients:
  - Laerdal
site_uuid: 3b221fe8-7ce3-480d-b580-229e36f29713
publish: true
title: Dialog Syntax
slug: dialog-syntax
at_semantic_version: 0.0.1.0
augmented_with: Perplexity AI
authors:
  - Michael Staton
---
# Dialog Syntax Standards and Specifications

There are several established open standards and specifications for dialog syntax and conversational AI protocols that enable both UI development and system interoperability. Here are the main categories and standards:

## **Established Open Protocols**

### **XMPP (Extensible Messaging and Presence Protocol)**

XMPP is a mature, XML-based protocol standardized by the IETF with comprehensive RFCs[^54ydtt][^0kqyjo]. It provides:

- **Core Protocol**: RFC 6120 defines XML streaming, authentication, and communication primitives. [^54ydtt]
- **Instant Messaging**: RFC 6121 covers messaging and presence functionality. [^0kqyjo]
- **Decentralized Architecture**: Federated server-to-server communication. [^8bdo17]
- **Transport Flexibility**: Works over TCP, HTTP, WebSocket, and other mechanisms. [^8bdo17]

**Advantages**: Battle-tested, highly extensible, built-in security features
**Disadvantages**: XML-based (less modern than JSON), can be complex to implement[^8bdo17]

### **Matrix Protocol**

Matrix is a modern open standard for decentralized real-time communication [^0ycpuz] [^6glxto]:

- **JSON-based API**: RESTful HTTP APIs using JSON format. [^6glxto]
- **Federated Architecture**: No single point of control, eventual consistency. [^6glxto]
- **Event-driven**: Communication modeled as JSON "events" in virtual "rooms" [^6glxto]
- **Interchangeable Components**: Frontend clients and backend servers from different vendors can interoperate. [^y1ewzq]

**Key Features**: End-to-end encryption, voice/video support, IoT communication, bridging between existing platforms. [^6glxto]

### **ActivityPub**

ActivityPub is a W3C standard for decentralized social networking: [^ia31tb] [^bifv1x]

- **JSON-LD Format**: Uses ActivityStreams 2.0 for content structure. [^ia31tb]
- **Federated Protocol**: Client-to-server and server-to-server APIs. [^ia31tb]
- **Extensible**: Based on Activity Streams, allowing custom activity types. [^sfrmm5]
- **Widely Adopted**: Powers the "fediverse" including Mastodon, PeerTube. [^ia31tb]

## **Conversational AI Markup Languages**

### **ChatML (Chat Markup Language)**

OpenAI's format for structuring AI conversations: [^c0ra75] [^yn7irg]

```
<|im_start|>system
System instructions here
<|im_end|>
<|im_start|>user
User message
<|im_end|>
<|im_start|>assistant
Assistant response
<|im_end|>
```

**Features**: Special tokens for role separation, system message support, reasoning blocks. [^c0ra75][^yn7irg]

### **OpenAI Harmony Format**

A newer format from OpenAI with multi-channel communication. [^yn7irg]:

```
<|start|>user<|message|>User input<|end|>
<|start|>assistant<|channel|>final<|message|>Response<|return|>
```

**Innovations**: TypeScript-style tool definitions, multi-threaded conversation channels. [^yn7irg]

### **AIML (Artificial Intelligence Markup Language)**

XML dialect for creating chatbot responses. [^c9wug7]:

```xml
<category>
  <pattern>WHAT IS YOUR NAME</pattern>
  <template>My name is <bot name="name"/>.</template>
</category>
```

## **Industry Interoperability Initiatives**

### **Microsoft AI Chat Protocol**

Microsoft's specification for consistent AI chat interfaces. [^dm68yi]:

- **Standardized API**: Common contract for AI backend consumption. [^w8ilex]
- **JavaScript/TypeScript Support**: SDK for easy integration. [^w8ilex]
- **Streaming Support**: Both synchronous and streaming completions. [^w8ilex]

### **IETF MIMI (More Instant Messaging Interoperability)**

Working group focused on modern messaging interoperability. [^6ghpqp]:

- **E2EE Support**: Maintains end-to-end encryption during federation. [^t4t9uo]
- **MLS Integration**: Built on Messaging Layer Security protocol. [^t4t9uo]
- **Identity Standards**: X.509 certificates, Verifiable Credentials. [^t4t9uo]

### **Open Voice Interoperability Initiative**

Standards for voice assistant communication. [^tqikb8]:

- **Assistant Manifest**: Describes capabilities and endpoints. [^dm68yi]
- **Conversation Envelope**: Metadata and context preservation. [^dm68yi]
- **Dialogue Events**: Natural language interactions with metadata. [^dm68yi]

## **Data Format Standards**

### **JSON-based Formats**

- **Standard JSON**: Lightweight, widely supported data interchange. [^6ghpqp][^tqikb8]
- **JSON-LD**: Linked data using JSON for semantic web applications. [^6ghpqp]
- **ActivityStreams 2.0**: JSON format for describing social activities. [^ia31tb]

### **Structured Conversation Formats**

Various platforms define conversation schemas:

- **OpenAI API Format**: Messages with role, content, and metadata. [^szbh2p]
- **Anthropic Claude Format**: Similar message-based structure
- **Hugging Face Datasets**: Standardized formats for training data. [^3txbm4]

## **Implementation Considerations**

### **Building UI Around Standards**

When implementing dialog interfaces:

1. **Choose Protocol Based on Needs**:
   - **Real-time chat**: XMPP or Matrix
   - **Social networking**: ActivityPub
   - **AI conversations**: ChatML or custom JSON schema

2. **Design for Interoperability**:
   - Use standardized message formats
   - Implement proper authentication (HTTP signatures, TLS)
   - Support federation protocols when needed

3. **Consider Modern Approaches**:
   - JSON over XML for newer implementations
   - RESTful APIs for simplicity
   - WebSocket for real-time features

### **Data Exchange Between Systems**

For system-to-system communication:

- **API Specifications**: Use OpenAPI/Swagger for REST APIs. [^6mbrd4][^tpcgh2]
- **Message Queues**: MQTT, AMQP for asynchronous communication. [^hpyeh1]
- **Federation Protocols**: Matrix or XMPP for decentralized networks
- **Semantic Standards**: JSON-LD, RDF for rich metadata

The landscape shows a trend toward **JSON-based formats over XML**, **federated architectures over centralized systems**, and **standardized APIs for interoperability**. The choice depends on specific requirements like real-time needs, federation requirements, semantic richness, and compatibility with existing systems.
# Sources
[^54ydtt]: [RFC 6120 - Extensible Messaging and Presence Protocol (XMPP)](https://datatracker.ietf.org/doc/html/rfc6120)
[^0kqyjo]: [XMPP RFCs](https://xmpp.org/rfcs/)
[^8bdo17]: [The 8 best instant messaging and chat protocols - Ably](https://ably.com/blog/instant-messaging-and-chat-protocols)
[^0ycpuz]: [Matrix (protocol) - Wikipedia](https://en.wikipedia.org/wiki/Matrix_(protocol))
[^6glxto]: [Matrix Specification](https://spec.matrix.org)
[^y1ewzq]: [The importance of open standard federation for chat - Element](https://element.io/blog/the-importance-of-open-standard-federation-for-chat/)
[^ia31tb]: [ActivityPub - Wikipedia](https://en.wikipedia.org/wiki/ActivityPub)
[^bifv1x]: [ActivityPub Rocks!](https://activitypub.rocks)
[^sfrmm5]: [w3c/activitypub - GitHub](https://github.com/w3c/activitypub)
[^c0ra75]: [How to work with the Chat Markup Language (preview)](https://learn.microsoft.com/en-us/azure/ai-foundry/openai/how-to/chat-markup-language)
[^yn7irg]: [ChatML vs Harmony: Understanding the new Format from OpenAI](https://huggingface.co/blog/kuotient/chatml-vs-harmony)
[^c9wug7]: [Artificial Intelligence Markup Language - Wikipedia](https://en.wikipedia.org/wiki/Artificial_Intelligence_Markup_Language)
[^w8ilex]: [microsoft/ai-chat-protocol: A library + API spec for easily ... - GitHub](https://github.com/microsoft/ai-chat-protocol)
[^t4t9uo]: [More Instant Messaging Interoperability (mimi) - IETF Datatracker](https://datatracker.ietf.org/wg/mimi/about/)
[^dm68yi]: [TAC Talks Insights: A Deep Dive into the Open Voice Interoperability ...](https://lfaidata.foundation/blog/2024/10/08/tac-talks-insights-a-deep-dive-into-the-open-voice-interoperability-initiative/)
[^6ghpqp]: [JSON - Wikipedia](https://en.wikipedia.org/wiki/JSON)
[^tqikb8]: [Web Data Serialization - JSON, XML, YAML & More Explained](https://beeceptor.com/docs/concepts/data-exchange-formats/)
[^szbh2p]: [API Reference - OpenAI Platform](https://platform.openai.com/docs/api-reference/chat/create)
[^3txbm4]: [Conversational AI Model - Data Formats - Simple Transformers](https://simpletransformers.ai/docs/convAI-data-formats/)
[^6mbrd4]: [Structure of an OpenAPI Description](https://learn.openapis.org/specification/structure.html)
[^tpcgh2]: [OpenAPI Specification - Version 3.1.0 - Swagger](https://swagger.io/specification/)
[^hpyeh1]: [Chat & Messaging Protocols - What Are They & How to Choose](https://getstream.io/blog/messaging-protocols/)
[^b91cq0]: [Reusable Dialog Requirements for Voice Markup Language - W3C](https://www.w3.org/TR/reusable-dialog-reqs/)
[^xpcss0]: [Dialog Requirements for Voice Markup Languages - W3C](https://www.w3.org/TR/1999/WD-voice-dialog-reqs-19991223/)
[^ei3vjr]: [Conversational language understanding data formats | Microsoft](https://learn.microsoft.com/en-us/azure/ai-services/language-service/conversational-language-understanding/concepts/data-formats)
[^u7wgov]: [The Dialog element `<dialog/>` - MDN - Mozilla](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog)
[^d6zlae]: [Dialogue Act Markup Language](https://standards.clarin.eu/sis/views/view-spec.xq?id=SpecDiAML)
[^f2xreh]: [Open source decentralized messaging protocols? : r/privacy - Reddit](https://www.reddit.com/r/privacy/comments/13hx20h/open_source_decentralized_messaging_protocols/)
[^3v6y3i]: [The 6 Types of Conversations with Generative AI - NN/g](https://www.nngroup.com/articles/AI-conversation-types/)
[^6lbjkl]: [What is Conversational AI? Inside the AI Revolution Reshaping ...](https://www.cxtoday.com/contact-center/what-is-conversational-ai-inside-the-ai-revolution-reshaping-contact-centers-and-cx-platforms/)
[^irp0f4]: [About the ISA | Interoperability Standards Platform (ISP)](https://www.healthit.gov/isp/about-isa)
[^t9q65q]: [Model Spec (2025/04/11) - OpenAI](https://model-spec.openai.com)
[^mmu1ux]: [Types of Conversational AI: GenAI Chatbots to IVR in 2025](https://research.aimultiple.com/types-of-conversational-ai/)
[^z7ydpp]: [International Deep Space Interoperability Standards](https://internationaldeepspacestandards.com)
[^yc92ef]: [ChatML Documentation Update - OpenAI Developer Community](https://community.openai.com/t/chatml-documentation-update/528689)
[^ns6v1r]: [What is Conversational AI? | IBM](https://www.ibm.com/think/topics/conversational-ai)
[^q8ckyo]: [Conversational AI Guide – Types, Advantages, Challenges ... - Shaip](https://www.shaip.com/blog/the-complete-guide-to-conversational-ai/)
[^qjia0i]: [RFC 6122 - Extensible Messaging and Presence Protocol (XMPP)](https://datatracker.ietf.org/doc/html/rfc6122)
[^zn62z9]: [Matrix as a Messaging Framework - IETF](https://www.ietf.org/archive/id/draft-ralston-mimi-matrix-framework-01.html)
[^56axy6]: [Extensible Messaging and Presence Protocol (XMPP): Core](https://xmpp.org/rfcs/rfc3920.html)
[^t9bgwp]: [Understanding ActivityPub - Part 1: Protocol Fundamentals](https://seb.jambor.dev/posts/understanding-activitypub/)
[^rpkqf9]: [ActivityPub Protocol Behaviors - socialweb.coop](https://socialweb.coop/activitypub/behaviors/)
[^7vmblz]: [Integrating ActivityPub within Solid specs - Solid Community Forum](https://forum.solidproject.org/t/integrating-activitypub-within-solid-specs/8355)
[^i76dzl]: [A beginner's guide to JSON, the data format for the internet](https://stackoverflow.blog/2022/06/02/a-beginners-guide-to-json-the-data-format-for-the-internet/)
[^9a753q]: [Making messaging interoperability with third parties safe for users in ...](https://engineering.fb.com/2024/03/06/security/whatsapp-messenger-messaging-interoperability-eu/)
[^asdt82]: [OpenAPI tips - Data types and formats - Speakeasy](https://www.speakeasy.com/blog/openapi-tips-data-type-formats)
[^463m0q]: [A Playbook for End-to-End Encrypted Messaging Interoperability](https://techpolicy.press/a-playbook-for-endtoend-encrypted-messaging-interoperability)
