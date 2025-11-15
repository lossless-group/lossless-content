---
title: "AI-Powered Link Aggregator for Product Digital Footprint Discovery"
lede: "Automatically discover and catalog social media profiles, code repositories, blog feeds, and other digital presence links for 1,400+ products in our tooling directory."
date_authored_initial_draft: 2025-11-15
date_authored_current_draft: 2025-11-15
date_authored_final_draft: "[]"
date_first_published: "[]"
date_last_updated: "[]"
at_semantic_version: 0.1.0
generated_with: "Claude Code (Claude Sonnet 4.5)"
category: Technical-Specification
date_created: 2025-11-15
date_modified: 2025-11-15
status: Proposed
tags: [Content-Automation, Link-Discovery, Digital-Footprint, Social-Media, API-Integration]
authors:
  - Michael Staton
  - Andrea Capera
image_prompt: "A digital spider web with a product logo at the center, threads extending to various platform icons (GitHub, LinkedIn, Twitter, YouTube, Medium), automatically mapping a company's complete digital presence across the internet."
banner_image: "https://ik.imagekit.io/xvpgfijuw/uploads/lossless/2025-sept/AI-Powered-Link-Aggregator-for-Product-Digital-Footprint_banner_image_1763225374644_0uYd2sUt5.webp"
portrait_image: "https://ik.imagekit.io/xvpgfijuw/uploads/lossless/2025-sept/AI-Powered-Link-Aggregator-for-Product-Digital-Footprint_portrait_image_1763225375875_mK4pOdSJc.webp"
square_image: "https://ik.imagekit.io/xvpgfijuw/uploads/lossless/2025-sept/AI-Powered-Link-Aggregator-for-Product-Digital-Footprint_square_image_1763225376735_Z9uq4LVwP.webp"
site_uuid: 7fdc18f5-e224-4359-8327-fe642c27a241
---



# AI-Powered Link Aggregator for Product Digital Footprint Discovery

## 1. Overview

### 1.1 Purpose
An automated system that takes a product URL and discovers all related digital presence links including social media profiles (LinkedIn, Twitter/X, Bluesky), code repositories (GitHub, GitLab), content platforms (YouTube, Medium, Product Hunt), and operational URLs (RSS feeds, changelogs, documentation). This tool enriches the metadata of 1,400+ products in our tooling directory and serves as a critical prerequisite for the Self-Updating Product Announcement Watcher.

### 1.2 Problem Statement
Currently, our tooling directory files have minimal structured link metadata:
- Most files only have the main product `url` in frontmatter
- Some have `github_repo_url` or `parent_org` manually added
- YouTube videos are pasted in content without structured metadata
- No systematic social media profile tracking
- No RSS feed or changelog URL discovery
- Manual link discovery is time-consuming and inconsistent
- Missing links prevent effective product monitoring and announcement tracking

### 1.3 Scope
The system will:
- Take a product URL as input (from existing `url` frontmatter field)
- Discover and verify all related digital presence links
- Add structured link metadata to tool frontmatter
- Support multiple discovery methods (web scraping, API services, search engines, LLM analysis)
- Prioritize free/low-cost discovery methods over paid services
- Process 1,400+ tools in batches
- Validate discovered links before adding to metadata
- Handle edge cases (redirects, defunct links, false positives)

### 1.4 Target Link Types
**Social Media**:
- LinkedIn (company page)
- Twitter/X (official account)
- Bluesky (official account)
- Mastodon (official account)
- Facebook (company page)
- Instagram (official account)

**Code Repositories**:
- GitHub (organization or primary repo)
- GitLab (organization or primary repo)
- Bitbucket (organization or primary repo)

**Content Platforms**:
- YouTube (official channel)
- Medium (publication or author)
- Dev.to (organization or author)
- Hashnode (publication or author)
- Product Hunt (product page)
- Hacker News discussions

**Operational URLs**:
- Blog RSS feed
- Changelog page
- Documentation site
- API documentation
- Status page
- Community forum (Discord, Discourse, Reddit)

### 1.5 Out of Scope (Phase 1)
- Deep social media analytics (follower counts, engagement metrics)
- Historical link tracking (when links changed)
- Multilingual profile discovery
- Personal social media accounts (individual founders/employees)
- Paid advertising presence
- Job board profiles

## 2. Architecture

### 2.1 System Components

