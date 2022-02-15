## `ds-test` Reference

`ds-test` provides basic logging and assertion functionality.

To use it in your testing contract, import `ds-test/test.sol` and inherit from `DSTest`, like so:

```solidity
import "ds-test/test.sol";

contract ContractTest is DSTest {
    // ... tests ...
}
```

### Cheatcodes Address
You can get the address of the cheatcodes account by accessing the `HEVM_ADDRESS` constant:

```solidity
Cheats cheats = Cheats(HEVM_ADDRESS);
```

### Logging

This is a complete overview of all the available logging events. For detailed descriptions and example usage, see below.

```solidity
event log                    (string);
event logs                   (bytes);

event log_address            (address);
event log_bytes32            (bytes32);
event log_int                (int);
event log_uint               (uint);
event log_bytes              (bytes);
event log_string             (string);

event log_named_address      (string key, address val);
event log_named_bytes32      (string key, bytes32 val);
event log_named_decimal_int  (string key, int val, uint decimals);
event log_named_decimal_uint (string key, uint val, uint decimals);
event log_named_int          (string key, int val);
event log_named_uint         (string key, uint val);
event log_named_bytes        (string key, bytes val);
event log_named_string       (string key, string val);
```

### Logging events

This section documents all events for logging and provides usage examples. 

<br>

> log(string)

```solidity
emit log("here");
// here
```
<br>

> logs(bytes)

```solidity
emit logs(bytes("abcd"));
// 0x6162636400000000000000000000000000000000000000000000000000000000
```
<br>

> log\_\<type\>(\<type\>)

Where `<type>` can be `address`, `bytes32`, `int`, `uint`, `bytes`, `string`
```solidity
uint256 amount = 1 ether;
emit log_uint(amount);
// 1000000000000000000
```
<br>

> log\_named\_\<type\>(string key, \<type\> val)

Where `<type>` can be `address`, `bytes32`, `int`, `uint`, `bytes`, `string`
```solidity
uint256 amount = 1 ether;
emit log_named_uint("amount", amount);
// amount: 1000000000000000000
```
<br>

> log\_named\_decimal\_\<type\>(string key, \<type\> val, uint decimals)

Where `<type>` can be `int`, `uint`
```solidity
uint256 amount = 1 ether;
emit log_named_decimal_uint("amount", amount, 18);
// amount: 1.000000000000000000
```

### Asserting

This is a complete overview of all the available assertion functions. For detailed descriptions and example usage, see below.

```solidity
// Assert the `condition` is true
function assertTrue(bool condition) internal;
function assertTrue(bool condition, string memory err) internal;

// Assert `a` is equal to `b`
function assertEq(address a, address b) internal;
function assertEq(address a, address b, string memory err) internal;
function assertEq(bytes32 a, bytes32 b) internal;
function assertEq(bytes32 a, bytes32 b, string memory err) internal;
function assertEq(int a, int b) internal;
function assertEq(int a, int b, string memory err) internal;
function assertEq(uint a, uint b) internal;
function assertEq(uint a, uint b, string memory err) internal;
function assertEqDecimal(int a, int b, uint decimals) internal;
function assertEqDecimal(int a, int b, uint decimals, string memory err) internal;
function assertEqDecimal(uint a, uint b, uint decimals) internal;
function assertEqDecimal(uint a, uint b, uint decimals, string memory err) internal;
function assertEq(string memory a, string memory b) internal;
function assertEq(string memory a, string memory b, string memory err) internal;
function assertEq32(bytes32 a, bytes32 b) internal;
function assertEq32(bytes32 a, bytes32 b, string memory err) internal;
function assertEq0(bytes memory a, bytes memory b) internal;
function assertEq0(bytes memory a, bytes memory b, string memory err) internal;

// Assert  `a` is greater than `b`
function assertGt(uint a, uint b) internal;
function assertGt(uint a, uint b, string memory err) internal;
function assertGt(int a, int b) internal;
function assertGt(int a, int b, string memory err) internal;
function assertGtDecimal(int a, int b, uint decimals) internal;
function assertGtDecimal(int a, int b, uint decimals, string memory err) internal;
function assertGtDecimal(uint a, uint b, uint decimals) internal;
function assertGtDecimal(uint a, uint b, uint decimals, string memory err) internal;

// Assert  `a` is greater than or equal to `b`
function assertGe(uint a, uint b) internal;
function assertGe(uint a, uint b, string memory err) internal;
function assertGe(int a, int b) internal;
function assertGe(int a, int b, string memory err) internal;
function assertGeDecimal(int a, int b, uint decimals) internal;
function assertGeDecimal(int a, int b, uint decimals, string memory err) internal;
function assertGeDecimal(uint a, uint b, uint decimals) internal;
function assertGeDecimal(uint a, uint b, uint decimals, string memory err) internal;

// Assert  `a` is lesser than `b`
function assertLt(uint a, uint b) internal;
function assertLt(uint a, uint b, string memory err) internal;
function assertLt(int a, int b) internal;
function assertLt(int a, int b, string memory err) internal;
function assertLtDecimal(int a, int b, uint decimals) internal;
function assertLtDecimal(int a, int b, uint decimals, string memory err) internal;
function assertLtDecimal(uint a, uint b, uint decimals) internal;
function assertLtDecimal(uint a, uint b, uint decimals, string memory err) internal;

// Assert  `a` is lesser than or equal to `b`
function assertLe(uint a, uint b) internal;
function assertLe(uint a, uint b, string memory err) internal;
function assertLe(int a, int b) internal;
function assertLe(int a, int b, string memory err) internal;
function assertLeDecimal(int a, int b, uint decimals) internal;
function assertLeDecimal(int a, int b, uint decimals, string memory err) internal;
function assertLeDecimal(uint a, uint b, uint decimals) internal;
function assertLeDecimal(uint a, uint b, uint decimals, string memory err) internal;
```

