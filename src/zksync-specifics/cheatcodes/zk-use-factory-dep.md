## `zkUseFactoryDep`

### Signature

```solidity
function zkUseFactoryDep(string calldata name) external pure;
```

### Description

Sets a flag on a given contract as a factory dependency only for the next `CREATE` or `CALL` operation, clearing the flag afterwards, similar to [`prank`](../../cheatcodes/prank.md).

This cheatcode is useful when deploying contracts through factories that do not directly depend on a given contract, as it allows explicitly marking this type of contract as a factory dependency, enabling the factory to deploy the contract.
More information on factory dependencies can be found in the [official ZKsync docs](https://docs.zksync.io/build/developer-reference/ethereum-differences/contract-deployment#note-on-factory_deps).

### Examples

```solidity
contract Deployer {
    // Factory does not directly depend on TwoUserMultisig, so we need to mark it explicitly
    // as a factory dependency to allow deployment through the factory
    // Deploy the factory
    Factory factory = new Factory(multisigBytecodeHash);

    // Mark the bytecode as a factory dependency
    vmExt.zkUseFactoryDep("TwoUserMultisig");

    // Deploy the account using the factory
    factory.deployAccount(multisigBytecodeHash);
}
```
