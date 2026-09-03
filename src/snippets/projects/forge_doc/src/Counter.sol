// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ICounter} from "./ICounter.sol";

/// @title Counter
/// @author Foundry contributors
/// @notice Stores a value that anyone can increment.
/// @dev This contract demonstrates the NatSpec rendered by `forge doc`.
/// @custom:security-contact security@example.com
contract Counter is ICounter {
    /// @notice The current counter value.
    uint256 public value;

    /// @inheritdoc ICounter
    function increment(uint256 amount) external returns (uint256 newValue) {
        newValue = value + amount;
        value = newValue;
        emit Incremented(amount, newValue);
    }

    /// @notice Resets {value} to zero.
    function reset() external {
        value = 0;
    }
}