### Assertion functions

This section documents all functions for asserting and provides usage examples. 

<br>

> assertTrue(bool condition)

Asserts the `condition` is true.
```solidity
bool success = contract.fun();
assertTrue(success);
```
<br>

> assertEq(\<type\> a, \<type\> b)

Where `<type>` can be `address`, `bytes32`, `int`, `uint`

Asserts `a` is equal to `b`.
```solidity
assertEq(1 ether, 1e18 wei);
```
<br>

> assertEqDecimal(\<type\> a, \<type\> b, uint decimals)

Where `<type>` can be `int`, `uint`

Asserts `a` is equal to `b`.
```solidity
assertEqDecimal(1 ether, 1e18 wei, 18);
```
<br>

> assertEq32(bytes32 a, bytes32 b)

Asserts `a` is equal to `b`.
```solidity
assertEq(bytes32("abcd"), 0x6162636400000000000000000000000000000000000000000000000000000000);
```
<br>

> assertEq0(bytes a, bytes b)

Asserts `a` is equal to `b`.
```solidity
string memory name1 = "Alice";
string memory name2 = "Bob";
assertEq0(bytes(name1), bytes(name2)); // [FAIL]
```
<br>

> assertGt(\<type\> a, \<type\> b)

Where `<type>` can be `int`, `uint`

Asserts  `a` is greater than `b`.
```solidity
assertGt(2 ether, 1e18 wei);
```
<br>

> assertGtDecimal(\<type\> a, \<type\> b, uint decimals)

Where `<type>` can be `int`, `uint`

Asserts  `a` is greater than `b`.
```solidity
assertGtDecimal(2 ether, 1e18 wei, 18);
```
<br>

> assertGe(\<type\> a, \<type\> b)

Where `<type>` can be `int`, `uint`

Asserts  `a` is greater than or equal to `b`.
```solidity
assertGe(1 ether, 1e18 wei);
```
<br>

> assertGeDecimal(\<type\> a, \<type\> b, uint decimals)

Where `<type>` can be `int`, `uint`

Asserts  `a` is greater than or equal to `b`.
```solidity
assertGeDecimal(1 ether, 1e18 wei, 18);
```
<br>

> assertLt(\<type\> a, \<type\> b)

Where `<type>` can be `int`, `uint`

Asserts  `a` is lesser than `b`.
```solidity
assertLt(1e18 wei, 2 ether);
```
<br>

> assertLtDecimal(\<type\> a, \<type\> b, uint decimals)

Where `<type>` can be `int`, `uint`

Asserts  `a` is lesser than `b`.
```solidity
assertLtDecimal(1e18 wei, 2 ether, 18);
```
<br>

> assertLe(\<type\> a, \<type\> b)

Where `<type>` can be `int`, `uint`

Asserts  `a` is lesser than or equal to `b`.
```solidity
assertLe(1e18 wei, 2 ether);
```
<br>

> assertLeDecimal(\<type\> a, \<type\> b, uint decimals)

Where `<type>` can be `int`, `uint`

Asserts  `a` is lesser than or equal to `b`.
```solidity
assertLeDecimal(1e18 wei, 2 ether, 18);
```
<br>

> ℹ️ **Information**
>
> You can pass a custom error message to the above functions by providing an additional parameter `string err`.
