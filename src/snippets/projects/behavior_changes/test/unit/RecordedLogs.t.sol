// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {Base, Vm} from "../Vm.sol";
import {Vault} from "../../src/Vault.sol";

contract RecordedLogsTest is Base {
    Vault vault = new Vault(1_000);

    // [!region logs]
    function test_revertedDepositLeavesNoLog() public {
        vm.recordLogs();
        try vault.deposit(500) {} catch {} // emits Deposited, then reverts
        vault.deposit(50);

        Vm.Log[] memory logs = vm.getRecordedLogs();
        // 1.8: 2 logs, the reverted call's included. 1.9 and later: 1.
        assertEq(logs.length, 1);
    }
    // [!endregion logs]
}
