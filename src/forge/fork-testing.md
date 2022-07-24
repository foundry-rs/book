## Fork Testing

Forge supports testing in a forked environment with two different approaches:

- [**Forking Mode**](#forking-mode) — use a single fork for all your tests via the `forge test --fork-url` flag
- [**Forking Cheatcodes**](#forking-cheatcodes) — create, select, and manage multiple forks directly in Solidity test code via [forking cheatcodes](../cheatcodes/forking.md)

Which approach to use? Forking mode affords running an entire test suite against a specific forked environment, while forking cheatcodes provide more flexibility and expressiveness to work with multiple forks in your tests. Your particular use case and testing strategy will help inform which approach to use.

### Forking Mode

To run all tests in a forked environment, such as a forked Ethereum mainnet, pass an RPC URL via the `--fork-url` flag:

```bash
forge test --fork-url <your_rpc_url>
```

The following values are changed to reflect those of the chain at the moment of forking:

- [`block_number`](../reference/config.md#block_number)
- [`chain_id`](../reference/config.md#chain_id)
- [`gas_limit`](../reference/config.md#gas_limit)
- [`gas_price`](../reference/config.md#gas_price)
- [`block_base_fee_per_gas`](../reference/config.md#block_base_fee_per_gas)
- [`block_coinbase`](../reference/config.md#block_coinbase)
- [`block_timestamp`](../reference/config.md#block_timestamp)
- [`block_difficulty`](../reference/config.md#block_difficulty)

It is possible to specify a block from which to fork with `--fork-block-number`:

```bash
forge test --fork-url <your_rpc_url> --fork-block-number 1
```

Forking is especially useful when you need to interact with existing contracts. You may choose to do integration testing this way, as if you were on an actual network.

#### Caching

If both `--fork-url` and `--fork-block-number` are specified, then data for that block is cached for future test runs.

The data is cached in `~/.foundry/cache/<chain id>/<block number>`. To clear the cache, simply remove the directory or run [`forge clean`](../reference/forge/forge-clean.md) (removes all build artifacts and cache directories).

It is also possible to ignore the cache entirely by passing `--no-storage-caching`, or with `foundry.toml` by configuring [`no_storage_caching`](../reference/config.md#no_storage_caching) and [`rpc_storage_caching`](../reference/config.md#rpc_storage_caching).

#### Improved traces

Forge supports identifying contracts in a forked environment with Etherscan.

To use this feature, pass the Etherscan API key via the `--etherscan-api-key` flag:

```bash
forge test --fork-url <your_rpc_url> --etherscan-api-key <your_etherscan_api_key>
```

Alternatively, you can set the `ETHERSCAN_API_KEY` environment variable.

### Forking Cheatcodes

Forking cheatcodes allow you to enter forking mode programatically in your Solidity test code. Instead of configuring forking mode via `forge` CLI arguments, these cheatcodes allow you to use forking mode on a test-by-test basis and work with multiple forks in your tests. Each fork is identified via its own unique `uint256` identifier.

#### Usage

Important to keep in mind that _all_ test functions are isolated, meaning each test function is executed with a _copy_ of the state after `setUp` and is executed in its own stand-alone EVM.

Therefore forks created during `setUp` are available in tests. The code example below uses [`createFork`](../cheatcodes/create-fork.md) to create two forks, but does _not_ select one initially.

Enabling a specific fork is done via passing a forkId to [`selectFork`](../cheatcodes/select-fork.md).

[`createSelectFork`](../cheatcodes/create-select-fork.md) is a one-liner for `createFork` plus `selectFork`.

There can only be one fork active at a time, and the identifier for the currently active fork can be retrieved via [`activeFork`](../cheatcodes/active-fork.md).

Similar to [`roll`](../cheatcodes/roll.md), you can set `block.timestamp` of a fork with [`rollFork`](../cheatcodes/roll-fork.md).

To understand what happens when a fork is selected, it is important to know how the forking mode works in general:

In fork mode, there are two memory sections in the EVM, a _local_ and a _remote_. The local one contains all modified storage slots, while the remote one contains storage slots fetched via rpc that are _not_ modified.
so when the evm does:

- _read_: return from local if present, otherwise fetch from remote
- _write_: always write into local

The `selectFork` cheatcode sets the _remote_ section with the fork's data source, however the _local_ memory remains persistent across fork swaps. This also means `selectFork` can be called at all times with any fork, to set the _remote_ data source. However, it is important to keep in mind the above rules for `read/write` access always apply, meaning _writes_ are persistent across fork swaps.

> ℹ️ **Important Note**
>
> The current read/write behavior will change soon, with completely separated storage sections for each fork. The docs will be updated to reflect this change and illustrate usage.

#### Examples

```solidity
contract ForkTest is Test {
    // the identifiers of the forks
    uint256 mainnetFork;
    uint256 optimismFork;

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

        // from here on data is fetched from the `mainnetFork` if the EVM requests it
    }

    // manage multiple forks in the same test
    function testCanSwitchForks() public {
        cheats.selectFork(mainnetFork);
        assertEq(vm.activeFork(), mainnetFork);

        cheats.selectFork(optimismFork);
        assertEq(vm.activeFork(), optimismFork);
    }

    // forks can be created at all times
    function testCanCreateAndSelectForkInOneStep() public {
        // creates a new fork and also selects it
        uint256 anotherFork = cheats.createSelectFork(MAINNET_RPC_URL);
    }

    // set `block.timestamp` of a fork
    function testCanSetForkBlockTimestamp() public {
        vm.selectFork(mainnetFork);
        vm.rollFork(1_337_000);

        assertEq(block.number, 1_337_000);
    }
}
```

For more details and examples, see the [forking cheatcodes](../cheatcodes/forking.md) reference.
