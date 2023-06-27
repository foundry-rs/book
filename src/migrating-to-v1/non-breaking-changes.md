## Non-breaking but important changes

- Snapshot failures between fuzz runs are now persisted, so workarounds are not needed anymore.
- Sensitive broadcast logs are now logged into the `.gitignore`d `cache` directory, instead of written to logs.
- The base fee calculation on Anvil is now entirely skipped if the fee is set to 0.
- `vm.startPrank` now overwrites the existing prank instead of just erroring. However, the already set prank must be used first.