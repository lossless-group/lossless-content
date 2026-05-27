---
aliases:
  - LSP
site_uuid: c99c29da-d233-402a-9f13-13a9097d4528
title: Language Server Protocol
slug: language-server-protocol
at_semantic_version: 0.0.0.1
date_created: 2025-07-23
date_modified: 2026-05-25
url: https://microsoft.github.io/language-server-protocol/
url_spec: https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/
cf_last_run: 2026-05-25T20:25:31.519Z
cf_last_run_model: Perplexity sonar-pro
tags:
  - Emergent-Innovation-Examples
  - Open-Specifications
maintained_by: "[[organizations/Microsoft|Microsoft]]"
---
[[Tooling/Software Development/Developer Experience/DevTools/Visual Studio Code|VS Code]]

# Defining and Describing Language Server Protocol
- ![Editor-to-language-server architecture diagram showing a code editor client communicating with a separate language server over JSON-RPC](https://microsoft.github.io/language-server-protocol/img/vscode-css-code-complete.png)
- _The Language Server Protocol is the “common language” that lets one editor speak to many programming languages without each editor reimplementing every language feature._[1][4]
- The **Language Server Protocol (LSP)** is an open, **JSON-RPC-based** standard for communication between a development tool and a separate language server process.[1][4]
- It matters because it standardizes features like completion, diagnostics, symbol lookup, and other language intelligence so editors can reuse one backend implementation across many tools.[2][3][4]
- The architecture reduces duplication by separating the editor’s user interface from the language-specific “smarts,” which are handled by the language server in its own process.[1][4]

# Uses in Context
- LSP is used to describe the protocol that lets an editor and language server exchange requests, responses, and notifications for code intelligence features.[2][4]
- It is invoked when tools advertise support for “code completion,” “syntax highlighting,” and “precise diagnostics” through a shared message format.[3][4]
- It is used to explain a **client/server** split in which the editor acts as the client and the language service runs separately in the background.[2][4]
- It is used in developer tooling discussions to emphasize that the editor can stay language-agnostic while the server handles parsing, AST construction, symbol resolution, and type checking.[2]
- It is also used in implementation guidance for server authors, where the protocol is described as a standardized mechanism that can operate over stdio or other transport channels.[5]

# History of Use

## Origins
- The protocol was developed in **2016** by **Microsoft** for **[[Tooling/Software Development/Developer Experience/DevTools/Visual Studio Code|Visual Studio Code]]** as a way to eliminate the need to build separate language services for each editor-language combination.[3]
- Microsoft describes LSP as “the product of standardizing the messages exchanged between a development tool and a language server process,” framing it as a general integration layer rather than a single-editor feature.[4]
- A video overview credits the protocol’s development to a collaboration between **Microsoft, Red Hat, and Codenvy**, reinforcing that its early formation was collaborative rather than the work of a single vendor.[1]

## Evolution
- **2016:** LSP emerged as a way to decouple language intelligence from editor implementations and reduce the maintenance burden of supporting many editors and many languages.[1][3][4]
- **Later adoption:** The protocol became a community-driven standard used by editors such as **VS Code, [[Tooling/Software Development/Developer Experience/Neovim|Neovim]], and Emacs**, and by languages ranging from **Rust and Go to COBOL**.[1]
- **Ongoing expansion:** Documentation and tutorials increasingly treat LSP as a general-purpose interface for custom language tooling, including specialized servers and integrated development environments outside Microsoft’s original ecosystem.[2][5][6]

# Best Real-World Examples
- [Visual Studio Code](https://code.visualstudio.com/) — a major adopter that uses LSP-style integrations to provide language features through external servers.[3][4]
- [Neovim](https://neovim.io/) — [[Tooling/Software Development/Developer Experience/Neovim|Neovim]] -- an editor commonly cited as an LSP client in community usage.[1]
- [Emacs](https://www.gnu.org/software/emacs/) — another long-running editor that supports LSP-based tooling.[1]
- [gopls](https://pkg.go.dev/golang.org/x/tools/gopls) — a Go language server that exemplifies the separate-server model described by LSP documentation.[2]
- [dbt LSP](https://www.getdbt.com/blog/language-server-protocol) — a domain-specific server showing how the protocol extends beyond general-purpose programming languages.[3]
- [OpenCode LSP integration](https://opencode.ai/docs/lsp/) — [[OpenCode]]-- an example of modern tooling wiring LSP into AI-assisted development workflows.[6]
- [Warp code editor LSP support](https://docs.warp.dev/code/code-editor/language-server-protocol/) — [[Tooling/AI-Toolkit/Generative AI/Code Generators/Warp|Warp]] -- an example of terminal-based editor software using LSP for IDE-like features.[7]

# Case Studies
A core case study for LSP is **Visual Studio Code**, where Microsoft introduced the protocol in **2016** to avoid writing editor-specific language integrations for every language and every tool.[3][4] The idea was to standardize communication so a language backend could be written once and reused across multiple clients, with the editor sending file and cursor events while the server returned diagnostics and feature results.[3][4] This shows the main value proposition of LSP: it turns a combinatorial integration problem into a shared interface problem.[1][4]

A second case study is the **[[Tooling/Software Development/Programming Languages/Go|Go]] language ecosystem**, where tooling such as **gopls** illustrates how LSP shifts language intelligence out of the editor and into a dedicated server process.[2] In the LSP model, the editor remains focused on UI, while the server parses code, builds an internal model, resolves symbols, and serves completions or diagnostics on demand.[2][4] This demonstrates how LSP supports high-quality language tooling without requiring editors to embed deep language-specific logic.[2][4]

A third case study is **dbt Labs’ dbt LSP**, which shows LSP being adapted for a domain-specific workflow rather than a mainstream programming language.[3] dbt’s documentation describes LSP as an open protocol that standardizes communication between code editors and language tooling, using [[JSON-RPC]] messages and file-change notifications to provide completions and diagnostics.[3] This example shows that LSP is not just for general-purpose IDEs; it is also a reusable pattern for specialized developer experiences.[3][6]


***

# Sources

[1]: [Understanding the Language Server Protocol (LSP) - YouTube](https://www.youtube.com/watch?v=73kUrWN-49M)
[2]: [How VS Code Understands Your Code: Inside the Language Server ...](https://dev.to/archycode/how-vs-code-understands-your-code-inside-the-language-server-protocol-2gop)
[3]: [Understanding LSP: What it is, and what you can use it for - dbt Labs](https://www.getdbt.com/blog/language-server-protocol)
[4]: [Language Server Protocol - Visual Studio (Windows) - Microsoft Learn](https://learn.microsoft.com/en-us/visualstudio/extensibility/language-server-protocol?view=visualstudio)
[5]: [Coding Challenge #99 - Language Server (LSP)](https://codingchallenges.substack.com/p/coding-challenge-99-language-server)
[6]: [LSP Servers - OpenCode](https://opencode.ai/docs/lsp/)
[7]: [Language Server Protocol (LSP) - Warp docs](https://docs.warp.dev/code/code-editor/language-server-protocol/)
[8]: [Code Less to Code More: Streamlining Language Server Protocol ...](https://arxiv.org/abs/2509.15150)
