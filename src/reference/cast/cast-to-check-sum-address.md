## cast to-check-sum-address

### NAME

cast-to-check-sum-address - Convert an address to a checksummed format ([EIP-55][eip55]).

### SYNOPSIS

``cast to-check-sum-address`` *address*

### DESCRIPTION

Convert an address to a checksummed format ([EIP-55][eip55]).

### OPTIONS

{{#include common-options.md}}

### EXAMPLES

1. Convert an address to its checksummed format:
    ```sh
    cast to-check-sum-address 0xDf99A0839818B3f120EBAC9B73f82B617Dc6A555
    ```

### SEE ALSO

[cast](./cast.md)

[eip55]: https://github.com/ethereum/EIPs/blob/master/EIPS/eip-55.md
