---
tags: [Specifications]
date_created: 2025-02-24
date_modified: 2025-07-24
---
Similar to [[Tooling/AI-Toolkit/AI Interfaces/AI Workspaces/Adaline AI|Adaline AI]]

[[Vocabulary/Loosely Coupled Monolith|Loosely Coupled Monolith]]


Let's build a monorepo called "Data Augmenter."

## Situation
Situation: I am a designer and developer needing to use AI Models to augment data that my company has on customers, and to make use of that data in various workflows of different teams. 

## Context
The company has been operating for 90 years. Therefore, they have used different information technology services over time. The result is that their data is not creating as much value as it could. Different systems were set up differently, thus databases with tables exist describing the same real world, yet have inconsistent data models. Records are often incomplete, and sometimes inaccurate. Record properties that are Strings use inconsistent syntax. Filesystems and file generating applications have also evolved, so files also have inconsistency in their syntax, format, and default application.

This has revealed a broader need for people and organizations to augment and manipulate their data records with AI. Then, transform resulting data, content, and information so that it may be pushed into applications serving functional teams, such as Sales, Customer Support, Marketing, User Research, and Product Management. 

## Action
Keeping the context in mind, let's start with an application that scaffolds the following workflow:
As an individual user in a Private Workspace or as a team member in a Team Workspace:
1. Query available records through various APIs, or upload records in files of various formats. 
	1. If no records are available in the Team Workspace or Private Workspace, the user may:
		1. In the context of either the user's Private Workspace or in the Team Workspace, submit and save necessary API keys, endpoints, urls, and sample code to make an API call.
		2. Upload a file of records from recommended formats. 
	2. Generate and refine variable names that call record properties.
	3. Create computed properties from existing record properties.
	4. Transform properties so that property values are in a common format. 
2. Select a target record or a batch of target records:
	1. Browse by scrolling through a list of records.
	2. Search records by fuzzy matching a search value to select property values.
	3. Filter records to narrow the list of records to those that meet a certain condition or have some common property value. 
3. Select and approve, modify, or create a new Prompt that inserts variables from selected records.
	1. Browse by scrolling available prompts created by the current user, or in the current Team Workspace
	2. Search available prompts by fuzzy matching metadata or string matches within the prompt body text.
	3. Filter available prompts to narrow the list of prompts to those that meet a certain condition or string have fuzzy string matches within the prompt body text.
	4. Append prompts to one another, making a combined prompt file. 
	5. If no relevant prompt exists, create a new prompt from scratch, modify a selected prompt through a Prompt Editor ( a put operation, updating an existing prompt from the data store ), or branch a selected prompt (the user leaves the selected prompt intact and saved with no updates, but creates a new prompt by editing the content of the selected prompt)
		1. Make any prompts created available to any Team Workspace they are a part of. 
4. Review the prompt with inserted interpolated variables from selected records to assure accuracy and legibility. 
	1. If inaccurate or illegible, the user launches a Prompt Editor to edit the prompt. 
	2. The user may also use the shared Record Model Editor to change the syntax of keys for record properties. 
5. Select from available AI Model API calls, WebCrawler API calls, or create new AI Model API calls and WebCrawler API calls.
	1. See any AI Model API calls made available through the Team Workspace or from the user's Private Workspace. 
		1. If no AI model APIs are set up, the user is cued to add some with the ability to create one: to specify the URL, the API Key, and add any code snippets or examples that may help refine an accurate API call.
		2. The user can make APIs they set up available to any of their Team Workspaces, or keep them just to their Private Workspace.
	2. See any WebCrawler APIs made available through the Team Workspace or from the user's Private Workspace. 
		1. If no WebCrawler APIs are set up, the user is cued to add some with the ability create one: to specify the URL, the API Key, and add any code snippets or examples that may help refine an accurate API call.
		2. The user can make APIs they set up available to any of their Team Workspaces, or keep them just to their Private Workspace.
6. Review responses from AI Model and/or WebCrawler APIs.
	1. Scroll downward through a list of response content previews within the current workspace.
		1. See metadata for each response, including the user, prompt, and API that created the response object, as well as it's creation time. 
	2. Each response object will default to be saved to a database, however the user can delete response objects. 
	3. From each response object, the user can make highlights of the raw data. These highlights are saved as strings into State.
		1. The user can remove or change the scope of the highlight. 
		2. If the user changes the scope of the highlight, State is updated.
		3. Metadata is attached to each highlight, including userId, workspaceId, recordId, promptId, responseSourceId, and responseDataId, {highlightStartPoint, highlightEndPoint}
	4. The user may click a Save and Collect button, which sends all highlights and their metadata to the database for data storage. 
7. Makes sense of their highlights -- turning them into insights. The user will: 
	1. Select from target systems or apps to push their insights into via API Call.  
		1. If there are no target systems, the user is cued to add one or more API Call options.  This will pop up an API Call editor, which asks the user to input an API key, an API link, and an any sample code that will help the app make successful API calls to push data into other systems. 
	2. The user is cued to input another prompt into an MDX editor component. 
		1. The context clues for the user says "Get value out of your highlights. Choose a target app, review their data formats. Write a prompt to ask AI to Summarize, Sense Make, or Format your data." Then, the user:
	3. Writes what they believe to be the appropriate prompt. 
	4. May attach any additional contextual data as files.
	5. Selects from the appropriate AI Model. 
	6. Sends the prompt to the AI Model.  
	7. The AI model should return a response object with the following: 
		1. a summary of the highlights, 
		2. an analysis or sense making of the highlights, 
		3. and a JSON object of key value pairs for any numbers, statistics, names, or time series data that may be important to save in addition to the the main content. 
	8. The user then sees a button that "Send to" and an icon representing the Target API call. 
		1. The data is then sent to the target system, and if there is a callback response the callback of success or error is shown to the user.  


#### Context on API Integrations
Customer records are currently in Salesforce, though the company has many other systems and applications with customer records. All of their data is being pulled into Databricks. Given that both of these systems are messy, there may be other systems to connect to. 

The resulting data from our Data Augmentation Flow will need to be pushed into Salesforce, ProductBoard, and Dovetail.  

#### Expanded Vision: 

We also want to use code generation AI to help develop the monorepo so that others might use it.  

## Role
You, the code generation AI, are a monorepo architect. 



