## Cheatcodes

Most of the time, simply testing your smart contracts outputs isn't enough. To manipulate the state of the blockchain, as well as test for specific reverts and events, Foundry is shipped with a set of cheatcodes.

Cheatcodes allow you to change the block number, your identity, and more. They are invoked by calling specific functions on a specially designated address: `0x7109709ECfa91a80626fF3989D68f67F5b1DD12D`. If you are using `ds-test`, then this address is assigned in a constant named `HEVM_ADDRESS`.

Let's write a test for a smart contract that is only callable by its owner.

```solidity
pragma solidity ^0.8.0;

contract OwnerUpOnly {
  address public immutable owner;
  uint256 public count;

  constructor() {
    owner = msg.sender;
  }

  function increment() external {
    require(
      msg.sender == owner,
      "only the owner can increment the count"
    );
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
[PASS] testFailIncrementAsNotOwner() (gas: 4030)
Traces:
  [4030] OwnerUpOnlyTest::testFailIncrementAsNotOwner()
    ├─ [0] VM::prank(0x0000000000000000000000000000000000000000)
    │   └─ ← ()
    ├─ [325] OwnerUpOnly::increment()
    │   └─ ← "only the owner can increment the count"
    └─ ← "only the owner can increment the count"
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
    cheats.expectRevert(
      bytes("only the owner can increment the count")
    );
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
[PASS] testIncrementAsNotOwner() (gas: 4917)
[PASS] testIncrementAsOwner() (gas: 24661)
```
<br>

> 📚 **Reference**
> 
> See the [Cheatcodes Reference](../reference/cheatcodes.md) for a complete overview of all the available cheatcodes.
