## Deprecated features:

With foundry V1, we've decided to go ahead and start deprecating features that are considered anti-practices or might be misleading for developers. Deprecated means that while you can continue using these features, it is now a discouraged practice and you should plan on incrementally migrating away from using these.

### Removing the Invariant keyword

The invariant keyword has now been deprecated, and the new keyword is now `statefulFuzz`. This means that now writing tests in this manner is valid:

```solidity
/// Old, deprecated way of declaring an invariant test
function invariantTestEq() public {
    // Assert your invariants...
}

/// New
function statefulFuzzTestEq() public  {
    // Assert your invariants
}
```

### Deprecating testFail

Using `testFail` to write failing tests is now discouraged. While it's usage is extremely common, we've decided to deprecate it because it can introduce footguns in a test.

The now-recommended pattern is to refactor the actions that will make your test revert and subsequently fail in an utility function, and use `expectRevert` to ensure that this function call failed. This way, the test failure is expected explicitly, instead of introducing the possibility that the test fails in an unintended way silently.

An example:

```solidity

contract Mock {
    function revert_() public {
        revert("This reverts");
    }
}

contract TestFailDeprecated is Test {
    Mock public mock;

    function setUp() public {
        mock = new Mock();
    }

    /// Deprecated way.
    function testFailReverter() public {
        mock.revert_();
    }

    /// New way, without using testFail.
    /// The call to revert_ has been refactored and is now expected to fail
    /// with expectRevert()
    function testReverterReverts() public {
        vm.expectRevert();
        // Call using `this` to increase depth
        this.exposed_call_Reverter();
    }

    function exposed_callReverter() public {
        mock.revert_();
    }

}
```

### Removing cheatcodes support on some precompiles

It is now impossible to use the following cheatcodes on precompiles: `etch`, `load`, `store`, `deal`.