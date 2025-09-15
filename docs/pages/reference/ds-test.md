## DSTest Reference

Dappsys Test (DSTest for short) provides basic logging and assertion functionality. It is included in the Forge Standard Library.

To get access to the functions, import `forge-std/Test.sol` and inherit from `Test` in your test contract:

```solidity
import {Test} from "forge-std/Test.sol";

contract ContractTest is Test {
    // ... tests ...
}
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

#### `log`

```solidity
event log(string);
```

##### Example

```solidity
emit log("here");
// here
```

<br></br>

---

#### logs

```solidity
event logs(bytes);
```

##### Example

```solidity
emit logs(bytes("abcd"));
// 0x6162636400000000000000000000000000000000000000000000000000000000
```

<br></br>

---

#### log\_\<type\>

```solidity
event log_<type>(<type>);
```

Where `<type>` can be `address`, `bytes32`, `int`, `uint`, `bytes`, `string`

##### Example

```solidity
uint256 amount = 1 ether;
emit log_uint(amount);
// 1000000000000000000
```

<br></br>

---

#### log_named\_\<type\>

```solidity
event log_named_<type>(string key, <type> val);
```

Where `<type>` can be `address`, `bytes32`, `int`, `uint`, `bytes`, `string`

##### Example

```solidity
uint256 amount = 1 ether;
emit log_named_uint("Amount", amount);
// amount: 1000000000000000000
```

<br></br>

---

#### log_named_decimal\_\<type\>

```solidity
event log_named_decimal_<type>(string key, <type> val, uint decimals);
```

Where `<type>` can be `int`, `uint`

##### Example

```solidity
uint256 amount = 1 ether;
emit log_named_decimal_uint("Amount", amount, 18);
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

// Asserts `a` is approximately equal to `b` with delta in absolute value.
function assertApproxEqAbs(uint256 a, uint256 b, uint256 maxDelta) internal;
function assertApproxEqAbs(uint256 a, uint256 b, uint256 maxDelta, string memory err) internal;

