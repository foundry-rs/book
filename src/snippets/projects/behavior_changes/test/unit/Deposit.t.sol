// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {Base} from "../Vm.sol";
import {Vault} from "../../src/Vault.sol";

contract DepositTest is Base {
    function test_deposit() public {
        Vault vault = new Vault(1_000);
        vault.deposit(50);
        assertEq(vault.totalAssets(), 50);
    }
}
