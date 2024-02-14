## probe to-hexdata

### NAME

probe-to-hexdata - Normalize the input to lowercase, 0x-prefixed hex.

### SYNOPSIS

``probe to-hexdata`` [*options*] *input*

### DESCRIPTION

Normalize the input to lowercase, 0x-prefixed hex.

The input data (*input*) can either be:

- Mixed case hex with or without the 0x prefix.
- 0x prefixed hex that should be concatenated, separated by `:`.
- An absolute path to a file containing hex.
- A `@tag`, where the tag is defined in an environment variable.

### OPTIONS

{{#include common-options.md}}

### EXAMPLES

1. Add 0x prefix:
    ```sh
    probe to-hexdata deadbeef
    ```

2. Concatenate hex values:
    ```sh
    probe to-hexdata "deadbeef:0xbeef"
    ```

3. Normalize hex value in `MY_VAR`:
    ```sh
    probe to-hexdata "@MY_VAR"
    ```

### SEE ALSO

[probe](./probe.md)
