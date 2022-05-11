## Overview of Anvil

Anvil is Foundry's local testnet node implementation written in Rust. You can use it for testing your contracts from frontends or interacting over RPC.

### How to get Anvil

You can get Anvil on all Foundry-supported platforms with the latest `foundryup`.

1. Update foundryup: `curl -L https://foundry.paradigm.xyz | bash`
2. Run it: `foundryup`

### How to use Anvil

To use Anvil, run `anvil`

You should see a list of accounts and private keys available for use, there are also some subcommands you could run to configure the test node. You can run `anvil -h` to see them.

Some examples of them are:

```bash
//  Number of dev accounts to generate and configure. [default: 10]
anvil -a, --accounts <ACCOUNTS>

// The EVM hardfork to use. [default: latest]
anvil --hardfork <HARDFORK>

// Port number to listen on. [default: 8545]
anvil  -p, --port <PORT>
```

### Examples

To deploy a contract to our newly created testnet node, we would run the following:

```bash
// Copy the the private key from anvil
forge create --rpc-url http://localhost:8545/ --private-key <TESTNET_PRIVATE_KEY> src/Contract.sol:MyToken --constructor-args "My Token" "MT"
```

To send a transaction with cast:

```bash
cast send --rpc-url http://localhost:8545/ <CONTRACT_ADDRESS>  <FUNCTION_NAME> --private-key <TESTNET_PRIVATE_KEY>
```

To make a call with to a contract with cast:

```bash
cast call --rpc-url http://localhost:8545/ --private-key <TESTNET_PRIVATE_KEY> <CONTRACT_ADDRESS> <FUNCTION_NAME>

```
