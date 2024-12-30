## General Limitations

These limitations apply at all times when working within the ZKsync context.

### Reserved Address Range

On zkEVM, addresses in the range [0..2^16-1] are [reserved](https://docs.zksync.io/zk-stack/components/zksync-evm/bootloader#system-contracts) for kernel space. Using these addresses within a test, even for mocking, may lead to undefined behavior.
Therefore, the user addresses must range from `65536` onwards.

```solidity
contract FooTest is Test {
    function testFoo() public {
        vm.mockCall(
            address(0),     // invalid
            abi.encodeWithSelector(bytes4(keccak256("number()"))),
            abi.encode(5)
        );

        vm.mockCall(
            address(65536),     // valid
            abi.encodeWithSelector(bytes4(keccak256("number()"))),
            abi.encode(5)
        );
    }
}
```

Additionally, during fuzz-testing, these addresses must be ignored. This can be done via either asserting `vm.assume(address(value) >= 65536)` or by setting `no_zksync_reserved_addresses = true` in fuzz configuration.


### Origin Address

While foundry allows mocking the `tx.origin` address as normal, zkEVM will fail all calls to it. As such, the following code will not work:


```solidity
library IFooBar {
    function number() return (uint8);
}

contract FooTest is Test {
    function testFoo() public {
        address target = tx.origin;

        vm.mockCall(
            address(target),     // invalid
            abi.encodeWithSelector(bytes4(keccak256("number()"))),
            abi.encode(5)
        );

        IFooBar(target).number() // will fail
    }
}
```


### Bytecode Constraints

zkEVM asserts a [bytecode](https://docs.zksync.io/zk-stack/components/zksync-evm/bootloader#bytecode-validity) to be valid if it satisfies the following constraints:

* Its length in bytes is divisible by 32 (i.e. 32-byte words).
* Has a length of less than 2^16 words.
* Has an odd length in words.

```solidity
contract FooTest is Test {
    function testFoo() public {
        // invalid, word-size of 1 byte
        vm.etch(address(65536), hex"00");

        // invalid, even number of words
        vm.etch(
            address(65536), 
            hex"00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
        );

        // valid, 32-byte word, odd number of words
        vm.etch(
            address(65536), 
            hex"0000000000000000000000000000000000000000000000000000000000000000"
        );

    }
}
```

### Bytecode Hash

Bytecode hashes output by zksolc are fundamentally [different](https://docs.zksync.io/zk-stack/components/zksync-evm/bootloader#bytecode-hashes) from the hash obtained via solc. The most glaring difference is that the first (most significant) byte denotes the version of the format, which is `1` at present. This leads to all zksolc bytecode hashes to begin with `1`, whereas solc bytecodes are merely the keccak hash of the bytecode.

Any code-making assumptions about bytecode hashes around EVM-scope must be migrated to accommodate ZKsync's bytecode hashes.

### Address Derivation

zkEVM uses a different `CREATE` and `CREATE2` [address derivation strategy](https://docs.zksync.io/build/developer-reference/ethereum-differences/evm-instructions#address-derivation) compared to EVM. 
This can lead to testing issues with the `CREATE2` addresses that are hard-coded for EVM. Therefore, these tests must be updated to reflect the ZKsync-derived addresses.

```javascript
function create2Address(sender: Address, bytecodeHash: BytesLike, salt: BytesLike, input: BytesLike) {
  const prefix = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("zksyncCreate2"));
  const inputHash = ethers.utils.keccak256(input);
  const addressBytes = ethers.utils.keccak256(ethers.utils.concat([prefix, ethers.utils.zeroPad(sender, 32), salt, bytecodeHash, inputHash])).slice(26);
  return ethers.utils.getAddress(addressBytes);
}

function createAddress(sender: Address, senderNonce: BigNumberish) {
  const prefix = ethers.utils.keccak256(ethers.utils.toUtf8Bytes("zksyncCreate"));
  const addressBytes = ethers.utils
    .keccak256(ethers.utils.concat([prefix, ethers.utils.zeroPad(sender, 32), ethers.utils.zeroPad(ethers.utils.hexlify(senderNonce), 32)]))
    .slice(26);

  return ethers.utils.getAddress(addressBytes);
}
```

### Accessing Contract Bytecode and Hash

zkEVM does not allow obtaining bytecodes from `address.code` or computing their respective hashes, which will be raised as an error during [compilation](./compilation.md#contract-bytecode-access). This is particularly useful when computing CREATE2 addresses.

To circumvent this limitation, it is recommended to use the FFI functionality of cheatcodes: 

```solidity
contract Calculator {
    function add(uint8 a, uint8 b) return (uint8) {
        return a+b;
    }
}

contract FooTest is Test {
    function testFoo() public {
        string memory artifact = vm.readFile(
            "zkout/FooTest.sol/Calculator.json"
        );
        bytes32 bytecodeHash = vm.parseJsonBytes32(artifact, ".hash");
        bytes32 salt = 0x0000000000000000000000000000000000000001;
        
        ISystemContractDeployer deployer = ISystemContractDeployer(
            address(0x0000000000000000000000000000000000008006)
        );
        address addr = deployer.getNewAddressCreate2(
            address(this),
            salt,
            bytecodeHash,
            ""
        );
    }
}
```

Note that this requires adding read permissions in `foundry.toml`:

```toml
[profile.default]
...
fs_permissions = [{ access = "read", path = "./zkout/FooTest.sol/Calculator.json"}]
```