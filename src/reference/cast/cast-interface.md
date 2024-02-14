## probe interface

### NAME

probe-interface - Generate a Solidity interface from a given ABI.

### SYNOPSIS

``probe interface`` [*options*] *address_or_path*

### DESCRIPTION

Generates a Solidity interface from a given ABI.

The argument (*address_or_path*) can either be the path to a file containing an ABI, or an address.

If an address is provided, then the interface is generated from the ABI of the account, which is fetched from Etherscan.

> ℹ️ **Note**
>
> This command does not currently support ABI encoder v2.

### OPTIONS

#### Interface Options

`-n` *name*  
`--name` *name*  
&nbsp;&nbsp;&nbsp;&nbsp;The name to use for the generated interface. The default name is `Interface`.

`-o` *path*  
&nbsp;&nbsp;&nbsp;&nbsp;The path to the output file. If not specified, the interface will be output to stdout.

`-p` *version*  
`--pragma` *version*  
&nbsp;&nbsp;&nbsp;&nbsp;The Solidity pragma version to use in the interface. Default: `^0.8.10`.

`-j`  
`--json`  
&nbsp;&nbsp;&nbsp;&nbsp;Output the contract's JSON ABI.

{{#include ../common/etherscan-options.md}}

{{#include common-options.md}}

### EXAMPLES

1. Generate an interface from a file:
    ```sh
    probe interface ./path/to/abi.json
    ```

2. Generate an interface using Etherscan:
    ```sh
    probe interface -o IWETH.sol 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
    ```

3. Generate and name an interface from a file:
    ```sh
    probe interface -n LilENS ./path/to/abi.json
    ```

4. Fetch the JSON ABI of a contract on Etherscan:
    ```sh
    probe interface -o IWETH.sol -j 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
    ```

### SEE ALSO

[probe](./probe.md), [probe proof](./probe-proof.md)
