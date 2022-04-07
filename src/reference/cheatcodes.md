## Cheatcodes Reference

Cheatcodes give you the ability to alter the state of the EVM, mock data, assert on reverts, and more.

To enable a cheatcode you call designated functions on the cheatcode address: `0x7109709ECfa91a80626fF3989D68f67F5b1DD12D`. This address can be accessed through the `HEVM_ADDRESS` constant in `DSTest`.

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

    // Gets the nonce of an account
    function getNonce(address account) external returns (uint64);

    // Sets the nonce of an account
    // The new nonce must be higher than the current nonce of the account
    function getNonce(address account, uint256 nonce) external;

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
    function expectRevert() external;
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

    // Gets the bytecode for a contract in the project given the path to the contract.
    function getCode(string calldata) external returns (bytes memory);

    // Label an address in test traces
    function label(address addr, string calldata label) external;

    // When fuzzing, generate new inputs if conditional not met
    function assume(bool) external;
}
```

### Cheatcodes

This section documents all cheat codes, gotchas, and provides usage examples.

#### `warp`
```solidity
function warp(uint256) external;
```

Sets `block.timestamp`.
##### Example
```solidity
cheats.warp(1641070800);
emit log_uint(block.timestamp); // 1641070800
```

<br>

---

#### `roll`
```solidity
function roll(uint256) external;
```

Sets `block.number`.
##### Example
```solidity
cheats.roll(100);
emit log_uint(block.number); // 100
```

<br>

---

#### `fee`
```solidity
function fee(uint256) external;
```

Sets `block.basefee`.
##### Example
```solidity
cheats.fee(25 gwei);
emit log_uint(block.basefee); // 25000000000
```

<br>

---

#### `load`
```solidity
function load(address account, bytes32 slot) external returns (bytes32);
```

Loads the value from storage slot `slot` on account `account`.
##### Example
```solidity
/// contract LeetContract {
///     uint256 private leet = 1337; // slot 0
/// }

bytes32 leet = cheats.load(address(leetContract), bytes32(uint256(0)));
emit log_uint(uint256(leet)); // 1337
```

<br>

---

#### `store`
```solidity
function store(address account, bytes32 slot, bytes32 value) external;
```

Stores the value `value` in storage slot `slot` on account `account`.
##### Example
```solidity
/// contract LeetContract {
///     uint256 private leet = 1337; // slot 0
/// }

cheats.store(address(leetContract), bytes32(uint256(0)), bytes32(uint256(31337)));
bytes32 leet = cheats.load(address(leetContract), bytes32(uint256(0)));
emit log_uint(uint256(leet)); // 31337
```

<br>

---

#### `sign`
```solidity
function sign(uint256 privateKey, bytes32 digest) external returns (uint8 v, bytes32 r, bytes32 s);
```

Signs a digest `digest` with private key `privateKey`, returning `(v, r, s)`.

This is useful for testing functions that take signed data and perform an `ecrecover` to verify the signer.
##### Example
```solidity
address alice = cheats.addr(1);
bytes32 hash = keccak256("Signed by Alice");
(uint8 v, bytes32 r, bytes32 s) = cheats.sign(1, hash);
address signer = ecrecover(hash, v, r, s);
assertEq(alice, signer); // [PASS]
```

<br>

---

#### `addr`
```solidity
function addr(uint256 privateKey) external returns (address);
```

Computes the address for a given private key.
##### Example
```solidity
address alice = cheats.addr(1);
emit log_address(alice); // 0x7e5f4552091a69125d5dfcb7b8c2659029395bdf
```

<br>

---

#### `getNonce`
```solidity
function getNonce(address account) external returns (uint64);
```

Gets the nonce of the given account.
##### Example
```solidity
uint256 nonce = cheats.getNonce(address(100));
emit log_uint(nonce); // 0
```

<br>

---

#### `setNonce`
```solidity
function getNonce(address account, uint256 nonce) external;
```

Computes the address for a given private key.
##### Example
```solidity
cheats.setNonce(address(100), 1234);
```

<br>

---

#### `ffi`
```solidity
function ffi(string[] calldata) external returns (bytes memory);
```

Calls an arbitrary command if [`ffi`](./config.md#ffi) is enabled.

It is generally advised to use this cheat code as a last resort, and to not enable it by default, as anyone who can change the tests of a project will be able to execute arbitrary commands on devices that run the tests.

##### Example

```solidity
string[] memory inputs = new string[](3);
inputs[0] = "echo";
inputs[1] = "-n";
// ABI encoded "gm", as a string
inputs[2] = "0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002676d000000000000000000000000000000000000000000000000000000000000";

bytes memory res = cheats.ffi(inputs);
string memory output = abi.decode(res, (string));
assertEq(output, "gm");
```

<br>

---

#### `prank`

```solidity
function prank(address) external;
```

Sets `msg.sender` to the specified address **for the next call**. "The next call" includes static calls as well, but not calls to the cheat code address.

##### Example
```solidity
/// function withdraw() public {
///     require(msg.sender == owner);

