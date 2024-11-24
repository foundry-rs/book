# forge soldeer push

Push a Dependency to the Repository

```bash
$ forge soldeer push --help
```

```txt
Usage: forge soldeer push [OPTIONS] <DEPENDENCY>~<VERSION> [PATH]

Arguments:
  <DEPENDENCY>~<VERSION>
          The dependency name and version, separated by a tilde.
          
          This should always be used when you want to push a dependency to the
          central repository: `<https://soldeer.xyz>`.

  [PATH]
          Use this if the package you want to push is not in the current
          directory.
          
          Example: `soldeer push mypkg~0.1.0 /path/to/dep`.

Options:
  -d, --dry-run
          If set, does not publish the package but generates a zip file that can
          be inspected

      --skip-warnings
          Use this if you want to skip the warnings that can be triggered when
          trying to push dotfiles like .env

  -h, --help
          Print help (see a summary with '-h')

  -j, --threads <THREADS>
          Number of threads to use. Specifying 0 defaults to the number of
          logical cores
          
          [aliases: jobs]

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

For more information, read the README.md
```