```text
┌─────────────────────────────────────────────┐
│  Input: Tool File with Product URL          │
│  - Reads frontmatter: url, site_name        │
│  - Optional: parent_org, existing links     │
└─────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────┐
│  Link Discovery Services (Parallel)         │
│  1. Website Scraper (social icons/links)    │
│  2. Search Engine Queries (Google, DDG)     │
│  3. Common URL Pattern Tester               │
│  4. Jina Reader (deep content extraction)   │
│  5. LLM Analysis (structured data extract)  │
│  6. Optional: Clearbit/FullContact APIs     │
└─────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────┐
│  Link Validator & Scorer                    │
│  - HTTP status check (200 OK)               │
│  - Confidence scoring per link              │
│  - False positive filtering                 │
└─────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────┐
│  Link Categorizer & Normalizer              │
│  - Classify link type (GitHub, LinkedIn)    │
│  - Normalize URLs (canonical forms)         │
│  - Extract key identifiers (usernames)      │
└─────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────┐
│  Metadata Writer                            │
│  - Updates tool frontmatter                 │
│  - Preserves existing manual links          │
│  - Adds confidence scores                   │
│  - Triggers Filesystem Observer             │
└─────────────────────────────────────────────┘
```

### 2.2 Discovery Strategy (Waterfall Approach)

**Stage 1: Fast & Free Methods** (Run First)
1. Scrape product homepage for social media icons/footer links
2. Test common URL patterns (e.g., `/blog/rss.xml`, `/changelog`)
3. Check if GitHub repo exists at predictable URLs

**Stage 2: Search-Based Discovery** (If Stage 1 incomplete)
4. Google/DuckDuckGo searches for `"product-name" site:linkedin.com`
5. GitHub search for repository by product name
6. YouTube search for official channel

**Stage 3: Deep Analysis** (If Stage 2 incomplete)
7. Jina Reader extraction of all links from homepage
8. LLM analysis of page content to identify likely social profiles
9. Recursive crawl of `/about`, `/contact`, `/team` pages

**Stage 4: Paid Services** (Optional, if configured)
10. Clearbit Company API (enrichment data)
11. FullContact Company Enrichment
12. Hunter.io (find email patterns, social links)

### 2.3 Deployment Model

**Option A: Standalone Script** (Recommended for Phase 1)
- Run as one-off batch processing script
- Process all 1,400+ tools in batches of 50-100
- Store results in temporary JSON, then bulk-update frontmatter
- Manually review high-confidence vs low-confidence results

**Option B: Integrated Service**
- Add to `tidyverse/observers/` as `linkAggregator`
- Run on-demand when new tools added
- Automatic frontmatter updates via Filesystem Observer

**Recommendation**: Start with Option A for initial population, migrate to Option B for ongoing maintenance.

## 3. Technical Requirements

### 3.1 Input Format

The script processes tool files with existing frontmatter:

```yaml
# tooling/AI-Toolkit/Generative AI/Code Generators/Trae AI.md
---
url: https://www.trae.ai/
site_name: Trae
parent_org: "[[organizations/ByteDance|ByteDance]]"
# ... other existing fields
---
```

### 3.2 Output Format (Enhanced Frontmatter)

```yaml
---
url: https://www.trae.ai/
site_name: Trae
parent_org: "[[organizations/ByteDance|ByteDance]]"

# Social Media
linkedin_url: https://www.linkedin.com/company/trae-ai/
twitter_url: https://twitter.com/traeai
bluesky_url: https://bsky.app/profile/trae.ai
youtube_channel_url: https://www.youtube.com/@traeai

# Code Repositories
github_org_url: https://github.com/traehq
github_repo_url: https://github.com/traehq/trae

# Content & Community
medium_url: https://medium.com/@traeai
product_hunt_url: https://www.producthunt.com/products/trae
discord_url: https://discord.gg/traeai

# Operational URLs
blog_url: https://www.trae.ai/blog
blog_rss_url: https://www.trae.ai/blog/rss.xml
changelog_url: https://www.trae.ai/changelog
docs_url: https://docs.trae.ai
status_page_url: https://status.trae.ai

# Metadata
links_last_updated: 2025-11-15
links_auto_discovered: true
links_confidence: high  # high | medium | low
links_manually_verified: false

# ... other existing fields
---
```

### 3.3 Discovery Methods

#### 3.3.1 Website Scraper (Social Icons)

**Technology**: Playwright or Cheerio
**Success Rate**: ~60-70% (most sites have footer social links)

