// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.10;

import {Test} from "forge-std/Test.sol";

error Unauthorized();

contract Vault {
    address public immutable owner;

    constructor() {
        owner = msg.sender;
    }

    function withdraw() external view {
        if (msg.sender != owner) {
            revert Unauthorized();
        }
    }
}

contract VaultTest is Test {
    Vault vault;

    function setUp() public {
        vault = new Vault();
    }

    function test_WithdrawAsNotOwner() public {
        vm.prank(address(1));
        vault.withdraw();
    }
}
