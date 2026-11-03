---
date_created: 2026-08-02
date_modified: 2026-11-03
title: Homebrew Sweep — Hitlist
slug: homebrew-sweep-hitlist
tags:
  - Homebrew
  - macOS
  - CLI-Applications
  - CLI-Agents
  - AI-Agents
  - Model-Context-Protocol
  - Digital-Preservation
  - Local-First
---

The single working hitlist for the [[Tooling/Software Development/Developer Experience/Homebrew|Homebrew]] sweep — one list, not a file per package. Each new formula/cask off the publish list lands here with a one-line verdict against our thesis (agent-native tooling, local-first / own-your-data, [[A New Standard for Chaining AI Operations called Model Context Protocol|MCP]], portable formats, digital preservation). Anything marked **⭐** stands out enough to promote to its own [[Homebrew Roundup - 2026-06-21|Roundup]]-style entry; **✓** is worth a line in a roundup; **—** didn't make the cut. Ordered by fit, most promotable first.

## Sweep — 2026-11-03, third paste

Mostly August and September 2026, plus some `brew upgrade` output. Same method and limits as the sweeps below. "Unconfirmed" means the cask's Homebrew history didn't show a clear first commit.

| Package | Landed | Fit | Angle for us / why |
|---|---|:---:|---|
| [[Homebrew 7.0 - An Official GUI Arrives with BrewUI\|**homebrew-app**]] | Sep 13 | ⭐ | **Homebrew 7.0** shipped with BrewUI, its official macOS GUI. The tool behind this whole sweep changed. |
| [[pnpm 12 - A Major Release for a Core Tool\|**pnpm 12**]] | Aug 26 | ⭐ | Seen in the `brew upgrade` output. A major release of a core tool; our own pins are all still on pnpm 10. |
| [[SkillSpector - NVIDIA's Security Scanner for Agent Skills\|**skillspector**]] | Sep 1 | ⭐ | NVIDIA scanner for agent skills. Cites 26.1% of analyzed skills containing vulnerabilities. Directly relevant to our skill repo. |
| [[deja-vu - Local Memory Across Your Agent Sessions\|**deja-vu**]] | Aug 23 | ⭐ | Local, LLM-free index of agent session histories, served over MCP and hooks. Close kin of our `claude-code-sessions` collection. |
| [[Obscura - A Headless Browser for Agents, Without Chromium\|**obscura**]] | Aug 23 | ⭐ | Rust headless browser without Chromium, Puppeteer-compatible, pitched as stealthy. About 30k stars. Relevant to crawling, and the stealth needs care. |
| [[Atlas - Source Control for Coding Agents\|**atlas-app**]] | Aug 24 | ⭐ | Links agent sessions to the commits they produced: which prompt shipped which line. |
| [[Hister - Self-Hosted Search over Your Browsing History\|**hister**]] | Sep 10 | ⭐ | Self-hosted search over your browsing history and files, with MCP. From Adam Tauber, who created Searx. |
| [[fx - Vercel Labs' Unix-Like Coding Agent\|**fx-agent**]] | Aug 23 | ⭐ | Vercel Labs' small, embeddable, Unix-like coding agent. |
| [[jcode - A Rust Harness for Multi-Agent Work\|**jcode**]] | Aug 31 | ⭐ | Rust coding-agent harness for heavy multi-agent work. About 21k stars. |
| [[AgentIDE - Run Agents in Parallel, Keep Tokens Private\|**agentide**]] | Sep 5 | ⭐ | Parallel agents with private tokens, from Mike McQuaid's account. |
| [[tgrep - Microsoft's Trigram-Indexed Search for Large Codebases\|**tgrep**]] | Sep 4 | ⭐ | Microsoft's trigram-indexed regex search for large codebases. |
| [[tailcat - Netcat over Tailscale's Data Plane\|**tailcat**]] | Aug 31 | ⭐ | Netcat over Tailscale's data plane without its control plane, from Tailscale. |
| [[Readwise CLI - Your Reading Library, Reachable by Agents\|**readwise-cli**]] | Aug 28 | ⭐ | Your Readwise and Reader library from the terminal, reachable by agents. |
| [[ThoughtDAG - A Canvas Where Wires Are the Context\|**thoughtdag**]] | Aug 24 | ⭐ | Canvas where wires decide what context the model sees, and which opens local Claude Code sessions as graphs. |
| [[Skills Manager - Sync Agent Skills Across Coding Tools\|**skills-manager**]] | Aug 24 | ⭐ | Syncs skills across 50+ coding tools. Compare with our symlink setup and APM. |
| **zentty, waku** | Sep 7, Aug 31 | ⭐ | Join the agent supervisors group post. |
| [[Token Monitor - Usage Cost and Limits Across AI Coding Tools\|**token-monitor**]] | Aug 31 | ⭐ | Usage, cost and limits across AI tools: 38 report token usage and 10 only limits. Counts come mostly from local files, limits from the providers. |
| [[Anarlog - The Open-Source Granola Alternative Once Called Hyprnote\|**anarlog**]] | Aug 24 | ⭐ | Open-source Granola alternative, formerly Hyprnote and Char, about 9.7k stars. MIT apart from `enterprise/`, and some features need Pro. |
| [[Nativ - A Native Mac App for Local MLX Models\|**nativ**]] | Aug 25 | ⭐ | MIT Mac app for local MLX models from Neywa Labs: a SwiftUI interface over a bundled Python mlx-vlm server. Post dated to the Jul 20 launch. |
| [[Unsloth Desktop - Run and Train Open Models in One App\|**unsloth**]] | Aug 26 | ⭐ | Beta desktop app for running and training open models. Mac training is newer and more limited than the NVIDIA path. Post dated to the Aug 11 launch. |
| [[AIPOCH Open-Science - A Research Workbench with Portable Records\|**open-science**]] | Sep 7 | ⭐ | AIPOCH's Apache-2.0 research workbench with MCP. Storage and execution are local, but it still needs a model connection. Post dated to the Oct 14 v1.0.0 release. |
| **shpool** | Aug 29 | ✓ | Lightweight persistent shell sessions, "tmux, then aim lower". |
| **davit** | Aug 26 | ✓ | GUI for Apple's container CLI; socktainer thread. |
| **forgejo-runner** | Sep 8 | ✓ | Self-hosted CI, own-your-forge angle. |
| **tabularis** | Unconfirmed | ✓ | Open SQL workspace with driver plugins. |
| **sabiql** | Sep 1 | ✓ | Vim-first database TUI. |
| **macshot-offline** | Jul 10 | ✓ | Screenshot tool with upload features removed. |
| **omniwm** | Sep 6 | ✓ | Open tiling window manager for Apple Silicon. |
| **clawd-on-desk** | Unconfirmed | ✓ | Desktop pet reacting to agent state. A lighter take on which agent needs me. |
| **osctrl-mcp** | Sep 8 | ✓ | MCP server for osquery management. |
| **riverscript** | Unconfirmed | ✓ | System-audio recording and transcription. |
| **privacynotes** | Sep 7 | ✓ | End-to-end encrypted notes and sync. |
| **terminal-browser** | Aug 31 | ✓ | Terminal-based web browser. |
| **amethyst-nostr** | Aug 23 | ✓ | Nostr client, also the `amy` CLI. Decentralization angle. |

**Passes (—):**

- Generic dev or ops tooling, no hook: `ffmpeg@8`, `glci`, `leaves`, `mysql-client@9.7`, `mysql@9.7`, `robotcode`, `speedtest-go`, `tele`, `virglrenderer`, `xeve`, `xevd`, `elasticmq`, `libmysofa`, `ntfs2btrfs`, `robot-framework-robocop`, `rubocop`, `snx-rs`, `trealla-prolog`, `db-pro`, `android-performance-analyzer`, `arm-performix`, `tcp-viewer`, `wsl-manager`, `tabularis@nightly`, `budget-tracker`.
- Science and specialist: `gffcompare`, `plink-ng`, `pythia`, `vernier-graphical-analysis`, `gamemaker@beta`, `tone3000`, `audacity@3`, `bifrost`.
- Consumer or macOS tweaks: `amy`, `betterglobekey`, `linecast`, `pixivbiu`, `afterglow`, `airstats`, `bramble`, `crisp`, `diskboard`, `dockdoor-pro`, `droppy`, `keychron-assistant`, `leigod`, `mac-performance-monitor`, `markviewer`, `motrix@beta`, `pixcake`, `quarkclouddrive`, `sjmcl`, `triggerflo`, `mangodisk`, `minmaxcal`, `stockbit`, `easymac-cleaner`, `flick`, `psysonic`.
- Closed AI or workspace products with no clear hook: `channel-works`.
- Already covered: `sxitch`.
- Fonts: font-asap-sharp, font-nevermind, font-paper-mono, font-valley-sans, font-clarity-city, font-isometra, font-kripa, font-libre-caslon-condensed, font-pyeojin-gothic.

## Sweep — 2026-11-03, second paste

Mostly September 2026. Same method and limits as the sweep below. A shorter June list also came through. Its nine strongest packages were already written up in the [[Homebrew Roundup - 2026-06-21|June 21 roundup]] (`msgvault`, `socktainer`, `tubeup`, `altersend`, `cotypist`, `palmier-pro`, `supaterm`, `sxitch`, `typewhisper`), so only its leftovers appear here.

| Package | Landed | Fit | Angle for us / why |
|---|---|:---:|---|
| [[Bend 2 - A Language That Demands Proof from AI Code\|**bend**]] | Sep 19 | ⭐ | Bend 2 pitches a `LAWS.bend` file of rules the compiler forces AI-written code to prove it keeps. The most ambitious answer yet to "how do you trust code you won't read?" Pairs with [[BAML - From Prompt Language to a Programming Language for Agents\|BAML]]. Its speed and proof-checking claims need testing. |
| [[ketch - Search, Code Search and Scraping in One Binary\|**ketch**]] | Sep 16 | ⭐ | One stateless binary for web search, code search, library docs, scraping and crawling, with JSON output and swappable backends including Firecrawl and Tavily. Could help at the cheap end of `crawl-fetch-ingest`, but has no schema extraction. Same author as `cymbal`. |
| [[NVIDIA PAIR - A Local Inference Router for Your Home Network\|**nvidia-pair**]] | Sep 15 | ⭐ | NVIDIA's router that spreads local inference across computers on your network, with Ollama, OpenAI and Anthropic-compatible endpoints. A home-lab take on running multi-agent work locally. |
| [[bashka - Static Checks for curl-to-bash Installs\|**bashka**]] | Sep 17 | ⭐ | Swap `curl … | bash` for `curl … | bashka` to statically check install scripts, following any scripts they call. Small and new, but it targets a risky habit worth checking. |
| [[Relay - Build Prompts from Voice, Clipboard and Screen\|**relay**]] | Sep 14 | ⭐ | Menu bar app that weaves dictation, clipboard captures and on-screen annotations into a prompt, with an MCP bridge to Claude Code. A fresh idea for gathering context. Check its license, which GitHub doesn't recognize. |
| [[Agent Supervisors - Eight Tools Chasing the Same Question\|**Agent supervisors**]] | Sep 1 to Sep 22 | ⭐ | One group post. `workmux`, `ccmux`, `agent-manager`, `calyx`, `ghostex` and `kaku` all landed within weeks, chasing what [[herdr - Agent Multiplexer That Lives in Your Terminal\|herdr]] and [[Otty - A Native Terminal Tuned for Code Agents\|Otty]] chase. The pile-up is the story: which agent needs me, and how do I keep them in separate worktrees? |
| **xgrammar** | Sep 17 | ✓ | Structured-generation engine already integrated into Modular MAX and OpenVINO GenAI. Infrastructure worth knowing. |
| **cargo-mutants** | Sep 11 | ✓ | Mutation testing for Rust: inject bugs and see if tests catch them. A useful check on agent-written tests. |
| **openfasttrace** | Sep 8 | ✓ | Traces requirements through code and tests. Long-established, with a possible link to our spec discipline. |
| **termaid** | Sep 16 | ✓ | Renders Mermaid in the terminal, including in Claude Code's replies. |
| **confluence-markdown-exporter** | Jul 14 | ✓ | Confluence to Markdown. A clean exit from a closed format. |
| **distill-web-monitor** | Sep 15 | ✓ | Web-page change monitoring, relevant to our [[Self-Updating-Product-Announcement-Watcher\|announcement watcher]] spec. |
| **ollama-binary** | Sep 10 | ✓ | A separate binary-only Ollama cask. Minor, but we should understand how it differs from `ollama`. |
| **langdock** | Sep 10 | ✓ | Enterprise AI-adoption platform's desktop app. Relevant to our client work more than our stack. |
| **agentiloop-agent** | Sep 17 | ✓ | Mac agent that drives any app through Accessibility. Compare with `agent-desktop` and `cuadriver`; check its license. |
| **openclip** | Sep 20 | ✓ | Open-source action popup for selected text, AGPL. |
| **yap-app** | Sep 21 | ✓ | On-device dictation using Apple's Speech framework; no account. Compare with OpenWhispr and TypeWhisper. |
| **gloomberb** | Sep 20 | ✓ | Finance terminal in the terminal. A fun fit for our venture audience. |
| **recordly** | Sep 14 | ✓ | Screen recorder for demo videos, AGPL. About 36,000 stars, which is high enough to look at carefully. |
| **sidex** | Sep 16 | ✓ | VS Code rebuilt on Tauri, claimed 96% smaller. No repo pushes since August. |
| **tapmap** | Sep 18 | ✓ | Maps your computer's live network connections. A simple privacy check. |
| **colamd** | Sep 18 | ✓ | Markdown editor, MIT. Same family as `markpad` and `mdhero`. |
| **telari** | Sep 16 | ✓ | Markdown reader focused on typography. |
| **taproom** | Jun 19 | ✓ | From the June list. Interactive TUI for Homebrew, useful for exactly this kind of sweep. |
| **tunarr** | Jun 7 | ✓ | From the June list. Builds live TV channels from your own Plex, Jellyfin or Emby media. Own-your-media angle. |

**Passes (—):**

- Generic dev or ops tooling, no hook: `fdk-aac`, `fdk-aac-encoder`, `go-arch-lint`, `kpt`, `libklvanc`, `percona-server@8.4`, `smbclient-ng`, `taoup`, `tunnelite`, `xwpe`, `ratex`.
- Science and specialist: `fastplong`, `openplc-editor`, `jlcone`, `minibwa`, `unuran`.
- Consumer or macOS tweaks: `bettermacwidgets`, `bitmuse`, `capsomnia`, `doubaoime`, `hoptodesk`, `incy`, `network-weather`, `nuphyio`, `opendisk`, `picmal`, `reolink`, `ruswitcher`, `saega`, `snapline`, `telegram@beta`, `tencent-yingyongbao`, `tungsten-edge`, `gitdifferent`, `kkterm`.
- Closed AI or workspace products with no clear hook: `muse`, `workbuddy-ai`, `workbuddy-cn`.
- From the June list, already passed on: `actions-languageserver`, `just-lsp`, `8bitdo-firmware-updater`, `baseline`, `brave-origin`, `brave-origin@beta`, `brave-origin@nightly`, `navigator`.
- `ratex` has already been renamed `texres` in Homebrew.
- Fonts: font-google-sans, font-google-sans-flex, font-nebula-sans, font-tiny5-duo.

## Sweep — 2026-11-03

From a pasted run of `brew` output covering roughly August to November 2026. "Landed" for ⭐ rows is the Homebrew pull request's merge date, or the bigger event a post is dated to. For ✓ rows it's the first commit date, which can run days or weeks earlier. ⭐ verdicts come from READMEs and vendor pages. Many ✓ verdicts rest on GitHub or vendor one-liners, and passes on Homebrew's descriptions alone. None of these has been run.

| Package | Landed | Fit | Angle for us / why |
|---|---|:---:|---|
| [[OpenShell - NVIDIA's Runtime for Autonomous Agents\|**openshell**]] | Oct 1 | ⭐ | NVIDIA's runtime for fleets of autonomous agents. Kernel-level enforcement on every file access, syscall and network connection, plus formal verification of policy changes. A heavyweight enters the sandbox fight with [[ArcBox - An Open-Source Runtime for Containers, VMs and Agent Sandboxes\|ArcBox]]. |
| [[Muse Code - Meta's Terminal Coding Agent\|**muse-code**]] | Aug 12 | ⭐ | Meta's terminal coding agent, built for its Muse models, with approvals, sandboxing and multi-agent orchestration. A major lab joins the CLI-agent race. |
| [[DeepSeek Harness - Everything Is a Plugin\|**deepseek-harness**]] | Sep 30 | ⭐ | Desktop app for DeepSeek's MIT-licensed `dsh`, where the model adapter, tool registry and agent loop are all replaceable plugins. Open-sourced Aug 13, so date any post with care. |
| [[SurrealDB 4.0 - A Major Release for Our Canonical Layer\|**surrealdb/tap/surreal-db**]] | Nov 3 | ⭐ | **SurrealDB 4.0 shipped today**, not just a new formula. We have a `surrealdb-canonical-layer` skill that still mentions 2.x behavior, so this deserves an Rsbuild-style breaking-changes post. Don't upgrade before reading the post: JS SDKs before 2.1 refuse a 4.0 server. |
| [[kata - A Local-First Issue Tracker for Agents and Humans\|**kata**]] | Aug 11 | ⭐ | Local-first issue tracker for agents and humans: SQLite by default, agent CLI, human TUI, MCP server. Same `kenn-io` org as [[Homebrew Roundup - 2026-06-21\|msgvault]]. A real alternative to markdown to-do lists. |
| [[mcpc - A Universal MCP Client for the Shell\|**mcpc**]] | Oct 9 | ⭐ | Apify's MCP client for the shell, with persistent sessions, OAuth 2.1 and keychain storage. Pairs with [[mcpsnoop - Wireshark for MCP\|mcpsnoop]]: one calls servers, the other watches the traffic. |
| [[agent-desktop - Computer Use Through the Accessibility Tree\|**agent-desktop**]] | Nov 3 | ⭐ | Vercel Labs computer use through the OS accessibility tree rather than screenshots. Same token-saving logic as our browser-drive rule of snapshots over raster. |
| [[zvec-grep - Local Hybrid Search for People and Agents\|**zvec-grep**]] | Oct 22 | ⭐ | Local-first hybrid search across code and non-code files for people and agents, with local embeddings by default. Direct comparison point for our local corpus. |
| [[DoltLite - SQLite with Git-Style Version Control\|**doltlite**]] | Oct 5 | ⭐ | DoltHub's SQLite fork with Git-style version control on prolly trees. Portable, versioned, local-first data, itself described as agent-engineered. In beta. |
| [[Delta - The Zed Team's Multiplayer Environment for Agents\|**zed-delta**]] | Oct 8 | ⭐ | From the Zed team: shared threads for people and agents, with DeltaDB tracking every edit along with its discussion. A bet that conversations belong in version control. |
| [[Biscotti - Meeting Transcripts That Stay on Your Mac\|**biscotti**]] | Oct 15 | ⭐ | Meeting recorder that runs entirely on the Mac, with no bot, cloud or account, and an MCP server for notes. **Not open source** despite being on GitHub: PolyForm Perimeter license. |
| [[Kontext - Local Policy for Agents, and Why It Fails Open\|**kontext**]] | Oct 25 | ⭐ | Local policy layer between agents and tools, with an authorization ledger. **Fails open by design:** policy errors and missing policies allow the call, even in enforce mode. That caveat is the story. macOS only on Homebrew. |
| [[packslip - Signed Release Manifests for Vendor Binaries\|**packslip**]] | Oct 5 | ⭐ | Signed release manifests for vendor binaries, so installers verify a signer rather than trust a checksum file beside the download. Supply-chain plumbing we should understand. |
| [[The Craft Suite - AI-Built Rust Clones of Adobe and Microsoft Apps\|**Craft suite**]] | Oct 7 to Nov 3 | ⭐ | One group post. `storytold`/ArtCraft's AI-built "clean-room" Rust clones of Photoshop, Premiere, Lightroom, Word and more, with CLIs and MCP servers. PhotoCraft claims about 76k stars in five weeks and calls itself early alpha. Covered by Phoronix, but treat the stars and the clean-room claim skeptically. |
| **maki** | Oct 5 | ✓ | Token-frugal coding agent with Lua plugins. Parses bash with tree-sitter, so `git diff && rm -rf /` needs both permissions. |
| **cymbal** | Sep 17 | ✓ | Tree-sitter code navigation in a local SQLite index. Lighter sibling of [[OpenLore - Deterministic Memory and Guardrails for Coding Agents\|OpenLore]]. |
| **headroom** | Aug 6 | ✓ | Claims about 50% lower Claude Code and Codex token costs. **Paid subscription**; only the desktop shell is MIT. Claim unverified. |
| **warp-agent-cli** | Aug 11 | ✓ | Warp's agent outside its terminal, with session persistence across SSH. |
| **amp-app** | Sep 22 | ✓ | Amp coding agent on Mac, iPhone, iPad and Android. Mobile access is the angle. |
| **lody** | Oct 3 | ✓ | Team workspace for parallel agents in isolated git worktrees, with mobile access. We found no source repo. |
| **tutti** | Oct 17 | ✓ | Multi-user, multi-agent workspace. The collaboration features sit in the Tutti VM version, not the open-source one. |
| **nodeterm** | Sep 29 | ✓ | tmux-backed terminals as nodes on a canvas, in the [[Maestri - Canvas for Agent Orchestration\|Maestri]] family. |
| **canario** | Aug 9 | ✓ | "The terminal that thinks like a browser," from the Rio terminal site. Not yet clear what that means in practice. |
| **cuadriver** | Oct 1 | ✓ | Background desktop automation from Cua. Compare with `agent-desktop`. |
| **manus-cue** | Sep 29 | ✓ | Personal agents each with their own email, phone number, wallet and computer. Striking identity model, with a large blast radius. |
| **littlebird** | Oct 4 | ✓ | Work-context capture across meetings, messages and apps. The always-on capture is the privacy question. |
| **local-studio** | Sep 25 | ✓ | Control panel for VLLM, SGLang, llama.cpp and exllamav3. Local-model operations. |
| **kubectl-radar** | Sep 23 | ✓ | Open-source Kubernetes UI with a built-in MCP server. MCP as a default feature of ops tools. |
| **evnx** | Aug 11 | ✓ | `.env` validation and secret scanning. Relevant after our May 2026 env loss, but small at 45 stars. |
| **dep-scan** | Oct 18 | ✓ | OWASP dependency and container risk audit. |
| **licensee** | Oct 2 | ✓ | Detects a project's license from its files. Long-established; useful for checking "open source" claims like Biscotti's. |
| **gitea-importer** | Oct 24 | ✓ | Moves repos from GitHub and GitLab into Gitea. Own-your-repos angle. |
| **oxvg** | Aug 9 | ✓ | Fast Rust SVG toolchain, relevant to our Astro sites' assets. |
| **deja** | Oct 1 | ✓ | Predictive zsh suggestions. |
| **lazy-tmux** | Aug 10 | ✓ | Saves tmux sessions and restores them lazily. Useful for long agent sessions. |
| **textus** | Oct 19 | ✓ | Markdown editor with AI writing tools, MIT. |
| **tine** | Oct 14 | ✓ | Outliner for Markdown and Org notes, AGPL. Plain-text angle. |
| **markpad** | Sep 28 | ✓ | Markdown viewer and editor, [[MacMD Viewer - Markdown with QuickLook and Mermaid\|MacMD]] family. |
| **mdhero** | Sep 27 | ✓ | Small native Markdown viewer, same family. |
| **capso** | Oct 14 | ✓ | Open CleanShot X alternative; check its license, which GitHub doesn't recognize. |
| **zeal** | Oct 18 | ✓ | Offline documentation browser. An old project, newly in the cask list. |
| **ruffle** | Oct 1 | ✓ | Flash emulator. Preservation spirit, not news. |
| **activitywatch@experimental** | Sep 23 | ✓ | Open-source time tracker, [[Chronoid - Automatic Time Tracker for macOS\|Chronoid]] comparison. |
| **solidtime** | Oct 5 | ✓ | Open-source time tracker, AGPL. |
| **plane** | Sep 26 | ✓ | Open project-management desktop client; compare with `kata`. |
| **mailtrap-local** | Sep 6 | ✓ | Local email sandbox for testing outbound mail. |
| **portkiller** | Oct 17 | ✓ | Port monitor and killer. Handy with many dev servers running. |

**Craft suite members:** `photocraft`, `filmcraft`, `lightcraft`, `vectorcraft`, `figcraft`, `artcraft-launcher`, `pdfcraft-cli`, `filmcraft-cli`, `lightcraft-cli`, `vectorcraft-cli`, `wordcraft-cli`, `designcraft-cli`.

**Passes (—):**

- **Avoid for now:** `mcplinker`. The cask's homepage and download URL both point at a GitHub repo that returns 404 to the API. Worth explaining before anyone installs it.
- Generic dev or ops tooling, no hook: `fluxcd`, `nats`, `systemd-lsp`, `vi-sql`, `pg_activity`, `all-smi`, `chisel-ubuntu`, `ctcache`, `ddns-updater`, `mariadb@12.3`, `tfswitch`, `zig@0.16`, `pypy3.12`, `azure-cli`, `sentry-cli`, `buildkite`, `gitea-cli`, `erpc`, `icu4c@79`, `spidermonkey@140`, `openssh-sk-provider`, `xfr`, `vercel`, `arcane-cli`, `bqlog`, `tpcgen-cli`, `tcltls`, `dnswire`, `tinyframe`, `libgovirt`, `typdiff`, `apkid`, `morphe`, `ascelerate`, `caskhub`, `hagimimonitordirect`, `pulse`, `status-trio`, `vortix`, `wavemon`, `hidapitester`, `cleeen`, `hotkeyclash`, `opendisplay-receiver`.
- Science and specialist: `modflow6`, `plink1`, `baysor`, `goleft`, `regenie`, `rustqc`, `sac`, `sdrmm`, `sdrmm-app`, `sniffles`, `vcfexpress`, `annotsv`, `cellpose`, `slivar`, `napari`, `unixcw`, `openkermit`, `planetiler`, `rew`, `vernier-instrumental-analysis`, `threat-dragon`.
- Consumer or macOS tweaks: `space-rabbit`, `volumehud`, `keyecho`, `crest`, `switchbar`, `petal`, `swiftcord`, `fluxer`, `wheelwizard`, `sandisk`, `jpki`, `stashcat`, `notomo`, `receipts-space`, `argo-books`, `textream`.
- Creative apps, no agent angle: `robbietilton-compositor`, `ssl-download-manager`, `auto-tune-central`, `fl-studio`, `picsart-ai-playground`.
- Closed AI or workspace products with no clear hook: `ideashell`, `ideashell-cn`, `buildin`, `holst`, `superhuman-docs`, `taperlabs-shadow`, `worldmonitor`.
- Fonts: font-jetendard, font-nexon-bazzi, font-aptos, font-pennstander, font-xmind, font-lexica-ultralegible, font-firjar, font-libron, font-redaction (and its six weight variants).

## Sweep — 2026-08-02

| Package | What it is | Fit | Angle for us / why |
|---|---|:---:|---|
| [[LibreFang - A Community Fork of the OpenFang Agent OS\|**librefang**]] | Self-hostable operating system for autonomous AI agents | ⭐ | Agent-OS you host yourself — the "own the substrate your agents run on" play. Squarely our infra thesis. |
| [[Otty - A Native Terminal Tuned for Code Agents\|**otty**]] | Terminal emulator built for code agents | ⭐ | Terminal-as-agent-workspace, same fight as [[Homebrew Roundup - 2026-06-21\|supaterm]] and [[herdr - Agent Multiplexer That Lives in Your Terminal\|herdr]]. |
| [[OpenLore - Deterministic Memory and Guardrails for Coding Agents\|**openlore**]] | Persistent architectural memory and structural cognition for AI coding agents | ⭐ | Agent memory layer — direct kin to our [[chroma-local\|local corpus]] and the memory-layers-for-agents line. |
| [[BAML - From Prompt Language to a Programming Language for Agents\|**baml**]] | Programming language for agents | ⭐ | A language purpose-built for agents; category-defining if it holds up. |
| [[mcpsnoop - Wireshark for MCP\|**mcpsnoop**]] | Transparent proxy and TUI for debugging MCP traffic | ⭐ | We debug MCP servers constantly — a Wireshark-for-MCP is immediately useful and on-thesis. |
| [[OpenWhispr - Open-Source Dictation with Local or Cloud Models\|**openwhispr**]] | Privacy-first voice-to-text dictation with AI agents | ⭐ | Dictation and meeting notes that can run fully local, same line as [[Homebrew Roundup - 2026-06-21\|typewhisper]]. Also offers cloud models and sync, so local-only is a setting. |
| [[ArcBox - An Open-Source Runtime for Containers, VMs and Agent Sandboxes\|**arcbox**]] | Runtime for containers, Linux VMs, and AI agent sandboxes | ⭐ | Agent sandboxing runtime — pairs with the containerization thread ([[Homebrew Roundup - 2026-06-21\|socktainer]]). |
| [[Smithery CLI - Acquired by Arcade, Shut Down Three Months Later\|**smithery-cli**]] | Install and list MCP servers from Smithery | — | **Superseded:** Smithery says the CLI stopped working on 2026-10-31 after the Arcade acquisition. Promoted as a shutdown story, not a recommendation. |
| [[APM - Microsoft's Dependency Manager for Agent Configuration\|**apm**]] | Dependency manager for AI agent configuration | ⭐ | Agent config as a managed dependency graph — infra maturity signal. |
| [[Soar - A Package Manager for Portable Linux Formats\|**soar**]] | Fast, modern package manager for Static Binaries, Portable Formats and more | ⭐ | "Portable formats" is literally our language. **Linux-only** on Homebrew, so it applies only to our Linux machines. |
| [[Libation - Keep the Audible Books You Bought\|**libation**]] | Audible audiobook manager and liberator | ⭐ | DRM liberation / own-your-library — same preservation spirit as [[Homebrew Roundup - 2026-06-21\|tubeup]] and msgvault. |
| **clarify** | Autonomous CRM | ✓ | Autonomous-CRM angle relevant to our [[twenty-interface\|Twenty]] work; worth a line. |
| **raycast-glaze** | Create desktop apps by chatting with AI | ✓ | Agentic app-gen; incumbent-workflow-from-inside pattern. |
| **cate** | Infinite zoomable canvas with editor, terminal, and browser panels | ✓ | Canvas-workspace, like [[Maestri - Canvas for Agent Orchestration\|Maestri]] / tldraw. |
| **claude-status-bar** | Menu bar status indicator for Claude Code | ✓ | Claude Code ecosystem utility — we live in Claude Code. |
| **onit-sidekick** | AI chat panel | ✓ | System-wide AI panel; local-first candidate, needs a look. |
| **podcast-dl** | CLI for downloading and archiving podcasts | ✓ | Preservation utility, tubeup family. |
| **snippety** | Snippet manager & text expander | ✓ | Part of the local text-input stack (cotypist/typewhisper). |
| **tight-studio** | Screen recorder and video editor | ✓ | Palmier-pro adjacent, though no AI angle stated. |
| **deepline** | CLI for Deepline data enrichment and durable plays | ✓ | Data enrichment CLI; "durable plays" wording intriguing, verify. |
| **neon-vision-editor** | Native code and text editor | ✓ | Native editor; low differentiation until we see the hook. |
| **tpack** | Drop-in replacement for tmux-plugin-manager (tpm) with a TUI | ✓ | Terminal QoL; minor but on-terrain. |
| **annotate** | Keyboard-driven screen annotation tool | ✓ | Presentify/[[KeyScreen - Show Key Presses on Screen\|KeyScreen]] family; niche macOS utility. |
| **keeperdb** | Database management tool for Postgres, MySQL, SQLite, MSSQL, Oracle, Redshift | — | Generic DB GUI; crowded category, no thesis hook. |
| **flite** | Small fast and portable speech synthesis system | — | Portable TTS, but a classic lib, not news. |
| **oh-my-reddit** | Beautiful Reddit threads, live in your terminal | — | Terminal-fun; off-thesis. |
| **bettercmdtab@beta** | Replacement for the built-in Cmd+Tab app switcher | — | Cmd+Tab utility, like sxitch; niche, pass. |
| **spacejump** | Menu bar utility to name and switch desktop Spaces | — | macOS Spaces QoL; off-thesis. |
| **droast** | Opinionated Dockerfile linter | — | Narrow devtool; no hook. |
| **webfont** | Generator of fonts from SVG icons (TTF encoding, WOFF/WOFF2 decoding) | — | Asset tooling; off-thesis. |
| **platinum-notes** | Improve audio quality of music files | — | Audio mastering; off-thesis. |
| **auth0** | Build, manage and test your Auth0 integrations from the command-line | — | Vendor CLI; off-thesis. |
| **openturns** | Probabilistic modelling and uncertainty quantification library | — | Scientific lib; off-thesis. |
| **pypy3.11** | Implementation of Python 3 in Python | — | Runtime update; not news. |

## Promote queue

**Cleared, from the 2026-11-03 sweeps.** All ⭐ packages from the three pastes now have entries, linked from those tables. `zentty` and `waku` are in the agent supervisors post.

**Cleared, from the 2026-08-02 sweep.** All 11 ⭐ packages now have their own entries, each dated to its Homebrew landing or, for Smithery, to its shutdown. They're linked from that sweep's table. They cluster into two themes:

- **Agent substrate & MCP plumbing:** `librefang`, `otty`, `arcbox`, `apm`, `smithery-cli`, `mcpsnoop`, `baml`, `openlore`.
- **Local-first & liberation:** `openwhispr`, `libation`, `soar`.
