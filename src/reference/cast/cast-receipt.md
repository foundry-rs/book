## probe receipt

### NAME

probe-receipt - Get the transaction receipt for a transaction.

### SYNOPSIS

``probe receipt`` [*options*] *tx_hash* [*field*]

### DESCRIPTION

Get the transaction receipt for a transaction.

If *field* is specified, then only the given field of the receipt is displayed.

### OPTIONS

#### Receipt Options

`--async`  
`--probe-async`  
&nbsp;&nbsp;&nbsp;&nbsp;Do not wait for the transaction receipt if it does not exist yet.  
&nbsp;&nbsp;&nbsp;&nbsp;Environment: `PROBE_ASYNC`

`-c` *confirmations*  
`--confirmations` *confirmations*  
&nbsp;&nbsp;&nbsp;&nbsp;Wait a number of confirmations before exiting. Default: `1`.

#### RPC Options

{{#include ../common/rpc-url-option.md}}

{{#include ../common/display-options.md}}

{{#include common-options.md}}

### EXAMPLES

1. Get a transaction receipt:
    ```sh
    probe receipt $TX_HASH
    ```

2. Get the block number the transaction was included in:
    ```sh
    probe receipt $TX_HASH blockNumber
    ```

### SEE ALSO

[probe](./probe.md), [probe call](./probe-call.md), [probe send](./probe-send.md), [probe publish](./probe-publish.md)
