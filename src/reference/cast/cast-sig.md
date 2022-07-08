## cast sig

### NAME

cast-sig - Get the selector for a function.

### SYNOPSIS

``cast sig`` [*options*] *sig*

### DESCRIPTION

Get the selector for a function.

The signature (*sig*) is a fragment in the form `<function name>(<types...>)`.

### OPTIONS

{{#include common-options.md}}

### EXAMPLES

1. Get the selector for the function `transfer(address,uint256)`:
    ```sh
    cast sig "transfer(address,uint256)"
    ```

2. Get the selector for a function that expects a `struct`:

    ```solidity
    contract Test {
        struct MyStruct {
            address addr;
            uint256 amount;
        }
        function myfunction(MyStruct memory t) public pure {}
    }
    ```

    Structs are encoded as tuples (see [struct encoding](../../misc/struct-encoding.md)).

    ```sh
    cast sig "myfunction((address,uint256))"
    ```
### SEE ALSO

[cast](./cast.md), [struct encoding](../../misc/struct-encoding.md)
