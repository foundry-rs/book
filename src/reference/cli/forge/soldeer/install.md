# forge soldeer install

Install a dependency

```bash
$ forge soldeer install --help
```

```txt
Usage: forge soldeer install [OPTIONS] [DEPENDENCY~VERSION] [URL]

Arguments:
  [DEPENDENCY~VERSION]
          The dependency name and version, separated by a tilde. The version is
          always required.
          
          If not present, this command will install all dependencies which are
          missing.

  [URL]
          The URL to the dependency zip file.
          
          If not present, the package will be installed from the Soldeer
          repository.
          
          Example: https://my-domain/dep.zip

Options:
      --rev <REV>
          A Git commit hash

      --tag <TAG>
          A Git tag

      --branch <BRANCH>
          A Git branch

  -g, --regenerate-remappings
          If set, this command will delete the existing remappings and re-create
          them

  -d, --recursive-deps
          If set, this command will install dependencies recursively (via git
          submodules or via soldeer)

      --clean
          Perform a clean install by re-installing all dependencies

      --config-location <CONFIG_LOCATION>
          Specify the config location without prompting.
          
          This prevents prompting the user if the automatic detection can't
          determine the config location.

          Possible values:
          - foundry: Store config inside the `foundry.toml` file
          - soldeer: Store config inside the `soldeer.toml` file

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

For more information, read the README.md
```