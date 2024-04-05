## forge inspect

### NAME

forge-inspect - Get specialized information about a smart contract

### SYNOPSIS

``forge inspect`` [*options*] *contract_name* *field*

### DESCRIPTION

Get specialized information about a smart contract.

The field to inspect (*field*) can be any of:

- `abi`
- `b`/`bytes`/`bytecode`
- `deployedBytecode`/`deployed_bytecode`/`deployed-bytecode`/`deployedbytecode`/`deployed`
- `assembly`/`asm`
- `asmOptimized`/`assemblyOptimized`/`assemblyoptimized`/`assembly_optimized`/`asmopt`/`assembly-optimized`/`asmo`/`asm-optimized`/`asmoptimized`/`asm_optimized`
- `methods`/`methodidentifiers`/`methodIdentifiers`/`method_identifiers`/`method-identifiers`/`mi`
- `gasEstimates`/`gas`/`gas_estimates`/`gas-estimates`/`gasestimates`
- `storageLayout`/`storage_layout`/`storage-layout`/`storagelayout`/`storage`
- `devdoc`/`dev-doc`/`devDoc`
- `ir`
- `ir-optimized`/`irOptimized`/`iroptimized`/`iro`/`iropt`
- `metadata`/`meta`
- `userdoc`/`userDoc`/`user-doc`
- `ewasm`/`e-wasm`
- `errors`
- `events`

### OPTIONS

`--pretty`  
&nbsp;&nbsp;&nbsp;&nbsp;Pretty print the selected field, if supported.

{{#include core-build-options.md}}

{{#include common-options.md}}

### EXAMPLES

1. Inspect the bytecode of a contract:
    ```sh
    forge inspect MyContract bytecode
    ```

2. Inspect the storage layout of a contract:
    ```sh
    forge inspect MyContract storage
    ```

3. Inspect the abi of a contract in a pretty format:
   ```sh
   forge inspect --pretty MyContract abi
   ```

### SEE ALSO

[forge](./forge.md), [forge build](./forge-build.md)
