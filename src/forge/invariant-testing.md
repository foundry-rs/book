# Invariant Testing
## Overview

Invariant testing allows for a set of mathematical invariants to be tested against randomized sequences of pre-defined function calls from pre-defined contracts. After each function call is performed, all defined invariants are asserted.

Invariant testing is a powerful tool to expose incorrect logic in protocols. Due to the fact that function call sequences are randomized and have fuzzed inputs, invariant testing can expose false assumptions and incorrect logic in edge cases and highly complex protocol states.

Invariant testing campaigns have two dimensions, `runs` and `depth`.
- `runs`: Number of times that a sequence of function calls is generated and run.
- `depth`: Number of function calls made in a given `run`. All defined invariants are asserted after each function call is made. If a function call reverts, the `depth` counter still increments.

Similar to how standard tests are run in Foundry by prefixing a function name with `test`, invariant tests are denoted by prefixing the function name with `invariant` (e.g., `function invariant_A()`).

## Defining Invariants

Invariants are mathematical expressions that should always hold true over the course of a fuzzing campaign. A good invariant testing suite should have as many invariants as possible, and can have different testing suites for different protocol states.

There are different ways to assert invariants:

<table>
<tr><th>Type</th><th>Explanation</th><th>Example</th></tr>

<tr>

<td>Direct assertions</td>
<td>Directly query a protocol smart contracts and assert values are expected.</td>
<td>

```solidity
assertGe(
    token.totalAssets(),
    token.totalSupply()
)
```
</td>

</tr>

<tr>

<td>Ghost variable assertions</td>
<td>Query a protocol smart contract and compare it against a value that has been persisted in the test environment (ghost variable).</td>
<td>

```solidity
assertEq(
    token.totalSupply(),
    sumBalanceOf
)
```
</td>

</tr>

<tr>

<td>Naive implementation assertions</td>
<td>Query a protocol smart contract function and compare it against a naive and typically highly gas-inefficient implementation of the same desired logic.</td>
<td>

```solidity
assertEq(
    pool.outstandingInterest(),
    test.naiveInterest()
)
```
</td>

</tr>
</table>

### Conditional Invariants

Invariants must hold over the course of a given fuzzing campaign, but that doesn't mean they must hold true in every situation. There is the possibility for certain invariants to be introduced/removed in a given scenario (e.g., during a liquidation). For this a dedicated testing contract should be used.

It is not recommended to introduce conditional logic into invariant assertions because they have the possibility of introducing false positives because of an incorrect code path. For example:

```solidity
function invariant_example() external {
    if (protocolCondition) return;

    assertEq(val1, val2);
}
```

In this situation, if `protocolCondition == true`, the invariant is not asserted at all. Sometimes this can be desired behavior, but it can cause issues if the `protocolCondition` is true for the whole fuzzing campaign unexpectedly, or there is a logic error in the condition itself. For this reason its better to try and define an alternative invariant for that condition as well, for example:

```solidity
function invariant_example() external {
    if (protocolCondition) {
        assertLe(val1, val2);
        return;
    };

    assertEq(val1, val2);
}
```

Another approach to handle different invariants across protocol states is to utilize dedicated invariant testing contracts for different scenarios. These scenarios can be bootstrapped using the `setUp` function, but it is more powerful to leverage target contracts, which are outlined in the next section.

## Target Contracts

Target contracts are the set of contracts that will be called over the course of a given invariant test fuzzing campaign. This set of contracts defaults to all contracts that were deployed in the `setUp` function, but can be customized to allow for more advanced invariant testing.

### Function Call Probability Distribution

Functions from these contracts will be called at random with fuzzed inputs. The probability of a function being called is broken down by contract and then by function.

For example:

```
targetContract1: 50%
├─ function1: 50% (25%)
└─ function2: 50% (25%)

targetContract2: 50%
├─ function1: 25% (12.5%)
├─ function2: 25% (12.5%)
├─ function3: 25% (12.5%)
└─ function4: 25% (12.5%)
```

This is something to be mindful of when designing target contracts, as target contracts with less functions will have each function called more often due to this probability distribution.

### Target Contract Setup

Target contracts can be set up using the following three methods:
1. Contracts that are deployed in the `setUp` function are automatically added to the set of target contracts.
2. Contracts that are added to the the `targetContracts` array are added to the set of target contracts and used instead of the contract deployed in the `setUp`.
3. Contracts that are deployed in the `setUp` can be **removed** from the target contracts if they are added to the `excludeContracts` array.

## Target Contract Patterns

This section will outline different approaches that can be used for invariant testing, as well as their pros and cons.

### Open Testing

The default configuration for target contracts is set to all contracts that are deployed during the setup. For smaller modules and more arithmetic contracts, this works well. For example:

```solidity
contract ExampleContract1 {

    uint256 val1;
    uint256 val2;
    uint256 val3;

    function addToA(uint256 amount) external {
        val1 += amount;
        val3 += amount;
    }

    function addToB(uint256 amount) external {
        val2 += amount;
        val3 += amount;
    }

}
```

This contract could be deployed and tested using the default target contract pattern:

```solidity
contract InvariantExample1 {

    ExampleContract1 foo;

    function setUp() external {
        foo = new ExampleContract1();
    }

    function invariant_A() external {
        assertEq(foo.val1() + foo.val2(), foo.val3());
    }

    function invariant_B() external {
        assertGe(foo.val1() + foo.val2(), foo.val1());
    }

}
```

