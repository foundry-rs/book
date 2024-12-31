## Paymaster Overview

Paymasters in the ZKsync ecosystem represent a groundbreaking approach to handling transaction fees. They are special accounts designed to subsidize transaction costs for other accounts, potentially making certain transactions free for end-users. This feature is handy for dApp developers looking to improve their platform's accessibility and user experience by covering transaction fees on behalf of their users.

### How Paymasters Work

Paymasters are smart contracts that implement the `IPaymaster` interface. They are designed to be used with the ZKsync network's transaction processing mechanism. The paymaster is specified in the metadata when a transaction is sent from an account. The paymaster is then responsible for paying the transaction fee and any other costs associated with the transaction.

## How to interact with a Paymaster using Foundry

Currently, the ways to interact with a paymaster contract using Foundry are using `cast send`, `forge create`, or the `zkUsePaymaster` cheatcode.

### Using `cast send`

`cast send` signs and publishes a transaction. The documentation can be found [here](../reference/cast/cast-send.md). 

The command must specify the paymaster address and the encoded paymaster input to pair this with a paymaster contract.

The flags for this are: 

`--zk-paymaster-address`  
&nbsp;&nbsp;&nbsp;&nbsp;The address where the paymaster contract is deployed.

`--zk-paymaster-input`  
&nbsp;&nbsp;&nbsp;&nbsp;The encoded input for the paymaster contract. This depends on the paymaster contract implementation.

To encode the paymaster input, you can use the `cast calldata` command, which can be found [here](../reference/cast/cast-calldata.md).

```bash
cast send 0xdb8bA5F5DfB1636361d2fE851d7D3ed93acfc487 "increment()" --rpc-url https://sepolia.era.zksync.dev --private-key <your-private-key> --zk-paymaster-address 0x3cB2b87D10Ac01736A65688F3e0Fb1b070B3eeA3 --zk-paymaster-input $(cast calldata "approvalBased(address,uint256,bytes)" 0x31c43ac5e6A0fe62954B9056441b0A214722516e 1000000000000000000 "0x")
```

### Using `forge create`

`forge create` is a command-line tool for deploying smart contracts using the Foundry framework. The documentation can be found [here](../reference/forge/forge-create.md).

The paymaster contract address must be specified in the command to deploy a paymaster contract using `forge create`.

The flags for this are: 

`--zk-paymaster-address`  
&nbsp;&nbsp;&nbsp;&nbsp;The address where the paymaster contract is deployed.

`--zk-paymaster-input`  
&nbsp;&nbsp;&nbsp;&nbsp;The encoded input for the paymaster contract. This depends on the paymaster contract implementation.

To encode the paymaster input, you can also use the `cast calldata` command, which can be found [here](../reference/cast/cast-calldata.md).

```bash
forge create Greeter.sol:Greeter --rpc-url "https://sepolia.era.zksync.dev" --private-key <your-private-key> --zksync --zk-paymaster-address 0x3cB2b87D10Ac01736A65688F3e0Fb1b070B3eeA3 --zk-paymaster-input $(cast calldata "approvalBased(address,uint256,bytes)" 0x31c43ac5e6A0fe62954B9056441b0A214722516e 1 "0x")
```

Also, see the [ZKsync Paymaster Documentation](https://docs.zksync.io/build/developer-reference/account-abstraction/paymasters) for more information.
