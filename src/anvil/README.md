## Anvil

Anvil is a fast local Ethereum development node.

Anvil is part of the Foundry suite and is installed alongside `forge`, `cast` and `chisel`. If you haven't installed Foundry
yet, see [Foundry installation](../getting-started/installation.md).

### Getting started

To use Anvil, simply type `anvil`. To fork against a live Ethereum network run `anvil --fork-url <RPC_URL>`.

Let's fork Ethereum mainnet at the latest block:

```console
$ anvil --fork-url https://eth.merkle.io


                             _   _
                            (_) | |
      __ _   _ __   __   __  _  | |
     / _` | | '_ \  \ \ / / | | | |
    | (_| | | | | |  \ V /  | | | |
     \__,_| |_| |_|   \_/   |_| |_|

    0.2.0 (c4fcf12 2024-12-12T00:23:45.094165202Z)
    https://github.com/foundry-rs/foundry

Available Accounts
==================

(0) 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000.000000000000000000 ETH)
(1) 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 (10000.000000000000000000 ETH)
(2) 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC (10000.000000000000000000 ETH)
(3) 0x90F79bf6EB2c4f870365E785982E1f101E93b906 (10000.000000000000000000 ETH)
(4) 0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 (10000.000000000000000000 ETH)
(5) 0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc (10000.000000000000000000 ETH)
(6) 0x976EA74026E726554dB657fA54763abd0C3a0aa9 (10000.000000000000000000 ETH)
(7) 0x14dC79964da2C08b23698B3D3cc7Ca32193d9955 (10000.000000000000000000 ETH)
(8) 0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f (10000.000000000000000000 ETH)
(9) 0xa0Ee7A142d267C1f36714E4a8F75612F20a79720 (10000.000000000000000000 ETH)

Private Keys
==================

(0) 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
(1) 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
(2) 0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
(3) 0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6
(4) 0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926a
(5) 0x8b3a350cf5c34c9194ca85829a2df0ec3153be0318b5e2d3348e872092edffba
(6) 0x92db14e403b83dfe3df233f83dfa3a0d7096f21ca9b0d6d6b8d88b2b4ec1564e
(7) 0x4bbbf85ce3377467afe5d46f804f221813b2bb87f24d81f60f1fcdbf7cbf4356
(8) 0xdbda1821b80551c9d65939329250298aa3472ba22feea921c0cf5d620ea67b97
(9) 0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6

Wallet
==================
Mnemonic:          test test test test test test test test test test test junk
Derivation path:   m/44'/60'/0'/0/


Fork
==================
Endpoint:       https://eth.merkle.io
Block number:   21387064
Block hash:     0x904aee789b82ac0412448bc2ea9bb3774d10c2dae4a0e5b7f6451ac2ecd0787a
Chain ID:       1

Base Fee
==================

26049293674

Gas Limit
==================

30000000

Genesis Timestamp
==================

1734014216

Listening on 127.0.0.1:8545
```

### Features

#### Configuration

Anvil is highly configurable, allowing you to:

- **Mining Modes**: Choose automatic mining (default), interval mining (`--block-time <seconds>`), or on-demand mining (`--no-mining`).
- **Accounts and Balances**: Set the number of accounts (`--accounts`) and their Ether balance (`--balance`).
- **Genesis Initialization**: Start with a custom genesis file (`--init <genesis.json>`), defining parameters like `chainId`, `gasLimit`, and preallocated accounts.
- **EVM Hardforks**: Simulate specific Ethereum hardforks (e.g., `shanghai`, `paris`) using `--hardfork`.
- **Transport Layers**: Supports HTTP and WebSocket connections on port 8545 (customizable via `--port`).
- **Chain State**: Save/load states with `--state`, `--dump-state`, or `--load-state` for persistence.

#### Forking

Anvil can fork live Ethereum or EVM-compatible networks:

- **State Replication**: Use `--fork-url` to replicate a network’s state at a specific block (`--fork-block-number`) or transaction (`--fork-transaction-hash`).
- **Offline Testing**: Combine `--fork-chain-id` with cached state for offline scenarios.
- **Caching and Rate Limits**: Disable caching with `--no-storage-caching` or manage RPC requests using `--compute-units-per-second` or `--no-rate-limit`.

#### State Management

Flexible state management options include:

- **Snapshots**: Save and reload chain states with `--state`, `--dump-state`, and `--load-state`.
  - `--state` is an alias for both `--load-state` and `--dump-state`, it initializes the chain with the state and block environment stored at the file, if it exists, and dumps the chain's state on exit.
- **Historical States**: Preserve or prune states with `--preserve-historical-states` or `--prune-history`. Set the number of persisted states using `--max-persisted-states`.
- **Intervals**: Control state dump intervals with `--state-interval`.

#### RPC Methods

Supports standard Ethereum RPC methods (`eth_getBlockByNumber`, `eth_sendTransaction`, etc.), Anvil-specific methods (`anvil_impersonateAccount`, `anvil_setBalance`, etc.), and tracing/debugging (`debug_traceTransaction`, `evm_snapshot`, etc.).

#### Default CREATE2 Deployer

Includes a CREATE2 deployer proxy (`0x4e59b44847b379578588920ca78fbf26c0b4956c`), allowing CREATE2 testing without forking.

#### Genesis Configuration

Customize network initialization using a `genesis.json` file to set `chainId`, `gasLimit`, preallocated accounts, and other parameters.

<br>

> 📚 **Reference**
>
> See the [`anvil` Reference](../reference/anvil/README.md) for in depth information on Anvil and its capabilities.
