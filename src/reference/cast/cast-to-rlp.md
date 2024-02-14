## probe to-rlp

### NAME

probe-to-rlp - Encodes hex data to RLP.

### SYNOPSIS

``probe to-rlp`` *array*

### DESCRIPTION

RLP encodes a hex string or a JSON array of hex strings.

### OPTIONS

{{#include common-options.md}}

### EXAMPLES

1. Encoding RLP data:
    ```sh
    probe to-rlp '["0xaa","0xbb","cc"]'
   
    probe to-rlp f0a9     
    ```
