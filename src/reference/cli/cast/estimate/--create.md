# cast estimate --create

Estimate gas cost to deploy a smart contract

```bash
$ cast estimate --create --help
```

```txt
Usage: cast estimate --create [OPTIONS] <CODE> [SIG] [ARGS]...

Arguments:
  <CODE>
          The bytecode of contract

  [SIG]
          The signature of the constructor

  [ARGS]...
          Constructor arguments

Options:
      --value <VALUE>
          Ether to send in the transaction
          
          Either specified in wei, or as a string with a unit type:
          
          Examples: 1ether, 10gwei, 0.01ether

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