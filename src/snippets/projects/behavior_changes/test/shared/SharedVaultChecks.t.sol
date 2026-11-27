// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {Base} from "../Vm.sol";
import {Vault} from "../../src/Vault.sol";

// [!region shared]
// Outside `test = "test/unit"`, so it does not run as a suite on its own.
contract SharedVaultChecks is Base {
    function test_startsEmpty() public {
        assertEq(new Vault(1_000).totalAssets(), 0);
    }
}
// [!endregion shared]
