---
date_created: 2025-07-22
date_modified: 2025-09-19
title: Up and Running with TwentyCRM on Railway
at_semantic_version: 0.0.0.7
slug: up-and-running-with-twentycrm-on-railway
publish: true
authors:
  - Michael Staton
tags: [Code-Generators, Terminal-Applications]
site_uuid: c4231b39-3c70-2e05-e20e-266e91df62f2
og_favicon: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/trademarks/appIcon__Twenty.svg?updatedAt=1758371575358
---


```bash
npm install -g @railway/cli 
railway login
railway --help
railway init
# Name your project, railway usually uses snake-case two word combos.
# I chose twenty-water
railway list
```

Created project twenty-water on Michael Staton's Projects
https://railway.com/project/6369f61e-4a28-4a20-a36e-b1cbfccf70a5

```bash
railway add --database postgres 
railway add --database redis
railway open
```
# Fork the TwentyCRM repository
This is obviously our example:
```bash
origin  https://github.com/lossless-group/twenty-crm.git (fetch)
origin  https://github.com/lossless-group/twenty-crm.git (push)
upstream https://github.com/twentyhq/twenty.git (fetch)
upstream  https://github.com/twentyhq/twenty.git (push)
```

# Setup Remote Databases as Environment Variables
Copy the `REDIS_PUBLIC_URL` and the `REDIS_URL` AS `REDIS_RAILWAY_URL` value from the `railway variables` output.
```bash
railway service Redis
railway variables
```

Copy the `POSTGRES_PUBLIC_URL` and the `POSTGRES_URL` AS `POSTGRES_URL` value from the `railway variables` output.

```bash
railway service Postgres
railway variables
```

```bash
railway variables --set "FILE_TOKEN_SECRET=$(openssl rand -base64 32)"
railway variables --set "ACCESS_TOKEN_SECRET=$(openssl rand -base64 32)"
railway variables --set "REFRESH_TOKEN_SECRET=$(openssl rand -base64 32)"
railway variables --set "LOGIN_TOKEN_SECRET=$(openssl rand -base64 32)"
railway variables --set "EMAIL_FROM_ADDRESS=noreply@twenty-production-3674.up.railway.app"
railway variables --set "EMAIL_FROM_NAME=Twenty CRM"
railway variables --set "SIGN_IN_PREFILLED=true"
```

# Enabling SSO swith Google Workspace
1. Go to your Workspace account settings and enable SSO for your domain.
2. Go to the Google Cloud dashboard for your Workspace (you have this even if you've never used it.)
3. Turn on the People API, the Calendar API, and the Gmail API
4. Generate an App ID and App Secret for a project or app.  
6. Add the App ID and App Secret to the Configuration Variables in the Twenty instance Settings > Admin > Configuration options.
