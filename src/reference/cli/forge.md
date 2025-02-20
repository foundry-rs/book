# forge

Build, test, fuzz, debug and deploy Solidity contracts

```bash
$ forge --help
```

```txt
Usage: forge [OPTIONS] <COMMAND>

Commands:
  bind               Generate Rust bindings for smart contracts
  bind-json          Generate bindings for serialization/deserialization of
                     project structs via JSON cheatcodes
  build              Build the project's smart contracts [aliases: b, compile]
  cache              Manage the Foundry cache
  clean              Remove the build artifacts and cache directories [aliases:
                     cl]
  clone              Clone a contract from Etherscan
  compiler           Compiler utilities
  completions        Generate shell completions script [aliases: com]
  config             Display the current config [aliases: co]
  coverage           Generate coverage reports
  create             Deploy a smart contract [aliases: c]
  debug              Debugs a single smart contract as a script [aliases: d]
  doc                Generate documentation for the project
  eip712             Generate EIP-712 struct encodings for structs from a given
                     file
  flatten            Flatten a source file and all of its imports into one file
                     [aliases: f]
  fmt                Format Solidity source files
  geiger             Detects usage of unsafe cheat codes in a project and its
                     dependencies
  generate           Generate scaffold files
  generate-fig-spec  Generate Fig autocompletion spec [aliases: fig]
  help               Print this message or the help of the given subcommand(s)
  init               Create a new Forge project
  inspect            Get specialized information about a smart contract
                     [aliases: in]
  install            Install one or multiple dependencies [aliases: i]
  remappings         Get the automatically inferred remappings for the project
                     [aliases: re]
  remove             Remove one or multiple dependencies [aliases: rm]
  script             Run a smart contract as a script, building transactions
                     that can be sent onchain
  selectors          Function selector utilities [aliases: se]
  snapshot           Create a gas snapshot of each test's gas usage [aliases: s]
  soldeer            Soldeer dependency manager
  test               Run the project's tests [aliases: t]
  tree               Display a tree visualization of the project's dependency
                     graph [aliases: tr]
  update             Update one or multiple dependencies [aliases: u]
  verify-bytecode    Verify the deployed bytecode against its source on
                     Etherscan [aliases: vb]
  verify-check       Check verification status on Etherscan [aliases: vc]
  verify-contract    Verify smart contracts on Etherscan [aliases: v]

Options:
  -h, --help
          Print help (see a summary with '-h')

  -j, --threads <THREADS>
          Number of threads to use. Specifying 0 defaults to the number of
          logical cores
          
          [aliases: jobs]

  -V, --version
          Print version

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

Find more information in the book:
http://book.getfoundry.sh/reference/forge/forge.html
```