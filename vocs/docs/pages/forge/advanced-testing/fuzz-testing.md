---
description: Property-based testing with randomized inputs to test general behaviors and edge cases in smart contracts.
---

## Fuzz Testing

Forge supports property based testing.

Property-based testing is a way of testing general behaviors as opposed to isolated scenarios.

Let's examine what that means by writing a unit test, finding the general property we are testing for, and converting it to a property-based test instead:

```solidity
// [!include ~/snippets/projects/fuzz_testing/test/Safe.t.sol.1:all]
```

Running the test, we see it passes:

```bash
// [!include ~/snippets/output/fuzz_testing/forge-test-no-fuzz:all]
```

This unit test _does test_ that we can withdraw ether from our safe. However, who is to say that it works for all amounts, not just 1 ether?

The general property here is: given a safe balance, when we withdraw, we should get whatever is in the safe.

Forge will run any test that takes at least one parameter as a property-based test, so let's rewrite:

```solidity
// [!include ~/snippets/projects/fuzz_testing/test/Safe.t.sol.2:contract_prelude]
    // ...

// [!include ~/snippets/projects/fuzz_testing/test/Safe.t.sol.2:test]
}
```

If we run the test now, we can see that Forge runs the property-based test, but it fails for high values of `amount`:

```sh
forge test
// [!include ~/snippets/output/fuzz_testing/forge-test-fail-fuzz:output]
```

The default amount of ether that the test contract is given is `2**96 wei` (as in DappTools), so we have to restrict the type of amount to `uint96` to make sure we don't try to send more than we have:

```solidity
// [!include ~/snippets/projects/fuzz_testing/test/Safe.t.sol.3:signature]
```

And now it passes:

```sh
// [!include ~/snippets/output/fuzz_testing/forge-test-success-fuzz:all]
```

You may want to exclude certain cases using the [`assume`](/reference/cheatcodes/assume) cheatcode. In those cases, fuzzer will discard the inputs and start a new fuzz run:

```solidity
function testFuzz_Withdraw(uint96 amount) public {
    vm.assume(amount > 0.1 ether);
    // snip
}
```

There are different ways to run property-based tests, notably parametric testing and fuzzing. Forge only supports fuzzing.

### Interpreting results

You might have noticed that fuzz tests are summarized a bit differently compared to unit tests:

- "runs" refers to the amount of scenarios the fuzzer tested. By default, the fuzzer will generate 256 scenarios, but this and other test execution parameters can be setup by the user. Fuzzer configuration details are provided [`here`](#configuring-fuzz-test-execution).
- "μ" (Greek letter mu) is the mean gas used across all fuzz runs
- "~" (tilde) is the median gas used across all fuzz runs

### Configuring fuzz test execution

Fuzz tests execution is governed by parameters that can be controlled by users via Forge configuration primitives. Configs can be applied globally or on a per-test basis. For details on this topic please refer to
📚 [`Global config`](/config/reference/overview) and 📚 [`In-line config`](/config/reference/inline-test-config).

#### Fuzz test fixtures

Fuzz test fixtures can be defined when you want to make sure a certain set of values is used as inputs for fuzzed parameters.
These fixtures can be declared in tests as:

- storage arrays prefixed with `fixture` and followed by param name to be fuzzed. For example, fixtures to be used when fuzzing parameter `amount` of type `uint32` can be defined as

```solidity
uint32[] public fixtureAmount = [1, 5, 555];
```

- functions named with `fixture` prefix, followed by param name to be fuzzed. Function should return an (fixed size or dynamic) array of values to be used for fuzzing. For example, fixtures to be used when fuzzing parameter named `owner` of type `address` can be defined in a function with signature

```solidity
function fixtureOwner() public returns (address[] memory)
```

If the type of value provided as a fixture is not the same type as the named parameter to be fuzzed then it is rejected and an error is raised.

An example where fixture could be used is to reproduce the `DSChief` vulnerability. Consider the 2 functions

```solidity
    function etch(address yay) public returns (bytes32 slate) {
        bytes32 hash = keccak256(abi.encodePacked(yay));

        slates[hash] = yay;

        return hash;
    }

    function voteSlate(bytes32 slate) public {
        uint weight = deposits[msg.sender];
        subWeight(weight, votes[msg.sender]);
        votes[msg.sender] = slate;
        addWeight(weight, votes[msg.sender]);
    }
```

where the vulnerability can be reproduced by calling `voteSlate` before `etch`, with `slate` value being a hash of `yay` address.
To make sure fuzzer includes in the same run a `slate` value derived from a `yay` address, following fixtures can be defined:

```solidity
    address[] public fixtureYay = [
        makeAddr("yay1"),
        makeAddr("yay2"),
        makeAddr("yay3")
    ];

    bytes32[] public fixtureSlate = [
        keccak256(abi.encodePacked(makeAddr("yay1"))),
        keccak256(abi.encodePacked(makeAddr("yay2"))),
        keccak256(abi.encodePacked(makeAddr("yay3")))
    ];
```

Following image shows how fuzzer generates values with and without fixtures being declared:

![Fuzzer](/fuzzer.png)
