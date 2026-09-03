// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title Counter interface
/// @notice Defines the public API for an incrementing counter.
interface ICounter {
    /// @notice Emitted after the counter increases.
    /// @param amount The amount added to the counter.
    /// @param newValue The counter value after the update.
    event Incremented(uint256 amount, uint256 newValue);

    /// @notice Increases the counter.
    /// @param amount The amount to add.
    /// @return newValue The counter value after the update.
    function increment(uint256 amount) external returns (uint256 newValue);
}
