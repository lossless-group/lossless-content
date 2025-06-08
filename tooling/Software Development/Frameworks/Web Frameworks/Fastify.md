---
site_uuid: 19b8d7f5-906e-4912-a336-114b07ff4b2c
url: 'https://fastify.io/'
zinger: 'Fast and low overhead web framework, for Node.js'
image: 'https://fastify.io/img/logos/fastify-black.svg'
site_name: 'Fast and low overhead web framework, for Node.js'
title: 'Fast and low overhead web framework, for Node.js | Fastify'
favicon: 'https://fastify.dev/img/favicon.ico'
og_screenshot_url: 'https://ik.imagekit.io/xvpgfijuw/uploads/lossless/screenshots/20250529_Fastify_og_screenshot.jpeg'
jina_last_request: '2025-03-09T06:45:19.663Z'
jina_error: 'Error occurred'
og_last_fetch: '2025-05-29T15:30:24.668Z'
date_modified: 2025-06-07
date_created: 2025-03-30
og_image: 'https://fastify.io/img/logos/fastify-black.svg'
og_url: 'https://fastify.io/'
description: 'Fast and low overhead web framework, for Node.js'
tags: [Frameworks, Software-Development, Web-Frameworks]
---

A [[JavaScript]] [[concepts/Explainers for Tooling/Web Frameworks|Web Framework]] that works on [[Tooling/Software Development/Developer Experience/DevTools/Node.js|Node.js]].

In Fastify, "transports" refers to the mechanisms used for routing data and managing the flow of HTTP requests and responses. Fastify's event-driven architecture and schema-based validation contribute to its efficiency and speed in handling these transports. [[1](https://betterstack.com/community/guides/scaling-nodejs/fastify-express/), [1](https://betterstack.com/community/guides/scaling-nodejs/fastify-express/), [2](https://betterstack.com/community/guides/scaling-nodejs/introduction-to-fastify/), [2](https://betterstack.com/community/guides/scaling-nodejs/introduction-to-fastify/)]

  

Here's a more detailed explanation:

