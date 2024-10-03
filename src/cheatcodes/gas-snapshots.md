## `snapshotGas` cheatcodes

### Signature

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

### Description

`snapshotGas*` cheatcodes allow you to capture gas usage in your tests. This can be useful to track how much gas your logic is consuming. You can capture the gas usage of the last call by name, capture an arbitrary numerical value by name, or start and stop a snapshot capture of the current gas usage by name.

In order to strictly compare gas usage across test runs, set the `FORGE_SNAPSHOT_CHECK` environment variable to `true` before running your tests. This will compare the gas usage of your tests against the last snapshot and fail if the gas usage has changed. By default the snapshots directory will be newly created and its contents removed before each test run to ensure no stale data is present.

It is intended that the `snapshots` directory created when using the `snapshotGas*` cheatcodes is checked into version control. This allows you to track changes in gas usage over time and compare gas usage during code reviews.

When running `forge clean` the `snapshots` directory will be deleted.

### Examples

Capturing the gas usage of a section of code that calls an external contract:

```solidity
contract SnapshotGasTest is Test {
    uint256 public slot0;

    Flare public flare;

    function setUp() public {
        flare = new Flare();
    }

    function testSnapshotGas() public {
        vm.startSnapshotGas("externalA");
        flare.run(256);
        uint256 gasUsed = vm.stopSnapshotGas();
    }
}
```

Capturing the gas usage of multiple sections of code that modify the internal state:


```solidity
contract SnapshotGasTest is Test {
    uint256 public slot0;


    /// Writes to `snapshots/SnapshotGasTest.json` group with name `internalA`, `internalB`, and `internalC`.
    function testSnapshotGas() public {
        vm.startSnapshotGas("internalA");
        slot0 = 1;
        vm.stopSnapshotGas();

        vm.startSnapshotGas("internalB");
        slot0 = 2;
        vm.stopSnapshotGas();

        vm.startSnapshotGas("internalC");
        slot0 = 0;
        vm.stopSnapshotGas();
    }
}
```

Capturing the gas usage of a section of code that modifies both the internal state and calls an external contract:

```solidity
contract SnapshotGasTest is Test {
    uint256 public slot0;
    Flare public flare;

    function setUp() public {
        flare = new Flare();
    }

    /// Writes to `snapshots/SnapshotGasTest.json` group with name `combinedA`.
    function testSnapshotGas() public {
        vm.startSnapshotGas("combinedA");
        flare.run(256);
        slot0 = 1;
        vm.stopSnapshotGas();
    }
}
```

```solidity

Capturing an arbitrary numerical value (such as the bytecode size of a contract):

```solidity
contract SnapshotGasTest is Test {
    uint256 public slot0;

    /// Writes to `snapshots/SnapshotGasTest.json` group with name `valueA`, `valueB`, and `valueC`.
    function testSnapshotValue() public {
        uint256 a = 123;
        uint256 b = 456;
        uint256 c = 789;

        vm.snapshotValue("valueA", a);
        vm.snapshotValue("valueB", b);
        vm.snapshotValue("valueC", c);
    }
}
```

Capturing the gas usage of the last call from the callee perspective:

```solidity
contract SnapshotGasTest is Test {
    Flare public flare;

    function setUp() public {
        flare = new Flare();
    }

    /// Writes to `snapshots/SnapshotGasTest.json` group with name `lastCallA`.
    function testSnapshotGasLastCall() public {
        flare.run(1);
        vm.snapshotGasLastCall("lastCallA");
    }
}
```

For each of the above examples you can also use the `group` variant of the cheatcodes to group the snapshots together in a custom group.

```solidity
contract SnapshotGasTest is Test {
    uint256 public slot0;

    /// Writes to `snapshots/CustomGroup.json` group with name `internalA`, `internalB`, and `internalC`.
    function testSnapshotGas() public {
        vm.startSnapshotGas("CustomGroup", "internalA");
        slot0 = 1;
        vm.stopSnapshotGas();

        vm.startSnapshotGas("CustomGroup", "internalB");
        slot0 = 2;
        vm.stopSnapshotGas();

        vm.startSnapshotGas("CustomGroup", "internalC");
        slot0 = 0;
        vm.stopSnapshotGas();
    }
}
```
