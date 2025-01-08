# gh-actions-language-server

**GitHub Actions Language Server**

A lightweight wrapper around [@actions/languageserver](https://github.com/actions/languageservices/tree/main/languageserver) to simplify installation and usage in CLI tools and LSP (Language Server Protocol) clients.

## Why?

The `@actions/languageserver` module is published without an executable binary (see [issue #56](https://github.com/actions/languageservices/issues/56)), which makes it less convenient to use directly. This package bridges that gap by providing an easy-to-install binary.

Initially, the plan was to contribute a pull request to `@actions/languageserver` to add a `bin` field. However, it seems that configuring package exports for this purpose requires some adjustments, so creating this standalone package was a quicker solution.

_Note:_ This package may be archived and deprecated once native support for a `bin` executable is added to `@actions/languageserver`.

## Installation

To install globally via npm, run:

_from git_
```sh
npm i -g https://github.com/lttb/gh-actions-language-server
```

_from npm registry_
```
npm i -g gh-actions-language-server
```

## Configuration for Neovim

If you're using [nvim-lspconfig](https://github.com/neovim/nvim-lspconfig), you can configure the `gh-actions-language-server` as follows:

### Define the Language Server Configuration

Create a new configuration file at `lua/lspconfig/configs/gh_actions_ls.lua` with the following content:

<details>
<summary>lua/lspconfig/configs/gh_actions_ls.lua</summary>

```lua
return {
  default_config = {
    cmd = {
      'gh-actions-language-server',
      '--stdio',
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

### Initialize the Language Server

Add the following code to initialize the language server:

```lua
require('lspconfig').gh_actions_ls.setup({})
```

## Credits

- https://github.com/actions/languageservices