**Implementation**:
```javascript
async function scrapeSocialLinks(url) {
  const page = await browser.newPage();
  await page.goto(url);

  // Common selectors for social links
  const socialSelectors = [
    'a[href*="linkedin.com/company"]',
    'a[href*="twitter.com"]',
    'a[href*="x.com"]',
    'a[href*="github.com"]',
    'a[href*="youtube.com/channel"]',
    'a[href*="youtube.com/@"]',
    'a[href*="medium.com/@"]',
    'a[href*="producthunt.com/products"]',
    // ... more selectors
  ];

  const links = await page.$$eval(
    socialSelectors.join(', '),
    anchors => anchors.map(a => a.href)
  );

  return links;
}
```

**Common Locations**:
- Footer (`footer`, `.footer`, `#footer`)
- Header/navigation (`header`, `.nav`, `#nav`)
- About page (`/about`, `/about-us`, `/company`)
- Contact page (`/contact`, `/contact-us`)

#### 3.3.2 Search Engine Queries

**Technology**: SerpAPI (free tier: 100 searches/month) or SearXNG (self-hosted)

**Queries**:
```
"Trae AI" site:linkedin.com/company
"Trae AI" site:github.com
"Trae AI" site:twitter.com OR site:x.com
"Trae AI" site:youtube.com
"Trae AI" site:medium.com
"Trae AI" site:producthunt.com/products
```

**Success Rate**: ~50-60% for well-known products

#### 3.3.3 Common URL Pattern Testing

**Technology**: Simple HTTP HEAD requests
**Success Rate**: ~30-40% for standard patterns

**Patterns to Test**:
```javascript
const commonPatterns = {
  rss: [
    '/rss.xml',
    '/feed',
    '/feed.xml',
    '/blog/rss.xml',
    '/blog/feed',
    '/atom.xml'
  ],
  changelog: [
    '/changelog',
    '/releases',
    '/release-notes',
    '/updates',
    '/whats-new'
  ],
  docs: [
    '/docs',
    '/documentation',
    '/developer',
    '/api-docs',
    'https://docs.{domain}'
  ],
  github: [
    'https://github.com/{company-name}',
    'https://github.com/{product-name}'
  ]
};
```

#### 3.3.4 Jina Reader Integration

**Technology**: Jina Reader API (already in use)
**Use Case**: Extract all links from a page as markdown

**Implementation**:
```javascript
async function jinaExtractLinks(url) {
  const jinaUrl = `https://r.jina.ai/${url}`;
  const response = await fetch(jinaUrl);
  const markdown = await response.text();

  // Extract all markdown links: [text](url)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const links = [];
  let match;

  while ((match = linkRegex.exec(markdown)) !== null) {
    links.push({
      text: match[1],
      url: match[2]
    });
  }

  return links;
}
```

**Success Rate**: ~70-80% for extracting all links

#### 3.3.5 LLM Structured Extraction

**Technology**: Claude Haiku or Sonnet with structured output
**Use Case**: Analyze page content and identify social profiles

**Prompt**:
```
Analyze this webpage content and extract social media profiles and important links.

Product: {product_name}
Homepage URL: {product_url}
Page Content:
{jina_content}

Extract the following if found:
1. LinkedIn company page URL
2. Twitter/X official account URL
3. GitHub organization or repository URL
4. YouTube channel URL
5. Blog RSS feed URL
6. Changelog/Release notes URL
7. Documentation URL
8. Any other official social media profiles

For each link found, provide:
- link_type: (linkedin | twitter | github | youtube | rss | changelog | docs | other)
- url: (full URL)
- confidence: (high | medium | low)
- reasoning: (why you think this is the official link)

