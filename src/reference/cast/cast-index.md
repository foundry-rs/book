## cast index

### NAME

cast-index - Compute the storage slot location for an entry in a mapping.

### SYNOPSIS

``cast index`` *key_type* *key* *slot*

### DESCRIPTION

Compute the storage slot location for an entry in a mapping.

Use `cast storage` to get the value.

### OPTIONS

{{#include common-options.md}}

### EXAMPLES
```solidity
// World.sol

mapping (address => uint256) public mapping1;
mapping (string => string) public mapping2;
```

1. Compute the storage slot of an entry (`hello`) in a mapping of type `mapping(string => string)`, located at slot 1:
    ```sh
    >> cast index string "hello" 1
    0x3556fc8e3c702d4479a1ab7928dd05d87508462a12f53307b5407c969223d1f8
    >> cast storage [address] 0x3556fc8e3c702d4479a1ab7928dd05d87508462a12f53307b5407c969223d1f8
    world
    ```

### SEE ALSO

[cast](./cast.md)
