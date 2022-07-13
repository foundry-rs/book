## forking cheatcodes

- [`RPC cheatcodes`](./rpc.md)

### Signature

```solidity
// Creates a new fork with the given endpoint and block and returns the identifier of the fork
function createFork(string calldata urlOrAlias,uint256 block) external returns(uint256);
// Creates a new fork with the given endpoint and the _latest_ block and returns the identifier of the fork
function createFork(string calldata urlOrAlias) external returns(uint256);
// Creates _and_ also selects a new fork with the given endpoint and block and returns the identifier of the fork
function createSelectFork(string calldata urlOrAlias,uint256 block) external returns(uint256);
// Creates _and_ also selects a new fork with the given endpoint and the latest block and returns the identifier of the fork
function createSelectFork(string calldata urlOrAlias) external returns(uint256);
// Takes a fork identifier created by `createFork` and sets the corresponding forked state as active.
function selectFork(uint256 forkId) external;
/// Returns the currently active fork
/// Reverts if no fork is currently active
function activeFork() external returns(uint256);
// Updates the currently active fork to given block number
// This is similar to `roll` but for the currently active fork
function rollFork(uint256) external;
// Updates the given fork to given block number
function rollFork(uint256 forkId, uint256 blockNumber) external;
```

### Description

Forking cheatcodes allow you to enter forking mode programatically via cheatcodes.
Instead of configuring forking mode via the CLI arguments of `forge` ([Forking Mode](./forge/forking-mode.md)), these cheatcodes allow you to use forking mode on a test-by-test basis and also allow you to use multiple forks during testing.

During testing forks are identified via `uint256` unique identifiers.

### Examples

Important to keep in mind that _all_ test functions are isolated, meaning each test function is executed with a _copy_ of the state after `setUp` and is executed in its own stand-alone evm.

Therefore forks created during `setUp` are available in tests.

The following creates two forks, but does _not_ select them yet.

Enabling a specific fork is done via `selectFork(uint256 forkId)`.

There can only be one fork active at a time, the currently active fork id can be retrieved via `activeFork()(uint256)`.

To understand what happens when a fork is selected, it is important to know how the forking mode works in general:

In fork mode, there are two memory sections in the EVM, a _local_ and a _remote_. The local one contains all modified storage slots, while the remote one contains storage slots fetched via rpc that are _not_ modified.
so when the evm does:

- _read_: return from local if present, otherwise fetch from remote
- _write_: always write into local

What `selectFork` does is to set the _remote_ section with the fork's data source, however the _local_ memory remains persistent across fork swaps. This also means the `selectFork` can be called at all times with any fork, to set the _remote_ data source. However, it is important that the above rules for `read/write` access always apply, meaning _writes_ are persistent across fork swaps.

`createSelectFork` is a one-liner for `createFork()` + `selectFork()`


```solidity
contract ForkTest is Test {
    Cheats constant cheats = Cheats(HEVM_ADDRESS);

    // the identifiers of the forks
    uint256 mainnetFork;
    uint256 optimismFork;

    // this will create two _different_ forks during setup
    function setUp() public {
        mainnetFork = cheats.createFork("mainnet");
        optimismFork = cheats.createFork(
            "https://opt-mainnet.g.alchemy.com/v2/<api-key>"
        );
    }

    // Fork ids are unique
    function testForkIdDiffer() public {
        assert(mainnetFork != optimismFork);
    }

    // ensures forks use different ids
    function testCanSelectFork() public {
        // select the fork
        cheats.selectFork(mainnetFork);
        assertEq(mainnetFork, cheats.activeFork());
        // from here on data is fetched from the `mainnetFork` if the EVM requests it
    }

    function testCanSwitchContracts() public {
        cheats.selectFork(mainnetFork);
        assertEq(mainnetFork, cheats.activeFork());

        cheats.selectFork(optimismFork);
        assertEq(optimismFork, cheats.activeFork());
    }

    // Forks can be created at all times
    function testCanCreateAndSelectInOneStep() public {
        // creates a new fork and also selects it
        uint256 anotherFork = cheats.createSelectFork("mainnet");
    }
}
```
