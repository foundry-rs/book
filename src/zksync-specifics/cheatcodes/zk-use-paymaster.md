## `zkUsePaymaster`

### Signature

```solidity
function zkUsePaymaster(address paymaster, bytes calldata input) external pure;
```

### Description

This cheatcode enables the use of a paymaster for the next transaction in the contract. The parameters specify the address of the paymaster and the pre-encoded data to be passed to the paymaster. The paymaster should be deployed before using this cheatcode.

### Examples

```solidity
MyPaymaster paymaster = new MyPaymaster();
// Encode paymaster input
bytes memory paymaster_encoded_input = abi.encodeWithSelector(
    bytes4(keccak256("general(bytes)")),
    bytes("0x")
);
vm.zkUsePaymaster(address(paymaster), paymaster_encoded_input);
```

The paymaster flow depends on the type of paymaster used. Here's an example of the simplest usage of a 'general' paymaster in Foundry:

1. Write a custom paymaster:

```solidity
contract MyPaymaster is IPaymaster {
    modifier onlyBootloader() {
        require(msg.sender == BOOTLOADER_FORMAL_ADDRESS, "Only bootloader can call this method");
        _;
    }

    constructor() payable {}

    function validateAndPayForPaymasterTransaction(bytes32, bytes32, Transaction calldata _transaction)
        external
        payable
        onlyBootloader
        returns (bytes4 magic, bytes memory context)
    {
        // Always accept the transaction
        magic = PAYMASTER_VALIDATION_SUCCESS_MAGIC;

        // Pay for the transaction fee
        uint256 requiredETH = _transaction.gasLimit * _transaction.maxFeePerGas;
        (bool success,) = payable(BOOTLOADER_FORMAL_ADDRESS).call{value: requiredETH}("");
        require(success, "Failed to transfer tx fee to the bootloader");
    }

    function postTransaction( 
        bytes calldata _context,
        Transaction calldata _transaction,
        bytes32,
        bytes32,
        ExecutionResult _txResult,
        uint256 _maxRefundedGas
    ) external payable override onlyBootloader {}

    receive() external payable {}
}
```

2. Deploy the paymaster:

You can deploy the paymaster either in a test or script:

```solidity
MyPaymaster paymaster = new MyPaymaster();
```

Or using the `forge create` command:

```sh
forge create ./src/MyPaymaster.sol:MyPaymaster --rpc-url {RPC_URL} --private-key {PRIVATE_KEY} --zksync
```

3. Use the cheatcode to set the paymaster for the next transaction:

```solidity
vm.zkUsePaymaster(address(paymaster), abi.encodeWithSelector(
    bytes4(keccak256("general(bytes)")),
    bytes("0x")
));
```

For more examples, see the [Foundry ZkSync Paymaster Tests](https://github.com/matter-labs/foundry-zksync/blob/main/crates/forge/tests/fixtures/zk/Paymaster.t.sol).

Also, see the [ZKsync Paymaster Documentation](https://docs.zksync.io/build/developer-reference/account-abstraction/paymasters) for more information.