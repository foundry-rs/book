## `assertEq`

### Signature

```solidity
function assertEq(bool a, bool b) internal;
```

```solidity
function assertEq(bool a, bool b, string memory err) internal;
```

```solidity
function assertEq(bytes memory a, bytes memory b) internal;
```

```solidity
function assertEq(bytes memory a, bytes memory b, string memory err) internal;
```

```solidity
function assertEq(uint256[] memory a, uint256[] memory b) internal;
```

```solidity
function assertEq(int256[] memory a, int256[] memory b) internal;
```

```solidity
function assertEq(uint256[] memory a, uint256[] memory b, string memory err) internal;
```

```solidity
function assertEq(int256[] memory a, int256[] memory b, string memory err) internal;
```

### Description

Asserts `a` is equal to `b`.

Works with `bool`, `bytes`, and `int256` and `uint256` arrays.