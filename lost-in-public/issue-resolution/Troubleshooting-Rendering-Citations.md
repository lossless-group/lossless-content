---
title: Troubleshooting Rendering Citations
lede: Resolving issues with citation rendering in Markdown pipelines—strategies for AST transformation, plugin fallback, and robust user experience in Astro/Remark environments.
date_reported: 2025-04-16
date_resolved: 2025-04-23
date_last_updated: null
at_semantic_version: 0.0.0.1
affects_systems: Markdown-Rendering
status: "Outstanding"
augmented_with: Windsurf Cascade on Claude Sonnet 3.7
category: Extended-Markdown
date_created: 2025-04-16
date_modified: 2025-04-23
site_uuid: c35c1d5d-53da-4ec0-805a-34bc32b56bd6
tags:
  - Citation-Rendering
  - Markdown-Rendering
  - Extended-Markdown
  - Remark
  - Astro
  - AST-Transformation
authors:
  - Michael Staton
portrait_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/issue-resolutions/2025-05-05_portrait_image_Troubleshooting-Rendering-Citations_b7b8d92b-48c7-4c54-b4a6-d62b76ca76e5_ThU2D-qt8.webp
image_prompt: Markdown document with citation superscripts, footnotes, and AST nodes, visualized in a modern code pipeline style.
banner_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/issue-resolutions/2025-05-05_banner_image_Troubleshooting-Rendering-Citations_6b596573-95f9-4e2f-95e1-bff37df22b5c_ZXE5y_WNJ.webp
---
# Issue Resolution Breadcrumb: Citations Section Not Rendering Separately After Syntax Change

## 1. What were we trying to do and why?
We were updating the citations system in our markdown/AST pipeline so that citations would render in a dedicated "Citations" section at the end of the document, instead of being embedded inside a blockquote or inline with other content. This is essential for clarity, academic rigor, and user experience.

## 2. The Issue Encountered
After implementing the new citations syntax, the citations section is no longer being separated out from the blockquote node in the AST. Instead, citations are rendered as part of a `<blockquote>` or `<p>` (paragraph) element, rather than as a distinct citations section at the end of the page, as was the previous behavior.

- **Observed DOM Example:**
  - The citations appear inside a `<p>` tag (see: @[dom-element:p]) and are not detached from the main "blockquote" content (we call it a callout).

## 3. What did we try so far?
- 

## 4. Next Steps
- Review the remark/rehype plugin or custom AST transformation responsible for moving citations out of blockquotes.
- Add debug output to confirm the AST structure before and after transformation.
- Trace the code path for citation extraction to ensure it is being invoked.
- If necessary, revert to the previous syntax and transformation logic to confirm the regression.
- Continue to update this issue resolution breadcrumb as we experiment and progress.

## 5. Additional Notes
- This issue is being tracked and documented as per @[content/lost-in-public/prompts/workflow/Write-an-Issue-Resolution-Breadcrumb.md].
- We will append further attempts, "aha" moments, and the final solution as they occur.

---

## 6. Spacing and Formatting Rules for Inline Citations
- **Before the citation:** Ensure there is at least one space before `[^{hex}]`, unless it is at the start of a line.
- **After the citation:** There must always be at least one space or a newline after the closing `]` of an inline citation, regardless of what character follows (including punctuation), unless the citation is at the end of a line or the document.
- **Why:** This ensures citations are readable and typographically correct, and addresses the common issue where AI-generated or copy-pasted citations are crammed against adjacent words or punctuation.

## 7. Footnote Section and Deduplication Logic
- **Footnote Definition Syntax:** At the bottom of the page (in the footnotes section), the citation definition must be `[^{hex}]: ` (optionally followed by the citation text).
- **Multiple Inline References:** If the same citation is used multiple times inline throughout the document:
  - All inline instances should be formatted with correct spacing as above.
  - Only one footnote definition (`[^{hex}]: source text`) should appear in the footnotes section at the bottom.
  - The footnote definition should include the citation source information text.
  - No duplicate footnote definitions for the same citation hex code should exist.
- **Implementation Caution:**
  - The citation processing logic must detect and normalize all inline citations.
  - For each unique hex code, ensure only a single, correctly formatted footnote definition is present at the bottom.
  - If multiple definitions exist, deduplicate and keep only one (ideally with the most complete source text).

## 8. Implementation Plan (for Reference)
1. **Citation Extraction:**
   - Scan the document for all instances of `[^{hex}]` inline citations and collect all unique hex codes.
