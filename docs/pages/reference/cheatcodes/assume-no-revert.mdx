## `assumeNoRevert`

### Signature

```solidity
function assumeNoRevert() external;
```

### Description

The fuzzer will discard the current fuzz inputs and start a new fuzz run if next call reverted.

The test may fail if you hit the max number of rejects.

You can configure the rejection thresholds by setting [`fuzz.max_test_rejects`][max-test-rejects] in your `foundry.toml` file.

### Examples

For a function that requires an amount in certain range:
```solidity
function doSomething(uint256 amount) public {
    require(amount > 100 ether && amount < 1_000 ether);
}
```
reverts are discarded, resulting in test pass (or fail if max number of rejects hit):
```solidity
function testSomething(uint256 amount) public {
    vm.assumeNoRevert();
    target.doSomething(amount);
    // [PASS]
}
```

