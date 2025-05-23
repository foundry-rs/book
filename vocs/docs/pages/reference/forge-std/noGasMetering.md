## `noGasMetering`

### Signature

```solidity
modifier noGasMetering();
```

### Description

A function modifier that turns off gas metering for the life of the function.

Note, there is some gas associated with calling the cheatcode, so you will see some gas usage (albeit small) when using this modifier.

### Examples

```solidity
function addInLoop() internal returns (uint256) {
    uint256 b;
    for (uint256 i; i < 10000; i++) {
        b + i;
    }
    return b;
}

function addInLoopNoGas() internal noGasMetering returns (uint256) {
    return addInLoop();
}

function testFunc() external {
  uint256 gas_start = gasleft();
  addInLoop();
  uint256 gas_used = gas_start - gasleft();

  uint256 gas_start_no_metering = gasleft();
  addInLoopNoGas();
  uint256 gas_used_no_metering = gas_start_no_metering - gasleft();

  emit log_named_uint("Gas Metering", gas_used);
  emit log_named_uint("No Gas Metering", gas_used_no_metering);
}
```

```ignore
[PASS] testFunc() (gas: 1887191)
Logs:
  Gas Metering: 1880082
  No Gas Metering: 3024
```
