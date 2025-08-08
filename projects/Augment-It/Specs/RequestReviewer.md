---
tags: [Specifications]
date_created: 2025-02-24
date_modified: 2025-07-24
site_uuid: bda6e819-a071-4622-84d6-c2967c187169
publish: true
title: PromptReviewer
slug: prompt-reviewer
at_semantic_version: 0.0.0.1
---

## Purpose
The [[projects/Augment-It/Specs/RequestReviewer|RequestReviewer]] is a [[Microfrontend Architecture|Microfrontend]] that gives users the ability to review the selected prompt from the [[projects/Augment-It/Specs/PromptTemplateManager|PromptTemplateManager]] filled with variables from the [[projects/Augment-It/Specs/RecordCollector|RecordCollector]]

# Shared Components
[[projects/Augment-It/Specs/shared-ui-elements/SharedModalWrapper|SharedModalWrapper]]


## Custom Components
[[mdxRenderer]]
[[yamlEditor]]
[[variableManager]]



# Prompt: Creating an AI API Connector Component

## Overview

Create a robust AI Model API connector component for a React application that interfaces with multiple AI models (GPT-4, Claude, Perplexity). The component should handle authentication, request formatting, response parsing, and error handling for each supported AI model.

## Requirements

1. Create a modular system that supports multiple data providers, such as Databricks, Salesforce, NocoDB, Baserow. 
2. Implement proper authentication using API keys stored in the application state
3. Support different request formats for each AI model
4. Handle response parsing with appropriate error handling
5. Allow for customization of request parameters
6. Provide a clean interface for the rest of the application to use

## Component Structure

The connector should consist of:

1. A core connector module that handles common functionality
2. Model-specific handlers for each supported AI model
3. TypeScript interfaces for request/response types
4. A configuration system for API keys and endpoints

## Detailed Specifications

### Core Connector Module

Create a main connector module that:

- Accepts a model ID, prompt content, and optional configuration
- Routes requests to the appropriate model-specific handler
- Implements retry logic and timeout handling
- Returns standardized response objects
- Provides proper error handling and messaging

### Model-Specific Handlers

For each supported AI model (GPT-4, Claude, Perplexity), create handlers that:

1. Format requests according to the model's API specifications
2. Parse responses into a standardized format
3. Handle model-specific error cases
4. Support model-specific features

### Authentication System

Implement a secure authentication system that:

- Retrieves API keys from the application state
- Validates API keys before making requests
- Provides clear error messages for authentication failures
- Supports updating API keys without requiring application restart

### Request Templates

Create a template system that:

- Allows for customization of request parameters
- Supports both JSON and JavaScript function formats
- Properly interpolates the prompt content into the request
- Validates templates before use

### Response Handling

Implement response handling that:

- Parses JSON responses when appropriate
- Extracts relevant content from model responses
- Handles streaming responses if supported
- Provides usage statistics (tokens, etc.)

### Error Handling

Create comprehensive error handling that:

- Distinguishes between different types of errors (network, authentication, model-specific)
- Provides clear error messages for debugging
- Logs errors appropriately
- Allows for graceful recovery when possible

### Core Interfaces

Define TypeScript interfaces for:

1. AI model configuration
2. Request parameters
3. Response objects
4. Error types
5. Usage statistics

### Integration with Application State

The connector should:

1. Access API keys from the application's state management (Zustand)
2. Store and retrieve request templates from state
3. Update the application state with response data
4. Provide status updates during request processing

## Example Usage

The connector should be usable like this:

```
// Example usage in a component
const generateResponse = async (prompt: string, modelId: string) => {
  try {
    const response = await aiConnector.generateResponse({
      modelId,
      prompt,
      options: {
        temperature: 0.7,
        maxTokens: 1000
      }
    });
    
    // Handle successful response
    updateState(response);
  } catch (error) {
    // Handle error
    showError(error.message);
  }
};
```

## Testing Considerations

The connector should be designed with testability in mind:

1. Pure functions where possible
2. Dependency injection for external services
3. Mocking points for API calls
4. Clear error states for validation

## Current Model Specifications

### GPT-4

- Endpoint: `https://api.openai.com/v1/chat/completions`
- Authentication: Bearer token
- Request format: JSON with messages array
- Response format: JSON with choices and usage statistics

### Claude

- Uses Anthropic SDK
- Authentication: API key
- Request format: Messages with user/assistant roles
- Response format: Content array with text

### Perplexity

- Endpoint: `https://api.perplexity.ai/chat/completions`
- Authentication: Bearer token
- Request format: JSON with messages array
- Response format: JSON with choices and citations
- Current model: "sonar-medium-chat" (not "pplx-7b-chat")

## Important Implementation Notes

1. Ensure proper error handling for network issues
2. Implement request validation before sending
3. Handle rate limiting and retry logic
4. Support cancellation of in-flight requests
5. Provide detailed error messages for debugging
6. Use TypeScript for type safety
7. Follow best practices for async/await patterns
8. Implement proper logging for debugging

This component should be designed to be maintainable, extensible, and robust, allowing for easy addition of new AI models in the future while providing a consistent interface for the rest of the application.


