// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";

contract CheckBalances is Script {
    struct Check {
        address account;
        uint256 minBalance;
    }

    error NoChecks();

    /// Returns how many accounts are below their minimum balance.
    function run(Check[] calldata checks) external view returns (uint256 low) {
        if (checks.length == 0) revert NoChecks();
        for (uint256 i; i < checks.length; i++) {
            if (checks[i].account.balance < checks[i].minBalance) {
                console.log("below minimum:", checks[i].account);
                low++;
            }
        }
    }
}
