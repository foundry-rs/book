## cast chain-id

### NAME

cast-chain-id - Get the Ethereum chain ID.

### SYNOPSIS

``cast chain-id`` [*options*]

### DESCRIPTION

Get the Ethereum [chain ID][chain-id] from the RPC endpoint we are connected to.

### OPTIONS

#### RPC Options

{{#include ../common/rpc-url-option.md}}

{{#include common-options.md}}

### EXAMPLES

1. Get the chain ID when talking to `$RPC`:
    ```sh
    cast chain-id --rpc-url $RPC
    ```

2. Get the chain ID when `$ETH_RPC_URL` is set:
    ```sh
    cast chain-id
    ```

### SEE ALSO

[cast](./cast.md), [cast chain](./cast-chain.md)

[chain-id]: https://chainlist.org/
