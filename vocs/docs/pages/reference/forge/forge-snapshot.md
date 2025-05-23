## forge snapshot

### NAME

forge-snapshot - Create a snapshot of each test's gas usage.

### SYNOPSIS

``forge snapshot`` [*options*]

### DESCRIPTION

Create a snapshot of each test's gas usage.

The results are written to a file named `.gas-snapshot`. You can change the name of the file
by passing `--snap <PATH>`.

Fuzz tests are included by default in the snapshot. They use a static seed to achieve deterministic results.

Snapshots can be compared with `--diff` and `--check`. The first flag will output a diff, and the second
will output a diff *and* exit with code 1 if the snapshots do not match.

### OPTIONS

#### Snapshot Options

`--asc`  
Sort results by gas used (ascending).

`--desc`  
&nbsp;&nbsp;&nbsp;&nbsp;Sort results by gas used (descending).

`--min` *min_gas*  
&nbsp;&nbsp;&nbsp;&nbsp;Only include tests that used more gas that the given amount.

`--max` *max_gas*  
&nbsp;&nbsp;&nbsp;&nbsp;Only include tests that used less gas that the given amount.

`--tolerance` *threshold*  
&nbsp;&nbsp;&nbsp;&nbsp;Tolerates gas deviations up to the specified percentage (0-100).

`--diff` *path*  
&nbsp;&nbsp;&nbsp;&nbsp;Output a diff against a pre-existing snapshot.

&nbsp;&nbsp;&nbsp;&nbsp;By default the comparison is done with `.gas-snapshot`.

`--check` *path*  
&nbsp;&nbsp;&nbsp;&nbsp;Compare against a pre-existing snapshot, exiting with code 1 if they do not match.

&nbsp;&nbsp;&nbsp;&nbsp;Outputs a diff if the snapshots do not match.

&nbsp;&nbsp;&nbsp;&nbsp;By default the comparison is done with `.gas-snapshot`.

`--snap` *path*  
&nbsp;&nbsp;&nbsp;&nbsp;Output file for the snapshot. Default: `.gas-snapshot`.

{{#include test-options.md}}

{{#include evm-options.md}}

{{#include executor-options.md}}

{{#include core-build-options.md}}

{{#include ../common/display-options.md}}

{{#include common-options.md}}

### EXAMPLES

1. Create a snapshot:
    ```sh
    forge snapshot
    ```

2. Generate a diff:
    ```sh
    forge snapshot --diff
    ```

3. Check that the snapshots match:
    ```sh
    forge snapshot --check
    ```

### SEE ALSO

[forge](./forge.md), [forge test](./forge-test.md)
