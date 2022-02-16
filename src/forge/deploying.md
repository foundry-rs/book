## Deploying

Forge can deploy smart contracts to a given network with the `forge create` command.

To deploy a contract, you must provide a RPC URL (env: `ETH_RPC_URL`) and the private key of the account that will deploy the contract.

To deploy `MyContract` to a network:
```sh
$ forge create --rpc-url <your_rpc_url> --private-key <your_private_key> src/MyContract.sol:MyContract
compiling...
success.
Deployer: 0xa735b3c25f...
Deployed to: 0x4054415432...
Transaction hash: 0x6b4e0ff93a...
```

Use the `--constructor-args` flag to pass arguments to the constructor:

```solidity
pragma solidity ^0.8.0;
import {ERC20} from "solmate/tokens/ERC20.sol";

contract MyToken is ERC20 {
    constructor(
        string memory name,
        string memory symbol,
        uint8 decimals,
        uint256 initialSupply
    ) ERC20(name, symbol, decimals) {
        _mint(msg.sender, initialSupply);
    }
}
```

```sh
$ forge create --rpc-url <your_rpc_url> --constructor-args "ForgeUSD" "FUSD" 18 1000000000000000000000 --private-key <your_private_key> src/MyToken.sol:MyToken
```

<br>

### Troubleshooting

##### `Invalid character 'x' at position 1`
Make sure the private key string does not begin with `0x`.

##### `EIP-1559 not activated`
EIP-1559 is not supported or not activated on the RPC server. Pass the `--legacy` flag to use legacy transactions instead of the EIP-1559 ones. If you do development in a local environment, you can use Hardhat instead of Ganache.

##### `Failed to parse tokens`
Make sure the passed arguments are of correct type.

##### `Signature error`
Make sure the private key is correct.