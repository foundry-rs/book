---
description: Understanding gas reporting and fee model in Foundry-ZKsync including transaction and network parameters.
---

# Gas Overview

## Gas reported back to the EVM

Foundry has an `isolate` mode for the EVM, in which all `CALL`/`CREATE` operations at the root level of a test (i.e., with depth 1) are intercepted and treated as independent transactions. This allows for accounting for the actual transaction gas, including, for example, the fixed 21000 gas cost charged to the user.

Running in zkEVM mode is analogous to running in `isolate` mode, but using the zkEVM instead. Here's a short summary:

- Every `CALL`/`CREATE` will be intercepted and a zkEVM transaction representing the operation built.
- A VM with that transaction in the bootloader's heap will be spawned and run to simulate the execution of that transaction.
- The gas used is reported back to the EVM so it will then be shown on traces and gas reports. This value represents what would be charged to the user for submitting that transaction. That value differs from the computational cost of running the called contract code and includes:

  1. **Intrinsic costs**: Overhead charged on each transaction.
  2. **Validation costs**: Gas spent on transaction validation. It may vary depending on the account making the transaction. See [Account Abstraction](https://docs.zksync.io/zksync-protocol/account-abstraction) docs.
  3. **Execution costs**: Gas spent on marking factory dependencies and executing the transaction.
  4. **Pubdata costs**: Gas spent on publishing pubdata. It is influenced by the `gasPerPubdata` network value.

More info about ZKSync Era's fee model can be found [here](https://docs.zksync.io/zksync-protocol/era-vm/transactions/fee-model).

## Transaction/Network values that impact gas cost

The gas cost mentioned above is influenced by transaction and network values. The values are set when running the VM in the following way:

1. Transaction Params:

- `max_fee_per_gas`: will be the gas price of the root EVM transaction (e.g., when running tests, the value of `--gas-price` option is used) with a minimum value of `0.26GWei`, which is the base fee used in some test environments/networks.
- `gas_limit`: The sender remaining balance capped to a max of `2^31 - 1`. No matter the gas limit, the vm caps how much gas a single transaction can use to `MAX_GAS_PER_TRANSACTION`, currently set to `80_000_000`.

2. Network Params:

- `fair_l2_gas_price`: set to the minimum of `max_fee_per_gas` and the base fee of the root EVM transaction (e.g., when running tests, the value of the `--base-fee` option).
- `l1_gas_price`: set to the same as `fair_l2_gas_price`, with a minimum value of `1000`.

### Deriving relevant transaction gas values

From the params above, we can get all gas-related values used in the transaction:

- `fair_pubdata_price`: `l1_gas_price` \* `L1_GAS_PER_PUBDATA_BYTE`.
- `baseFee`: Maximum value between `fair_l2_gas_price` and `(fair_pubdata_price / MAX_L2_GAS_PER_PUBDATA)`.
- `gasPerPubdata`: `fairPubdataPrice / baseFee`.

`L1_GAS_PER_PUBDATA_BYTE` and `MAX_L2_GAS_PER_PUBDATA` are system constants currently set to `17` and `50_000`, respectively.

### Customizing gas values
Some gas parameters can be customized when broadcasting transactions with `forge script` by using the following flags:

* `--with-gas-price-price`: sets `max_fee_per_gas` to be used in the transaction.
* `--priority-gas-price`: sets `max_priority_fee_per_gas` to be used in the transaction.
* `--zk-gas-per-pubdata`: sets `gasPerPubdata` to be used in the transaction.

Example: 
```sh
forge script script/NFT.s.sol:MyScript --fork-url http://localhost:8545 --broadcast --with-gas-price-price 370000037 --priority-gas-price 10000 --zk-gas-per-pubdata 3241
```