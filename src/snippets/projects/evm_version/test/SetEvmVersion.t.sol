// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {EvmVersionVm} from "./EvmVersionVm.sol";

contract SetEvmVersionTest {
    EvmVersionVm constant vm = EvmVersionVm(address(uint160(uint256(keccak256("hevm cheat code")))));

    function testSetEvmVersion() public {
        vm.setEvmVersion("shanghai");
        vm.assertEq(vm.getEvmVersion(), "shanghai");

        // Hardfork-dependent cheatcodes use the new version.
        (bool success,) = address(vm).call(abi.encodeCall(EvmVersionVm.blobhashes, (new bytes32[](0))));
        require(!success, "blobhashes must revert before Cancun");
    }

    function testOpcodeVersionChangesInNewCalls() public {
        bytes32[] memory hashes = new bytes32[](1);
        hashes[0] = bytes32(uint256(123));
        vm.blobhashes(hashes);

        vm.setEvmVersion("shanghai");
        vm.assertEq(vm.getEvmVersion(), "shanghai");

        // This frame still executes with Cancun opcode rules.
        bytes32 hash;
        assembly {
            hash := blobhash(0)
        }
        vm.assertEq(hash, hashes[0]);

        // A new call uses Shanghai rules, where BLOBHASH is unavailable.
        vm.expectRevert();
        this.readBlobHash();
    }

    function readBlobHash() external view returns (bytes32 hash) {
        assembly {
            hash := blobhash(0)
        }
    }
}
