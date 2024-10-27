# forge soldeer update

Update dependencies by reading the config file

```bash
$ forge soldeer update --help
```

```txt
Usage: forge soldeer update [OPTIONS]

Options:
  -g, --regenerate-remappings
          If set, this command will delete the existing remappings and re-create
          them

  -d, --recursive-deps
          If set, this command will install the dependencies recursively (via
          submodules or via soldeer)

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

For more information, read the README.md
```