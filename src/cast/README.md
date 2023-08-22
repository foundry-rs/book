## Overview of Cast

Cast is Foundry's command-line tool for performing Ethereum RPC calls. You can make smart contract calls, send transactions, or retrieve any type of chain data - all from your command-line!

### How to use Cast

To use Cast, run the [`cast`](../reference/cast/cast.md) command followed by a subcommand:

```bash
$ cast <subcommand>
```

#### Examples

Let's use `cast` to retrieve the total supply of the DAI token:

```bash
{{#include ../output/cast/cast-call:all}}
```

`cast` also provides many convenient subcommands, such as for decoding calldata:

```bash
{{#include ../output/cast/cast-4byte-decode:all}}
```

You can also use `cast` to send arbitrary messages. Here's an example of sending a message between two Anvil accounts.

```bash
$ cast send --private-key <Your Private Key> 0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc $(cast from-utf8 "hello world") --rpc-url http://127.0.0.1:8545/
```

<br>

> 📚 **Reference**
> 
> See the [`cast` Reference](../reference/cast/) for a complete overview of all the available subcommands.
