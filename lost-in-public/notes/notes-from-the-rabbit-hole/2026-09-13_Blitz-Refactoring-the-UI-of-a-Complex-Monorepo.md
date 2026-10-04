---
title: Blitz-Refactoring the UI of a Complex Monorepo
date_created: 2026-09-13
date_modified: 2026-09-15
authors:
  - Michael Staton
tags:
  - Agentic-Engineering
  - Component-Libraries
  - Microfrontends
  - Refactoring
  - CSS-Refactor
  - Design-Systems
  - Accessibility
  - Testing
---

# Blitz-Refactoring the UI of a Complex Monorepo

## Balancing Idealism and Simplicity, poorly

I tend to "anticipate" frustrations I've had in the past, and often "over-engineer" and end up yak shaving for what could end up only my own self-satisfaction. 

However, a primary design goal for [[projects/Augment-It/Specs/Augment-It Monorepo Vision Specification|Augment-It]] is to demonstrate extreme [[Vocabulary/Monorepo|Monorepos]], [[Vocabulary/Microservices|Microservices Architecture]], [[projects/Augment-It/High-Level-Architecture/Microfrontends|Microfrontends]] etc. 

Why?  Because the endgame of [[concepts/Explainers for AI/Agentic Engineering|Agentic Engineering]] is to have teams of 1-3 people iterating on a relatively small and coherent codebase.  

Unlike what seems to be Top-Down design fascism at [[organizations/IBM|IBM]], [[organizations/Alibaba|Alibaba]] and [[organizations/Google|Google]], I want to aim for a" ![Screenshot 2026-09-13 at 4.13.07 PM.png](https://ik.imagekit.io/xvpgfijuw/Image-Gin/2026-05/Screenshot_2026-09-13_at_4.13.07_PM_kDrLXmKun.webp)
promote/converge/sanction model" that allows [[concepts/Emergent Innovation|Emergent Innovation]].



<!-- SCAFFOLD NOTE — delete this block before publishing.
     Everything below is raw material with the numbers verified. Structure is a
     suggestion; cut whatever doesn't serve the story you want to tell. The
     copypasta blocks are measured, not estimated — every count came from a
     command, not a guess. Sections marked ✍️ are where your voice does the work
     and I deliberately left it thin. -->

## ✍️ Why this one lingered

<!-- ✍️ Your opener. The thing you said that's worth keeping:
     "lingering because it's important to me, so it needed focus AND urgency,
     and I didn't have both until now."
     That's the honest frame for the whole piece. -->

## The admission I'd already written down

The interesting part isn't that the UI drifted. It's that I'd **already diagnosed
it, in writing, seven weeks earlier** — and then kept shipping.

From `context-v/issues/No-Component-Library-UI-Improvised-Not-Component-Based.md`,
dated 2026-07-24:

> Every remote's UI was improvised by agents under ship pressure. Each app
> namespaces its CSS (`.rc-*`, `.pdr-*`, `.ow-*`, `.saa-*`, …) and re-invents the
> same organs locally. It worked — fourteen shipped remotes prove it — but the
> compounding costs are now visible.
>
> **The UI is getting funky.** Sibling remotes solve the same problem with
> slightly different visuals and behaviors; the app reads as a collection of
> sessions, not a product.

"A collection of sessions, not a product." I wrote that in July and then didn't
act on it until September, because it was important rather than urgent.

## ✍️ What "blitz" actually meant

<!-- ✍️ The method is the story here. Worth landing:
     - It was one day.
     - Four subagents swept 19 micro-frontends in parallel, read-only.
     - I didn't read the code. I read the *reports*, then verified the claims
       that mattered.
     - The thing that made it fast wasn't the agents. It was having somewhere
       for the findings to LAND (context-v, the registry, gh issues). -->

## What the sweep found

Four read-only scanners across 19 micro-frontends and the platform layer. Every
number below is measured.

```
158   button rule-sets across the federation, none of them components
 34   badge/pill treatments, same
 16   distinct ways to draw a button inside ONE member (response-reviewer)
 12   distinct pill recipes in that same member
 11   renderings of ONE connection-status signal
  2   components in packages/shared-ui, against 79 .svelte files across 19 members
```

