---
date_created: 2026-01-17
date_modified: 2026-01-27
title: "Aggregating GitHub Statistics"
status: Resolved
priority: Low
lede: "Creating aggregate stats on GitHub commits using the gh CLI and GitHub APIs."
authors:
  - Michael Staton
date_reported: 2025-01-17
date_resolved: 2025-01-27
site_uuid: c6dd1b20-bb91-4e91-8b01-24277df38eee
augmented_with: "Claude Code on Opus 4.5"
category: Analysis
image_prompt: "Two robots are sipping a cup of coffee with a software engineer, they are looking up at a `Baseball`-like stats board display. It shows commits, new lines, refactored lines, issues created and issues resolved. The commits stat is flipping from 299 to 300."
tags: [GitHub, Engineering-Management, Best-Practices]
publish: true
banner_image: "https://ik.imagekit.io/xvpgfijuw/uploads/lossless/2025-dec/Aggregating-GitHub-Stats_banner_image_1769519987692_K4vBBPvLA.webp"
portrait_image: "https://ik.imagekit.io/xvpgfijuw/uploads/lossless/2025-dec/Aggregating-GitHub-Stats_portrait_image_1769519989393_vwAGkppAU.webp"
square_image: "https://ik.imagekit.io/xvpgfijuw/uploads/lossless/2025-dec/Aggregating-GitHub-Stats_square_image_1769519990594_BUOZaf1SR.webp"
---

## Problem Statement

We wanted to count how many lines of code and content were written in 2025 across all repositories in an organization. GitHub's web UI shows contribution graphs but doesn't provide aggregate line counts. We needed to use the GitHub API to extract this data.

## Key Discoveries

### 1. Three Different APIs for Different Purposes

GitHub provides multiple APIs, each suited for different queries:

| API | Best For | Limitations |
|-----|----------|-------------|
| **GraphQL Contributions API** | Commit counts, contribution totals | No line-level stats |
| **Search Commits API** | Finding commits by date/author | Max 1000 results, no line stats |
| **Contributor Stats API** | Weekly line additions/deletions | Returns 202 if not cached, needs triggering |

### 2. The Contributor Stats API is Quirky

The `/repos/{owner}/{repo}/stats/contributors` endpoint is the only way to get line-level statistics, but it has important behaviors:

- **Returns 202 on first request**: GitHub computes stats asynchronously. The first request triggers computation and returns HTTP 202. You must wait and retry.
- **Data is cached**: Once computed, stats are cached for about a week.
- **Weekly granularity**: Data is returned in weekly buckets with Unix timestamps.

### 3. Unix Timestamps for Date Filtering

To filter for 2025 data, use Unix timestamp `1735689600` (January 1, 2025 00:00:00 UTC).

## Step-by-Step Guide

### Prerequisites

Install and authenticate the GitHub CLI:

```bash
# Install gh CLI (macOS)
brew install gh

# Authenticate
gh auth login

# Verify authentication
gh auth status
```

### Step 1: Get High-Level Contribution Counts (GraphQL)

This gives you authoritative commit counts from GitHub's contribution graph:

```bash
gh api graphql -f query='
{
  viewer {
    contributionsCollection(from: "2025-01-01T00:00:00Z", to: "2025-12-31T23:59:59Z") {
      totalCommitContributions
      totalIssueContributions
      totalPullRequestContributions
      totalPullRequestReviewContributions
      contributionCalendar {
        totalContributions
      }
    }
  }
}'
```

**Example output:**
```json
{
  "totalCommitContributions": 2354,
  "totalIssueContributions": 222,
  "totalPullRequestContributions": 9,
  "contributionCalendar": { "totalContributions": 2595 }
}
```

### Step 2: Find Which Repos Have Your Commits (Search API)

Identify repositories with activity in a specific time period:

```bash
# Count total commits in an org for 2025
gh api "search/commits?q=author:YOUR_USERNAME+org:YOUR_ORG+committer-date:2025-01-01..2025-12-31&per_page=100" \
  --jq '.total_count'

# Group by repository (limited to first 100 results)
gh api "search/commits?q=author:YOUR_USERNAME+org:YOUR_ORG+committer-date:2025-01-01..2025-12-31&per_page=100" \
  --jq '[.items | group_by(.repository.full_name) | .[] | {repo: .[0].repository.full_name, count: length}] | sort_by(-.count)'
```

**Note:** The Search API returns a maximum of 1000 results across all pages. Use it to identify active repositories, then query each repo's stats individually.

### Step 3: Get Line Statistics for a Single Repository

This is the core query to get additions and deletions:

```bash
gh api "repos/OWNER/REPO/stats/contributors" \
  --jq '.[] | select(.author.login == "YOUR_USERNAME") |
    .weeks | map(select(.w >= 1735689600)) |
    {
      commits: (map(.c) | add),
      additions: (map(.a) | add),
      deletions: (map(.d) | add)
    }'
```

