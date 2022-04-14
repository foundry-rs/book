## cast etherscan-source

### NAME

cast-etherscan-source - Get the source code of a contract from Etherscan.

### SYNOPSIS

``cast etherscan-source`` [*options*] *address*

### DESCRIPTION

Get the source code of a contract from Etherscan.

The destination (*to*) can be an ENS name or an address.

### OPTIONS

#### Output Options

`-d` *directory*  
&nbsp;&nbsp;&nbsp;&nbsp;The output directory to expand the source tree into.
&nbsp;&nbsp;&nbsp;&nbsp;If not provided, the source will be outputted to stdout.

{{#include ../common/etherscan-options.md}}

{{#include common-options.md}}

### EXAMPLES

1. Get the source code of the WETH contract:
    ```sh
    cast etherscan-source 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
    ```

2. Expand the source code of the WETH contract into a directory named `weth`
    ```sh
    cast etherscan-source -d weth 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
    ```

### SEE ALSO

[cast](./cast.md)
