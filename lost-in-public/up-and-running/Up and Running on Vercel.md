---
date_created: 2025-05-26
date_modified: 2025-05-26
---

This section of the vercel.json configuration file sets up HTTP response headers for your Vercel deployment, specifically controlling how browsers and CDNs cache your website's content. Here's what each part does:

First Header Rule:
```json
CopyInsert
{
  "source": "/(.*)",
  "headers": [
    {
      "key": "Cache-Control",
      "value": "public, max-age=0, must-revalidate"
    }
  ]
}
```
Applies to all URLs (/(.*))
Sets Cache-Control: public, max-age=0, must-revalidate
This means:
public: The response can be cached by browsers and CDNs
max-age=0: The cache is considered stale immediately
must-revalidate: The browser must validate with the server before using a cached version
Essentially, this forces the browser to check with the server for fresh content on every request
Second Header Rule:
```json
CopyInsert
{
  "source": "/_astro/(.*)",
  "headers": [
    {
      "key": "Cache-Control",
      "value": "public, max-age=31536000, immutable"
    }
  ]
}
```
Applies specifically to files in the /_astro/ path (Astro's build output)
Sets Cache-Control: public, max-age=31536000, immutable
This means:
public: Can be cached by browsers and CDNs
max-age=31536000: Cache for 1 year (in seconds)
immutable: The content will never change, so browsers can use the cached version without checking for updates
This is highly efficient for static assets that get unique filenames when their content changes (which Astro does automatically)
The combination of these rules creates an optimal caching strategy:

Static assets (JS, CSS, images) are cached aggressively
HTML pages are always validated fresh
When you redeploy, browsers will get fresh HTML but can use cached assets until they change
This setup balances performance (fast page loads from cache) with freshness (users always see up-to-date content).

