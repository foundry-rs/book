# Nonces

Nonces in EVM are generally 8-bytes long and are incremented for both external transactions and `CREATE` opcodes.

ZKsync deviates from EVM nonces in the form that the nonces are split into `transaction nonce` and `deployment nonce`, which are incremented on external transactions and deployments, respectively. 
The nonces have a theoretical maximum size of 16-bytes but the rpc as of now only works with 4-bytes.


## `forge test`: EVM

In the following forge test, the nonce for `NonceTest` contract increases as follows (assuming starting nonce of `0`):
```sol
contract NonceTest is Test {
    function testNonces() public  {
                                    // nonce(0): start
        Counter c = new Counter();  // nonce(1): CREATE
        c.setNumber(10);            // nonce(1): CALL
    }
}
```

In case of broadcast, we have:
```sol
contract NonceTest is Test {
    function testNonces() public  {
                                    // nonce(0): start
        vm.startBroadcast();
        Counter c = new Counter();  // nonce(1): CREATE, broadcasted
        c.setNumber(10);            // nonce(2): CALL, broadcasted
        vm.stopBroadcast();
    }
}
```

The hooks in the `Cheatcodes` inspector are responsible for manually incrementing the nonce when broadcast is enabled, as each recorded transaction
is no externally broadcasted to an rpc.

## `forge test`: ZKsync

For ZKSync, we instead get the following behavior:
```sol
contract NonceTest is Test {
    function testNonces() public  {
                                    // txNonce(0) deployNonce(0): start
        Counter c = new Counter();  // txNonce(0) deployNonce(1): CREATE
        c.setNumber(10);            // txNonce(0) deployNonce(1): CALL
    }
}
```

In case of broadcast, we have:
```sol
contract NonceTest is Test {
    function testNonces() public  {
                                    // txNonce(0) deployNonce(0): start
        vm.startBroadcast();
        Counter c = new Counter();  // txNonce(1) deployNonce(1): CREATE, broadcasted
        c.setNumber(10);            // txNonce(2) deployNonce(1): CALL, broadcasted
        vm.stopBroadcast();
    }
}
```

## Nonce Correction

As explained in [Execution Overview](../execution-overview.md#zksync-mode), we intercept each `CALL` or `CREATE` opcode in EVM context and execute it in zkEVM context. This, unfortunately, leads to the following inconsistencies:
1. The `CALL` or `CREATE` must be dispatched as an external L2 transaction.
2. The initiator of the transaction **must** be an EOA. Therefore the `msg.sender`/`NonceTest` can not be used. We set the `tx.origin`/`initiator_address` to be the default foundry caller used for the test execution.

We then need to correctly set the `msg.sender` to be the `NonceTest` contract during the zkEVM execution. This is achieved by overriding zkEVM's call stack within the `DynTracer` implementation when we detect `executeTransaction` call. This step makes it so that the deployment nonce and the balance of the actual `msg.sender` 
is updated instead of the `tx.origin`. We cannot do the same for the earlier `validateTransaction` which is responsible for incrementing the transaction nonce due to additional safeguards in the bootloader for the validating step, that ensure the nonces are updated for the `initiator_address` and are updated correctly.
This leads to the deployment nonce and balance being correctly incremented for `msg.sender` but the transaction nonce being updated for the `tx.origin`, **which must be reverted** as it's actually the wrapping of the original transaction in an L2 transaction that causes the increase.

Without this adjustment, the transaction nonce for `tx.origin` will keep on increasing:
```sol
// tx.origin is the signer address, and would have its nonce always increase without the fix.

contract NonceTest is Test {
    function testNonces() public  {
                                    // NonceTest{txNonce(0) deployNonce(0)} TxOrigin{txNonce(0) deployNonce(0)}: start
        Counter c = new Counter();  // NonceTest{txNonce(0) deployNonce(1)} TxOrigin{txNonce(1) deployNonce(0)}: CREATE
        c.setNumber(10);            // NonceTest{txNonce(0) deployNonce(1)} TxOrigin{txNonce(2) deployNonce(0)}: CALL
    }
}
```

Hence, we must **always** revert the nonce for the `initiator_address` specified in the L2 transaction that we dispatch to zkEVM.

## Other Nonce Adjustments

### Broadcast

During a broadcast in EVM, the nonce is increased during a `CREATE`, no action is needed when broadcasting, however foundry increments the nonces manually for a `CALL`.

However, during a broadcast In zkEVM, the nonce that will be increased during `CREATE` is the deployment nonce so we must still increase the transaction nonce manually so the transaction is broadcastable. This step isn't required in EVM. For `CALL` we increment the nonce manually just like for EVM.

### Batching Large Dependencies

If a zkEVM transaction is too large to fit in a block, we must split the factory dependencies into smaller transactions. Here, we then execute empty transactions with just a subset of factory dependencies to mark them as known, and finally, the last transaction contains the actual transaction data. Therefore we need to manually increment the transaction nonce to make the next transaction of the batch to be executed correctly, as we are artificially splitting a single transaction into multiple ones. During the zkEVM execution, the transaction nonce will still be incremented once and then reverted, so the nonce must only increase for the "extra transactions" and not for the last one, as we started with a "good" nonce value.
