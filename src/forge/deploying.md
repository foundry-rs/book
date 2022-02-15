## Deploying

Forge can deploy your conracts to given network with `forge create` command. To deploy your contract you need to provide rpc url and private key of the address which going to deploy the contract to network.

To deploy `MyContract` to local development instance:
```sh
$ forge create  --rpc-url http://127.0.0.1:8545 --private-key ac0974b...ff80 src/MyContract.sol:MyContract
compiling...
success.
Deployer: 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
Deployed to: 0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0
```  

Alternatively you can set `ETH_RPC_URL` environment value instead of providing `--rpc-url` option if env value and command line option both provided command line will be used.
```sh
$ export ETH_RPC_URL="http://127.0.0.1:8545/"
$ forge create --private-key ac0974b...ff80 MyContract.sol:MyContract
compiling...
```

Use the `--constructor-args` flag to pass arguments to the constructor.

```solidity
pragma solidity ^0.8.0;
import "openz/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor(
    string memory name_,
    string memory symbol_,
    uint256 initialSupply_
    ) ERC20(name_, symbol_) {
        _mint(msg.sender, initialSupply_);
    }
}

```

```sh
$ forge create --rpc-url http://127.0.0.1:8545 --constructor-args ForgeUSD  --constructor-args FUSD  --constructor-args 1000000000000000000000 --private-key df57...3656e MyToken.sol:MyToken
:MyToken
compiling...
no files changed, compilation skipped.
Deployer: 0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199
Deployed to: 0x73511669fd4de447fed18bb79bafeac93ab7f31f
```



### Quick troubleshot
#### Error message: Invalid character 'x' at position 1
 > When you write your private key you should delete `0x` in the beginning. Instead of writing `--private-key 0xac0974b...ff80` write `--private-key ac0974b...ff80`

#### Error message: The method eth_feeHistory does not exist/is not available.
 > It means EIP-1559 is not activated on the RPC server. With `--legacy` flag you can use legacy transactions instead of the `EIP1559` ones. If you do development in a local environment, you can also use `hardhat` instead of `ganache`

#### Error message: Failed to parse tokens
 > Check your arguements which sent with `--constructor-args` make sure their types are matching contract constructor function.

#### Error message: Signature error
 > Make sure your private key is correct.




Currently there is an ongoing effort to develop `forge build` command to make deployment experience better. Process can be seen here: https://github.com/gakonst/foundry/issues/402 
