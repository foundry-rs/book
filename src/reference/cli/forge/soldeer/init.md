# forge soldeer init

Convert a Foundry project to use Soldeer

```bash
$ forge soldeer init --help
```

```txt
Usage: forge soldeer init [OPTIONS]

Options:
      --clean
          Clean the Foundry project by removing .gitmodules and the lib
          directory

      --config-location <CONFIG_LOCATION>
          Specify the config location.
          
          This prevents prompting the user if the automatic detection can't
          determine the config location.

          Possible values:
          - foundry: Store config inside the `foundry.toml` file
          - soldeer: Store config inside the `soldeer.toml` file

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

For more information, read the README.md
```