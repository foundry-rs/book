// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

interface VmSignTypedData {
    function signTypedData(string calldata jsonData) external pure returns (uint8 v, bytes32 r, bytes32 s);

    function signTypedData(address signer, string calldata jsonData)
        external
        pure
        returns (uint8 v, bytes32 r, bytes32 s);
}

contract SignTypedDataScript {
    VmSignTypedData private constant vm = VmSignTypedData(address(uint160(uint256(keccak256("hevm cheat code")))));

    // [!region script-wallet]
    function run(string calldata typedData) external pure returns (bytes memory signature) {
        (uint8 v, bytes32 r, bytes32 s) = vm.signTypedData(typedData);
        signature = abi.encodePacked(r, s, v);
    }

    // [!endregion script-wallet]

    // [!region script-wallet-signer]
    function run(address signer, string calldata typedData) external pure returns (bytes memory signature) {
        (uint8 v, bytes32 r, bytes32 s) = vm.signTypedData(signer, typedData);
        signature = abi.encodePacked(r, s, v);
    }
    // [!endregion script-wallet-signer]
}