// Asserts `a` is approximately equal to `b` with delta in percentage, where `1e18` is 100%.
function assertApproxEqRel(uint256 a, uint256 b, uint256 maxPercentDelta) internal;
function assertApproxEqRel(uint256 a, uint256 b, uint256 maxPercentDelta, string memory err) internal;
```

### Assertion functions

This section documents all functions for asserting and provides usage examples.

#### `assertTrue`

```solidity
function assertTrue(bool condition) internal;
```

Asserts the `condition` is true.

##### Example

```solidity
bool success = contract.fun();
assertTrue(success);
```

<br></br>

---

#### `assertEq`

```solidity
function assertEq(<type> a, <type> b) internal;
```

Where `<type>` can be `address`, `bytes32`, `int`, `uint`

Asserts `a` is equal to `b`.

##### Example

```solidity
uint256 a = 1 ether;
uint256 b = 1e18 wei;
assertEq(a, b);
```

<br></br>

---

#### `assertEqDecimal`

```solidity
function assertEqDecimal(<type> a, <type> b, uint decimals) internal;
```

Where `<type>` can be `int`, `uint`

Asserts `a` is equal to `b`.

##### Example

```solidity
uint256 a = 1 ether;
uint256 b = 1e18 wei;
assertEqDecimal(a, b, 18);
```

<br></br>

---

#### `assertEq32`

```solidity
function assertEq32(bytes32 a, bytes32 b) internal;
```

Asserts `a` is equal to `b`.

##### Example

```solidity
assertEq(bytes32("abcd"), 0x6162636400000000000000000000000000000000000000000000000000000000);
```

<br></br>

---

#### `assertEq0`

```solidity
function assertEq0(bytes a, bytes b) internal;
```

Asserts `a` is equal to `b`.

##### Example

```solidity
string memory name1 = "Alice";
string memory name2 = "Bob";
assertEq0(bytes(name1), bytes(name2)); // [FAIL]
```

<br></br>

---

#### `assertGt`

```solidity
function assertGt(<type> a, <type> b) internal;
```

Where `<type>` can be `int`, `uint`

Asserts `a` is greater than `b`.

##### Example

```solidity
uint256 a = 2 ether;
uint256 b = 1e18 wei;
assertGt(a, b);
```

<br></br>

---

#### `assertGtDecimal`

```solidity
function assertGtDecimal(<type> a, <type> b, uint decimals) internal;
```

Where `<type>` can be `int`, `uint`

Asserts `a` is greater than `b`.

##### Example

```solidity
uint256 a = 2 ether;
uint256 b = 1e18 wei;
assertGtDecimal(a, b, 18);
```

<br></br>

---

#### `assertGe`

```solidity
function assertGe(<type> a, <type> b) internal;
```

Where `<type>` can be `int`, `uint`

Asserts `a` is greater than or equal to `b`.

##### Example

```solidity
uint256 a = 1 ether;
uint256 b = 1e18 wei;
assertGe(a, b);
```

<br></br>

---

#### `assertGeDecimal`

```solidity
function assertGeDecimal(<type> a, <type> b, uint decimals) internal;
```

Where `<type>` can be `int`, `uint`

Asserts `a` is greater than or equal to `b`.

##### Example

```solidity
uint256 a = 1 ether;
uint256 b = 1e18 wei;
assertGeDecimal(a, b, 18);
```

<br></br>

---

#### `assertLt`

```solidity
function assertLt(<type> a, <type> b) internal;
```

Where `<type>` can be `int`, `uint`

Asserts `a` is lesser than `b`.

##### Example

```solidity
uint256 a = 1 ether;
uint256 b = 2e18 wei;
assertLt(a, b);
```

<br></br>

---

#### `assertLtDecimal`

```solidity
function assertLtDecimal(<type> a, <type> b, uint decimals) internal;
```

Where `<type>` can be `int`, `uint`

Asserts `a` is lesser than `b`.

##### Example

```solidity
uint256 a = 1 ether;
uint256 b = 2e18 wei;
assertLtDecimal(a, b, 18);
```

<br></br>

---

#### `assertLe`

```solidity
function assertLe(<type> a, <type> b) internal;
```

Where `<type>` can be `int`, `uint`

Asserts `a` is lesser than or equal to `b`.

##### Example

```solidity
uint256 a = 1 ether;
uint256 b = 1e18 wei;
assertLe(a, b);
```

<br></br>

---

#### `assertLeDecimal`

```solidity
function assertLeDecimal(<type> a, <type> b, uint decimals) internal;
```

Where `<type>` can be `int`, `uint`

Asserts `a` is lesser than or equal to `b`.

##### Example

```solidity
uint256 a = 1 ether;
uint256 b = 1e18 wei;
assertLeDecimal(a, b, 18);
```

<br></br>

---

#### `assertApproxEqAbs`

```solidity
function assertApproxEqAbs(<type> a, <type> b, uint256 maxDelta) internal;
```

Where `<type>` can be `int`, `uint`

Asserts `a` is approximately equal to `b` with delta in absolute value.

##### Example

```solidity
function testRevert () external {
    uint256 a = 100;
    uint256 b = 200;

    assertApproxEqAbs(a, b, 90);
}
```

<br></br>

---

#### `assertApproxEqRel`

```solidity
function assertApproxEqRel(<type> a, <type> b, uint256 maxPercentDelta) internal;
```

Where `<type>` can be `int`, `uint`

Asserts `a` is approximately equal to `b` with delta in percentage, where `1e18` is 100%.

##### Example

```solidity
function testRevert () external {
    uint256 a = 100;
    uint256 b = 200;
    assertApproxEqRel(a, b, 0.4e18);
}
```

<br></br>

> ℹ️ **Information**
>
> You can pass a custom error message to the above functions by providing an additional parameter `string err`.
