---
date_created: 2025-07-28
date_modified: 2025-08-06
site_uuid: 181775c5-7336-4a34-b55e-39961b47fece
publish: true
title: Up And Running With Portainer
slug: up-and-running-with-portainer
at_semantic_version: 0.0.0.1
authors: [Michael Staton]
tags: [Open-Source-Alternatives, Container-Management]
---
# Up and Running with Portainer

A complete guide to setting up Portainer as a container management interface for Podman on Linux systems.

## Prerequisites

- Podman installed and configured
- Systemd user services enabled
- Linux system (tested on Garuda Linux)

## Quick Setup Commands

### 1. Enable Podman Socket Service

First, enable the Podman API socket that Portainer will use to communicate with Podman:

```bash
# Enable and start the Podman socket service
systemctl --user enable --now podman.socket
```

Verify the socket is running:

```bash
# Check socket status
systemctl --user status podman.socket
```

You should see output showing the socket is "active (listening)" on `/run/user/1000/podman/podman.sock`.

### 2. Create Portainer Data Volume

Create a persistent volume for Portainer's configuration and data:

```bash
# Create volume for Portainer data persistence
podman volume create portainer_data
```

### 3. Run Portainer Container

Launch Portainer with the proper socket mounting and port mapping:

```bash
# Run Portainer with Podman socket access
podman run -d \
  --name portainer \
  --restart always \
  -p 9000:9000 \
  -v /run/user/1000/podman/podman.sock:/var/run/docker.sock:Z \
  -v portainer_data:/data \
  docker.io/portainer/portainer-ce:latest
```

### 4. Verify Installation

Check that Portainer is running:

```bash
# Check running containers
podman ps --filter name=portainer
```

Test web interface accessibility:

```bash
# Test HTTP response
curl -s -o /dev/null -w "%{http_code}" http://localhost:9000
```

Should return `200` if successful.

## Command Breakdown

### Socket Mounting Explanation

```bash
-v /run/user/1000/podman/podman.sock:/var/run/docker.sock:Z
```

- **Source**: `/run/user/1000/podman/podman.sock` - Podman's user-level API socket
- **Target**: `/var/run/docker.sock` - Standard Docker socket path that Portainer expects
- **`:Z` flag**: SELinux context relabeling for secure access

### Port Mapping

```bash
-p 9000:9000
```

Maps host port 9000 to container port 9000 for web interface access.

### Volume Persistence

```bash
-v portainer_data:/data
```

Mounts the named volume to `/data` inside the container for persistent storage of:
- User configurations
- Container management settings
- Dashboard customizations

## Initial Setup

1. **Access Portainer**: Navigate to `http://localhost:9000`
2. **Create Admin User**: Set up initial admin credentials
3. **Select Environment**: Choose "Docker" (Portainer treats Podman as Docker-compatible)
4. **Connect**: Should automatically detect the local Podman environment

## What You'll See

Portainer will display all your Podman containers, including:
- Running containers with status indicators
- Container logs and terminal access
- Resource usage monitoring
- Volume and network management
- Image management capabilities

## Useful Management Commands

### View All Containers
```bash
# Show all containers (running and stopped)
podman ps -a
```

### Container Logs
```bash
# View container logs
podman logs --tail 20 <container_name>
```

### Stop/Start Portainer
```bash
# Stop Portainer
podman stop portainer

# Start Portainer
podman start portainer
```

### Remove Portainer (Clean Uninstall)
```bash
# Stop and remove container
podman stop portainer && podman rm portainer

# Remove volume (optional, deletes all data)
podman volume rm portainer_data

# Disable socket service (optional)
systemctl --user disable --now podman.socket
```

## Troubleshooting

### Socket Permission Issues
If Portainer can't connect to containers:
```bash
# Check socket permissions
ls -la /run/user/1000/podman/podman.sock

# Restart socket service
systemctl --user restart podman.socket
```

### Container Registry Issues
If you get "short-name" resolution errors:
```bash
# Always use full registry paths
docker.io/portainer/portainer-ce:latest
# Instead of just: portainer/portainer-ce:latest
```

### SELinux Context Issues
If volume mounting fails:
```bash
# Check SELinux status
getenforce

# Use :Z flag for proper context labeling
-v /path/to/socket:/var/run/docker.sock:Z
```

## Advanced Configuration

### Custom Port
To run Portainer on a different port:
```bash
podman run -d --name portainer -p 8080:9000 [other options...]
```

### HTTPS Setup
For HTTPS access, map port 9443:
```bash
podman run -d --name portainer -p 9000:9000 -p 9443:9443 [other options...]
```

## Integration with Existing Containers

Portainer will automatically discover and manage existing Podman containers. No additional configuration needed for containers like:
- Perplexica applications
- SearXNG instances  
- Database containers
- Web services

## Benefits of Using Portainer

1. **Visual Management**: GUI alternative to command-line container management
2. **Resource Monitoring**: Real-time CPU, memory, and network usage
3. **Log Aggregation**: Centralized log viewing across all containers
4. **Terminal Access**: Web-based container shell access
5. **Template Management**: Deploy containers from pre-built templates
6. **User Management**: Multi-user access with role-based permissions

## Next Steps

- Explore the Portainer interface at `http://localhost:9000`
- Set up container templates for common deployments
- Configure monitoring alerts and notifications
- Explore Portainer's registry management features

---

*Last updated: August 2025*
*Tested on: Garuda Linux with Podman 4.x*
