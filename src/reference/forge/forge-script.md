## forge script

### NAME

forge-script - Run a smart contract as a script, building transactions that can be sent onchain.

### SYNOPSIS

``forge script`` [*options*] *path* [*args...*]

### DESCRIPTION


Run a smart contract as a script, building transactions that can be sent onchain.

Scripts can be used to apply state transitions on live contracts, or deploy and initialize a complex set of smart contracts using Solidity.

### OPTIONS

`--broadcast`  
&nbsp;&nbsp;&nbsp;&nbsp;Broadcasts the transactions.

`--debug`  
&nbsp;&nbsp;&nbsp;&nbsp;Open the script in the [debugger][debugger]. Takes precedence over broadcast.

`-g`  
`--gas-estimate-multiplier` *multiplier*  
&nbsp;&nbsp;&nbsp;&nbsp;Relative percentage by which to multiply all gas estimates. (i.e. set to 200 to double them)
&nbsp;&nbsp;&nbsp;&nbsp;Default: 130

`--json`  
&nbsp;&nbsp;&nbsp;&nbsp;Output results in JSON format.  
&nbsp;&nbsp;&nbsp;&nbsp;Note: The output is under development and prone to change.

`--legacy`  
&nbsp;&nbsp;&nbsp;&nbsp;Use legacy transactions instead of EIP1559 ones. This is auto-enabled for common networks without EIP1559.

`--resume`  
&nbsp;&nbsp;&nbsp;&nbsp;Resumes submitting transactions that failed or timed-out previously.

`-s`  
`--sig` *signature*  
&nbsp;&nbsp;&nbsp;&nbsp;The signature of the function you want to call in the contract, or raw calldata.  
&nbsp;&nbsp;&nbsp;&nbsp;Default: `run()`  

`--skip-simulation`  
&nbsp;&nbsp;&nbsp;&nbsp;Skips on-chain simulation.

`--slow`  
&nbsp;&nbsp;&nbsp;&nbsp;Makes sure a transaction is sent, only after its previous one has been confirmed and succeeded.

`--target-contract` *contract_name*  
&nbsp;&nbsp;&nbsp;&nbsp;The name of the contract you want to run.

`--with-gas-price` *price*  
&nbsp;&nbsp;&nbsp;&nbsp;Sets the gas price for **broadcasted** legacy transactions, or the max fee for broadcasted EIP1559 transactions.  
&nbsp;&nbsp;&nbsp;&nbsp;Note: To set the gas price in the execution environment of the script use `--gas-price` instead (see below).

{{#include ../common/etherscan-options.md}}

#### Verification Options

`--verify`  
&nbsp;&nbsp;&nbsp;&nbsp;If it finds a matching broadcast log, it tries to verify every contract found in the receipts.

{{#include ../common/verifier-options.md}}

{{#include ../common/retry-options.md}}

{{#include core-build-options.md}}

#### Build Options

`--names`  
&nbsp;&nbsp;&nbsp;&nbsp;Print compiled contract names.

`--sizes`  
&nbsp;&nbsp;&nbsp;&nbsp;Print compiled non-test contract sizes, exiting with code 1 if any of them are above the size limit.

{{#include watch-options.md}}

{{#include ../common/multi-wallet-options.md}}

{{#include evm-options.md}}

{{#include executor-options.md}}

{{#include common-options.md}}

### EXAMPLES

1. Run `BroadcastTest` as a script, broadcasting generated transactions on-chain
    ```sh
    forge script ./test/Broadcast.t.sol --tc BroadcastTest --sig "deploy()" \
                 -vvv --fork-url $GOERLI_RPC_URL
    ```

[debugger]: ../../forge/debugger.md
