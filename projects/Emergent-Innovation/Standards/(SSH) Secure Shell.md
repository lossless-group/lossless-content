---
site_uuid: 293f7d71-9e56-419a-a299-b45048873ad6
publish: true
title: (SSH) Secure Shell
slug: ssh-secure-shell
at_semantic_version: 0.0.0.1
date_created: 2024-12-18
date_modified: 2025-07-27
aliases: [SSH, ssh, Secure Shell]
---

# What is Secure Shell?
[[projects/Emergent-Innovation/Standards/(SSH) Secure Shell|(SSH) Secure Shell]], is a protocol used for secure remote login from one computer to another. It provides strong password authentication and encrypted communications over unsecured networks (like the internet). 

Here's a simple breakdown of how it works:

1. **Secure Connection**: SSH uses public-key cryptography to authenticate the client (your device) with the server you're trying to access, ensuring both parties are who they claim to be. This communication is encrypted, preventing eavesdropping or tampering.

2. **Remote Access**: Once connected via SSH, users can execute commands on the remote machine as if they were physically present at that machine's terminal. This includes file transfers (using SFTP or SCP), running scripts, and more.

3. **Port Usage**: By default, SSH uses port 22 for communication. When you connect to a server using an SSH client on your local machine, you're essentially opening a secure tunnel through which you can send commands and receive responses from the remote system.

4. **Security Features**: Apart from encryption and authentication, SSH also offers features like data integrity checks (to ensure data hasn't been altered during transmission), and compression for faster transfers over slower links. 

SSH is widely used in system administration to manage servers remotely, and it's a critical tool for maintaining secure connections between devices on a network.