## Overview of Probe

Probe is Foxar's command-line tool for performing Ethereum RPC calls. You can make smart contract calls, send transactions, or retrieve any type of chain data - all from your command-line!

### How to use Probe

To use Probe, run the [`probe`](../reference/probe/probe.md) command followed by a subcommand:

```bash
$ probe <subcommand>
```

#### Examples

Let's use `probe` to retrieve the total supply of the DAI token:

```bash
{{#include ../output/probe/probe-call:all}}
```

`probe` also provides many convenient subcommands, such as for decoding calldata:

```bash
{{#include ../output/probe/probe-4byte-decode:all}}
```

You can also use `probe` to send arbitrary messages. Here's an example of sending a message between two Shuttle accounts.

```bash
$ probe send --private-key <Your Private Key> 0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc $(probe from-utf8 "hello world") --rpc-url http://127.0.0.1:8545/
```

<br>

> 📚 **Reference**
> 
> See the [`probe` Reference](../reference/probe/) for a complete overview of all the available subcommands.
