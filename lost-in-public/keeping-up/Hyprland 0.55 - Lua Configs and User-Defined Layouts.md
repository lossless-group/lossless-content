---
date_created: 2026-05-13
date_modified: 2026-05-13
title: Hyprland 0.55 — Lua Configs and User-Defined Layouts
slug: hyprland-0-55-lua-configs-user-layouts
tags: [Hyprland, Linux, Wayland, Window-Managers, Tiling-WMs, Lua]
announcement_url: https://hypr.land/news/update55/
release_date: 2026-05-09
---

https://hypr.land/news/update55/

## Why This Matters

Hyprland 0.55 shipped on **May 9, 2026** and the project itself calls it "an enormous update by each measurable metric — commits, contributors, features and changes." Two of those changes are load-bearing in a way most point releases aren't: **configuration migrates from Hyprlang to Lua**, and the layout system opens up so users can author their own tiling layouts as first-class citizens alongside the built-ins.

For a project whose pitch has always been "a dynamic tiling Wayland compositor that doesn't make you sacrifice eye candy," moving config to a real programming language is the kind of decision that changes who the tool is for. You can now express conditional layout, per-monitor logic, and computed bindings without leaving the config file.

## The Big Changes

### Lua Configuration Replaces Hyprlang
Config files transition to Lua. The team is explicit about the cost: *"your hyprlang config is now broken — it will still work, for a few releases."* That's a generous deprecation window but a real one. Existing configs keep working; the wiki and migration docs catch up over the next few releases.

The upside is what you'd expect from moving to an actual language — functions, conditionals, loops, computed values, library imports. The downside is the same thing — config files can now be wrong in ways a declarative DSL couldn't be.

### User-Defined Layouts via a New Layout API
This is the architecturally interesting one. Custom layouts can be defined directly in config and applied per-workspace, per-monitor, or globally. They sit alongside `dwindle` and `master` as peers — same dispatcher surface, same interaction model. That moves Hyprland from "two tiling layouts plus extensive tweaks" toward something closer to a layout-engine framework.

### Scrolling and Gesture Polish
Fullscreen windows now participate in scrolling workflows by default. Native trackpad gesture support arrives via the new `scroll_move` command, plus pinch-zoom gestures. Small individually, but they close a gap between Hyprland and the gesture-rich macOS/GNOME experience that a lot of laptop users compare against.

### Color Management
Per-output ICC profile loading, FP16 precision rendering, and improved color pipelines for both local display and screensharing. Genuinely matters for color-sensitive work (design, video, photography) on Wayland — historically the rough edge that pushed those workflows back to macOS.

### Smaller But Useful
- Device tags
- Window `confine_pointer` rules
- `move_into_or_create_group` dispatcher
- Dwindle `rotatesplit` messages
- Glow window decorations

## Breaking Changes Worth Knowing

| Removed / Moved | What To Do |
|---|---|
| `dwindle:pseudotile` | Removed — find an alternative grouping pattern |
| `decoration:shadow:ignore_window` | Removed |
| `render:cm_fs_passthrough` | Removed |
| `misc:vfr` | Relocated to debug settings |

## How Significant Is This

Hyprland's release cadence has been steady but most updates accrete features rather than reshape the project. 0.55 reshapes. The Lua migration is a several-release transition — the project is now committed to a programmable config surface, which changes both the user community (more programmer-friendly, less newcomer-friendly until the docs catch up) and the surface area for community-contributed layouts and plugins.

The user-defined layout API is the change with the longest tail. Tiling-WM communities historically rally around a handful of canonical layouts; opening the layout system makes Hyprland a plausible substrate for the kind of custom workflows that used to require forking Awesome or hacking xmonad.

## Our Take

The Lua decision is the right one for where Hyprland is in its lifecycle — the config surface had outgrown what a declarative DSL could express cleanly, and forcing users into hacky workarounds was producing fragile setups. The trade-off (your config can now have bugs) is the standard one for any tool that grows up from declarative to programmable.

The color management work is quieter but is the change that meaningfully expands who can use Hyprland as a daily driver. ICC profiles and FP16 are table stakes for color-critical workflows, and Wayland compositors have lagged on this for years. Worth a fresh look for anyone who tried Hyprland before and bounced off the color-pipeline gaps.
