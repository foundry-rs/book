
## Overview of Anvil-ZKsync

Anvil-ZKsync is a local testnet node shipped with Foundry-ZKsync. You can use it for testing your contracts from frontends or for interacting over RPC.

Anvil-ZKsync is part of the Foundry-ZKsync suite and is installed alongside `forge`, and `cast`. If you haven't installed Foundry-ZKsync yet, see [Foundry-ZKsync installation](/introduction/installation). 

> Note: If you have an older version of Foundry-ZKsync installed, you'll need to re-install `foundryup-zksync` in order for Anvil-ZKsync to be downloaded.

### How to use Anvil-ZKsync

To use Anvil-ZKsync, simply type `anvil-zksync`. You should see a list of accounts and private keys available for use, as well as the address and port that the node is listening on.

Anvil-ZKsync is highly configurable. You can run `anvil-zksync -h` to see all the configuration options.

Some basic options are:

```bash
#  Number of dev accounts to generate and configure. [default: 10]
anvil-zksync -a, --accounts <ACCOUNTS>

# Port number to listen on. [default: 8545]
anvil-zksync  -p, --port <PORT>
```
