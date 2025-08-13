---
description: Broadcasting and transaction limitations in ZKsync network.
---

## Broadcast Limitations

These limitations apply when using `cast` to broadcast transactions.

### No Batch Support

Batching is currently not supported on ZKsync networks, so any batched transactions may not be executed in order. This can often lead to failures, as in the following case:

```solidity
contract Calculator {
    function add(uint8 a, uint8 b) return (uint8) {
        return a+b;
    }
}

contract FooScript is Script {
    function run() public {
        vm.startBroadcast();
        Calculator calc = new Calculator();     // tx1
        uint8 sum = calc.add(1, 2);             // tx2
        vm.assertEqual(3, sum);
        vm.stopBroadcast();
    }
}
```

```bash
forge script script/FooTest.s.sol:FooScript ... --zksync --rpc-url https://sepolia.era.zksync.dev --broadcast 
```

Here the recorded transactions `tx1` and `tx2` would be batched as a single transaction with appropriate nonces. However, upon broadcasting to a ZKsync network, `tx2` may be executed before `tx1`, which would cause a revert.

To circumvent this, the `--slow` flag may be used to sequentially send the transactions to the RPC endpoint, which keeps them in order.

```bash
forge script script/FooTest.s.sol:FooScript ... --zksync --rpc-url https://sepolia.era.zksync.dev --broadcast --slow
```