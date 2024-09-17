## Deterministic deployment using CREATE2 on ZKsync

### Introduction

Enshrined into the EVM as part of the [Constantinople fork](https://ethereum.org/en/history/#constantinople) of 2019, `CREATE2` is an opcode that started its journey as [EIP-1014](https://eips.ethereum.org/EIPS/eip-1014).
`CREATE2` allows you to deploy smart contracts to deterministic addresses, based on parameters controlled by the deployer.
As a result, it's often mentioned as enabling "counterfactual" deployments, where you can interact with an addresses that haven't been created yet because `CREATE2` guarantees known code can be placed at that address.
This is in contrast to the `CREATE` opcode, where the address of the deployed contract is a function of the deployer's nonce.
 With `CREATE2`, you can use the same deployer account to deploy contracts to the same address across multiple networks, even if the address has varying nonces.

> ℹ️ **Note**
>This guide is intended to help understand `CREATE2`. In most use cases, you won't need to write and use your own deployer, and can use an existing deterministic deployer (`new MyContract{salt: salt}()`).

In this tutorial, we will:

1. Look at a `CREATE2` factory implementation.
2. Deploy the factory using the traditional deployment methods.
3. Use this deployed factory to in turn deploy a simple counter contract at a deterministic address.
4. Simulate this set of events by writing a simple test using Foundry ZKsync.

### Prerequisites

1. Some familiarity with Solidity and Foundry is required, and some familiarity with inline assembly is recommended. Refer to the [official Solidity docs](https://docs.soliditylang.org/en/latest/assembly.html) for a primer on inline assembly.
2. Make sure you have Foundry ZKsync [installed](../getting-started/installation.md) on your system.
3. [Initialize](../projects/creating-a-new-project.md) a new Foundry project.
4. Install the ZKsync contracts by running the following command in your project directory:

    ```bash
    forge install matter-labs/era-contracts
    ```

### CREATE2 Factory

Create a file named `Create2ZK.sol` Inside the `src` directory.
Initialize a contract named `Create2ZK` like this:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Create2ZK {

    error Create2FailedDeployment();
}
```

The error is meant to enforce some sanity checks on the factory deployment, and revert the whole transaction when triggered.
The `Create2FailedDeployment()` error triggers if the deployment fails for any reason.

> ℹ️ **Note**
>
> Please note that a `CREATE2` deployment may fail due to a number of reasons. For example, if the bytecodeHash is invalid, or if a
> contract is already deployed at the computed address. Your deployment may also fail if your constructor reverts for any reason.

Next, create a function named `deploy`:

```solidity
function deploy(bytes32 salt, bytes32 bytecodeHash, bytes calldata inputData) external payable returns (address addr) {
 
 }
```

This function takes 3 inputs:

1. The `salt` used to calculate the final address. This can basically be any random value we want it to be.
2. The `bytecodeHash` of the contract that we want to deploy.
3. The `inputData` which are the constructor parameters of the contract.

The address of the newly deployed contract is the returned after a successful deploy.

> ℹ️ **Note**
>
> You can send ETH to a contract that is being deployed using `CREATE2`, but only if it has a payable constructor.
> If you try to send ETH to it without a payable constructor, the transaction will revert.

Next, we will call the `create2` function from the `ContractDeployer` system contract on ZKsync. This can be done by calling `SystemContractsCaller.systemCallWithReturndata` to interact with system contracts:

To call the `create2` function, we need to pass in 3 parameters:

```solidity
    (bool success, bytes memory returnData) = SystemContractsCaller
        .systemCallWithReturndata(
            uint32(gasleft()),
            address(DEPLOYER_SYSTEM_CONTRACT),
            uint128(0),
            abi.encodeCall(
                DEPLOYER_SYSTEM_CONTRACT.create2,
                (
                    salt,
                    bytecodeHash,
                    inputData
                )
            )
        );
```

1. The **salt**: This is used to differentiate contract deployments and ensure unique contract addresses. It is a key part of the deterministic address generation in `CREATE2`.
2. The **bytecodeHash**: In ZKsync, contracts are deployed using the hash of the bytecode, not the bytecode itself.
3. The **inputData**: This contains the constructor arguments for the contract being deployed. Similar to traditional contract deployment, this field passes the initialization data to the contract being deployed.

Alternatively, instead of writing your own deployment logic, you can leverage the `CREATE2Factory.sol` system contract, which simplifies calling the `create2` method. In many cases, you won’t need to manually write a deployer function since you can use existing deterministic deployers, such as the `CREATE2Factory.sol` system contract, or deploy contracts directly using the `new MyContract{salt: salt}()` syntax.

Here’s an example of how you can use the `CREATE2Factory.sol`:

```solidity
import {Create2Factory} from "era-contracts/system-contracts/contracts/Create2Factory.sol";

Create2Factory create2Factory = new Create2Factory();
address deployedAddress = create2Factory.create2(
    salt,
    bytecodeHash,
    abi.encode()
);
```

This method allows you to deploy a contract deterministically without having to write the deployment logic from scratch. It handles the `create2` call and returns the address of the newly deployed contract.

This approach simplifies the deployment process by using a pre-built deployer contract, making it easier to manage and reuse your deployment logic across different projects.

Finally, if the deployment fails for any reason, you can handle it by reverting the transaction, similar to how you would handle failure in the EVM:

```solidity
if (!success) {
    revert Create2FailedDeployment();
}
```

### Computing the Contract Address on zkSync

Lastly, we will create a view function named `computeAddress`. This function should take in the `salt`, `bytecodeHash`, and `constructorInput` as parameters and return the address of the contract that would be deployed using the `deploy` function on ZKsync:

```solidity
function computeAddress(
    address sender,
    bytes32 salt, 
    bytes32 bytecodeHash, 
    bytes32 constructorInputHash
) external view returns (address addr) {

 }
```

Inside the function, we’ll use the `L2ContractHelper.computeCreate2Address` method, which follows the address calculation logic specific to ZKsync:

```solidity
import {L2ContractHelper} from "era-contracts/l2-contracts/contracts/L2ContractHelper.sol";

function computeAddress(
    address sender,
    bytes32 salt, 
    bytes32 bytecodeHash, 
    bytes32 constructorInputHash
) external view returns (address addr) {

    address computedAddress = L2ContractHelper.computeCreate2Address(
        sender,
        salt,
        bytecodeHash,
        constructorInputHash
    );
}
```

Here’s the breakdown of the parameters and logic used in ZKsync’s `CREATE2` address calculation:

1. **Sender**: This refers to the address of the contract (typically the factory contract) calling the `create2` function.
2. **Salt**: The `salt` is used to differentiate deployments and ensure unique contract addresses, just like in traditional `CREATE2` usage.
3. **Bytecode Hash**: In ZKsync, you must pass the hash of the contract bytecode. This hash must be known to the operator, as the actual bytecode is provided in the `factory_deps` field of the transaction. For more info on this refer to the
docs [here](https://docs.zksync.io/build/developer-reference/ethereum-differences/contract-deployment#ethereum-zksync-differences-in-contract-deployment).
4. **Constructor Input Hash**: ZKsync requires the constructor input (or initialization) data to be hashed using `keccak256`. This hash is then included in the address derivation formula.

The ZKsync-specific address derivation formula differs slightly from Ethereum’s traditional `CREATE2`:

```solidity
bytes32 hash = keccak256(
    bytes.concat(
        CREATE2_PREFIX,               // zkSync-specific prefix
        bytes32(uint256(uint160(_sender))),  // Address of the contract deployer
        _salt,                         // Salt for the deployment
        _bytecodeHash,                 // Hash of the bytecode
        constructorInputHash           // Hash of the constructor input data
    )
);
```

> ℹ️ **Note**
>
> The prefix (`CREATE2_PREFIX`) is specific to ZKsync, helping avoid collisions with Ethereum’s `CREATE2` opcode. The `keccak256` function is used to compute the hash from these components, and the address is derived from this hash.

Finally, we will return the calculated address, ensuring it conforms to the ZKsync address derivation rules:

```solidity
return address(uint160(uint256(hash)));
```

### Formula Recap

The formula that ZKsync uses to calculate the contract address is:

```bash
keccak256(zksyncCreate2 ++ address ++ salt ++ keccak256(bytecode) ++ keccak256(constructorInput))[12:]
```

- `zksyncCreate2` is a ZKsync-specific prefix to avoid collisions.
- `address` is the contract deployer’s address.
- `salt` is the deployment salt.
- `keccak256(bytecode)` is the hash of the contract bytecode.
- `keccak256(constructorInput)` is the hash of the constructor data.

These values are concatenated and passed through `keccak256` to produce a 32-byte hash, and the last 20 bytes are used as the deployed contract’s address.

> ℹ️ **Note**
>
> You can check out the complete code for this implementation [here](https://github.com/dutterbutter/min-zksync-create2).

### Testing our factory

Create a file named `Create2ZK.t.sol` inside the `test` directory. Initialize a contract named `Create2ZKTest` like this:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import {Counter} from "../src/Counter.sol";
import {ZKCreate2} from "../src/Create2zk.sol";
import {ACCOUNT_CODE_STORAGE_SYSTEM_CONTRACT} from "era-contracts/system-contracts/contracts/Constants.sol";

contract Create2ZKTest is Test {

}
```

Initialize the following state variables and the `setUp()` function:

```solidity
    Create2ZK internal create2ZK;
    Counter internal counter;

    function setUp() public {
        create2ZK = new Create2ZK();
        counter = new Counter();
    }
```

### Deterministic Deployment Test

We’ll now create a function named `testDeterministicDeployment()` to do the following:

1. Deploy a new instance of the `ZKCreate2` contract.
2. Allocate 100 ETH to the deployer address, using the `vm.deal` cheat code, and impersonate this address with the `prank` cheat code.
3. Set up the `salt` and `bytecodeHash` parameters.
4. Use the `zkCreate2` contract to deploy the `Counter` contract at a deterministic address using the `create2` system contract.
5. Assert that the computed address is equal to the deployed address.

```solidity
    function testDeterministicDeployment() public {
        address deployerAddress = address(create2ZK);
        
        // Deal 100 ETH to the deployer address
        vm.deal(deployerAddress, 100 ether);
        vm.startPrank(deployerAddress);

        // Set up salt and retrieve bytecode hash
        bytes32 salt = "12345";
        bytes32 bytecodeHash = ACCOUNT_CODE_STORAGE_SYSTEM_CONTRACT.getRawCodeHash(address(counter));

        // Compute the expected address using ZKsync's specific `CREATE2` logic
        address expectedAddress = zkCreate2.computeCreate2Address(
            deployerAddress,
            salt,
            bytecodeHash,
            keccak256(abi.encode()) // constructor input data hash
        );

        // Deploy the contract using the `ZKCreate2` contract
        address deployedAddress = create2ZK.deploy(
            salt,
            bytecodeHash,
            abi.encode() // constructor input data
        );

        vm.stopPrank();

        // Log the computed and deployed addresses for debugging
        console.log("Computed address:", expectedAddress);
        console.log("Deployed address:", deployedAddress);

        // Assert that the computed address matches the deployed address
        assertEq(deployedAddress, expectedAddress);
    }
```

### Explanation

- **`vm.deal`**: This cheat code allocates 100 ETH to the deployer address, allowing it to fund contract deployments.
- **`vm.startPrank`**: This makes the deployer address impersonate the caller for all subsequent calls, so we simulate real-world deployment scenarios.
- **`bytes32 salt`**: The salt is used to ensure the deployed contract has a deterministic address.
- **`bytes32 bytecodeHash`**: We retrieve the bytecode hash of the `Counter` contract from the `ACCOUNT_CODE_STORAGE_SYSTEM_CONTRACT` to pass it to the ZKsync `CREATE2` function.
- **`abi.encode()`**: We use this to pass constructor input data, hashed using `keccak256`.
- **`computeCreate2Address`**: This function computes the expected address based on ZKsync's deterministic address calculation for `CREATE2`.
- **`deploy`**: This deploys the contract using ZKsync’s `ContractDeployer` system contract.

Finally, we assert that the expected address matches the deployed address, ensuring that the contract was deployed deterministically.

Save all your files, and run the test using `forge test --match-path test/Create2ZK.t.sol --zksync --enable-eravm-extensions -vvvv`.
Your test should pass without any errors.
