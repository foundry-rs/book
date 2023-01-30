## `revokePersistent`

### Signature

```solidity
function revokePersistent(address) external;
function revokePersistent(address[] calldata) external;
```

### Description

The counterpart of [`makePersistent`](./make-persistent.md), that makes the given contract not persistent across fork swaps

### Examples

Revoke a persistent status of a contract

```solidity
contract SimpleStorageContract {
    string public value;

    function set(uint256 _value) public {
        value = _value;
    }
}

function testRevokePersistent() public {
    // select a specific fork
    cheats.selectFork(mainnetFork);
    
    // create a new contract that's stored in the `mainnetFork` storage
    SimpleStorageContract simple = new SimpleStorageContract();
    
    // `simple` is not marked as persistent
    assert(!cheats.isPersistent(address(simple)));
       
    // make it persistent
    cheats.makePersistent(address(simple));
    
    // ensure it is persistent
    assert(cheats.isPersistent(address(simple)));
    
    // revoke it
    cheats.revokePersistent(address(simple));
    
    // contract no longer persistent
    assert(!cheats.isPersistent(address(simple)));
}
```

### SEE ALSO

- [isPersistent](./is-persistent.md)
- [revokePersistent](./revoke-persistent.md)
- [createFork](./create-fork.md)
- [selectFork](./select-fork.md)
