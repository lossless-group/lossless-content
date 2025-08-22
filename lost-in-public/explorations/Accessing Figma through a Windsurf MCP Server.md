---
title: Accessing Figma through a Windsurf MCP Server
lede: Interact with Figma Designs while building an application, straight from the IDE
date_authored_initial_draft: 2025-03-19
date_authored_current_draft: 2025-03-31
date_authored_final_draft: "[]"
date_first_published: "[2025-04-12]"
date_last_updated: "[]"
at_semantic_version: 0.0.0.1
status: To-Do
augmented_with: Windsurf Cascade with SWE-1
tags: [Explorations, Model-Context-Protocols]
authors:
  - Michael Staton
date_created: 2025-03-20
date_modified: 2025-08-22
site_uuid: d579c50d-ba11-4085-87e6-6487c8b22218
slug: accessing-figma-through-a-windsurf-mcp-server
image_prompt: A startup nerd and a robot are speeding away in a convertible like outlaws from the Figma corporate headquarters. In the back seat are components and ui designs, some flying in the wind in their wake.
banner_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/july/Accessing_Figma_through_a_Windsurf_MCP_Server_banner_image_1755821574655_6GSh-ggE3.webp
portrait_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/july/Accessing_Figma_through_a_Windsurf_MCP_Server_portrait_image_1755821568159_FK6HJ80_4.webp
square_image: https://ik.imagekit.io/xvpgfijuw/uploads/lossless/july/Accessing_Figma_through_a_Windsurf_MCP_Server_square_image_1755821564555_gXts6lDsrW.webp
---


session-open::'2025-03-19T04:51:05.362Z'

1. Found what seems to be the standard MCP server, even though it doesn't look like it: [figma-mcp](https://github.com/MatthewDailey/figma-mcp?tab=readme-ov-file)
2. Per instructions, downloaded Claude to native MacOS Desktop. 
3. Per instructions, created a Figma API Key.
4. Per instructions, ran the bash command below:

```bash
echo '{
  "mcpServers": {
    "figma-mcp": {
      "command": "npx",
      "args": ["figma-mcp"],
      "env": {
        "FIGMA_API_KEY": "<YOUR_API_KEY>"
      }
    }
  }
}' > ~/Library/Application\ Support/Claude/claude_desktop_config.json
```
5. Of my own initiative, created a `.windsurf` dir in root, added a `.env.mcp` file with both Figma and Anthropic API Keys.  

SCRATCH THAT
1. Went to Windsurf Settings in the top menu bar.
2. Clicked on Windsurf Settings option next in. 
3. Clicked to create an MCP Server.
4. Clicked create Figma MCP Server.
5. Added Figma API Key. 

Now, I have the following API endpoints:
Available functions:
`add_figma_file`: Add a Figma file to your context
`view_node`: Get a thumbnail for a specific node in a Figma file
`read_comments`: Get all comments on a Figma file
`post_comment`: Post a comment on a node in a Figma file
`reply_to_comment`: Reply to an existing comment in a Figma file

Of these, for this Lossless content site, I think `view_node` will be quite useful!

session-close::'2025-03-19T04:51:05.362Z'

https://youtu.be/6G9yb-LrEqg?si=7bk-GatMg64Ow1FI

https://youtu.be/X-aX1TuGP0s?si=wJiAgV4x5nyKgvYL