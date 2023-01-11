## Overview of Anvil

Anvil is a local testnet node shipped with Foundry. You can use it for testing your contracts from frontends or for interacting over RPC.

Anvil is part of the Foundry suite and is installed alongside `forge`, `cast`, and `chisel`. If you haven't installed Foundry yet, see [Foundry installation](../getting-started/installation.md). 

> Note: If you have an older version of Foundry installed, you'll need to re-install `foundryup` in order for Anvil to be downloaded.

### How to use Anvil

To use Anvil, simply type `anvil`. You should see a list of accounts and private keys available for use, as well as the address and port that the node is listening on. 

Anvil is highly configurable. You can run `anvil -h` to see all the configuration options.

Some basic options are:

```bash
#  Number of dev accounts to generate and configure. [default: 10]
anvil -a, --accounts <ACCOUNTS>

# The EVM hardfork to use. [default: latest]
anvil --hardfork <HARDFORK>

# Port number to listen on. [default: 8545]
anvil  -p, --port <PORT>
```

> 📚 **Reference**
>
> See the [`anvil` Reference](../reference/anvil/) for in depth information on Anvil and its capabilities.

