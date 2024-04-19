## Clone a Verified Contract on Chain

To clone an on-chain verified contract as a Forge project, use [`forge clone`](../reference/forge/forge-clone.md), say [WETH9](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2) on Ethereum mainnet:

```sh
{{#include ../output/clone_contract/forge-clone:command}}
```

This creates a new directory `WETH9`, configures it as a foundry project and clones all the source code of the contract into it. This also initializes a new `git` repository.

```sh
{{#include ../output/clone_contract/forge-clone:output}}
```

The cloned Forge project comes with an additional `.clone.meta` metadata file besides those ordinary files that a normal Forge project has.

Let's see what the `.clone.meta` file looks like:

```sh
{{#include ../output/clone_contract/clone-meta:output}}
```

`clone.meta` is a compact JSON data file that contains the information of the on-chain contract instance, e.g., contract address, constructor arguments, etc. More details of the metadata can be found in the [reference](../reference/forge/forge-clone.md#metadata).