- Event-Driven Architecture: Fastify utilizes an event-driven architecture, which means it handles events like request arrival and response sending through a system of callbacks and promises. This architecture allows Fastify to efficiently process large numbers of concurrent requests. [1](https://betterstack.com/community/guides/scaling-nodejs/fastify-express/), [1](https://betterstack.com/community/guides/scaling-nodejs/fastify-express/), [2](https://betterstack.com/community/guides/scaling-nodejs/introduction-to-fastify/), [2](https://betterstack.com/community/guides/scaling-nodejs/introduction-to-fastify/), [3](https://www.okoone.com/technologies/web/fastify/#:~:text=Fastify%20has%20gained%20popularity%20for%20its%20ability,middleware%20execution%20contribute%20to%20its%20outstanding%20performance.), [4](https://fastify.dev/)
- Schema-Based Validation: Fastify supports schema-based validation, which means you can define a schema for your API requests and responses. This schema is used to validate the data received and sent, ensuring that the data conforms to the expected format. This validation process is often performed before and after data is sent or received, enhancing the overall reliability and performance of the application. [1](https://betterstack.com/community/guides/scaling-nodejs/fastify-express/), [1](https://betterstack.com/community/guides/scaling-nodejs/fastify-express/), [2](https://betterstack.com/community/guides/scaling-nodejs/introduction-to-fastify/), [2](https://betterstack.com/community/guides/scaling-nodejs/introduction-to-fastify/), [5](https://tsh.io/blog/fastify-practical-overview/), [6](https://slashdev.io/-guide-to-building-secure-backends-in-fastify-in-2024-2#:~:text=Schema%2Dbased%20validation%20is%20another%20key%20feature%20of,reliability%20and%20reducing%20the%20chance%20of%20errors.), [7](https://github.com/DarrenMa/fastify-typescript-boilerplate-simple#:~:text=Schema%2Dbased:%20Fastify%20uses%20JSON%20Schema%20to%20validate,and%20serialize%20outputs%2C%20improving%20performance%20and%20reliability.)
- Plugin Architecture: Fastify's plugin architecture allows developers to extend its capabilities by adding custom functionalities and features. Plugins can be used to handle various aspects of data transportation, such as routing, middleware, and logging. [1](https://betterstack.com/community/guides/scaling-nodejs/fastify-express/), [1](https://betterstack.com/community/guides/scaling-nodejs/fastify-express/), [2](https://betterstack.com/community/guides/scaling-nodejs/introduction-to-fastify/), [2](https://betterstack.com/community/guides/scaling-nodejs/introduction-to-fastify/)
- Logging: Fastify uses Pino, a fast and efficient logger, to handle logging operations. This logger can be configured to send logs to different destinations, including files, streams, or even other logging services. [2](https://betterstack.com/community/guides/scaling-nodejs/introduction-to-fastify/), [2](https://betterstack.com/community/guides/scaling-nodejs/introduction-to-fastify/), [8](https://leapcell.medium.com/fastify-in-depth-speed-performance-and-scalability-node-js-web-framework-22cfc308791f), [8](https://leapcell.medium.com/fastify-in-depth-speed-performance-and-scalability-node-js-web-framework-22cfc308791f), [9](https://github.com/fastify/fastify/issues/3950), [9](https://github.com/fastify/fastify/issues/3950)
- Built-in Features: Fastify includes built-in features like efficient logging, JSON schema validation, and middleware support, which help in managing data flow and processing requests. [1](https://betterstack.com/community/guides/scaling-nodejs/fastify-express/), [1](https://betterstack.com/community/guides/scaling-nodejs/fastify-express/), [2](https://betterstack.com/community/guides/scaling-nodejs/introduction-to-fastify/), [2](https://betterstack.com/community/guides/scaling-nodejs/introduction-to-fastify/)

  

_AI responses may include mistakes._

[1] [https://betterstack.com/community/guides/scaling-nodejs/fastify-express/](https://betterstack.com/community/guides/scaling-nodejs/fastify-express/)

[2] [https://betterstack.com/community/guides/scaling-nodejs/introduction-to-fastify/](https://betterstack.com/community/guides/scaling-nodejs/introduction-to-fastify/)

[3] [https://www.okoone.com/technologies/web/fastify/](https://www.okoone.com/technologies/web/fastify/#:~:text=Fastify%20has%20gained%20popularity%20for%20its%20ability,middleware%20execution%20contribute%20to%20its%20outstanding%20performance.)

[4] [https://fastify.dev/](https://fastify.dev/)

[5] [https://tsh.io/blog/fastify-practical-overview/](https://tsh.io/blog/fastify-practical-overview/)

[6] [https://slashdev.io/-guide-to-building-secure-backends-in-fastify-in-2024-2](https://slashdev.io/-guide-to-building-secure-backends-in-fastify-in-2024-2#:~:text=Schema%2Dbased%20validation%20is%20another%20key%20feature%20of,reliability%20and%20reducing%20the%20chance%20of%20errors.)

[7] [https://github.com/DarrenMa/fastify-typescript-boilerplate-simple](https://github.com/DarrenMa/fastify-typescript-boilerplate-simple#:~:text=Schema%2Dbased:%20Fastify%20uses%20JSON%20Schema%20to%20validate,and%20serialize%20outputs%2C%20improving%20performance%20and%20reliability.)

[8] [https://leapcell.medium.com/fastify-in-depth-speed-performance-and-scalability-node-js-web-framework-22cfc308791f](https://leapcell.medium.com/fastify-in-depth-speed-performance-and-scalability-node-js-web-framework-22cfc308791f)

[9] [https://github.com/fastify/fastify/issues/3950](https://github.com/fastify/fastify/issues/3950)