## Gas Snapshots

Forge can generate gas snapshots for all your test functions. This could
be useful if you are trying to gas-optimize your contracts and want to
compare the gas-usage from before and after the optimizations.

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

If you would like to specify a different output file, run `forge snapshot --snap <FILE_NAME>`.

### Gas Comparison

Lets say that you are trying to optimize your contracts, and after changing
it a little bit you want to see if there are any improvements in gas-usage.

If you would like to compare the corrent `.gas-snapshot` file with your 
latest commit, you can use the command `git diff`, which will compare all the
files with your latest commit.

Example:

```ignore
> git diff

diff --git a/.gas-snapshot b/.gas-snapshot
index 4852ee4..e1ab226 100644
--- a/.gas-snapshot
+++ b/.gas-snapshot
@@ -1,4 +1,4 @@
-ERC20Test:testApprove() (gas: 31162)
+ERC20Test:testApprove() (gas: 31170)
 ERC20Test:testBurn() (gas: 59875)
 ERC20Test:testFailTransferFromInsufficientAllowance() (gas: 81034)
 ERC20Test:testFailTransferFromInsufficientBalance() (gas: 81662)
```

If you would like to compare the current `.gas-snapshot` with a new version,
don't run `forge snapshot` again because it will override the .gas-snapshot
and you won't be able to compare the changes. Instead of doing that, one 
suggestion would be to generate a file with a different name using 
`forge snapshot --snap <FILE_NAME>` and then comparing both files using 
the `diff <FILE1> <FILE2>` command on Mac/Linux or `fc <FILE1> <FILE2>` 
on Windows.

Example:

```ignore
> forge snapshot --snap .gas-snapshot2
> diff .gas-snapshot .gas-snapshot2

1c1
< ERC20Test:testApprove() (gas: 31162)
---
> ERC20Test:testApprove() (gas: 31170)
```
