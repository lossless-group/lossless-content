---
date_created: 2026-04-22
date_modified: 2026-07-08
title: "Up And Running with Hermes Agent"
at_semantic_version: 0.0.0.1
slug: up-and-running-w-hermes-agent
publish: true
authors:
  - Michael Staton
tags: [Agent-Harnesses]
og_favicon: "https://ik.imagekit.io/xvpgfijuw/lossless-content-embeds/appIcon__GSAP.png?updatedAt=1757077570286"
site_uuid: 8c8ba811-5036-4a1c-97bb-a3533ae4e57f
---
Setting up [Hermes Agent](https://hermes-agent.nousresearch.com/) for multiple users and teams depends on whether you want a shared workspace (a single agent assisting a team via a messaging app) or a multi-agent system (specialized agents routing tasks amongst themselves). [^77cvca] [^0wm01r] 

## Option 1: Set Up a Shared Team Assistant (Messaging App)
To allow multiple people to interact with a single agent, connect Hermes to a messaging platform with access control. [^77cvca] 

   1. Choose your platform: [Telegram](https://hermes-agent.nousresearch.com/docs/guides/team-telegram-assistant) is the easiest for groups, though Microsoft Teams is better for enterprise. [^77cvca] [^f078av] [^5qabl6] 
   2. Configure the gateway: Run the command hermes gateway setup and follow the prompts to link your API bot (e.g., using a BotFather token for Telegram or a webhook for Teams). [^f078av] [^5qabl6] 
   3. Set user permissions: In the environment variables or the .env file, specify the authorized user IDs or group IDs. This prevents unauthorized access to the bot. [^77cvca] [^f078av] 

## Option 2: Set Up Multiple Specialized Agents (Multi-Agent Fleet)
To create different AI agents that serve different teams (e.g., a coding agent for engineering, a research agent for marketing), use Hermes' profile management. [^0wm01r] [^0zlboh] 

   1. Clone profiles: Use the --clone flag to create unique profiles for each specialist, ensuring each has its own memory and configuration.
   
   hermes profile create marketing-agent --clone
   hermes profile create engineering-agent --clone
   
   2. Assign specific models & skills: Customize the config.yaml and SOUL.md file for each profile to give them specialized roles.
   3. Run concurrent gateways: If multiple agents need to be online simultaneously (e.g., one agent per family member or one per Slack channel), start different profiles on isolated gateways using hermes profile install and configure independent messaging connections for each. [^5qabl6] [^0zlboh] [^hsed5i] [^7fdbvs] [^n3tsai] 

## Option 3: Coordinate a Multi-Agent Team (Collaboration & Routing)
To build a true collaborative workflow where an orchestrator assigns work to worker agents:

   1. Use the Kanban board: Hermes supports a [Kanban board](https://www.youtube.com/watch?v=KPsMThlFb8Y) UI, allowing different agent profiles to route work and collaborate on tasks.
   2. Assign roles: Set up a "team lead" agent that triage tasks, and assign subordinate agents to execute specialized skills (like research or coding). [^0wm01r] [^eitd0a] 


Yes, you start by SSHing in, but because Hostinger runs Hermes Agent inside [isolated Docker containers](https://www.hostinger.com/applications/hermes-agent), there are specific extra steps required to get full developer access. Depending on whether you want to use the command line, code remotely, or build apps on top of it, developer access is split into three methods: [^0y8ae1] [^j7du9a] 
## 1. The Core SSH CLI Access (To Modify Files & Run Commands)
When deploying through Hostinger's 1-click template, the agent is containerized. Standard SSH only gets you to the host server, not inside Hermes. [^j7du9a] [^smz2eb] 

   1. SSH into the Hostinger VPS as root:
   
   ssh root@your_vps_ip
   
   2. Locate your Hermes container directory. Hostinger appends a unique 4-character suffix to the project folder:
   
   cd /docker/hermes-agent-*
   
   3. Execute into the running Docker container to access the Hermes development environment directly:
   
   docker compose exec hermes /bin/bash
   
   [^smz2eb] [^ju7jcg] [^ymarj6] 

From here, you have full developer CLI access to tweak your SOUL.md prompt files, configure multi-agent profiles, or run manual skill-testing sessions via the hermes interactive loop. [^j7du9a] [^t810x5] [^leo88o] [^o8axv9] 

## 2. Browser Dashboard Access (The Visual Admin UI)
Hermes Agent includes a Browser-Based Admin Panel to visually track variables, execution chains, and jobs. [^0y8ae1] [^leo88o] 

* The Problem: Hostinger secures these containers behind a firewall.
* The Developer Solution: Keep ports closed to the public internet and use an SSH Tunnel to safely map the remote UI port to your local computer.

ssh -L 8080:localhost:8080 root@your_vps_ip

Once run, leave that terminal open and open http://localhost:8080 in your computer’s browser to safely manage your system. (For a permanent connection without keeping a terminal open, developers typically install Tailscale on the VPS). [^0y8ae1] [^leo88o] [^fst3e4] [^u6qtvp] 

## 3. Programmatic API Access (To Connect Your Own Apps)
If you are developing a custom frontend or wanting to trigger Hermes via your own scripts, you can utilize the built-in [Hermes API Server](https://hermes-agent.nousresearch.com/docs/user-guide/features/api-server). [^j7bypm] [^hk9t3p] 

   1. Inside the container config, define your custom secret key:

```bash
hermes config set api_server.enabled true
hermes config set api_server.key your_dev_secret_token
```
 
   
   2. You can then interact with the agent programmatically from any external development app by passing a standard Bearer authentication header:
   
   Authorization: Bearer your_dev_secret_token


***
# Sources

[^77cvca]: [https://hermes-agent.nousresearch.com](https://hermes-agent.nousresearch.com/docs/guides/team-telegram-assistant)
[^0wm01r]: [https://www.youtube.com](https://www.youtube.com/watch?v=fCDsXrpdVLc)
[^f078av]: [https://www.youtube.com](https://www.youtube.com/watch?v=1ve4Atbqmoo)
[^5qabl6]: [https://hermes-agent.nousresearch.com](https://hermes-agent.nousresearch.com/docs/user-guide/messaging/teams)
[^0zlboh]: [https://lushbinary.com](https://lushbinary.com/blog/hermes-agent-multi-agent-profiles-guide/)
[^hsed5i]: [https://x.com](https://x.com/TfTHacker/status/2043549531212525852)
[^7fdbvs]: [https://www.youtube.com](https://www.youtube.com/watch?v=-9C1vvu6HYg&t=225)
[^n3tsai]: [https://hermes-agent.nousresearch.com](https://hermes-agent.nousresearch.com/docs/user-guide/multi-profile-gateways)
[^eitd0a]: [https://www.youtube.com](https://www.youtube.com/watch?v=KPsMThlFb8Y&t=55)
[^0y8ae1]: [https://www.hostinger.com](https://www.hostinger.com/applications/hermes-agent)
[^j7du9a]: [https://www.hostinger.com](https://www.hostinger.com/support/how-to-get-started-with-hermes-agent-on-hostinger-vps/)
[^smz2eb]: [https://www.youtube.com](https://www.youtube.com/watch?v=8bYMgvJt5Ws&t=90)
[^ju7jcg]: [https://levelup.gitconnected.com](https://levelup.gitconnected.com/the-only-hermes-agent-setup-you-need-for-your-remote-machine-bc26fbe70dda)
[^ymarj6]: [https://www.reddit.com](https://www.reddit.com/r/hermesagent/comments/1tnr6th/i_see_people_setup_hermes_on_their_desktop_or/)
[^t810x5]: [https://www.hostinger.com](https://www.hostinger.com/tutorials/what-is-hermes-agent)
[^leo88o]: [https://www.hostinger.com](https://www.hostinger.com/tutorials/how-to-set-up-hermes-workspace)
[^o8axv9]: [https://hermes-agent.org](https://hermes-agent.org)
[^fst3e4]: [https://github.com](https://github.com/nesquena/hermes-webui)
[^u6qtvp]: [https://www.bluehost.com](https://www.bluehost.com/blog/hermes-agent-vps-security-guide/)
[^j7bypm]: [https://hermes-agent.nousresearch.com](https://hermes-agent.nousresearch.com/docs/user-guide/features/api-server)
[^hk9t3p]: [https://github.com](https://github.com/pewdiepie-archdaemon/odysseus/issues/55)
[^y9aslf]: [https://www.raycast.com](https://www.raycast.com/dailin4321/hermes-agent)
