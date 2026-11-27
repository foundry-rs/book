// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {BlobVm} from "./BlobVm.sol";

contract BlobBaseFeeTest {
    BlobVm constant vm = BlobVm(address(uint160(uint256(keccak256("hevm cheat code")))));

    function testBlobBaseFee() public {
        vm.blobBaseFee(42);
        vm.assertEq(vm.getBlobBaseFee(), 42);
    }
}
