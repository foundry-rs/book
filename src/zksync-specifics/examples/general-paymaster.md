## Using the zkUsePaymaster Cheatcode in General Flow Paymaster Contracts

This example covers the use of a general flow paymaster contract. 
For this example we will use a contract from the paymaster example repository [here](https://github.com/matter-labs/paymaster-examples).

The contract we are going to use is the `GaslessPaymaster` contract.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@matterlabs/era-contracts/interfaces/IPaymaster.sol";
import "@matterlabs/era-contracts/interfaces/IPaymasterFlow.sol";
import "@matterlabs/era-contracts/Constants.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @author Matter Labs
/// @notice This contract does not include any validations other than using the paymaster general flow.
contract GaslessPaymaster is IPaymaster, Ownable {
    constructor() Ownable(msg.sender) {}

    modifier onlyBootloader() {
        require(
            msg.sender == BOOTLOADER_FORMAL_ADDRESS,
            "Only bootloader can call this method"
        );
        // Continue execution if called from the bootloader.
        _;
    }

    function validateAndPayForPaymasterTransaction(
        bytes32,
        bytes32,
        Transaction calldata _transaction
    )
        external
        payable
        onlyBootloader
        returns (bytes4 magic, bytes memory context)
    {
        // By default we consider the transaction as accepted.
        magic = PAYMASTER_VALIDATION_SUCCESS_MAGIC;
        require(
            _transaction.paymasterInput.length >= 4,
            "The standard paymaster input must be at least 4 bytes long"
        );

        bytes4 paymasterInputSelector = bytes4(
            _transaction.paymasterInput[0:4]
        );
        if (paymasterInputSelector == IPaymasterFlow.general.selector) {
            // Note, that while the minimal amount of ETH needed is tx.gasPrice * tx.gasLimit,
            // neither paymaster nor account are allowed to access this context variable.
            uint256 requiredETH = _transaction.gasLimit *
                _transaction.maxFeePerGas;
            // The bootloader never returns any data, so it can safely be ignored here.
            (bool success, ) = payable(BOOTLOADER_FORMAL_ADDRESS).call{
                value: requiredETH
            }("");
            require(
                success,
                "Failed to transfer tx fee to the Bootloader. Paymaster balance might not be enough."
            );
        } else {
            revert("Unsupported paymaster flow in paymasterParams.");
        }
    }

    function postTransaction(
        bytes calldata _context,
        Transaction calldata _transaction,
        bytes32,
        bytes32,
        ExecutionResult _txResult,
        uint256 _maxRefundedGas
    ) external payable override onlyBootloader {
        // Refunds are not supported yet.
    }

    function withdraw(address payable _to) external onlyOwner {
        // send paymaster funds to the owner
        uint256 balance = address(this).balance;
        (bool success, ) = _to.call{value: balance}("");
        require(success, "Failed to withdraw funds from paymaster.");
    }

    receive() external payable {}
}
```

This contract is a general flow paymaster, which means that it can pay for any account. To be able to use this paymaster we need to first deploy it in the intended network.

For this example we will deploy it in the era-test-node and then use the `zkUsePaymaster` cheatcode to pay for a transaction using a script.

```solidity
pragma solidity ^0.8.0;

import {Script} from "forge-std/Script.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "../src/GeneralPaymaster.sol";
// We need to import the TestExt to use the zkUsePaymaster cheatcode
// as this is a ZKsync specific cheatcode
import "../src/Counter.sol";
import {TestExt} from "forge-zksync-std/TestExt.sol";

contract PaymasterUsageScript is Script, TestExt {
    Counter public counter;

    function run() public {
        vm.startBroadcast();

        GaslessPaymaster paymaster = new GaslessPaymaster();

        // fund the paymaster
        address(paymaster).call{value: 0.05 ether}("");

        bytes memory paymaster_encoded_input = abi.encodeWithSelector(
            bytes4(keccak256("general(bytes)")),
            bytes("0x")
        );
        vmExt.zkUsePaymaster(
            address(paymaster),
            paymaster_encoded_input
        );

        counter = new Counter();

        vm.stopBroadcast();
    }
}
```

The key part of this script is encoding the paymaster call with the `general(bytes)` selector and then using the `zkUsePaymaster` cheatcode to pay for the transaction. This will vary depending on the paymaster contract that you are using.

```solidity
        // This is the encoding for the GaslessPaymaster
        bytes memory paymaster_encoded_input = abi.encodeWithSelector(
            bytes4(keccak256("general(bytes)")),
            bytes("0x")
        );

        // Using the encoded parameters to call the zkUsePaymaster cheatcode
        vmExt.zkUsePaymaster(
            address(paymaster),
            paymaster_encoded_input
        );
```
After calling the `zkUsePaymaster` cheatcode, the paymaster will pay for the following transaction.


