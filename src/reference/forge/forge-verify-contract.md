## forge verify-contract

### NAME

forge-verify-contract - Verify smart contracts on Etherscan.

### SYNOPSIS

``forge verify-contract`` [*options*] `--compiler-version` *compiler_version* *address* *contract* [*etherscan_key*]

### DESCRIPTION

Verifies a smart contract on Etherscan.

You must provide:
- The compiler version used to build your smart contracts (`--compiler-version`, read below)
- The contract address
- The path to the contract (read below)
- Your Etherscan API key, either by passing it as an argument or setting `ETHERSCAN_API_KEY`

To find the exact compiler version, run `~/.svm/x.y.z/solc-x.y.z --version` and search for the 8 hex digits in the version string [here](https://etherscan.io/solcversions).

The path to the contract is in the format `<path>:<contract>`, e.g. `src/Contract.sol:Contract`.

By default, smart contracts are verified in a multi-file fashion. If you want to flatten the contract before verifying, pass `--flatten`.

This command will try to compile the source code of the flattened contract if `--flatten` is passed before verifying. If you do not want that, pass `--force`.

You can specify **ABI-encoded** constructor arguments with `--constructor-args`. Alternatively,
you can specify a file containing **space-separated** constructor arguments with `--constructor-args-path`.
(Note that [cache](../config/project.html#cache) must be enabled in the config for the latter to work.)

### OPTIONS

#### Verify Contract Options

`--compiler-version` *version*  
&nbsp;&nbsp;&nbsp;&nbsp;The compiler version used to build the smart contract.

&nbsp;&nbsp;&nbsp;&nbsp;To find the exact compiler version, run `~/.svm/x.y.z/solc-x.y.z --version` where `x` and
`y` are major and minor version numbers respectively, then search for the 8 hex digits in the version string [here](https://etherscan.io/solcversions).

`--num-of-optimizations` *num*  
&nbsp;&nbsp;&nbsp;&nbsp;The number of optimization runs used to build the smart contract.

`--constructor-args` *args*  
&nbsp;&nbsp;&nbsp;&nbsp;The ABI-encoded constructor arguments.

`--constructor-args-path` *file*  
&nbsp;&nbsp;&nbsp;&nbsp;The path to a file containing the constructor arguments.

`--chain-id` *chain*  
`--chain` *chain*  
&nbsp;&nbsp;&nbsp;&nbsp;The ID or name of the chain the contract is deployed to.  
&nbsp;&nbsp;&nbsp;&nbsp;Default: mainnet

`--flatten`  
&nbsp;&nbsp;&nbsp;&nbsp;Flatten the source code before verifying.

`-f`  
`--force`  
&nbsp;&nbsp;&nbsp;&nbsp;Do not compile the flattened smart contract before verifying.

{{#include ../common/retry-options.md}}

`--watch`  
&nbsp;&nbsp;&nbsp;&nbsp;Wait for verification result after submission.  
&nbsp;&nbsp;&nbsp;&nbsp;Automatically runs `forge verify-check` until the verification either fails or succeeds.

{{#include project-options.md}}

{{#include common-options.md}}

### EXAMPLES

1. Verify a contract built with solc v0.8.11+commit.d7f03943:
    ```sh
    forge verify-contract --compiler-version "v0.8.11+commit.d7f03943" \
      --constructor-args $(cast abi-encode "constructor(string,string,uint256,uint256)" "ForgeUSD" "FUSD" 18 1000000000000000000000) \
      src/Token.sol:MyToken
    ```

2. Verify a contract by specifying constructor arguments in a file:
    ```sh
    forge verify-contract --compiler-version "v0.8.11+commit.d7f03943" \
      --constructor-args constructor-args.txt src/Token.sol:MyToken
    ```
    where `constructor-args.txt` contains the following content:
    ```text
    ForgeUSD FUSD 18 1000000000000000000000
    ```


### SEE ALSO

[forge](./forge.md), [forge create](./forge-create.md), [forge flatten](./forge-flatten.md), [forge verify-check](./forge-verify-check.md)
