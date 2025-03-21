---
date_created: 2025-03-21
date_modified: 2025-03-21
tags:
  - Text-Editors
  - Workspace-Configurations
---

```bash
brew install neovim
```

```bash
brew list --formula | grep neovim
```

```bash
git clone --depth 1 https://github.com/wbthomason/packer.nvim ~/.local/share/nvim/site/pack/packer/start/packer.nvim
```

Configure `init.lua` according to your specifications:
`/Users/<user-name>/.config/nvim/init.lua`

```lua
-- Basic Neovim settings
vim.opt.number = true                -- Show line numbers
vim.opt.relativenumber = true        -- Show relative line numbers
vim.opt.mouse = 'a'                  -- Enable mouse support
vim.opt.ignorecase = true           -- Ignore case in search
vim.opt.smartcase = true            -- Override ignorecase if search contains uppercase
vim.opt.hlsearch = true             -- Highlight search results
vim.opt.wrap = true                 -- Wrap lines
vim.opt.breakindent = true          -- Preserve indentation in wrapped text
vim.opt.tabstop = 4                 -- Number of spaces tabs count for
vim.opt.shiftwidth = 4              -- Size of an indent
vim.opt.expandtab = true            -- Use spaces instead of tabs
vim.opt.smartindent = true          -- Insert indents automatically
vim.opt.termguicolors = true        -- True color support
vim.opt.clipboard = 'unnamedplus'   -- Use system clipboard
vim.opt.scrolloff = 8               -- Lines of context
vim.opt.updatetime = 250            -- Decrease update time
vim.opt.timeoutlen = 300            -- Time to wait for mapped sequence
vim.opt.completeopt = 'menuone,noselect' -- Better completion experience

-- Leader key
vim.g.mapleader = ' '
vim.g.maplocalleader = ' '

-- Bootstrap packer
local ensure_packer = function()
  local fn = vim.fn
  local install_path = fn.stdpath('data')..'/site/pack/packer/start/packer.nvim'
  if fn.empty(fn.glob(install_path)) > 0 then
    fn.system({'git', 'clone', '--depth', '1', 'https://github.com/wbthomason/packer.nvim', install_path})
    vim.cmd [[packadd packer.nvim]]
    return true
  end
  return false
end

local packer_bootstrap = ensure_packer()

-- Plugin configuration
require('packer').startup(function(use)
  -- Packer can manage itself
  use 'wbthomason/packer.nvim'

  -- Add your plugins here:
  -- Example plugins (commented out by default):
  -- use 'navarasu/onedark.nvim'          -- Theme
  -- use 'nvim-lualine/lualine.nvim'      -- Statusline
  -- use {
  --   'nvim-treesitter/nvim-treesitter',
  --   run = ':TSUpdate'
  -- }
  -- use {
  --   'nvim-telescope/telescope.nvim',
  --   requires = { {'nvim-lua/plenary.nvim'} }
  -- }
  use 'nvim-lua/plenary.nvim'
  use 'nvim-tree/nvim-web-devicons'
  use 'vim-lua/popup.nvim'
  use 'MunifTangim/nui.nvim'
  use 'mg979/vim-visual-multi'

  -- Automatically set up your configuration after cloning packer.nvim
  if packer_bootstrap then
    require('packer').sync()
  end
end)

-- Key mappings
vim.keymap.set('n', '<leader>w', '<cmd>write<cr>', { desc = 'Save' })
vim.keymap.set('n', '<leader>q', '<cmd>quit<cr>', { desc = 'Quit' })

-- Auto commands
vim.api.nvim_create_autocmd('TextYankPost', {
  callback = function()
    vim.highlight.on_yank()
  end,
  desc = 'Highlight yanked text',
})
```

### Install the packages through Packer Sync
When you open Neovim from the terminal with `nvim`
Type `:PackerSync`

Success should be reported in Neovim itself, it looked like this for me. 
![](https://i.imgur.com/37Gi1zA.png)
