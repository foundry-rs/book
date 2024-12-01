# forge init

Create a new Forge project

```bash
$ forge init --help
```

```txt
Usage: forge init [OPTIONS] [PATH]

Arguments:
  [PATH]
          The root directory of the new project
          
          [default: .]

Options:
  -t, --template <TEMPLATE>
          The template to start from

  -b, --branch <BRANCH>
          Branch argument that can only be used with template option. If not
          specified, the default branch is used

      --offline
          Do not install dependencies from the network
          
          [aliases: no-deps]

      --force
          Create the project even if the specified root directory is not empty

      --vscode
          Create a .vscode/settings.json file with Solidity settings, and
          generate a remappings.txt file

      --shallow
          Perform shallow clones instead of deep ones.
          
          Improves performance and reduces disk usage, but prevents switching
          branches or tags.

      --no-git
          Install without adding the dependency as a submodule

      --no-commit
          Do not create a commit

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
          - 5 (-vvvvv): Print execution and setup traces for all tests,
          including storage changes.
```