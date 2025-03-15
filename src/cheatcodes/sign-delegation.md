## `signDelegation`

### Signature

```solidity
/// Holds a signed EIP-7702 authorization for an authority account to delegate to an implementation.
struct SignedDelegation {
    // The y-parity of the recovered secp256k1 signature (0 or 1).
    uint8 v;
    // First 32 bytes of the signature.
    bytes32 r;
    // Second 32 bytes of the signature.
    bytes32 s;
    // The current nonce of the authority account at signing time.
    // Used to ensure signature can't be replayed after account nonce changes.
    uint64 nonce;
    // Address of the contract implementation that will be delegated to.
    // Gets encoded into delegation code: 0xef0100 || implementation.
    address implementation;
}
```

```solidity
/// Sign an EIP-7702 authorization for delegation.
function signDelegation(address implementation, uint256 privateKey)
    external
    returns (SignedDelegation memory signedDelegation);
```

```solidity
/// Designate the next call as an EIP-7702 transaction.
function attachDelegation(SignedDelegation calldata signedDelegation) external;
```

```solidity
/// Sign an EIP-7702 authorization and designate the next call as an EIP-7702 transaction.
function signAndAttachDelegation(address implementation, uint256 privateKey)
    external
    returns (SignedDelegation memory signedDelegation);
```

### Description

Signs an [EIP-7702](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-7702.md) authorization for delegation.

To use the cheatcodes you need to set your `evm_version` to at least the `prague` hardfork in your `foundry.toml`.

```toml
evm_version = "prague"
```

EIP-7702 sets the account code of an Externally Owned Account (EOA) through a delegation transaction, enabling EOAs to behave like smart contracts.

The `signDelegation` cheatcode generates a signed authorization for an implementation contract to be delegated to, ensuring that only authorized implementations can execute transactions on behalf of the authority account. The signature includes the authority account's nonce to prevent replay attacks.

The `attachDelegation` cheatcode designates the next transaction as an EIP-7702 delegation by attaching the signed authorization.

The `signAndAttachDelegation` function combines both signing and attaching into a single step, simplifying the delegation process.

### Examples

Let's first define a `SimpleDelegateContract` and a dummy `ERC20` to be used:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract SimpleDelegateContract {
    event Executed(address indexed to, uint256 value, bytes data);

    struct Call {
        bytes data;
        address to;
        uint256 value;
    }

    function execute(Call[] memory calls) external payable {
        for (uint256 i = 0; i < calls.length; i++) {
            Call memory call = calls[i];
            (bool success, bytes memory result) = call.to.call{value: call.value}(call.data);
            require(success, string(result));
            emit Executed(call.to, call.value, call.data);
        }
    }

    receive() external payable {}
}

