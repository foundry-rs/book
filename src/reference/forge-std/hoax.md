## `hoax`

### Signature

```solidity
function hoax(address who) public;
```

```solidity
function hoax(address who, uint256 give) public;
```

```solidity
function hoax(address who, address origin) public;
```

```solidity
function hoax(address who, address origin, uint256 give) public;
```

### Description

Sets up a [`prank`](../../cheatcodes/prank.md) from an address that has some ether.

If the balance is not specified, it will be set to 2^128 wei.