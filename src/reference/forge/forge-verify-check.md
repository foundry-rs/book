## forge verify-check

### NAME

forge-verify-check - Check verification status on Etherscan.

### SYNOPSIS

``forge verify-check`` [*options*] *guid* [*etherscan_key*]

### DESCRIPTION

Check verification status on Etherscan.

You must provide an Etherscan API key, either by passing it as an argument or setting `ETHERSCAN_API_KEY`

### OPTIONS

#### Verify Contract Options

`--chain-id` *chain_id*  
&nbsp;&nbsp;&nbsp;&nbsp;The chain ID the contract is deployed to (either a number or a chain name).  
&nbsp;&nbsp;&nbsp;&nbsp;Default: mainnet

{{#include common-options.md}}

### SEE ALSO

[forge](./forge.md), [forge create](./forge-create.md), [forge verify-contract](./forge-verify-contract.md)
