## cast chain

### NAME

cast-chain - Get the symbolic name of the current chain.

### SYNOPSIS

``cast chain`` [*options*]

### DESCRIPTION

Get the symbolic chain name from the RPC endpoint we are connected to.

### OPTIONS

#### RPC Options

{{#include ../common/rpc-url-option.md}}

{{#include common-options.md}}

### EXAMPLES

1. Get the chain name when talking to `$RPC`:
    ```sh
    cast chain --rpc-url $RPC
    ```

2. Get the chain name when `$ETH_RPC_URL` is set:
    ```sh
    cast chain
    ```

### SEE ALSO

[cast](./cast.md), [cast chain-id](./cast-chain-id.md)
