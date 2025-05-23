## cast mktx

### NAME

cast-mktx - Build and sign a transaction.

### SYNOPSIS

``cast mktx`` [*options*] *to* [*sig*] [*args...*]

### DESCRIPTION

Build and sign a transaction, without publishing it.

The destination (*to*) can be an ENS name or an address.

{{#include sig-description.md}}

### OPTIONS

{{#include ../common/transaction-options.md}}

`--create` *code* [*sig* *args...*]  
&nbsp;&nbsp;&nbsp;&nbsp;Deploy a contract by specifying raw bytecode, in place of specifying a *to* address.

{{#include ../common/wallet-options-raw.md}}

{{#include ../common/wallet-options-keystore.md}}

{{#include ../common/wallet-options-hardware.md}}

{{#include ../common/rpc-options.md}}

{{#include ../common/etherscan-options.md}}

{{#include common-options.md}}

### EXAMPLES

1. Sign a transaction that sends some ether to Vitalik using your Ledger:
    ```sh
    cast mktx --ledger vitalik.eth --value 0.1ether
    ```

2. Sign a transaction that calls `deposit(address token, uint256 amount)` on a contract:
    ```sh
    cast mktx --ledger 0x... "deposit(address,uint256)" 0x... 1
    ```

3. Sign a transaction that calls a function that expects a `struct`:

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
    cast mktx 0x... "myfunction((address,uint256))" "(0x...,1)"
    ```

4. Sign a transaction with hex data in the `input` field of the transaction object:
    ```sh
    cast mktx 0x... 0x68656c6c6f20776f726c64
    ```

### SEE ALSO

[cast](./cast.md), [cast publish](./cast-publish.md), [cast send](./cast-send.md), [struct encoding](../../misc/struct-encoding.md)
