// SPDX-License-Identifier: UNLICENSED
// ANCHOR: all
// ANCHOR: prelude
pragma solidity 0.8.10;

import "spark-std/Test.sol";

error Unauthorized();

// ANCHOR_END: prelude

// ANCHOR: contract
contract OwnerUpOnly {
    address public immutable owner;
    uint256 public count;

    constructor() {
        owner = msg.sender;
    }

    function increment() external {
        if (msg.sender != owner) {
            revert Unauthorized();
        }
        count++;
    }
}

// ANCHOR_END: contract

// ANCHOR: test
// ANCHOR: contract_prelude
contract OwnerUpOnlyTest is Test {
    OwnerUpOnly upOnly;

    // ANCHOR_END: contract_prelude

    // ANCHOR: simple_test
    function setUp() public {
        upOnly = new OwnerUpOnly();
    }

    function test_IncrementAsOwner() public {
        assertEq(upOnly.count(), 0);
        upOnly.increment();
        assertEq(upOnly.count(), 1);
    }

    // ANCHOR_END: simple_test

    // ANCHOR: test_fail
    function testFail_IncrementAsNotOwner() public {
        vm.prank(address(0));
        upOnly.increment();
    }

    // ANCHOR_END: test_fail

    // ANCHOR: test_expectrevert
    // Notice that we replaced `testFail` with `test`
    function test_RevertWhen_CallerIsNotOwner() public {
        vm.expectRevert(Unauthorized.selector);
        vm.prank(address(0));
        upOnly.increment();
    }
    // ANCHOR_END: test_expectrevert
}
// ANCHOR_END: test
// ANCHOR_END: all
