---
description: Test against live blockchain state using fork mode or forking cheatcodes for integration testing with real contracts.
---

## Fork Testing

Forge supports testing in a forked environment with two different approaches:

- [**Forking Mode**](#forking-mode) — use a single fork for all your tests via the `forge test --fork-url` flag
- [**Forking Cheatcodes**](#forking-cheatcodes) — create, select, and manage multiple forks directly in Solidity test code via [forking cheatcodes](/reference/cheatcodes/forking)

Which approach to use? Forking mode affords running an entire test suite against a specific forked environment, while forking cheatcodes provide more flexibility and expressiveness to work with multiple forks in your tests. Your particular use case and testing strategy will help inform which approach to use.

:::tip
Starting with Foundry v1.3.0, forked tests using the Reth client are faster thanks to the `eth_getAccountInfo` API which reduce account data fetching from three requests to one.
:::

### Forking Mode

To run all tests in a forked environment, such as a forked Ethereum mainnet, pass an RPC URL via the `--fork-url` flag:

```bash
forge test --fork-url <your_rpc_url>
```

The following values are changed to reflect those of the chain at the moment of forking:

- [`block_number`](/config/reference/testing#block_number)
- [`chain_id`](/config/reference/testing#chain_id)
- [`gas_limit`](/config/reference/testing#gas_limit)
- [`gas_price`](/config/reference/testing#gas_price)
- [`block_base_fee_per_gas`](/config/reference/testing#block_base_fee_per_gas)
- [`block_coinbase`](/config/reference/testing#block_coinbase)
- [`block_timestamp`](/config/reference/testing#block_timestamp)
- [`block_difficulty`](/config/reference/testing#block_difficulty)

It is possible to specify a block from which to fork with `--fork-block-number`:

```bash
forge test --fork-url <your_rpc_url> --fork-block-number 1
```

Forking is especially useful when you need to interact with existing contracts. You may choose to do integration testing this way, as if you were on an actual network.

#### Caching

If both `--fork-url` and `--fork-block-number` are specified, then data for that block is cached for future test runs.

The data is cached in `~/.foundry/cache/rpc/<chain name>/<block number>`. To clear the cache, simply remove the directory or run [`forge clean`](/forge/reference/clean) (removes all build artifacts and cache directories).

It is also possible to ignore the cache entirely by passing `--no-storage-caching`, or with `foundry.toml` by configuring [`no_storage_caching`](/config/reference/testing#no_storage_caching) and [`rpc_storage_caching`](/config/reference/testing#rpc_storage_caching).

#### Improved traces

Forge supports identifying contracts in a forked environment with Etherscan.

To use this feature, pass the Etherscan API key via the `--etherscan-api-key` flag:

```bash
forge test --fork-url <your_rpc_url> --etherscan-api-key <your_etherscan_api_key>
```

Alternatively, you can set the `ETHERSCAN_API_KEY` environment variable.

### Forking Cheatcodes

Forking cheatcodes allow you to enter forking mode programmatically in your Solidity test code. Instead of configuring forking mode via `forge` CLI arguments, these cheatcodes allow you to use forking mode on a test-by-test basis and work with multiple forks in your tests. Each fork is identified via its own unique `uint256` identifier.

#### Usage

Important to keep in mind that _all_ test functions are isolated, meaning each test function is executed with a _copy_ of the state _after_ `setUp` and is executed in its own stand-alone EVM.

Therefore forks created during `setUp` are available in tests. The code example below uses [`createFork`](/reference/cheatcodes/create-fork) to create two forks, but does _not_ select one initially. Each fork is identified with a unique identifier (`uint256 forkId`), which is assigned when it is first created.

Enabling a specific fork is done via passing that `forkId` to [`selectFork`](/reference/cheatcodes/select-fork).

[`createSelectFork`](/reference/cheatcodes/create-select-fork) is a one-liner for `createFork` plus `selectFork`.

> WARN: `vm.createSelectFork` creates a **new** fork every time it is called. If you call `vm.createSelectFork` with the same RPC URL multiple times, it will create multiple independent forks, each starting from a clean state. Any state changes made in one fork will not be present in subsequent forks created with `vm.createSelectFork`. To preserve state changes when switching between forks, use `vm.createFork` once to create each fork, store the returned fork IDs, and then use `vm.selectFork` to switch between them.

There can only be one fork active at a time, and the identifier for the currently active fork can be retrieved via [`activeFork`](/reference/cheatcodes/active-fork).

Similar to [`roll`](/reference/cheatcodes/roll), you can set `block.number` of a fork with [`rollFork`](/reference/cheatcodes/roll-fork).

To understand what happens when a fork is selected, it is important to know how the forking mode works in general:

Each fork is a standalone EVM, i.e. all forks use completely independent storage. The only exception is the state of the `msg.sender` and the test contract itself, which are persistent across fork swaps.
In other words all changes that are made while fork `A` is active (`selectFork(A)`) are only recorded in fork `A`'s storage and are not available if another fork is selected. However, changes recorded in the test contract itself (variables) are still available because the test contract is a _persistent_ account.

The `selectFork` cheatcode sets the _remote_ section with the fork's data source, however the _local_ memory remains persistent across fork swaps. This also means `selectFork` can be called at all times with any fork, to set the _remote_ data source. However, it is important to keep in mind the above rules for `read/write` access always apply, meaning _writes_ are persistent across fork swaps.

#### Examples

##### Create and Select Forks

```solidity
contract ForkTest is Test {
    // the identifiers of the forks
    uint256 mainnetFork;
    uint256 optimismFork;

    //Access variables from .env file via vm.envString("varname")
    //Replace ALCHEMY_KEY by your alchemy key or Etherscan key, change RPC url if need
    //inside your .env file e.g:
    //MAINNET_RPC_URL = 'https://eth-mainnet.g.alchemy.com/v2/ALCHEMY_KEY'
    //string MAINNET_RPC_URL = vm.envString("MAINNET_RPC_URL");
    //string OPTIMISM_RPC_URL = vm.envString("OPTIMISM_RPC_URL");

    // create two _different_ forks during setup
    function setUp() public {
        mainnetFork = vm.createFork(MAINNET_RPC_URL);
        optimismFork = vm.createFork(OPTIMISM_RPC_URL);
    }

    // demonstrate fork ids are unique
    function testForkIdDiffer() public {
        assert(mainnetFork != optimismFork);
    }

    // select a specific fork
    function testCanSelectFork() public {
        // select the fork
        vm.selectFork(mainnetFork);
        assertEq(vm.activeFork(), mainnetFork);

        // from here on data is fetched from the `mainnetFork` if the EVM requests it and written to the storage of `mainnetFork`
    }

    // manage multiple forks in the same test
    function testCanSwitchForks() public {
        vm.selectFork(mainnetFork);
        assertEq(vm.activeFork(), mainnetFork);

        vm.selectFork(optimismFork);
        assertEq(vm.activeFork(), optimismFork);
    }

    // forks can be created at all times
    function testCanCreateAndSelectForkInOneStep() public {
        // creates a new fork and also selects it
        uint256 anotherFork = vm.createSelectFork(MAINNET_RPC_URL);
        assertEq(vm.activeFork(), anotherFork);
    }

    // set `block.number` of a fork
    function testCanSetForkBlockNumber() public {
        vm.selectFork(mainnetFork);
        vm.rollFork(1_337_000);

        assertEq(block.number, 1_337_000);
    }
}
```

##### Separated and persistent storage

As mentioned each fork is essentially an independent EVM with separated storage.

Only the accounts of `msg.sender` and the test contract (`ForkTest`) are persistent when forks are selected. But any account can be turned into a persistent account: [`makePersistent`](/reference/cheatcodes/make-persistent).

An account that is _persistent_ is unique, i.e. it exists on all forks

```solidity
contract ForkTest is Test {
    // the identifiers of the forks
    uint256 mainnetFork;
    uint256 optimismFork;

    //Access variables from .env file via vm.envString("varname")
    //Replace ALCHEMY_KEY by your alchemy key or Etherscan key, change RPC url if need
    //inside your .env file e.g:
    //MAINNET_RPC_URL = 'https://eth-mainnet.g.alchemy.com/v2/ALCHEMY_KEY'
    //string MAINNET_RPC_URL = vm.envString("MAINNET_RPC_URL");
    //string OPTIMISM_RPC_URL = vm.envString("OPTIMISM_RPC_URL");

    // create two _different_ forks during setup
    function setUp() public {
        mainnetFork = vm.createFork(MAINNET_RPC_URL);
        optimismFork = vm.createFork(OPTIMISM_RPC_URL);
    }

    // creates a new contract while a fork is active
    function testCreateContract() public {
        vm.selectFork(mainnetFork);
        assertEq(vm.activeFork(), mainnetFork);

        // the new contract is written to `mainnetFork`'s storage
        SimpleStorageContract simple = new SimpleStorageContract();

        // and can be used as normal
        simple.set(100);
        assertEq(simple.value(), 100);

        // after switching to another contract we still know `address(simple)` but the contract only lives in `mainnetFork`
        vm.selectFork(optimismFork);

        /* this call will therefore revert because `simple` now points to a contract that does not exist on the active fork
        * it will produce following revert message:
        *
        * "Contract 0xCe71065D4017F316EC606Fe4422e11eB2c47c246 does not exist on active fork with id `1`
        *       But exists on non active forks: `[0]`"
        */
        simple.value();
    }

     // creates a new _persistent_ contract while a fork is active
     function testCreatePersistentContract() public {
        vm.selectFork(mainnetFork);
        SimpleStorageContract simple = new SimpleStorageContract();
        simple.set(100);
        assertEq(simple.value(), 100);

        // mark the contract as persistent so it is also available when other forks are active
        vm.makePersistent(address(simple));
        assert(vm.isPersistent(address(simple)));

        vm.selectFork(optimismFork);
        assert(vm.isPersistent(address(simple)));

        // This will succeed because the contract is now also available on the `optimismFork`
        assertEq(simple.value(), 100);
     }
}

contract SimpleStorageContract {
    uint256 public value;

    function set(uint256 _value) public {
        value = _value;
    }
}
```

For more details and examples, see the [forking cheatcodes](/reference/cheatcodes/forking) reference.

### EVM version

Proper configuration is needed to execute forked tests with chains using different EVM versions:

- if same EVM version applies for all forked chains used, then it can be globally configured in `foundry.toml` file

```toml
evm_version = "prague"
```

- if different EVM versions are used, specific EVM test version can be set using inline configuration

```solidity
/// forge-config: default.evm_version = "shanghai"
```
