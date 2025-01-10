# gh-actions-language-server

**GitHub Actions Language Server**

A lightweight wrapper around [@actions/languageserver](https://github.com/actions/languageservices/tree/main/languageserver) to simplify installation and usage in CLI tools and LSP (Language Server Protocol) clients.

## Why?

The `@actions/languageserver` module is published without an executable binary (see [issue #56](https://github.com/actions/languageservices/issues/56)), which makes it less convenient to use directly. This package bridges that gap by providing an easy-to-install binary.

Initially, the plan was to contribute a pull request to `@actions/languageserver` to add a `bin` field. However, it seems that configuring package exports for this purpose requires some adjustments, so creating this standalone package was a quicker solution.

_Note:_ This package may be archived and deprecated once native support for a `bin` executable is added to `@actions/languageserver`.

## Installation

To install globally via npm, run:

```
npm install --global gh-actions-language-server
```

## Configuration for Neovim

### Add `yaml.github` filetype detection

Create a a file at `ftdetect/github-actions.lua` with:

```lua
vim.filetype.add({
  pattern = {
    ['.*/%.github[%w/]+workflows[%w/]+.*%.ya?ml'] = 'yaml.github',
  },
})
```

### Configure Language Server

> [!NOTE]
> Once these PRs get merged, `mason` and `nvim-lspconfig` should support `gh-actions-language-server` out of the box:
>
> - https://github.com/neovim/nvim-lspconfig/pull/3551
> - https://github.com/williamboman/mason-lspconfig.nvim/pull/506
> - https://github.com/mason-org/mason-registry/pull/8497

If you're using [nvim-lspconfig](https://github.com/neovim/nvim-lspconfig), you can configure the `gh-actions-language-server` as follows:

#### Define the Language Server Configuration

Create a new configuration file at `lua/lspconfig/configs/gh_actions_ls.lua` with the following content:

````lua
local util = require('lspconfig.util')

return {
  default_config = {
    cmd = { 'gh-actions-language-server', '--stdio' },
    filetypes = { 'yaml.github' },
    root_dir = util.root_pattern('.github'),
    single_file_support = true,
    capabilities = {
      workspace = {
        didChangeWorkspaceFolders = {
          dynamicRegistration = true,
        },
      },
    },
  },
  docs = {
    description = [[
https://github.com/lttb/gh-actions-language-server
Language server for GitHub Actions.
`gh-actions-language-server` can be installed via `npm`:
```sh
npm install -g gh-actions-language-server
```
]],
  },
}
````

#### Initialise the Language Server

Add the following code to initialise the language server:

```lua
require('lspconfig').gh_actions_ls.setup({})
```

## Credits

- <https://github.com/actions/languageservices>
