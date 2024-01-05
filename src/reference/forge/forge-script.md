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

`--skip`  
&nbsp;&nbsp;&nbsp;&nbsp;Skip compilation of non-essential contract directories like test or script (usage `--skip test`).

`--non-interactive`  
&nbsp;&nbsp;&nbsp;&nbsp;Remove interactive prompts which appear if the contract is near the [EIP-170](https://eips.ethereum.org/EIPS/eip-170) size limit.

`--slow`  
&nbsp;&nbsp;&nbsp;&nbsp;Makes sure a transaction is sent, only after its previous one has been confirmed and succeeded.


`--target-contract` *contract_name*  
&nbsp;&nbsp;&nbsp;&nbsp;The name of the contract you want to run.

`--priority-gas-price`  
&nbsp;&nbsp;&nbsp;&nbsp;Sets the priority gas price for EIP1559 transactions. Useful for when gas prices are volatile and you want to get your transaction included.

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
        -vvv --fork-url $SEPOLIA_RPC_URL
    ```

2. Deploy a contract on Polygon [(see scripting tutorial for an example script)](../../tutorials/solidity-scripting.md). *The verifier url is different for every network.*
    ```sh
    forge script script/NFT.s.sol:MyScript --chain-id 137 --rpc-url $RPC_URL \
        --etherscan-api-key $POLYGONSCAN_API_KEY --verifier-url https://api.polygonscan.com/api \
        --broadcast --verify -vvvv
    ```

3. Resume a failed script. Using the above as an example, remove `--broadcast` add `--resume`
    ```sh
    forge script script/NFT.s.sol:MyScript --chain-id 137 --rpc-url $RPC_URL \
        --etherscan-api-key $POLYGONSCAN_API_KEY --verifier-url https://api.polygonscan.com/api \
        --verify -vvvv --resume
    ```

4. Verify contracts that were just deployed with a script
    ```sh
    forge script script/NFT.s.sol --rpc-url $RPC_URL --verify --resume
    ```

[debugger]: ../../forge/debugger.md
