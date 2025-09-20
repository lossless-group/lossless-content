---
site_uuid: 3b205a7a-830a-4521-a44c-bf0dc159d73e
date_created: 2025-04-18
date_modified: 2025-08-17
aliases: [CD, CI, CI/CD]
---

[[Tooling/Software Development/Developer Experience/Bitbucket]]
[[Tooling/Software Development/Developer Experience/DevOps/Nx|Nx]]
[[Tooling/Software Development/Developer Experience/DevOps/GitKraken|GitKraken]]
[[Tooling/Software Development/Developer Experience/DevOps/GitKraken Desktop|GitKraken Desktop]]
[[Tooling/Software Development/Developer Experience/DevOps/Retcon|Retcon]]


https://youtu.be/NcU0oEk6z8Y?si=jlehpNLVdqz7tazp
https://youtu.be/scEDHsr3APg?si=SM60RuUoihNVWlNt

[[organizations/Perplexity AI|Perplexity AI]] explains [[concepts/Continuous Integration and Continuous Deployment|Continuous Integration and Continuous Deployment]] 
CI/CD stands for **Continuous Integration** and **Continuous Delivery/Deployment**, forming a workflow that automates software development processes, including building, testing, and deploying code. It is a core practice in DevOps, enabling teams to deliver high-quality software quickly and reliably.

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

Sources
[^0fdk8z] What is CI/CD? - GitLab https://about.gitlab.com/topics/ci-cd/
[^ffn0gj] What is CI/CD? - GitHub https://github.com/resources/articles/devops/ci-cd
[^f9g6qd] CI/CD: Continuous Integration & Delivery Explained - Semaphore https://semaphoreci.com/cicd
[^t0t9hq] CI/CD Pipeline : Everything You Need To Know - Spacelift https://spacelift.io/blog/ci-cd-pipeline
[^3lov4a] What Is CI/CD and How Does It Work? - Black Duck https://www.blackduck.com/glossary/what-is-cicd.html
[^srol3w] ELI5: What is CI/CD and Why do we need them? : r/devops - Reddit https://www.reddit.com/r/devops/comments/t5nufe/eli5_what_is_cicd_and_why_do_we_need_them/
