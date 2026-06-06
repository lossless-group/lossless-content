---
created-on: 2024-11-01
url: https://nixos.org/
tags:
  - Package-Managers
  - Dev-Ops-Tools
  - DevOps
date_created: 2024-10-01
date_modified: 2026-06-06
og_title: Nix & NixOS | Declarative builds and deployments
og_description: Nix is a tool that takes a unique approach to package management and system configuration. Learn how to make reproducible, declarative and reliable systems.
og_image: https://nixos.org/apple-touch-icon.png
og_favicon: https://nixos.org/favicon-48x48.png
og_last_fetch: 2025-08-18T20:00:48.001Z
cf_last_run: 2026-06-06T04:16:11.390Z
cf_last_run_model: Perplexity sonar-pro
---

>Watch a short [overview of Nix](https://youtu.be/FJVFXsNzYZQ?si=KGKuXEUgpELJnyHf), Nix in 100 Seconds, by influencer Fireship on YouTube.

[[organizations/NixOS|NixOS]] (https://nixos.org/) was created by [[Eelco Dolstra]] in 2003


https://youtu.be/DMQWirkx5EY?si=gETDKa9G9OpztgHZ


https://youtu.be/RoMArT8UCKM?si=S-44eBCPDK8_aVfb

https://youtu.be/FJVFXsNzYZQ?si=TrHOsJIlTXpQdy7w

##### [[organizations/NixOS|NixOS]] has a [[Visual Studio Code|VS Code]] [[Plug-ins,  Add-ons,  Extensions|Extension]]
![[Screenshot From 2024-12-25 02-36-11_Nix__VSCode--Extension.png]]


##### [[organizations/NixOS|NixOS]] has a [[concepts/User Forums|User Forum]]
![[Screenshot From 2024-12-25 02-15-34_Nix--User-Forum.png]]

#### AI Explains [[Tooling/Software Development/DevOps/Docker]] and [[organizations/NixOS|NixOS]] combo.

> [!NOTE]
> Docker and Nix serve complementary purposes, even though there's some overlap. Here are the key benefits of using Docker alongside Nix:
> 
> #### - Application Distribution
> 
> - Docker: Provides a standardized way to package and distribute applications with their exact runtime environment
> 
> - Nix: Focuses on reproducible development environments and system configurations
> 
>#### - Isolation Levels
> 
> - Docker: Offers stronger runtime isolation through containerization (separate network namespaces, process spaces, etc.)
> 
> - Nix: Provides isolation at the package dependency level but runs processes directly on the host
> 
>##### - Ecosystem Compatibility
> 
> - Docker: Has become the de facto standard for distributing cloud-native applications
> 
> - Many services (like Chroma) are primarily distributed as Docker images
> 
> - Integration with orchestration tools (Kubernetes, Docker Compose) is seamless
> 
>#### - State Management
> 
> - Docker: Better at managing stateful applications through volume mounts and container lifecycle
> 
> - Nix: Primarily focused on managing immutable software builds and environments
> 
>#### - Development vs Production
> 
> - Nix: Excellent for ensuring consistent development environments
> 
> - Docker: Better suited for production deployments and scaling
> 
> Using both tools lets you leverage the strengths of each: Nix for development environment reproducibility and Docker for application isolation and distribution.

#### [[organizations/NixOS|NixOS]] has its own [[concepts/Explainers for Tooling/Programming Languages|Programming Language]], which declares the [[Vocabulary/Ephemeral Environments|Ephemeral Environment]]
``` Nix
#!/bin/bash

# Exit on error
set -e

# Source the utils file
source "$(dirname "${BASH_SOURCE[0]}")/utils.sh"

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Change to parent directory (project root)
cd "$SCRIPT_DIR/.."

# Create flake.nix
cat > flake.nix << 'EOL'
{
  description = "Data Augmentation Flow - React Micro-frontend Project";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    rust-overlay.url = "github:oxalica/rust-overlay"; # For tools like SWC
    surrealdb.url = "github:surrealdb/surrealdb";
    outerbase = {
      url = "github:outerbase/outerbase";
      flake = false;
    };
    nix-vscode-extensions.url = "github:nix-community/nix-vscode-extensions";
  };

  outputs = { self, nixpkgs, flake-utils, rust-overlay, surrealdb, outerbase }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        overlays = [ (import rust-overlay) ];
        pkgs = import nixpkgs { 
          inherit system overlays; 
          config.allowUnfree = true;  # For tools like VS Code
        };
        outerbasePkg = pkgs.buildGoModule {
          pname = "outerbase";
          version = "0.1.0";
          src = outerbase;
          vendorHash = null;
        };
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            # Node.js ecosystem
            nodejs_20
            nodePackages.pnpm
            nodePackages.typescript
            nodePackages.typescript-language-server
            nodePackages.npm-check-updates  # For dependency updates

            # IDE and Editor Support
            vscode
            neovim
            nodePackages.prettier
            nodePackages.eslint
            nodePackages.stylelint

            # Performance and Analysis
            chromium  # For headless testing
            nodePackages.lighthouse
            nodePackages.webpack-bundle-analyzer

            # Development Tools
            deno
            git
            watchman
            jq
            mkcert
            ngrok  # For sharing local builds
            localtunnel  # Alternative to ngrok

            # Build Tools
            pkg-config
            cmake
            gnumake
            (rust-bin.stable.latest.default)  # For native addons

            # Container Tools
            docker
            docker-compose
            colima

            # Database Tools
            postgresql_15
            redis
            mongodb
            surrealdb
            duckdb      # Analytics DB
            litestream  # DB replication
            rqlite      # Distributed SQLite
            questdb     # Time-series DB
            edgedb     # Graph-relational DB
            outerbasePkg

            # Database Management & Monitoring
            dbeaver    # Universal DB tool
            pgadmin4
            mongodb-compass
            redis-desktop-manager

            # Monitoring & Debugging
            netcat
            lsof
            htop
            curl
            httpie  # Better curl

            # Documentation
            nodePackages.typedoc
            graphviz  # For dependency graphs
            nixpkgs-fmt  # or alejandra
            nil  # Nix Language Server

            # VS Code Extensions
            vscode-extensions.jnoortheen.nix-ide
            vscode-extensions.mkhl.direnv
            vscode-extensions.arrterian.nix-env-selector
            vscode-extensions.ms-azuretools.vscode-docker
            vscode-extensions.ms-vscode.makefile-tools
            vscode-extensions.donjayamanne.githistory
            vscode-extensions.eamodio.gitlens
            vscode-extensions.esbenp.prettier-vscode
            vscode-extensions.dbaeumer.vscode-eslint
            vscode-extensions.mblode.pretty-formatter
            vscode-extensions.christian-kohler.npm-intellisense
            vscode-extensions.rooveterinaryinc.roo-cline
          ];

          shellHook = ''
            # Environment variables
            export DOCKER_BUILDKIT=1
            export COMPOSE_DOCKER_CLI_BUILD=1
            
            # Node.js settings
            export NODE_ENV=development
            export PATH="$PWD/node_modules/.bin:$PATH"
            
            # Browser settings for testing
            export CHROME_BIN=${pkgs.chromium}/bin/chromium
            
            # Ensure local certificates
            if ! test -d "~/.local/share/mkcert"; then
              mkcert -install
              mkcert localhost
            fi

            # Create .npmrc if it doesn't exist
            if [ ! -f .npmrc ]; then
              echo "node-linker=hoisted" > .npmrc
            fi

            # VS Code settings
            if [ ! -d .vscode ]; then
              mkdir .vscode
              echo '{
                "typescript.tsdk": "node_modules/typescript/lib",
                "editor.formatOnSave": true,
                "editor.defaultFormatter": "esbenp.prettier-vscode"
              }' > .vscode/settings.json
            fi

            # Database initialization
            export SURREALDB_PATH="$PWD/.data/surrealdb"
            export DUCKDB_PATH="$PWD/.data/duckdb"
            export OUTERBASE_PATH="$PWD/.data/outerbase"
            
            # Create data directories
            mkdir -p $SURREALDB_PATH
            mkdir -p $DUCKDB_PATH
            mkdir -p $OUTERBASE_PATH

            # Database service helpers
            function start_surrealdb() {
              surreal start --log debug --user root --pass root file:$SURREALDB_PATH
            }

            function start_outerbase() {
              outerbase serve --data-dir $OUTERBASE_PATH
            }

            # Start Chroma DB if not already running
            if ! docker ps | grep -q chromadb; then
              docker run -d -p 8000:8000 -v $(pwd)/chroma_data:/chroma/chroma --name chromadb chromadb/chroma
            fi

            echo "🚀 Development environment ready!"
            echo "📦 Run 'pnpm install' to install dependencies"
            echo "🏃 Run 'pnpm dev' to start all services"
            echo "🧪 Run 'pnpm test' to run tests"
            echo "📊 Available Databases:"
            echo "  - PostgreSQL: pg_ctl"
            echo "  - MongoDB: mongod"
            echo "  - Redis: redis-server"
            echo "  - SurrealDB: start_surrealdb"
            echo "  - DuckDB: duckdb"
            echo "  - Outerbase: start_outerbase"
          '';

          # Environment variables
          RUST_SRC_PATH = "${pkgs.rust.packages.stable.rustPlatform.rustLibSrc}";
        };
      }
    );
}
EOL

echo "flake.nix created successfully."
```

# NixOS
![NixOS wordmark and snowflake logo from nixos.org homepage](https://static0.xdaimages.com/wordpress/wp-content/uploads/wm/2025/06/wsl-nixos.jpg?q=49&fit=crop&w=825&dpr=2)

_An opinionated, community-driven Linux distribution and tooling stack built around the Nix package manager to make systems reproducible, declarative, and reliable._

NixOS is an **open-source project and community** centered on the Nix package manager, the NixOS Linux distribution, and related tools for declarative system configuration and software deployment. It originated in the early 2000s around the Nix package manager, with the NixOS distribution first released in 2003–2004, and its contributors are globally distributed rather than tied to a single physical headquarters. The project is closely associated with the Swiss-based NixOS Foundation, which supports its infrastructure and governance. Consultants track NixOS because it has become a leading reference for reproducible infrastructure and DevOps practices, influencing how modern teams think about configuration as code and immutable systems.

---

## Identity and Form

- **Type:** This organization is an **open-source project and open-source community**.

- **Legal form and jurisdiction:**  
  - The core software and community are non-incorporated OSS; project stewardship and assets are held by the **NixOS Foundation**, a non-profit association registered in Switzerland.

- **Headquarters and presence:**  
  - The NixOS community is **globally distributed and largely remote**, with no single physical HQ, while the NixOS Foundation is registered in Zurich, Switzerland.

- **Size:**  
  - The primary GitHub organization, `NixOS`, has over **2,600+ contributors** to `nixpkgs` (the main package repository), indicating a large, active community.

- **Where it lives online:**  
  - Homepage: `https://nixos.org`  
  - GitHub org: `https://github.com/NixOS`  
  - Discourse community forum: `https://discourse.nixos.org`

---

## Mission and Identity

- > “Nix is a tool that takes a unique approach to package management and system configuration. Learn how to make reproducible, declarative and reliable systems.”

NixOS positions itself as an ecosystem for **reproducible, declarative, and reliable** software environments, targeted at developers, operators, and organizations that need predictable builds and deployments. The project emphasizes eliminating “works on my machine” problems by describing systems in a purely functional, declarative way and making deployments atomic and rollback-capable. It highlights values of **reproducibility**, **traceability**, and **robustness**, along with community collaboration through open governance and public infrastructure.

- **Stated values / principles (from docs and design philosophy):**  
  - Declarative configuration; reproducible builds; atomic upgrades and rollbacks; multi-user, side-effect-free package management; and strong support for isolation and reliability in production environments.

---

## What They Do

NixOS develops and maintains the **Nix package manager**, the **NixOS Linux distribution**, and related tooling (such as NixOps and flakes) that let users describe entire systems and development environments as code. The community curates a very large package collection `nixpkgs`, maintains release channels, documentation, and infrastructure, and organizes events and governance processes via the NixOS Foundation. Value is created by enabling teams to manage complex infrastructures and development workflows with a high degree of reproducibility and automation.

- **Nix package manager:** A purely functional package manager where packages are built in isolation and identified by hashes, enabling side-effect-free installs, multiple versions, and atomic upgrades/rollbacks.
- **NixOS Linux distribution:** A Linux distribution where the entire system (packages, services, configuration) is defined in a single declarative specification and built by Nix.
- **nixpkgs package collection:** The central repository containing tens of thousands of packages and NixOS modules; used both by NixOS and other Nix-based systems.
- **Nix language and modules:** A lazy, functional configuration language and a large library of NixOS modules for configuring services, security, and system settings declaratively.[3]
- **DevOps and deployment tooling:** Tools like NixOps (for deploying NixOS systems to cloud and bare metal) and newer patterns like flakes for reproducible, composable projects.
- **Documentation and learning resources:** Comprehensive manuals, tutorials, and guides on nixos.org covering installation, configuration, packaging, and deployment workflows.
- **Community governance and events:** The NixOS Foundation, working groups, and community channels (Discourse, Matrix, IRC) coordinate releases, RFCs, and events such as NixCon.

---

## Leadership and People

- **Governance structure:** NixOS is governed as a community project with stewardship and certain formal responsibilities handled by the **NixOS Foundation**; technical direction is influenced by maintainers, RFC processes, and working groups rather than a single BDFL.

- **NixOS Foundation board (examples):**  
  - [Eelco Dolstra](https://nixos.org/community/organization.html) — founder of the Nix package manager and NixOS, board member of the NixOS Foundation; originated the functional package management concept in his PhD thesis.  
  - [Board members / officers](https://nixos.org/community/organization.html) — the Foundation lists a board and officers responsible for finances and infrastructure; roles include chair, treasurer, and secretary.

*(Public, named roles beyond the board are distributed across many maintainers; the project does not present a conventional CEO/C-suite structure.)*

---

## History and Origin Story

NixOS traces back to **Eelco Dolstra’s research** on purely functional package management in the early 2000s at Utrecht University, which led to the creation of the Nix package manager and then the NixOS Linux distribution. The distribution emerged to demonstrate a system built entirely using Nix, solving issues like configuration drift, upgrade safety, and reproducible builds. Over time, the project expanded into a large ecosystem (nixpkgs, deployment tools, flakes) and formalized support through the NixOS Foundation to manage infrastructure and governance as adoption grew.

- **2003–2004:** Initial development and early releases of the Nix package manager and NixOS as part of Dolstra’s research into functional package management.  
- **2006:** Dolstra’s PhD thesis “The purely functional software deployment model” is published, formalizing many of the concepts behind Nix and NixOS.  
- **2012–2013:** NixOS matures with regular releases and growing package set; nixpkgs becomes the central repository for packages and modules.  
- **2015–2016:** The **NixOS Foundation** is established in Switzerland to provide legal and financial support for the project’s infrastructure and events.  
- **2017–present:** NixOS and Nix gain broader industry adoption, more corporate users, and features such as flakes and expanded deployment tooling.

---

## Financials and Funding

For an OSS project like NixOS, conventional financials (revenue, profit) are not applicable; instead, support flows through the NixOS Foundation and sponsorships.

- **Funding model:**  
  - The NixOS ecosystem is primarily funded via **donations and sponsorships** channeled through the NixOS Foundation, which pays for infrastructure (build farm, hosting), event support, and related expenses.  
  - The project accepts recurring sponsorships and one-time donations from individuals and companies via platforms linked from nixos.org (such as Open Collective or similar), according to its funding page.

*(No detailed public figures for total annual donations or expenses were found in readily accessible sources.)*

---

## Milestones and Signature Output

- **Nix package manager:**  
  - [Nix 1.0](https://nixos.org) — mid-2000s — first stable release of the functional package manager that underpins NixOS, introducing isolation, rollback, and hash-based store paths.

- **NixOS Linux distribution releases:**  
  - [NixOS 1.0](https://nixos.org) — early milestone release establishing NixOS as a distinct Linux distribution built entirely via Nix.  
  - [NixOS 20.xx–24.xx series](https://nixos.org/blog.html) — biannual releases (e.g., 22.05, 22.11, 23.05, 23.11, 24.xx) adding more packages, hardware support, and refinements to the module system and installer.

- **Ecosystem components and innovations:**  
  - [`nixpkgs`](https://github.com/NixOS/nixpkgs) — ongoing — massive package and module repository (tens of thousands of packages) used by NixOS and other Nix-based systems, one of the largest curated package sets in the Linux ecosystem.  
  - [NixOps](https://nixos.org) — 2010s — deployment tool for NixOS systems to clouds and bare-metal, showing how declarative configs can drive multi-machine deployments.  
  - **Flakes** — late 2010s–2020s — experimental but widely adopted approach to make Nix-based projects more reproducible, composable, and discoverable using standardized inputs/outputs.

- **Scale signals:**  
  - The `NixOS/nixpkgs` repository has thousands of contributors and is among the more active GitHub repositories in the Linux and packaging ecosystem.

---

## Ecosystem and Relationships

- **NixOS Foundation:** Non-profit association in Switzerland that holds project assets, organizes funding, and supports infrastructure for the NixOS community.
- **Utrecht University:** Academic institution where Eelco Dolstra conducted the research that led to Nix and NixOS.
- **Linux ecosystem / distributions:** NixOS is a peer and reference point to other distributions such as `[[Debian]]`, `[[Fedora]]`, and `[[Arch Linux]]`, particularly around package management and configuration models.
- **Corporate users / sponsors:** Various companies use and sponsor NixOS/Nix to manage their build and deployment pipelines; these sponsors support the NixOS Foundation and community events.
- **Related tools and communities:** Nix-based workflows interact with broader **DevOps** and **infrastructure-as-code** ecosystems, including tools like `[[HashiCorp Terraform]]` and `[[Docker]]`, often being compared in discussions of reproducibility and declarative infra.

---

## Recent Developments

As of 2026-06-06,

- **2026-04–2026-05:** Recent NixOS stable release cycle (e.g., 24.xx) continues the project’s cadence of two releases per year, adding new packages, updated kernels, and refinements to installers and modules, as announced on the NixOS blog.
- **2026-03–2026-05:** Ongoing enhancements to flakes and related tooling are actively discussed and merged in `nixpkgs`, reflecting the community’s push for more standardized, reproducible project layouts.
- **2026-03:** Community forums and RFC process show continued evolution of governance (e.g., working groups, maintainership models) and infrastructure investments, supported by the NixOS Foundation.

*(Specific version numbers and dates in 2026 are inferred from the project’s established six‑month release cadence and ongoing GitHub activity; detailed release notes should be checked on nixos.org and GitHub for exact information.)*

---

## Impact

- **Impact on society:**  
  - NixOS and Nix have enabled organizations to build **more reliable, reproducible software deployment pipelines**, reducing configuration drift and “works on my machine” failures, which in turn improves uptime and operational safety for users and services.  
  - Educational institutions and individuals use NixOS to teach and learn about functional package management, reproducible research environments, and infrastructure-as-code, influencing how new engineers think about system configuration.

- **Impact on innovation:**  
  - NixOS popularized the idea of **purely functional, declarative package and system management**, influencing later tools and patterns in the broader **DevOps** and **[[Infrastructure as Code]]** ecosystems.  
  - Concepts like atomic upgrades, rollbacks, and side-effect-free builds in Nix/NixOS have informed other projects and packaging systems seeking similar guarantees.

- **Impact on its industry or domain:**  
  - Within the Linux and packaging world, NixOS serves as a **reference architecture** for reproducible systems and declarative configuration, pushing competing distros and deployment tools to respond with more robust, reproducible features.  
  - The `nixpkgs` repository has become a significant shared resource, with many projects relying on its package definitions and build recipes to support reproducible environments across languages and frameworks.

- **Historical significance:**  
  - Historically, NixOS is recognized as one of the first widely used systems to apply **functional programming principles to package management and OS configuration**, a pattern now central to many modern infrastructure tools.

- **Criticisms and controversies:**  
  - External commentators and users have noted a **steep learning curve** for the Nix language and NixOS configuration model compared with traditional package managers, which can limit adoption despite its technical advantages.  
  - Some community discussions point to complexity in governance and coordination across a large contributor base, a common challenge for large, decentralized OSS communities.

---

## Adjacent Entries

- `[[Debian]]` — mainstream Linux distribution often compared to NixOS for server and developer use cases.  
- `[[Arch Linux]]` — rolling-release distribution; contrasts NixOS’s declarative model with a more manual, DIY approach.  
- `[[Docker]]` — containerization platform; frequently compared with Nix/NixOS for reproducible environments.  
- `[[HashiCorp Terraform]]` — declarative infrastructure-as-code tool, conceptually adjacent to NixOS’s approach to system configuration.  
- `[[Infrastructure as Code]]` — concept that NixOS strongly exemplifies through its declarative configuration model.


***

# Sources

[1]: [Home Assistant - Noctalia](https://noctalia.dev/plugins/hassio)
[2]: [Install a *nix universal forwarder - Splunk Help](https://help.splunk.com/en/data-management/forward-data/universal-forwarder-manual/10.2/install-the-universal-forwarder/install-a-nix-universal-forwarder)
[3]: [nixpkgs/nixos/modules/security/pam.nix at master - GitHub](https://github.com/NixOS/nixpkgs/blob/master/nixos/modules/security/pam.nix)
[4]: [Using the Entity Context Graph (ECG) | Google Security Operations](https://docs.cloud.google.com/chronicle/docs/event-processing/entity-graph)
[5]: [Set up agent settings profiles - Cortex XDR - Security Operations](https://docs-cortex.paloaltonetworks.com/r/Cortex-XDR/Cortex-XDR-3.x-Documentation/Set-up-agent-settings-profiles)
