## Deploying a multisig smart account

This example covers the configuration and deployment of a multisig smart account.

### Steps Overview

1. Specify the owners of the multisig account
2. Execute the deployment script

### Contracts

For this example, we will use three contracts:

- `AAFactory` - A factory contract that will be used to deploy the multisig account.
- `TwoUserMultisig` - A multisig account with two owners.
- `DeployMultisig` - A script to deploy the multisig account through the factory.

### `AAFactory`

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@era-contracts/Constants.sol";
import "@era-contracts/libraries/SystemContractsCaller.sol";

contract AAFactory {
    bytes32 public aaBytecodeHash;

    constructor(bytes32 _aaBytecodeHash) {
        aaBytecodeHash = _aaBytecodeHash;
    }

    function deployAccount(
        bytes32 salt,
        address owner1,
        address owner2
    ) external returns (address accountAddress) {
        (bool success, bytes memory returnData) = SystemContractsCaller
            .systemCallWithReturndata(
                uint32(gasleft()),
                address(DEPLOYER_SYSTEM_CONTRACT),
                uint128(0),
                abi.encodeCall(
                    DEPLOYER_SYSTEM_CONTRACT.create2Account,
                    (
                        salt,
                        aaBytecodeHash,
                        abi.encode(owner1, owner2),
                        IContractDeployer.AccountAbstractionVersion.Version1
                    )
                )
            );
        require(success, "Deployment failed");

        (accountAddress) = abi.decode(returnData, (address));
    }
}
```

### `TwoUserMultisig`

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@era-contracts/interfaces/IAccount.sol";
import "@era-contracts/libraries/TransactionHelper.sol";
import "@era-contracts/Constants.sol";
import "@era-contracts/libraries/SystemContractsCaller.sol";

import "@openzeppelin/contracts/interfaces/IERC1271.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract TwoUserMultisig is IAccount, IERC1271 {
    // to get transaction hash
    using TransactionHelper for Transaction;

    // state variables for account owners
    address public owner1;
    address public owner2;

    bytes4 constant EIP1271_SUCCESS_RETURN_VALUE = 0x1626ba7e;

    modifier onlyBootloader() {
        require(
            msg.sender == BOOTLOADER_FORMAL_ADDRESS,
            "Only bootloader can call this function"
        );
        // Continue execution if called from the bootloader.
        _;
    }

    constructor(address _owner1, address _owner2) {
        owner1 = _owner1;
        owner2 = _owner2;
    }

    function validateTransaction(
        bytes32,
        bytes32 _suggestedSignedHash,
        Transaction calldata _transaction
    ) external payable override onlyBootloader returns (bytes4 magic) {
        return _validateTransaction(_suggestedSignedHash, _transaction);
    }

    function _validateTransaction(
        bytes32 _suggestedSignedHash,
        Transaction calldata _transaction
    ) internal returns (bytes4 magic) {
        // Incrementing the nonce of the account.
        // Note, that reserved[0] by convention is currently equal to the nonce passed in the transaction
        SystemContractsCaller.systemCallWithPropagatedRevert(
            uint32(gasleft()),
            address(NONCE_HOLDER_SYSTEM_CONTRACT),
            0,
            abi.encodeCall(
                INonceHolder.incrementMinNonceIfEquals,
                (_transaction.nonce)
            )
        );

        bytes32 txHash;
        // While the suggested signed hash is usually provided, it is generally
        // not recommended to rely on it to be present, since in the future
        // there may be tx types with no suggested signed hash.
        if (_suggestedSignedHash == bytes32(0)) {
            txHash = _transaction.encodeHash();
        } else {
            txHash = _suggestedSignedHash;
        }

        // The fact there is enough balance for the account
        // should be checked explicitly to prevent user paying for fee for a
        // transaction that wouldn't be included on Ethereum.
        uint256 totalRequiredBalance = _transaction.totalRequiredBalance();
        require(
            totalRequiredBalance <= address(this).balance,
            "Not enough balance for fee + value"
        );

        if (
            isValidSignature(txHash, _transaction.signature) ==
            EIP1271_SUCCESS_RETURN_VALUE
        ) {
            magic = ACCOUNT_VALIDATION_SUCCESS_MAGIC;
        } else {
            magic = bytes4(0);
        }
    }

    function executeTransaction(
        bytes32,
        bytes32,
        Transaction calldata _transaction
    ) external payable override onlyBootloader {
        _executeTransaction(_transaction);
    }

    function _executeTransaction(Transaction calldata _transaction) internal {
        address to = address(uint160(_transaction.to));
        uint128 value = Utils.safeCastToU128(_transaction.value);
        bytes memory data = _transaction.data;

        if (to == address(DEPLOYER_SYSTEM_CONTRACT)) {
            uint32 gas = Utils.safeCastToU32(gasleft());

            // Note that the deployer contract can only be called
            // with a "systemCall" flag.
            SystemContractsCaller.systemCallWithPropagatedRevert(
                gas,
                to,
                value,
                data
            );
        } else {
            bool success;
            assembly {
                success := call(
                    gas(),
                    to,
                    value,
                    add(data, 0x20),
                    mload(data),
                    0,
                    0
                )
            }
            require(success);
        }
    }

    function executeTransactionFromOutside(
        Transaction calldata _transaction
    ) external payable {
        bytes4 magic = _validateTransaction(bytes32(0), _transaction);
        require(magic == ACCOUNT_VALIDATION_SUCCESS_MAGIC, "NOT VALIDATED");

        _executeTransaction(_transaction);
    }

    function isValidSignature(
        bytes32 _hash,
        bytes memory _signature
    ) public view override returns (bytes4 magic) {
        magic = EIP1271_SUCCESS_RETURN_VALUE;

        if (_signature.length != 130) {
            // Signature is invalid anyway, but we need to proceed with the signature verification as usual
            //for the fee estimation to work correctly
            _signature = new bytes(130);

            // Making sure that the signatures look like valid ECDSA signatures and are accepted right away
            // while skipping the main verification process.
            _signature[64] = bytes1(uint8(27));
            _signature[129] = bytes1(uint8(27));
        }

        (
            bytes memory signature1,
            bytes memory signature2
        ) = extractECDSASignature(_signature);

        if (
            !checkValidECDSASignatureFormat(signature1) ||
            !checkValidECDSASignatureFormat(signature2)
        ) {
            magic = bytes4(0);
        }

        address recoveredAddr1 = ECDSA.recover(_hash, signature1);
        address recoveredAddr2 = ECDSA.recover(_hash, signature2);

        // Note, that we should abstain from using the require here in order to allow for fee estimation to work
        if (recoveredAddr1 != owner1 || recoveredAddr2 != owner2) {
            magic = bytes4(0);
        }
    }

    // This function verifies that the ECDSA signature is both in correct format and non-malleable
    function checkValidECDSASignatureFormat(
        bytes memory _signature
    ) internal pure returns (bool) {
        if (_signature.length != 65) {
            return false;
        }

        uint8 v;
        bytes32 r;
        bytes32 s;
        // Signature loading code
        // we jump 32 (0x20) as the first slot of bytes contains the length
        // we jump 65 (0x41) per signature
        // for v we load 32 bytes ending with v (the first 31 come from s) then apply a mask
        assembly {
            r := mload(add(_signature, 0x20))
            s := mload(add(_signature, 0x40))
            v := and(mload(add(_signature, 0x41)), 0xff)
        }
        if (v != 27 && v != 28) {
            return false;
        }

        // EIP-2 still allows signature malleability for ecrecover(). Remove this possibility and make the signature
        // unique. Appendix F in the Ethereum Yellow paper (https://ethereum.github.io/yellowpaper/paper.pdf), defines
        // the valid range for s in (301): 0 < s < secp256k1n ÷ 2 + 1, and for v in (302): v ∈ {27, 28}. Most
        // signatures from current libraries generate a unique signature with an s-value in the lower half order.
        //
        // If your library generates malleable signatures, such as s-values in the upper range, calculate a new s-value
        // with 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141 - s1 and flip v from 27 to 28 or
        // vice versa. If your library also generates signatures with 0/1 for v instead 27/28, add 27 to v to accept
        // these malleable signatures as well.
        if (
            uint256(s) >
            0x7FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF5D576E7357A4501DDFE92F46681B20A0
        ) {
            return false;
        }

        return true;
    }

    function extractECDSASignature(
        bytes memory _fullSignature
    ) internal pure returns (bytes memory signature1, bytes memory signature2) {
        require(_fullSignature.length == 130, "Invalid length");

        signature1 = new bytes(65);
        signature2 = new bytes(65);

        // Copying the first signature. Note, that we need an offset of 0x20
        // since it is where the length of the `_fullSignature` is stored
        assembly {
            let r := mload(add(_fullSignature, 0x20))
            let s := mload(add(_fullSignature, 0x40))
            let v := and(mload(add(_fullSignature, 0x41)), 0xff)

            mstore(add(signature1, 0x20), r)
            mstore(add(signature1, 0x40), s)
            mstore8(add(signature1, 0x60), v)
        }

        // Copying the second signature.
        assembly {
            let r := mload(add(_fullSignature, 0x61))
            let s := mload(add(_fullSignature, 0x81))
            let v := and(mload(add(_fullSignature, 0x82)), 0xff)

            mstore(add(signature2, 0x20), r)
            mstore(add(signature2, 0x40), s)
            mstore8(add(signature2, 0x60), v)
        }
    }

    function payForTransaction(
        bytes32,
        bytes32,
        Transaction calldata _transaction
    ) external payable override onlyBootloader {
        bool success = _transaction.payToTheBootloader();
        require(success, "Failed to pay the fee to the operator");
    }

    function prepareForPaymaster(
        bytes32, // _txHash
        bytes32, // _suggestedSignedHash
        Transaction calldata _transaction
    ) external payable override onlyBootloader {
        _transaction.processPaymasterInput();
    }

    fallback() external {
        // fallback of default account shouldn't be called by bootloader under no circumstances
        assert(msg.sender != BOOTLOADER_FORMAL_ADDRESS);

        // If the contract is called directly, behave like an EOA
    }

    receive() external payable {
        // If the contract is called directly, behave like an EOA.
        // Note, that is okay if the bootloader sends funds with no calldata as it may be used for refunds/operator payments
    }
}
```

