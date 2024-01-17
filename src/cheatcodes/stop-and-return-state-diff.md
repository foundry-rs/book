## `stopAndReturnStateDiff`

### Signature

```solidity
enum AccountAccessKind {
    Call,
    DelegateCall,
    CallCode,
    StaticCall,
    Create,
    SelfDestruct,
    Resume,
    Balance,
    Extcodesize,
    Extcodehash,
    Extcodecopy
}

struct ChainInfo {
    uint256 forkId;
    uint256 chainId;
}

struct AccountAccess {
    ChainInfo chainInfo;
    AccountAccessKind kind;
    address account;
    address accessor;
    bool initialized;
    uint256 oldBalance;
    uint256 newBalance;
    bytes deployedCode;
    uint256 value;
    bytes data;
    bool reverted;
    StorageAccess[] storageAccesses;
}

struct StorageAccess {
    address account;
    bytes32 slot;
    bool isWrite;
    bytes32 previousValue;
    bytes32 newValue;
    bool reverted;
}

function stopAndReturnStateDiff() external returns (AccountAccess[] memory accesses);
```

### Description

Retrieves state changes recorded after a call to [`startStateDiffRecording`](./start-state-diff-recording.md). This function will consume the recorded state diffs when called and disable state diff recording. One may call `startStateDiffRecording` to resume recording.

There are two types of state change records; account accesses and storage accesses represented as `AccountAccess` and `StorageAccess`.

Account state changes (`AccountAccess`) are recorded at the start of a new EVM context; i.e. induced by the various CREATE, CALL and SELFDESTRUCT operations.
An `AccountAccess` record contain storage accesses, represented as `StorageAccess`, that occurred before it was preempted via sub-calls or create operations.

The ordering of `AccountAccess` records reflect the EVM execution order of their associated operations. An `AccountAccess` is created whenever an EVM context is created or resumed.
If a sub-context is created, a `Resume` `AccountAccess` is recorded to indicate that a previous `AccountAccess` that was pre-empted has been resumed.

### `AccountAccessKind`

The kind of account access that determines the `account` that was accessed. This is typically designated by the EVM operation that initiated the account's execution context.
If kind is `Call`, `DelegateCall`, `StaticCall` or `CallCode`, then the `account` is the callee.
If kind is Create, then the account is the newly created account.
If kind is SelfDestruct, then the account is the selfdestruct recipient.
If kind is a Resume, then account represents an execution context that had resumed.

- `Call` - The account was called 
- `DelegateCall` - The account was called via delegate call
- `CallCode` - The account was called via callcode
- `StaticCall` - The account was called via staticcall
- `Create` - The account was created
- `SelfDestruct` - The account was selfdestructed
- `Resume` - Indicates that a previously pre-emptyed account access was resumed
- `Balance` - The account's codesize was read
- `Extcodesize` - The account's codesize was read
- `Extcodehash` - The account's codehash was read
- `Extcodecopy` - The account's code was copied

### `AccountAccess`

- `chainInfo` - The chain and fork the accessed occurred.
- `kind` - The kind of account access. This determines how to interpret the `AccountAccess`
- `account` - The account that was accessed. It's the account created for `AccountAccessKind.Create`.
 In the case of an `AccountAccessKind.SelfDestruct`, it's the selfdestruct recipient.
 For all other types of `AccountAccessKind`, it's the account of the current EVM context.
- `accessor` - What accessed `account`. That is either the account creator, caller or the account being selfdestructed.
- `initialized` - If the account was initialized or empty prior to the access.
An account is considered initialized if it has code, a
non-zero nonce, or a non-zero balance.
- `oldBalance`: The previous balance of the accessed `account`.
- `newBalance` - The potential new balance of the accessed account.
That is, all balance changes are recorded here, even if reverts occurred.
- `deployedCode` - Code of the `account` deployed in the case of `AccountAccessKind.Create`. This field is empty For all other account access kinds.
- `value` - The value passed along with the account access.
- `data` - Input data provided (i.e. `msg.data`) in the case of a `CREATE` or `CALL` type access.
- `reverted` - If this access reverted in either the current or parent context.
- `storageAccesses` - An ordered list of storage accesses made while the account access is non-preemptive.

### `StorageAccess`

The storage accesses made during an `AccountAccess`. `StorageAccess` cannot exist without an associated `AccountAccess`. This means that when state diffs begins on the given context, storage accesses made during that context are not recorded as the context (but not its sub-contexts) isn't recorded.

`StorageAccess` contains the following fields:

- `account` - A account whose storage was accessed
- `slot` - The slot that was accessed
- `isWrite` - If the access was a write
- `previousValue` - The value of the slot prior to this storage access
- `newValue` - The value of the slot after this storage access
- `reverted` - If this access was reverted

