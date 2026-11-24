---
date_created: 2026-11-23
date_modified: 2026-11-24
title: Up And Running With Context.dev
at_semantic_version: 0.0.1.0
slug: up-and-running-with-context-dev
publish: true
authors:
  - Michael Staton
tags:
  - Data-Augmenters
  - API-Services
  - AI-Readiness
  - Secrets-Management
  - Agentic-Workflows
site_uuid: eb3ecae9-1e17-430c-afb3-d4e44a638bcb
---

# Why we needed it

We were about to build an investor list for a client: a few dozen influential people, each needing a current title, company, location, and the public profiles that prove who they are. Doing that by hand means an afternoon of tabs. Asking an AI agent to do it from memory gets you confident, stale answers.

[[Tooling/AI-Toolkit/Data Augmenters/Context.dev|Context.dev]] closes that gap. You give it a LinkedIn or GitHub URL, and it returns a structured record of the person: name, bio, location, current role, work history, and their other public profiles. It also scrapes and crawls web pages, but people enrichment was the piece we needed.

This piece covers the first hour: getting a key, keeping it safe, making the first call, and handing the capability to an AI agent without handing over the key. It's written for someone who isn't a developer but wants their tools to work well with agents.

# The one confusing thing: there are no "normal" docs

Most APIs give you a reference page that lists endpoints and parameters. Context.dev mostly gives you **ready-to-copy code snippets** (curl, Python, TypeScript) on its dashboard, and those snippets **already contain your real API key**.

That's a convenience, and it's also how keys leak. The natural move is to paste the snippet into a notes file, a config file, or a chat with your agent. Each of those copies the secret somewhere it shouldn't live. That's what happened to us: the key ended up pasted into a settings file and into two example scripts in a project folder that was one `git add` away from being published.

The fix is to read the snippet for its **shape** and throw away the key. Here is the shape of the people-enrichment call with the key taken out:

```shell
curl -X POST "https://api.context.dev/v1/people/enrich" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY_GOES_HERE" \
  -d '{ "social_urls": ["https://linkedin.com/in/someone"] }'
```

Three things to notice:

- **One endpoint:** `POST https://api.context.dev/v1/people/enrich`.
- **One secret.** The `Authorization: Bearer …` header is simply how the API key is sent. It isn't a second credential. (We briefly thought it was, and recorded the same key twice under two names.)
- **One input:** a list of social profile URLs, so you can enrich several people in one request.

# Step 1: Put the key in one private place

Create your key in the Context.dev dashboard. Keys start with `ctxt_secret_`. Then put it in **exactly one** place on your computer that only you can read, and nowhere else.

On a Mac or Linux machine, a plain file in your home folder works well:

```shell
# Create the file if it doesn't exist, and make it readable only by you
touch ~/.secrets && chmod 600 ~/.secrets

# Add one line (paste your real key in place of the placeholder)
echo 'CONTEXT_DEV_API_KEY=ctxt_secret_xxxxxxxxxxxxxxxx' >> ~/.secrets
```

`chmod 600` means only your user account can open the file. Keep all your API keys here (OpenAI, Anthropic, search tools, and so on) so there's one place to check, rotate, and back up.

A password manager such as 1Password or Bitwarden is a fine alternative and is better on a shared machine. What matters is that the key lives in **one** place and everything else **refers** to it.

# Step 2: Make your scripts read the key, not contain it

Every script or snippet should look the key up when it runs. In each language this is a one-line change from what the dashboard gives you.

**Shell (curl).** We keep this as a small script called `enrich-people.sh`:

```shell
#!/usr/bin/env bash
set -euo pipefail
# Load keys from ~/.secrets if they aren't already in the environment
[ -z "${CONTEXT_DEV_API_KEY:-}" ] && { set -a; source "$HOME/.secrets"; set +a; }

body=$(printf '%s\n' "$@" | jq -R . | jq -sc '{social_urls: .}')
curl -sS -X POST "https://api.context.dev/v1/people/enrich" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${CONTEXT_DEV_API_KEY}" \
  -d "$body"
```

Run it with one or more profile URLs:

```shell
./enrich-people.sh https://linkedin.com/in/someone https://github.com/someone-else
```

