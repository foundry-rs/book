// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {AccountVm, IAccountKeychain, IConfigurableAccount, ISignatureVerifier} from "./AccountVm.sol";

contract ConfigurableAccountTest {
    AccountVm constant vm = AccountVm(address(uint160(uint256(keccak256("hevm cheat code")))));
    IConfigurableAccount constant accounts = IConfigurableAccount(0xAACC000000000000000000000000000000000000);
    ISignatureVerifier constant verifier = ISignatureVerifier(0x5165300000000000000000000000000000000000);
    IAccountKeychain constant keychain = IAccountKeychain(0xaAAAaaAA00000000000000000000000000000000);

    uint256 constant ALICE_PK = 0xA11CE;
    uint256 constant BOB_PK = 0xB0B;
    uint256 constant CAROL_PK = 0xCA201;
    uint256 constant P256_PK = 0xCA11;

    AccountVm.ConfigurableAccountConfig config;
    address account;
    bytes32 digest = keccak256("approve payment #42");

    // [!region setup]
    function setUp() public {
        // A 2-of-4 account: three secp256k1 owners and one P-256 owner, sorted by address.
        address[4] memory owners =
            [vm.addr(BOB_PK), p256Owner(P256_PK), vm.addr(CAROL_PK), vm.addr(ALICE_PK)];
        config.salt = bytes32(uint256(1));
        config.threshold = 2;
        for (uint256 i; i < owners.length; i++) {
            config.owners.push(AccountVm.ConfigurableAccountOwner(owners[i], 1));
        }
        account = vm.deriveConfigurableAccount(config);
    }

    /// A P-256 owner's address is `keccak256(x || y)[12:]` of its public key.
    function p256Owner(uint256 privateKey) internal pure returns (address) {
        (uint256 x, uint256 y) = vm.publicKeyP256(privateKey);
        return address(uint160(uint256(keccak256(abi.encode(x, y)))));
    }
    // [!endregion setup]

    // [!region derive]
    function test_derivedAddressMatchesPrecompile() public view {
        vm.assertEq(accounts.deriveAccount(config.salt, config.threshold, config.owners), account);
    }
    // [!endregion derive]

    // [!region sign]
    function test_signWithOwnerKeys() public view {
        uint256[] memory keys = new uint256[](2);
        keys[0] = ALICE_PK;
        keys[1] = BOB_PK;
        bytes memory signature = vm.signConfigurableAccount(keys, account, config, digest);

        vm.assertTrue(verifier.verifyConfigurableAccount(account, digest, signature));
    }
    // [!endregion sign]

    // [!region mixed]
    function test_signWithP256Owner() public view {
        AccountVm.OwnerKey[] memory keys = new AccountVm.OwnerKey[](2);
        keys[0] = AccountVm.OwnerKey(AccountVm.OwnerKeyType.Secp256k1, CAROL_PK);
        keys[1] = AccountVm.OwnerKey(AccountVm.OwnerKeyType.P256, P256_PK);
        bytes memory signature = vm.signConfigurableAccount(keys, account, config, digest);

        vm.assertTrue(verifier.verifyConfigurableAccount(account, digest, signature));
    }
    // [!endregion mixed]

    // [!region manual]
    function test_buildSignatureFromApprovals() public view {
        // Each owner approves the owner digest, not `digest` itself.
        bytes32 ownerDigest = vm.configurableAccountDigest(account, config.version, digest);

        // Approvals in owner-address order: Bob, then Alice.
        bytes[] memory approvals = new bytes[](2);
        approvals[0] = approve(BOB_PK, ownerDigest);
        approvals[1] = approve(ALICE_PK, ownerDigest);
        bytes memory signature = vm.encodeConfigurableAccountSignature(account, config, approvals);

        vm.assertTrue(verifier.verifyConfigurableAccount(account, digest, signature));

        // The same approvals that `signConfigurableAccount` picks.
        uint256[] memory keys = new uint256[](2);
        keys[0] = ALICE_PK;
        keys[1] = BOB_PK;
        vm.assertEq(signature, vm.signConfigurableAccount(keys, account, config, digest));
    }

    /// A 65-byte secp256k1 approval: `r || s || v`.
    function approve(uint256 privateKey, bytes32 ownerDigest) internal pure returns (bytes memory) {
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(privateKey, ownerDigest);
        return abi.encodePacked(r, s, v);
    }
    // [!endregion manual]

    // [!region keychain]
    function test_configurableAccountAsAccessKey() public {
        address root = vm.addr(0x5007);
        AccountVm.OwnerKey[] memory keys = new AccountVm.OwnerKey[](2);
        keys[0] = AccountVm.OwnerKey(AccountVm.OwnerKeyType.Secp256k1, ALICE_PK);
        keys[1] = AccountVm.OwnerKey(AccountVm.OwnerKeyType.Secp256k1, BOB_PK);
        bytes memory signature = vm.signKeychainConfigurableAccount(keys, account, config, root, digest);

        // Not valid until `root` authorizes the configurable account as an access key.
        vm.assertFalse(verifier.verifyKeychain(root, digest, signature));

        IAccountKeychain.KeyRestrictions memory restrictions;
        restrictions.expiry = type(uint64).max;
        restrictions.allowAnyCalls = true;
        vm.prank(root, root);
        keychain.authorizeKey(account, 3, restrictions);

        vm.assertTrue(verifier.verifyKeychain(root, digest, signature));
    }
    // [!endregion keychain]
}
