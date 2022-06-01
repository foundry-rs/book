## cast 4byte-decode

### NAME

cast-4byte-decode - Decode ABI-encoded calldata using <https://sig.eth.samczsun.com>.

### SYNOPSIS

``cast 4byte-decode`` [*options*] *calldata*

### DESCRIPTION

Decode ABI-encoded calldata using <https://sig.eth.samczsun.com>.

### OPTIONS

#### 4byte Options

`--id` *id*  
&nbsp;&nbsp;&nbsp;&nbsp;The index of the resolved signature to use.
&nbsp;&nbsp;&nbsp;&nbsp;  
&nbsp;&nbsp;&nbsp;&nbsp;<https://sig.eth.samczsun.com> can have multiple possible signatures for a given selector.  
&nbsp;&nbsp;&nbsp;&nbsp;The index can be an integer, or the tags "earliest" and "latest".

{{#include common-options.md}}

### EXAMPLES

1. Decode calldata for a `transfer` call:
    ```sh
    cast 4byte-decode 0xa9059cbb000000000000000000000000e78388b4ce79068e89bf8aa7f218ef6b9ab0e9d00000000000000000000000000000000000000000000000000174b37380cea000
    ```

### SEE ALSO

[cast](./cast.md), [cast 4byte](./cast-4byte.md), [cast 4byte-event](./cast-4byte-event.md)
