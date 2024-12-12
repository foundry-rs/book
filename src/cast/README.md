## Cast

Cast is a Swiss Army knife for interacting with Ethereum applications from the command line. You can make smart contract calls, send transactions, or retrieve any type of chain data - all from your command-line!

The `cast` binary can be used both within and outside of a Foundry project.

Cast is part of the Foundry suite and is installed alongside `forge`, `chisel`, and `anvil`. If you haven't installed Foundry
yet, see [Foundry installation](../getting-started/installation.md).

### Getting started

Here are a few examples of what you can do:

**Check the latest block on Ethereum Mainnet**:

```sh
cast block-number --rpc-url https://eth.merkle.io
```

**Check the Ether balance of `vitalik.eth`**

```sh
cast balance vitalik.eth --ether --rpc-url https://eth.merkle.io
```

**Replay and trace a transaction**

```sh
cast run 0x9c32042f5e997e27e67f82583839548eb19dc78c4769ad6218657c17f2a5ed31 --rpc-url https://eth.merkle.io
```

Optionally, pass `--etherscan-api-key <API_KEY>` to decode transaction traces using verified source maps, providing more detailed and human-readable information.

**Retrieve the total supply of the DAI token**

```sh
{{#include ../output/cast/cast-call:all}}
```

**Decode calldata**

```sh
{{#include ../output/cast/cast-4byte-decode:all}}
```

**Send messages between two Anvil accounts**

```sh
cast send --private-key <PRIVATE_KEY> 0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc $(cast from-utf8 "hello world") --rpc-url http://127.0.0.1:8545/
```

### Features

TODO: add comprehensive list of features

<br>

> 📚 **Reference**
>
> See the [`cast` Reference](../reference/cast/README.md) for a complete overview of all the available subcommands.