The status pill is the one that makes the case without argument. **17 of 19
packages depend on `@augment-it/workspace` and observe the same
`connection_status` value.** Then they each draw it differently. Five are
byte-identical apart from the class prefix. Two members that need the signal
render *nothing at all*, so a dead surface is indistinguishable from an empty one.

And zero of the eleven are accessible — no `role="status"`, no `aria-live`, no
accessible name anywhere in the set. The socket can die and assistive technology
is never told.

## The root cause was not indiscipline

This is the part I didn't expect, and all four scanners reached it independently
without being asked about tokens.

```
--space-*    0 declarations in packages/theme/theme.css
--radius-*   0 declarations
--z-*        0 declarations
```

The federal token layer **never shipped a spacing, radius, or layering scale.**
Members needed them. So they invented the names they expected to exist and let
the CSS fallback carry the value:

| Phantom token | Declared | Uses | Members |
|---|---|---|---|
| `--font-sans` | **0** | 27 | **9** |
| `--color-warn` | **0** | 48 | 3 |
| `--radius-md` | **0** | 45 | 3 |
| `--color-accent-bg` | **0** | 25 | 3 |
| `--radius-sm` | **0** | 21 | 1 |

**170 declarations across 10 of 19 members reference tokens that do not exist.**
Each one silently ships its hardcoded fallback in all three modes — invisible to
the mode switch, to re-skinning, and to the drift linter.

Three members' own file headers assert that these families "come from
`@augment-it/theme`." They were written by people who believed the scale existed.

<!-- ✍️ This is the paragraph worth writing in your own voice — the reframe from
     "my teams were sloppy" to "the platform under-supplied them." It generalizes
     well past this codebase and it's the most quotable thing in the piece. -->

There's a rule in the contract, `F4`, that forbids raw `z-index` and mandates the
federal `--z-*` tokens. There are zero `--z-*` tokens. **It is enforced in two
separate places, so every member must fail a rule nobody can obey.** A rule that
can't be obeyed teaches people to ignore the checker — which puts every *other*
rule at risk.

## ✍️ The thing about making your own mess

<!-- ✍️ You said this and it's the honest center of the piece:
     "I stopped thinking about using other component libraries / UI kits once I
     started loop engineering, it's faster to make my own mess."
     It IS faster per decision. The 158 rule-sets are what it costs at scale.
     The nuance worth landing: the mess isn't the components. It's that nothing
     ever NAMED the convention, so every session re-decided from scratch — and
     each of those decisions was individually reasonable. -->

## The teams were already telling me

The strongest evidence wasn't in the CSS. It was in the comments. People were
flagging their own duplication, in the commit, at the time — one of them cites
the tracking issue by number:

> `// ResultRow/ResultsList copy-adapted from search-and-add (spec D7: per-remote`
> `// copies, no shared runtime; knowingly more fuel for the component library, gh #22).`

Three separate members name the file they copied and the debt they took on.
**Nobody was careless. There was just no registry for that declaration to land
in**, so it stayed in a comment nobody aggregates.

The push channel didn't need building. It needed somewhere to write to.

## Two things I had wrong

Worth recording, because both were the same species of error.

**The promotion list was wrong the day it was written.** `DESIGN.md` recorded four
"byte-identical" components as promotion candidates back in July. I read that as
"two of them have since drifted." Checked it with `git show` at three points in
history — they were **never byte-identical at any commit**, and neither has
changed since. Byte-identity had been asserted rather than measured, and every
reader inherited the error for six weeks. Including me, that morning.

**The graph mis-scored the top of my queue.** A codebase-graph diff told me a
`mount.ts` consolidation was still outstanding, because `makeMount()` showed up as
a god node with 19 edges. It shipped in August. Nineteen edges into a shared
factory is what *success* looks like. **Centrality cannot distinguish "everyone
duplicates this" from "everyone correctly depends on this."**

The lesson is the same both times, and it's the one I'd keep:

> A list written once and never re-measured decays into a historical document
> that reads like a live one — which is worse than no list, because it is
> believed.

So the fix isn't *re-measure more often*. It's **never hand-write the
measurement.** There's now a script that generates that table.

## Seeing it instead of reading it

