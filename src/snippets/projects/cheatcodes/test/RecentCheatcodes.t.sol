// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

interface VmRecent {
    struct Rpc {
        string key;
        string url;
    }

    function getSelectors(string calldata artifactPath) external view returns (bytes4[] memory selectors);

    function parseJsonArrayLength(string calldata json, string calldata key) external pure returns (uint256 length);

    function mockCall(address callee, bytes calldata data, bytes calldata returnData, bool injectCode) external;

    function rpcUrlStructs() external view returns (Rpc[] memory urls);

    function rpcJson(string calldata urlOrAlias, string calldata method, string calldata params)
        external
        returns (string memory data);
}

contract SelectorTarget {
    function read() external pure returns (uint256) {
        return 42;
    }

    function write(uint256) external {}
}

interface EmptyMockTarget {
    function read() external view returns (uint256);
}

contract RecentCheatcodesTest {
    VmRecent private constant vm = VmRecent(address(uint160(uint256(keccak256("hevm cheat code")))));

    // [!region get-selectors]
    function testGetSelectors() public view {
        bytes4[] memory selectors = vm.getSelectors("SelectorTarget");

        require(selectors.length == 2);
        require(contains(selectors, SelectorTarget.read.selector));
        require(contains(selectors, SelectorTarget.write.selector));
    }

    // [!endregion get-selectors]

    // [!region json-array-length]
    function testParseJsonArrayLength() public pure {
        string memory json = '{"items":[1,{"nested":true},"three"],"empty":[]}';

        require(vm.parseJsonArrayLength(json, ".items") == 3);
        require(vm.parseJsonArrayLength(json, ".empty") == 0);
        require(vm.parseJsonArrayLength("[1,2,3]", "$") == 3);
    }

    // [!endregion json-array-length]

    // [!region mock-without-code]
    function testMockCallWithoutCodeInjection() public {
        EmptyMockTarget target = EmptyMockTarget(address(100));

        vm.mockCall(address(target), abi.encodeWithSelector(target.read.selector), abi.encode(42), false);

        require(target.read() == 42);
        require(address(target).code.length == 0);
    }

    // [!endregion mock-without-code]

    // [!region rpc-url-structs]
    function configuredEndpoints() external view returns (VmRecent.Rpc[] memory endpoints) {
        endpoints = vm.rpcUrlStructs();
    }

    // [!endregion rpc-url-structs]

    // [!region rpc-json]
    function currentBlockNumber() external returns (string memory blockNumber) {
        blockNumber = vm.rpcJson("mainnet", "eth_blockNumber", "[]");
    }
    // [!endregion rpc-json]

    function contains(bytes4[] memory selectors, bytes4 expected) private pure returns (bool) {
        for (uint256 i; i < selectors.length; ++i) {
            if (selectors[i] == expected) return true;
        }
        return false;
    }
}
