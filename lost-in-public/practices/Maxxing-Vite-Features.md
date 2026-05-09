

Where it comes from

  import.meta.env is a Vite feature, not Astro's. Astro is built on Vite, so we get it for free in
  every Astro site we maintain. Vite ships a small set of built-in env vars:

  ┌──────────────────────────┬────────────────────────┬──────────────────────────┐
  │           Var            │ Value during astro dev │ Value during astro build │
  ├──────────────────────────┼────────────────────────┼──────────────────────────┤
  │ import.meta.env.MODE     │ 'development'          │ 'production'             │
  ├──────────────────────────┼────────────────────────┼──────────────────────────┤
  │ import.meta.env.PROD     │ false                  │ true                     │
  ├──────────────────────────┼────────────────────────┼──────────────────────────┤
  │ import.meta.env.DEV      │ true                   │ false                    │
  ├──────────────────────────┼────────────────────────┼──────────────────────────┤
  │ import.meta.env.SSR      │ depends on context     │ depends on context       │
  ├──────────────────────────┼────────────────────────┼──────────────────────────┤
  │ import.meta.env.BASE_URL │ from base config       │ from base config         │
  └──────────────────────────┴────────────────────────┴──────────────────────────┘

  PROD and DEV are just convenience booleans derived from MODE. We use PROD because the gate reads
  naturally: "include this only in prod."

  How the gate actually works

  It's a build-time string replacement, not a runtime check. Vite statically swaps the literal
  import.meta.env.PROD for true or false during build. So our gate:

  {import.meta.env.PROD && (
    <script defer src="https://cloud.umami.is/script.js" data-website-id="..."></script>
  )}

  becomes, after astro build:
  {true && (<script ...>)}

  In astro dev it becomes {false && ...} and the entire script tag never reaches the page. There's no
   runtime overhead and no script-load that gets cancelled — the tag literally doesn't exist in the
  dev HTML.

  The one gotcha to know

  If we ever drop the snippets into a <script is:inline> tag, the substitution does not happen
  (Astro's is:inline skips Vite processing). We won't hit that here because we're using the
  conditional in Astro template syntax (frontmatter / expression context), not inside an inline
  script body. But worth flagging for Pass 2 in case someone reaches for is:inline to avoid Astro's
  script bundling.

  Astro-specific extras

  Astro adds a couple more on top of Vite's set: import.meta.env.SITE (your site: config) and the
  user-defined PUBLIC_* vars. Not relevant here, just noting for completeness.

  Worth verifying

  Before I touch site code, I should confirm none of the 8 repos are pinned to a pre-2.0 Astro /
  pre-3.0 Vite where this behaved differently. Want me to do that check now (just pnpm list astro
  vite across the workspaces) or roll it into Pass 1 implementation when you greenlight?