<!-- ✍️ The Figma paragraph. Your line was:
     "I used to use Figma with my team but now agentic engineering got everybody
     and we go straight to code."
     The reframe worth keeping: what you lost wasn't the drawing, it was the
     shared visual reference that made disagreement visible BEFORE it was
     committed. Going straight to code didn't remove disagreement — it moved it
     downstream, where it shows up as sixteen buttons. -->

A registry is a table of file paths. A table has never once made anyone say
*"wait, those are the same thing."* So the eleven status pills went onto one
canvas, rendered from each member's own CSS — not redrawn, copied.

<!-- ✍️ Drop the canvas screenshots here. Both are already on the CDN:
https://ik.imagekit.io/xvpgfijuw/augment-it/claude-design-component-library-convergence/Claude-Design__Divergence-Collector--Full-Canvas_20260913T180450Z.jpg
https://ik.imagekit.io/xvpgfijuw/augment-it/claude-design-component-library-convergence/Claude-Design__Divergence-Collector--Buttons-Artboard_20260913T180450Z.jpg
-->

The property that makes this different from Figma: **the artboards are HTML and
CSS, drawn with the product's actual theme file and actual component markup.** It
isn't a picture of the component. It can be the component. A decision made on that
canvas is already expressed in the vocabulary the code uses.

## ✍️ Steal the vocabulary, don't adopt the kit

<!-- ✍️ Your argument, and it's a good one — worth making in full:
     Foundation models already know Tailwind, MUI, and shadcn conventions. So
     deriving our syntax from them is cheaper than inventing one, because the
     convention arrives PRE-KNOWN. Inventing our own causes more problems than
     it's worth. "Inspired by shadcn, sprinkles of Tailwind, full docs below."

     The supporting detail if you want it: shadcn's own source derives every
     radius from one knob —
       --radius-sm: calc(var(--radius) * 0.6)
     — and pairs every surface token with a named foreground (--primary /
     --primary-foreground). That pairing is the direct fix for a bug we found:
     a button hardcoding `color: #fff` because there was no named token for
     "text on this". -->

## ✍️ Where I'd put the Lossless spin

<!-- ✍️ The `/` modifier idea is yours and it's the most original thing here.
     Tailwind's `/` means "this token at N percent" (bg-primary/90). Today it's
     opacity-only. Your instinct: extend it to radius, padding, margin.

     The argument that makes it not-a-stretch: shadcn ALREADY computes
     --radius-sm as calc(--radius * 0.6). So radius="lg/60" is that exact
     operation exposed at the call site instead of baked into a scale step.
     Not a new concept — the existing one, at finer granularity.

     Your motivating case, worth stating: a flat scale expresses a value but not
     a RELATIONSHIP. Nested radii (inner = outer − padding) and optical rather
     than metric alignment are exactly where a six-step scale is right for
     consistency and wrong for the last two pixels. Responsive design pulls
     toward generics precisely where a detail-oriented eye pulls away.

     The risk, honestly: an escape hatch that's too pleasant becomes the new
     literal. MUI's `sx` prop is the cautionary tale. The mitigation is that
     `/60` is COUNTABLE where `11px` is invisible — six members using lg/60 is
     a measurable argument for shipping --radius-ml. -->

## What actually shipped, and what didn't

Being straight about it, because the fun part is the diagnosis and the fun part
isn't the work.

**Shipped:** a convergence loop with a governance model, an organ registry, a
fingerprint ledger that generates the duplication table, four structural
invariants now enforced in CI, a public study pinning ten UI kits, and a visual
canvas.

**Not shipped:** a single fix to the design system. The 170 phantom declarations
are still there. One member still leaks 61 unnamespaced class names into everyone
else. No component was promoted. Nothing converged.

<!-- ✍️ Land it however you want, but the honest version is: a day bought a plan
     and an instrument, not a refactor. Whether that's a good trade is the
     argument. My view: for something that had lingered seven weeks, converting
     "I should fix the UI someday" into a queue with measurements attached is the
     expensive half. But you should say what you actually think. -->

## The governance rule I'd keep

The whole model reduces to one line, and it's the thing I'd carry to another
codebase:

> **The difference between purposeful variation and drift is not a property of
> the code. It is whether a human wrote it down.**

