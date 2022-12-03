## Gas Metering

### `pauseGasMetering`

### Signature

```solidity
function pauseGasMetering() external;
```

### Description

Pauses gas metering (i.e. `gasleft()` does not decrease as operations are executed).

This can be useful for getting a better sense of gas costs, by turning off gas metering for unnecessary code), as well as long-running scripts that would otherwise run out of gas.

> ℹ️ **Note**
>
> `pauseGasMetering` *turns off DoS protections* that come from metering gas usage.
>
> Exposing a service that assumes a particular instance of the EVM will complete due to gas usage no longer is true, and a timeout should be enabled in that case.


### `resumeGasMetering`

### Signature

```solidity
function resumeGasMetering() external;
```

### Description

Resumes gas metering (i.e. `gasleft()` will decrease as operations are executed). Gas usage will resume at the same amount at which it was paused.