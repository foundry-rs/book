# Invariant Testing
## Overview

Invariant testing allows for a set of mathematical invariants to be tested against randomized sequences of pre-defined function calls from pre-defined contracts. After each function call is performed, all defined invariants are asserted.

## Target Contracts

Target contracts are the set of contracts that will be called over the course of a given invariant test fuzzing campaign. Functions from these contracts will be called at random with fuzzed inputs. The probability of a function being called is broken down by contract and then by function.

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
2. Contracts that are added to the the `targetContracts` array are added to the set of target contracts. (TODO: check if this is possible during invariant campaigns yet)
3. Contracts that are deployed in the `setUp` can be **removed** from the target contracts if they are added to the `excludeContracts` array.

## Defining Invariants

Invariants are mathematical expressions that should always hold true over the course of a fuzzing campaign. There are different ways to assert invariants:

<table>
<tr><th>Type</th><th>Explanation</th><th>Example</th></tr>

<tr>

<td>Direct assertions</td>
<td>Directly query a protocol smart contracts and assert values are expected.</td>
<td>

```solidity
assertTrue(token.totalAssets() >= token.totalSupply()))
```
</td>

</tr>

<tr>

<td>Ghost variable assertions</td>
<td>Query a protocol smart contract and compare it against a value that has been persisted in the test environment (ghost variable).</td>
<td>

```solidity
assertEq(token.totalSupply(), sumBalanceOf)
```
</td>

</tr>

<tr>

<td>Naive implementation assertions</td>
<td>Query the a protocol smart contract function and compare it against a naive and typically highly gas-inefficient implementation of the same desired logic.</td>
<td>

```solidity
assertEq(pool.outstandingInterest(), testContract.naiveOutstandingInterest()
```
</td>

</tr>
</table>

### Conditional Invariants

Invariants must hold for the course over the course of a given fuzzing campaign, but that doesn't mean they must hold true in every situation. There is the possibility for certain invariants to be introduced/removed in a given scenario (e.g., during a liquidation). For this a dedicated testing contract must be used.

## Target Contract Patterns

When running invariant testing, especially against contracts with more complex logic, it is important to consider how the target contracts are used.

There are three main patterns to use in invariant testing.


### Bounded
## Exclude Contracts
## Defining Invariants
