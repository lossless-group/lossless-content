---
title: Introduction to Docker
description: Containerization fundamentals and Docker basics
slug: docker-intro
---

# Introduction to Docker

## Containerize Everything

🐳 Learn the basics of Docker containerization

---

## What is Docker?

- **Container** platform
- Packages applications with dependencies
- "Build once, run anywhere"
- Lightweight alternative to VMs
- Industry standard for deployment

---

## Containers vs Virtual Machines

### Virtual Machines
- Full OS for each VM
- Heavy resource usage
- Slower to start
- Complete isolation

### Containers
- Share host OS kernel
- Lightweight
- Start in seconds
- Process isolation

---

## Core Concepts

### Image
Read-only template with application

### Container
Running instance of an image

### Registry
Storage for Docker images

### Dockerfile
Instructions to build an image

---

## Basic Docker Commands

```bash
# Pull an image
docker pull nginx

# List images
docker images

# Run a container
docker run -d -p 80:80 nginx

# List running containers
docker ps
```

---

## Working with Containers

```bash
# Stop container
docker stop <container-id>

# Start container
docker start <container-id>

# Remove container
docker rm <container-id>

# View logs
docker logs <container-id>
```

---

## Creating a Dockerfile

```dockerfile
# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app files
COPY . .

# Expose port
EXPOSE 3000

# Start command
CMD ["npm", "start"]
```

---

## Building Images

```bash
# Build image
docker build -t myapp:latest .

# Tag image
docker tag myapp:latest myapp:v1.0

# Push to registry
docker push myapp:v1.0
```

--

### Build Best Practices

- Use specific base image versions
- Minimize layers
- Order commands by change frequency
- Use .dockerignore
- Don't run as root

---

## Docker Compose

Manage multi-container applications

```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
  
  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: secret
```

---

## Compose Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs

# Scale services
docker-compose up -d --scale web=3
```

---

## Networking

### Bridge Network
Default network for containers

### Host Network
Share host's network

### Custom Networks
```bash
docker network create mynet
docker run --network mynet nginx
```

---

## Volumes

Persist data beyond container lifecycle

```bash
# Named volume
docker run -v mydata:/data nginx

# Bind mount
docker run -v /host/path:/container/path nginx

# List volumes
docker volume ls
```

---

## Common Patterns

### Multi-stage Builds
```dockerfile
# Build stage
FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
```

---

## Security Tips

- ✅ Use official images
- ✅ Scan for vulnerabilities
- ✅ Don't store secrets in images
- ✅ Run as non-root user
- ✅ Keep images updated

---

## Debugging

```bash
# Execute command in container
docker exec -it <container> bash

# Inspect container
docker inspect <container>

# View resource usage
docker stats
```

---

# Start Containerizing!

Docker makes deployment consistent and scalable

[Back to presentations](/slides/)