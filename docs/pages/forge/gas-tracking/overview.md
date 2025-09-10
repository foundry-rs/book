---
description: Track and optimize gas consumption with reports, function snapshots, and section snapshots for performance analysis.
---

## Gas Tracking

Forge can help you estimate how much gas your contract will consume.

Currently, Forge ships with three different tools for this job:

- [**Gas reports**](/forge/gas-tracking/gas-reports): Gas reports give you an overview of how much Forge thinks the
  individual functions in your contracts will consume in gas.
- [**Gas function snapshots**](/forge/gas-tracking/gas-function-snapshots): Gas function snapshots give you an overview of how much
  each test function consumes in gas.
- [**Gas section snapshots**](/forge/gas-tracking/gas-section-snapshots): Gas section snapshots give you the ability to capture gas usage over arbitrary sections inside of test functions.
  This also tracks internal gas usage. You can access this by using the `snapshotGas*` cheatcodes inside your tests.

Gas reports, gas function snapshots and gas section snapshots differ in some ways:

- Gas reports use tracing to figure out gas costs for individual contract calls.  
  This gives more granular insight, at the cost of speed.
- Gas function snapshots have more built-in tools, such as diffs and exporting the results to a file.
  Snapshots are not as granular as gas reports, but they are faster to generate.
- Gas section snapshots provides the most granular way to capture gas usage. Every captured gas snapshot is written to a file in a `snapshots` directory.
  By default these snapshots are grouped by the contract name of the test.