### `DeployMultisig`

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "forge-std/Script.sol";
import "@era-contracts/libraries/SystemContractsCaller.sol";
import {Create2Factory} from "@era-contracts/Create2Factory.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "../src/AAFactory.sol";
import "../src/TwoUserMultisig.sol";

contract DeployMultisig is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        // Owners for the multisig account
        // Can be random
        address owner1 = vm.envAddress("OWNER_1");
        address owner2 = vm.envAddress("OWNER_2");

        // Read artifact file and get the bytecode hash
        string memory artifact = vm.readFile(
            "zkout/TwoUserMultisig.sol/TwoUserMultisig.json"
        );
        bytes32 multisigBytecodeHash = vm.parseJsonBytes32(artifact, ".hash");
        console.log("Bytecode hash: ");
        console.logBytes32(multisigBytecodeHash);
        bytes32 salt = "1234";

        vm.startBroadcast(deployerPrivateKey);
        AAFactory factory = new AAFactory(multisigBytecodeHash);
        console.log("Factory deployed at: ", address(factory));

        // Mark the bytecode as a factory dependency
        vmExt.zkUseFactoryDep("TwoUserMultisig");

        factory.deployAccount(salt, owner1, owner2);
        vm.stopBroadcast();
    }
}
```

### Running the script

```sh
forge script ./script/DeployMultisig.s.sol:DeployMultisig --rpc-url <RPC_URL> --private-key <PRIVATE_KEY> --broadcast --via-ir --zk-enable-eravm-extensions --zksync
```

For the complete source code, visit the [minimal account abstraction multisig repository](https://github.com/dutterbutter/min-aa-multisig-foundry).
