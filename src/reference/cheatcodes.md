## Cheatcodes Reference

Cheatcodes give you the ability to alter the state of the EVM, mock data, assert on reverts, and more.

To enable a cheatcode you call designated functions on the cheatcode address: `0x7109709ECfa91a80626fF3989D68f67F5b1DD12D`.

### Cheatcodes Interface

This is a complete overview of all the available cheatcodes. For detailed descriptions and example usage, see below.

```solidity
interface CheatCodes {
    // Set block.timestamp
    function warp(uint256) external;
    // Set block.number
    function roll(uint256) external;
    // Set block.basefee
    function fee(uint256) external;
    // Loads a storage slot from an address
    function load(address account, bytes32 slot) external returns (bytes32);
    // Stores a value to an address' storage slot
    function store(address account, bytes32 slot, bytes32 value) external;
    // Signs data
    function sign(uint256 privateKey, bytes32 digest) external returns (uint8 v, bytes32 r, bytes32 s);
    // Computes address for a given private key
    function addr(uint256 privateKey) external returns (address);
    // Performs a foreign function call via terminal
    function ffi(string[] calldata) external returns (bytes memory);
    // Sets the *next* call's msg.sender to be the input address
    function prank(address) external;
    // Sets all subsequent calls' msg.sender to be the input address until `stopPrank` is called
    function startPrank(address) external;
    // Sets the *next* call's msg.sender to be the input address, and the tx.origin to be the second input
    function prank(address, address) external;
    // Sets all subsequent calls' msg.sender to be the input address until `stopPrank` is called, and the tx.origin to be the second input
    function startPrank(address, address) external;
    // Resets subsequent calls' msg.sender to be `address(this)`
    function stopPrank() external;
    // Sets an address' balance
    function deal(address who, uint256 newBalance) external;
    // Sets an address' code
    function etch(address who, bytes calldata code) external;
    // Expects an error on next call
    function expectRevert(bytes calldata) external;
    function expectRevert(bytes4) external;
    // Record all storage reads and writes
    function record() external;
    // Gets all accessed reads and write slot from a recording session, for a given address
    function accesses(address) external returns (bytes32[] memory reads, bytes32[] memory writes);
    // Prepare an expected log with (bool checkTopic1, bool checkTopic2, bool checkTopic3, bool checkData).
    // Call this function, then emit an event, then call a function. Internally after the call, we check if
    // logs were emitted in the expected order with the expected topics and data (as specified by the booleans)
    function expectEmit(bool, bool, bool, bool) external;
    // Mocks a call to an address, returning specified data.
    // Calldata can either be strict or a partial match, e.g. if you only
    // pass a Solidity selector to the expected calldata, then the entire Solidity
    // function will be mocked.
    function mockCall(address, bytes calldata, bytes calldata) external;
    // Clears all mocked calls
    function clearMockedCalls() external;
    // Expect a call to an address with the specified calldata.
    // Calldata can either be strict or a partial match
    function expectCall(address, bytes calldata) external;
    function getCode(string calldata) external returns (bytes memory);
}
```

### Cheatcodes

This section documents all cheat codes, gotchas, and provides usage examples.

#### `warp`

```solidity
function warp(uint256) external;
```

Sets `block.timestamp`.

#### `roll`

```solidity
function roll(uint256) external;
```

Sets `block.number`.

#### `fee`

```solidity
function fee(uint256) external;
```

Sets `block.basefee`.

#### `load`

```solidity
function load(address account, bytes32 slot) external returns (bytes32);
```

Loads the value from storage slot `slot` on account `account`.


#### `store`

```solidity
function store(address account, bytes32 slot, bytes32 value) external;
```

Stores the value `value` in storage slot `slot` on account `account`.

#### `sign`

```solidity
function sign(uint256 privateKey, bytes32 digest) external returns (uint8 v, bytes32 r, bytes32 s);
```

Signs a digest `digest` with private key `privateKey`, returning `(v, r, s)`.

This is useful for testing functions that take signed data and performs an `ecrecover` to verify the signer.

#### `addr`

```solidity
function addr(uint256 privateKey) external returns (address);
```

Computes the address for a given private key.


#### `ffi`

```solidity
function ffi(string[] calldata) external returns (bytes memory);
```

