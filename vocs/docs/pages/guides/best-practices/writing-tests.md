---
description: Comprehensive testing strategies including unit tests, fork tests, test organization, and harness patterns for smart contracts.
---

## Tests

---

### General Test Guidance

#### Naming test files

For testing `MyContract.sol`, the test file should be `MyContract.t.sol`. For testing `MyScript.s.sol`, the test file should be `MyScript.t.sol`.

- If the contract is big and you want to split it over multiple files, group them logically like `MyContract.owner.t.sol`, `MyContract.deposits.t.sol`, etc.

#### No assertions in `setUp`

Never make assertions in the `setUp` function, instead use a dedicated test like `test_SetUpState()` if you need to ensure your `setUp` function does what you expected. More info on why in [foundry-rs/foundry#1291](https://github.com/foundry-rs/foundry/issues/1291)

#### Organizing and Naming tests

For unit tests, there are two major ways to organize the tests:

1.  Treat contracts as describe blocks:

    - `contract Add` holds all unit tests for the `add` method of `MyContract`.
    - `contract Supply` holds all tests for the `supply` method.
    - `contract Constructor` hold all tests for the constructor.
    - A benefit of this approach is that smaller contracts should compile faster than large ones, so this approach of many small contracts should save time as test suites get large.

2.  Have a Test contract per contract-under-test, with as many utilities and fixtures as you want:

    - `contract MyContractTest` holds all unit tests for `MyContract`.
    - `function test_add_AddsTwoNumbers()` lives within `MyContractTest` to test the `add` method.
    - `function test_supply_UsersCanSupplyTokens()` also lives within `MyContractTest` to test the `supply` method.
    - A benefit of this approach is that test output is grouped by contract-under-test, which makes it easier to quickly see where failures are.

3.  Some general guidance for all kinds tests:

    - Test contracts/functions should be written in the same order as the original functions in the contract-under-test.
    - All unit tests that test the same function should live serially in the test file.
    - Test contracts can inherit from any helper contracts you want. For example `contract MyContractTest` tests `MyContract`, but may inherit from forge-std's `Test`, as well as e.g. your own `TestUtilities` helper contract.

4.  Integration tests should live in the same `test` directory, with a clear naming convention. These may be in dedicated files, or they may live next to related unit tests in existing test files.

5.  Be consistent with test naming, as it's helpful for filtering tests (e.g. for gas reports you might want to filter out revert tests). When combining naming conventions, keep them alphabetical. Below is a sample of valid names. A comprehensive list of valid and invalid examples can be found [here](https://github.com/ScopeLift/scopelint/blob/1857e3940bfe92ac5a136827374f4b27ff083971/src/check/validators/test_names.rs#L106-L143).

    - `test_Description` for standard tests.
    - `testFuzz_Description` for fuzz tests.
    - `test_Revert[If|When]_Condition` for tests expecting a revert.
    - `testFork_Description` for tests that fork from a network.
    - `testForkFuzz_Revert[If|When]_Condition` for a fuzz test that forks and expects a revert.

6.  Name your constants and immutables using `ALL_CAPS_WITH_UNDERSCORES`, to make it easier to distinguish them from variables and functions.

7.  When using assertions like `assertEq`, consider leveraging the last string param to make it easier to identify failures. These can be kept brief, or even just be numbers&mdash;they basically serve as a replacement for showing line numbers of the revert, e.g. `assertEq(x, y, "1")` or `assertEq(x, y, "sum1")`. _(Note: [foundry-rs/foundry#2328](https://github.com/foundry-rs/foundry/issues/2328) tracks integrating this natively)._

8.  When testing events, prefer setting all `expectEmit` arguments to `true`, i.e. `vm.expectEmit(true, true, true, true)` or `vm.expectEmit()`. Benefits:

    - This ensures you test everything in your event.
    - If you add a topic (i.e. a new indexed parameter), it's now tested by default.
    - Even if you only have 1 topic, the extra `true` arguments don't hurt.

9.  Remember to write invariant tests! For the assertion string, use a verbose english description of the invariant: `assertEq(x + y, z, "Invariant violated: the sum of x and y must always equal z")`.

### Fork Tests

#### Use fork tests liberally

Don't feel like you need to give forks tests special treatment, and use them liberally:

- Mocks are _required_ in closed-source web2 development—you have to mock API responses because the code for that API isn't open source so you cannot just run it locally. But for blockchains that's not true: any code you're interacting with that's already deployed can be locally executed and even modified for free. So why introduce the risk of a wrong mock if you don't need to?
- A common reason to avoid fork tests and prefer mocks is that fork tests are slow. But this is not always true. By pinning to a block number, forge caches RPC responses so only the first run is slower, and subsequent runs are significantly faster. See [this benchmark](https://github.com/mds1/convex-shutdown-simulation/), where it took forge 7 minutes for the first run with a remote RPC, but only half a second once data was cached. [Alchemy](https://alchemy.com), [Infura](https://infura.io) and [Tenderly](https://tenderly.co) offer free archive data, so pinning to a block shouldn't be problematic.
- Note that the [foundry-toolchain](https://github.com/foundry-rs/foundry-toolchain) GitHub Action will cache RPC responses in CI by default, and it will also update the cache when you update your fork tests.

#### Minimize RPC requests

Be careful with fuzz tests on a fork to avoid burning through RPC requests with non-deterministic fuzzing. If the input to your fork fuzz test is some parameter which is used in an RPC call to fetch data (e.g. querying the token balance of an address), each run of a fuzz test uses at least 1 RPC request, so you'll quickly hit rate limits or usage limits. Solutions to consider:

- Replace multiple RPC calls with a single [multicall](https://github.com/mds1/multicall).
- Specify a fuzz/invariant [seed](/config/reference/testing#seed): this makes sure each `forge test` invocation uses the same fuzz inputs. RPC results are cached locally, so you'll only query the node the first time.
- In CI, consider setting the fuzz seed using a [computed environment variable](https://github.com/sablier-labs/v2-core/blob/d1157b49ed4bceeff0c4e437c9f723e88c134d3a/.github/workflows/ci.yml#L252-L254) so it changes every day or every week. This gives flexibility on the tradeoff between increasing randomness to find more bugs vs. using a seed to reduce RPC requests.
- Structure your tests so the data you are fuzzing over is computed locally by your contract, and not data that is used in an RPC call (may or may not be feasible based on what you're doing).
- Lastly, you can of course always run a local node or bump your RPC plan.

#### Configure fork urls in `foundry.toml` and use cheatcodes

1. When writing fork tests, do not use the `--fork-url` flag. Instead, prefer the following approach for its improved flexibility:

   - Define `[rpc_endpoints]` in the `foundry.toml` config file and use the [forking cheatcodes](/forge/tests/fork-testing#forking-cheatcodes).
   - Access the RPC URL endpoint in your test with forge-std's `stdChains.ChainName.rpcUrl`. See the list of supported chains and expected config file aliases [here](https://github.com/foundry-rs/forge-std/blob/ff4bf7db008d096ea5a657f2c20516182252a3ed/src/StdCheats.sol#L255-L271).
   - Always pin to a block so tests are deterministic and RPC responses are cached.
   - More info on this fork test approach can be found [here](https://twitter.com/msolomon44/status/1564742781129502722) (this predates `StdChains` so that aspect is a bit out of date).

### Test Harnesses

#### Internal Functions

To test `internal` functions, write a harness contract that inherits from the contract under test (CuT). Harness contracts that inherit from the CuT expose the `internal` functions as `external` ones.

Each `internal` function that is tested should be exposed via an external one with a name that follows the pattern `exposed_<function_name>`. For example:

```solidity
// file: src/MyContract.sol
contract MyContract {
  function myInternalMethod() internal returns (uint) {
    return 42;
  }
}

// file: test/MyContract.t.sol
import {MyContract} from "src/MyContract.sol";

contract MyContractHarness is MyContract {
  // Deploy this contract then call this method to test `myInternalMethod`.
  function exposed_myInternalMethod() external returns (uint) {
    return myInternalMethod();
  }
}
```

#### Private Functions

Unfortunately there is currently no good way to unit test `private` methods since they cannot be accessed by any other contracts. Options include:

- Converting `private` functions to `internal`.
- Copy/pasting the logic into your test contract and writing a script that runs in CI check to ensure both functions are identical.

#### Workaround Functions

Harnesses can also be used to expose functionality or information otherwise unavailable in the original smart contract. The most straightforward example is when we want to test the length of a public array. The functions should follow the pattern: `workaround_<function_name>`, such as `workaround_queueLength()`.

Another use case for this is tracking data that you would not track in production to help test invariants. For example, you might store a list of all token holders to simplify validation of the invariant "sum of all balances must equal total supply". These are often known as "ghost variables". You can learn more about this in [Rikard Hjort](https://twitter.com/rikardhjort)'s [Formal Methods for the Working DeFi Dev](https://youtu.be/ETlNhV9jYJw) talk.
