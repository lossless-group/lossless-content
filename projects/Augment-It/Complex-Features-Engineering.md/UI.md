# UI Libraries

## 1. Purpose — why a UI library exists

A UI library is a **set of reusable, documented components** (buttons, inputs, dialogs, layouts) with consistent styling, behavior, and accessibility. It helps to:

* **Ship faster** — reuse tested parts instead of rebuilding styles and behaviors.
* **Reduce bugs** — state, focus, keyboard navigation, and edge cases are solved once.
* **Keep consistency** — same look and behavior across pages and teams.
* **Scale design changes** — update tokens (colors, spacing, typography) once, propagate everywhere.
* **Improve accessibility** — ARIA roles, focus traps, and contrast handled centrally.

Without a library, teams often re‑implement primitives differently, causing UI drift, fragile CSS, and repeated accessibility mistakes.

---

## 2. Why an LLM performs better with a UI library

LLM‑assisted coding improves when components and props are **stable and well‑named**:

* **Deterministic building blocks** — the model composes existing `<Button variant="primary">` instead of inventing ad‑hoc HTML/CSS.
* **Fewer hallucinations** — strict import paths and prop types constrain output.
* **Less CSS** — most styling comes from the library and design tokens, not handwritten rules.
* **Safer patterns** — dialogs, menus, focus management, and keyboard shortcuts are already correct.
* **Faster iterations** — ask the LLM to scaffold screens by **composing** known components rather than inventing new ones.

**LLM prompt pattern**

```text
Use only components from @shared-ui-elements. Do not write raw HTML controls.
Respect documented props and variants; if a prop is missing, leave a TODO comment.
Return a minimal, accessible JSX layout for <screen>. Include test IDs where relevant.
```

---

## 3. Popular React options to build upon

Two broad approaches work well.

### 3.1 Headless primitives + utility styling (high control)

* **Radix UI** — unstyled, accessible primitives (Dialog, Popover, Select, Tooltip, Tabs). Great accessibility and composability.
* **Headless UI / Ark UI** — headless components that pair well with Tailwind.
* **Tailwind CSS** — utility‑first styling; tie to design tokens via CSS variables.
* **Framer Motion** — predictable animations and transitions.
* **React Hook Form + Zod** — ergonomic forms with schema validation.
* **TanStack Table** — flexible data tables; bring your own styles.
* **Recharts / visx / Nivo** — charts at different abstraction levels.

**When to choose:** strong design system needs, desire to own the visual identity, comfort styling with Tailwind.

### 3.2 Opinionated suites (faster start)

* **shadcn/ui** — generated components built on Radix + Tailwind; copy‑in pattern lets you own the code.
* **MUI** — mature suite with theming and many components; good enterprise support.
* **Chakra UI** — simple props‑based styling, accessible defaults.
* **Ant Design** — comprehensive set, popular in dashboards; opinionated visuals.
* **Mantine / NextUI** — modern suites with dark mode and rich components.

**When to choose:** need breadth out‑of‑the‑box, consistent defaults, reduced styling effort.

> Practical default for a new Next.js app: **shadcn/ui + Radix + Tailwind + Framer Motion + React Hook Form + Zod + TanStack Table + Recharts**.

---

## 5. Practices that cut UI bugs

* **Single source of tokens**; no hard‑coded colors or spacing.
* **Layout primitives** (`Grid`, `Stack`) used instead of ad‑hoc divs.
* **Accessible dialogs and menus** (focus trap, Escape to close, Tab order).
* **Consistent form handling** (React Hook Form + Zod; error, help, label associations).
* **Visual regression safety net** (per‑component stories as living examples; optional screenshot tests later).

---

## 6. Working with an LLM — useful prompt patterns

**Scaffold a screen**

```text
Using @shared-ui-elements only, scaffold a Settings page with two cards: (1) Profile (TextField name/email, Save button); (2) Notifications (Switches for email/push). Use Grid/Stack for layout. Include accessible labels and helper text.
```

**Refactor to shared components**

```text
Refactor this raw HTML to use @shared-ui-elements (Button, Dialog, Input, Select). Preserve behavior and ARIA labels. Replace custom CSS with tokens/utility classes.
```

**Accessibility check**

```text
Review this JSX for a11y issues: focus order, label associations, keyboard handling for Dialog/Menu/Select, color contrast. Propose minimal fixes.
```

---

## 7. Adoption plan (lightweight)

1. Start with **foundations + 10–15 primitives**.
2. Migrate two high‑traffic screens; replace bespoke elements with shared ones.
3. Add missing components based on real usage (not speculation).
4. Publish Storybook and a short “recipes” section.
5. Add lint rules forbidding raw controls where a shared component exists.

---

## 8. Summary

UI libraries make teams faster and interfaces safer: fewer bugs, consistent behavior, accessible by default, and easier code generation with LLMs. For React, combine Radix‑style primitives or an opinionated suite with modern tooling, then wrap it in a **team‑owned** layer. **That’s why this project ships with `shared-ui-elements`** — a starter set of accessible, documented components so development can begin immediately on real screens rather than reinventing buttons and dialogs.
