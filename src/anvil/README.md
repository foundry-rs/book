## Overview of Anvil

Anvil is Foundry's local testnet node implementation written in Rust. You can use it for testing your contracts from frontends or interacting over RPC.

Anvil is a part of Foundry, so as long as you have the updated version of Foudry, You should have it installed. [Foundry installation](../getting-started/installation.md)

### How to use Anvil

To use Anvil, run `anvil`.

You should see a list of accounts and private keys available for use, there are also some options you could run to configure the test node. You can run `anvil -h` to see them.

Some examples of them are:

```bash
#  Number of dev accounts to generate and configure. [default: 10]
anvil -a, --accounts <ACCOUNTS>

# The EVM hardfork to use. [default: latest]
anvil --hardfork <HARDFORK>

# Port number to listen on. [default: 8545]
anvil  -p, --port <PORT>
```

