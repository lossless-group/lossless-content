
Setting up Fish terminal with aliases

```warp-runnable-command
 If fish command appears nohup out you guys can add this config to ** ~/.config/fish/config.fish
**

function cursor # Start the Cursor AppImage in the background, suppressing output nohup /opt/cursor.appimage $argv --no-sandbox >/dev/null 2>&1 end

```
```warp-runnable-command
 If fish command appears nohup out you guys can add this config to ** ~/.config/fish/config.fish
** 

```
Adding alias to \~\/\.config\/fish
```text
function cursor 
# Start the Cursor AppImage in the background, suppressing output 
nohup /opt/cursor.appimage $argv --no-sandbox >/dev/null 2>&1 end
```
## List of libraries from Homebrew\:
```yaml
aha: Output to html files that preserve the color scheme of the terminal.
autojump: Shell extension to jump to frequently used directories
bash: Bourne-Again SHell, a UNIX command interpreter
bat: Clone of cat(1) with syntax highlighting and Git integration
boost: Collection of portable C++ source libraries
boost-python3: C++ library for C++/Python3 interoperability
bottom: Yet another cross-platform graphical process/system monitor
ca-certificates: Mozilla CA certificate store
cmake: Cross-platform make
diffutils: File comparison utilities
elixir: Functional metaprogramming aware language built on Erlang VM
entr: Run arbitrary commands when files change
erlang: Programming language for highly scalable real-time systems
eza: Modern, maintained replacement for ls
fd: Simple, fast and user-friendly alternative to find
fish: User-friendly command-line shell for UNIX-like operating systems
fuzzy-find: Fuzzy filename finder matching across directories as well as files
fzf: Command-line fuzzy finder written in Go
gdbm: GNU database manager
gettext: GNU internationalization (i18n) and localization (l10n) library
gh: GitHub command-line tool
git: Distributed revision control system
glib: Core application library for C
glow: Render markdown on the CLI
gmp: GNU multiple precision arithmetic library
helix: Post-modern modal text editor
ice: Comprehensive RPC framework
icu4c@76: C/C++ and Java libraries for Unicode and globalization
icu4c@77: C/C++ and Java libraries for Unicode and globalization
jpeg-turbo: JPEG image codec that aids compression and decompression
libevent: Asynchronous event library
libgit2: C library of Git core methods that is re-entrant and linkable
libpng: Library for manipulating PNG images
libssh2: C library implementing the SSH2 protocol
libtiff: TIFF library and utilities
libtool: Generic library support script
libunistring: C string library for manipulating Unicode strings
libuv: Multi-platform support library with a focus on asynchronous I/O
libvterm: C99 library which implements a VT220 or xterm terminal emulator
lmdb: 'Lightning memory-mapped database: key-value data store'
lpeg: Parsing Expression Grammars For Lua
luajit: Just-In-Time Compiler (JIT) for the Lua programming language
luv: Bare libuv bindings for lua
lz4: Extremely Fast Compression algorithm
m4: Macro processing language
mas: Mac App Store command-line interface
mcpp: Alternative C/C++ preprocessor
midnight-commander: Terminal-based visual file manager
mpdecimal: Library for decimal floating point arithmetic
mpfr: C library for multiple-precision floating-point computations
msgpack: Library for a binary-based efficient data interchange format
ncurses: Text-based UI library
neovim: Ambitious Vim-fork focused on extensibility and agility
numi-cli: Smart calculator
ninja: Small build system for use with gyp or CMake
nvm: Manage multiple Node.js versions
oniguruma: Regular expressions library
openssl@3: Cryptography and SSL/TLS Toolkit
pcre: Perl compatible regular expressions library
pcre2: Perl compatible regular expressions library with a new API
pnpm: Fast, disk space efficient package manager
powerlevel10k: Theme for zsh
python-packaging: Core utilities for Python packages
python@3.12: Interpreted, interactive, object-oriented programming language
python@3.13: Interpreted, interactive, object-oriented programming language
python@3.9: Interpreted, interactive, object-oriented programming language
railway: Develop and deploy code with zero configuration
readline: Library for command-line editing
ripgrep: Search tool like grep and The Silver Searcher
ripgrep-all: Wrapper around ripgrep that adds multiple rich file types
s-lang: Library for creating multi-platform software
sqlite: Command-line interface for SQLite
starship: Cross-shell prompt for astronauts
the_silver_searcher: Code-search similar to ack
tlrc: Official tldr client written in Rust
tmux: Terminal multiplexer
tree: Display directories as trees (with optional color/HTML output)
tree-sitter: Parser generator tool and incremental parsing library
unibilium: Very basic terminfo library
unixodbc: ODBC 3 connectivity for UNIX
utf8proc: Clean C library for processing UTF-8 Unicode data
wxwidgets: Cross-platform C++ GUI toolkit
xz: General-purpose data compression with high compression ratio
yazi: Blazing fast terminal file manager written in Rust, based on async I/O
zoxide: Shell extension to navigate your filesystem faster
zsh-autosuggestions: Fish-like fast/unobtrusive autosuggestions for zsh
zsh-syntax-highlighting: Fish shell like syntax highlighting for zsh
zstd: Zstandard is a real-time compression algorithm

```
Setup for Ghostty\:
```yaml
background-opacity = 0.7
background = #13171a
cursor-color = #00ffff
cursor-opacity = 0.9
cursor-style = block_hollow
cursor-style-blink = true
cursor-text = #ffeab3
mouse-hide-while-typing = true
mouse-scroll-multiplier = 2
font-style = Roboto Mono
background-blur = 20
unfocused-split-opacity = 0.5
unfocused-split-fill = #1c3e4a
working-directory = home
window-inherit-working-directory = true
window-title-font-family = FuturaT
window-subtitle = working-directory
window-height = 1080
window-width = 600
window-position-x = 0
window-position-y = 0
window-save-state = always
window-titlebar-background = #18141c
clipboard-write = allow
clipboard-read = allow
clipboard-paste-protection = false
image-storage-limit = 1000000000
quick-terminal-position = right
macos-titlebar-style = tabs
macos-titlebar-proxy-icon = hidden
macos-window-shadow = true
macos-icon-ghost-color = #00ffff
macos-icon-screen-color = #18141c
bold-is-bright = true
auto-update = download
```