cheats.prank(owner);
myContract.withdraw(); // [PASS]
```

##### Alternative Signature

```solidity
function prank(address sender, address origin) external;
```

Sets `msg.sender` to `sender` and `tx.origin` to `origin` **for the next call**.

#### `startPrank`

```solidity
function startPrank(address) external;
```

Sets `msg.sender` **for all subsequent calls** until [`stopPrank`](#stopprank) is called.

##### Alternative Signature

```solidity
function startPrank(address sender, address origin) external;
```

Sets `msg.sender` to `sender` and `tx.origin` to `origin` **for all subsequent calls** until [`stopPrank`](#stopprank) is called.

#### `stopPrank`

```solidity
function stopPrank() external;
```

Resets `msg.sender` to [`FOUNDRY_SENDER`](./config.md#sender). Always used in conjunction with [`startPrank`](#startprank).

<br>

---

#### `deal`
```solidity
function deal(address who, uint256 newBalance) external;
```

Sets the balance of an address `who` to `newBalance`.
##### Example
```solidity
address alice = address(1);
cheats.deal(alice, 1 ether);
log_uint256(alice.balance); // 1000000000000000000
```

<br>

---

#### `etch`
```solidity
function etch(address who, bytes calldata code) external;
```

Sets the bytecode of an address `who` to `code`.
##### Example
```solidity
bytes memory code = address(awesomeContract).code;
address targetAddr = address(1);
cheats.etch(targetAddr, code);
log_bytes(address(targetAddr).code); // 0x6080604052348015610010...
```

<br>

---

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
);
```

After calling `cheats.expectRevert()`, calls to other cheat codes before the reverting call are ignored.
This means, for example, we can call `cheats.prank(user)` immediately before the reverting call.

##### Usage with low-level calls

Normally, a call that succeeds returns a status of `true` (along with any return data) and a call that reverts returns `false`.
Standard Solidity calls check the return status of each call, and revert if it returned `false`.
The `expectRevert` cheatcode works by inverting this, so the next call after this cheatcode returns `true` if it reverts.
The implication here is that to use this cheatcode with low-level calls, you must manually assert on the call's status since Solidity is not doing it for you. For example:

```solidity
function testLowLevelCallRevert() public {
    cheats.expectRevert(bytes("error message"));
    (bool status, ) = address(myContract).call(myCalldata);
    assertTrue(status, "expectRevert: call did not revert");
}
```

##### Alternative Signature

```solidity
function expectRevert(bytes4) external;
```

