## forge verify-check

### NAME

forge-verify-check - Check verification status on a chosen verification provider.

### SYNOPSIS

``forge verify-check`` [*options*] *id* [*etherscan_key*]

The *id* is the verification identifier. For Etherscan & Bloxroute - it is the submission GUID, for Sourcify - it's the contract address.

### DESCRIPTION

Check verification status on a chosen verification provider.

For Etherscan, you must provide an Etherscan API key, either by passing it as an argument or setting `ETHERSCAN_API_KEY`

### OPTIONS

#### Verify Contract Options

{{#include ../common/verifier-options.md}}

`--chain-id` *chain_id*  
&nbsp;&nbsp;&nbsp;&nbsp;The chain ID the contract is deployed to (either a number or a chain name).  
&nbsp;&nbsp;&nbsp;&nbsp;Default: mainnet

{{#include ../common/retry-options.md}}

{{#include common-options.md}}

### SEE ALSO

[forge](./forge.md), [forge create](./forge-create.md), [forge verify-contract](./forge-verify-contract.md)
