// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {Vault} from "../src/Vault.sol";
import {SlotVm} from "./SlotVm.sol";

contract GetStorageSlotTest {
    SlotVm constant vm = SlotVm(address(uint160(uint256(keccak256("hevm cheat code")))));
    Vault vault;

    function setUp() public {
        vault = new Vault();
    }

    // [!region packed]
    function test_overwritePackedVariable() public {
        vault.setFee(1_700_000_000, 30);

        (uint256 slot, uint256 offset, uint256 numberOfBytes) = vm.getStorageSlot(address(vault), "feeBps");
        vm.assertEq(slot, 1);
        vm.assertEq(offset, 8);
        vm.assertEq(numberOfBytes, 8);

        // Replace only `feeBps` in the shared slot.
        uint256 mask = ((1 << (numberOfBytes * 8)) - 1) << (offset * 8);
        uint256 word = uint256(vm.load(address(vault), bytes32(slot)));
        word = (word & ~mask) | (uint256(500) << (offset * 8));
        vm.store(address(vault), bytes32(slot), bytes32(word));

        vm.assertEq(vault.feeBps(), 500);
        vm.assertEq(vault.lastUpdate(), 1_700_000_000);
    }
    // [!endregion packed]

    // [!region mapping]
    function test_mappingEntry() public {
        (uint256 slot,,) = vm.getStorageSlot(address(vault), "balances");
        vm.assertEq(slot, 2);

        // An entry of `balances` lives at keccak256(key . slot).
        address user = address(0xBEEF);
        vm.store(address(vault), keccak256(abi.encode(user, slot)), bytes32(uint256(1 ether)));
        vm.assertEq(vault.balances(user), 1 ether);
    }
    // [!endregion mapping]

    // [!region namespace]
    function test_namespacedField() public view {
        (uint256 slot, uint256 offset, uint256 numberOfBytes) =
            vm.getStorageSlot(address(vault), "example.vault.config.paused");

        // ERC-7201 root: keccak256(abi.encode(uint256(keccak256(id)) - 1)) & ~0xff
        uint256 root =
            uint256(keccak256(abi.encode(uint256(keccak256("example.vault.config")) - 1))) & ~uint256(0xff);
        vm.assertEq(slot, root);
        vm.assertEq(offset, 20);
        vm.assertEq(numberOfBytes, 1);
    }
    // [!endregion namespace]
}
