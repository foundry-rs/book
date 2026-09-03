---
description: Get started with Foundry's four core tools - Forge, Cast, Anvil, and Chisel.
---

## Getting Started

Foundry is a fast, portable, and modular toolkit for Ethereum development. After [installing Foundry](/introduction/installation), you have access to four tools:

| Tool | Purpose | Reference |
|------|---------|-----------|
| `forge` | Build, test, debug, deploy, and verify smart contracts | [Reference](/reference/forge/forge) |
| `cast` | Interact with contracts, send transactions, and query chain data | [Reference](/reference/cast/cast) |
| `anvil` | Run a local Ethereum node with forking capabilities | [Reference](/reference/anvil/anvil) |
| `chisel` | Solidity REPL for rapid prototyping | [Reference](/reference/chisel/chisel) |

:::tip
Run any command with `--help` for detailed usage information.
:::

:::note
See the [CLI reference](/reference/forge/forge) for every command and flag.
:::

## Quick start with Forge

Create and test a smart contract in under 30 seconds:

::::steps

### Create a new project

```bash
$ forge init hello_foundry
$ cd hello_foundry
```

### Build contracts

```bash
$ forge build
```

### Run tests

```bash
$ forge test
```

::::

The generated project includes a `Counter` contract and test:

:::terminal
```bash
// [!include ~/snippets/output/hello_foundry/forge-test:command]
```

```ansi
// [!include ~/snippets/output/hello_foundry/forge-test:output]
```
:::

Deploy using a Forge script:

```bash
$ forge script script/Counter.s.sol
```

## Local development with Anvil

Start a local Ethereum node:

```bash
$ anvil
```

This creates 10 pre-funded test accounts. Fork mainnet state for realistic testing:

```bash
$ anvil --fork-url https://eth.merkle.io
```

## Interact with chains using Cast

Query blockchain data:

```bash [Check an address balance]
$ cast balance vitalik.eth --ether --rpc-url https://eth.merkle.io
```

```bash [Get the latest block number]
$ cast block-number --rpc-url https://eth.merkle.io
```

```bash [Call a contract function]
$ cast call 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2 "totalSupply()" --rpc-url https://eth.merkle.io
```

Send transactions to your local Anvil node:

```bash [Send ETH using an Anvil test account]
$ cast send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 \
    --value 1ether \
    --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

## Prototype with Chisel

Start the Solidity REPL:

```bash
$ chisel
```

Write and execute Solidity interactively:

```solidity
➜ uint256 x = 42;
➜ x * 2
Type: uint256
├ Hex: 0x54
└ Decimal: 84

➜ function double(uint256 n) public pure returns (uint256) { return n * 2; }
➜ double(21)
Type: uint256
└ Decimal: 42
```

Type `!help` to see available commands.

## Next steps

- [Write your first tests](/forge/testing)
- [Test against mainnet state](/guides/fork-testing)
- [Deploy and verify a contract](/guides/deploying-contracts)
- [Track gas usage](/forge/gas-tracking)
