

Quick cheat sheet. The default prefix is Ctrl+b — every command starts with that, then a key.

  ┌────────────────────────────────────────┬──────────────────────────────────────────────────────┐
  │                  Goal                  │                         Keys                         │
  ├────────────────────────────────────────┼──────────────────────────────────────────────────────┤
  │ New shell in same window (split right) │ Ctrl+b then %                                        │
  ├────────────────────────────────────────┼──────────────────────────────────────────────────────┤
  │ New shell in same window (split below) │ Ctrl+b then "                                        │
  ├────────────────────────────────────────┼──────────────────────────────────────────────────────┤
  │ New window (like a tab)                │ Ctrl+b then c                                        │
  ├────────────────────────────────────────┼──────────────────────────────────────────────────────┤
  │ Move between split panes               │ Ctrl+b then arrow keys                               │
  ├────────────────────────────────────────┼──────────────────────────────────────────────────────┤
  │ Switch windows                         │ Ctrl+b then n / p (next/prev) or 1–9                 │
  ├────────────────────────────────────────┼──────────────────────────────────────────────────────┤
  │ Close current pane                     │ Ctrl+b then x (then y to confirm), or just type exit │
  ├────────────────────────────────────────┼──────────────────────────────────────────────────────┤
  │ Detach (leave session running)         │ Ctrl+b then d                                        │
  ├────────────────────────────────────────┼──────────────────────────────────────────────────────┤
  │ Rename current window                  │ Ctrl+b then ,                                        │
  └────────────────────────────────────────┴──────────────────────────────────────────────────────┘

  Outside tmux:
  - Start a session: tmux or tmux new -s memopop (named)
  - List sessions: tmux ls
  - Reattach: tmux a (last) or tmux a -t memopop (named)
