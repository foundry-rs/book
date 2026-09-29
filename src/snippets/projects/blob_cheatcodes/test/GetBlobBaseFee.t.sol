// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {BlobVm} from "./BlobVm.sol";

contract GetBlobBaseFeeTest {
    BlobVm constant vm = BlobVm(address(uint160(uint256(keccak256("hevm cheat code")))));

    function testGetBlobBaseFee() public {
        uint256 current = vm.getBlobBaseFee();
        vm.blobBaseFee(current + 1);
        vm.assertEq(vm.getBlobBaseFee(), current + 1);
    }
}