Return as JSON array.
```

**Success Rate**: ~80-90% with high confidence filtering

#### 3.3.6 Optional: Clearbit Company API

**Technology**: Clearbit Enrichment API
**Cost**: Free tier: 50 requests/month, then $99/month
**Use Case**: Fallback for when free methods fail

**API Response** (example):
```json
{
  "name": "Trae",
  "domain": "trae.ai",
  "twitter": {
    "handle": "traeai",
    "followers": 5234
  },
  "linkedin": {
    "handle": "company/trae-ai"
  },
  "github": {
    "handle": "traehq"
  },
  "tech": ["react", "node.js"],
  "description": "AI-powered development tools"
}
```

**Recommendation**: Use only for high-priority tools (AI-Toolkit) due to cost.

### 3.4 Link Validation & Confidence Scoring

Every discovered link must be validated before adding to frontmatter.

#### 3.4.1 Validation Checks

```javascript
async function validateLink(url, expectedType) {
  try {
    // 1. HTTP Status Check
    const response = await fetch(url, { method: 'HEAD', redirect: 'follow' });
    if (response.status !== 200) return { valid: false, reason: 'HTTP error' };

    // 2. Type-Specific Validation
    if (expectedType === 'github') {
      // Check if it's actually a GitHub org/repo
      const isOrg = url.match(/github\.com\/[^/]+\/?$/);
      const isRepo = url.match(/github\.com\/[^/]+\/[^/]+\/?$/);
      if (!isOrg && !isRepo) return { valid: false, reason: 'Not a valid GitHub URL' };
    }

    if (expectedType === 'rss') {
      // Check if RSS feed is valid XML
      const content = await fetch(url).then(r => r.text());
      if (!content.includes('<rss') && !content.includes('<feed')) {
        return { valid: false, reason: 'Not a valid RSS feed' };
      }
    }

    // 3. Check for redirects to unrelated domains
    const finalUrl = response.url;
    const originalDomain = new URL(url).hostname;
    const finalDomain = new URL(finalUrl).hostname;

    if (!domainsRelated(originalDomain, finalDomain)) {
      return { valid: false, reason: 'Redirects to unrelated domain' };
    }

    return { valid: true };
  } catch (error) {
    return { valid: false, reason: error.message };
  }
}
```

#### 3.4.2 Confidence Scoring

```javascript
function calculateConfidence(link, discoveryMethod, validationResult) {
  let score = 0;

  // Discovery method weight
  const methodScores = {
    'website_scraper': 30,      // Found on official site
    'common_pattern': 25,       // Standard URL pattern worked
    'jina_extraction': 20,      // Found in page content
    'search_engine': 15,        // Found via search
    'llm_analysis': 10,         // AI identified
    'clearbit_api': 35          // Verified by paid service
  };
  score += methodScores[discoveryMethod] || 0;

  // Validation checks
  if (validationResult.valid) score += 30;
  if (validationResult.httpsOnly) score += 10;
  if (validationResult.noRedirects) score += 10;

  // Context signals
  if (link.foundInMultiplePlaces) score += 20;
  if (link.matchesCompanyName) score += 10;
  if (link.verifiedBadge) score += 15;  // e.g., Twitter verified

  // Classify
  if (score >= 70) return 'high';
  if (score >= 40) return 'medium';
  return 'low';
}
```

### 3.5 Link Categorization

**Regex Patterns for Auto-Classification**:

```javascript
const linkPatterns = {
  linkedin: /linkedin\.com\/company\/([^/?]+)/,
  twitter: /(twitter|x)\.com\/([^/?]+)/,
  bluesky: /bsky\.app\/profile\/([^/?]+)/,
  github_org: /github\.com\/([^/]+)\/?$/,
  github_repo: /github\.com\/([^/]+)\/([^/]+)/,
  youtube: /youtube\.com\/(channel\/[^/?]+|@[^/?]+)/,
  medium: /medium\.com\/@([^/?]+)/,
  product_hunt: /producthunt\.com\/products\/([^/?]+)/,
  discord: /(discord\.gg|discord\.com\/invite)\/([^/?]+)/,
  rss: /\/(rss|feed|atom)\.(xml|rss)$/
};
```

### 3.6 State Management & Caching

To avoid re-discovering links on every run:

```json
// .state/link-aggregator/discovery-cache.json
{
  "tools": {
    "trae-ai": {
      "url": "https://www.trae.ai/",
      "last_scanned": "2025-11-15T10:30:00Z",
      "links_found": 12,
      "links_validated": 10,
      "confidence": "high",
      "discovery_methods_used": [
        "website_scraper",
        "common_pattern",
        "jina_extraction"
      ],
      "links": {
        "linkedin_url": {
          "url": "https://www.linkedin.com/company/trae-ai/",
          "method": "website_scraper",
          "confidence": "high",
          "validated": true,
          "first_seen": "2025-11-15T10:30:00Z"
        },
        // ... more links
      }
    }
  }
}
```

## 4. Implementation Phases

### Phase 1: Core Discovery (Week 1)
**Goal**: Build minimal viable link aggregator

**Deliverables**:
1. Website scraper for social icons (Playwright)
2. Common URL pattern tester (RSS, changelog)
3. Link validator (HTTP status, type checks)
4. Basic confidence scoring
5. Frontmatter updater (dry-run mode)
6. Process 50 high-priority AI tools

**Success Metrics**:
- Discover 5+ links per tool (average)
- 90%+ validation pass rate for discovered links
- Zero false positives at high confidence
- Process 50 tools in < 30 minutes

### Phase 2: Advanced Discovery (Week 2)
**Goal**: Add search and AI-powered discovery

**Deliverables**:
1. Search engine integration (SerpAPI or SearXNG)
2. Jina Reader link extraction
3. LLM structured extraction (Claude Haiku)
4. Enhanced confidence scoring
5. Duplicate/conflict resolution
6. Process 200 AI-Toolkit tools

**Success Metrics**:
- Increase to 8+ links per tool (average)
- Discover links for 80%+ of tools
- LLM extraction has 90%+ accuracy
- Search finds profiles website scraping missed

### Phase 3: Batch Processing (Week 3)
**Goal**: Process all 1,400+ tools

**Deliverables**:
1. Batch processing script (100 tools at a time)
2. Progress tracking and resumption
3. Error handling and retry logic
4. Human review queue (low-confidence links)
5. Bulk frontmatter update
6. Process all 1,400+ tools

**Success Metrics**:
- Complete all 1,400+ tools without crashes
- 70%+ of tools have 5+ discovered links
- < 5% error rate across all discovery methods
- Human review queue has < 200 items

### Phase 4: Maintenance & Integration (Week 4)
**Goal**: Production-ready ongoing maintenance

**Deliverables**:
1. Incremental re-scan (quarterly refresh)
2. New tool auto-discovery (on file creation)
3. Integration with Filesystem Observer
4. Monitoring dashboard (optional)
5. Cost tracking for API usage

**Success Metrics**:
- New tools get links within 24 hours
- Re-scans catch 90%+ of changed links
- Total monthly cost < $50
- System runs unattended

## 5. Integration with Existing Systems

### 5.1 Filesystem Observer Integration

The link aggregator should work with the existing observer:

```typescript
// tidyverse/observers/userOptionsConfig.ts
export const linkAggregatorConfig = {
  enabled: true,
  runOnNewFiles: true,  // Auto-discover links for new tools
  runOnManualTrigger: true,
  confidenceThreshold: 'medium',  // Only add medium+ confidence
  requiredInputFields: ['url', 'site_name'],
  outputFields: [
    'linkedin_url',
    'twitter_url',
    'github_repo_url',
    'blog_rss_url',
    // ... more
  ]
};
```

### 5.2 Watch Configuration Auto-Generation

Once links are discovered, auto-generate watch configurations for the Release Watcher:

```yaml
# Auto-generated from discovered links
---
watch_enabled: false  # Requires manual review before enabling
tool_ref: "tooling/AI-Toolkit/.../Trae AI.md"

