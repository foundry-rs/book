# forge soldeer

Soldeer dependency manager

```bash
$ forge soldeer --help
```

```txt
Usage: Native Solidity Package Manager, `run forge soldeer [COMMAND] --help` for more details

Commands:
  init       Convert a Foundry project to use Soldeer
  install    Install a dependency
  update     Update dependencies by reading the config file
  login      Log into the central repository to push packages
  push       Push a dependency to the repository
  uninstall  Uninstall a dependency
  version    Display the version of Soldeer
  help       Print this message or the help of the given subcommand(s)

Options:
  -h, --help
          Print help (see a summary with '-h')

Display options:
      --color <COLOR>
          Log messages coloring

          Possible values:
          - auto:   Intelligently guess whether to use color output (default)
          - always: Force color output
          - never:  Force disable color output

      --json
          Format log messages as JSON

  -q, --quiet
          Do not print log messages

      --verbose
          Use verbose output
```