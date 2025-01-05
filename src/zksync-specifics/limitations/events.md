## Emitted Events

zkEVM, in addition to user events, emits its [own system events](https://github.com/search?q=repo%3Amatter-labs%2Fera-contracts+%2Fevent+%5BA-Za-z%5D%2B%5C%28%2F&type=code), like `Transfer`, `Withdraw`, `ContractCreated`, etc. These events are not printed as part of traces, as currently, it's not trivial to match emitted events with zkEVM traces.

These system events can be observed via setting the `RUST_LOG` env variable:
```bash
RUST_LOG=foundry_zksync_core::vm::inspect=info,era_test_node::formatter=info forge test --zksync
```

```ignore
==== 2 events
EthToken System Contract                  
  Topics:
    0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef
    0x0000000000000000000000001804c8ab1f12e6bbf3894d4083f33e07309d1f38
    0x0000000000000000000000000000000000000000000000000000000000008001
  Data (Hex): 0x00000000000000000000000000000000000000000000000003dfd24000000000

  ...
```

### Issues with `expectEmit`
This can often come as a surprise to users who have the following test structure in place:

```solidity
contract Number {
    uint256 accesses;
    function one() public returns (uint8) {
        accesses++;
        return 1;
    }
    function two() public returns (uint8) {
        accesses++;
        return 2;
    }
    function three() public returns (uint8) {
        accesses++;
        return 3;
    }
}

contract Calculator {
    event Added(uint8 indexed sum);
    function add(uint8 a, uint8 b) public returns (uint8) {
        uint8 sum = a + b;
        emit Added(sum);
        return sum;
    }
}

contract FooTest is Test {
    event Added(uint8 indexed sum);
    
    function testFoo() public {
        Number num = new Number();

        // We emit the event we expect to see.
        vm.expectEmit();
        emit Added(num.three());    // num.three() will emit zkEVM events

        Calculator calc = new Calculator();
        calc.add(num.one(), num.two());
    }
}
```

This test would currently fail as the non-static call to `num.three()` when setting up `vm.expectEmit()`.

If run with `RUST_LOG` enabled as specified above, the following output will be observed:

```ignore
┌──────────────────────────┐
│   VM EXECUTION RESULTS   │
└──────────────────────────┘
Cycles Used:          6703
Computation Gas Used: 106816
Contracts Used:       26
════════════════════════════
=== Console Logs: 
=== Calls: 
Call(Normal) Account Code Storage                                         4de2e468    4227857424
  Call(Normal) System context                                               02fa5779    4227853014
    ...
  Call(Normal) Bootloader utilities                                         ebe4a3d7    4227834933
    ...
  Call(Normal) 0x1804c8ab1f12e6bbf3894d4083f33e07309d1f38                   202bcce7    78705333
    Call(Normal) Nonce Holder                                                 e1239cd8    77474754
      ...
    Call(Normal) EthToken System Contract                                     9cc7f708    77468328
      Call(Normal) Keccak                                               00000000    76257342
  Call(Normal) Nonce Holder                                                 6ee1dc20    78694182
    Call(Normal) Keccak                                               00000000    77464044
  Call(Normal) EthToken System Contract                                     9cc7f708    78692796
    Call(Normal) Keccak                                               00000000    77462658
  Call(Normal) 0x1804c8ab1f12e6bbf3894d4083f33e07309d1f38                   e2f318e3    78691095
    Call(Normal) Msg Value System Contract                            0x    77460741
      Call(Normal) EthToken System Contract                                     579952fc    76249719
        ...
        Call(Normal) Event writer                                                 00000000    75052593
      Call(Mimic) bootloader                                           0x    76243293
  Call(Normal) EthToken System Contract                                     9cc7f708    78682086
    Call(Normal) Keccak                                               00000000    77452137
  Call(Normal) EthToken System Contract                                     579952fc    78680889
    ...
    Call(Normal) Event writer                                                 00000000    77449239
  Call(Normal) Known code storage                                           e516761e    78656571
  Call(Normal) Account Code Storage                                         4de2e468    78654114
  Call(Normal) System context                                               a851ae78    78653421
  Call(Normal) 0x1804c8ab1f12e6bbf3894d4083f33e07309d1f38                   df9c1589    78652161
    Call(Normal) 0xf9e9ba9ed9b96ab918c74b21dd0f1d5f2ac38a30                   45caa117    77422023
  Call(Normal) System context                                               a851ae78    4227757947
  ...
==== 3 events
EthToken System Contract                  
  Topics:
    0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef
    0x0000000000000000000000001804c8ab1f12e6bbf3894d4083f33e07309d1f38
    0x0000000000000000000000000000000000000000000000000000000000008001
  Data (Hex): 0x00000000000000000000000000000000000000000000000003dfd24000000000

EthToken System Contract                  
  Topics:
    0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef
    0x0000000000000000000000000000000000000000000000000000000000008001
    0x0000000000000000000000001804c8ab1f12e6bbf3894d4083f33e07309d1f38
  Data (Hex): 0x00000000000000000000000000000000000000000000000003dfd24000000000

EthToken System Contract                  
  Topics:
    0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef
    0x0000000000000000000000000000000000000000000000000000000000008001
    0x0000000000000000000000001804c8ab1f12e6bbf3894d4083f33e07309d1f38
  Data (String): 

zk vm decoded result 0000000000000000000000000000000000000000000000000000000000000003
```

Here, we observe that three events were emitted when we called `num.three()` in zkEVM. These correspond to the `Transfer(address indexed from, address indexed to, uint256 value)` event, which denotes a change of L2 ETH. As a result, the `vm.expectEmit` will register the first event emitted and try to match the subsequent two events, which will fail, and so will the test with:

```ignore
[FAIL. Reason: log != expected log] testFoo() (gas: 35515)
Traces:
  [35515] 0x7FA9385bE102ac3EAc297483Dd6233D62b3e1496::testFoo()
    ├─ [0] → new <unknown>@0xF9E9ba9Ed9B96AB918c74B21dD0f1D5f2ac38a30
    │   └─ ← [Return] 32 bytes of code
    ├─ [0] VM::expectEmit()
    │   └─ ← [Return] 
    ├─ [0] 0xF9E9ba9Ed9B96AB918c74B21dD0f1D5f2ac38a30::three()
    │   └─ ← [Return] 3
    └─ ← [Revert] log != expected log
```


To avoid such a scenario, it's recommended that the events for `expectEmit` be explicitly emitted with hard-coded values.