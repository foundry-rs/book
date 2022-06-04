## cast 4byte-event

### NAME

cast-4byte-event - Get the event signature for a given topic 0 from <https://sig.eth.samczsun.com>.

### SYNOPSIS

``cast 4byte-event`` [*options*] *topic_0*

### DESCRIPTION

Get the event signature for a given topic 0 from <https://sig.eth.samczsun.com>.

### OPTIONS

{{#include common-options.md}}

### EXAMPLES

1. Get the event signature for a topic 0 of `0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef`:
    ```sh
    cast 4byte-event 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef
    ```

### SEE ALSO

[cast](./cast.md), [cast 4byte](./cast-4byte.md), [cast 4byte-decode](./cast-4byte-decode.md)
