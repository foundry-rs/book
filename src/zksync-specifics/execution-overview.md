## Execution Overview

A forge test begins its execution on the EVM, hence the need to compile `solc` artifacts (see: [solc](https://github.com/matter-labs/era-solidity)).
During test execution, the test can switch over to ZKsync context in multiple ways.

The following operations are performed during the switchover:

1. All `persisted_accounts` storages are migrated to ZKsync storage.
2. Any EVM bytecode deployed under the migrated account is replaced by its `zksolc` variant.
3. Solidity globals such as `block.number` and `address.balance` on the test level (which executes in EVM context) return ZKsync values.
4. The original EVM context (block environment) is preserved for a switch back from the ZKsync context. <!-- TODO: change "for a"  "FOR THE" -->


### Switching to ZKsync

Switching over to ZKsync context can be achieved in the following ways:

#### CLI Flags
In general, the shorthand `--zksync` flag compiles the sources for `zksolc` and does the switchover to ZKsync context on test execution. The flag is a shorthand alias for enabling the following flags:

* `--zk-startup` - performs ZKsync switchover on test startup
* `--zk-compile` - compiles the sources for `zksolc`

#### Forking
If during test execution, forking cheatcodes such as `vm.selectFork` or `vm.createSelectFork` are used to fork over to a ZKsync network, the execution switches to ZKsync context. The RPC endpoint is tested for the `zks_L1ChainId` method; if it exists, the RPC URL is deemed to be a ZKsync-compatible endpoint.

Similarly, if the selected fork URL is not a ZKsync endpoint, the test execution is set to EVM context.

#### Cheatcode Override
A custom cheatcode `vm.zkVm` is provided to switch the test execution to ZKsync mode manually. Passing a value of `true` enables ZKsync mode, whereas `false` switches it back to EVM mode.

> ℹ️ **Note**
>
> Using `--zksync` is equivalent to having `vm.zkVm(true)` as the first statement in a test.

### ZKSync mode
When a test is running in ZKsync mode, any `CREATE` or `CALL` instructions encountered within the test's scope (which runs on EVM) are intercepted and simulated in zkEVM. For example, in the following scenario:


```solidity
contract MyContract {
    function getNumber() public returns (uint256) {
        return 42;
    }
}

contract FooTest is Test {
    function testExecutionOverview() public {
        vm.roll(10);                                // EVM
        vm.assertEq(10, block.number);              // EVM
        MyContract testContract = new MyContract(); // zkEVM
        uint256 number = testContract.getNumber();  // zkEVM
        vm.assertEq(42, number);                    // EVM
    }
}
```

When `testExecutionOverview()` is run with `--zksync`, it is initially run in Foundry's EVM context. However, due to the presence of the `--zksync` flag, the storage switchover to the ZKsync context is performed immediately upon its execution.

The cheatcode `vm.roll(10)` is then intercepted within EVM, as are all cheatcodes, but the operation is applied on ZKsync storage. Similarly, the statement `block.number` also returns the ZKsync storage value.

Once we encounter `new BlockEnv()`, which is a `CREATE` operation, we intercept this within the EVM and execute it on the zkEVM instead, returning the result. Similarly, `blockEnv.getBlockNumber()`, also a `CALL` operation, is executed on the zkEVM, and the result (here: `42`) is stored in the variable.

It is worth noting that any nested instructions from the above calls will always be executed within the zkEVM since the parent `CREATE` or `CALL` was dispatched to the zkEVM.

> ℹ️ **Note**
>
> Only `CREATE` and `CALL` operations are executed on the zkEVM from the test scope. However, once they are dispatched to zkEVM, any internal code will always be executed in zkEVM, where we do not support cheatcodes. There can not be references to `vm` within the code executed in zkEVM. This is undefined behavior.
