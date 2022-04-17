// SPDX-License-Identifier: UNLICENSED
// ANCHOR: all
pragma solidity 0.8.10;

import "ds-test/test.sol";

interface CheatCodes {
    function expectEmit(
        bool,
        bool,
        bool,
        bool
    ) external;
}

contract EmitContractTest is DSTest {
    event Transfer(address indexed from, address indexed to, uint256 amount);
    CheatCodes constant cheats = CheatCodes(HEVM_ADDRESS);

    function testExpectEmit() public {
        ExpectEmit emitter = new ExpectEmit();
        // Check that topic 1, topic 2, and data are the same as the following emitted event.
        // Checking topic 3 here doesn't matter, because `Transfer` only has 2 indexed topics.
        cheats.expectEmit(true, true, false, true);
        // The event we expect
        emit Transfer(address(this), address(1337), 1337);
        // The event we get
        emitter.t();
    }

    function testExpectEmitDoNotCheckData() public {
        ExpectEmit emitter = new ExpectEmit();
        // Check topic 1 and topic 2, but do not check data
        cheats.expectEmit(true, true, false, false);
        // The event we expect
        emit Transfer(address(this), address(1337), 1338);
        // The event we get
        emitter.t();
    }
}

contract ExpectEmit {
    event Transfer(address indexed from, address indexed to, uint256 amount);

    function t() public {
        emit Transfer(msg.sender, address(1337), 1337);
    }
}
// ANCHOR_END: all
