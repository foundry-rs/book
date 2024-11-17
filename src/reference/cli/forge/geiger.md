# forge geiger

Detects usage of unsafe cheat codes in a project and its dependencies

```bash
$ forge geiger --help
```

```txt
Usage: forge geiger [OPTIONS] [PATH]...

Arguments:
  [PATH]...
          Paths to files or directories to detect

Options:
      --root <PATH>
          The project's root path.
          
          By default root of the Git repository, if in one, or the current
          working directory.

      --check
          Run in "check" mode.
          
          The exit code of the program will be the number of unsafe cheatcodes
          found.

      --ignore <PATH>...
          Globs to ignore

      --full
          Print a report of all files, even if no unsafe functions are found

  -h, --help
          Print help (see a summary with '-h')

Display options:
      --color <COLOR>
          The color of the log messages

          Possible values:
          - auto:   Intelligently guess whether to use color output (default)
          - always: Force color output
          - never:  Force disable color output

      --json
          Format log messages as JSON

  -q, --quiet
          Do not print log messages

  -v, --verbosity...
          Verbosity level of the log messages.
          
          Pass multiple times to increase the verbosity (e.g. -v, -vv, -vvv).
          
          Depending on the context the verbosity levels have different meanings.
          
          For example, the verbosity levels of the EVM are:
          - 2 (-vv): Print logs for all tests.
          - 3 (-vvv): Print execution traces for failing tests.
          - 4 (-vvvv): Print execution traces for all tests, and setup traces
          for failing tests.
          - 5 (-vvvvv): Print execution and setup traces for all tests.
```