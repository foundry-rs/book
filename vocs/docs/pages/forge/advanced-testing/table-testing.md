---
description: Property-based testing with test cases inputs organized into a table format (with columns for inputs, expected outputs, and potentially other relevant parameters) to test general behaviors and edge cases in smart contracts.
---

## Table Testing

Foundry v1.3.0 comes with support for table testing, which enables the definition of a dataset (the "table") and the execution of a test function for each entry in that dataset. This approach helps ensure that certain combinations of inputs and conditions are tested.

#### Test definition

In forge, table tests are functions named with `table` prefix that accepts datasets as one or multiple arguments:

```solidity
function tableSumsTest(TestCase memory sums) public
```

```solidity
function tableSumsTest(TestCase memory sums, bool enable) public
```

The datasets are defined as forge fixtures which can be:

- storage arrays prefixed with `fixture` prefix and followed by dataset name
- functions named with `fixture` prefix, followed by dataset name. Function should return an (fixed size or dynamic) array of values.

#### Examples

- Single dataset. In following example, `tableSumsTest` test will be executed twice, with inputs from `fixtureSums` dataset: once with `TestCase(1, 2, 3)` and once with `TestCase(4, 5, 9)`.

```solidity
struct TestCase {
    uint256 a;
    uint256 b;
    uint256 expected;
}

function fixtureSums() public returns (TestCase[] memory) {
    TestCase[] memory entries = new TestCase[](2);
    entries[0] = TestCase(1, 2, 3);
    entries[1] = TestCase(4, 5, 9);
    return entries;
}

function tableSumsTest(TestCase memory sums) public pure {
    require(sums.a + sums.b == sums.expected, "wrong sum");
}
```

It is required to name the `tableSumsTest`'s `TestCase` parameter `sums` as the parameter name is resolved against the available fixtures (`fixtureSums`). In this example, if the parameter is not named `sums` the following error is raised: `[FAIL: Table test should have fixtures defined]`.

- Multiple datasets. `tableSwapTest` test will be executed twice, by using values at the same position from `fixtureWallet` and `fixtureSwap` datasets.

```solidity
struct Wallet {
    address owner;
    uint256 amount;
}

struct Swap {
    bool swap;
    uint256 amount;
}

Wallet[] public fixtureWallet;
Swap[] public fixtureSwap;

function setUp() public {
    // first table test input
    fixtureWallet.push(Wallet(address(11), 11));
    fixtureSwap.push(Swap(true, 11));

    // second table test input
    fixtureWallet.push(Wallet(address(12), 12));
    fixtureSwap.push(Swap(false, 12));
}

function tableSwapTest(Wallet memory wallet, Swap memory swap) public pure {
    require(
        (wallet.owner == address(11) && swap.swap) || (wallet.owner == address(12) && !swap.swap), "not allowed"
    );
}
```

The same naming requirement mentioned above is relevant here.
