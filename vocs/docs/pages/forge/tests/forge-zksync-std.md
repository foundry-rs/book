---
description: Using the Forge-ZKsync Standard Library for ZKsync-specific cheatcodes and testing utilities.
---

# Forge-ZKsync Standard Library

[`forge-std`](https://github.com/foundry-rs/forge-std) exports the most common constructs that allow users to write tests. However, in Foundry ZKsync, we've added some new cheatcodes (or anything we deem helpful in the future). To allow users to access these interfaces, [`forge-zksync-std`](https://github.com/Moonsong-Labs/forge-zksync-std) is provided as an add-on to `forge-std`.

## Installation

```bash
forge install Moonsong-Labs/forge-zksync-std
```

## Usage

In the absence of `forge-zksync-std`, the new cheatcodes are only accessible via low-level calls:

```solidity
import {Test} from "forge-std/Test.sol";

contract FooTest is Test {
    function testZkTraceOutputDuringCreate() public {
        vm.startPrank(address(65536));                                             // normal foundry cheatcodes
        new Contract1();

        (bool success,) = address(vm).call(abi.encodeWithSignature("zkVmSkip()")); // additional foundry-zksync cheatcodes
        require(success, "zkVmSkip() call failed");
        new Contract2();
    }
}
```

However, with the `TextExt` interface, the new cheatcodes can be accessed via `vmExt` property directly. The usual foundry cheatcodes are still available under the `vm` property.

```solidity
import {Test} from "forge-std/Test.sol";
import {TestExt} from "forge-zksync-std/TestExt.sol";

contract FooTest is Test, TestExt {
    function testZkTraceOutputDuringCreate() public {
        vm.startPrank(address(65536));  // normal foundry cheatcodes
        new Contract1();

        vmExt.zkVmSkip();               // additional foundry-zksync cheatcodes
        new Contract2();
    }
}
```

This approach ensures that the existing tests need not be modified to use a completely different package than `foundry/forge-std`, yet allowing for the additional ZKsync functionality to be included when necessary.

For more detailed information about ZKsync-specific functionality, see the [ZKsync Specifics](/zksync-specifics/overview) section.