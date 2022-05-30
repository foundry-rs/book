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
<br>

> 📚 **Reference**
> 
> See the [`cast` Reference](../reference/cast/) for a complete overview of all the available subcommands.
