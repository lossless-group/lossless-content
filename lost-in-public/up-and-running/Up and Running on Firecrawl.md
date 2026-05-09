---
date_created: 2026-05-07
date_modified: 2026-05-08
title: Up And Running On Firecrawl
at_semantic_version: 0.0.0.1
slug: up-and-running-on-firecrawl
publish: true
authors:
  - Michael Staton
tags:
  - Vector-Databases
  - Context-Engineering-Kits
  - Context-Vigilance
  - Local-LLMs
site_uuid: a9631a38-55a0-4d05-8201-345e99df62f7
---
```bash
curl -X POST 'https://api.firecrawl.dev/v2/scrape' \ -H 'Authorization: Bearer fc-77f3098a87b742ed9d584b07634ff01f' \ -H 'Content-Type: application/json' \ -d $'{ "url": "firecrawl.dev" }'
```

```python
# pip install firecrawl-py
from firecrawl import Firecrawl 

app = Firecrawl(api_key="fc-77f3098a87b742ed9d584b07634ff01f") 
# Scrape a website: 
app.scrape('firecrawl.dev')
```

## Add the Firecrawl Skill

```bash
npx -y firecrawl-cli@latest init --all -k fc-77f3098a87b742ed9d584b07634ff01f
```