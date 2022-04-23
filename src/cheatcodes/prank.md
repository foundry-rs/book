## `prank`

### Signature

```solidity
function prank(address) external;
```

```solidity
function prank(address sender, address origin) external;
```

### Description

Sets `msg.sender` to the specified address **for the next call**. "The next call" includes static calls as well, but not calls to the cheat code address.

If the alternative signature of `prank` is used, then `tx.origin` is set as well for the next call.

### Examples

```solidity
/// function withdraw() public {
///     require(msg.sender == owner);

vm.prank(owner);
myContract.withdraw(); // [PASS]
```

### See also

Forge Standard Library:

- [`hoax`](../reference/forge-std/hoax.md)