---
aliases: [Control Servers]
date_created: 2026-05-01
date_modified: 2026-05-23
site_uuid: 2310cf0b-a7a9-4973-a21c-c5b043b1b95f
publish: true
title: "Coordination Servers"
slug: coordination-servers
at_semantic_version: 0.0.0.5
---
A control server in Tailscale (officially called a "coordination server") is a centralized component that manages network coordination and device registration, but doesn't handle actual data traffic. It acts as the control plane in Tailscale's hybrid architecture, where control is centralized but data flows directly between devices in a peer-to-peer mesh. [^uxmo4a] [^niwe4k]

## Core Functions

The coordination server performs several essential tasks: [^niwe4k]

- **Device registry and discovery**: Maintains a complete registry of all devices (nodes) in your tailnet, including IP addresses, client versions, public keys, locations, and operating systems
- **Key distribution**: Exchanges WireGuard public keys between nodes so they can establish encrypted connections [^s7crb9]
- **Authentication**: Handles user authentication and device authorization
- **Policy enforcement**: Distributes security policies, access control lists, and firewall rules to all devices [^htj0jx] [^uxmo4a]
- **NAT traversal coordination**: Manages endpoint information between devices and selects optimal DERP relay servers when direct peer-to-peer connections aren't possible [^niwe4k]

## Control Plane vs. Data Plane

Tailscale separates its architecture into two distinct planes: [^uxmo4a]

- **Control plane** (hub-and-spoke): The coordination server exchanges tiny encryption keys and policies with minimal traffic
- **Data plane** (mesh): Actual encrypted traffic flows directly between devices peer-to-peer using WireGuard, not through the coordination server

This design means the coordination server is never a bottleneck for your data, and network performance scales with the number of nodes rather than being limited by a central gateway. [^uxmo4a]

## Self-Hosted Alternative

**[[Headscale]]** is an open-source, self-hosted reimplementation of [[Tooling/Software Development/Developer Experience/DevTools/Tailscale|Tailscale]]'s coordination server. It allows you to run your own control plane on infrastructure you control while still using official Tailscale clients on your devices. You can configure Tailscale clients to connect to a custom control server URL instead of Tailscale's default `https://controlplane.tailscale.com`. [^rr6tfm] [^kj79ce] [^tk0mlw] [^s7crb9]

# Sources

[^uxmo4a]: [Tailscale: How it works](https://tailscale.com/blog/how-tailscale-works)
[^niwe4k]: [Control and data planes](https://tailscale.com/docs/concepts/control-data-planes)
[^s7crb9]: [How to Set Up Headscale (Self-Hosted Tailscale) on Ubuntu](https://oneuptime.com/blog/post/2026-03-02-how-to-set-up-headscale-self-hosted-tailscale-on-ubuntu/view)
[^htj0jx]: [What happens if the coordination server is down?](https://tailscale.com/docs/reference/coordination-server-down)
[^rr6tfm]: [Configure Tailscale clients to use a custom control server](https://tailscale.com/docs/how-to/set-up-custom-control-server)
[^kj79ce]: [Open source at Tailscale](https://tailscale.com/opensource)
[^tk0mlw]: [Headscale](https://headscale.net)
[^13sv1a]: [juanfont/headscale: An open source, self-hosted ...](https://github.com/juanfont/headscale)
[^0dwqwe]: [Tailscale and the OSI model](https://tailscale.com/docs/concepts/tailscale-osi)
[^9iswc8]: [An open source, self-hosted implementation of the ...](https://news.ycombinator.com/item?id=43563396)
[^lbcef0]: [Setting up Tailscale for remote control ((Kali Linux + ...](https://www.reddit.com/r/Tailscale/comments/1rj1aus/setting_up_tailscale_for_remote_control_kali/)
[^sy859s]: [How doesn't it go through Tailscale's servers?](https://www.reddit.com/r/Tailscale/comments/1hv2u8i/how_doesnt_it_go_through_tailscales_servers/)
[^slmv5r]: [Tailscale vs. Headscale : r/selfhosted](https://www.reddit.com/r/selfhosted/comments/1lnnc4e/tailscale_vs_headscale/)
[^34sqak]: [tailscale-rs/ARCHITECTURE.md at main](https://github.com/tailscale/tailscale-rs/blob/main/ARCHITECTURE.md)
[^381re2]: [Headscale & Tailscale](https://www.lucasjanin.com/2025/01/03/headscale-tailscale-in-a-self-hosted-environment/)
