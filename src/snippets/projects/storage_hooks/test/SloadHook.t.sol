// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {HookVm} from "./HookVm.sol";
import {Vault} from "../src/Vault.sol";

contract SloadHookTest {
    HookVm constant vm = HookVm(address(uint160(uint256(keccak256("hevm cheat code")))));
    Vault vault;
    uint256 loads;
    bytes32 lastSlot;

    function setUp() public {
        vault = new Vault();
        vm.registerSloadHook(address(vault), this.onLoad.selector);
    }

    function onLoad(address, bytes32 slot, bytes32) external {
        require(msg.sender == address(vm), "only storage hook");
        loads++;
        lastSlot = slot;
    }

    function testCountsLoads() public {
        vault.total();
        vm.assertEq(loads, 1);
        vm.assertEq(lastSlot, bytes32(uint256(0)));
    }
}
