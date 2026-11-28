// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

interface VmSignTypedData {
    function addr(uint256 privateKey) external pure returns (address keyAddr);

    function eip712HashTypedData(string calldata jsonData) external pure returns (bytes32 digest);

    function signTypedData(uint256 privateKey, string calldata jsonData)
        external
        pure
        returns (uint8 v, bytes32 r, bytes32 s);
}

contract SignTypedDataTest {
    VmSignTypedData private constant vm = VmSignTypedData(address(uint160(uint256(keccak256("hevm cheat code")))));

    // [!region private-key]
    function testSignTypedData() public pure {
        uint256 alicePk = 0xa11ce;
        address alice = vm.addr(alicePk);

        string memory typedData = string.concat(
            '{"types":{"EIP712Domain":[{"name":"name","type":"string"},{"name":"version","type":"string"},',
            '{"name":"chainId","type":"uint256"},{"name":"verifyingContract","type":"address"}],',
            '"Permit":[{"name":"owner","type":"address"},{"name":"spender","type":"address"},',
            '{"name":"value","type":"uint256"},{"name":"nonce","type":"uint256"},',
            '{"name":"deadline","type":"uint256"}]},"primaryType":"Permit",',
            '"domain":{"name":"Token","version":"1","chainId":1,',
            '"verifyingContract":"0x6B175474E89094C44Da98b954EedeAC495271d0F"},',
            '"message":{"owner":"0xe05fcC23807536bEe418f142D19fa0d21BB0cfF7",',
            '"spender":"0x000000000000000000000000000000000000dEaD",',
            '"value":"1000000000000000000","nonce":0,"deadline":1900000000}}'
        );

        (uint8 v, bytes32 r, bytes32 s) = vm.signTypedData(alicePk, typedData);

        // The signature is over the digest that `eip712HashTypedData` returns.
        bytes32 digest = vm.eip712HashTypedData(typedData);
        require(ecrecover(digest, v, r, s) == alice);
    }
    // [!endregion private-key]
}
