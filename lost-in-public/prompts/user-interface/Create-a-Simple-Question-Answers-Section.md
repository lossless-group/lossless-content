---
title: Create a Simple Question Answers Section
lede: Build a maintainable component pipeline for rendering simple questions and answers dynamically generated from JSON data.
date_authored_initial_draft: 2025-04-18
date_authored_current_draft: 2025-04-18
date_authored_final_draft: null
date_first_published: null
date_last_updated: null
at_semantic_version: 0.0.0.1
status: To-Do
category: Prompts
date_created: 2025-04-18
date_modified: 2025-04-18
image_prompt: "A business man is pondering questions. Floating to the right, a reusable Q&A Section UI, each question is it's own dropdown, the top question is open with an answer."
tags:
  - User-Interface
  - Component-Architecture
  - UI-Design
  - Astro
  - Rendering-Pipeline
authors:
  - Michael Staton
augmented_with: Windsurf Cascade on GPT-4.1
portrait_image: https://img.recraft.ai/7k5UTI96DXen7Kb_gga35wvrAJSJOXbU8EHK3FMEaC0/rs:fit:1024:1820:0/raw:1/plain/abs://external/images/e90f31e3-ba4e-4699-8ad8-79758552a576
banner_image: https://img.recraft.ai/ybzsU-nPmaAhcomu6-HRD7sli27RGyY9iHOpT8xoJYs/rs:fit:1024:2048:0/raw:1/plain/abs://external/images/2a86c14b-cadf-4d96-858a-e6799f1f9c64
---

# Goal  

Design and implement a reusable Question & Answers (Q&A) section for our Astro site, following the established accordion/FAQ interaction pattern.

---

## Requirements

1. **Component Structure**
   - Use a parent Q&A section component that renders a list of Q&A items.
   - Each Q&A item is a dropdown/accordion: the question is a button, the answer is shown/hidden on click.
   - The component must accept data as a prop (array of question/answer objects).

2. **Behavior**
   - Only one answer should be open at a time (single-expand).
   - The first question should be open by default.
   - Clicking a question toggles its answer; opening one closes any other open answer.
   - Keyboard and screen reader accessible (ARIA attributes, focus management).

3. **Styling**
   - Match the FAQ1 section and starwind-accordion style (rounded, border, transition, etc.).
   - Use project design tokens and CSS variables for consistency.
   - Responsive and mobile-friendly.

4. **Data Source**
   - Accept JSON data structured as:
     ```json
     [
       {
         "question": "What is your refund policy?",
         "answer": "You can request a refund within 30 days of purchase."
       }
     ]
     ```
   - Example data should be included in the prompt for testing.

5. **Integration**
   - Provide clear instructions for importing and using the component.
   - Document expected props and data format.

6. **Extensibility**
   - Allow for optional rich text/markdown in answers.
   - Optionally support icons or status badges next to questions.

---

## Example JSON Data

```json
[
  {
    "question": "What do you mean by 'free updates'?",
    "answer": "All future improvements and new features are included at no extra cost."
  },
  {
    "question": "How do I contact support?",
    "answer": "You can reach us via email or our support portal, 24/7."
  }
]
```

---

## Acceptance Criteria

- The section visually and functionally matches the reference FAQ/accordion.
- Only one answer open at a time; top question open by default.
- Data-driven: adding/removing questions is as simple as editing the JSON.
- Fully accessible and responsive.

---

## Additional Notes

- Reference the following files for implementation details and patterns:
  - `/packages/galaxy/src/components/Faq/Faq1.astro`
  - `/packages/galaxy/src/components/starwind/accordion/Accordion.astro`
  - `/site/src/components/reference/Section__QuestionsAnswers.astro`
  - `/site/src/components/reference/QuestionAnswerDropdown.astro`
- Follow the project’s commenting and documentation standards.
- Include a section for future improvements (e.g., multi-expand mode, search/filter).

---

## Next Steps

- Fill out the prompt file with the above structure.
- Iterate: After initial implementation, review with the team and update the prompt for clarity or new requirements.

## Starter Files

site/src/components/reference/Section__QuestionsAnswers.astro
site/src/components/reference/QuestionAnswerDropdown.astro

## Example Render Pipeline:
`site/src/components/basics/messages/Section__IconHeaderMessage.astro`
`site/src/components/basics/messages/IconHeaderMessage.astro

## Example Prompt to build from:

`content/lost-in-public/prompts/user-interface/Create-a-Simple-Message-Grid.md`

## Example JSON Data Structure

```json
"index": [
  {
    "question": "What is the capital of France?",
    "answer": "Paris"
  },
  {
    "question": "What is the currency of Japan?",
    "answer": "Yen"
  }
]
```   