An alternative version of [`expectRevert`](#expectrevert) that only takes an error type signature. Useful for custom error types that do not take parameters.

```solidity
cheats.expectRevert(MyContract.CustomError.selector)
```

##### Alternative Signature without error message

```solidity
function expectRevert() external;
```

If you need to test that a function reverts _without_ a message, you can do so with `expectRevert()`.

###### Example

```solidity
function testExpectRevertNoReason() public {
    Reverter reverter = new Reverter();
    cheats.expectRevert();
    reverter.revertWithoutReason();
}
```

<br>

---

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
##### Example
```solidity
/// contract NumsContract {
///     uint256 public num1 = 100; // slot 0
///     uint256 public num2 = 200; // slot 1
/// }

cheats.record();
numsContract.num2();
(bytes32[] memory reads, bytes32[] memory writes) = cheats.accesses(
  address(numsContract)
);
emit log_uint(uint256(reads[0])); // 1
```

<br>

---

#### `expectEmit`
```solidity
function expectEmit(bool checkTopic1, bool checkTopic2, bool checkTopic3, bool checkData) external;
```

This cheat code is used to assert that certain logs are emitted on the next call.

1. Call the cheat code, specifying whether we should check the first, second or third topic, and the log data. Topic 0 is always checked.
2. Emit the event we are supposed to see after the next call.
3. Perform the call.

If the event is not available in the current scope (e.g because we are using an interface, or an external smart contract), we can define the event ourselves with an identical event signature.

The cheatcode does not check the origin of the event, but simply that it was emitted during that call.

For example:

```solidity
event Transfer(address indexed from, address indexed to, uint256 amount);

function testERC20EmitsTransfer() public {
    // Only `src` and `dst` are indexed in ERC20's `Transfer` event,
    // so we specifically check topics 1 and 2 (topic 0 is always checked by default),
    // as well as the data (`amount`).
    cheats.expectEmit(true, true, false, true);

    // We emit the event we expect to see.
    emit MyToken.Transfer(address(this), address(1), 10);

    // We perform the call.
    myToken.transfer(address(1), 10);
}
```

<br>

Calls to other cheat codes before the final call are ignored, meaning we can also do something like this:

```solidity
function testERC20EmitsTransfer() public {
    // The first two lines are the same as above.
    cheats.expectEmit(true, true, false, true);
    emit MyToken.Transfer(address(alice), address(1), 10);

    // Use the `prank` cheat code to impersonate a user.
    cheats.prank(address(alice));

    // We perform the call.
    myToken.transfer(address(1), 10);
}
```

<br>

We can also assert that multiple events are emitted in a single call. For example:

```solidity
function testERC20EmitsBatchTransfer() public {
    // We declare multiple expected transfer events
    for (uint256 i = 0; i < users.length; i++) {
        cheats.expectEmit(true, true, true, true);
        emit Transfer(address(this), users[i], 10);
    }

    // We also expect a custom `BatchTransfer(uint256 numberOfTransfers)` event.
    cheats.expectEmit(false, false, false, false);
    emit BatchTransfer(users.length);

    // We perform the call.
    myToken.batchTransfer(users, 10);
}
```

<br>

---

#### `mockCall`
```solidity
function mockCall(address where, bytes calldata data, bytes calldata retdata) external;
```

Mocks all calls to an address `where` if the call data either strictly or loosely matches `data` and returns `retdata`.

When a call is made to `where` the call data is first checked to see if it matches in its entirety with `data`. If not, the call data is checked to see if there is a partial match, with the match starting at the first byte of the call data.

If a match is found, then `retdata` is returned from the call.

Mocked calls are in effect until [`clearMockedCalls`](#clearmockedcalls) is called.

> 💬 **Note**
>
> Calls to mocked addresses may revert if there is no code on the address.
> This is because Solidity inserts an `extcodesize` check before some contract calls.
>
> To circumvent this, use the [`etch`](#etch) cheatcode if the mocked address has no code.

##### Mocking an exact call

```solidity
function testMockCall() public {
    cheats.mockCall(
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
    cheats.mockCall(
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

<br>

---

#### `expectCall`
```solidity
function expectCall(address where, bytes calldata data) external;
```

Expects at least one call to address `where` where the call data either strictly or loosely matches `data`.

When a call is made to `where` the call data is first checked to see if it matches in its entirety with `data`. If not, the call data is checked to see if there is a partial match, with the match starting at the first byte of the call data.

If the test terminates without the call being made, the test fails.
##### Example
```solidity
bytes memory expectedData = abi.encodeWithSignature("fulfillRandomness(bytes32,uint256)", requestId, randomness);
cheats.expectCall(address(awesomeContract), expectedData);
vrfCoordinator.callBackWithRandomness(requestId, randomness, address(awesomeContract));
// [PASS]
```

<br>

---

#### `getCode`

```solidity
function getCode(string calldata) external returns (bytes memory);
```

Returns the bytecode for a contract in the project given the path to the contract.

The calldata parameter can either be in the form `ContractFile.sol` (if the filename and contract name are the same), `ContractFile.sol:ContractName`, or `./path/to/artifact.json`

##### Example

```solidity
MyContract myContract = new MyContract(arg1, arg2);

// Let's do the same thing with `getCode`
bytes memory args = abi.encode(arg1, arg2);
bytes memory bytecode = abi.encodePacked(cheats.getCode("MyContract.sol:MyContract"), args);
address anotherAddress;
assembly {
    anotherAddress := create(0, add(bytecode, 0x20), mload(bytecode))
}

assertEq0(address(myContract).code, anotherAddress.code); // [PASS]
```

If you'd like to use getCode to deploy a contract's bytecode, you can also use [Forge Std](https://github.com/brockelmore/forge-std)'s `deployCode` helper. In your test file:

```solidity
    function testDeployCode() public {
        // deployCode takes a string argument for the contract to deploy
        // and optionally a bytes argument for any arguments that should
        // be passed to your contract's constructor
        address deployed = deployCode("StdCheats.t.sol:StdCheatsTest", bytes(""));
        ...
    }
```

<br>

---

#### `label`

```solidity
function label(address addr, string calldata label) external;
```

Sets a label `label` for `addr` in test traces.

If an address is labelled, the label will show up in test traces instead of the address.

<br>

---

#### `assume`

```solidity
function assume(bool) external;
```

If the boolean expression evaluates to false, discard the current fuzz inputs and start a new fuzz run.

The `assume` cheatcode should mainly be used for very narrow checks. Broad checks will slow down tests as it will take a while to find valid values, and the test may fail if you hit the max number of rejects. You can configure the rejection thresholds by setting [`fuzz_max_local_rejects`](./config.md#fuzz_max_local_rejects) and [`fuzz_max_global_rejects`](./config.md#fuzz_max_global_rejects) in your `foundry.toml` file. More information on filtering via `assume` can be found [here](https://altsysrq.github.io/proptest-book/proptest/tutorial/filtering.html#filtering).

For broad checks, such as ensuring a `uint256` falls within a certain range, you can bound your input with the modulo operator or Solmate's [`bound`](https://github.com/Rari-Capital/solmate/blob/a9e3ea26a2dc73bfa87f0cb189687d029028e0c5/src/test/utils/DSTestPlus.sol#L114-L133) method.

##### Example

```solidity
// Good example of using assume
function testX(uint256 a) public {
    cheats.assume(a != 1);
    require(a != 1);
    // [PASS]
}

// In this case assume is not a great fit, so you should bound inputs manually
function testY(uint256 a) public {
    a = bound(a, 100, 1e36);
    require(a >= 100 && a <= 1e36);
    // [PASS]
}
```
