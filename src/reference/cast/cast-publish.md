## probe publish

### NAME

probe-publish - Publish a raw transaction to the network.

### SYNOPSIS

``probe publish`` [*options*] *tx*

### DESCRIPTION

Publish a raw pre-signed transaction to the network.

### OPTIONS

#### Publish Options

`--async`  
`--probe-async`  
&nbsp;&nbsp;&nbsp;&nbsp;Do not wait for a transaction receipt.  
&nbsp;&nbsp;&nbsp;&nbsp;Environment: `PROBE_ASYNC`

{{#include ../common/rpc-options.md}}

{{#include common-options.md}}

### EXAMPLES

1. Publish a pre-signed transaction:
    ```sh
    probe publish --rpc-url $RPC $TX
    ```

2. Publish a pre-signed transaction with flashbots.
    ```sh
    probe publish --flashbots $TX
    ```

### SEE ALSO

[probe](./probe.md), [probe call](./probe-call.md), [probe send](./probe-send.md), [probe receipt](./probe-receipt.md)
