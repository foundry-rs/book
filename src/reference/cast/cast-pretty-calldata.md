## cast pretty-calldata

### NAME

cast-pretty-calldata - Pretty print calldata.

### SYNOPSIS

``cast pretty-calldata`` [*options*] *calldata*

### DESCRIPTION

Pretty print calldata.

Tries to decode the calldata using <https://4byte.directory> unless `--offline` is passed.

### OPTIONS

#### 4byte Options

`-o`  
`--offline`  
&nbsp;&nbsp;&nbsp;&nbsp;Skip the <https://4byte.directory> lookup.

{{#include common-options.md}}

### EXAMPLES

1. Decode calldata for a `transfer` call:
    ```sh
    cast pretty-calldata 0xa9059cbb000000000000000000000000e78388b4ce79068e89bf8aa7f218ef6b9ab0e9d00000000000000000000000000000000000000000000000000174b37380cea000
    ```

### SEE ALSO

[cast](./cast.md), [cast 4byte-decode](./cast-4byte-decode.md)
