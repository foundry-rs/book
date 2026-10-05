// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

contract TableSkipTest {
    struct TestCase {
        uint256 a;
        uint256 b;
        uint256 expected;
        bool omit;
    }

    function fixtureSums() public pure returns (TestCase[] memory) {
        TestCase[] memory entries = new TestCase[](3);
        entries[0] = TestCase(1, 2, 3, false);
        entries[1] = TestCase(2, 2, 5, true);
        entries[2] = TestCase(4, 5, 9, false);
        return entries;
    }

    function tableSumsTest(TestCase memory sums) public pure {
        if (sums.omit) return;

        require(sums.a + sums.b == sums.expected, "wrong sum");
    }
}
