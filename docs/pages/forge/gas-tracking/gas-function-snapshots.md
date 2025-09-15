---
description: Capture and compare gas consumption snapshots for functions to track optimization progress over time.
---

## Gas Function Snapshots

Forge can generate gas snapshots for all your test functions. This can
be useful to get a general feel for how much gas your contract will consume,
or to compare gas usage before and after various optimizations.

To generate the gas snapshot, run [`forge snapshot`](/forge/reference/snapshot).

This will generate a file called `.gas-snapshot` by default with all your
tests and their respective gas usage.

```
forge snapshot
cat .gas-snapshot

ERC20Test:testApprove() (gas: 31162)
ERC20Test:testBurn() (gas: 59875)
ERC20Test:testRevertTransferFromInsufficientAllowance() (gas: 81034)
ERC20Test:testRevertTransferFromInsufficientBalance() (gas: 81662)
ERC20Test:testRevertTransferInsufficientBalance() (gas: 52882)
ERC20Test:testInfiniteApproveTransferFrom() (gas: 90167)
ERC20Test:testMetadata() (gas: 14606)
ERC20Test:testMint() (gas: 53830)
ERC20Test:testTransfer() (gas: 60473)
ERC20Test:testTransferFrom() (gas: 84152)
```

### Filtering

If you would like to specify a different output file, run `forge snapshot --snap <FILE_NAME>`.

You can also sort the results by gas usage. Use the `--asc` option to sort the results in
ascending order and `--desc` to sort the results in descending order.

Finally, you can also specify a min/max gas threshold for all your tests.
To only include results above a threshold, you can use the `--min <VALUE>` option.
In the same way, to only include results under a threshold,
you can use the `--max <VALUE>` option.

Keep in mind that the changes will be made in the snapshot file, and not in the snapshot being
displayed on your screen.

You can also use it in combination with the filters for `forge test`, such as `forge snapshot --match-path contracts/test/ERC721.t.sol` to generate a gas snapshot relevant to this test contract.

### Comparing gas usage

If you would like to compare the current snapshot file with your
latest changes, you can use the `--diff` or `--check` options.

`--diff` will compare against the snapshot and display changes from the snapshot.

It can also optionally take a file name (`--diff <FILE_NAME>`), with the default
being `.gas-snapshot`.

For example:

```
forge snapshot --diff .gas-snapshot2

Running 10 tests for src/test/ERC20.t.sol:ERC20Test
[PASS] testApprove() (gas: 31162)
[PASS] testBurn() (gas: 59875)
[PASS] testRevertTransferFromInsufficientAllowance() (gas: 81034)
[PASS] testRevertTransferFromInsufficientBalance() (gas: 81662)
[PASS] testRevertTransferInsufficientBalance() (gas: 52882)
[PASS] testInfiniteApproveTransferFrom() (gas: 90167)
[PASS] testMetadata() (gas: 14606)
[PASS] testMint() (gas: 53830)
[PASS] testTransfer() (gas: 60473)
[PASS] testTransferFrom() (gas: 84152)
Test result: ok. 10 passed; 0 failed; finished in 2.86ms
testBurn() (gas: 0 (0.000%))
testRevertTransferFromInsufficientAllowance() (gas: 0 (0.000%))
testRevertTransferFromInsufficientBalance() (gas: 0 (0.000%))
testRevertTransferInsufficientBalance() (gas: 0 (0.000%))
testInfiniteApproveTransferFrom() (gas: 0 (0.000%))
testMetadata() (gas: 0 (0.000%))
testMint() (gas: 0 (0.000%))
testTransfer() (gas: 0 (0.000%))
testTransferFrom() (gas: 0 (0.000%))
testApprove() (gas: -8 (-0.000%))
Overall gas change: -8 (-0.000%)
```

`--check` will compare a snapshot with an existing snapshot file and display all the
differences, if any. You can change the file to compare against by providing a different file name: `--check <FILE_NAME>`.

For example:

```
forge snapshot --check .gas-snapshot2

Running 10 tests for src/test/ERC20.t.sol:ERC20Test
[PASS] testApprove() (gas: 31162)
[PASS] testBurn() (gas: 59875)
[PASS] testRevertTransferFromInsufficientAllowance() (gas: 81034)
[PASS] testRevertTransferFromInsufficientBalance() (gas: 81662)
[PASS] testRevertTransferInsufficientBalance() (gas: 52882)
[PASS] testInfiniteApproveTransferFrom() (gas: 90167)
[PASS] testMetadata() (gas: 14606)
[PASS] testMint() (gas: 53830)
[PASS] testTransfer() (gas: 60473)
[PASS] testTransferFrom() (gas: 84152)
Test result: ok. 10 passed; 0 failed; finished in 2.47ms
Diff in "ERC20Test::testApprove()": consumed "(gas: 31162)" gas, expected "(gas: 31170)" gas
```