This setup will call `foo.addToA()` and `foo.addToB()` with a 50%-50% probability distribution with fuzzed inputs. Inevitably, the inputs will start to cause overflows and the function calls will start reverting. Since the default configuration in invariant testing is `fail_on_revert = true`, this will not cause the tests to fail. The invariants will hold throughout the rest of the fuzzing campaign and the result is that the test will pass. The output will look something like this:

```
[PASS] invariant_A() (runs: 50, calls: 10000, reverts: 5533)
[PASS] invariant_B() (runs: 50, calls: 10000, reverts: 5533)
```

### Invariant Handlers

For more complex and integrated protocols, more sophisticated target contract usage is required to achieve the desired results. For example, a ERC-4626 based contract that accepts deposits of another ERC-20 token:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

interface IERC20Like {

    function balanceOf(address owner_) external view returns (uint256 balance_);

    function transferFrom(
        address owner_,
        address recipient_,
        uint256 amount_
    ) external returns (bool success_);

}

contract Basic4626Deposit {

    /**********************************************************************************************/
    /*** Storage                                                                                ***/
    /**********************************************************************************************/

    address public immutable asset;

    string public name;
    string public symbol;

    uint8 public immutable decimals;

    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;

    /**********************************************************************************************/
    /*** Constructor                                                                            ***/
    /**********************************************************************************************/

    constructor(address asset_, string memory name_, string memory symbol_, uint8 decimals_) {
        asset    = asset_;
        name     = name_;
        symbol   = symbol_;
        decimals = decimals_;
    }

    /**********************************************************************************************/
    /*** External Functions                                                                     ***/
    /**********************************************************************************************/

    function deposit(uint256 assets_, address receiver_) external returns (uint256 shares_) {
        shares_ = convertToShares(assets_);

        require(receiver_ != address(0), "ZERO_RECEIVER");
        require(shares_   != uint256(0), "ZERO_SHARES");
        require(assets_   != uint256(0), "ZERO_ASSETS");

        totalSupply += shares_;

        // Cannot overflow because totalSupply would first overflow in the statement above.
        unchecked { balanceOf[receiver_] += shares_; }

        require(
            IERC20Like(asset).transferFrom(msg.sender, address(this), assets_),
            "TRANSFER_FROM"
        );
    }

    function transfer(address recipient_, uint256 amount_) external returns (bool success_) {
        balanceOf[msg.sender] -= amount_;

        // Cannot overflow because minting prevents overflow of totalSupply,
        // and sum of user balances == totalSupply.
        unchecked { balanceOf[recipient_] += amount_; }

        return true;
    }

    /**********************************************************************************************/
    /*** Public View Functions                                                                  ***/
    /**********************************************************************************************/

    function convertToAssets(uint256 shares_) public view returns (uint256 assets_) {
        uint256 supply_ = totalSupply;  // Cache to stack.

        assets_ = supply_ == 0 ? shares_ : (shares_ * totalAssets()) / supply_;
    }

    function convertToShares(uint256 assets_) public view returns (uint256 shares_) {
        uint256 supply_ = totalSupply;  // Cache to stack.

        shares_ = supply_ == 0 ? assets_ : (assets_ * supply_) / totalAssets();
    }

    function totalAssets() public view returns (uint256 assets_) {
        assets_ = IERC20Like(asset).balanceOf(address(this));
    }

}

```

This contract's `deposit` function requires that the caller has a non-zero balance of the ERC-20 `asset`. In the Open invariant testing approach, `deposit()` and `transfer()` would be called with a 50-50% distribution, but they would revert on every call. This would cause the invariant tests to "pass", but in reality no state was manipulated in the desired contract at all. This is where target contracts can be leveraged. When a contract requires some additional logic in order to function properly, it can be added in a dedicated contract called a `Handler`.

```solidity
    function deposit(uint256 assets) public virtual {
        asset.mint(address(this), assets);

        asset.approve(address(token), assets);

        uint256 shares = token.deposit(assets, address(this));
    }
```

This contract will provide the necessary setup before a function call is made in order to ensure it is successful.

Building on this concept, Handlers can be used to develop more sophisticated invariant tests. With Open invariant testing, the tests run as shown in the diagram below, with random sequences of function calls being made to the protocol contracts directly with fuzzed parameters. This will cause reverts for more complex systems as outlined above.

![Blank diagram](https://user-images.githubusercontent.com/44272939/214752968-5f0e7653-d52e-43e6-b453-cac935f5d97d.svg)

By using Handler contracts and **excluding** all protocol contracts from the `targetContracts` array by using the `excludeContracts` function, all function calls made to protocol contracts can be made in a way that is governed by the Handler to ensure successful calls. This is outlined in the diagram below.

![Invariant Diagrams - Page 2](https://user-images.githubusercontent.com/44272939/214752977-053f60e6-c644-42a9-8cff-4fd85a2517ac.svg)

With this layer between the fuzzer and the protocol, more powerful testing can be achieved.

Within Handlers, "ghost variables" can be tracked across multiple function calls to add additional info for invariant tests. A good example of this is summing all of the `shares` that each LP owns after depositing into the ERC-4626 token as shown above, and using that in the invariant (`totalSupply == sumBalanceOf`).

Another benefit is the ability to perform assertions on function calls as they are happening. An example is asserting the ERC-20 balance of the LP has decremented by `assets` during the `deposit` function call. In this way, handler functions are similar to fuzz tests because they can take in fuzzed inputs, perform state changes, and assert before/after state.

In addition, with Handlers, input parameters can be bounded to reasonable expected values such that `fail_on_revert` can be set to `true`. This ensures that every function call that is being made by the fuzzer must be successful against the protocol in order to get tests to pass. This is very useful for visibility and confidence that the protocol is being tested in the desired way.
