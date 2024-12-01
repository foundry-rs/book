# forge doc

Generate documentation for the project

```bash
$ forge doc --help
```

```txt
Usage: forge doc [OPTIONS]

Options:
      --root <PATH>
          The project's root path.
          
          By default root of the Git repository, if in one, or the current
          working directory.

  -o, --out <PATH>
          The doc's output path.
          
          By default, it is the `docs/` in project root.

  -b, --build
          Build the `mdbook` from generated files

  -s, --serve
          Serve the documentation

      --open
          Open the documentation in a browser after serving

      --hostname <HOSTNAME>
          Hostname for serving documentation

  -h, --help
          Print help (see a summary with '-h')

  -j, --threads <THREADS>
          Number of threads to use. Specifying 0 defaults to the number of
          logical cores
          
          [aliases: jobs]

Watch options:
  -w, --watch [<PATH>...]
          Watch the given files or directories for changes.
          
          If no paths are provided, the source and test directories of the
          project are watched.

      --no-restart
          Do not restart the command while it's still running

      --run-all
          Explicitly re-run all tests when a change is made.
          
          By default, only the tests of the last modified test file are
          executed.

      --watch-delay <DELAY>
          File update debounce delay.
          
          During the delay, incoming change events are accumulated and only once
          the delay has passed, is an action taken. Note that this does not mean
          a command will be started: if --no-restart is given and a command is
          already running, the outcome of the action will be to do nothing.
          
          Defaults to 50ms. Parses as decimal seconds by default, but using an
          integer with the `ms` suffix may be more convenient.
          
          When using --poll mode, you'll want a larger duration, or risk
          overloading disk I/O.

  -p, --port <PORT>
          Port for serving documentation

      --deployments [<DEPLOYMENTS>]
          The relative path to the `hardhat-deploy` or `forge-deploy` artifact
          directory. Leave blank for default

  -i, --include-libraries
          Whether to create docs for external libraries

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
          - 5 (-vvvvv): Print execution and setup traces for all tests,
          including storage changes.
```