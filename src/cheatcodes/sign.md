## `sign`

### Signature

```solidity
function sign(uint256 privateKey, bytes32 digest) external returns (uint8 v, bytes32 r, bytes32 s);
```

### Description

Signs a digest `digest` with private key `privateKey`, returning `(v, r, s)`.

This is useful for testing functions that take signed data and perform an `ecrecover` to verify the signer.

### Examples

```solidity
address alice = vm.addr(1);
bytes32 hash = keccak256("Signed by Alice");
(uint8 v, bytes32 r, bytes32 s) = vm.sign(1, hash);
address signer = ecrecover(hash, v, r, s);
assertEq(alice, signer); // [PASS]
```
