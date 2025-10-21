---
site_uuid: 3b205a7a-830a-4521-a44c-bf0dc159d73e
date_created: 2025-04-18
date_modified: 2025-10-17
aliases: [CD, CI, CI/CD, Continuous Integration, Continuous Delivery]
publish: true
title: "Continuous Integration and Continuous Delivery"
slug: continuous-integration-and-continuous-delivery
at_semantic_version: 0.0.0.1
---

:::tool-showcase
- [[Tooling/Software Development/Developer Experience/Bitbucket|Bitbucket]]
- [[Tooling/Software Development/Developer Experience/DevOps/Nx|Nx]]
- [[Tooling/Software Development/Developer Experience/DevOps/GitKraken|GitKraken]]
- [[Tooling/Software Development/Developer Experience/DevOps/GitKraken Desktop|GitKraken Desktop]]
- [[Tooling/Software Development/Developer Experience/DevOps/Retcon|Retcon]]
- [[Tooling/Software Development/Developer Experience/DevOps/CircleCI|CircleCI]]
- [[Tooling/Software Development/Developer Experience/DevOps/Jenkins|Jenkins]]
- [[Tooling/Software Development/Developer Experience/DevOps/Bamboo]]
:::

# What is CI/CD?

https://youtu.be/NcU0oEk6z8Y?si=jlehpNLVdqz7tazp
https://youtu.be/scEDHsr3APg?si=SM60RuUoihNVWlNt

>![LLM-Response] [[organizations/Perplexity AI|Perplexity AI]] explains [[concepts/Continuous Integration and Continuous Delivery|Continuous Integration and Continuous Delivery]] 

CI/CD stands for **Continuous Integration** and **Continuous Delivery/Deployment**, forming a workflow that automates software development processes, including building, testing, and deploying code. It is a core practice in [[Vocabulary/Dev Ops|DevOps]], enabling teams to deliver high-quality software quickly and reliably.

