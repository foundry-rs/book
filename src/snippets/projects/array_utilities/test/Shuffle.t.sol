// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {ArrayVm} from "./ArrayVm.sol";

contract ShuffleTest {
    ArrayVm constant vm = ArrayVm(address(uint160(uint256(keccak256("hevm cheat code")))));

    function testShuffle() public {
        uint256[] memory array = new uint256[](5);
        for (uint256 i = 0; i < array.length; i++) {
            array[i] = i;
        }

        vm.setSeed(1337);
        uint256[] memory shuffled = vm.shuffle(array);

        // Same elements, possibly in a different order.
        vm.assertEq(shuffled.length, array.length);
        vm.assertEq(vm.sort(shuffled), array);

        // Re-seeding reproduces the same shuffle.
        vm.setSeed(1337);
        vm.assertEq(vm.shuffle(array), shuffled);

        // The input is unchanged.
        for (uint256 i = 0; i < array.length; i++) {
            vm.assertEq(array[i], i);
        }
    }
}
