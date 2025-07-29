---
date_created: 2025-04-22
date_modified: 2025-07-29
title: "Up And Running On Claude Code"
at_semantic_version: 0.0.0.1
slug: up-and-running-on-claude-code
publish: true
tags: [Code-Generators, Terminal-Applications]
site_uuid: c9631a38-55a0-4d05-8201-266e99df62f7
---
# Installation on Mac

```zsh
brew install claude-code
==> Caveats
Claude Code's auto-updater installs updates to `~/.local/bin/claude` and
not to Homebrew's location. It is recommended to disable the auto-updater
with either `DISABLE_AUTOUPDATER=1` or
`claude config set -g autoUpdates false` and use
`brew upgrade --cask claude-code`.

==> Downloading https://storage.googleapis.com/claude-code-dist-86c565f3-f756-42ad-8dfa-d59b1c096819/cl
################################################################################################ 100.0%
==> Installing Cask claude-code
==> Linking Binary 'claude' to '/opt/homebrew/bin/claude'
🍺  claude-code was successfully installed!
==> No outdated dependents to upgrade!
```

```zsh
which claude
/opt/homebrew/bin/claude
```

```zsh
claude --help
Usage: claude [options] [command] [prompt]

Claude Code - starts an interactive session by default, use -p/--print for non-interactive output

Arguments:
  prompt                           Your prompt

Options:
  -d, --debug                      Enable debug mode
  --verbose                        Override verbose mode setting from config
  -p, --print                      Print response and exit (useful for pipes)
  --output-format <format>         Output format (only works with --print): "text" (default), "json"
                                   (single result), or "stream-json" (realtime streaming) (choices:
                                   "text", "json", "stream-json")
  --input-format <format>          Input format (only works with --print): "text" (default), or
                                   "stream-json" (realtime streaming input) (choices: "text",
                                   "stream-json")
  --mcp-debug                      [DEPRECATED. Use --debug instead] Enable MCP debug mode (shows MCP
                                   server errors)
  --dangerously-skip-permissions   Bypass all permission checks. Recommended only for sandboxes with
                                   no internet access.
  --allowedTools <tools...>        Comma or space-separated list of tool names to allow (e.g.
                                   "Bash(git:*) Edit")
  --disallowedTools <tools...>     Comma or space-separated list of tool names to deny (e.g.
                                   "Bash(git:*) Edit")
  --mcp-config <file or string>    Load MCP servers from a JSON file or string
  --append-system-prompt <prompt>  Append a system prompt to the default system prompt
  --permission-mode <mode>         Permission mode to use for the session (choices: "acceptEdits",
                                   "bypassPermissions", "default", "plan")
  -c, --continue                   Continue the most recent conversation
  -r, --resume [sessionId]         Resume a conversation - provide a session ID or interactively
                                   select a conversation to resume
  --model <model>                  Model for the current session. Provide an alias for the latest
                                   model (e.g. 'sonnet' or 'opus') or a model's full name (e.g.
                                   'claude-sonnet-4-20250514').
  --fallback-model <model>         Enable automatic fallback to specified model when default model is
                                   overloaded (only works with --print)
  --settings <file>                Path to a settings JSON file to load additional settings from
  --add-dir <directories...>       Additional directories to allow tool access to
  --ide                            Automatically connect to IDE on startup if exactly one valid IDE is
                                   available
  --strict-mcp-config              Only use MCP servers from --mcp-config, ignoring all other MCP
                                   configurations
  --session-id <uuid>              Use a specific session ID for the conversation (must be a valid
                                   UUID)
  -v, --version                    Output the version number
  -h, --help                       Display help for command

Commands:
  config                           Manage configuration (eg. claude config set -g theme dark)
  mcp                              Configure and manage MCP servers
  migrate-installer                Migrate from global npm installation to local installation
  setup-token                      Set up a long-lived authentication token (requires Claude
                                   subscription)
  doctor                           Check the health of your Claude Code auto-updater
  update                           Check for updates and install if available
  install [options] [target]       Install Claude Code native build. Use [target] to specify version
                                   (stable, latest, or specific version)
```

Run 
```zsh
claude . # from the current working director

# OR

claude /path/to/your/project
```

