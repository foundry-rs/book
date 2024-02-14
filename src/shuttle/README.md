## Overview of Shuttle

Shuttle is a local testnet node shipped with Foxar. You can use it for testing your contracts from frontends or for interacting over RPC.

Shuttle is part of the Foxar suite and is installed alongside `spark`, `probe`, and `pilot`. If you haven't installed Foxar yet, see [Foxar installation](../getting-started/installation.md). 

> Note: If you have an older version of Foxar installed, you'll need to re-install `foxarup` in order for Shuttle to be downloaded.

### How to use Shuttle

To use Shuttle, simply type `shuttle`. You should see a list of accounts and private keys available for use, as well as the address and port that the node is listening on. 

Shuttle is highly configurable. You can run `shuttle -h` to see all the configuration options.

Some basic options are:

```bash
#  Number of dev accounts to generate and configure. [default: 10]
shuttle -a, --accounts <ACCOUNTS>

# The EVM hardfork to use. [default: latest]
shuttle --hardfork <HARDFORK>

# Port number to listen on. [default: 8545]
shuttle  -p, --port <PORT>
```

> 📚 **Reference**
>
> See the [`shuttle` Reference](../reference/shuttle/) for in depth information on Shuttle and its capabilities.