Two teams deliberately diverging is healthy. The same two diverging by accident
is drift. **The code is identical in both cases.** Only the registry tells them
apart — which makes the registry the governance mechanism, not a report about one.

That's also why the plan doesn't prevent anything. Small teams stay fast, build
what they want, and the platform's job is to *notice* and decide — not to gate.

# Let the Subagents file Issues with VP Eng agent before tackling issues

Observing we were going to have subagents go refactor frontend code and log issues/bugs into context-v/issues as they were finding them, I advised to hold off until all issues were filed to debug, as patterns might suggest a system-wide decision, documentation, or feature.

:::user-prompt
wait until all the Issues files come back from all the microfrontends, as there might be very consistent patterns raised which would lead to an abstraction/insertion/convergence we wouldn't see if you just fixed them one at a time.
:::


This proved useful, as it helped Claude and I find areas to improve the platform theme system at the mode / semantic level:

```text

--color-warn-fg — defined, along with ok-fg and error-fg for consistency. You were right that -fg is the better name: 11 of the 16 uses are color: but 3 are border-color:, which -text doesn't honestly cover.

--fx-popover-shadow — fanned out to 9 declarations across 5 members. It had shipped with zero consumers while those members hand-wrote nine shadows in five different values. F8 dropped 59 → 56. The two ConnectorPalette copies were edited identically and verified still byte-identical afterward — breaking the strongest promotion candidate in the product to fix a shadow would've been a bad trade.

--color-text-dim — removed. --color-text-muted exists (317 uses); the three text-dim declarations were in one file shipping a hardcoded #9a9a9a. DESIGN.md had rejected the token and nobody told the author.

--color-primary / --color-secondary — canonical, with -foreground partners, defined explicitly in all three modes.

Two places you corrected my model

On chaining. I'd been treating every alias as a dialect risk. The distinction I was missing: a chain (--color-bg: var(--color-background)) has one value and cannot drift; only a duplicate can. So aliases are free, and the deprecation language is gone.

--color-bg proves it — 79 uses across 13 members vs --color-background's 30. It was marked "deleted end of Phase 4" while being the name two-thirds of the product prefers. That would have been 79 member edits to standardize on the less popular spelling.

On per-mode redundancy. Verified after your note: 44 tokens, all three blocks, zero cascading. Your palette-swap property holds literally — re-palletting vibrant is "write new values for these 44 lines," nothing hidden.

And it gave a clean placement rule that resolves the apparent contradiction with the font move:

▎ Mode-dependent semantics repeat in every mode. Mode-independent ones live in :root. A colour that cascades can't be found when re-palletting; a typeface written three times lies about how it behaves.
```


---

## Later the same day — the tokens had to come first

<!-- ✍️ The turn worth narrating: we set out to prove a Button and got stopped by
     the substrate. Your line was "maybe before we can even DO button everywhere,
     we have to tackle the colors first." That's the section. -->

The Button was built, it worked, and it still couldn't roll out — because the
thing underneath it wasn't one thing yet.

**Nine members set their root font to `var(--font-sans)`. Ten set theirs to
`var(--font-mono)`.** In a design system whose stated identity is "a dense
monospace instrument panel." A Button that looks native in one member would look
foreign in the next, and the component would be correct and still wrong.

The instinct to call that a split product was wrong, though. augment-it is a
monospace panel *for data*, and prose next to a data grid legitimately wants a
proportional face. Those nine weren't drifting — they were asking for something
the platform never shipped. What was actually broken is that each of them had to
invent a fallback, and **four different sans stacks shipped**:

| Stack they invented | Members |
|---|---|
| `system-ui, -apple-system, sans-serif` | 6 |
| `system-ui` | 2 |
| `system-ui, sans-serif` | 1 |
| `ui-sans-serif, system-ui, -apple-system, sans-serif` (hardcoded, no token) | 1 |

The defect was never the choice of face. It was the absence of one definition of
what *our* sans is.

### The strategy, in one line

<!-- ✍️ This is yours, verbatim, and it's the most reusable thing in the note. -->

> Log the ones used in the wild, converge them into the system to make them
> available elsewhere. And the variants that are redundant or useless — ditch the
> "suggestion" and impose the platform standard.

