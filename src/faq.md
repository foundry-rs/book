## FAQ

This is a collection of common questions and answers. If you do not find your question listed here, hop in the [Telegram support channel][tg-support]
and let us help you!

### Help! I can't see my logs

Forge does not display logs by default. If you want to see logs from Hardhat's `console.log` or from DSTest-style `log_*` events,
you need to run [`forge test`][forge-test] with verbosity 2 (`-vv`).

If you want to see other events your contracts emit, you need to run with traces enabled.
To do that, set the verbosity to 3 (`-vvv`) to see traces for failing tests, or 4 (`-vvvv`) to see traces for all tests.

### My tests are failing and I don't know why

To gain better insight into why your tests are failing, try using traces. To enable traces, you need to increase the verbosity
on [forge test][forge-test] to at least 3 (`-vvv`) but you can go as high as 5 (`-vvvvv`) for even more traces.

You can learn more about traces in our [Understanding Traces][traces] chapter.

### How do I use `console.log`?

To use Hardhat's `console.log` you must add it to your project by copying the file over from [here][console-log].

Alternatively, you can use [Forge Std][forge-std] which comes bundled with `console.log`. To use `console.log` from Forge Std,
you have to import it:

```solidity
import "forge-std/console.sol";
```

### How do I run specific tests?

If you want to run only a few tests, you can use `--match-test` to filter test functions,
`--match-contract` to filter test contracts, and `--match-path` to filter test files on [`forge test`][forge-test].

### How do I use a specific Solidity compiler?

Forge will try to auto-detect what Solidity compiler works for your project.

To use a specific Solidity compiler, you can set [`solc`][config-solc] in your [config file][config],
or pass `--use solc:<version>` to a Forge command that supports it (e.g. [`forge build`][forge-build]
or [`forge test`][forge-test]).
Paths to a solc binary are also accepted. To use a specific local solc binary, you can set `solc = "<path to solc>"` in your config file, or pass `--use "<path to solc>"`.
The solc version/path can also be set via the env variable `FOUNDRY_SOLC=<version/path>`, but the cli arg `--use` has priority.

For example, if you have a project that supports all 0.7.x Solidity versions, but you want to compile with solc 0.7.0, you could use `forge build --use solc:0.7.0`.

### How do I fork from a live network?

To fork from a live network, pass `--fork-url <URL>` to [`forge test`][forge-test].
You can also fork from a specific block using `--fork-block-number <BLOCK>`, which adds determinism to your test, and allows Forge to cache
the chain data for that block.

For example, to fork from Ethereum mainnet at block 10,000,000 you could use: `forge test --fork-url $MAINNET_RPC_URL --fork-block-number 10000000`.

### How do I add my own assertions?

You can add your own assertions by creating your own base test contract and having that inherit from the test framework of your choice.

For example, if you use DSTest, you could create a base test contract like this:

```solidity
contract TestBase is DSTest {
    function myCustomAssertion(uint a, uint b) {
      if (a != b) {
          emit log_string("a and b did not match");
          fail();
      }
    }
}
```

You would then inherit from `TestBase` in your test contracts.

```solidity
contract MyContractTest is TestBase {
    function testSomething() {
        // ...
    }
}
```

Similarly, if you use [Forge Std][forge-std], you can create a base test contract that inherits from `Test`.

For a good example of a base test contract that has helper methods and custom assertions, see [Solmate's `DSTestPlus`][dstestplus].

### How do I use Forge offline?

Forge will sometimes check for newer Solidity versions that fit your project. To use Forge offline, use the `--offline` flag.

[tg-support]: https://t.me/foundry_support
[forge-test]: ./reference/forge/forge-test.md
[traces]: ./forge/traces.md
[config-solc]: ./reference/config.md#solc_version
[config]: ./config/
[forge-build]: ./reference/forge/forge-build.md
[console-log]: ./reference/forge-std/console-log.md
[forge-std]: https://github.com/foundry-rs/forge-std
[dstestplus]: https://github.com/transmissions11/solmate/blob/19a4f345970ed39ee6369f343d145e0d4071c18a/src/test/utils/DSTestPlus.sol#L10
