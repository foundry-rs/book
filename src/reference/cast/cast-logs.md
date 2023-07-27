## cast logs

### NAME

cast logs - Get logs by signature or topic.

### SYNOPSIS

``cast logs`` [*options*] *sig_or_topic* [*topics_or_args...*]


### DESCRIPTION

Get logs by signature or topic.

The (*sig_or_topic*) may either be the event signature or its hashed topic (located at topics[0]).

If using a signature, remaining arguments must be in their ordinary form. If using a topic, the arguments must be as they themselves appear as topics.

### OPTIONS

### Query Options

`--from-block` *from_block*
&nbsp;&nbsp;&nbsp;&nbsp;The block height to start query at.

&nbsp;&nbsp;&nbsp;&nbsp;Can also be the tags: `earliest`, `finalized`, `safe`, `latest`, or `pending`.

`--to-block` *to_block*
&nbsp;&nbsp;&nbsp;&nbsp;The block height to stop query at.

&nbsp;&nbsp;&nbsp;&nbsp;Can also be the tags: `earliest`, `finalized`, `safe`, `latest`, or `pending`.

`--address` *address*
&nbsp;&nbsp;&nbsp;&nbsp;The contract address to filter on

{{#include ../common/wallet-options.md}}

{{#include ../common/rpc-options.md}}

{{#include ../common/etherscan-options.md}}

### EXAMPLES

1. Get logs using a signature:
    ```sh
    cast logs --from-block 15537393 --to-block latest 'Transfer (address indexed from, address indexed to, uint256 value)' 0x2e8ABfE042886E4938201101A63730D04F160A82
    ```
2. Get logs using a topic:
    ```sh
    cast logs --from-block 15537393 --to-block latest 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef 0x0000000000000000000000002e8abfe042886e4938201101a63730d04f160a82
    ```

### SEE ALSO

[cast](./cast.md)
