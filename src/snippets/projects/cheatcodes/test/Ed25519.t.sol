// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";

contract Ed25519Test is Test {
    // [!region key-pair]
    function testCreateEd25519KeyPair() public {
        bytes32 salt = bytes32(uint256(0xdeadbeef));
        (bytes32 publicKey, bytes32 privateKey) = vm.createEd25519Key(salt);

        assertEq(privateKey, salt);
        assertEq(vm.publicKeyEd25519(privateKey), publicKey);
    }
    // [!endregion key-pair]

    // [!region sign-verify]
    function testSignAndVerifyEd25519() public {
        (bytes32 publicKey, bytes32 privateKey) = vm.createEd25519Key(bytes32(uint256(1)));
        bytes memory namespace = "com.example.orders";
        bytes memory message = "approve order 42";

        bytes memory signature = vm.signEd25519(namespace, message, privateKey);

        assertEq(signature.length, 64);
        assertTrue(vm.verifyEd25519(signature, namespace, message, publicKey));
        assertFalse(vm.verifyEd25519(signature, "com.example.refunds", message, publicKey));
    }
    // [!endregion sign-verify]
}
