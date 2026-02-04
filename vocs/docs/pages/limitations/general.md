---
description: General limitations when working within the ZKsync context in foundry-zksync.
---

# General Limitations

These limitations apply at all times when working within the ZKsync context.

## Reserved Address Range

On zkEVM, addresses in the range [0..2^16-1] are [reserved](https://docs.zksync.io/zksync-protocol/era-vm/contracts/system-contracts) for kernel space. Using these addresses within a test, even for mocking, may lead to undefined behavior.
Therefore, the user addresses must range from `65536` onwards.

```solidity
contract FooTest is Test {
    function testReservedAddress_Invalid() public {
        vm.mockCall(
            address(0),     // invalid
            abi.encodeWithSelector(bytes4(keccak256("number()"))),
            abi.encode(5)
        );
    }
}
```

```solidity
contract FooTest is Test {
    function testReservedAddress_Valid() public {
        vm.mockCall(
            address(65536),     // validz
            abi.encodeWithSelector(bytes4(keccak256("number()"))),
            abi.encode(5)
        );
    }
}
```

Additionally, during fuzz-testing, these addresses must be ignored. This can be done via either asserting `vm.assume(address(value) >= 65536)` or by setting `no_zksync_reserved_addresses = true` in fuzz configuration.

## Origin Address

While foundry allows mocking the `tx.origin` address as normal, zkEVM will fail all calls to it. As such, the following code will not work:

```solidity
library IFooBar {
    function number() return (uint8);
}

contract FooTest is Test {
    function testOriginAddress() public {
        address target = tx.origin;

        vm.mockCall(
            address(target),     // invalid
            abi.encodeWithSelector(IFooBar.number.selector),
            abi.encode(5)
        );

        uint8 result = IFooBar(target).number();
        assertEq(result, 5);
    }
}
```

## Precompiles

ZKsync does not support Ethereum precompiles in the same way as EVM. Some precompiles may behave differently or not be available at all in the zkEVM context.