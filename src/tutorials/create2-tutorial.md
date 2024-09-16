## Deterministic deployment using CREATE2

### Introduction

Enshrined into the EVM as part of the [Constantinople fork](https://ethereum.org/en/history/#constantinople) of 2019, `CREATE2` is an opcode that started its journey as [EIP-1014](https://eips.ethereum.org/EIPS/eip-1014).
`CREATE2` allows you to deploy smart contracts to deterministic addresses, based on parameters controlled by the deployer.
As a result, it's often mentioned as enabling "counterfactual" deployments, where you can interact with an addresses that haven't been created yet because `CREATE2` guarantees known code can be placed at that address.
This is in contrast to the `CREATE` opcode, where the address of the deployed contract is a function of the deployer's nonce.
 With `CREATE2`, you can use the same deployer account to deploy contracts to the same address across multiple networks, even if the address has varying nonces.

> ℹ️ **Note**
>This guide is intended to help understand `CREATE2`. In most use cases, you won't need to write and use your own deployer, and can use an existing deterministic deployer. In forge scripts, using `new MyContract{salt: salt}()` will use the deterministic deployer at [0x4e59b44847b379578588920ca78fbf26c0b4956c](https://github.com/Arachnid/deterministic-deployment-proxy).

In this tutorial, we will:

1. Look at a `CREATE2` factory implementation.
2. Deploy the factory using the traditional deployment methods.
3. Use this deployed factory to in turn deploy a simple counter contract at a deterministic address.
4. Simulate this set of events by writing a simple test in Foundry.

### Prerequisites

1. Some familiarity with Solidity and Foundry is required, and some familiarity with the inline assembly is recommended.
Refer to the [official Solidity docs](https://docs.soliditylang.org/en/latest/assembly.html) for a primer on inline assembly.
2. Make sure you have Foundry [installed](../getting-started/installation.md) on your system.
3. [Initialize](../projects/creating-a-new-project.md) a new Foundry project.

### CREATE2 Factory

Create a file named `Create2.sol` Inside the `src` directory.
Initialize a contract named `Create2` like this:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Create2 {

    error Create2EmptyBytecode();

    error Create2FailedDeployment();
}
```

These errors are meant to enforce some sanity checks on the factory deployment, and revert the whole transaction when triggered.
The `Create2EmptyBytecode()` error triggers if the bytecode passed to the `deploy` function is empty, and the `Create2FailedDeployment()` error triggers if the deployment fails for any reason.

> ℹ️ **Note**
>
> Please note that a `CREATE2` deployment may fail due to a number of reasons. For example, if the bytecode is invalid, or if a
> contract is already deployed at the computed address. Your deployment may also fail if your constructor reverts for any reason.

Next, create a function named `deploy`:

```solidity
function deploy(bytes32 salt, bytes memory creationCode) external payable returns (address addr) {
 
 }
```

This function takes 2 inputs:

1. The `salt` used to calculate the final address. This can basically be any random value we want it to be.
2. The creation code of the contract that we want to deploy.

The address of the newly deployed contract is the returned after a successful deploy.

> ℹ️ **Note**
>
> You can send ETH to a contract that is being deployed using `CREATE2`, but only if it has a payable constructor.
> If you try to send ETH to it without a payable constructor, the transaction will revert.

Add this revert statement at the top of the deploy function. We want our function to reject the deploy request if the following conditions are not met:

```solidity
    if (creationCode.length == 0) {
        revert Create2EmptyBytecode();
    }
```

Next, we will call the `CREATE2` opcode using inline assembly, which can be done using the `assembly` keyword:

To call [the CREATE2 opcode from inline assembly](https://docs.soliditylang.org/en/latest/yul.html#evm-dialect), we need to pass in 4 parameters:

```solidity
    assembly {
        addr := create2(callvalue(), add(creationCode, 0x20), mload(creationCode), salt)
    }
```

1. The amount of ETH that we want to send to the new address as part of the deployment. Here we just pass in the `callvalue()`, which is the amount of ETH sent to the factory contract as part of the transaction. Think of it as a lower level version of `msg.value`.
2. The second and third parameters refer to the range of memory our bytecode is located in. `add(bytecode, 0x20)` takes in a reference to the location of the `bytes` variable bytecode in memory, and skips 32 bytes (0x20 in hex) to point to the actual bytecode.

> ℹ️ **Note**
>
> The `bytes` type in Solidity is a dynamically sized byte array, where the first 32 bytes of memory
> represent the length of the array, and the remaining bytes represent the actual data. Therefore, when we pass in a reference to
> `bytes` variable, we need to skip the first 32 bytes to point to the actual data.
> Read more about the `add` and `mload` opcodes at [evm.codes](https://www.evm.codes/?fork=shanghai).

Finally, we will revert the whole transaction if the deployment fails for any reason, in which case the `CREATE2` opcode will return a 0 address:

```solidity
        if (addr == address(0)) {
            revert Create2FailedDeployment();
        }
```

Lastly, let us create a view function named `computeAddress`. This function should take in the `salt` and `creationCode` as parameters, and return the address of the contract that would be deployed using the `deploy` function:

```solidity
function computeAddress(bytes32 salt, bytes32 creationCodeHash) external view returns (address addr) {

 }
```

Inside the function, paste the following code that uses inline assembly to calculate the address by performing the same calculations as the `CREATE2` opcode would:

```solidity
    address contractAddress = address(this);
        
    assembly {
        let ptr := mload(0x40)

        mstore(add(ptr, 0x40), creationCodeHash)
        mstore(add(ptr, 0x20), salt)
        mstore(ptr, contractAddress)
        let start := add(ptr, 0x0b)
        mstore8(start, 0xff)
        addr := keccak256(start, 85)
    }
```

Before trying to understand the assembly code here, let us take a look at the formula that the `CREATE2` opcode uses to calculate the address:

```bash
keccak256(0xff ++ address ++ salt ++ keccak256(bytecode))[12:]
```

`0xff` is a hardcoded prefix that prevents hash-collision between addresses that are deployed using `CREATE` and `CREATE2`.
The `address` param refers to the address of the contract that is calling the `CREATE2` opcode, in our case the factory contract.
These 4 params are concatenated together, and `keccak256` is used to generate a 32 byte hash.
The first 12 bytes are truncated, and the remaining 20 bytes are used as the address of the deployed contract.

The entirety of the assembly code in the `computeAddress` function is an attempt at recreating the same formula, albeit without calling the `CREATE2` opcode:

1. `mload(0x40)` loads the free memory pointer into memory. This is the pointer that points to the next free memory slot in the memory array. Read more about this in [Solidity docs](https://docs.soliditylang.org/en/latest/assembly.html#memory-management).
2. `mstore(add(ptr, 0x40), bytecodeHash)` stores the `bytecodeHash` starting at the memory location pointed to by `ptr + 0x40`, i.e. `ptr+ 64 bytes`.
3. `mstore(add(ptr, 0x20), salt)` stores the `salt` at the memory location pointed to by `ptr + 0x20`.
4. `mstore(ptr, contractAddress)` stores the `contractAddress` at the memory location pointed to by `ptr`.

> ℹ️ **Note**
>
> Recall that all the params passed to the `computeAddress` function are 32 bytes long, and are stored in memory as 32 byte values. However
> an address in Solidity is 20 bytes long, and is stored in memory as a 32 byte value, where the first 12 bytes are replaced by 0s.
> Therefore, when we need to skip 12 bytes to point to the actual address.

5. `let start := add(ptr, 0x0b)` creates a new variable `start` that points to the memory location `ptr + 0x0b`, i.e. `ptr + 11 bytes`.
6. Lastly, the mstore8 opcode can be used to store a single byte at a memory location. Here, we are storing the value `0xff` at the memory location pointed to by `start`, which occupies the 12th byte of the memory slot.
7. With all the values packed into their correct memory locations, we can now call `keccak256` on the memory slot starting at `start`, and pass in the length of the memory slot as the second parameter. This will return a 32 byte hash, which we can truncate to get the final address.

> ℹ️ **Note**
>
> You can check out the complete code for this factory implementation [here](https://github.com/Genesis3800/CREATE2Factory/blob/main/src/Create2.sol).
> Also check out OpenZeppelin's [CREATE2 library implementation](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/793d92a3331538d126033cbacb1ee5b8a7d95adc/contracts/utils/Create2.sol), which has been used as inspiration for this tutorial.
> Finally, Forge offers some `CREATE2` address computation helper functions out of the box. [Check them out](https://github.com/foundry-rs/forge-std/blob/f73c73d2018eb6a111f35e4dae7b4f27401e9421/src/StdUtils.sol#L122-L134).

### Testing our factory

Create a file named `Create2.t.sol` Inside the `test` directory.
Initialize a contract named `Create2Test` like this:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {Counter} from "../src/Counter.sol";
import {Create2} from "../src/Create2.sol";

contract Create2Test is Test {

}
```

Initialize the following state variables and the `setUp()` function:

```solidity
    Create2 internal create2;
    Counter internal counter;

    function setUp() public {
        create2 = new Create2();
        counter = new Counter();
    }
```

Create a new function named `testDeterministicDeploy()` that:

1. Deploys a new instance of the `Create2` contract.
2. Deals out a 100 ETH to the specific address that we will use to impersonate as the caller for all subsequent calls using the `prank` cheatcode.
3. Sets up the `salt` and `bytecode` params
4. Uses the previously deployed `Create2` contract to deploy the `Counter` contract at a deterministic address.
5. Checks if the contract was deployed at the correct address, by asserting that the computed address is equal to the deployed address.

```solidity
    function testDeterministicDeploy() public {
        vm.deal(address(0x1), 100 ether);

        vm.startPrank(address(0x1));  
        bytes32 salt = "12345";
        bytes memory creationCode = abi.encodePacked(type(Counter).creationCode);

        address computedAddress = create2.computeAddress(salt, keccak256(creationCode));
        address deployedAddress = create2.deploy(salt , creationCode);
        vm.stopPrank();

        assertEq(computedAddress, deployedAddress);  
    }
```

Save all your files, and run the test using `forge test --match-path test/Create2.t.sol -vvvv`.
Your test should pass without any errors.

