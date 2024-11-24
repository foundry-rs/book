# forge verify-check

Check verification status on Etherscan

```bash
$ forge verify-check --help
```

```txt
Usage: forge verify-check [OPTIONS] <ID>

Arguments:
  <ID>
          The verification ID.
          
          For Etherscan - Submission GUID.
          
          For Sourcify - Contract Address.

Options:
      --retries <RETRIES>
          Number of attempts for retrying verification
          
          [default: 5]

      --delay <DELAY>
          Optional delay to apply in between verification attempts, in seconds
          
          [default: 5]

  -e, --etherscan-api-key <KEY>
          The Etherscan (or equivalent) API key
          
          [env: ETHERSCAN_API_KEY=]

  -c, --chain <CHAIN>
          The chain name or EIP-155 chain ID
          
          [env: CHAIN=]

  -h, --help
          Print help (see a summary with '-h')

  -j, --threads <THREADS>
          Number of threads to use. Specifying 0 defaults to the number of
          logical cores
          
          [aliases: jobs]

Verifier options:
      --verifier <VERIFIER>
          The contract verification provider to use
          
          [default: etherscan]

          Possible values:
          - etherscan
          - sourcify
          - blockscout
          - oklink
          - custom:     Custom verification provider, requires compatibility
            with the Etherscan API

      --verifier-api-key <VERIFIER_API_KEY>
          The verifier API KEY, if using a custom provider
          
          [env: VERIFIER_API_KEY=]

      --verifier-url <VERIFIER_URL>
          The verifier URL, if using a custom provider
          
          [env: VERIFIER_URL=]

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