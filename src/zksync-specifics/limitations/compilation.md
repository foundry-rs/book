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

As an attempt the same contract can be compiled with `--zk-force-evmla=true`, but if it doesn't help then the contract must be split into smaller units.