# forge lint

Lint Solidity source files

```bash
$ forge lint --help
```

```txt
Usage: forge lint [OPTIONS] [PATH]...

Arguments:
  [PATH]...
          Path to the file to be checked. Overrides the `ignore` project config

Options:
      --root <PATH>
          The project's root path.
          
          By default root of the Git repository, if in one, or the current
          working directory.

      --severity <SEVERITY>...
          Specifies which lints to run based on severity. Overrides the
          `severity` project config.
          
          Supported values: `high`, `med`, `low`, `info`, `gas`.
          
          [possible values: high, med, low, info, gas]

      --only-lint <LINT_ID>...
          Specifies which lints to run based on their ID (e.g.,
          "incorrect-shift"). Overrides the `exclude_lints` project config

      --json
          Activates the linter's JSON formatter (rustc-compatible)

  -h, --help
          Print help (see a summary with '-h')

  -j, --threads <THREADS>
          Number of threads to use. Specifying 0 defaults to the number of
          logical cores
          
          [aliases: --jobs]

Display options:
      --color <COLOR>
          The color of the log messages

          Possible values:
          - auto:   Intelligently guess whether to use color output (default)
          - always: Force color output
          - never:  Force disable color output

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
          - 5 (-vvvvv): Print execution and setup traces for all tests,
          including storage changes.
```