## Deterministic deployment using CREATE2

### Introduction

Enshrined into the EVM as part of the [Constantinople fork](https://ethereum.org/en/history/#constantinople) of 2019, `CREATE2` is an opcode that started it's journey as [EIP-1014](https://eips.ethereum.org/EIPS/eip-1014).
It is often, rather fancifully IMO, referred to as the opcode that allows you to "*interact with addresses that haven't been created yet*".
What this basically means is that `CREATE2` allows you to deploy smart contracts to deterministic addresses, based on parameters that you control.
This stands in stark contrast to the `CREATE` opcode, where the nonce of the deploying address serves as one of the parameters that determines the address of the deployed contract. With `CREATE2`, you can use the same address to deploy smart contracts to the same address across multiple networks, even if the address has varying nonces.

In this tutorial, we will:

1. Look at a `CREATE2` factory implementation.
2. Deploy the factory using the traditional deployment methods.
3. Use this deployed factory to in turn deploy the same `CREATE2` factory at a deterministic address.
4. Simulate this set of events by writing a fork test in Foundry.

### Prerequisites

1. Some familiarity with Solidity and Foundry is required, and some familiarity with the in-line assembly is recommended.
Refer [official Solidity docs](https://docs.soliditylang.org/en/latest/assembly.html) for a primer on inline assembly.
2. Make sure you have Foundry installed in your system. [Refer Installation](../getting-started/installation.md).
3. Initialize a local Foundry project. [Refer Creating a New Project](../projects/creating-a-new-project.md).

### CREATE2 Factory

Create a file named `Create2.sol` Inside the `src` directory.
Initialize a contract named `Create2` like this:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Create2 {

    error Create2InsufficientBalance(uint256 received, uint256 minimumNeeded);

    error Create2EmptyBytecode();

    error Create2FailedDeployment();
}
```

These self-explanatory errors are meant to enforce some sanity checks on the factory deployment, and revert the whole transaction when triggered.

Next, initialize a function named deploy like this:

```solidity
 function deploy(uint256 amount, bytes32 salt, bytes memory bytecode) external payable returns (address addr) {
 
 }
```

This function will take in 3 params, and return the address of the newly deployed contract:

1. The random `salt` used to calculate the final address.
2. The bytecode of the contract that we want to deploy.
3. The amount of ETH that we want to send to the new address as part of the deployment.

> ℹ️ **Note**
>
> You can send ETH to a contract that is being deployed using CREATE2, but only if it has a payable constructor.
> If you try to send ETH to it without a payable constructor, the transaction will revert.

Add these two revert statements at the top of the deploy function. We want our function to reject the deploy request if the following conditions are not met:

```solidity
        if (msg.value < amount) {
            revert Create2InsufficientBalance(msg.value, amount);
        }

        if (bytecode.length == 0) {
            revert Create2EmptyBytecode();
        }
```

Next, we will call the `CREATE2` opcode using in-line assembly, which can be done using the `assembly` keyword:

```solidity
        assembly {
            addr := create2(amount, add(bytecode, 0x20), mload(bytecode), salt)
        }
```

To call [the CREATE2 opcode from in-line assembly](https://docs.soliditylang.org/en/latest/yul.html#evm-dialect), we need to pass in 4 parameters:

1. The amount of ETH that we want to send to the new address as part of the deployment.
2. The second and third parameters refer to the range of memory our bytecode is located in. `add(bytecode, 0x20)` takes in a reference to the location of the `bytes` variable bytecode in memory, and skips 32 bytes(0x20 in hex) to point to the actual bytecode.
`mload(bytecode)` loads the length of the bytecode into memory.

> ℹ️ **Note**
>
> The `bytes` type in Solidity is a dynamically sized byte array, and is stored in memory as a 32 byte value, where the first 32 bytes
> represent the length of the array, and the rest of the bytes represent the actual array. Therefore, when we pass in a reference to
> `bytes` variable, we need to skip the first 32 bytes to point to the actual array.
> Read more about the `add` and `mload` opcodes at [evm.codes](https://www.evm.codes/?fork=shanghai).

Finally, we will revert the whole transaction if the deployment fails for any reason, in which case the CREATE2 opcode will return a 0 address:

```solidity
        if (addr == address(0)) {
            revert Create2FailedDeployment();
        }
    }
```

Lastly, let us create a view function named `computeAddress`. This function should take in the `salt` and `bytecode` as parameters, and return the address of the contract that would be deployed using the `deploy` function:

```solidity
 function computeAddress(bytes32 salt, bytes32 bytecodeHash) external view returns (address addr) {

 }
```

Inside the function, paste the following code that uses in-line assembly to calculate the address by performing the same calculations as the CREATE2 opcode would:

```solidity
        address contractAddress = address(this);
        
        assembly {
            let ptr := mload(0x40)

            mstore(add(ptr, 0x40), bytecodeHash)
            mstore(add(ptr, 0x20), salt)
            mstore(ptr, contractAddress)
            let start := add(ptr, 0x0b)
            mstore8(start, 0xff)
            addr := keccak256(start, 85)
        }
```

Before trying to understand the assembly code here, let us take a look at the formula that the CREATE2 opcode uses to calculate the address:

```bash
keccak256(0xff ++ address ++ salt ++ keccak256(bytecode))[12:]
```

`0xff` is a hardcoded prefix that prevents hash-collision between addresses that are deployed using `CREATE` and `CREATE2`.
The `address` param refers to the address of the contract that is calling the CREATE2 opcode, in our case the factory contract.
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


### Fork testing

You will need to blockchain nodes  in order to run fork tests.
[Alchemy](https://www.alchemy.com/) supports forking on their free tier, so we will use that for this tutorial.
Create a `.env` file at the root and fill out these values:

```bash
ALCHEMY_SEPOLIA_URL=''
ALCHEMY_MUMBAI_URL=''
PRIVATE_KEY=
```

Fill out these values, and run `source .env` to load them into your environment.

Create a file named `Create2.t.sol` Inside the `test` directory.
Initialize a contract named `Create2Test` like this:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {Create2} from "../src/Create2.sol";

contract Create2Test is Test {

}
```

Initialize the following state variables and the `setup()` function:

```solidity
    Create2 internal create2;

    uint256 internal sepoliaFork;
    string internal ALCHEMY_SEPOLIA_URL = vm.envString("ALCHEMY_SEPOLIA_URL");

    uint256 internal mumbaiFork;
    string internal ALCHEMY_MUMBAI_URL = vm.envString("ALCHEMY_MUMBAI_URL");

    function setUp() public {
    
        sepoliaFork = vm.createFork(ALCHEMY_SEPOLIA_URL);
        mumbaiFork = vm.createFork(ALCHEMY_MUMBAI_URL);
    }
```

The `createFork` cheatcode allows us to create a fork of the blockchain at a given URL.
We will activate these forks as required inside the individual test functions.

Create a new function named `testSepoliaDeploy()` that:

1. Activates the `sepoliaFork` fork using the `selectFork` cheatcode.
2. Deploys a new instance of the `Create2` contract.
3. Deals out a 100 ETH to the a specific address that we will use to impersonate as the caller for all subsequent calls using the `prank` cheatcode.
4. Sets up the `salt` and `bytecode` params
5. Uses the previously deployed instance of the `Create2` contract to deploy a new instance of the `Create2` contract at a deterministic address.
6. Checks if the contract was deployed at the correct address, by asserting that the computed address is equal to the deployed address.

```solidity
    function testSepoliaDeploy() public {

        vm.selectFork(sepoliaFork);
        assertEq(vm.activeFork(), sepoliaFork);

        create2 = new Create2();

        vm.deal(address(0x1), 100 ether);
        vm.startPrank(address(0x1));
        
        bytes32 salt = "12345";
        bytes memory bytecode = abi.encodePacked(vm.getCode("Create2.sol:Create2"));

        address computedAddress = create2.computeAddress(salt, keccak256(bytecode));
        address deployedAddress = create2.deploy(0, salt , bytecode);
        vm.stopPrank();

        assertEq(computedAddress, deployedAddress);    
    }
```

Lastly, create a function called `testMumbaiDeploy()` that looks very similar:

```solidity
    function testMumbaiDeploy() public {

        vm.selectFork(mumbaiFork);
        assertEq(vm.activeFork(), mumbaiFork);

        create2 = new Create2();

        vm.deal(address(0x1), 100 ether);
        vm.startPrank(address(0x1));

        bytes32 salt = "12345";
        bytes memory bytecode = abi.encodePacked(vm.getCode("Create2.sol:Create2"));

        address computedAddress = create2.computeAddress(salt, keccak256(bytecode));
        address deployedAddress = create2.deploy(0, salt , bytecode);
        vm.stopPrank();

        assertEq(computedAddress, deployedAddress);    
    }

}
```

Save all your files, and run the tests using `forge test --match-path test/Create2.t.sol -vvvv`.
Your tests should pass without any errors.
