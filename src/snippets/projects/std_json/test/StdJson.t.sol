// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import {Test} from "forge-std/Test.sol";
import {stdJson} from "forge-std/StdJson.sol";

contract StdJsonExampleTest is Test {
    using stdJson for string;

    function test_readJson() public view {
        string memory data = vm.readFile("fixtures/example.json");
        assertEq(data.readUint(".count"), 42);
        assertEq(data.readString(".name"), "vault");
        assertTrue(data.readBool(".active"));
        assertEq(data.readUint(".nested.rate"), 7);
        assertEq(data.readStringArray(".tags").length, 2);
        assertTrue(data.keyExists(".count"));
        assertEq(data.readUintOr(".missing", 99), 99);
    }

    function test_writeJson() public {
        string memory objectName = "example";
        objectName.serialize("name", string("vault"));
        objectName.serialize("count", uint256(42));
        string memory serialized = objectName.serialize("active", true);
        serialized.write("output.json");

        // The key selects a field in the destination file.
        string("7").write("output.json", ".count");
        string memory written = vm.readFile("output.json");
        assertEq(written.readUint(".count"), 7);
        assertEq(written.readString(".name"), "vault");
        assertTrue(written.readBool(".active"));
    }
}
