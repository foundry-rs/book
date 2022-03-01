## Fuzz Testing

Forge supports property based testing.

Property-based testing is a way of testing general behaviors as opposed to isolated scenarios.

Let's examine what that means by writing a unit test, finding the general property we are testing for, and converting it to a property-based test instead:

```solidity
pragma solidity ^0.8.0;

contract Safe {
  receive() external payable {}

  function withdraw() external {
    payable(msg.sender).transfer(address(this).balance);
  }
}

import "ds-test/test.sol";

contract SafeTest is DSTest {
  Safe safe;

  // Needed so the test contract itself can receive ether
  receive() external payable {}

  function setUp() public {
    safe = new Safe();
  }

  function testWithdraw() public {
    payable(address(safe)).transfer(1 ether);
    uint256 preBalance = address(this).balance;
    safe.withdraw();
    uint256 postBalance = address(this).balance;
    assertEq(preBalance + 1 ether, postBalance);
  }
}
```

Running the test, we see it passes:

```ignore
$ forge test
compiling...
no files changed, compilation skipped.
Running 1 test for SafeTest.json:SafeTest
[PASS] testWithdraw() (gas: 15005)
```

This unit test *does test* that we can withdraw ether from our safe. However, who is to say that it works for all amounts, not just 1 ether?

The general property here is: given a safe balance, when we withdraw, we should get whatever is in the safe.

Forge will run any test that takes at least one parameter as a property-based test, so let's rewrite:

```solidity
contract SafeTest is DSTest {
  // safe
  // receive
  // setUp

  function testWithdraw(uint256 amount) public {
    payable(address(safe)).transfer(amount);
    uint256 preBalance = address(this).balance;
    safe.withdraw();
    uint256 postBalance = address(this).balance;
    assertEq(preBalance + amount, postBalance);
  }
}
```

If we run the test now, we can see that Forge runs the property-based test, but it fails for high values of `amount`:

```ignore
$ forge test
compiling...
Compiling 1 files with 0.8.10
Compilation finished successfully
success.

Running 1 test for SafeTest.json:SafeTest
[FAIL. Counterexample: calldata=0x215a2f200000000000000000000000000000000000000001000000000000000000000000, args=[79228162514264337593543950336]] testWithdraw(uint256) (runs: 44, μ: 15073, ~: 15073)

Failed tests:
[FAIL. Counterexample: calldata=0x215a2f200000000000000000000000000000000000000001000000000000000000000000, args=[79228162514264337593543950336]] testWithdraw(uint256) (runs: 44, μ: 15073, ~: 15073)
```

The default amount of ether that the test contract is given is `2**96 wei` (as in DappTools), so we have to restrict the type of amount to `uint96` to make sure we don't try to send more than we have:

```solidity
contract SafeTest is DSTest {
  // safe
  // receive
  // setUp

  function testWithdraw(uint96 amount) public {
    // snip
  }
}
```

And now it passes:

```ignore
$ forge test
compiling...
success.
Running 1 test for SafeTest.json:SafeTest
[PASS] testWithdraw(uint96) (runs: 256, μ: 14591, ~: 15167)
```

There are different ways to run property-based tests, notably parametric testing and fuzzing. Forge only supports fuzzing.

When running a property-based test, the fuzzer will try to generate as many test cases as possible to uncover edge cases. You can configure the amount of scenarios the fuzzer will generate by setting [`FOUNDRY_FUZZ_RUNS`](../reference/config.md#fuzz_runs).
