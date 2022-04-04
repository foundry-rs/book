## Cheatcodes

Most of the time, simply testing your smart contracts outputs isn't enough. To manipulate the state of the blockchain, as well as test for specific reverts and events, Foundry is shipped with a set of cheatcodes.

Cheatcodes allow you to change the block number, your identity, and more. They are invoked by calling specific functions on a specially designated address: `0x7109709ECfa91a80626fF3989D68f67F5b1DD12D`. If you are using `ds-test`, then this address is assigned in a constant named `HEVM_ADDRESS`.

Let's write a test for a smart contract that is only callable by its owner.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

error Unauthorized();

contract OwnerUpOnly {
    address public immutable owner;
    uint256 public count;

    constructor() {
        owner = msg.sender;
    }

    function increment() external {
        if (msg.sender != owner) {
            revert Unauthorized();
        }
        count++;
    }
}

import "ds-test/test.sol";

contract OwnerUpOnlyTest is DSTest {
    OwnerUpOnly upOnly;

    function setUp() public {
        upOnly = new OwnerUpOnly();
    }

    function testIncrementAsOwner() public {
        assertEq(upOnly.count(), 0);
        upOnly.increment();
        assertEq(upOnly.count(), 1);
    }
}
```

If we run `forge test` now, we will see that the test passes, since `OwnerUpOnlyTest` is the owner of `OwnerUpOnly`.

```ignore
$ forge test
compiling...
success.
Running 1 test for OwnerUpOnlyTest.json:OwnerUpOnlyTest
[PASS] testIncrementAsOwner() (gas: 24810)
```

Let's make sure that someone who is definitely not the owner can't increment the count:

```solidity
interface CheatCodes {
    function prank(address) external;
}

contract OwnerUpOnlyTest is DSTest {
    CheatCodes cheats = CheatCodes(HEVM_ADDRESS);
    OwnerUpOnly upOnly;

    // setUp
    // testIncrementAsOwner

    function testFailIncrementAsNotOwner() public {
        cheats.prank(address(0));
        upOnly.increment();
    }
}
```

If we run `forge test` now, we will see that all the test pass.

```ignore
$ forge test
compiling...
success.
Running 2 tests for OwnerUpOnlyTest.json:OwnerUpOnlyTest
[PASS] testFailIncrementAsNotOwner() (gas: 4030)
[PASS] testIncrementAsOwner() (gas: 24639)
```

The test passed because the `prank` cheatcode changed our identity to the zero address for the next call (`upOnly.increment()`). The test case passed since we used the `testFail` prefix, however, using `testFail` is considered an anti-pattern since it does not tell us anything about *why* `upOnly.increment()` reverted.

If we run the tests again with traces turned on, we can see that we reverted with the correct error message.

```ignore
$ forge test -vvvv
compiling...
no files changed, compilation skipped.
Running 2 tests for OwnerUpOnlyTest.json:OwnerUpOnlyTest
[PASS] testFailIncrementAsNotOwner() (gas: 10406)
Traces:
  [10406] OwnerUpOnlyTest::testFailIncrementAsNotOwner()
    ├─ [0] VM::prank(0x0000000000000000000000000000000000000000)
    │   └─ ← ()
    ├─ [235] 0xce71…c246::d09de08a()
    │   └─ ← 0x82b42900
    └─ ← 0x82b42900
```

To be sure in the future, let's make sure that we reverted because we are not the owner using the `expectRevert` cheatcode:

```solidity
interface CheatCodes {
    function prank(address) external;
    function expectRevert(bytes calldata) external;
}

contract OwnerUpOnlyTest is DSTest {
  CheatCodes cheats = CheatCodes(HEVM_ADDRESS);
  OwnerUpOnly upOnly;

  // setUp
  // testIncrementAsOwner

  // Notice that we replaced `testFail` with `test`
  function testIncrementAsNotOwner() public {
    cheats.expectRevert(Unauthorized.selector);
    cheats.prank(address(0));
    upOnly.increment();
  }
}
```

If we run `forge test` one last time, we see that the test still passes, but this time we are sure that it will always fail if we revert for any other reason.

```ignore
$ forge test
compiling...
success.
Running 2 tests for OwnerUpOnlyTest.json:OwnerUpOnlyTest
[PASS] testIncrementAsNotOwner() (gas: 11200)
[PASS] testIncrementAsOwner() (gas: 24661)
```

Another cheatcode that is perhaps not so intuitive is the `expectEmit` function. Before looking at `expectEmit`, we need to understand what an event is.

Events are inheritable members of contracts. When you emit an event, the arguments are stored on the blockchain. The `indexed` attribute can be added to a maximum of three parameters of an event to form a data structure known as a "topic." Topics allow users to search for events on the blockchain.

```solidity
interface CheatCodes {
    function expectEmit(
        bool,
        bool,
        bool,
        bool
    ) external;
}

contract EmitContractTest is DSTest {
    event Transfer(address indexed from, address indexed to, uint256 amount);
    CheatCodes constant cheats = CheatCodes(HEVM_ADDRESS);

    function testExpectEmit() public {
        ExpectEmit emitter = new ExpectEmit();
        // check topic 1, topic 2, and data are the same as the following emitted event
        // checking topic 3 here doesn't matter if it's set to true or false, because `Transfer`
        // only has 2 indexed topics, `from` and `to`
        cheats.expectEmit(true, true, false, true);
        emit Transfer(address(this), address(1337), 1337); // expected event 1
        emitter.t(); // returned event 1
    }

    function testExpectEmitDoNotCheckData() public {
        ExpectEmit emitter = new ExpectEmit();
        // check topic 1, topic 2, do not check data
        cheats.expectEmit(true, true, false, false);
        emit Transfer(address(this), address(1337), 1338); // expected event 2
        emitter.t(); // returned event 2
    }
}

contract ExpectEmit {
    event Transfer(address indexed from, address indexed to, uint256 amount);

    function t() public {
        emit Transfer(msg.sender, address(1337), 1337);
    }
}
```

When we call `cheats.expectEmit(true, true, false, true);`, we want to check the 1st and 2nd `indexed` topic for the next event. The expected `Transfer` event (annotated as expected event 1) in `testExpectEmit()` means we are expecting `from = address(this)` and `to = address(1337)`. This is compared against the event emitted from `emitter.t()` (annotated as returned event 1). In other words, we are checking that the first topic from `emitter.t()` is equal to `address(this)`. The 3rd argument in `expectEmit` is set to `false` because there is no need to check for the 3rd `indexed` topic in `Transfer` event. It does not matter even if we set to `true`.

The 4th argument in `expectEmit` is set to `true` means that we want to check that "non-indexed topics", also known as data. For example, we want the data from the expected event 1, which is `amount` to equal to the data in returned event 1. In other words, we are asserting that `amount` emitted by `emitter.t()` is equal to `1337` from expected event 1. If the fourth argument in `expectEmit` were set to false, it means we do not want to check the `amount`. In other words, `testExpectEmitDoNotCheckData` is a valid test case since the `amount` from expected event 2 is different from the returned event 2 from `emitter.t()`.

<br>

> 📚 **Reference**
>
> See the [Cheatcodes Reference](../reference/cheatcodes.md) for a complete overview of all the available cheatcodes.
