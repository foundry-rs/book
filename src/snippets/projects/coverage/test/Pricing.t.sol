// SPDX-License-Identifier: MIT
// [!region all]
pragma solidity ^0.8.20;

import {Pricing} from "../src/Pricing.sol";

contract PricingTest {
    Pricing internal pricing;

    function setUp() public {
        pricing = new Pricing();
    }

    function test_preferredFee() public view {
        assert(pricing.fee(100 ether, true) == 1 ether);
    }

    function test_largeFee() public view {
        assert(pricing.fee(100 ether, false) == 2 ether);
    }

    function test_standardFee() public view {
        assert(pricing.fee(10 ether, false) == 0.3 ether);
    }
}
// [!endregion all]
