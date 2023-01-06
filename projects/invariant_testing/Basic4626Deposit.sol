// SPDX-License-Identifier: UNLICENSED
// ANCHOR: all
pragma solidity 0.8.10;

contract Basic4626Deposit {

    uint256

    function convertToShares(uint256 assets_) public view virtual override returns (uint256 shares_) {
        uint256 supply_ = totalSupply;  // Cache to stack.

        shares_ = supply_ == 0 ? assets_ : (assets_ * supply_) / totalAssets;
    }

    function deposit(uint256 assets_, address receiver_) external virtual override nonReentrant returns (uint256 shares_) {
        _mint(shares_ = previewDeposit(assets_), assets_, receiver_, msg.sender);
    }

    function _mint(uint256 shares_, uint256 assets_, address receiver_, address caller_) internal {
        require(receiver_ != address(0), "RDT:M:ZERO_RECEIVER");
        require(shares_   != uint256(0), "RDT:M:ZERO_SHARES");
        require(assets_   != uint256(0), "RDT:M:ZERO_ASSETS");

        _mint(receiver_, shares_);

        uint256 freeAssetsCache = freeAssets = totalAssets() + assets_;

        uint256 issuanceRate_ = _updateIssuanceParams();

        emit Deposit(caller_, receiver_, assets_, shares_);
        emit IssuanceParamsUpdated(freeAssetsCache, issuanceRate_);

        require(ERC20Helper.transferFrom(asset, caller_, address(this), assets_), "RDT:M:TRANSFER_FROM");
    }

}
