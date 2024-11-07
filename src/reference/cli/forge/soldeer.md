# forge soldeer

Soldeer dependency manager

```bash
$ forge soldeer --help
```

```txt
Usage: forge soldeer install [DEPENDENCY]~[VERSION] <REMOTE_URL>
    forge soldeer install [DEPENDENCY]~[VERSION] <GIT_URL>
    forge soldeer install [DEPENDENCY]~[VERSION] <GIT_URL> --rev <REVISION>
    forge soldeer install [DEPENDENCY]~[VERSION] <GIT_URL> --rev <TAG>
    forge soldeer push [DEPENDENCY]~[VERSION] <CUSTOM_PATH_OF_FILES>
    forge soldeer login
    forge soldeer update
    forge soldeer version

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

  -q, --quiet
          Do not print log messages

      --verbose
          Use verbose output
```
