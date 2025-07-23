---
date_created: 2025-03-19
date_modified: 2025-07-23
site_uuid: a4a26399-a06f-4bdd-b49a-a1e9df9f7411
title: Up And Running With Docker
slug: up-and-running-with-docker
at_semantic_version: 0.0.0.1
publish: true
tags: [Container-Runtimes, Reproducible-Builds, Continuous-Deployment]
---
```bash
   sudo apt remove docker docker-engine docker.io containerd runc
```

```bash
sudo apt update
   sudo apt install ca-certificates curl gnupg
```

```bash
   sudo install -m 0755 -d /etc/apt/keyrings
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
   sudo chmod a+r /etc/apt/keyrings/docker.gpg
```

```bash
   echo \
     "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
     "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
     sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

```bash
sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin --install-suggests
```

```bash
sudo systemctl start docker
   sudo systemctl enable docker
```

```bash
sudo groupadd docker
   sudo usermod -aG docker $USER
```

```bash
docker --version
   docker compose version
```