**Python** (`pip install context.dev`):

```python
import os
from context.dev import ContextDev

client = ContextDev(api_key=os.environ["CONTEXT_DEV_API_KEY"])
print(client.people.enrich(social_urls=["https://linkedin.com/in/someone"]))
```

**TypeScript** (`pnpm add context.dev`):

```typescript
import { ContextDev } from 'context.dev';

const client = new ContextDev({ apiKey: process.env.CONTEXT_DEV_API_KEY });
const person = await client.people.enrich({ social_urls: ['https://linkedin.com/in/someone'] });
console.log(person);
```

Each of these is now safe to save in a project, share with a colleague, or publish, because none of them contains the secret.

# Step 3: The first call

Our test used a well-known developer's public LinkedIn profile. The response came back in about a second, trimmed here:

```json
{
  "match": {
    "status": "candidate",
    "score": 100,
    "person": {
      "name": { "full": "…", "first": "…", "last": "…" },
      "bio": "…",
      "location": { "city": "San Francisco", "region": "California", "country": "United States" },
      "social_urls": ["https://www.linkedin.com/in/…", "http://github.com/…"],
      "website_urls": ["https://…"],
      "current_role": {
        "title": "…",
        "organization": { "name": "…", "domain": "…" },
        "start_date": { "year": 2022, "month": 4 },
        "is_current": true
      },
      "experience": [ … ]
    }
  }
}
```

Two fields matter most when you decide whether to trust a result:

- **`score`** (0–100) is how confident Context.dev is that it found the right person. Treat anything well below 100 as a lead to check, not a fact.
- **`status: "candidate"`** is a reminder that this is a proposed match. For anything that goes in front of a client or investor, have a person confirm it.

Each call **spends paid credits**, so test with one or two people before running a list of hundreds.

# Step 4: Let your agent use it without giving it the key

This is the "agent-friendly" part, and it's where most people slip up.

**Don't paste the key into a chat with an AI agent.** Anything in the conversation can end up in logs, transcripts, or a search index of past sessions. Our own setup saves agent sessions into a searchable archive. When our agent opened the file holding the pasted key, the key was printed into the session, and from there into the archive. So the right move was to rotate the key (see "If a key does leak" below).

Instead:

1. **Give the agent the script, not the secret.** An agent that can run commands can run `./enrich-people.sh <url>`. The script loads the key itself, so the agent never sees it.
2. **Tell the agent where things live.** A short note in the project's instructions file (`CLAUDE.md`, `AGENTS.md`, or whatever your agent reads) is enough. For example: *"People enrichment: run `core/context-dev/requests/enrich-people/enrich-people.sh <profile urls>`. The key is in `~/.secrets` as `CONTEXT_DEV_API_KEY`. Never print it."*
3. **List the secret's name without its value.** We keep a manifest of each secret a project needs, with a description and where the value lives, but never the value itself. An agent (or a new colleague) can then see that a Context.dev key is required and where to find it, without ever seeing the key.
4. **If an agent is going to read your files, ask it to hide keys first.** Ours now reads config files through a filter that replaces anything shaped like a key with `<REDACTED>` before showing it.

# If a key does leak

It happens. The cleanup is quick:

1. **Create a new key** in the Context.dev dashboard and **revoke the old one**.
2. **Update the one place it lives** (`~/.secrets` or your password manager).
3. **Update anywhere it's deployed.** If a server or hosted tool uses the key, update its secret too. Ours is a Cloudflare Worker, updated with `wrangler secret put CONTEXT_DEV_API_KEY`.
4. **Search your files for the old key** so you find any copies you've forgotten about:
   ```shell
   grep -rl 'ctxt_secret_' ~/your-projects-folder
   ```

Because every script reads the key from one place, rotating it takes a couple of minutes instead of a hunt through every project.

# What you end up with

- One API key, stored in one private file.
- Small scripts in Shell, [[Tooling/Software Development/Programming Languages/Python|Python]], and TypeScript that enrich people by profile URL and are safe to share.
- An agent that can enrich a list of people on request without ever handling the credential.
- A rotation routine that takes minutes.

Next up for us is running this across that investor list and loading the results into our CRM.
