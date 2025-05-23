## `etch`

### Signature

```solidity
function etch(address who, bytes calldata code) external;
```

### Description

Sets the bytecode of an address `who` to `code`.

### Examples

```solidity
bytes memory code = address(awesomeContract).code;
address targetAddr = makeAddr("target");
vm.etch(targetAddr, code);
log_bytes(address(targetAddr).code); // 0x6080604052348015610010...
```

#### Using `vm.etch` for enabling custom precompiles

Some chains, like Blast or Arbitrum, run with custom precompiles. Foundry is operating on vanilla EVM and is not aware of those. If you are encountering reverts due to not available precompile, you can use `vm.etch` cheatcode to inject mock of the missing precompile to the address it is expected to appear at.

```solidity
{{#include ../../projects/cheatcodes/test/BlastMock.t.sol:all}}
```

<div class="warning">

Injecting mocks of precompiles might be tricky as such mocks will not fully emulate the actual precompile behavior on-chain.

Mock in the case above will not cause the actual yield to be accrued if any yield mode is configured.

</div>


### SEE ALSO

Forge Standard Library

- [`deployCode`](../reference/forge-std/deployCode.md)
- [`deployCodeTo`](../reference/forge-std/deployCodeTo.md) 