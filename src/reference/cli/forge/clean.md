# forge clean

Remove the build artifacts and cache directories

```bash
$ forge clean --help
```

```txt
Usage: forge clean [OPTIONS]

Options:
      --root <PATH>
          The project's root path.
          
          By default root of the Git repository, if in one, or the current
          working directory.

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