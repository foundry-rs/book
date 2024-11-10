# forge fmt

Format Solidity source files

```bash
$ forge fmt --help
```

```txt
Usage: forge fmt [OPTIONS] [PATH]...

Arguments:
  [PATH]...
          Path to the file, directory or '-' to read from stdin

Options:
      --root <PATH>
          The project's root path.
          
          By default root of the Git repository, if in one, or the current
          working directory.

      --check
          Run in 'check' mode.
          
          Exits with 0 if input is formatted correctly. Exits with 1 if
          formatting is required.

  -r, --raw
          In 'check' and stdin modes, outputs raw formatted code instead of the
          diff

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