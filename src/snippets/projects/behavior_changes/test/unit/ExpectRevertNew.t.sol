// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {Base} from "../Vm.sol";
import {Vault} from "../../src/Vault.sol";

contract ExpectRevertNewTest is Base {
    // [!region before]
    // Passes before 1.10.1, fails on 1.10.1.
    function test_RevertWhen_ZeroCap_thenDeposit() public {
        vm.expectRevert(bytes("zero cap"));
        new Vault(0);

        // Before 1.10.1 the test ended at `new`, so this never ran.
        Vault vault = new Vault(1_000);
        vault.deposit(500); // reverts: "too much"
    }
    // [!endregion before]

    // [!region after]
    function test_RevertWhen_ZeroCap() public {
        vm.expectRevert(bytes("zero cap"));
        new Vault(0);
    }

    function test_RevertWhen_DepositTooMuch() public {
        Vault vault = new Vault(1_000);
        vm.expectRevert(bytes("too much"));
        vault.deposit(500);
    }
    // [!endregion after]
}
