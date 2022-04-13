## Gas Snapshots

Forge can generate gas snapshots for all your test functions. This could
be useful if you are trying to gas-optimize your contracts and want to
compare the gas usage from before and after the optimizations.

To generate the gas snapshot, run `forge snapshot`.

This will generate a file called `.gas-snapshot` by default with all your
tests (not including fuzz tests) and their respective gas-usage.

```ignore
> forge snapshot
> cat .gas-snapshot

ERC20Test:testApprove() (gas: 31162)
ERC20Test:testBurn() (gas: 59875)
ERC20Test:testFailTransferFromInsufficientAllowance() (gas: 81034)
ERC20Test:testFailTransferFromInsufficientBalance() (gas: 81662)
ERC20Test:testFailTransferInsufficientBalance() (gas: 52882)
ERC20Test:testInfiniteApproveTransferFrom() (gas: 90167)
ERC20Test:testMetadata() (gas: 14606)
ERC20Test:testMint() (gas: 53830)
ERC20Test:testTransfer() (gas: 60473)
ERC20Test:testTransferFrom() (gas: 84152)
```

### Output file

If you would like to specify a different output file, run `forge snapshot --snap <FILE_NAME>`.
You can also sort the results by gas usage. Use the `--asc` option to sort the results in
ascending order and `--desc` to sort the results in descending order.

You can also specify a min/max gas threshold for all your tests. To only include results
above a threshold, you can use the `--min <VALUE>` option. In the same way, to only
include results under a threshold, you can use the `--max <VALUE>` option. Keep in mind
that the changes will be made in the `.gas-snapshot` file and not in the snapshot being
displayed in your screen.


### Gas Comparison

If you would like to compare the current `.gas-snapshot` file with your 
latest changes, you can use the `--diff` or `--check` options, which will
compare the gas usage of your changes with the current `.gas-snapshot` file.

`--diff` will compare against a snapshot and display changes from the snapshot. 
It can also take an optional snapshot file `--diff <FILE_NAME>` with the default
being `.gas-snapshot`.

Example:

```ignore
> forge snapshot --diff .gas-snapshot2

Running 10 tests for src/test/ERC20.t.sol:ERC20Test
[PASS] testApprove() (gas: 31162)
[PASS] testBurn() (gas: 59875)
[PASS] testFailTransferFromInsufficientAllowance() (gas: 81034)
[PASS] testFailTransferFromInsufficientBalance() (gas: 81662)
[PASS] testFailTransferInsufficientBalance() (gas: 52882)
[PASS] testInfiniteApproveTransferFrom() (gas: 90167)
[PASS] testMetadata() (gas: 14606)
[PASS] testMint() (gas: 53830)
[PASS] testTransfer() (gas: 60473)
[PASS] testTransferFrom() (gas: 84152)
Test result: ok. 10 passed; 0 failed; finished in 2.86ms
testBurn() (gas: 0 (0.000%))
testFailTransferFromInsufficientAllowance() (gas: 0 (0.000%))
testFailTransferFromInsufficientBalance() (gas: 0 (0.000%))
testFailTransferInsufficientBalance() (gas: 0 (0.000%))
testInfiniteApproveTransferFrom() (gas: 0 (0.000%))
testMetadata() (gas: 0 (0.000%))
testMint() (gas: 0 (0.000%))
testTransfer() (gas: 0 (0.000%))
testTransferFrom() (gas: 0 (0.000%))
testApprove() (gas: -8 (-0.000%))
Overall gas change: -8 (-0.000%)
```

`--check` will compare a snapshot with an existing snapshot file and display all the 
differences, if any. You can change the the file it will be comparing the
snapshot to by providing a different file name `--check <FILE_NAME>`.

Example:

```ignore
> forge snapshot --check .gas-snapshot2

Running 10 tests for src/test/ERC20.t.sol:ERC20Test
[PASS] testApprove() (gas: 31162)
[PASS] testBurn() (gas: 59875)
[PASS] testFailTransferFromInsufficientAllowance() (gas: 81034)
[PASS] testFailTransferFromInsufficientBalance() (gas: 81662)
[PASS] testFailTransferInsufficientBalance() (gas: 52882)
[PASS] testInfiniteApproveTransferFrom() (gas: 90167)
[PASS] testMetadata() (gas: 14606)
[PASS] testMint() (gas: 53830)
[PASS] testTransfer() (gas: 60473)
[PASS] testTransferFrom() (gas: 84152)
Test result: ok. 10 passed; 0 failed; finished in 2.47ms
Diff in "ERC20Test::testApprove()": consumed "(gas: 31162)" gas, expected "(gas: 31170)" gas 
```


If this wasn't what you were looking for, try looking through the official documentation
by running `forge snapshot --help`.
