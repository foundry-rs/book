## Gas

### Gas reported back to the EVM
Foundry has an `isolate` mode for the EVM where all `CALL`/`CREATE` operations at the root level of a test (i.e: with depth 1) will be intercepted and treated as independent transactions. This allows for accounting of the actual transaction gas and include for example the fixed 21000 gas cost charged to the user.

Running in zkEVM mode is anologous to running in `isolate` mode but using the zkEVM instead. Every `CALL`/`CREATE` will be intercepted, a transaction representing the operation built, and finally a VM with that transaction in the bootloader's heap will be spawned and run in order to simulate the execution of that transaction. The gas used reported back to the EVM, and hence the one seen on traces and gas-reports, is what would be charged to the user for submitting that transaction. That value differs from the computational cost of running the called contract code and includes: 

  1. Intrinsic costs: Overhead charged on each transaction.
  2. Validation costs: Gas spent on transaction validation. May vary depending on the account making the transaction. See [Account Abstraction](https://docs.zksync.io/build/developer-reference/account-abstraction) docs.
  3. Execution costs: Gas spent on marking factory deps and executing the transaction.
  4. Pubdata costs: Gas spent on publishing pubdata, is influenced by the `gasPerPubdata` network value.

More info about ZKSync Era's fee model can be found [here](https://docs.zksync.io/build/developer-reference/fee-model).

### Transaction/Network values that impact gas cost
The gas cost mentioned above is influenced by transaction and network values. The values are set when running the VM in the following way:

1. Transaction Params:

* `max_fee_per_gas`: will be gas price of the root evm transaction (e.g: when running tests, the value of `--gas-price` option is used) with a minimum value of `0.26GWei`, which is the base fee used in some test environments/networks.
* `gas_limit`: The sender remaining balance capped to a max of `2^31 - 1`. Note that, no matter the gas limit, the vm caps how much gas a single transaction can use to `MAX_GAS_PER_TRANSACTION`, currently set to `80_000_000`.

2. Network Params:

* `fair_l2_gas_price`: set to the minumum of `max_fee_per_gas` and the base fee of the root evm transaction (e.g: when running tests, the value of the `--base-fee` option).
* `l1_gas_price`: set to the same as `fair_l2_gas_price`, with a minimum value of `1000`.

#### Deriving relevant transaction gas values

From the params above we can get all gas related values used in the transaction:

* `fair_pubdata_price`: `l1_gas_price` * `L1_GAS_PER_PUBDATA_BYTE`. 
* `baseFee`: Maximum value between `fair_l2_gas_price` and `(fair_pubdata_price / MAX_L2_GAS_PER_PUBDATA)`.
* `gasPerPubdata`: `fairPubdataPrice / baseFee`.

`L1_GAS_PER_PUBDATA_BYTE` and `MAX_L2_GAS_PER_PUBDATA` are system constants currently set to `17` and `50_000` respectively.