![CI/CD Visual](https://spacelift.io/_next/image?url=https%3A%2F%2Fspaceliftio.wpcomstaging.com%2Fwp-content%2Fuploads%2F2022%2F06%2F74.cicd-pipeline.png&w=1920&q=100)

### Key Components
1. **Continuous Integration (CI)**:
   - Developers frequently merge code changes into a shared repository.
   - Automated builds and tests are triggered to catch errors early, ensuring code quality and reducing conflicts. [^0fdk8z] [^ffn0gj] [^f9g6qd]

2. **Continuous Delivery (CD)**:
   - Extends CI by automating the release of tested code to production-like environments.
   - Human approval is typically required before deploying to production. [^ffn0gj] [^f9g6qd]

3. **Continuous Deployment**:
   - Fully automates the deployment process, releasing code to production as soon as it passes all tests. [^ffn0gj] [^t0t9hq]

### Benefits
- **Automation**: Reduces manual intervention, minimizes errors, and speeds up releases.
- **Faster Feedback**: Quick identification of bugs ensures faster resolution.
- **Scalability**: Supports growing teams and complex projects efficiently.
- **Improved Quality**: Rigorous testing ensures stable and reliable software. [^0fdk8z] [^f9g6qd] [^t0t9hq]

### Workflow Example
1. Code changes are committed to a version control system (e.g., Git).
2. Automated builds and tests run in the CI pipeline.
3. Successful builds move to the CD stage for deployment or staging.
4. Final deployment is either automated (continuous deployment) or manually approved (continuous delivery). [^ffn0gj] [^t0t9hq] 

CI/CD streamlines software development, enabling frequent, reliable updates while maintaining quality.



***
> [!info] **Perplexity Query** (2025-10-17T15:10:57.272Z)
> **Question:**
> What are the tools that DevOps and Platform Engineering teams use to achieve CI/CD?
> 
> **Model:** sonar-pro
> 

DevOps and Platform Engineering teams rely on a diverse ecosystem of CI/CD tools to automate software delivery pipelines, accelerate development cycles, and maintain code quality. These tools have become essential infrastructure components that enable teams to integrate code changes continuously, run automated tests, and deploy applications reliably across various environments. [^f0g0l3]

## Core CI/CD Platforms

**Jenkins** remains one of the most widely adopted tools, functioning as an open-source automation server that's highly customizable and supports building, deploying, and automating software development projects across virtually any platform. [^f0g0l3] Its extensive plugin ecosystem allows teams to integrate with countless other tools and services.

**GitLab CI/CD** provides robust capabilities integrated directly within the GitLab platform, managing Git-based application software development lifecycles. It enables teams to automatically build and test code while supporting continuous deployment, with code branching, scanning, and testing tools that use a Git repository as the single source of truth for GitOps projects. [^8y2ikw] The platform is particularly valuable for teams seeking an all-in-one solution.

![Relevant diagram or illustration related to the topic](https://cms-cdn.katalon.com/board_02746fc275.png)

**GitHub Actions** has emerged as a powerful option for teams already embedded in the GitHub ecosystem, using YAML files to define workflows that automate processes from building and testing to deploying code. [^xqxp7m] Its deep integration with GitHub repositories eliminates the need for third-party services, reducing complexity while ensuring tight coupling with version control.

**CircleCI** stands out for its speed and ease of use, offering powerful CI/CD capabilities with excellent integration support for GitHub, Bitbucket, and other version control systems. [^f0g0l3] The platform excels at providing quick feedback loops for development teams.

## Enterprise and Cloud-Native Solutions

**Azure DevOps** delivers Microsoft's comprehensive CI/CD pipeline solution, integrating seamlessly with Azure services while offering a complete range of tools for planning, developing, and delivering software. [^f0g0l3] This makes it particularly attractive for organizations invested in the Microsoft ecosystem.

**Bamboo**, developed by Atlassian, integrates seamlessly with other Atlassian products like Jira and Bitbucket, providing a comprehensive CI/CD solution that fits naturally into existing Atlassian workflows. [^f0g0l3]

![Practical example or use case visualization](https://cdn.prod.website-files.com/619e15d781b21202de206fb5/64a26311503b6832fdd2ce50_Exploring-the-Top-CICD-Tools-for-DevOps-1280x720-_1_.webp)

**TeamCity** by JetBrains integrates deeply with popular IDEs including IntelliJ, PHPStorm, and PyCharm, making it ideal for developers already invested in the JetBrains ecosystem. [^ral437] While predominantly a CI tool, its extensive plugin range enables easy connection to different cloud providers and deployment platforms, with support for orchestrating hundreds of build agents for highly scalable operations. [^ral437]

## Modern GitOps and Cloud-Native Tools

**Codefresh** functions as a SaaS continuous delivery solution designed to simplify GitOps implementation for cloud-native applications. Powered by Argo, it provides a convenient management layer that enables teams to efficiently create delivery pipelines from reusable templates and inheritable components. [^ral437] The platform supports advanced deployment strategies including canary releases and blue/green deployments, with detailed dashboards for pipeline performance and deployment tracking. [^ral437]

**Harness** distinguishes itself as an AI-native software delivery platform offering git-based repositories, hosted CI/CD pipelines, and various DevOps-related tools. [^f0g0l3] It automatically detects code quality and performance issues, enabling automatic rollbacks while providing analytics and notifications, with support for SSO and OAuth. [^8y2ikw]

![Additional supporting visual content](https://www.simform.com/wp-content/uploads/2022/05/DevOps-Toolchain.png)

**Spinnaker** serves as a continuous delivery platform that manages multi-cloud code changes and builds testing and deployment pipelines, with the capability to configure pipelines that launch other pipelines. [^8y2ikw] It enables container image building and deployment, rollouts, and rollbacks while integrating with monitoring services like Prometheus and Stackdriver. [^8y2ikw]

## Open-Source and Specialized Tools

**GoCD** offers pipeline-as-code capabilities, defining pipelines in YAML/JSON for version control and easy sharing. [^ral437] It provides value stream mapping to visualize workflows and identify bottlenecks, native artifact management for sharing and reusing build artifacts, and secure environment management for handling environment-specific variables and configurations. [^ral437] As a free, open-source solution, it provides extensive flexibility through its plugin system that integrates with Git, Docker, and Kubernetes. [^ral437]

**Travis CI** remains popular among open-source projects as a cloud-based CI/CD tool that automates testing and deployment processes. [^f0g0l3]

**Bitbucket Pipelines** provides integrated automation directly within Bitbucket, offering a simple yet powerful way to automate code testing and deployment from Bitbucket repositories. [^f0g0l3]

## Selection Criteria for 2025

When choosing CI/CD tools, teams should prioritize **automation capabilities** that extend beyond just builds and tests to include deployments. **Integration compatibility** with version control systems, issue trackers, and the broader development ecosystem is critical. [^f0g0l3] Modern tools increasingly leverage **AI-powered workflows** to speed up delivery times and reduce workloads, making built-in AI a growing requirement. [^f0g0l3] Additionally, **scalability and performance** become crucial as teams grow and projects increase in complexity, requiring tools that handle increased workloads without sacrificing speed or efficiency. [^f0g0l3]

# Sources
***
[^0fdk8z]: [What is CI/CD? - GitLab](https://about.gitlab.com/topics/ci-cd/)
[^ffn0gj]: [What is CI/CD? - GitHub](https://github.com/resources/articles/devops/ci-cd)
[^f9g6qd]: [CI/CD: Continuous Integration & Delivery Explained - Semaphore](https://semaphoreci.com/cicd)
[^t0t9hq]: [CI/CD Pipeline : Everything You Need To Know - Spacelift](https://spacelift.io/blog/ci-cd-pipeline)
[^3lov4a]: [What Is CI/CD and How Does It Work? - Black Duck](https://www.blackduck.com/glossary/what-is-cicd.html)
[^srol3w]: [ELI5: What is CI/CD and Why do we need them? : r/devops - Reddit](https://www.reddit.com/r/devops/comments/t5nufe/eli5_what_is_cicd_and_why_do_we_need_them/)


### Citations

[1]: 2025, Oct 17. [12 Best CI/CD tools that keep on crushing it in 2025](https://pieces.app/blog/best-ci-cd-tools). Published: 2025-05-29 | Updated: 2025-10-17

[^ral437]: 2025, Oct 17. [16 Top Continuous Delivery Tools for 2025 - Spacelift](https://spacelift.io/blog/continuous-delivery-tools). Published: 2025-03-31 | Updated: 2025-10-17

[^f0g0l3]: 2025, Oct 17. [Top 10 CI/CD Tools for DevOps and Developers - Orca Security](https://orca.security/resources/blog/top-10-ci-cd-tools-devops/). Published: 2024-11-20 | Updated: 2025-10-17

[4]: 2025, Oct 17. [The State of CI/CD in 2025: Key Insights from the Latest JetBrains ...](https://blog.jetbrains.com/teamcity/2025/10/the-state-of-cicd/). Published: 2025-10-06 | Updated: 2025-10-17

[5]: 2025, Oct 17. [10 Best DevOps Platforms to Know in 2025 - Devtron](https://devtron.ai/blog/10-best-devops-platforms-to-know-in-2025/). Published: 2025-04-16 | Updated: 2025-10-17

[^8y2ikw]: 2025, Oct 17. [All the DevOps Tools You'll Ever Need [2025 Guide] - Codefresh](https://codefresh.io/learn/devops-tools/). Published: 2025-05-14 | Updated: 2025-10-17

[7]: 2025, Oct 17. [Jenkins alternatives in 2025: CI/CD tools that won't frustrate DevOps ...](https://northflank.com/blog/jenkins-alternatives-2025). Published: 2025-02-24 | Updated: 2025-10-17

[^xqxp7m]: 2025, Oct 17. [8 Best CI/CD Tools for DevOps Engineers in 2025 - Firefly](https://www.firefly.ai/academy/8-best-ci-cd-tools-for-devops-engineers-in-2025). Published: 2025-07-15 | Updated: 2025-10-17

[9]: 2025, Oct 10. [Best Kubernetes CI/CD Tools: Top 8 Solutions In 2025 |](https://octopus.com/devops/kubernetes-deployments/kubernetes-ci-cd-tools/). Published: 2025-06-04 | Updated: 2025-10-10



***
