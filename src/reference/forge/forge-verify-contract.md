## forge verify-contract

### NAME

forge-verify-contract - Verify smart contracts on a chosen verification provider.

### SYNOPSIS

``forge verify-contract`` [*options*] *address* *contract*

### DESCRIPTION

Verifies a smart contract on a chosen verification provider.

You must provide:
- The contract address
- The contract name or the path to the contract (read below)
In case of Etherscan verification, you must also provide:
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

{{#include ../common/verifier-options.md}}

`--compiler-version` *version*  
&nbsp;&nbsp;&nbsp;&nbsp;The compiler version used to build the smart contract.

&nbsp;&nbsp;&nbsp;&nbsp;To find the exact compiler version, run `~/.svm/x.y.z/solc-x.y.z --version` where `x` and
`y` are major and minor version numbers respectively, then search for the 8 hex digits in the version string [here](https://etherscan.io/solcversions).

`--num-of-optimizations` *num*  
`--optimizer-runs` *num*      
&nbsp;&nbsp;&nbsp;&nbsp;The number of optimization runs used to build the smart contract.

`--constructor-args` *args*  
&nbsp;&nbsp;&nbsp;&nbsp;The ABI-encoded constructor arguments. Conflicts with `--constructor-args-path`.

`--constructor-args-path` *file*  
&nbsp;&nbsp;&nbsp;&nbsp;The path to a file containing the constructor arguments. Conflicts with `--constructor-args`.

`--chain-id` *chain*  
`--chain` *chain*  
&nbsp;&nbsp;&nbsp;&nbsp;The ID or name of the chain the contract is deployed to.  
&nbsp;&nbsp;&nbsp;&nbsp;Default: mainnet

`--flatten`  
&nbsp;&nbsp;&nbsp;&nbsp;Flag indicating whether to flatten the source code before verifying.

&nbsp;&nbsp;&nbsp;&nbsp;If this flag is not provided, the JSON standard input will be used instead.

`-f`  
`--force`  
&nbsp;&nbsp;&nbsp;&nbsp;Do not compile the flattened smart contract before verifying.

{{#include ../common/retry-options.md}}

`--show-standard-json-input`  
&nbsp;&nbsp;&nbsp;&nbsp;Command outputs JSON suitable for saving to a file and uploading to block explorers for verification.

`--watch`  
&nbsp;&nbsp;&nbsp;&nbsp;Wait for verification result after submission.  
&nbsp;&nbsp;&nbsp;&nbsp;Automatically runs `forge verify-check` until the verification either fails or succeeds.

{{#include project-options.md}}

{{#include common-options.md}}

### EXAMPLES

1. Verify a contract with JSON standard input on Etherscan
    ```sh
    forge verify-contract <address> SomeContract --watch

2. Verify a contract on a custom Sourcify instance
    ```sh
    forge verify-contract --verifier sourcify \
      --verifier-url http://localhost:5000 <address> SomeContract
    ```

3. Verify a flattened contract built with solc v0.8.11+commit.d7f03943:
    ```sh
    forge verify-contract --flatten --watch --compiler-version "v0.8.11+commit.d7f03943" \
      --constructor-args $(cast abi-encode "constructor(string,string,uint256,uint256)" "ForgeUSD" "FUSD" 18 1000000000000000000000) \
      <address> MyToken
    ```

4. Verify a flattened contract by specifying constructor arguments in a file:
    ```sh
    forge verify-contract --flatten --watch --compiler-version "v0.8.11+commit.d7f03943" \
      --constructor-args-path constructor-args.txt <address> src/Token.sol:MyToken
    ```
    where `constructor-args.txt` contains the following content:
    ```text
    ForgeUSD FUSD 18 1000000000000000000000
    ```
    
5. Verify a contract with Blockscout right after deployment (make sure you add "/api?" to the end of the Blockscout homepage explorer URL):
    ```sh
    forge create --rpc-url <rpc_https_endpoint> --private-key $devTestnetPrivateKey src/Contract.sol:SimpleStorage --verify --verifier blockscout --verifier-url <blockscout_homepage_explorer_url>/api? 
    ```

### SEE ALSO

[forge](./forge.md), [forge create](./forge-create.md), [forge flatten](./forge-flatten.md), [forge verify-check](./forge-verify-check.md)
