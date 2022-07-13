## snapshot cheatcodes

### Signature

```solidity
// Snapshot the current state of the evm.
// Returns the id of the snapshot that was created.
// To revert a snapshot use `revertTo`
function snapshot() external returns(uint256);
// Revert the state of the evm to a previous snapshot
// Takes the snapshot id to revert to.
// This deletes the snapshot and all snapshots taken after the given snapshot id.
function revertTo(uint256) external returns(bool);
```

### Description

`snapshot` takes a snapshot of the state of the blockchain and returns the identifier of the created snapshot

`revertTo` reverts the state of the blockchain to the given snapshot. This deletes the given snapshot, as well as any snapshots taken after (e.g.: reverting to id 1 will delete snapshots with ids 2, 3, etc.)

### Examples


```solidity
struct Storage {
    uint slot0;
    uint slot1;
}

contract SnapshotTest is Test {
    Cheats constant cheats = Cheats(HEVM_ADDRESS);

    Storage store;

    function setUp() public {
        store.slot0 = 10;
        store.slot1 = 20;
    }

    function testSnapshot() public {
        uint256 snapshot = cheats.snapshot();
        store.slot0 = 300;
        store.slot1 = 400;

        assertEq(store.slot0, 300);
        assertEq(store.slot1, 400);

        // after resetting to a snapshot all changes are discarded
        cheats.revertTo(snapshot);
        assertEq(store.slot0, 10, "snapshot revert for slot 0 unsuccessful");
        assertEq(store.slot1, 20, "snapshot revert for slot 1 unsuccessful");
    }

}

```
