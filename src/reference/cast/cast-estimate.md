## cast estimate

### NAME

cast-estimate - Estimate the gas cost of a transaction.

### SYNOPSIS

``cast estimate`` [*options*] *to* *sig* [*args...*]

### DESCRIPTION

Estimate the gas cost of a transaction.

The destination (*to*) can be an ENS name or an address.

{{#include sig-description.md}}

### OPTIONS

#### Transaction Options

{{#include ../common/tx-value-option.md}}

{{#include ../common/rpc-options.md}}

{{#include ../common/etherscan-options.md}}

{{#include common-options.md}}

### EXAMPLES

1. Estimate the gas cost of calling `deposit()` on the WETH contract:
    ```sh
    cast estimate 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2 \
      --value 0.1ether "deposit()"
    ```

### SEE ALSO

[cast](./cast.md), [cast send](./cast-send.md), [cast publish](./cast-publish.md), [cast receipt](./cast-receipt.md)
