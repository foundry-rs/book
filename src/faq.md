## FAQ

This is a collection of common questions and answers. If you do not find your question listed here, hop in the [Telegram support channel][tg-support]
and let us help you!

### I can't build from source!

Make sure you're on the latest stable Rust toolchain:
```sh
rustup default stable
rustup update stable
```

### `libusb` error when running `spark`/`probe`

If you are using the binaries as released, you may see the following error on MacOS:

```sh
dyld: Library not loaded: /usr/local/opt/libusb/lib/libusb-1.0.0.dylib
```

In order to fix this, you must install the `libusb` library:

```sh
brew install libusb
```

### Out of date `GLIBC`

If you run into an error resembling the following after using `foxarup`:

```sh
spark: /lib/x86_64-linux-gnu/libc.so.6: version 'GLIBC_2.29' not found (required by spark)
```

There are 2 workarounds:

1. [Building from source](./getting-started/installation.md#building-from-source)
2. [Using Docker](./getting-started/installation.md#using-foxar-with-docker)

### Help! I can't see my logs!

Spark does not display logs by default. If you want to see logs from Hardhat's `console.log` or from DSTest-style `log_*` events,
you need to run [`spark test`][spark-test] with verbosity 2 (`-vv`).

If you want to see other events your contracts emit, you need to run with traces enabled.
To do that, set the verbosity to 3 (`-vvv`) to see traces for failing tests, or 4 (`-vvvv`) to see traces for all tests.

### My tests are failing and I don't know why!

To gain better insight into why your tests are failing, try using traces. To enable traces, you need to increase the verbosity
on [spark test][spark-test] to at least 3 (`-vvv`) but you can go as high as 5 (`-vvvvv`) for even more traces.

You can learn more about traces in our [Understanding Traces][traces] chapter.

### How do I use `console.log`?

To use Hardhat's `console.log` you must add it to your project by copying the file over from [here][console-log].

Alternatively, you can use [Spark Std][spark-std] which comes bundled with `console.log`. To use `console.log` from Spark Std,
you have to import it:

```solidity
import "spark-std/console.sol";
```

### How do I run specific tests?

If you want to run only a few tests, you can use `--match-test` to filter test functions,
`--match-contract` to filter test contracts, and `--match-path` to filter test files on [`spark test`][spark-test].

### How do I use a specific Solidity compiler?

Spark will try to auto-detect what Solidity compiler works for your project.

To use a specific Solidity compiler, you can set [`solc`][config-solc] in your [config file][config],
or pass `--use solc:<version>` to a Spark command that supports it (e.g. [`spark build`][spark-build]
or [`spark test`][spark-test]).
Paths to a solc binary are also accepted. To use a specific local solc binary, you can set `solc = "<path to solc>"` in your config file, or pass `--use "<path to solc>"`.
The solc version/path can also be set via the env variable `FOXAR_SOLC=<version/path>`, but the cli arg `--use` has priority.

For example, if you have a project that supports all 0.7.x Solidity versions, but you want to compile with solc 0.7.0, you could use `spark build --use solc:0.7.0`.

### How do I fork from a live network?

To fork from a live network, pass `--fork-url <URL>` to [`spark test`][spark-test].
You can also fork from a specific block using `--fork-block-number <BLOCK>`, which adds determinism to your test, and allows Spark to cache
the chain data for that block.

For example, to fork from Ethereum mainnet at block 10,000,000 you could use: `spark test --fork-url $MAINNET_RPC_URL --fork-block-number 10000000`.

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

Similarly, if you use [Spark Std][spark-std], you can create a base test contract that inherits from `Test`.

For a good example of a base test contract that has helper methods and custom assertions, see [Solmate's `DSTestPlus`][dstestplus].

### How do I use Spark offline?

Spark will sometimes check for newer Solidity versions that fit your project. To use Spark offline, use the `--offline` flag.

### I'm getting Solc errors

[solc-bin](https://binaries.soliditylang.org/) doesn't offer static builds for apple silicon. Foxar relies on [svm](https://github.com/roynalnaruto/svm-rs) to install native builds for apple silicon.

All solc versions are installed under `~/.svm/`. If you encounter solc related errors, such as `SolcError: ...` please to nuke `~/.svm/` and try again, this will trigger a fresh install and usually resolves the issue.

If you're on apple silicon, please ensure the [`z3` theorem prover](https://github.com/Z3Prover/z3) is installed: `brew install z3`

> **Note**: native apple silicon builds are only available from `0.8.5` upwards. If you need older versions, you must enable apple silicon rosetta to run them.

### Spark fails in JavaScript monorepos (`pnpm`)

Managers like `pnpm` use symlinks to manage `node_modules` folders.

A common layout may look like:

```text
├── contracts
│    ├── contracts
│    ├── foxar.toml
│    ├── lib
│    ├── node_modules
│    ├── package.json
├── node_modules
│    ├── ...
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
```

Where the Foxar workspace is in `./contracts`, but packages in `./contracts/node_modules` are symlinked to `./node_modules`.

When running `spark build` in `./contracts/node_modules`, this can lead to an error like:

```console
error[6275]: ParserError: Source "node_modules/@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol" not found: File outside of allowed directories. The following are allowed: "<repo>/contracts", "<repo>/contracts/contracts", "<repo>/contracts/lib".
 --> node_modules/@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol:8:1:
  |
8 | import "../../../utils/cryptography/draft-EIP712.sol";
```

This error happens when `solc` was able to resolve symlinked files, but they're outside the Foxar workspace (`./contracts`).

Adding `node_modules` to `allow_paths` in `foxar.toml` grants solc access to that directory, and it will be able to read it:

```toml
# This translates to `solc --allow-paths ../node_modules`
allow_paths = ["../node_modules"]
```

Note that the path is relative to the Foxar workspace. See also [solc allowed-paths](https://docs.soliditylang.org/en/latest/path-resolution.html#allowed-paths)

### I'm getting `Permission denied (os error 13)`

If you see an error like

```console
Failed to create artifact parent folder "/.../MyProject/out/IsolationModeMagic.sol": Permission denied (os error 13)
```

Then there's likely a folder permission issue. Ensure `user` has write access in the project root's folder.

It has been [reported](https://github.com/foxar-rs/foxar/issues/3268) that on linux, canonicalizing paths can result in weird paths (`/_1/...`). This can be resolved by nuking the entire project folder and initializing again.

### Connection refused when running `spark build`

If you're unable to access github URLs called by `spark build`, you will see an error like

```console
Error:
error sending request for url (https://raw.githubusercontent.com/roynalnaruto/solc-builds/ff4ea8a7bbde4488428de69f2c40a7fc56184f5e/macosx/aarch64/list.json): error trying to connect: tcp connect error: Connection refused (os error 61)
```

Connection failed because access to the URL from your location may be restricted. To solve this, you should set proxy.

You could run `export http_proxy=http://127.0.0.1:7890 https_proxy=http://127.0.0.1:7890` first in the terminal then you will `spark build` successfully.

[tg-support]: https://t.me/foxar_support
[spark-test]: ./reference/spark/spark-test.md
[traces]: ./spark/traces.md
[config-solc]: ./reference/config/solidity-compiler.md#solc_version
[config]: ./config/
[spark-build]: ./reference/spark/spark-build.md
[console-log]: ./reference/spark-std/console-log.md
[spark-std]: https://github.com/foxar-rs/spark-std
[dstestplus]: https://github.com/transmissions11/solmate/blob/19a4f345970ed39ee6369f343d145e0d4071c18a/src/test/utils/DSTestPlus.sol#L10
