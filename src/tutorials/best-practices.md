# Best Practices

This guide documents the suggested best practices when developing with Foundry.
In general, it's recommended to handle as much as possible with [`forge fmt`](../reference/config/formatter.md), and anything this doesn't handle is below.

- [Best Practices](#best-practices)
  - [General Contract Guidance](#general-contract-guidance)
  - [Tests](#tests)
    - [General Test Guidance](#general-test-guidance)
    - [Fork Tests](#fork-tests)
    - [Test Harnesses](#test-harnesses)
      - [Internal Functions](#internal-functions)
      - [Private Functions](#private-functions)
      - [Workaround Functions](#workaround-functions)
    - [Best practices](#best-practices-1)
    - [Taint Analysis](#taint-analysis)
  - [Scripts](#scripts)
    - [Private Key Management](#private-key-management)
  - [Comments](#comments)
  - [Resources](#resources)

## General Contract Guidance

1. Always use named import syntax, don't import full files. This restricts what is being imported to just the named items, not everything in the file. Importing full files can result in solc complaining about duplicate definitions and slither erroring, especially as repos grow and have more dependencies with overlapping names.

   - Good: `import {MyContract} from "src/MyContract.sol"` to only import `MyContract`.
   - Bad: `import "src/MyContract.sol"` imports everything in `MyContract.sol`. (Importing `forge-std/Test` or `Script` can be an exception here, so you get the console library, etc).

1. Sort imports by `forge-std/` first, then dependencies, `test/`, `script/`, and finally `src/`. Within each, sort alphabetically by path (not by the explicit named items being imported). _(Note: This may be removed once [foundry-rs/foundry#3396](https://github.com/foundry-rs/foundry/issues/3396) is merged)._

1. Similarly, sort named imports. _(Note: This may be removed once [foundry-rs/foundry#3396](https://github.com/foundry-rs/foundry/issues/3396) is resolved)._

   - Good: `import {bar, foo} from "src/MyContract.sol"`
   - Bad: `import {foo, bar} from "src/MyContract.sol"`

1. Note the tradeoffs between absolute and relative paths for imports (where absolute paths are relative to the repo root, e.g. `"src/interfaces/IERC20.sol"`), and choose the best approach for your project:

   - Absolute paths make it easier to see where files are from and reduce churn when moving files around.
   - Relative paths make it more likely your editor can provide features like linting and autocomplete, since editors/extensions may not understand your remappings.

1. If copying a library from a dependency (instead of importing it), use the `ignore = []` option in the config file to avoid formatting that file. This makes diffing it against the original simpler for reviewers and auditors.

1. Similarly, feel free to use the `// forgefmt: disable-*` comment directives to ignore lines/sections of code that look better with manual formatting. Supported values for `*` are:

   - `disable-line`
   - `disable-next-line`
   - `disable-next-item`
   - `disable-start`
   - `disable-end`

Additional best practices from [samsczun](https://twitter.com/samczsun)'s [How Do You Even Write Secure Code Anyways](https://www.youtube.com/watch?v=Wm3t8Fuiy1E) talk:

- Use descriptive variable names.
- Limit the number of active variables.
- No redundant logic.
- Early exit as much as possible to reduce mental load when seeing the code.
- Related code should be placed near each other.
- Delete unused code.

## Tests

### General Test Guidance

1. For testing `MyContract.sol`, the test file should be `MyContract.t.sol`. For testing `MyScript.s.sol`, the test file should be `MyScript.t.sol`.

   - If the contract is big and you want to split it over multiple files, group them logically like `MyContract.owner.t.sol`, `MyContract.deposits.t.sol`, etc.

1. Never make assertions in the `setUp` function, instead use a dedicated test like `test_SetUpState()` if you need to ensure your `setUp` function does what you expected. More info on why in [foundry-rs/foundry#1291](https://github.com/foundry-rs/foundry/issues/1291)

1. For unit tests, there are two major ways to organize the tests:

   1. Treat contracts as describe blocks:

      - `contract Add` holds all unit tests for the `add` method of `MyContract`.
      - `contract Supply` holds all tests for the `supply` method.
      - `contract Constructor` hold all tests for the constructor.
      - A benefit of this approach is that smaller contracts should compile faster than large ones, so this approach of many small contracts should save time as test suites get large.

   2. Have a Test contract per contract-under-test, with as many utilities and fixtures as you want:
      - `contract MyContractTest` holds all unit tests for `MyContract`.
      - `function test_add_AddsTwoNumbers()` lives within `MyContractTest` to test the `add` method.
      - `function test_supply_UsersCanSupplyTokens()` also lives within `MyContractTest` to test the `supply` method.
      - A benefit of this approach is that test output is grouped by contract-under-test, which makes it easier to quickly see where failures are.

1. Some general guidance for all tests:

   - Test contracts/functions should be written in the same order as the original functions in the contract-under-test.
   - All unit tests that test the same function should live serially in the test file.
   - Test contracts can inherit from any helper contracts you want. For example `contract MyContractTest` tests `MyContract`, but may inherit from forge-std's `Test`, as well as e.g. your own `TestUtilities` helper contract.

1. Integration tests should live in the same `test` directory, with a clear naming convention. These may be in dedicated files, or they may live next to related unit tests in existing test files.

1. Be consistent with test naming, as it's helpful for filtering tests (e.g. for gas reports you might want to filter out revert tests). When combining naming conventions, keep them alphabetical. Below is a sample of valid names. A comprehensive list of valid and invalid examples can be found [here](https://github.com/ScopeLift/scopelint/blob/1857e3940bfe92ac5a136827374f4b27ff083971/src/check/validators/test_names.rs#L106-L143).

   - `test_Description` for standard tests.
   - `testFuzz_Description` for fuzz tests.
   - `test_Revert[If|When]_Condition` for tests expecting a revert.
   - `testFork_Description` for tests that fork from a network.
   - `testForkFuzz_Revert[If|When]_Condition` for a fuzz test that forks and expects a revert.

1. Name your constants and immutables using `ALL_CAPS_WITH_UNDERSCORES`, to make it easier to distinguish them from variables and functions.

1. When using assertions like `assertEq`, consider leveraging the last string param to make it easier to identify failures. These can be kept brief, or even just be numbers&mdash;they basically serve as a replacement for showing line numbers of the revert, e.g. `assertEq(x, y, "1")` or `assertEq(x, y, "sum1")`. _(Note: [foundry-rs/foundry#2328](https://github.com/foundry-rs/foundry/issues/2328) tracks integrating this natively)._

1. When testing events, prefer setting all `expectEmit` arguments to `true`, i.e. `vm.expectEmit(true, true, true, true)` or `vm.expectEmit()`. Benefits:

   - This ensures you test everything in your event.
   - If you add a topic (i.e. a new indexed parameter), it's now tested by default.
   - Even if you only have 1 topic, the extra `true` arguments don't hurt.

1. Remember to write invariant tests! For the assertion string, use a verbose english description of the invariant: `assertEq(x + y, z, "Invariant violated: the sum of x and y must always equal z")`. For more info on this, check out the [Invariant Testing](../forge/invariant-testing) tutorial.

### Fork Tests

1. Don't feel like you need to give forks tests special treatment, and use them liberally:

   - Mocks are _required_ in closed-source web2 development—you have to mock API responses because the code for that API isn't open source so you cannot just run it locally. But for blockchains that's not true: any code you're interacting with that's already deployed can be locally executed and even modified for free. So why introduce the risk of a wrong mock if you don't need to?
   - A common reason to avoid fork tests and prefer mocks is that fork tests are slow. But this is not always true. By pinning to a block number, forge caches RPC responses so only the first run is slower, and subsequent runs are significantly faster. See [this benchmark](https://github.com/mds1/convex-shutdown-simulation/), where it took forge 7 minutes for the first run with a remote RPC, but only half a second once data was cached. [Alchemy](https://alchemy.com), [Infura](https://infura.io) and [Tenderly](https://tenderly.co) offer free archive data, so pinning to a block shouldn't be problematic.
   - Note that the [foundry-toolchain](https://github.com/foundry-rs/foundry-toolchain) GitHub Action will cache RPC responses in CI by default, and it will also update the cache when you update your fork tests.

1. Be careful with fuzz tests on a fork to avoid burning through RPC requests with non-deterministic fuzzing. If the input to your fork fuzz test is some parameter which is used in an RPC call to fetch data (e.g. querying the token balance of an address), each run of a fuzz test uses at least 1 RPC request, so you'll quickly hit rate limits or usage limits. Solutions to consider:

   - Replace multiple RPC calls with a single [multicall](https://github.com/mds1/multicall).
   - Specify a fuzz/invariant [seed](/src/reference/config/testing.md#seed): this makes sure each `forge test` invocation uses the same fuzz inputs. RPC results are cached locally, so you'll only query the node the first time.
   - In CI, consider setting the fuzz seed using a [computed environment variable](https://github.com/sablier-labs/v2-core/blob/d1157b49ed4bceeff0c4e437c9f723e88c134d3a/.github/workflows/ci.yml#L252-L254) so it changes every day or every week. This gives flexibility on the tradeoff between increasing randomness to find more bugs vs. using a seed to reduce RPC requests.
   - Structure your tests so the data you are fuzzing over is computed locally by your contract, and not data that is used in an RPC call (may or may not be feasible based on what you're doing).
   - Lastly, you can of course always run a local node or bump your RPC plan.

1. When writing fork tests, do not use the `--fork-url` flag. Instead, prefer the following approach for its improved flexibility:

   - Define `[rpc_endpoints]` in the `foundry.toml` config file and use the [forking cheatcodes](../forge/fork-testing.md#forking-cheatcodes).
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

### Best practices

Thanks to [@samsczun](https://twitter.com/samczsun)'s [How Do You Even Write Secure Code Anyways](https://www.youtube.com/watch?v=Wm3t8Fuiy1E) talk for the tips in this section and the following section.

- Don't optimize for coverage, optimize for well thought-out tests.
- Write positive and negative unit tests.
  - Write _positive_ unit tests for things that the code should handle. Validate _all_ state that changes from these tests.
  - Write _negative_ unit tests for things that the code should _not_ handle. It's helpful to follow up (as an adjacent test) with the positive test and make the change that it needs to pass.
  - Each code path should have its own unit test.
- Write integration tests to test entire features.
- Write fork tests to verify the correct behavior with existing deployed contract.

### Taint Analysis

When testing, you should prioritize functions that an attacker can affect, that means functions that accept some kind of user input. These are called _sources_.

Consider that input data as _tainted_ until it has been checked by the code, at which point it's considered _clean_.

A _sink_ is a part of the code where some important operation is happening. For example, in MakerDAO that would be `vat.sol`.

You should _ensure_ that no _tainted_ data ever reaches a _sink_. That means that all data that find themselves in the sink, should, at some point, have been checked by you. So, you need to define what the data _should_ be and then make sure your checks _ensure_ that the data will be how you expect it to be.

## Scripts

1. Stick with `run` as the default function name for clarity.

1. Any methods that are not intended to be called directly in the script should be `internal` or `private`. Generally the only public method should be `run`, as it's easier to read/understand when each script file just does one thing.

1. Consider prefixing scripts with a number based on the order they're intended to be run over the protocol's lifecycle. For example, `01_Deploy.s.sol`, `02_TransferOwnership.s.sol`. This makes things more self-documenting. This may not always apply depending on your project.

1. Test your scripts.

   - Unit test them like you would test normal contracts, by writing tests that assert on the state changes made from running the script.
   - Write your deploy script and scaffold tests by running that script. Then, run all tests against the state resulting from your production deployment script. This is a great way to gain confidence in a deploy script.
   - Within your script itself, use `require` statements (or the `if (condition) revert()` pattern if you prefer) to stop execution of your script if something is wrong. For example, `require(computedAddress == deployedAddress, "address mismatch")`. Using the `assertEq` helpers instead will not stop execution.

1. **Carefully audit which transactions are broadcast**. Transactions not broadcast are still executed in the context of a test, so missing broadcasts or extra broadcasts are easy sources of error in the previous step.

1. **Watch out for frontrunning**. Forge simulates your script, generates transaction data from the simulation results, then broadcasts the transactions. Make sure your script is robust against chain-state changing between the simulation and broadcast. A sample script vulnerable to this is below:

```solidity
// Pseudo-code, may not compile.
contract VulnerableScript is Script {
   function run() public {
      vm.startBroadcast();

      // Transaction 1: Deploy a new Gnosis Safe with CREATE.
      // Because we're using CREATE instead of CREATE2, the address of the new
      // Safe is a function of the nonce of the gnosisSafeProxyFactory.
      address mySafe = gnosisSafeProxyFactory.createProxy(singleton, data);

      // Transaction 2: Send tokens to the new Safe.
      // We know the address of mySafe is a function of the nonce of the
      // gnosisSafeProxyFactory. If someone else deploys a Gnosis Safe between
      // the simulation and broadcast, the address of mySafe will be different,
      // and this script will send 1000 DAI to the other person's Safe. In this
      // case, we can protect ourselves from this by using CREATE2 instead of
      // CREATE, but every situation may have different solutions.
      dai.transfer(mySafe, 1000e18);

      vm.stopBroadcast();
   }
}
```

1. For scripts that read from JSON input files, put the input files in `script/input/<chainID>/<description>.json`. Then have `run(string memory input)` (or take multiple string inputs if you need to read from multiple files) as the script's signature, and use the below method to read the JSON file.

```solidity
function readInput(string memory input) internal returns (string memory) {
  string memory inputDir = string.concat(vm.projectRoot(), "/script/input/");
  string memory chainDir = string.concat(vm.toString(block.chainid), "/");
  string memory file = string.concat(input, ".json");
  return vm.readFile(string.concat(inputDir, chainDir, file));
}
```

### Private Key Management

Script execution requires a private key to send transactions. This key controls all funds in the account, so it must be protected carefully. There are a few options for securely broadcasting transactions through a script:

1. **Use a hardware wallet.** Hardware wallets such as Ledger and Trezor store seed phrases in a secure enclave. Forge can send a raw transaction to the wallet, and the wallet will sign the transaction. The signed transaction is returned to forge and broadcaster. This way, private keys never leave the hardware wallet, making this a very secure approach. To use a hardware wallet with scripts, see the `--ledger` and `--trezor` [flags](../reference/forge/forge-script.md).

2. **Use a private key directly.** With this approach you expose a private key on your machine, making it riskier than the above option. Therefore the suggested way to directly use a private key is to generate a new wallet for executing the script, and only send that wallet enough funds to run the script. Then, stop using the key after the script is complete. This way, if the key is compromised, only the funds on this throwaway key are lost, as opposed to losing everything in your wallet.

   1. With this approach, it's very important that your scripts or contracts don't rely on `msg.sender` since the sender will not be an account that's meant to be used again. For example, if a deploy script configures a contract owner, ensure the owner a constructor argument and not set to `msg.sender`.
   2. To use this approach, you can either store the private key in an environment variable and use cheat codes to read it in, or use the `--private-key` flag to directly provide the key.

3. **Use a keystore.** This can be thought of as a middle ground between the above two approaches. With [`cast wallet import`](../reference/cast/cast-wallet-import.md) you import a private key and encrypt it with a password. This still temporarily exposes your private key on your machine, but it becomes encrypted and you'll provide the password to decrypt it to run a script.

Additional security precautions when using scripts:

1. Use a separate wallet for testing and development, instead of using your main wallet with real funds. Diversifying minimizes the risk of losing funds if your development wallet is compromised.
2. If you accidentally push a private key or seed phrase to GitHub, or expose it online via other means—even momentarily—treat it as compromised. Act immediately to transfer your funds to a safer destination.
3. When in doubt about whether a wallet contains real funds or not, assume it does. Always be certain about a wallet's balances and status when using it for development purposes. Use [blockscan](https://blockscan.com/) to easily check many chains to see where the address has been used.
4. Remember that adding an account in wallets like Metamask generates a new private key. However, that private key is derived from the same mnemonic as the other accounts generated in that wallet. Therefore, never expose the mnemonic as it may compromise all of your accounts.

*This was section was inspired by [The Pledge](https://github.com/smartcontractkit/full-blockchain-solidity-course-js/discussions/5) from [Patrick Collins](https://twitter.com/PatrickAlphaC).*

## Comments

1. For public or external methods and variables, use [NatSpec](https://docs.soliditylang.org/en/latest/natspec-format.html) comments.

   - `forge doc` will parse these to autogenerate documentation.
   - Etherscan will display them in the contract UI.

1. For simple NatSpec comments, consider just documenting params in the docstring, such as `` /// @notice Returns the sum of `x` and `y`. ``, instead of using `@param` tags.

1. For complex NatSpec comments, consider using a tool like [PlantUML](https://plantuml.com/ascii-art) to generate ASCII art diagrams to help explain complex aspects of the codebase.

1. Any markdown in your comments will carry over properly when generating docs with `forge doc`, so structure comments with markdown when useful.

   - Good: `` /// @notice Returns the sum of `x` and `y`. ``
   - Bad: `/// @notice Returns the sum of x and y.`

## Resources

Write more secure code and better tests:

- [transmissions11/solcurity](https://github.com/transmissions11/solcurity)
- [nascentxyz/simple-security-toolkit](https://github.com/nascentxyz/simple-security-toolkit)

Foundry in Action:

- [awesome-foundry](https://github.com/crisgarner/awesome-foundry): A curated list of awesome of the Foundry development framework.
- [Nomad Monorepo](https://github.com/nomad-xyz/monorepo): All the `contracts-*` packages. Good example of using many Foundry features including fuzzing, `ffi` and various cheatcodes.
- [Sablier V2 Core](https://github.com/sablier-labs/v2-core): Another good example of many Foundry features. Also a pioneer of the state tree testing approach, see the `*.tree` files.
- [Uniswap Periphery](https://github.com/gakonst/v3-periphery-foundry): Good example of using inheritance to isolate test fixtures.
- [PRBMath](https://github.com/PaulRBerg/prb-math): A library for fixed-point arithmetic in Solidity, with many parameterized tests that harness Foundry.
