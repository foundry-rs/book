---
description: Replay test failures incrementally using persisted failure data for fuzz tests, invariant tests, and unit tests.
---

## Replaying Failures

Forge supports incrementally replaying last test run failures by persisting them on the disk.

### Rerun failures

The `--rerun` option can be used to omit successful tests and replay recorded failures only:

```bash
forge test --rerun
```

The failed tests are written in `~/.foundry/cache/test-failures` file. This file is updated each time `forge test` is performed, so it reflects failures from the last run.

### Fuzz tests failures

Forge saves all fuzz tests counterexamples and replays them before new test campaigns are started (This is done in order to ensure there is no regression introduced).
Fuzz tests failures encountered in several runs are by default persisted in `~/.foundry/cache/fuzz/failures` file. The file content is not replaced by subsequent test runs, but new records are added to existing entries.

The default file used to persist and rerun fuzz test failures from can be changed in foundry.toml:

```toml
[fuzz]
failure_persist_file="/tests/failures.txt"
```

or by using inline config

```solidity
/// forge-config: default.fuzz.failure-persist-file = /tests/failures.txt
```

### Invariant tests failures

Failures from invariant tests are saved and replayed before new test campaigns are started, similar with fuzz tests. The difference is that the failed sequences are persisted in individual files, with specific `~/.foundry/cache/invariant/failures/{TEST_SUITE_NAME}/{INVARIANT_NAME}` default path. Content of this file is replaced only when a different counterexample is found.

The default directory to persist invariant test failures can be changed in foundry.toml:

```toml
[invariant]
failure_persist_dir="/tests/dir"
```

or by using inline config

```Solidity
/// forge-config: default.invariant.failure-persist-dir = /tests/dir
```

### Remove persisted failures

To ignore saved failures and start a clean test campaign, simply remove the persisted files or run [`forge clean`](/forge/reference/clean) (removes all build artifacts and cache directories).
