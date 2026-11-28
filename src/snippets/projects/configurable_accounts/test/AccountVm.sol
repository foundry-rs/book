// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

interface AccountVm {
    struct ConfigurableAccountOwner {
        address owner;
        uint8 weight;
    }

    struct ConfigurableAccountConfig {
        bytes32 salt;
        uint64 version;
        uint8 threshold;
        ConfigurableAccountOwner[] owners;
    }

    enum OwnerKeyType {
        Secp256k1,
        P256,
        WebAuthn
    }

    struct OwnerKey {
        OwnerKeyType keyType;
        uint256 privateKey;
    }

    function deriveConfigurableAccount(ConfigurableAccountConfig calldata config) external pure returns (address);
    function configurableAccountDigest(address account, uint64 configVersion, bytes32 digest)
        external
        pure
        returns (bytes32);
    function encodeConfigurableAccountSignature(
        address account,
        ConfigurableAccountConfig calldata config,
        bytes[] calldata ownerSignatures
    ) external pure returns (bytes memory);
    function signConfigurableAccount(
        uint256[] calldata privateKeys,
        address account,
        ConfigurableAccountConfig calldata config,
        bytes32 digest
    ) external pure returns (bytes memory);
    function signConfigurableAccount(
        OwnerKey[] calldata ownerKeys,
        address account,
        ConfigurableAccountConfig calldata config,
        bytes32 digest
    ) external pure returns (bytes memory);
    function signKeychainConfigurableAccount(
        OwnerKey[] calldata ownerKeys,
        address configurableAccount,
        ConfigurableAccountConfig calldata config,
        address account,
        bytes32 digest
    ) external pure returns (bytes memory);

    function addr(uint256 privateKey) external pure returns (address);
    function sign(uint256 privateKey, bytes32 digest) external pure returns (uint8 v, bytes32 r, bytes32 s);
    function publicKeyP256(uint256 privateKey) external pure returns (uint256 x, uint256 y);
    function prank(address msgSender, address txOrigin) external;
    function assertEq(address left, address right) external pure;
    function assertEq(bytes calldata left, bytes calldata right) external pure;
    function assertTrue(bool condition) external pure;
    function assertFalse(bool condition) external pure;
}

/// Tempo precompiles used by the examples.
interface IConfigurableAccount {
    function deriveAccount(bytes32 salt, uint8 threshold, AccountVm.ConfigurableAccountOwner[] calldata owners)
        external
        pure
        returns (address);
}

interface ISignatureVerifier {
    function verifyConfigurableAccount(address account, bytes32 hash, bytes calldata signature)
        external
        view
        returns (bool);
    function verifyKeychain(address account, bytes32 hash, bytes calldata signature) external view returns (bool);
}

interface IAccountKeychain {
    struct TokenLimit {
        address token;
        uint256 amount;
        uint64 period;
    }

    struct SelectorRule {
        bytes4 selector;
        address[] recipients;
    }

    struct CallScope {
        address target;
        SelectorRule[] selectorRules;
    }

    struct KeyRestrictions {
        uint64 expiry;
        bool enforceLimits;
        TokenLimit[] limits;
        bool allowAnyCalls;
        CallScope[] allowedCalls;
    }

    function authorizeKey(address keyId, uint8 signatureType, KeyRestrictions calldata config) external;
}
