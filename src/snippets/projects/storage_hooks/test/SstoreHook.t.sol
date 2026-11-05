// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {HookVm} from "./HookVm.sol";
import {Vault} from "../src/Vault.sol";

contract SstoreHookTest {
    HookVm constant vm = HookVm(address(uint160(uint256(keccak256("hevm cheat code")))));
    Vault vault;
    uint256 writes;
    bytes32 lastSlot;
    bytes32 lastValue;

    function setUp() public {
        vault = new Vault();
        vm.registerSstoreHook(address(vault), this.onStore.selector);
    }

    function onStore(address, bytes32 slot, bytes32, bytes32 newValue) external {
        require(msg.sender == address(vm), "only storage hook");
        writes++;
        lastSlot = slot;
        lastValue = newValue;
    }

    function testSeesWrites() public {
        vault.deposit{value: 1 ether}();
        // One write to the balance mapping, then one to `total` (slot 0).
        vm.assertEq(writes, 2);
        vm.assertEq(lastSlot, bytes32(uint256(0)));
        vm.assertEq(uint256(lastValue), 1 ether);
    }
}
