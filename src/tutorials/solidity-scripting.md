## Solidity Scripting

### Introduction

Solidity scripting is a way to declaratively deploy contracts using Solidity, instead of using the more limiting and less user friendly [`forge create`](../reference/forge/forge-create.md).

Solidity scripts are like the scripts you write when working with tools like Hardhat; what makes Solidity scripting different is that they are written in Solidity instead of JavaScript, and they are run on the fast Foundry EVM backend, which provides dry-run capabilities.

### Set Up

Let’s try to deploy the NFT contract made in the solmate tutorial with solidity scripting. First of all, we would need to create a new Foundry project via:

```bash
forge init solidity-scripting
```

Since the NFT contract from the solmate tutorial inherits both `solmate` and `OpenZeppelin` contracts, we’ll have to install them as dependencies by running:

```bash
# Enter the project
cd solidity-scripting

# Install Solmate and OpenZeppelin contracts as dependencies
forge install transmissions11/solmate Openzeppelin/openzeppelin-contracts
```

Next, we have to delete the `Counter.sol` file in the `src` folder and create another file called `NFT.sol`. You can do this by running:

```bash
rm src/Counter.sol test/Counter.t.sol && touch src/NFT.sol && ls src
```

![set up commands](../images/solidity-scripting%20/set-up-commands.png)

Once that’s done, you should open up your preferred code editor and copy the code below into the `NFT.sol` file.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.10;

import "solmate/tokens/ERC721.sol";
import "openzeppelin-contracts/contracts/utils/Strings.sol";
import "openzeppelin-contracts/contracts/access/Ownable.sol";

error MintPriceNotPaid();
error MaxSupply();
error NonExistentTokenURI();
error WithdrawTransfer();

contract NFT is ERC721, Ownable {

    using Strings for uint256;
    string public baseURI;
    uint256 public currentTokenId;
    uint256 public constant TOTAL_SUPPLY = 10_000;
    uint256 public constant MINT_PRICE = 0.08 ether;

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _baseURI
    ) ERC721(_name, _symbol) {
        baseURI = _baseURI;
    }

    function mintTo(address recipient) public payable returns (uint256) {
        if (msg.value != MINT_PRICE) {
            revert MintPriceNotPaid();
        }
        uint256 newTokenId = ++currentTokenId;
        if (newTokenId > TOTAL_SUPPLY) {
            revert MaxSupply();
        }
        _safeMint(recipient, newTokenId);
        return newTokenId;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        if (ownerOf(tokenId) == address(0)) {
            revert NonExistentTokenURI();
        }
        return
            bytes(baseURI).length > 0
                ? string(abi.encodePacked(baseURI, tokenId.toString()))
                : "";
    }

    function withdrawPayments(address payable payee) external onlyOwner {
        uint256 balance = address(this).balance;
        (bool transferTx, ) = payee.call{value: balance}("");
        if (!transferTx) {
            revert WithdrawTransfer();
        }
    }
}
```

Now, let’s try compiling our contract to make sure everything is in order.

```bash
forge build
```

If your output looks like this, the contracts successfully compiled.
![compile successful](../images/solidity-scripting%20/compile-successful.png)

### Deploying our contract

We’re going to deploy the `NFT` contract to the Rinkeby testnet, but to do this we’ll need to configure Foundry a bit, by setting things like a Rinkeby RPC URL, the private key of an account that’s funded with Rinkeby Eth, and an Etherscan key for the verification of the NFT contract.

> 💡 Note: You can get some Rinkeby testnet ETH [here](https://faucet.paradigm.xyz/) .

Once you have all that create a `.env` file and add the variables.

The .env file should follow this format:

```bash
RINKEBY_RPC_URL=
PRIVATE_KEY=
ETHERSCAN_KEY=
```

Next, we have to create a folder and name it `script` and create a file in it called `NFT.s.sol`. This is where we will create the deployment script itself.

The contents of `NFT.s.sol` should look like this:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/NFT.sol";

contract MyScript is Script {
    function run() external {
        vm.startBroadcast();

        NFT nft = new NFT("NFT_tutorial", "TUT", "baseUri");

        vm.stopBroadcast();
    }
}
```

Now let’s read through the code and figure out what it actually means and does.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
```

Remember even if it’s a script it still works like a smart contract, but is never deployed, so just like any other smart contract written in Solidity the `pragma version` has to be specified.

```solidity
import "forge-std/Script.sol";
import "../src/NFT.sol";
```

Just like we may import Forge Std to get testing utilities when writing tests, Forge Std also provides some scripting utilities that we import here.

The next line just imports the `NFT` contract.

```solidity
contract MyScript is Script {
```

We create a contract called `MyScript` and it inherits `Script` from Forge Std.

```solidity
 function run() external {
```

By default, scripts are executed by calling the function named `run`, our entrypoint.

```solidity
vm.startBroadcast();
```

This is a special cheatcode that records calls and contract creations made by our main script contract. Later, we will broadcast these transactions to deploy our NFT contract.

```solidity
 NFT nft = new NFT("NFT_tutorial", "TUT", "baseUri");
```

Here we just create our NFT contract. Because we called `vm.startBroadcast()` before this line, the contract creation will be recorded by Forge, and as mentioned previously, we can broadcast the transaction to deploy the contract on-chain. The broadcast transaction logs will be stored in the `broadcast` directory by default. You can change the logs location by setting [`broadcast`](../reference/config/project.md#broadcast) in your `foundry.toml` file.

Now that you’re up to speed about what the script smart contract does, let’s run it.

You should have added the variables we mentioned earlier to the `.env` for this next part to work.

At the root of the project run:

```bash
# To load the variables in the .env file
source .env

# To deploy and verify our contract
forge script script/NFT.s.sol:MyScript --rpc-url $RINKEBY_RPC_URL  --private-key $PRIVATE_KEY --broadcast --verify --etherscan-api-key $ETHERSCAN_KEY -vvvv
```

Forge is going to run our script and broadcast the transactions for us - this can take a little while, since Forge will also wait for the transaction receipts. You should see something like this after a minute or so:

![contract verified](../images/solidity-scripting%20/contract-verified.png)

This confirms that you have successfully deployed the `NFT` contract to the Rinkeby testnet and have also verified it on Etherscan, all with one command.

### Deploying locally

You can deploy to Anvil, the local testnet, by configuring the port as the `fork-url`.

First, start Anvil:

```sh
anvil
```

Then run the following script with one of the private keys given to you by Anvil:

```sh
forge script script/NFT.s.sol:MyScript --fork-url http://localhost:8545 \
 --private-key $PRIVATE_KEY0 --broadcast
```

> 💡 Note: A full implementation of this tutorial can be found [here](https://github.com/Perelyn-sama/solidity-scripting) and for further reading about solidity scripting, you can check out the `forge script` [reference](../reference/forge/forge-script.md).
