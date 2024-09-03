## cast send

### NAME

cast-send - Sign and publish a transaction.

### SYNOPSIS

``cast send`` [*options*] *to* [*sig*] [*args...*]

### DESCRIPTION

Sign and publish a transaction.

The destination (*to*) can be an ENS name or an address.

{{#include sig-description.md}}

### OPTIONS

{{#include ../common/transaction-options.md}}

`--resend`  
&nbsp;&nbsp;&nbsp;&nbsp;Reuse the latest nonce of the sending account.

`--create` *code* [*sig* *args...*]  
&nbsp;&nbsp;&nbsp;&nbsp;Deploy a contract by specifying raw bytecode, in place of specifying a *to* address.

#### Receipt Options

`--async`  
`--cast-async`  
&nbsp;&nbsp;&nbsp;&nbsp;Do not wait for the transaction receipt if it does not exist yet.  
&nbsp;&nbsp;&nbsp;&nbsp;Environment: `CAST_ASYNC`

`-c` *confirmations*  
`--confirmations` *confirmations*  
&nbsp;&nbsp;&nbsp;&nbsp;Wait a number of confirmations before exiting. Default: `1`.

{{#include ../common/wallet-options.md}}

`--unlocked`  
&nbsp;&nbsp;&nbsp;&nbsp;Send via `eth_sendTransaction` using the `--from` argument or `$ETH_FROM` as sender.

{{#include ../common/rpc-options.md}}

{{#include ../common/etherscan-options.md}}

{{#include ../common/display-options.md}}

{{#include common-options.md}}

### EXAMPLES

1. Send some ether to Vitalik using your Ledger:
    ```sh
    cast send --ledger vitalik.eth --value 0.1ether
    ```

2. Call `deposit(address token, uint256 amount)` on a contract:
    ```sh
    cast send --ledger 0x... "deposit(address,uint256)" 0x... 1
    ```

3. Call a function that expects a `struct`:

    ```solidity
    contract Test {
        struct MyStruct {
            address addr;
            uint256 amount;
        }
        function myfunction(MyStruct memory t) public pure {}
    }
    ```

    Structs are encoded as tuples (see [struct encoding](../../misc/struct-encoding.md))

    ```sh
    cast send 0x... "myfunction((address,uint256))" "(0x...,1)"
    ```

4. Send a transaction with hex data in the `input` field of the transaction object:
    ```sh
    cast send 0x... 0x68656c6c6f20776f726c64
    ```

5. Sign an EIP-7702 authorization and attach it to a transaction from a different sender:
    ```sh
    cast send $(cast az) --private-key <sender-pk> --auth $(cast wallet sign-auth <address> --private-key <delegator-pk>)
    ```

6. Send an EIP-7702 transaction delegating the sender to `<address>`:
    ```sh
    cast send $(cast az) --auth <address>
    ```


### SEE ALSO

[cast](./cast.md), [cast call](./cast-call.md), [cast publish](./cast-publish.md), [cast receipt](./cast-receipt.md), [cast mktx](./cast-mktx.md), [struct encoding](../../misc/struct-encoding.md)
