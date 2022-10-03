## cast index

### NAME

cast-index - Compute the storage slot for an entry in a mapping.

### SYNOPSIS

``cast index`` *key_type* *value_type* *key* *slot*

### DESCRIPTION

Compute the storage slot for an entry in a mapping.

### OPTIONS

{{#include common-options.md}}

### EXAMPLES

1. Compute the storage slot of an entry (`hello`) in a mapping of type `mapping(string => uint256)`, located at slot 2:
    ```sh
    cast index string "hello" 2
    ```

### SEE ALSO

[cast](./cast.md)
