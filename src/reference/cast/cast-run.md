## cast run

### NAME

cast-run - Runs a published transaction in a local environment and prints the trace.

### SYNOPSIS

``cast run`` [*options*] `--rpc-url` *url* *tx_hash*

### DESCRIPTION

Runs a published transaction in a local environment and prints the trace.

By default, all transactions in the block prior to the transaction you want to replay are also replayed.
If you want a quicker result, you can use `--quick`, however, results may differ from the live execution.

You can also open the transaction in a debugger by passing `--debug`.

### OPTIONS

#### Run Options

`--label` *label*  
&nbsp;&nbsp;&nbsp;&nbsp;Labels an address in the trace.  
&nbsp;&nbsp;&nbsp;&nbsp;The format is `<address>:<label>`. Can be passed multiple times.

`-q`  
`--quick`  
&nbsp;&nbsp;&nbsp;&nbsp;Executes the transaction only with the state from the previous block.  
&nbsp;&nbsp;&nbsp;&nbsp;May result in different results than the live execution!

`-v`  
`--verbose`  
&nbsp;&nbsp;&nbsp;&nbsp;Addresses are fully displayed instead of being truncated.

`-d`  
`--debug`  
&nbsp;&nbsp;&nbsp;&nbsp;Open the script in the [debugger][debugger].

#### RPC Options

{{#include ../common/rpc-url-option.md}}

{{#include common-options.md}}

### EXAMPLES

1. Replay a transaction (a simple transfer):
    ```sh
    cast run 0xd15e0237413d7b824b784e1bbc3926e52f4726e5e5af30418803b8b327b4f8ca
    ```

2. Replay a transaction, applied on top of the state of the previous block:
    ```sh
    cast run --quick \
      0xd15e0237413d7b824b784e1bbc3926e52f4726e5e5af30418803b8b327b4f8ca
    ```

3. Replay a transaction with address labels:
    ```sh
    cast run \
      --label 0xc564ee9f21ed8a2d8e7e76c085740d5e4c5fafbe:sender \
      --label 0x40950267d12e979ad42974be5ac9a7e452f9505e:recipient \
      --label 0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2:weth \
      0xd15e0237413d7b824b784e1bbc3926e52f4726e5e5af30418803b8b327b4f8ca
    ```

4. Replay a transaction in the debugger:
    ```sh
    cast run --debug \
      0xd15e0237413d7b824b784e1bbc3926e52f4726e5e5af30418803b8b327b4f8ca
    ```

### SEE ALSO

[cast](./cast.md)

[debugger]: ../../forge/debugger.md