2. **Footnote Definition Management:**
   - For each unique hex code, ensure only one `[^{hex}]: ...` definition exists and is placed in the footnotes section at the bottom.
   - Deduplicate any duplicate footnote definitions.
3. **Spacing Logic:**
   - Apply the spacing rules to all inline citations, not to footnote definitions.
4. **Testing:**
   - Add tests with multiple inline uses of the same citation and verify only one footnote definition is produced.

## 9. Observational Note
- This is a common edge case in academic and AI-generated content. Close observation and robust testing are required to ensure that deduplication and correct placement of footnote definitions is always achieved, especially as AI tools often insert citations without proper spacing or may duplicate definitions.

---

# Troubleshooting Rendering Citations in Markdown (Astro/Remark)

## Context & Problem Summary

- **Goal:** Ensure citations and footnotes are correctly rendered, especially when nested in callouts or lists, with proper spacing and formatting.
- **Pipeline:**
  - `remarkCalloutHandler` runs first, wrapping callout content as custom AST nodes (e.g., `element` with class `callout`).
  - `remarkCitations` extracts citation definitions and (attempts to) transform inline citations.
- **Issue:**
  - Inline citations like `[6]`, `[9]`, `[4][8][11]` inside `<li>` or paragraphs were not detected or rendered properly.
  - Extraction regex only matched citation definitions (e.g., `[6]: url`), not inline refs.
  - Attempts to transform inline citations into custom AST nodes (`citationRef`) led to them being dropped if the renderer didn't handle them, or replaced with plain text fallback.
  - Sometimes, citation nodes were removed entirely from output, especially inside lists/callouts.

## Technical Attempts & Lessons Learned

1. **Initial Extraction Logic:**
   - Regex only matched `[n]: url` or `[^{hex}]: url` at end of doc.
   - Did not touch inline `[n]` or `[^{hex}]` in content.

2. **Attempted Inline Citation Transformation:**
   - Plugin traversed all text nodes, replaced `[n]`/`[^{hex}]` with `citationRef` AST nodes.
   - If renderer didn't know how to handle `citationRef`, citations disappeared from output.
   - Fallback: Set `citationRef.value = '[n]'` so at least plain text would show if not handled.

3. **Edge Cases:**
   - Inline citations in `<ol>`, `<li>`, or callouts sometimes still vanished, depending on parent/renderer behavior.
   - Removing citation nodes from AST could leave empty parents or break list structure.

4. **Renderer Dependency:**
   - Custom AST nodes require explicit renderer support (e.g., in AstroMarkdown.astro or a rehype plugin).
   - If not supported, fallback to plain text is mandatory to avoid data loss.

5. **User Experience:**
   - Frustration due to citations vanishing, reappearing, or being inconsistently rendered.
   - Frequent toggling between losing citations and getting raw text, depending on plugin/renderer state.

## Recommendations & Next Steps

- **Always ensure fallback:** Custom AST nodes for citations must always have a visible fallback if renderer doesn't support them.
- **Renderer update:** Implement explicit handling for `citationRef` nodes in the renderer to output superscripts/links as desired.
- **Testing:** Test with Markdown containing inline citations in lists, callouts, and paragraphs. Confirm citations never disappear.
- **Documentation:** Keep this file updated with any new edge cases or fixes.

---

## Copy of User Frustration & Steps

```
WHY IS IT NOT FINDING THESE?
NOW YOU HAVE REMOVED THE FUCKING CITATION
NOW YOU FUCKING UNDID IT.  FUCK IT, LET'S MOVE ON.  THIS IS BULLSHIT.
```

## Technical Snippets

- Extraction regex:
  `/^\[(\d+|\^[0-9a-f]{6})\]:?\s+https?:\/\/\S+$/i`
- Inline citation transformation:
  `node.value.replace(/\[(\d+|\^[0-9a-f]{6})\]/g, ...)`
- Fallback for custom node:
  `value: '[n]' // fallback: render as plain text if not handled`

---

## Key Takeaways

- Inline citations require both plugin and renderer support.
- Never remove or transform citations without a fallback.
- Custom AST nodes are powerful, but dangerous if not universally supported.
- User experience is paramount—citations must never disappear from rendered output.

---

*Insights and plan appended on 2025-04-16. Will refactor for readability after implementation is complete.*
*Last updated: 2025-04-16*