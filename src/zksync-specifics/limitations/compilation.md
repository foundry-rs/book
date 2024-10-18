## Compilation Limitations

These limitations apply to `zksolc` compilation of source contracts.

### Contract Bytecode Access

Contract bytecode [cannot](https://docs.zksync.io/build/developer-reference/ethereum-differences/evm-instructions#extcodecopy) be accessed on zkEVM architecture, therefore EXTCODECOPY always produces a compile-time error with zksolc. As such using `address(..).code` in a solidity contract will produce a compile-time error.

```solidity
contract FooBar {
    function number() return (uint8) {
        return 10;
    }
}

contract FooTest is Test {
    function testFoo() public {
        FooBar target = new FooBar();
        address(target).code;   // will fail at compile-time
    }
}
```

See [here](./general.md#accessing-contract-bytecode-and-hash) on how to circumvent this issue.

### Contract Size Limit

`zksolc` currently limits the number of instructions to 2^16 that are compiled for a contract. As such for large contracts, the compilation will fail with the error:

```bash
Error: assembly-to-bytecode conversion: assembly parse error Label DEFAULT_UNWIND was tried to be used
for either PC or constant at offset 65947 that is more than 65535 addressable space
```

#### Solution

There are three possible solutions to address this issue:

1. **Compilation with `--zk-force-evmla=true`:**

    You can attempt to compile the contract using ZKsync's EVM legacy architecture by adding the `--zk-force-evmla=true` flag. This can sometimes bypass the contract size limit by compiling in a different mode.

    Example command:
    ```bash
    forge build --zk-force-evmla=true --zksync
    ```

1. **Compilation with `--zk-fallback-oz=true`:**

    If the contract size still exceeds the limit, try compiling with optimization level `-Oz` by using the `--zk-fallback-oz=true` flag. This tells the compiler to fall back to `-Oz` optimization when the bytecode is too large, potentially reducing the contract size further.

    Example command:
    ```bash
    forge build --zk-fallback-oz=true --zksync
    ```

1. **Split the Contract into Smaller Units**

    If neither of the above flags resolves the issue, the contract must be refactored into smaller, modular contracts. This involves separating your logic into different contracts and using contract inheritance or external contract calls to maintain functionality.

    **Before (single large contract):**
    ```solidity
    contract LargeContract {
        function largeFunction1() public { /* complex logic */ }
        function largeFunction2() public { /* complex logic */ }
        // Additional large functions and state variables...
    }
    ```
    **After (multiple smaller contracts):**
    ```solidity
    contract ContractPart1 {
        function part1Function() public { /* logic from largeFunction1 */ }
    }
    contract ContractPart2 {
        function part2Function() public { /* logic from largeFunction2 */ }
    }
    contract MainContract is ContractPart1, ContractPart2 {
        // Logic to combine the functionalities of both parts
    }
    ```

### Non inlinable libraries

Compiling contracts without linking non-inlinable libraries is currently not supported. Libraries need to be deployed before building contracts using them. 

When building the contracts, the addresses need to be passed using the `libraries` config which contains a list of `CONTRACT_PATH`:`ADDRESS` mappings.

on `foundry.toml`:

```toml
libraries = [
    "src/MyLibrary.sol:MyLibrary:0xfD88CeE74f7D78697775aBDAE53f9Da1559728E4"
]
```

as a `cli` flag:

```bash
forge build --zksync --libraries src/MyLibrary.sol:MyLibrary:0xfD88CeE74f7D78697775aBDAE53f9Da1559728E4

```

For more information please refer to [official docs](https://docs.zksync.io/build/developer-reference/ethereum-differences/libraries).

#### Listing missing libraries

To scan missing non-inlinable libraries, you can build the project using the `--zk-detect-missing-libraries` flag. This will give a list of the libraries that need to be deployed and their addresses provided via the `libraries` option for the contracts to compile. Metadata about the libraries will be saved in `.zksolc-libraries-cache/missing_library_dependencies.json`.


