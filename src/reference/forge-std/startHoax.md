## `startHoax`

### Signature

```solidity
function startHoax(address who) public;
```

```solidity
function startHoax(address who, uint256 give) public;
```

```solidity
function startHoax(address who, address origin) public;
```

```solidity
function startHoax(address who, address origin, uint256 give) public;
```

### Description

Start a [perpetual `prank`](../../cheatcodes/start-prank.md) from an address that has some ether.

If the balance is not specified, it will be set to 2^128 wei.