sources:
  # Auto-generated from github_repo_url
  - type: github_releases
    repo: traehq/trae

  # Auto-generated from blog_rss_url
  - type: rss
    url: https://www.trae.ai/blog/rss.xml

  # Auto-generated from changelog_url
  - type: changelog_page
    url: https://www.trae.ai/changelog
```

### 5.3 Parent Organization Enrichment

If `parent_org` exists, also discover links for the parent organization:

```markdown
# tooling/AI-Toolkit/.../Trae AI.md
parent_org: "[[organizations/ByteDance|ByteDance]]"

# Then also discover:
# - ByteDance LinkedIn
# - ByteDance GitHub
# - ByteDance careers page
# - etc.
```

## 6. Error Handling & Edge Cases

### 6.1 Common Edge Cases

**1. Multiple GitHub Repos**
- Product has multiple repos (e.g., client, server, CLI)
- **Solution**: Prioritize organization URL, list top 3 repos

**2. Rebrands/Redirects**
- Twitter → X redirects
- Company name changes
- **Solution**: Follow redirects, store canonical URL

**3. Defunct/Archived Links**
- GitHub repo archived
- Twitter account suspended
- **Solution**: Mark as `archived: true`, keep for historical context

**4. Personal vs Company Accounts**
- Founder's personal Twitter vs company account
- **Solution**: Use heuristics (verified badge, follower count, bio keywords)

**5. Regional Variations**
- LinkedIn has `/company/trae-ai` and `/company/trae-ai-china`
- **Solution**: Prefer primary (English) version, note alternates in comments

### 6.2 Rate Limiting

**HTTP Requests**:
- Max 10 concurrent requests
- 1 second delay between requests to same domain
- Exponential backoff on 429 errors

**API Limits**:
- SerpAPI: 100 searches/month (free tier)
- Jina Reader: 10,000 requests/month (free tier)
- Claude Haiku: Track token usage, estimate $20/month for 1,400 tools

### 6.3 Failure Recovery

```json
// .state/link-aggregator/failed-tools.json
{
  "failed": [
    {
      "tool": "tooling/AI-Toolkit/.../Cursor.md",
      "reason": "Rate limited by website",
      "timestamp": "2025-11-15T10:30:00Z",
      "retry_count": 2,
      "next_retry": "2025-11-15T11:30:00Z"
    }
  ]
}
```

## 7. Human Review Workflow

### 7.1 Review Queue

Low-confidence links should be reviewed before adding to frontmatter:

```markdown
# .state/link-aggregator/review-queue.md

