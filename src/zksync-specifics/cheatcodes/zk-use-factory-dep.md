## `zkUseFactoryDep`

### Signature

```solidity
function zkUseFactoryDep(string calldata name) external pure;
```

### Description

Enables marking a bytecode as a factory dependency for the next CREATE or CALL and cleared after.

This cheatcode is useful when deploying contracts through factories, as it allows marking bytecode as a factory dependency and deploying contracts by passing their bytecode hash to the factory.

### Examples

```solidity
contract Deployer {
    // Deploy the factory
    Factory factory = new Factory(multisigBytecodeHash);

    // Mark the bytecode as a factory dependency
    vmExt.zkUseFactoryDep("TwoUserMultisig");

    // Deploy the account using the factory
    factory.deployAccount(multisigBytecodeHash);
}
```
