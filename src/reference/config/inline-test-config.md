## In-line test configuration
Foundry users are enabled to specify overall test configurations, using a combination of ENV variables and config statements in the `foundry.toml`. Checkout the [`Testing reference`][Testing Reference] for a detailed description.

Despite this may work in the general case, some tests may need finer control over their configuration. For such reason Forge provides a way to specify per-test configs for invariant and fuzz testing scenarios. 

Users can in-line test config statements directly in Solidity comments. This would affect the behavior of the `forge test` command for a specific test instance, as illustrated in the example below.

```solidity
contract MyTest is Test {
  /// forge-config: default.fuzz.runs = 100
  /// forge-config: ci.fuzz.runs = 500
  /// forge-config: default.fuzz.show-logs = true
  function test_SimpleFuzzTest(uint256 x) public {
    // --- snip ---
  }
}
```

What we are asking here is to run our fuzzer `100` and `500` times for the `default` and `ci` profiles respectively. The interesting fact is that this would override any fuzz `runs` setup existing at a global level. All other configs would be inherited from the global context, making this acting as a fallback for all possible configurations.

### Block comments
In-line test configurations can also be expressed in block comments, as illustrated in the example.

```solidity
contract MyTest is Test {
  /**
   * forge-config: default.fuzz.runs = 1024
   * forge-config: default.fuzz.max-test-rejects = 500
   * forge-config: default.fuzz.show-logs = true
   */
  function test_SimpleFuzzTest(uint256 x) public {
    // --- snip ---
  }
}
```

### In-line fuzz configs
Users can specify the configs described in the table. Each statement must have a prefix of the form `forge-config: ${PROFILE}.fuzz.`

| Parameter | Type | Description |
|-|-|-|
|`runs`|integer|The amount of fuzz runs to perform for this specific test case. [`Reference`][testing].|
|`max-test-rejects`|integer|The maximum number of combined inputs that may be rejected before the test as a whole aborts. [`Reference`][Max test rejects].|
|`show-logs`|boolean| The flag indicates whether to display console logs in fuzz tests or not. Works when `verbosity >= 2`. [`Reference`][Fuzz show logs]. |

Fuzz config example
```solidity
contract MyFuzzTest is Test {
  /// forge-config: default.fuzz.runs = 100
  /// forge-config: default.fuzz.max-test-rejects = 2
  /// forge-config: default.fuzz.show-logs = true
  function test_InlineConfig(uint256 x) public {
    // --- snip ---
  }
}
```

### In-line invariant configs
Users can specify the configs described in the table. Each statement must have a prefix of the form `forge-config: ${PROFILE}.invariant.`

| Parameter | Type | Description |
|-|-|-|
|`runs`|integer|The amount of invariant runs to perform for this specific test case. [`Reference`][Invariant runs].
|`depth`|integer|The number of calls executed to attempt to break invariant in one run. [`Reference`][Invariant depth].
|`fail-on-revert`|boolean|Fails the invariant fuzzing if a revert occurs. [`Reference`][Fail on revert].
|`call-override`|boolean|Overrides unsafe external calls when running invariant test. [`Reference`][Invariant call override].

Invariant config example
```solidity
contract MyInvariantTest is Test {
  /// forge-config: default.invariant.runs = 100
  /// forge-config: default.invariant.depth = 2
  /// forge-config: default.invariant.fail-on-revert = false
  /// forge-config: default.invariant.call-override = true
  function invariant_InlineConfig() public {
    // --- snip ---
  }
}
```





[Testing Reference]: ./testing.md
[testing]: ./testing.md#runs
[Max test rejects]: ./testing.md#max_test_rejects
[Fuzz show logs]: ./testing.md#show_logs
[Invariant runs]: ./testing.md#runs-1
[Invariant depth]: ./testing.md#depth
[Fail on revert]: ./testing.md#fail_on_revert
[Invariant call override]: ./testing.md#call_override