## Trae AI
**Confidence**: Medium
**Links to Review**:
- [ ] Twitter: https://twitter.com/trae_official (found via search, not website)
- [ ] Discord: https://discord.gg/traeai (found in footer, but 404)
- [ ] YouTube: https://youtube.com/@traeai (found via LLM, low confidence)

**Actions**:
- ✅ Approve
- ❌ Reject
- ✏️ Edit URL
```

### 7.2 Manual Override

Allow content team to manually add/override links:

```yaml
# Frontmatter
links_manually_verified: true
links_manual_overrides:
  twitter_url: https://x.com/correct_handle  # Overrides auto-discovered
```

## 8. Performance & Cost

### 8.1 Performance Targets

- Process 1 tool in < 30 seconds (all discovery methods)
- Batch of 100 tools in < 45 minutes
- Full 1,400 tools in < 12 hours (with rate limiting)
- Re-scan 1 tool in < 10 seconds (cached results)

### 8.2 Cost Estimates (Monthly)

**Free Tier Services**:
- Website scraping: $0 (self-hosted Playwright)
- Common pattern testing: $0 (simple HTTP requests)
- Jina Reader: $0 (within free tier)
- SearXNG search: $0 (self-hosted) or SerpAPI: $0 (100 searches)

**Paid Services** (Optional):
- Claude Haiku LLM: ~$20/month (1,400 tools × $0.014/call)
- SerpAPI (beyond free): $50/month (1,000 searches)
- Clearbit: $99/month (unlimited, if needed)

**Total Estimated Cost**:
- Free methods only: **$0-20/month**
- With LLM enrichment: **$20-40/month**
- With Clearbit (optional): **$120-150/month**

**Recommendation**: Start with free methods + LLM for Phase 1-3.

### 8.3 Resource Usage

- **CPU**: Moderate (Playwright rendering)
- **Memory**: ~512MB peak (browser instances)
- **Disk**: ~50MB (state files, caches)
- **Network**: ~500MB/day (during batch processing)

## 9. Testing Strategy

### 9.1 Unit Tests

```javascript
describe('Link Discovery', () => {
  test('scrapes social links from homepage', async () => {
    const links = await scrapeSocialLinks('https://www.trae.ai/');
    expect(links).toContain('https://github.com/traehq');
  });

  test('validates GitHub repo URL', async () => {
    const result = await validateLink('https://github.com/traehq/trae', 'github');
    expect(result.valid).toBe(true);
  });

  test('calculates confidence score correctly', () => {
    const confidence = calculateConfidence({
      discoveryMethod: 'website_scraper',
      validationResult: { valid: true },
      foundInMultiplePlaces: true
    });
    expect(confidence).toBe('high');
  });
});
```

### 9.2 Integration Tests

```javascript
describe('End-to-End Link Aggregation', () => {
  test('discovers and validates links for Trae AI', async () => {
    const tool = {
      url: 'https://www.trae.ai/',
      site_name: 'Trae'
    };

    const result = await discoverLinks(tool);

    expect(result.linkedin_url).toBeDefined();
    expect(result.github_repo_url).toBeDefined();
    expect(result.links_confidence).toBe('high');
    expect(result.links_found).toBeGreaterThan(5);
  });
});
```

### 9.3 Test Data

Create a test set of 10 diverse tools:
1. Well-known product with complete presence (e.g., Cursor)
2. Open-source project (GitHub-centric, e.g., Cline)
3. Startup with minimal presence (e.g., new AI tool)
4. Enterprise product (LinkedIn-heavy, e.g., MongoDB)
5. Hardware product (e.g., Jetson)
6. Defunct/archived product (edge case testing)
7. Rebranded product (redirect testing)
8. Product with multiple repos (disambiguation)
9. Product with regional accounts (variation testing)
10. Product with obfuscated social links (challenge test)

## 10. Success Criteria

### 10.1 Coverage Metrics
- [ ] 90%+ of tools have at least 3 discovered links
- [ ] 70%+ of tools have GitHub or social media links
- [ ] 50%+ of tools have RSS or changelog links
- [ ] 100% of links validated (no dead links)

### 10.2 Quality Metrics
- [ ] 95%+ precision at "high" confidence (no false positives)
- [ ] 80%+ recall for well-known products (find known links)
- [ ] < 10% of links require human review
- [ ] Zero duplicate frontmatter keys

### 10.3 Operational Metrics
- [ ] Process all 1,400 tools within 12 hours
- [ ] Total cost < $50/month (excluding optional Clearbit)
- [ ] < 2% failure rate across all tools
- [ ] < 1 hour/week maintenance time

### 10.4 Team Impact
- [ ] Content team reports time saved on manual link discovery
- [ ] Link data enables Release Watcher implementation
- [ ] Improved tooling directory completeness
- [ ] Better cross-referencing between tools and organizations

## 11. Technical Stack

### 11.1 Core Technologies
- **Runtime**: Node.js 18+ / TypeScript 5+
- **Web Scraping**: Playwright (headless browser)
- **HTML Parsing**: Cheerio (lightweight alternative)
- **HTTP Client**: node-fetch or axios
- **State Storage**: JSON files (Phase 1-3), SQLite (Phase 4+)

### 11.2 Key Dependencies
- **Browser Automation**: playwright
- **Link Validation**: link-check or custom solution
- **Search API**: serpapi (optional) or SearXNG
- **Content Extraction**: Jina Reader API (existing)
- **LLM**: Anthropic Claude API (existing)
- **YAML**: js-yaml, gray-matter (existing)

### 11.3 Development Tools
- **Testing**: Jest or Vitest
- **Linting**: ESLint
- **Formatting**: Prettier
- **Logging**: winston or pino

## 12. Repository Structure

```
tidyverse/link-aggregator/
├── src/
│   ├── index.ts                    # Main orchestrator
│   ├── config/
│   │   └── patterns.ts             # URL patterns, selectors
│   ├── discoverers/
│   │   ├── websiteScraper.ts       # Scrape homepage for links
│   │   ├── patternTester.ts        # Test common URL patterns
│   │   ├── searchEngine.ts         # Google/DDG search
│   │   ├── jinaReader.ts           # Jina link extraction
│   │   └── llmAnalyzer.ts          # AI-powered discovery
│   ├── validators/
│   │   ├── linkValidator.ts        # HTTP checks, type validation
│   │   └── confidenceScorer.ts     # Calculate confidence scores
│   ├── categorizers/
│   │   └── linkCategorizer.ts      # Classify and normalize links
│   ├── writers/
│   │   └── frontmatterWriter.ts    # Update tool frontmatter
│   ├── state/
│   │   └── stateManager.ts         # Read/write state files
│   └── utils/
│       ├── logger.ts               # Structured logging
│       ├── retry.ts                # Retry logic
│       └── rateLimiter.ts          # Rate limiting
├── tests/
│   ├── discoverers/
│   ├── validators/
│   └── integration/
├── config/
│   └── default.yml                 # Global configuration
├── .env.example                    # API keys template
├── package.json
├── tsconfig.json
└── README.md
```

## 13. Configuration File

```yaml
# config/default.yml
discovery:
  enabled_methods:
    - website_scraper
    - pattern_tester
    - jina_reader
    - llm_analyzer
    # - search_engine  # Enable if API key provided
    # - clearbit_api   # Enable if API key provided

  confidence_threshold: medium  # Only add medium+ confidence links

  rate_limits:
    http_requests_per_second: 5
    concurrent_requests: 10
    jina_requests_per_day: 1000
    llm_requests_per_batch: 100

  retry:
    max_attempts: 3
    backoff_multiplier: 2
    initial_delay_ms: 1000

