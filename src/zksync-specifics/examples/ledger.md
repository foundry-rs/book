## Using a Ledger device

This example shows how to use a Ledger device to interact with ZKsync network.

### Steps Overview

1. Enable blind signing in the Ethereum App.
2. Deploy a custom Paymaster contract using `forge create --ledger`.
3. Fund the paymaster using `cast send --ledger`.
4. Deploy a `Counter` contract using the paymaster with `forge script --ledger`

> Note that the steps showcase different usages of `--ledger` and do not necessarily indicate the best practices for executing a similar flow.

### Step-by-Step

#### Enable blind signing in the Ethereum App

To use the device, one must first enable "Blind Signing" in the Ethereum App.
To do so, open the app on the device, navigate to "Settings", and then to "Blind signing". Toggle the option so that it is "Enabled".

#### Custom paymaster deployment with `forge create`

We will be deploying the `MyPaymaster` contract introduced in [`zkUsePaymaster` cheatcode](../../cheatcodes/zk-use-paymaster.md):

```sh
forge create ./src/MyPaymaster.sol:MyPaymaster --rpc-url {RPC_URL} --ledger --zksync
```

Proceed on your device to sign the transaction.

Take note of the resulting deployment address displayed on your terminal, henceforth referred to as `$PAYMASTER_ADDRESS`.

#### Paymaster funding with `cast send`

To ensure the paymaster has sufficient funds to pay for our transactions, we'll be funding it with some base token:

```sh
cast send $PAYMASTER_ADDRESS --value 0.1ether --rpc-url $RPC_URL --ledger
```

Again, proceed to sign the transaction on your device.

#### Contract deployment with `forge script`

We will be deploying a `Counter` contract using the paymaster from within a script using:

```solidity
vmExt.zkUsePaymaster(vm.envAddress("PAYMASTER_ADDRESS"),
                  abi.encodeWithSelector(
                       bytes4(keccak256("general(bytes)")),
                       bytes("0x")
                  ));
Counter cnt = new Counter();
```

We can now execute the script using `forge script --ledger`:

```sh
forge script ./scripts/Counter.s.sol --zksync --rpc-url $RPC_URL --broadcast --slow --ledger
```

In this case, proceed to sign on your device the single broadcastable transaction generated for the deployment.
When broadcasting multiple transactions, a proportionate number of signatures is necessary.

### Complete code

The following is the full script and source code referenced in this document:

```solidity
import {Script} from "forge-std/Script.sol";
import {TestExt} from "forge-zksync-std/TestExt.sol";

contract Counter {
    uint256 public count = 0;

    function increment() public {
        count++;
    }

    function getCount() public view returns (uint256) {
        return count;
    }
}

contract CounterScript is Script, TestExt {
    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        vmExt.zkUsePaymaster(vm.envAddress("PAYMASTER_ADDRESS"),
                          abi.encodeWithSelector(
                              bytes4(keccak256("general(bytes)")),
                              bytes("0x")
                          ));
        Counter cnt = new Counter();

        vm.stopBroadcast();
    }
}
```
