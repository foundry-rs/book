## `arithmeticError`

### Signature

```solidity
stdError.arithmeticError
```

### Description

The internal Solidity error when an arithmetic operation fails, e.g. underflow and overflow.

### Example

Assume we have a basic vault contract that can store some token (`wmdToken`):

```solidity
contract BasicVault {

    IERC20 public immutable wmdToken;   
    mapping(address => uint) public balances;

    event Deposited(address indexed from, uint amount);
    event Withdrawal(address indexed from, uint amount);

    constructor(IERC20 wmdToken_){
        wmdToken = wmdToken_;
    }

    function deposit(uint amount) external {    
        balances[msg.sender] += amount;
        bool success = wmdToken.transferFrom(msg.sender, address(this), amount);
        require(success, "Deposit failed!"); 
        emit Deposited(msg.sender, amount);
    }

    function withdraw(uint amount) external {      
        balances[msg.sender] -= amount;
        bool success = wmdToken.transfer(msg.sender, amount);
        require(success, "Withdrawal failed!");
        emit Withdrawal(msg.sender, amount);
    }
}
```

We have a test function to ensure that a user is unable to withdraw tokens in excess of his deposit, like so:

```solidity
function testUserCannotWithdrawExcessOfDeposit() public {
    vm.prank(user);
    vm.expectRevert(stdError.arithmeticError);
    vault.withdraw(userTokens + 100*10**18);
}
```

1. User has tokens of amount `userTokens` deposited in a Vault contract.
2. User attempts to withdraw tokens of amount in excess of his deposits.
3. This leads to an underflow error, resulting from: `balances[msg.sender] -= amount;` as it would evaluate into a negative value.

To catch the error "Arithmetic over/underflow", we insert `vm.expectRevert(stdError.arithmeticError)` just before the function call that is expected to result in an underflow.
