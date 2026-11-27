// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import {Test} from "forge-std/Test.sol";

contract FailExampleTest is Test {
    function test_WithoutMessage() public {
        fail();
    }

    function test_WithMessage() public {
        fail("Reached an unexpected branch");
    }
}
