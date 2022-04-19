## Gas Tracking

Forge can help you estimate how much gas your contract will consume.

Currently, Forge ships with two different tools for this job, but they may be merged in the future:

- [**Gas reports**](./gas-reports.md): Gas reports give you an overview of how much Forge thinks the
  individual functions in your contracts will consume in gas.
- [**Gas snapshots**](./gas-snapshots.md): Gas snapshots give you an overview of how much
  each test consumes in gas.

Gas reports and gas snapshots differ in some ways:

- Gas reports use tracing to figure out gas costs for individual contract calls.  
  This gives more granular insight, at the cost of speed.
- Gas snapshots have more built-in tools, such as diffs and exporting the results to a file.  
  Snapshots are not as granular as gas reports, but they are faster to generate.
