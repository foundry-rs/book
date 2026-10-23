// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {ArrayVm} from "./ArrayVm.sol";

contract SortTest {
    ArrayVm constant vm = ArrayVm(address(uint160(uint256(keccak256("hevm cheat code")))));

    function testSort() public {
        uint256[] memory array = new uint256[](4);
        array[0] = 3;
        array[1] = 1;
        array[2] = 4;
        array[3] = 2;

        uint256[] memory sorted = vm.sort(array);

        vm.assertEq(sorted[0], 1);
        vm.assertEq(sorted[1], 2);
        vm.assertEq(sorted[2], 3);
        vm.assertEq(sorted[3], 4);
        vm.assertEq(array[0], 3); // Input is unchanged.
    }
}
