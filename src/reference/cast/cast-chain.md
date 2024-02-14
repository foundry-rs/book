## probe chain

### NAME

probe-chain - Get the symbolic name of the current chain.

### SYNOPSIS

``probe chain`` [*options*]

### DESCRIPTION

Get the symbolic chain name from the RPC endpoint we are connected to.

### OPTIONS

#### RPC Options

{{#include ../common/rpc-url-option.md}}

{{#include common-options.md}}

### EXAMPLES

1. Get the chain name when talking to `$RPC`:
    ```sh
    probe chain --rpc-url $RPC
    ```

2. Get the chain name when `$ETH_RPC_URL` is set:
    ```sh
    probe chain
    ```

### SEE ALSO

[probe](./probe.md), [probe chain-id](./probe-chain-id.md)
