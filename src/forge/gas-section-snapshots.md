# Gas Section Snapshots

Forge can capture gas snapshots over arbitrary sections inside of your test functions. This can be useful to get a granular measurement of how much gas your logic is consuming as both external calls and internal gas usage are measured.

To usage gas snapshots, use the following [`cheatcodes`](../cheatcodes/gas-snapshots.md) in your test functions:

```solidity
/// Start a snapshot capture of the current gas usage by name.
/// The group name is derived from the contract name.
function startSnapshotGas(string calldata name) external;

/// Start a snapshot capture of the current gas usage by name in a group.
function startSnapshotGas(string calldata group, string calldata name) external;

/// Stop the snapshot capture of the current gas by latest snapshot name, capturing the gas used since the start.
function stopSnapshotGas() external returns (uint256 gasUsed);

/// Stop the snapshot capture of the current gas usage by name, capturing the gas used since the start.
/// The group name is derived from the contract name.
function stopSnapshotGas(string calldata name) external returns (uint256 gasUsed);

/// Stop the snapshot capture of the current gas usage by name in a group, capturing the gas used since the start.
function stopSnapshotGas(string calldata group, string calldata name) external returns (uint256 gasUsed);

/// Snapshot capture an arbitrary numerical value by name.
/// The group name is derived from the contract name.
function snapshotValue(string calldata name, uint256 value) external;

/// Snapshot capture an arbitrary numerical value by name in a group.
function snapshotValue(string calldata group, string calldata name, uint256 value) external;

/// Snapshot capture the gas usage of the last call by name from the callee perspective.
function snapshotGasLastCall(string calldata name) external returns (uint256 gasUsed);

/// Snapshot capture the gas usage of the last call by name in a group from the callee perspective.
function snapshotGasLastCall(string calldata group, string calldata name) external returns (uint256 gasUsed);
```