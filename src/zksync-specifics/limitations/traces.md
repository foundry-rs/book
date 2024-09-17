## Trace Limitations

zkEVM traces are attached to the EVM traces that are printed with `-vvvv`.


* The events emitted from within the zkEVM will not show on traces. See [events](../zksync-specifics/limitations/events.md) in zkEVM.
* The system call traces from within the zkEVM's bootloader are currently ignored in order to simplify the trace output.
* Executing each `CREATE` or `CALL` in its own zkEVM has additional bootloader gas costs, which may sometimes not be accounted in the traces. The ignored bootloader system calls, have a heuristic in-place to sum up their gas usage to the nearest non-system parent call, but this may also not add up accurately.


These system traces can be observed via setting the `RUST_LOG` env variable:
```bash
RUST_LOG=foundry_zksync_core::vm::inspect=info,era_test_node::formatter=info forge test --zksync
```

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
```


### Combined Traces
Foundry ZKsync will combine the traces from within the zkEVM into the EVM traces, that foundry displays. Running the following test with `forge test --zksync -vvvv`, yields the displayed trace:

```solidity
contract InnerNumber {
    event Value(uint8);

    function innerFive() public returns (uint8) {
        emit Value(5);
        return 5;
    }
}

contract Number {
    function five() public returns (uint8) {
        InnerNumber num = new InnerNumber();
        return num.innerFive();
    }
}

contract Adder {
    function add() public returns (uint8) {
        Number num = new Number();
        return num.five() + num.five();
    }
}

contract FooTest is Test {
    function testFoo() public {
        Adder adder = new Adder();
        uint8 value = adder.add();
        assert(value == 10);
        console.log(value);
    }
}
```

```ignore
[PASS] testFoo() (gas: 35807)
Logs:
  10

Traces:
  [35807] ZkTraceTest::testZkTraceOutputDuringCall()
    ├─ [0] → new Adder@0xF9E9ba9Ed9B96AB918c74B21dD0f1D5f2ac38a30
    │   └─ ← [Return] 2976 bytes of code
    ├─ [0] Adder::add()
    │   ├─ [127] → new Number@0xf232f12E115391c535FD519B00efADf042fc8Be5
    │   │   └─ ← [Return] 2272 bytes of code
    │   ├─ [91190] Number::five()
    │   │   ├─ [91] → new InnerNumber@0xEd570f3F91621894E001DF0fB70BfbD123D3c8AD
    │   │   │   └─ ← [Return] 736 bytes of code
    │   │   ├─ [889] InnerNumber::innerFive()
    │   │   │   └─ ← [Return] 5
    │   │   └─ ← [Return] 5
    │   ├─ [74776] Number::five()
    │   │   ├─ [91] → new InnerNumber@0xAbceAEaC3d3a2ac3Dcffd7A60Ca00A3fAC9490cA
    │   │   │   └─ ← [Return] 736 bytes of code
    │   │   ├─ [889] InnerNumber::innerFive()
    │   │   │   └─ ← [Return] 5
    │   │   └─ ← [Return] 5
    │   └─ ← [Return] 10
    ├─ [0] console::log(10) [staticcall]
    │   └─ ← [Stop] 
    └─ ← [Stop] 
```