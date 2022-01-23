## `ds-test` Reference

`ds-test` provides basic logging and assertion functionality. 

To use it in your testing contract, import the `test.sol` and inherit from `DSTest`, like so:

```solidity
import "ds-test/src/test.sol"

contract ContractTest is DSTest {}
```

### Cheatcodes Address
You can get the address of the cheatcodes account by accessing the `HEVM_ADDRESS` constant:

```solidity
Vm vm = Vm(HEVM_ADDRESS);
```

### Logging

`DSTest` contains the following events for logging:

> log(string)

```solidity
emit log("here");
```
<br>

> logs(bytes)

```solidity
emit logs(bytes("abcd"));
```
<br>

> log\_\<type\>(\<type\>)

Where `<type>` can be `address`, `bytes32`, `int`, `uint`, `bytes`, `string`
```solidity
uint256 amount = 1 ether;
emit log_uint(amount);
```
<br>

> log\_named\_\<type\>(string key, \<type\> val)

Where `<type>` can be `address`, `bytes32`, `int`, `uint`, `bytes`, `string`
```solidity
uint256 amount = 1 ether;
emit log_named_uint("amount", amount);
```
<br>

> log\_named\_decimal\_\<type\>(string key, \<type\> val, uint decimals)

Where `<type>` can be `int`, `uint`
```solidity
uint256 amount = 1 ether;
emit log_named_decimal_uint("amount", amount, 18);
```

### Assertions

`DSTest` contains the following assertion functions:
> assertTrue(bool condition)

Asserts the `condition` is true.
```solidity
(bool sent, bytes memory data) = _to.call{value: msg.value}("");
assertTrue(sent);
```
<br>

> assertEq(\<type\> a, \<type\> b)

Where `<type>` can be `address`, `bytes32`, `int`, `uint`

Asserts `a` is equal to `b`.
```solidity
uint256 amount = 1 ether;
assertEq(amount, 1e18);
```
<br>

> assertEqDecimal(\<type\> a, \<type\> b, uint decimals)

Where `<type>` can be `int`, `uint`

Asserts `a` is equal to `b`.
```solidity
uint256 amount = 1 ether;
assertEqDecimal(amount, 1e18, 18);
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
assertEq0(bytes(name1), bytes(name2));
```
<br>

> assertGt(\<type\> a, \<type\> b)

Where `<type>` can be `int`, `uint`

Asserts  `a` is greater than or equal to `b`.
```solidity
assertGt(1, 1);
```
<br>

> assertGtDecimal (\<type\> a, \<type\> b, uint decimals)

Where `<type>` can be `int`, `uint`

Asserts  `a` is greater than or equal to `b`.
```solidity
assertGt(1, 1, 0);
```
<br>

> assertGe (\<type\> a, \<type\> b)

Where `<type>` can be `int`, `uint`

Asserts  `a` is greater than `b`.
```solidity
assertGt(1, 0);
```
<br>

> assertGeDecimal (\<type\> a, \<type\> b, uint decimals)

Where `<type>` can be `int`, `uint`

Asserts  `a` is greater than `b`.
```solidity
assertGt(1, 0, 0);
```
<br>

> assertLt (\<type\> a, \<type\> b)

Where `<type>` can be `int`, `uint`

Asserts  `a` is less than or equal to `b`.
```solidity
assertGt(1, 1);
```
<br>

> assertLtDecimal (\<type\> a, \<type\> b, uint decimals)

Where `<type>` can be `int`, `uint`

Asserts  `a` is less than or equal to `b`.
```solidity
assertGt(1, 1, 0);
```
<br>

> assertLe (\<type\> a, \<type\> b)

Where `<type>` can be `int`, `uint`

Asserts  `a` is less than `b`.
```solidity
assertGt(0, 1);
```
<br>

> assertLeDecimal (\<type\> a, \<type\> b, uint decimals)

Where `<type>` can be `int`, `uint`

Asserts  `a` is less than `b`.
```solidity
assertGt(0, 1, 0);
```
<br>

> ℹ️ Information
>
> You can pass a custom error message to the above functions by providing an additional parameter `string err`.
