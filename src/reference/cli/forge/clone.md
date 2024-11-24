# forge clone

Clone a contract from Etherscan

```bash
$ forge clone --help
```

```txt
Usage: forge clone [OPTIONS] <ADDRESS> [PATH]

Arguments:
  <ADDRESS>
          The contract address to clone

  [PATH]
          The root directory of the cloned project
          
          [default: .]

Options:
      --no-remappings-txt
          Do not generate the remappings.txt file. Instead, keep the remappings
          in the configuration

      --keep-directory-structure
          Keep the original directory structure collected from Etherscan.
          
          If this flag is set, the directory structure of the cloned project
          will be kept as is. By default, the directory structure is re-orgnized
          to increase the readability, but may risk some compilation failures.

  -e, --etherscan-api-key <KEY>
          The Etherscan (or equivalent) API key
          
          [env: ETHERSCAN_API_KEY=]

  -c, --chain <CHAIN>
          The chain name or EIP-155 chain ID
          
          [env: CHAIN=]

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
          - 5 (-vvvvv): Print execution and setup traces for all tests.
```