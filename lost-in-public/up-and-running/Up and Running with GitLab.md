---
tags: [Collaboration-Tools, Version-Control]
date_created: 2025-11-10
date_modified: 2025-11-11
og_favicon: https://ik.imagekit.io/xvpgfijuw/lossless-content-embeds/appIcon__GitLab--Brand.svg?updatedAt=1762878260575
site_uuid: a4afb5a6-302d-4dc3-bd8d-2d1bd560dec2
publish: true
title: Up and Running with GitLab
slug: up-and-running-with-gitlab
at_semantic_version: 0.0.0.1
authors:
  - Michael Staton
---

This guide documents a clean, reliable setup for authenticating to GitLab via SSH on macOS using a passwordless `ed25519` key. It includes step‑by‑step commands, verification, and common fixes.

## Goal
- Use SSH with a dedicated key to access GitLab (clone, fetch, push) without prompts.

## Prerequisites
- macOS with OpenSSH (`ssh`, `ssh-keygen`, `ssh-agent`).
- A GitLab account with access to your repository.
- Git installed and your repo cloned locally.

## Quick Summary
- Generate `~/.ssh/gitlab_ed25519` (no passphrase).
- Configure `~/.ssh/config` for `gitlab.com` to use that key.
- Start the agent and load the key with Apple keychain support.
- Add the public key in GitLab → SSH Keys.
- Verify with `ssh -T git@gitlab.com` and push via SSH.

## Step‑By‑Step

### 1) Create a passwordless `ed25519` key
```bash
ssh-keygen -t ed25519 -C "GitLab key" -f ~/.ssh/gitlab_ed25519 -N ""
```
- Public key: `~/.ssh/gitlab_ed25519.pub`
- Private key: `~/.ssh/gitlab_ed25519`

Optional: copy public key to clipboard
```bash
pbcopy < ~/.ssh/gitlab_ed25519.pub
```

Fingerprint (for reference)
```bash
ssh-keygen -lf ~/.ssh/gitlab_ed25519.pub
```

### 2) Configure SSH for GitLab
Create or update `~/.ssh/config` with:
```sshconfig
Host gitlab.com
  HostName gitlab.com
  User git
  IdentityFile ~/.ssh/gitlab_ed25519
  IdentitiesOnly yes
  AddKeysToAgent yes
  UseKeychain yes
```
Lock down permissions:
```bash
chmod 600 ~/.ssh/config
```

### 3) Start agent and load the key (macOS keychain)
```bash
# Start agent if not already running
eval "$(ssh-agent -s)"

# Add the key and persist in macOS keychain
ssh-add --apple-use-keychain ~/.ssh/gitlab_ed25519

# Confirm identities loaded
ssh-add -l
```

### 4) Register the public key in GitLab
- GitLab → User menu → **Settings** → **SSH Keys**.
- Paste the contents of `~/.ssh/gitlab_ed25519.pub`.
- Give it a title (e.g., "macbook-ed25519"), set an expiry if desired, and save.

### 5) Verify SSH handshake
```bash
ssh -T git@gitlab.com
```
Expected output includes a welcome line and may mention your username. If you see a permission error, check the Troubleshooting section.

### 6) Ensure your repository remote uses SSH
```bash
git remote -v
```
- Should show forms like: `git@gitlab.com:<namespace>/<repo>.git`
- If it’s HTTPS, switch it:
```bash
git remote set-url origin git@gitlab.com:<namespace>/<repo>.git
```

### 7) Test fetch/push
```bash
git fetch origin
# Make a small change and commit, then:
git push origin <branch>
```

## Troubleshooting

- Remote still prompts for username/password
  - Your remote is HTTPS. Switch to SSH:
    ```bash
    git remote set-url origin git@gitlab.com:<namespace>/<repo>.git
    ```

- "Permission denied (publickey)" on `ssh -T git@gitlab.com`
  - Public key not added in GitLab or wrong key used.
    - Re-add `~/.ssh/gitlab_ed25519.pub` in GitLab → SSH Keys.
  - Agent not loading your key.
    ```bash
    ssh-add -l                    # see if your key is listed
    ssh-add --apple-use-keychain ~/.ssh/gitlab_ed25519
    ```
  - `~/.ssh/config` not pointing to the correct key or permissions too open.
    ```bash
    grep -A5 '^Host gitlab.com' ~/.ssh/config
    chmod 600 ~/.ssh/config
    ```

- Multiple keys, wrong one used
  - Use `IdentitiesOnly yes` and explicit `IdentityFile` (as shown).
  - You can also create a `Host gitlab.com-<alias>` section and use `git@gitlab.com:<namespace>/<repo>.git` with `-o IdentityFile=...` if needed.

- Agent has no identities on reboot
  - On macOS, `UseKeychain yes` with `AddKeysToAgent yes` ensures persistence.
  - If needed, re-run:
    ```bash
    eval "$(ssh-agent -s)" && ssh-add --apple-use-keychain ~/.ssh/gitlab_ed25519
    ```

## Reference: Minimal macOS config for GitLab
```sshconfig
Host gitlab.com
  HostName gitlab.com
  User git
  IdentityFile ~/.ssh/gitlab_ed25519
  IdentitiesOnly yes
  AddKeysToAgent yes
  UseKeychain yes
```

## Post‑Resolution Checklist
- `~/.ssh/gitlab_ed25519` exists; `~/.ssh/gitlab_ed25519.pub` added to GitLab.
- `ssh -T git@gitlab.com` succeeds.
- `git remote -v` shows SSH (`git@gitlab.com:...`).
- Push from your repo completes without prompts.

## Notes
- `ed25519` is preferred for performance and security.
- Avoid passphrases if you want non‑interactive pushes; if you do use one, macOS keychain can remember it.
- Keep private key permissions strict (`chmod 600 ~/.ssh/gitlab_ed25519`).

---
If you want me to tailor these steps for multiple GitLab accounts or per‑project keys, say the account names and I’ll add a ready‑to‑drop `~/.ssh/config` matrix.