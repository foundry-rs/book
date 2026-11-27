// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {BlobVm} from "./BlobVm.sol";

contract GetBlobhashesTest {
    BlobVm constant vm = BlobVm(address(uint160(uint256(keccak256("hevm cheat code")))));

    function testGetBlobhashes() public {
        bytes32[] memory hashes = new bytes32[](1);
        hashes[0] = bytes32(uint256(1));
        vm.blobhashes(hashes);

        vm.assertEq(vm.getBlobhashes(), hashes);
    }
}