That turned out to be cheap in a way I didn't expect, because **every member had
already written the right token name.** They just got a literal because nothing
answered. Defining the token converges them with no member touched:

| Members wrote | Got | Now resolves to | Members fixed |
|---|---|---|---|
| `var(--font-sans, …)` ×9 | four different system stacks | one federal stack | **9**, zero edits |
| `var(--color-accent-bg, …)` ×9 | `rgba(120,160,255,.12)` — **blue** | the magenta accent tint | **9**, zero edits |
| `var(--color-warn, #c66)` ×16 | hardcoded `#c66` | `--color-warn-fg` | 3 members |
| hand-rolled popover shadows ×9 | five different values | `--fx-popover-shadow` | 5 members |

That last row is the one that stings: **`--fx-popover-shadow` had shipped and had
zero consumers**, while five members hand-wrote nine shadows in five values. A
token nobody can find costs more than a token that doesn't exist, because the
member pays for it in literals *and* you think you've solved it.

### Where the semantic layer landed

| Family | Shipped |
|---|---|
| **primary / secondary / tertiary** | each with a `-foreground` partner, all three modes |
| **ok / error / warn** | each with `-bg` and `-fg`, all three modes |
| **surface** | gained `--color-surface-foreground` |
| **accent family** | `accent`, `accent-2`, `accent-warm`, `on-accent` **chain** to the canonical names — 416 member declarations keep working, untouched |
| **typeface** | `--font-sans` shipped; `--font-mono` and it moved to `:root` |
| **`--fx-popover-shadow`** | 9 consumers, up from 0 |

**46 tokens, declared in all three mode blocks, zero cascading.**

### Two places I had the model wrong

<!-- ✍️ Both of these were your corrections and both are worth keeping — they're
     the kind of thing that only surfaces when someone who owns the system pushes
     back on someone who's only read it. -->

**Aliases chain; they don't duplicate.** I'd been treating every alias as a
dialect risk. The distinction I was missing:

- `--color-bg: #0f1115` *and* `--color-background: #0f1115` — two values, **will
  drift**
- `--color-bg: var(--color-background)` — one value, **cannot drift**

Only the first is the problem. The second is a *view*. And `--color-bg` proves
keeping it is right: **79 uses across 13 members** against `--color-background`'s
30. It was marked "deleted end of Phase 4" — targeting the name two-thirds of the
product actually prefers.

**Redundancy across modes is a feature.** Every mode-dependent token is written
out in all three blocks even where two share a value, so that re-palletting
vibrant is *"write new values for these 46 lines"* rather than *"find which ones
silently inherit from dark."* Which gives the placement rule:

> Mode-**dependent** semantics repeat in every mode. Mode-**independent** ones
> live in `:root`. A colour that cascades can't be found when you're
> re-palletting; a typeface written three times lies about how it behaves.

### The number moved, and every step of it was explained

`design:drift` went **99 → 95**:

| Check | Start | End | Why |
|---|---|---|---|
| P2 | 1 | **0** | a **false positive** — `--font-mono` flagged "missing in light vibrant" since the day it shipped |
| F8 | 59 | **56** | real — nine hardcoded shadows became one token |
| F4 | 22 | 22 | untouched |
| F6 | 17 | 17 | untouched |

The step that mattered most is the one that went *up*. Adding `--font-sans` took
it **99 → 100**, which failed my own gate — and stopping to ask why is how the
pre-existing false positive got found.

**A falling number is not evidence.** This script carries a comment about its own
past: a greedy regex once made it return zero files for every member, so every
per-file check found nothing and the run reported near-clean. Progress and
blindness look identical on a dashboard. The only difference is whether someone
can name the cause of each movement.

<!-- ✍️ Closing thought if you want one: the whole day rhymes. The promotion list
     nobody re-measured, the contrast checker reporting 30/30 on pairs it never
     inspected, DESIGN.md claiming all 108 pairs pass, a graph scoring a finished
     refactor as outstanding. Every one of them was a true-sounding number that
     nobody had re-derived. -->

## Subagents work in concert, reporting to VP Engineering agent. 

