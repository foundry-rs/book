## forge upload-selectors

### NAME

forge-upload-selectors - Uploads abi of given contract to https://openchain.xyz/signatures function selector database.

### SYNOPSIS

`forge upload-selectors` [*options*] _contract_

### DESCRIPTION

Uploads abi of given contract to https://openchain.xyz/signatures function selector database.

### OPTIONS

{{#include project-options.md}}

{{#include common-options.md}}

### EXAMPLES

1. Upload ABI to selector database
   ```sh
   forge upload-selectors LinearVestingVault
   ```
