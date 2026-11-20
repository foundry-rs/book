// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {HookVm} from "./HookVm.sol";
import {Vault} from "../src/Vault.sol";

contract MappingSstoreHookTest {
    HookVm constant vm = HookVm(address(uint160(uint256(keccak256("hevm cheat code")))));
    Vault vault;
    mapping(address => uint256) ghostBalance;
    uint256 ghostSum;

    function setUp() public {
        vault = new Vault();
        // `balanceOf` is declared at slot 1 of Vault.
        vm.registerMappingSstoreHook(address(vault), bytes32(uint256(1)), this.onBalance.selector);
    }

    function onBalance(
        address,
        bytes32,
        bytes32,
        bytes32[] calldata keys,
        bytes32 oldValue,
        bytes32 newValue
    ) external {
        require(msg.sender == address(vm), "only storage hook");
        address owner = address(uint160(uint256(keys[0])));
        ghostBalance[owner] = uint256(newValue);
        ghostSum = ghostSum - uint256(oldValue) + uint256(newValue);
    }

    function testTracksBalances() public {
        vault.deposit{value: 3 ether}();
        vault.withdraw(1 ether);
        vm.assertEq(ghostBalance[address(this)], 2 ether);
        vm.assertEq(ghostSum, vault.total());
    }

    receive() external payable {}
}