![Screenshot 2026-09-13 at 4.17.58 PM.png](https://i.imgur.com/p9RK89B.png)

---

## The thing we were actually building

<!-- ✍️ This came out at the very end of the day and it reframes everything above
     it. Might belong near the TOP of the final piece rather than the bottom —
     the design-system work reads differently once you know it was the pilot for
     something wider. Your call. -->

The governance model that came out of the design work turned out not to be about
design.

**Diverge → promote → enforce.** Members build whatever they need. Recurrence
becomes evidence. Evidence becomes a federal primitive. The primitive gets
*checked* rather than described. Nothing in that loop is specific to CSS — and
every artifact class a unit owes has the same shape, with only the checker
changing:

| Artifact | Diverge | Promote | Enforce |
|---|---|---|---|
| **UI kit** | a member builds a local component | it recurs in 3+ members | it lands in `shared-ui`, and `design:drift` checks it |
| **Docs** | a unit writes its own README | a section recurs across units | it becomes a template, and an F6-style check requires it |
| **Changelog** | a unit logs its own history | conventions converge | `changelog-conventions` enforces the shape |
| **`context-v/`** | a unit keeps its own specs and issues | folder patterns recur | the roles become contract |

### Why the design system went first, and why that was the hard one

> The design system is **the only one of the four with cleanup to do.** 158 button
> rule-sets, 170 phantom tokens, three members invisible to every check. The
> others are not in a worse state — **they are in no state at all.** Nothing needs
> un-drifting; it needs implementing.

That inverts the usual expectation about cost.

Design was expensive because every change was archaeology against decisions nobody
recorded: a token whose name lied about its value, a promotion list asserted
rather than measured, a finding count that turned out to be 40% regex noise, three
live remotes that no checker had ever seen. Every one of those had to be
*excavated* before anything could be fixed.

**Per-unit changelogs and READMEs carry none of that.** There is no archaeology in
a file that doesn't exist yet. The first one written is correct by construction,
and the only question is whether the next change lands in it.

So the remaining three classes should move *faster* than the design work did — and
any plan that budgets them like this one will under-commit badly.

### And a second axis nobody had written down

The per-unit contracts were organised by *kind* — services owe an API contract,
front-ends owe a design declaration. That's one axis. The other is **who is
reading**, and each reader has a distinct failure mode:

| Reader | Wants | Fails when |
|---|---|---|
| **The engineer stepping in** | what it owns, what it depends on, how to run it alone | written from the system's point of view instead of the unit's |
| **The non-specialist** — management, a client, anyone who must *understand* it without operating it | what it's FOR, what it does for a user, why it's its own unit | written in the vocabulary of the implementation |
| **The integrator** — human or agent, calling it rather than reading it | the API surface, the state matrix, the error cases, the events | prose where a table was needed |

Two consequences worth pulling out. **The integrator is increasingly an agent**,
which promotes the machine-readable artifacts — OpenAPI, the gallery catalog, the
state matrix — above the prose ones. And **the second reader is the one nobody
writes for**, which is odd, because they're the one who makes the system legible
to the people funding it.

A client cannot read a component library. They can read *"this is where a
researcher decides which of the candidate URLs is actually the company's official
blog, and why picking the wrong one is expensive."*

---

# Day two — when the defects stopped being visible

## ✍️ The turn

<!-- ✍️ Your framing here. The thing worth saying in your own words:
     day one was "make it look consistent." Day two was "make it work for
     people who can't see it." Same codebase, same loop, completely different
     kind of bug — and I didn't plan that turn, the components forced it.

     Also worth your voice: I was packing for the airport through most of this.
     The loop ran without me. That's either the point of the whole exercise or
     a thing to be nervous about, and I'm not sure which. -->

Day one's primitives were **appearance with a little behaviour**. A wrong radius,
a 1.26:1 border, a chip drawn green when it meant "skipped" — all of it shows up
in a screenshot, which is why a browser probe was enough to verify nine
migrations.

Then the remaining organs turned out to be **behaviour with a little appearance**,
and the verification method quietly stopped working.

| | day one | day two |
|---|---|---|
| the organs | Button, Chip, CardRow, ListContainer | Selector, SearchBox, DisclosureRow |
| what a defect looks like | wrong pixels | **nothing happens** |
| caught by | a probe screenshot | a test, or nobody |

That sentence — *a broken keyboard renders perfectly* — is the whole reason the
federation has tests now. There are 105 of them, up from zero, and they were
written before most of the components they cover.

## The promise nobody kept

Seven members declared `role="menu"`, `role="listbox"` or `role="radiogroup"`.
Each of those is a **promise to a screen-reader user**: *this is a widget you
navigate with arrows, and Tab takes you out of it.*

**Not one implemented it.** Two declared `role="menu"` with no `menuitem` children
at all. One declared a radio group containing no radios — which a screen reader
announces as a structurally broken widget.

Seven members got it wrong independently, which is the tell that matters: it isn't
carelessness, it's that **the roving-tabindex contract is the organ**. Nobody
should be hand-rolling it seven times, and seven people proved it by each getting
a different part of it wrong.

## The tests immediately found that my own components were broken

This is the part I'd want a skeptical reader to sit with. The tests didn't
validate the design system — they **indicted it**.

- **`SelectWrapper--ClickBody` was keyboard-dead.** `display: contents` generates
  no layout box, so the button wasn't focusable — while reporting `tabIndex="0"`,
  carrying a correct accessible name, and working perfectly with a mouse. It had
  passed `svelte-check`, the build, and every design gate. **Three engineers found
  it independently**; one measured tab stops going 37 → 29, *exactly* the eight
  instances.

- **`Selector--Menu` broke its own headline promise three ways**, each one
  revealed only by fixing the one before it. Fixing a focus bug is how you find
  the next focus bug.

- **A fixture simpler than every call site.** Its Escape test passed while *both*
  of its adopters were broken — because the fixture's trigger was a local `const`
  no member could clear, and closing a menu is precisely when the anchor goes
  away.

> **The test and the realistic call site disagreed, and the test won.**

The general form is worth more than the bug: *a fixture simpler than every real
call site doesn't test the component, it tests the fixture.* And the tell was
available before the adopters found it — the fixture did the one thing no member
would ever do.

## ✍️ The refusals were the best work

<!-- ✍️ This is the management observation and I think it's yours to make.
     The two highest-value things any agent did in two days were both REFUSALS —
     stopping and explaining, rather than shipping. That's the opposite of what
     you'd optimise an agent for if you were measuring throughput. Worth saying
     plainly what that implies about how to brief them. -->

**A refusal that produced the fix.** `person-enrichment` stopped mid-adoption
because `SearchBox--Autocomplete` couldn't accept an initial value — and its
affiliation name **arrives pre-filled**, auto-detected from the person's email
domain and shown to the operator as *"✓ Pre-filled — matched email domain."*
Adopting would have silently dropped a value they were looking at.

Rather than ship that or skip quietly, it marked its eight red assertions
**`it.fails`** — a marker that *passes while the defect is present and fails the
moment it's fixed*. A live tripwire instead of a silenced test. When the binding
landed, all eight flipped on the first run. **Not one defect had to be
re-discovered by hand.**

**A refusal that was right in the strongest sense.** Two icon-only links couldn't
adopt `ExternalLink`, because an `aria-label` *suppresses* the visually-hidden
new-tab notice — the one thing the component exists to add. And one of those sites
**already cleared the target-size floor with its own rules**, so adopting would
have turned a measured pass into a measured failure.

Both refusals became component features. Neither would have existed if the agent
had optimised for finishing.

## The gate was punishing the practice

An engineer deleted a rule carrying `z-index: 5`, wrote a comment explaining the
deletion — and the drift checker **re-reported the literal out of the prose.** The
member sat at its old count until the sentence was reworded.

> **Documenting a removed defect re-created it in the gate.**

A direct incentive never to explain a deletion, in a codebase whose entire
practice is explaining things in place. The hex-literal check had the same blind
spot and had been *reported twice as a finding* without anyone fixing the cause.

The script's own header warns about a checker that reports success because it
failed to look. This was the inverse: one that reported failure because it looked
somewhere it shouldn't.

**And my own census had the same bug.** One of the nine composite-role surfaces
was on the list because a grep hit a *code comment*. The ninth surface never
existed.

## Measurement kept correcting the plan, in both directions

Three times in two days, a number I'd asserted turned out to be wrong — and the
direction wasn't consistent, which is what makes it worth recording.

| I said | It was | Which meant |
|---|---|---|
| 16 units observe `connection_status` | **3** | an organ nearly built for a population that didn't exist |
| one member ships a 13×13 checkbox | **all nine, in all five members** | 54% of the WCAG target floor, everywhere, without exception |
| nine composite-role surfaces | **eight** | my own census had the comments-as-code bug |

The middle row is the one I keep coming back to. *"We use the platform control"*
reads as a safety claim, and measured as a uniform failure. **A native control is
not an accessible one if nobody sized it.**

## What a browser drive caught that 105 tests could not

`Button` declares `white-space: nowrap` **and** a fixed height. A Selector option
declared **neither** — only a minimum height.

So every member that swapped Button rows for options **silently converted a clip
into a wrap.** One real row measured **48px against its neighbours' 29px**, its
label squeezed to the min-content of its first word.

jsdom has no layout. It passed every test in every adopting member, and was found
on the one member where somebody looked at pixels.

> **A component that replaces another must match its layout defaults, not just its
> role and its keyboard.** The parts nobody declares are the parts that change
> silently.

That's the sharpest argument I have against the idea that tests replace looking.
They don't — they cover a different failure mode, and this one sat in the gap.

## Defects the sweeps found, which are the actual product

The components are scaffolding. These are what the two days bought:

- **`shell` rendered a dead socket and a healthy one identically.** Four of six
  connection states fell through to the same label, with the only trace of a
  failure in a `title` attribute nobody hovers.
- **Six members were still shipping one identical broken status recipe** after
  nine migrations — five states, three colour treatments, byte-for-byte the same
  in members that share no code.
- **A tag popup was thirteen tab stops.** Tab took the caret out of the input
  mid-word.
- **Six of the federation's seven links missing `noopener` were in two files** —
  each opened page holding `window.opener` access back into ours.
- **A keyboard hint that had started lying.** A `↵` badge advertised *"Enter picks
  the first match"* — true when written, false after the surface changed. Removing
  it was the point: **a hint that lies is the defect class this rollout exists to
  remove.**
- **Sixteen members re-declared one type union by hand**, because it lived in a
  file no package export could reach. Sixteen copies is sixteen chances to drift,
  and nothing would have caught a seventeenth state.

## Where it actually landed

| | |
|---|---|
| Federal primitives | **9 organs, 15 exported components** |
| Call sites | **563** across 19 units |
| Composite roles with no keyboard | **9 → 0** |
| Component tests | **105**, from zero |
| Members with a test suite | **11**, from 1 |
| Declared deviations, federation-wide | **8 → 1** |

The single surviving deviation is a real one — a colour case where the variant
enum genuinely has no `success` member. It's visible now because nothing else is
crowding it, which was the entire point of adding a rung for layout.

## ✍️ What I'd tell someone starting this

<!-- ✍️ Your closing. Some threads worth pulling on, use or discard:

     — The loop was more valuable than any component in it. It got revised four
       times from its own engineers' reports, and each revision was something
       nobody could have known in advance.

     — Every primitive I shipped had a defect the adopters found. Every single
       one. That's not a failure of care, it's what "you cannot test a component
       against a fixture simpler than its call sites" means in practice.

     — The counts were wrong three times and the direction wasn't consistent.
       Budget for measurement, not for estimates.

     — And the thing you said at the start of day two: a demo to 250 engineers
       who've wanted this for two years. What actually demos isn't the component
       library — it's the trail. Anyone can build a Button. Almost nobody can
       show you the reasoning, the corrections, and the measurements that
       produced it. -->

## Still open, and honestly named

**The control-boundary rule has no mechanical check.** Every one of those defects
this week was found by a person with a browser. The contrast gate walks 30 *text*
pairs and passed 30/30 straight through all of them. That's the highest-value
thing left.

**Eleven of twenty-two units still have no tests.** The sweeps added suites where
they went; the rest have none.

**Three adopters hand-rolled the same workaround** because a snippet prop can't be
typed with the member's own row type. That's past the threshold — it wants
generics.

**One gallery catalog still documents a recipe its member no longer ships** —
which is the exact failure the federated-libraries spec exists to prevent, sitting
inside the system that defines it.
