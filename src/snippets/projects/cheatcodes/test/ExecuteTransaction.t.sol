// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";

contract ExecuteTransactionTest is Test {
    // [!region execute]
    function testExecuteSignedTransaction() public {
        address sender = 0x5316812db67073C4d4af8BB3000C5B86c2877e94;
        address recipient = 0x6Fd0A0CFF9A87aDF51695b40b4fA267855a8F4c6;

        vm.chainId(1);
        vm.deal(sender, 1 ether);

        bytes memory rawTx =
            hex"f860806483030d40946fd0a0cff9a87adf51695b40b4fa267855a8f4c6118025a03ebeabbcfe43c2c982e99b376b5fb6e765059d7f215533c8751218cac99bbd80a00a56cf5c382442466770a756e81272d06005c9e90fb8dbc5b53af499d5aca856";
        bytes memory output = vm.executeTransaction(rawTx);

        assertEq(output.length, 0);
        assertEq(sender.balance, 1 ether - 17);
        assertEq(recipient.balance, 17);
        assertEq(vm.getNonce(sender), 1);
    }
    // [!endregion execute]
}
