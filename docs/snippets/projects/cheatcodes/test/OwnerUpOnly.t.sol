// SPDX-License-Identifier: UNLICENSED
// [!region all]
// [!region prelude]
pragma solidity 0.8.10;

import {Test} from "forge-std/Test.sol";

error Unauthorized();
// [!endregion prelude]

// [!region contract]
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
// [!endregion contract]

// [!region test]
// [!region contract_prelude]
contract OwnerUpOnlyTest is Test {
    OwnerUpOnly upOnly;
    // [!endregion contract_prelude]

    // [!region simple_test]
    function setUp() public {
        upOnly = new OwnerUpOnly();
    }

    function test_IncrementAsOwner() public {
        assertEq(upOnly.count(), 0);
        upOnly.increment();
        assertEq(upOnly.count(), 1);
    }
    // [!endregion simple_test]

    // [!region test_expectrevert]
    function test_RevertWhen_CallerIsNotOwner() public {
        vm.expectRevert(Unauthorized.selector);
        vm.prank(address(0));
        upOnly.increment();
    }
    // [!endregion test_expectrevert]
}
// [!endregion test]
// [!endregion all]