Calls an arbitrary command if [`ffi`](./config.md#ffi) is enabled.

It is generally advised to use this cheat code as a last resort, and to not enable it by default, as anyone who can change the tests of a project will be able to execute arbitrary commands on devices that run the tests.

#### `prank`

```solidity
function prank(address) external;
```

Sets `msg.sender` to the specified address **for the next call**. "The next call" includes static calls as well, but not calls to the cheat code address.

##### Alternative Signature

```solidity
function prank(address sender, address origin) external;
```

Sets `msg.sender` to `sender` and `tx.origin` to `origin` for the next call.

#### `startPrank`

```solidity
function startPrank(address) external;
```

Sets `msg.sender` for all subsequent calls until [`stopPrank`](#stopprank) is called.

##### Alternative Signature

```solidity
function startPrank(address sender, address origin) external;
```

Sets `msg.sender` to `sender` and `tx.origin` to `origin` for all subsequent calls until [`stopPrank`](#stopprank) is called.

#### `stopPrank`

```solidity
function stopPrank() external;
```

Resets `msg.sender` to [`FOUNDRY_SENDER`](./config.md#sender). Always used in conjunction with [`startPrank`](#startprank).


#### `deal`

```solidity
function deal(address who, uint256 newBalance) external;
```

Sets the balance of an address `who` to `newBalance`.

#### `etch`

```solidity
function etch(address who, bytes calldata code) external;
```

Sets the bytecode of an address `who` to `code`.

#### `expectRevert`

```solidity
function expectRevert(bytes calldata msg) external;
```

If the **next call** does not revert with message `msg`, then `expectRevert` will.

To use `expectRevert` with a `string`, convert it to `bytes`.

```solidity
cheats.expectRevert(bytes("error message"));
```

To use `expectRevert` with a custom [error type](https://docs.soliditylang.org/en/v0.8.11/contracts.html#errors) with parameters, ABI encode the error type.

```solidity
cheats.expectRevert(
  abi.encodeWithSelector(MyContract.CustomError.selector, 1, 2)
)
```

##### Alternative Signature

```solidity
function expectRevert(bytes4) external;
```

An alternative version of [`expectRevert`](#expectrevert) that only takes an error type signature. Useful for custom error types that do not take parameters.

```solidity
cheats.expectRevert(MyContract.CustomError.selector)
```

#### `record`

```solidity
function record() external;
```

Tell the VM to start recording all storage reads and writes. To access the reads and writes, use [`accesses`](#accesses).

#### `accesses`

```solidity
function accesses(address) external returns (bytes32[] memory reads, bytes32[] memory writes);
```

Gets all storage slots that have been read (`reads`) or written to (`writes`) on an address.

Note that [`record`](#record) must be called first.

#### `expectEmit`

```solidity
function expectEmit(bool checkTopic1, bool checkTopic2, bool checkTopic3, bool checkData) external;
```

This cheat code is used to assert that certain logs are emitted on the next call.

1. Call the cheat code, specifying whether we should check the first, second or third topic, and the log data.
2. Emit the event we are supposed to see after the next call.
3. Perform the call.

For example:

```solidity
function testERC20EmitsTransfer() public {
  // Only `src` and `dst` are indexed in ERC20's `Transfer` event,
  // so we only check topic 0 and 1, as well as the data (`amount`).
  cheats.expectEmit(true, true, false, true);

  // We emit the event we expect to see.
  emit MyToken.Transfer(address(this), address(1), 10);

  // We perform the call.
  myToken.transfer(address(1), 10);
}
```

#### `mockCall`

```solidity
function mockCall(address where, bytes calldata data, bytes calldata retdata) external;
```

Mocks all calls to an address `where` if the call data either strictly or loosely matches `data` and returns `retdata`.

When a call is made to `where` the call data is first checked to see if it matches in its entirety with `data`. If not, the call data is checked to see if there is a partial match, with the match starting at the first byte of the call data.

If a match is found, then `retdata` is returned from the call.

Mocked calls are in effect until [`clearMockedCalls`](#clearmockedcalls) is called.

##### Mocking an exact call

```solidity
function testMockCall() public {
  vm.mockCall(
    address(0),
    abi.encodeWithSelector(MyToken.balanceOf.selector, address(1)),
    abi.encode(10)
  );
  assertEq(IERC20(address(0)).balanceOf(address(1)), 10);
}
```

##### Mocking an entire function

```solidity
function testMockCall() public {
  vm.mockCall(
    address(0),
    abi.encodeWithSelector(MyToken.balanceOf.selector),
    abi.encode(10)
  );
  assertEq(IERC20(address(0)).balanceOf(address(1)), 10);
  assertEq(IERC20(address(0)).balanceOf(address(2)), 10);

  // and so on..
}
```

#### `clearMockedCalls`

```solidity
function clearMockedCalls() external;
```

Clears all mocked calls.

#### `expectCall`

```solidity
function expectCall(address where, bytes calldata data) external;
```

Expects at least one call to address `where` where the call data either strictly or loosely matches `data`.

When a call is made to `where` the call data is first checked to see if it matches in its entirety with `data`. If not, the call data is checked to see if there is a partial match, with the match starting at the first byte of the call data.

If the test terminates without the call being made, the test fails.

#### `getCode`

```solidity
function getCode(string calldata) external returns (bytes memory);
```

Returns the bytecode for a contract in the project given the path to the contract.
