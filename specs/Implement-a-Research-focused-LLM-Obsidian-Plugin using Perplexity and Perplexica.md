---
title: Implement a Research  focused LLM-based Obsidian Plugin using Perplexity and Perplexica APIs
lede: Developing quality content is hard, LLMs hallucinate. Let's focus on the ones that cite their sources and iterate from there.
date_authored_initial_draft: 2025-07-19
date_authored_current_draft: 2025-07-19
date_authored_final_draft: 
date_first_published: 
date_last_updated: 2025-07-19
at_semantic_version: 0.0.0.3
status: Iterating
augmented_with: War on Claude 4.0
category: Content-Automation
publish: true
date_created: 2025-07-19
date_modified: 2025-07-19
site_uuid: e2c91bb9-ba4e-2e51-b9c7-93c3fc99a89f
tags: [Frontmatter, OpenGraph]
authors:
  - Michael Staton
image_prompt: A robot representing API calls is fishing off a boat. There are several fishing poles that have been cast onto a large representation of a web browser.  The web browser has a web page loaded with headers and images. The fishing lines are hooked into images and text and are pulling copies of them off the web browser page and towards the boat.
banner_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/specs/2025-05-05_banner_image_Build-Script-Spec_39259b0d-6bed-4157-baf7-53c35deebb35_rr5hYOulP.webp
portrait_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/specs/2025-05-05_portrait_image_Build-Script-Spec_21af46f2-dd20-45e5-86da-c0815542f01e_e1OL2d6mN.webp
---

# Objective
✅ New Interactive Commands:

🔹 "Ask Perplexity" Command:
•  Modal Interface with:
•  Large text area for questions
•  Model selection dropdown (sonar-pro, sonar-small, etc.)
•  Stream toggle (defaults to ON)
•  Validates API key is set
•  Auto-inserts formatted results directly into the editor with timestamps
•  Handles streaming responses in real-time
•  Error handling with detailed feedback

🔹 "Ask Perplexica" Command:
•  Modal Interface with:
•  Large text area for questions  
•  Focus mode dropdown (webSearch, academicSearch, etc.)
•  Optimization dropdown (speed, balanced, quality)
•  Stream toggle (defaults to OFF)
•  Uses defaults from settings
•  Fallback logic - tries primary endpoint, then Docker fallback
•  Auto-inserts formatted results with all query parameters
•  Comprehensive error handling

✅ User Experience:
1. User runs "Ask Perplexity" or "Ask Perplexica" from command palette (Ctrl/Cmd+P)
2. Modal opens with focused text area ready for typing
3. User enters question, selects options
4. Plugin handles the API call and inserts formatted results
5. No code blocks or manual JSON editing needed!

✅ Output Format:
```markdown
## Perplexity Query (2025-01-19T18:19:31.000Z)
**Question:** What are the benefits of self-hosting?
**Model:** sonar-pro

[Response content here]

---
```
This is much cleaner than asking users to edit JavaScript code or JSON templates. The commands are discoverable, the interface is intuitive, and the results are automatically formatted in the editor. Users just need to:

1. Set their API keys in settings
2. Run the commands 
3. Ask their questions!

The plugin now provides a seamless AI-powered research experience directly in Obsidian! 🎉