### Resumed `AccountAccess`

This type of AccountAccess is generated when a sub-context returns to its parent context. It retains the same values as the original context, including `accessor`, `account`, `initialized`, `storageAccesses`, and `reverted`.
The following control flow table illustrate how Resume AccountAccesses are recorded.

| Step in Contract A's `alpha()` | Step in Contract B's `beta()` | AccountAccess Records State              |
|--------------------------------|-------------------------------|------------------------------------------|
| Call A.alpha()                |                               | [A.call]              |
| Access state                |                               | [A.call[A.access]]              |
| Call B.beta()               | B.beta() begins               | [A.call[A.access], B.call]                  |
| (Execution Paused)          | Access state               | [A.call[A.access], B.call[B.access]]                  |
|                             |   Return                     |                        |
| Resume execution            | (Return to A.alpha())         | [A.call[A.access], B.call[B.access]]             |
| Access state                 |                              | [<br>&emsp;A.call[A.access], <br>&emsp;B.call[B.access], <br>&emsp;A.resume[A.access']<br>]       |


> ℹ️ **Note**
>
> A Resumed AccountAccess is created only if storage accesses occurred after a context was resumed.

### Example: Recording storage state changes during a CREATE operation
```solidity
contract Contract {
    uint256 internal _reserved;
    uint256 public data;
    constructor(uint _data) payable { data = _data; }
}

vm.startStateDiffRecording();
Contract contract = new Contract{value: 1 ether}(100);
Vm.AccountAccess[] memory records = vm.stopAndReturnStateDiff();

assertEq(records.length, 1);
assertEq(records[0].kind, Vm.AccountAccessKind.Create);
assertEq(records[0].account, address(contract));
assertEq(records[0].accessor, address(this));
assertEq(records[0].initialized, true);
assertEq(records[0].oldBalance, 0);
assertEq(records[0].newBalance, 1 ether);
assertEq(records[0].deployedCode, address(contract).code);
assertEq(records[0].value, 1 ether);
assertEq(records[0].data, abi.encodePacked(type(Contract).creationCode, (uint(100))));
assertEq(records[0].reverted, false);

assertEq(records[0].storageAccesses.length, 1);
assertEq(records[0].storageAccesses[0].account, address(contract));
assertEq(records[0].storageAccesses[0].slot, bytes32(uint256(1)));
assertEq(records[0].storageAccesses[0].isWrite, true);
assertEq(records[0].storageAccesses[0].previousValue, bytes32(uint(0)));
assertEq(records[0].storageAccesses[0].newValue, bytes32(uint(100)));
assertEq(records[0].storageAccesses[0].reverted, false);
```

Note that there are no `Resume` account accesses in this example.

### Example: Resumed Account Access
```solidity
contract Foo {
    Bar b;
    uint256 public val;
    constructor(Bar _b) { b = _b; }
    function run() external {
        val = val + 1;
        b.run();
        val = val + 1;
    }
}
contract Bar {
    function run() external {}
}

Bar bar = new Bar();
Foo foo = new Foo(bar);

vm.startStateDiffRecording();
foo.run();
Vm.AccountAccess[] memory records = vm.stopAndReturnStateDiff();

assertEq(records.length, 3);
Vm.AccountAccess memory fooCall = records[0];
assertEq(fooCall.kind, Vm.AccountAccessKind.Call);
assertEq(fooCall.account, address(foo));
assertEq(fooCall.accessor, address(this));
// foo.val increment
assertEq(fooCall.storageAccesses.length, 2);
assertEq(fooCall.storageAccesses[0].isWrite, false);
assertEq(fooCall.storageAccesses[1].isWrite, true);
assertEq(fooCall.storageAccesses[1].oldValue, bytes32(uint(0)));
assertEq(fooCall.storageAccesses[1].newValue, bytes32(uint(1)));

// bar.run CALL
Vm.AccountAccess memory barCall = records[1];
assertEq(barCall.kind, Vm.AccountAccessKind.Call);
assertEq(barCall.account, address(bar));
assertEq(barCall.accessor, address(foo));

// foo.run RESUME
Vm.AccountAccess memory fooResume = records[2];
assertEq(fooResume.kind, Vm.AccountAccessKind.Resume);
// foo.val increment
assertEq(fooResume.storageAccesses.length, 2);
assertEq(fooResume.storageAccesses[0].isWrite, false);
assertEq(fooResume.storageAccesses[1].isWrite, true);
assertEq(fooResume.storageAccesses[1].oldValue, bytes32(uint(1)));
assertEq(fooResume.storageAccesses[1].newValue, bytes32(uint(2)));
```