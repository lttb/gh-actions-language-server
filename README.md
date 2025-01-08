# gh-actions-language-server
Github Actions Language Server

An extremely thin wrapper around [@actions/languageserver](https://github.com/actions/languageservices/tree/main/languageserver) to make it easier to install and use in cli and LSP clients.

## Installation

```sh
npm i -g https://github.com/lttb/gh-actions-language-server
```

## Neovim Language Server Configuration

Using [nvim-lspconfig](https://github.com/neovim/nvim-lspconfig), define configuration for `gh_actions_ls`:

<details>
<summary>lua/lspconfig/configs/gh_actions_ls.lua</summary>

```lua
return {
  default_config = {
    cmd = {
      'gh-actions-language-server',
    },
    filetypes = {
      'yaml',
    },
    single_file_support = true,
    root_dir = function(fname)
      if fname:match('.github/workflows') then
        return vim.fn.getcwd()
      end
    end,
  },
}
```

</details>

Initialise the language server:

```sh
require('lspconfig').gh_actions_ls.setup({})
```
