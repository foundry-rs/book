## forge create

### NAME

forge-create - Deploy a smart contract.

### SYNOPSIS

``forge create`` [*options*] *contract*

### DESCRIPTION

Deploy a smart contract.

The path to the contract is in the format `<path>:<contract>`, e.g. `src/Contract.sol:Contract`.

You can specify constructor arguments with `--constructor-args`. Alternatively, you can specify a file
containing space-separated constructor arguments with `--constructor-args-path`.

Dynamic linking is not supported: you should predeploy your libraries and manually specify their addresses (see `--libraries`).

> ℹ️ **Note**
>
> The `--constructor-args` flag must be positioned last in the command, since it takes multiple values.

### OPTIONS

#### Build Options

`--constructor-args` *args...*  
&nbsp;&nbsp;&nbsp;&nbsp;The constructor arguments.

`--constructor-args-path` *file*  
&nbsp;&nbsp;&nbsp;&nbsp;The path to a file containing the constructor arguments.

`--verify`  
&nbsp;&nbsp;&nbsp;&nbsp;Verify contract after creation. Runs `forge verify-contract` with the appropriate parameters.

{{#include ../common/verifier-options.md}}

`--unlocked`  
&nbsp;&nbsp;&nbsp;&nbsp;Send via `eth_sendTransaction` using the `--from` argument or `$ETH_FROM` as sender.

{{#include ../common/transaction-options.md}}

{{#include ../common/wallet-options.md}}

{{#include ../common/rpc-options.md}}

{{#include ../common/etherscan-options.md}}

{{#include core-build-options.md}}

{{#include ../common/display-options.md}}

{{#include common-options.md}}

### EXAMPLES

1. Deploy a contract with no constructor arguments:
    ```sh
    forge create src/Contract.sol:ContractWithNoConstructor
    ```

2. Deploy a contract with two constructor arguments:
    ```sh
    forge create src/Contract.sol:MyToken --constructor-args "My Token" "MT"
    ```

### SEE ALSO

[forge](./forge.md), [forge build](./forge-build.md), [forge verify-contract](./forge-verify-contract.md)

[eip1559]: https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md