contract ERC20 {
    address public minter;
    mapping(address => uint256) private _balances;

    constructor(address _minter) {
        minter = _minter;
    }

    function mint(uint256 amount, address to) public {
        _mint(to, amount);
    }

    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }

    function _mint(address account, uint256 amount) internal {
        require(msg.sender == minter, "ERC20: msg.sender is not minter");
        require(account != address(0), "ERC20: mint to the zero address");
        unchecked {
            _balances[account] += amount;
        }
    }
}
```

Next, to use the cheatcodes with `forge test`:

```solidity
contract SignDelegationTest is Test {
    // Alice's address and private key (EOA with no initial contract code).
    address payable ALICE_ADDRESS = payable(0x70997970C51812dc3A010C7d01b50e0d17dc79C8);
    uint256 constant ALICE_PK = 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d;

    // Bob's address and private key (Bob will execute transactions on Alice's behalf).
    address constant BOB_ADDRESS = 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC;
    uint256 constant BOB_PK = 0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a;

    // The contract that Alice will delegate execution to.
    SimpleDelegateContract public implementation;

    // ERC-20 token contract for minting test tokens.
    ERC20 public token;

    function setUp() public {
        // Deploy the delegation contract (Alice will delegate calls to this contract).
        implementation = new SimpleDelegateContract();

        // Deploy an ERC-20 token contract where Alice is the minter.
        token = new ERC20(ALICE_ADDRESS);
    }

    function testSignDelegationAndThenAttachDelegation() public {
        // Construct a single transaction call: Mint 100 tokens to Bob.
        SimpleDelegateContract.Call[] memory calls = new SimpleDelegateContract.Call[](1);
        bytes memory data = abi.encodeCall(ERC20.mint, (100, BOB_ADDRESS));
        calls[0] = SimpleDelegateContract.Call({to: address(token), data: data, value: 0});

        // Alice signs a delegation allowing `implementation` to execute transactions on her behalf.
        Vm.SignedDelegation memory signedDelegation = vm.signDelegation(address(implementation), ALICE_PK);

        // Bob attaches the signed delegation from Alice and broadcasts it.
        vm.broadcast(BOB_PK);
        vm.attachDelegation(signedDelegation);

        // Verify that Alice's account now behaves as a smart contract.
        bytes memory code = address(ALICE_ADDRESS).code;
        require(code.length > 0, "no code written to Alice");

        // As Bob, execute the transaction via Alice's assigned contract.
        SimpleDelegateContract(ALICE_ADDRESS).execute(calls);

        // Verify Bob successfully received 100 tokens.
        assertEq(token.balanceOf(BOB_ADDRESS), 100);
    }

    function testSignAndAttachDelegation() public {
        // Construct a single transaction call: Mint 100 tokens to Bob.
        SimpleDelegateContract.Call[] memory calls = new SimpleDelegateContract.Call[](1);
        bytes memory data = abi.encodeCall(ERC20.mint, (100, BOB_ADDRESS));
        calls[0] = SimpleDelegateContract.Call({to: address(token), data: data, value: 0});

        // Alice signs and attaches the delegation in one step (eliminating the need for separate signing).
        vm.signAndAttachDelegation(address(implementation), ALICE_PK);

        // Verify that Alice's account now behaves as a smart contract.
        bytes memory code = address(ALICE_ADDRESS).code;
        require(code.length > 0, "no code written to Alice");

        // As Bob, execute the transaction via Alice's assigned contract.
        vm.broadcast(BOB_PK);
        SimpleDelegateContract(ALICE_ADDRESS).execute(calls);

        // Verify Bob successfully received 100 tokens.
        vm.assertEq(token.balanceOf(BOB_ADDRESS), 100);
    }
}
```

Or alternatively, let's use the cheatcodes in `forge script` against an `EIP-7702` compatible Anvil instance:

```sh
anvil --hardfork prague
```

Next, to use the cheatcodes in `forge script`:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract SignDelegationScript is Script {
    // Alice's address and private key (EOA with no initial contract code).
    address payable ALICE_ADDRESS = payable(0x70997970C51812dc3A010C7d01b50e0d17dc79C8);
    uint256 constant ALICE_PK = 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d;

    // Bob's address and private key (Bob will execute transactions on Alice's behalf).
    address constant BOB_ADDRESS = 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC;
    uint256 constant BOB_PK = 0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a;

    // Deployer's address and private key (used to deploy contracts).
    address private constant DEPLOYER_ADDRESS = 0xa0Ee7A142d267C1f36714E4a8F75612F20a79720;
    uint256 private constant DEPLOYER_PK = 0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6;

    // The contract that Alice will delegate execution to.
    SimpleDelegateContract public implementation;

    // ERC-20 token contract for minting test tokens.
    ERC20 public token;

    function run() external {
        // Step 1: Deploy delegation and ERC-20 contracts using the Deployer's key.
        vm.broadcast(DEPLOYER_PK);
        implementation = new SimpleDelegateContract();
        token = new ERC20(ALICE_ADDRESS);

        // Construct a single transaction call: Mint 100 tokens to Bob.
        SimpleDelegateContract.Call[] memory calls = new SimpleDelegateContract.Call[](1);
        bytes memory data = abi.encodeCall(ERC20.mint, (100, BOB_ADDRESS));
        calls[0] = SimpleDelegateContract.Call({to: address(token), data: data, value: 0});

        // Alice signs a delegation allowing `implementation` to execute transactions on her behalf.
        Vm.SignedDelegation memory signedDelegation = vm.signDelegation(address(implementation), ALICE_PK);

        // Bob attaches the signed delegation from Alice and broadcasts it.
        vm.broadcast(BOB_PK);
        vm.attachDelegation(signedDelegation);

        // As Bob, execute the transaction via Alice's assigned contract.
        SimpleDelegateContract(ALICE_ADDRESS).execute(calls);

        // Verify balance
        vm.assertEq(token.balanceOf(BOB_ADDRESS), 100);
    }
}
```

To run the script:

```sh
forge script script/SignDelegation.s.sol --rpc-url http://localhost:8545 --broadcast
```
