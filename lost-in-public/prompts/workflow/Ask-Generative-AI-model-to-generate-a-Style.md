---
title: Ask Generative AI Model to Generate a Style
lede: Generate a custom style object for image requests using a Generative AI model. This prompt is for scripting and API integration workflows.
date_authored_initial_draft: 2025-04-14
date_authored_current_draft: 2025-04-14
date_authored_final_draft: null
date_first_published: null
date_last_updated: null
at_semantic_version: 0.0.0.1
status: To-Do
augmented_with: Windsurf Cascade on Claude 3.5 Sonnet
category: Prompts
date_created: 2025-04-16
date_modified: 2025-04-16
image_prompt: "A generative AI model creating a unique digital style palette, with swirling colors, abstract shapes, and a neural network motif. Visual elements include sliders, color pickers, and a preview of generated styles, symbolizing creative automation."
site_uuid: 68524391-4243-441a-9929-51ef9cf7a888
tags:
  - Workflow
  - Model-APIs
  - API-Integration
  - LLM-Services
authors:
  - Michael Staton
portrait_image: https://img.recraft.ai/swATgqzYfXLzAbXlR1y87pu7d4bhR7Ly9YfP2JEova0/rs:fit:1024:2048:0/raw:1/plain/abs://external/images/d42f96ca-4c3a-47d8-afdc-135a4a28cc67
banner_image: https://img.recraft.ai/hst8IGEMK7eK0JKt4O1YDQi4L6-6ydcr2NnZiX8ryko/rs:fit:2048:1024:0/raw:1/plain/abs://external/images/6d196162-772a-4bad-bb9a-da77f0294f6f
---

# Goal

Generate a custom style for image requests using a Generative AI model.

# Constraints:
- Console log all processes
  - Request sent, including the request body
  - Response received, including the response body
  - Write file output, including the file name and path
- The output must be a valid JSON object, suitable for direct use in image generation APIs.
- The style object must include exactly the fields and structure as specified in the latest sample request/response in the input file: `ai-labs/recraft/generate-image-style-recraft.md`. This input file is the SINGLE SOURCE OF TRUTH for required fields and structure. Do not hardcode or assume fields—always read from the input file.
- All errors, edge cases, and exceptions must be logged to the console with clear error messages.
- The script must validate the response from the AI model before writing output. If invalid, log the error and do not write to file.
- If the output file already exists, append a timestamp to the filename to avoid overwriting.
- The script must include comprehensive comments explaining each major logic block.

# Inputs

## Model API Specifics:
- See: `ai-labs/recraft/generate-image-style-recraft.md` for model-specific instructions, sample payloads, and authentication details.
- Use the provided API endpoint, authentication method, and payload structure as specified in that file.

## Example Request Body
- The request and response structure must always match the latest sample in `ai-labs/recraft/generate-image-style-recraft.md`.
- Do not use or reference static examples here—always refer to the input file for the canonical structure.

# Outputs

- Write the resulting style object to: `ai-labs/recraft/styles-recraft.json`
- If the file exists, create a new file with a timestamp suffix (e.g., `styles-recraft-2025-04-14T20-49-42.json`).
- The output structure must match the canonical structure in `ai-labs/recraft/generate-image-style-recraft.md`.

# Step-by-Step Workflow

1. Read model API instructions and sample payloads from `generate-image-style-recraft.md`.
2. Construct a prompt and request body as shown in the input file.
3. Send the request to the specified AI model API.
4. Log the outgoing request, including the full request body.
5. Log the incoming response, including the full response body.
6. Validate the response for required fields and correct format, based on the input file.
7. Write the validated style object to `styles-recraft.json` (or timestamped variant).
8. Log the file output, including the file name and path.
9. Log and handle all errors, including invalid responses and file write issues.

# Edge Cases
- If the AI model returns an invalid or empty response, log an error and do not write output.
- If the output file already exists, do not overwrite—create a new file with a timestamp.
- If authentication fails, log the error and exit.
- If any required field is missing in the response, log the error and do not write output.

# Documentation
- The script must include comprehensive comments at each major block, explaining the logic and any model-specific considerations.

# Related Files
- Model API instructions & canonical sample: `ai-labs/recraft/generate-image-style-recraft.md`
- Output file: `ai-labs/recraft/styles-recraft.json`

# Example Usage

```shell
python ai-labs/recraft/generate-style-recraft.py
```

---

This prompt is intended to ensure robust, transparent, and reproducible style generation workflows for image APIs. Always use the input file as the single source of truth. ;)
