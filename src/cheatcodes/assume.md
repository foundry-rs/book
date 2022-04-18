## `assume`

### Signature

```solidity
function assume(bool) external;
```

### Description

If the boolean expression evaluates to false, the fuzzer will discard the current fuzz inputs and start a new fuzz run.

The `assume` cheatcode should mainly be used for very narrow checks.
Broad checks will slow down tests as it will take a while to find valid values, and the test may fail if you hit the max number of rejects.

You can configure the rejection thresholds by setting [`fuzz_max_local_rejects`][max-local-rejects] and [`fuzz_max_global_rejects`][max-global-rejects] in your `foundry.toml` file.

For broad checks, such as ensuring a `uint256` falls within a certain range, you can bound your input with the modulo operator or Solmate's [`bound`][solmate-bound] method.

More information on filtering via `assume` can be found [here][filtering-guide].

### Examples

```solidity
// Good example of using assume
function testSomething(uint256 a) public {
    vm.assume(a != 1);
    require(a != 1);
    // [PASS]
}
```

```solidity
// In this case assume is not a great fit, so you should bound inputs manually
function testSomethingElse(uint256 a) public {
    a = bound(a, 100, 1e36);
    require(a >= 100 && a <= 1e36);
    // [PASS]
}
```

[max-local-rejects]: ./config.md#fuzz_max_local_rejects
[max-global-rejects]: ./config.md#fuzz_max_global_rejects
[solmate-bound]: https://github.com/Rari-Capital/solmate/blob/a9e3ea26a2dc73bfa87f0cb189687d029028e0c5/src/test/utils/DSTestPlus.sol#L114-L133
[filtering-guide]: https://altsysrq.github.io/proptest-book/proptest/tutorial/filtering.html#filtering