**Example output:**
```json
{
  "commits": 245,
  "additions": 3180613,
  "deletions": 3185840
}
```

**Understanding the response:**
- `.w` = Unix timestamp for the week
- `.a` = Lines added that week
- `.d` = Lines deleted that week
- `.c` = Commits that week

### Step 4: Handle 202 Responses (Stats Not Ready)

If the API returns empty or 202, you need to trigger stats generation:

```bash
# Trigger stats computation (ignore output)
gh api "repos/OWNER/REPO/stats/contributors" >/dev/null 2>&1

# Wait a few seconds
sleep 3

# Retry the query
gh api "repos/OWNER/REPO/stats/contributors" \
  --jq '.[] | select(.author.login == "YOUR_USERNAME") | ...'
```

### Step 5: Query Multiple Repositories

Loop through repositories and aggregate:

```bash
#!/bin/bash
USERNAME="your_username"
ORG="your_org"

# List all repos in org
repos=$(gh repo list "$ORG" --limit 100 --json name --jq '.[].name')

total_adds=0
total_dels=0
total_commits=0

for repo in $repos; do
    # Trigger stats (in case not cached)
    gh api "repos/$ORG/$repo/stats/contributors" >/dev/null 2>&1
done

# Wait for GitHub to compute
sleep 5

for repo in $repos; do
    result=$(gh api "repos/$ORG/$repo/stats/contributors" 2>/dev/null | \
      jq -r --arg user "$USERNAME" '.[] | select(.author.login == $user) |
        .weeks | map(select(.w >= 1735689600)) |
        "\(map(.c) | add // 0) \(map(.a) | add // 0) \(map(.d) | add // 0)"' 2>/dev/null)

    if [ -n "$result" ] && [ "$result" != "0 0 0" ]; then
        commits=$(echo "$result" | cut -d' ' -f1)
        adds=$(echo "$result" | cut -d' ' -f2)
        dels=$(echo "$result" | cut -d' ' -f3)

        if [ "$commits" -gt 0 ] 2>/dev/null; then
            printf "%-40s %5d commits  +%-10d  -%d\n" "$repo" "$commits" "$adds" "$dels"
            total_adds=$((total_adds + adds))
            total_dels=$((total_dels + dels))
            total_commits=$((total_commits + commits))
        fi
    fi
done

echo "----------------------------------------"
printf "TOTAL: %d commits, +%d / -%d lines\n" "$total_commits" "$total_adds" "$total_dels"
```

### Step 6: Query a Single Repo (Quick Reference)

For quick one-off queries:

```bash
# Replace these values
OWNER="lossless-group"
REPO="lossless-content"
USERNAME="mpstaton"
YEAR_START=1735689600  # Jan 1, 2025

gh api "repos/$OWNER/$REPO/stats/contributors" \
  --jq ".[] | select(.author.login == \"$USERNAME\") |
    .weeks | map(select(.w >= $YEAR_START)) |
    {commits: (map(.c) | add), added: (map(.a) | add), deleted: (map(.d) | add)}"
```

## Common Unix Timestamps for Filtering

| Date | Unix Timestamp |
|------|----------------|
| Jan 1, 2024 | 1704067200 |
| Jan 1, 2025 | 1735689600 |
| Jan 1, 2026 | 1767225600 |

Generate a timestamp for any date:
```bash
date -j -f "%Y-%m-%d" "2025-01-01" "+%s"
```

## Caveats and Limitations

1. **Large line counts may include non-code**: Submodule updates, vendored dependencies, and auto-generated files inflate line counts significantly.

2. **Stats API coverage is incomplete**: Not all repos return stats immediately. Running queries multiple times over several minutes improves coverage.

3. **Rate limits apply**: GitHub API has rate limits. For large organizations, space out requests or use authenticated requests for higher limits.

4. **Private repos require appropriate scopes**: Ensure your `gh` token has `repo` scope for private repositories.

## Example Results

Running these queries for `mpstaton` in the `lossless-group` org for 2025:

```
From GitHub Contribution Graph (authoritative):
  Total Contributions:     2,595
  Total Commits:           2,354
  Issues Created:            222
  Pull Requests:               9

From Stats API (partial coverage):
  Commits Analyzed:          720
  Lines Added:        +4,262,627
  Lines Deleted:      -3,862,995
  Net Lines:            +399,632
```


```bash
gh api "repos/OWNER/REPO/stats/contributors" \
    --jq '.[] | select(.author.login == "mpstaton") |
      .weeks | map(select(.w >= 1735689600)) |
      {commits: (map(.c) | add), added: (map(.a) | add), deleted: (map(.d) | add)}'
```