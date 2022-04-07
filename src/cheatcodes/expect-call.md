## `expectCall`

```solidity
function expectCall(address where, bytes calldata data) external;
```

### Description

Expects at least one call to address `where`, where the call data either strictly or loosely matches `data`.

When a call is made to `where` the call data is first checked to see if it matches in its entirety with `data`. If not, the call data is checked to see if there is a partial match, with the match starting at the first byte of the call data.

If the test terminates without the call being made, the test fails.

### Examples

```solidity
bytes memory expectedData = abi.encodeWithSignature("fulfillRandomness(bytes32,uint256)", requestId, randomness);
cheats.expectCall(address(awesomeContract), expectedData);
vrfCoordinator.callBackWithRandomness(requestId, randomness, address(awesomeContract));
// [PASS]
```
