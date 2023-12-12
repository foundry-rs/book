# forge verify-contract

Verify smart contracts on Etherscan

```bash
$ forge verify-contract --help
Usage: forge verify-contract [OPTIONS] <ADDRESS> <CONTRACT>

Arguments:
  <ADDRESS>
          The address of the contract to verify

  <CONTRACT>
          The contract identifier in the form `<path>:<contractname>`

Options:
      --constructor-args <ARGS>
          The ABI-encoded constructor arguments

      --constructor-args-path <PATH>
          The path to a file containing the constructor arguments

      --compiler-version <VERSION>
          The `solc` version to use to build the smart contract

      --num-of-optimizations <NUM>
          The number of optimization runs used to build the smart contract
          
          [aliases: optimizer-runs]

      --flatten
          Flatten the source code before verifying

  -f, --force
          Do not compile the flattened smart contract before verifying (if --flatten is passed)

      --skip-is-verified-check
          Do not check if the contract is already verified before verifying

      --watch
          Wait for verification result after submission

      --root <PATH>
          The project's root path.
          
          By default root of the Git repository, if in one, or the current working directory.

      --show-standard-json-input
          Prints the standard json compiler input.
          
          The standard json compiler input can be used to manually submit contract verification in the browser.

  -e, --etherscan-api-key <KEY>
          The Etherscan (or equivalent) API key
          
          [env: ETHERSCAN_API_KEY=]

  -c, --chain <CHAIN>
          The chain name or EIP-155 chain ID
          
          [env: CHAIN=]

      --retries <RETRIES>
          Number of attempts for retrying verification
          
          [default: 5]

      --delay <DELAY>
          Optional delay to apply inbetween verification attempts, in seconds
          
          [default: 5]

  -h, --help
          Print help (see a summary with '-h')

Linker options:
      --libraries <LIBRARIES>
          Set pre-linked libraries
          
          [env: DAPP_LIBRARIES=]

Verifier options:
      --verifier <VERIFIER>
          The contract verification provider to use
          
          [default: etherscan]
          [possible values: etherscan, sourcify, blockscout]

      --verifier-url <VERIFIER_URL>
          The verifier URL, if using a custom provider
          
          [env: VERIFIER_URL=]
```