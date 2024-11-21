## cast 4byte

### NAME

cast-4byte - Get the function signatures for the given selector from <https://openchain.xyz/signatures>.

### SYNOPSIS

`cast 4byte` [*options*] _sig_

### DESCRIPTION

Get the function signatures for the given selector from <https://openchain.xyz/signatures>.

### OPTIONS

{{#include common-options.md}}

### EXAMPLES

1. Get the function signature for the selector `0x8cc5ce99`:
   ```sh
   cast 4byte 0x8cc5ce99
   ```

### SEE ALSO

[cast](./cast.md), [cast 4byte-decode](./cast-4byte-decode.md), [cast 4byte-event](./cast-4byte-event.md), [cast selectors](./cast-selectors.md)
