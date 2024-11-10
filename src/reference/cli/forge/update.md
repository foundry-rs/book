# forge update

Update one or multiple dependencies.

```bash
$ forge update --help
```

```txt
Usage: forge update [OPTIONS] [DEPENDENCIES]...

Arguments:
  [DEPENDENCIES]...
          The dependencies you want to update

Options:
      --root <PATH>
          The project's root path.
          
          By default root of the Git repository, if in one, or the current
          working directory.

  -f, --force
          Override the up-to-date check

  -r, --recursive
          Recursively update submodules

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