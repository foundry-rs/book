## Deploying

Forge can deploy your conracts to given network with `forge create` command. To deploy your contract you need to provide rpc url and private key of the address which going to deploy the contract to network.

To deploy `MyContract` to local development instance:
```sh
forge create  --rpc-url http://127.0.0.1:8545 --private-key ac0974b...ff80 src/MyContract.sol:MyContract
```  

Alternatively you can set `ETH_RPC_URL` environment value instead of providing `--rpc-url` option if env value and command line option both provided command line will be used.
```sh
>export ETH_RPC_URL="http://127.0.0.1:8545/"
>forge create --private-key ac0974b...ff80 MyContract.sol:MyContract
```

When you need to send arguements to `constructor` of your smart contract you need to pass `--constructor-args` there can be multiple args. 

```solidity
contract Hello is ERC20 {
  constructor(
    string memory name_,
    string memory ticker_,
    uint256 totalSupply_
  ) {
    //...
  }
}
```

```sh
>forge create --rpc-url http://127.0.0.1:8545 --constructor-args ForgeUSD  --constructor-args FUSD  --constructor-args 1000000000 Hello.sol:Hello
```



### Quick troubleshot
#### Error message: Invalid character 'x' at position 1
 > When you write your private key you should delete `0x` in the beginning. Instead of writing `--private-key 0xac0974b...ff80` write `--private-key ac0974b...ff80`

#### Error message: The method eth_feeHistory does not exist/is not available.
 > It means RPC doesn't support `eth_feeHistory` method. As a sample truffle/Ganache doesn't support this method. With `--legacy` flag you can use legacy transactions instead of `EIP1559` ones. If you do development in local environment you can also use `hardhat` instead of `ganache`

#### Error message: Failed to parse tokens
 > Check your arguements which sent with `--constructor-args` make sure their types are matching contract constructor function.

#### Error message: Signature error
 > Make sure your private key is correct.




Currently there is an ongoing effort to develop `forge build` command to make deployment experience better. Process can be seen here: https://github.com/gakonst/foundry/issues/402 
