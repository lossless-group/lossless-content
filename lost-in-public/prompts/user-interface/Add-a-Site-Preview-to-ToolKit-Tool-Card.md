---
title: Add a Site Preview to ToolKit Tool Card
lede: Make your site more useful by adding a site preview using HTML iFrames and OpenGraph.io
date_authored_initial_draft: 2025-05-26
date_authored_current_draft: 2025-05-26
date_authored_final_draft: 
date_first_published: 
date_last_updated: 
at_semantic_version: 0.0.0.1
status: To-Do
augmented_with: Windsurf Cascade on Claude 3.5 Sonnet
category: Prompts
date_created: 2025-05-26
date_modified: 2025-07-28
image_prompt: A browser UI frames the scene. On the left, a grid of logos. A hand with glove icon is pressing one of the logos. On the right, the site preview is displayed covering half the other half of the screen. It is the website of the organization with the logo being pressed.
tags: [User-Interface, Open-Graph, API-Integrations]
authors:
  - Michael Staton
banner_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/prompts/2025-05-26_banner_image_Add-a-Site-Preview-to-ToolKit-Tool-Card_d69d157f-ac66-47c0-9218-a1b13a5301fb_rDWyPlvy8.webp
portrait_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/prompts/2025-05-26_portrait_image_Add-a-Site-Preview-to-ToolKit-Tool-Card_382d72db-5553-4a10-9a7b-71a3e149a931_0okw2hpo2.webp
---

Example request:
```javascript
const url =
  "https://opengraph.io/api/1.1/oembed/:site?app_id=xxxxxx";

const fetchData = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

fetchData();
```

Example response:
```json
{
    "height": "Height",
    "width": "Width",
    "version": "1.0",
    "provider_name": "name of site you are requesting",
    "type": "type of embed",
    "html": "HTML for iframe."
}