validation:
  check_http_status: true
  follow_redirects: true
  max_redirects: 3
  timeout_ms: 10000
  verify_ssl: true

output:
  frontmatter_fields:
    - linkedin_url
    - twitter_url
    - github_repo_url
    - github_org_url
    - youtube_channel_url
    - blog_rss_url
    - changelog_url
    - docs_url

  add_metadata: true  # Add links_last_updated, links_confidence, etc.
  dry_run: false      # Set true to preview without writing

logging:
  level: info
  format: json
  file: logs/link-aggregator.log
```

## 14. CLI Interface

```bash
# Discover links for a single tool
npm run discover -- --tool "tooling/AI-Toolkit/.../Trae AI.md"

# Batch process all tools
npm run discover -- --batch --directory "tooling/AI-Toolkit"

# Re-scan tools with low confidence
npm run discover -- --rescan --min-confidence low

# Dry run (preview without writing)
npm run discover -- --dry-run --tool "tooling/.../Cursor.md"

# Generate watch configurations
npm run discover -- --generate-watch-configs

# Human review mode
npm run review-queue
```

## 15. Monitoring & Logging

### 15.1 Metrics to Track
- Links discovered per tool (average)
- Discovery method success rates
- Validation pass rates
- Confidence score distribution
- API costs per tool
- Processing time per tool
- Error counts by type

### 15.2 Log Format

```json
{
  "timestamp": "2025-11-15T10:30:00Z",
  "level": "info",
  "service": "link-aggregator",
  "tool": "trae-ai",
  "event": "links_discovered",
  "data": {
    "links_found": 12,
    "links_validated": 10,
    "confidence": "high",
    "discovery_time_ms": 8543,
    "methods_used": ["website_scraper", "jina_reader"]
  }
}
```

## 16. Future Enhancements

### 16.1 Advanced Features
- Deep crawling (analyze multiple pages per site)
- Historical tracking (when links were added/changed)
- Link quality scoring (follower counts, activity levels)
- Automated link monitoring (detect when links break)
- Multilingual profile discovery
- API for external consumption

### 16.2 Integrations
- Slack notifications for new discoveries
- GitHub PR creation for link updates
- Integration with CRM (track company data)
- Social media analytics dashboard

### 16.3 AI Enhancements
- Multi-agent LLM verification (cross-check findings)
- Semantic similarity matching (fuzzy company name matching)
- Predictive link discovery (suggest likely URLs before checking)

## 17. Migration & Backfill

### 17.1 Existing Data Audit

Before running the aggregator:
1. Scan all 1,400+ tools for existing links in frontmatter
2. Extract manually added links (preserve these)
3. Identify tools missing basic metadata (url, site_name)

### 17.2 Backfill Strategy

```javascript
async function backfillLinks() {
  const tools = await loadAllTools();

  for (const tool of tools) {
    // 1. Preserve existing manual links
    const existingLinks = extractExistingLinks(tool.frontmatter);

    // 2. Discover new links
    const discoveredLinks = await discoverLinks(tool);

    // 3. Merge (manual links take precedence)
    const mergedLinks = {
      ...discoveredLinks,
      ...existingLinks,  // Overwrite with manual
      links_manually_verified: hasManualLinks(existingLinks)
    };

    // 4. Update frontmatter
    await updateFrontmatter(tool.path, mergedLinks);
  }
}
```

## 18. Appendix

### 18.1 Related Specifications
- [[Self-Updating-Product-Announcement-Watcher]] (depends on this spec)
- [[Filesystem-Observer-for-Consistent-Metadata-in-Markdown-files]]

### 18.2 Reference Services
- **Clearbit**: https://clearbit.com/enrichment
- **FullContact**: https://www.fullcontact.com/developer/docs/
- **Hunter.io**: https://hunter.io/api-documentation/v2
- **SerpAPI**: https://serpapi.com/
- **Jina Reader**: https://jina.ai/reader/

### 18.3 Alternative Approaches

**Approach 1: Manual Curation**
- Create Google Sheet with tool names
- Human team fills in links manually
- Import to frontmatter via script
- **Pros**: High accuracy
- **Cons**: Time-consuming, not scalable

**Approach 2: Crowdsourced**
- Community contributes links via PRs
- Review and merge contributions
- **Pros**: Distributed effort
- **Cons**: Inconsistent quality, slow

**Approach 3: Fully Automated (Chosen)**
- AI-powered discovery with validation
- Human review for low-confidence only
- **Pros**: Scalable, fast, maintainable
- **Cons**: Some false positives, ongoing costs

### 18.4 Example Discoveries

**Input**:
```yaml
url: https://www.cursor.com/
site_name: Cursor
```

**Output**:
```yaml
url: https://www.cursor.com/
site_name: Cursor
linkedin_url: https://www.linkedin.com/company/cursor-ai/
twitter_url: https://x.com/cursor_ai
github_repo_url: https://github.com/getcursor/cursor
youtube_channel_url: https://www.youtube.com/@cursor-ai
discord_url: https://discord.gg/cursor
docs_url: https://docs.cursor.com
blog_url: https://cursor.com/blog
changelog_url: https://changelog.cursor.com
links_last_updated: 2025-11-15
links_confidence: high
links_auto_discovered: true
```

---

*This specification provides a comprehensive blueprint for automatically discovering and cataloging the digital footprint of products in our tooling directory, serving as a critical foundation for automated release monitoring and content enrichment.*
