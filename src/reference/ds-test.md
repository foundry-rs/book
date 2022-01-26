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
Cheats cheats = Cheats(HEVM_ADDRESS);
```

### Logging

`DSTest` contains the following events for logging:

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

### Assertions

`DSTest` contains the following assertion functions:
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

Asserts  `a` is greater than or equal to `b`.
```solidity
assertGt(1 ether, 1e18 wei);
```
<br>

> assertGtDecimal(\<type\> a, \<type\> b, uint decimals)

Where `<type>` can be `int`, `uint`

Asserts  `a` is greater than or equal to `b`.
```solidity
assertGtDecimal(1 ether, 1e18 wei, 18);
```
<br>

> assertGe(\<type\> a, \<type\> b)

Where `<type>` can be `int`, `uint`

Asserts  `a` is greater than `b`.
```solidity
assertGe(2 ether, 1e18 wei);
```
<br>

> assertGeDecimal(\<type\> a, \<type\> b, uint decimals)

Where `<type>` can be `int`, `uint`

Asserts  `a` is greater than `b`.
```solidity
assertGeDecimal(2 ether, 1e18 wei, 18);
```
<br>

> assertLt(\<type\> a, \<type\> b)

Where `<type>` can be `int`, `uint`

Asserts  `a` is less than or equal to `b`.
```solidity
assertLt(1e18 wei, 1 ether);
```
<br>

> assertLtDecimal(\<type\> a, \<type\> b, uint decimals)

Where `<type>` can be `int`, `uint`

Asserts  `a` is less than or equal to `b`.
```solidity
assertLtDecimal(1e18 wei, 1 ether, 18);
```
<br>

> assertLe(\<type\> a, \<type\> b)

Where `<type>` can be `int`, `uint`

Asserts  `a` is less than `b`.
```solidity
assertLe(1e18 wei, 2 ether);
```
<br>

> assertLeDecimal(\<type\> a, \<type\> b, uint decimals)

Where `<type>` can be `int`, `uint`

Asserts  `a` is less than `b`.
```solidity
assertLeDecimal(1e18 wei, 2 ether, 18);
```
<br>

> ℹ️ Information
>
> You can pass a custom error message to the above functions by providing an additional parameter `string err`.
