---
title: 'Maintain an Environment-based Build System'
lede: 'Build across environments, including different deployments, using environment variables and configuration files.'
date_authored_initial_draft: 2025-05-25
date_authored_current_draft: 2025-05-25
date_authored_final_draft: null
date_first_published: null
date_last_updated: 2025-05-25
date_first_run: 2025-05-25
date_last_run: 2025-05-25
at_semantic_version: 0.0.0.1
status: Implemented
augmented_with: 'Windsurf Cascade on SWE-1'
user_name: 'Michael Staton'
category: Prompts
date_created: 2025-05-25
date_modified: 2025-05-25
image_prompt: 'A factory is the centerpiece of the image. From the left, a train approaches the factory to unload the cars, which has code files popping out of the train cars. The factory has cranes that are unloading the code files. The factory is then pushing out beautiful web pages to the right.  The left part of the image seems a little polluted, while the right side is beautiful.'
portrait_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/reminders/2025-05-25_portrait_image_Maintain-an-Environment-based-Build-System_fd550553-5ab0-4c56-b8cb-45ac3a8705b5_0j44Q1oFa.webp
site_uuid: a79064dc-eaf0-4e94-8085-175ea9e4e765
tags:
  - Build-Systems
  - Configuration
authors:
  - Michael Staton
banner_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/reminders/2025-05-25_banner_image_Maintain-an-Environment-based-Build-System_5cf0d6a9-2ee4-469a-a3a3-fe5745d4b2d8_Qg5urXFe-.webp
---

## TLDR
Given we have different teams with different areas of concern, and we have different deployment services that need different setup configurations, we should maintain an environment-based build system.

# Context

The Lossless monorepo is a complex system with multiple teams and deployment services. 

For convenience, the development team is primarily concerned with the Website and related code, so the content directory is imported as a git submodule in the directory `src/generated-content`. It points to the same remote repository as the monorepo content directory, but is at a different path. 

The content team creates and iterates on Markdown files in the [lossless-content](https://github.com/lossless-content) repository. 

The management team has to bring it all together, so they work from the lossless-monorepo as a root directory, which then, as git submodules, imports the content from the lossless-content repository and the website code from the lossless-site repository.

Getting Astro and Vite to work with this setup is a bit of a challenge, but it is doable. It also requires that once it's working, we should maintain it and not break it. 

## Solution

We should maintain an environment-based build system. 

### Environment-based Build System

Files:
From the monorepo root:
`content`
`site`

`site/.env`
`site/.env.example`
`site/src/utils/envUtils.js`
`site/src/content.config.ts`
`site/astro.config.mjs`
`package.json`

#### Environment Variables:

`site/.env`
```text
# Set node environment, default to development
# APP_ENV is a fallback in case vite overrides with its default to production
NODE_ENV=development
APP_ENV=development

# DEPLOY_ENV is used to determine the content location. 
# LocalSiteOnly, LocalMonorepo, Vercel, and Railway are options.
DEPLOY_ENV=LocalSiteOnly
```

#### Determine the Environment Variables with envUtils.js

`site/src/utils/envUtils.js`
```js
// src/utils/env.js
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Load .env file first, before anything else
const envPath = path.resolve(process.cwd(), '.env');
const envFileExists = fs.existsSync(envPath);

// Initialize with current env vars
const envVars = { ...process.env };

// Load .env file if it exists
if (envFileExists) {
  const envConfig = dotenv.parse(fs.readFileSync(envPath));
  Object.assign(envVars, envConfig);
}

// Set NODE_ENV if not already set
envVars.NODE_ENV = envVars.NODE_ENV || 'development';

// Set APP_ENV to match NODE_ENV if not explicitly set
envVars.APP_ENV = envVars.APP_ENV || envVars.NODE_ENV;

// Update process.env with our final values
Object.assign(process.env, envVars);

// Export environment variables
export const NODE_ENV = process.env.NODE_ENV;
export const APP_ENV = process.env.APP_ENV;
export const isProduction = NODE_ENV === 'production';
export const isDevelopment = !isProduction;

// Log environment info
console.log('Environment Configuration:', {
  NODE_ENV,
  APP_ENV,
  isProduction,
  isDevelopment,
  envFile: envFileExists ? envPath : 'Not found',
  cwd: process.cwd()
});
```

#### Content Path Resolution in content.config.ts

The content configuration uses the environment variables to determine the correct content paths:

```typescript
// site/src/content.config.ts
import { NODE_ENV, isProduction, isDevelopment } from './utils/envUtils.js';
import path from 'path';
import fs from 'fs';

// Determine content path based on environment
let contentBasePath: string;

switch (process.env.DEPLOY_ENV) {
  case 'LocalSiteOnly':
    contentBasePath = path.resolve(process.cwd(), 'src/generated-content');
    break;
  case 'LocalMonorepo':
    contentBasePath = path.resolve(process.cwd(), '..', 'content');
    break;
  case 'Vercel':
    contentBasePath = path.resolve(process.cwd(), 'src/generated-content');
    break;
  case 'Railway':
    contentBasePath = '/app/content';
    break;
  default:
    contentBasePath = path.resolve(process.cwd(), '/lossless-monorepo/content');
}

// Log the configuration
console.log('Content configuration:', {
  isProduction,
  contentBasePath,
  cwd: process.cwd(),
  resolvedPath: path.resolve(contentBasePath)
});

// Verify the content directory exists
if (!fs.existsSync(contentBasePath)) {
  console.warn(`WARNING: Content directory not found at ${contentBasePath}`);
}

export default defineCollection({
  // Your collection configuration
});
```

#### Build Script in package.json

The build script in `package.json` is modified to properly load environment variables:

```json
{
  "scripts": {
    "build": "node -e \"require('dotenv').config({ path: '.env' }); require('child_process').execSync('astro build', { stdio: 'inherit' });\""
  }
}
```

## Deployment Configuration

### Vercel
1. Set environment variables in Vercel dashboard:
   - `NODE_ENV=production`
   - `APP_ENV=production`
   - `DEPLOY_ENV=Vercel`

### Railway
1. Set environment variables in Railway dashboard:
   - `NODE_ENV=production`
   - `APP_ENV=production`
   - `DEPLOY_ENV=Railway`

## Maintenance Guidelines

1. **Environment Variables**:
   - Always update both `.env` and `.env.example` files
   - Document new variables in this document
   - Never commit sensitive data to version control

2. **Adding New Environments**:
   1. Add a new case in `content.config.ts` for the new environment
   2. Update the `DEPLOY_ENV` documentation
   3. Test the build locally with the new environment

3. **Debugging**:
   - Check the environment logs at the start of the build
   - Verify content paths are resolved correctly
   - Ensure the content directory exists at the expected location

## Common Issues and Solutions

1. **Content Not Found**:
   - Check `DEPLOY_ENV` is set correctly
   - Verify the content directory exists at the expected path
   - Check file permissions

2. **Environment Variables Not Loading**:
   - Ensure `.env` file exists in the `site` directory
   - Verify the build script is loading the `.env` file
   - Check for typos in variable names

3. **Build Fails in CI/CD**:
   - Ensure all required environment variables are set in the CI/CD pipeline
   - Check the build logs for specific error messages
   - Verify the content submodule is initialized in CI

## Testing the Setup

To test the environment setup locally:

```bash
# Test LocalSiteOnly
DEPLOY_ENV=LocalSiteOnly pnpm build

# Test LocalMonorepo
DEPLOY_ENV=LocalMonorepo pnpm build
```
