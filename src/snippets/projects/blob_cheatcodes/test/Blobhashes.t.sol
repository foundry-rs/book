// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {BlobVm} from "./BlobVm.sol";

contract BlobhashesTest {
    BlobVm constant vm = BlobVm(address(uint160(uint256(keccak256("hevm cheat code")))));

    function testBlobhashes() public {
        bytes32[] memory hashes = new bytes32[](2);
        hashes[0] = bytes32(uint256(1));
        hashes[1] = bytes32(uint256(2));
        vm.blobhashes(hashes);

        vm.assertEq(vm.getBlobhashes(), hashes);
        vm.assertEq(blobhash(0), hashes[0]);
        vm.assertEq(blobhash(1), hashes[1]);
        vm.assertEq(blobhash(2), bytes32(0));
    }
}
