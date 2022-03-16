# Creating an NFT with solmate and foundry

This tutorial will run you through the steps create an Opensea compatible NFT and essentially rewrites this [guide](https://docs.opensea.io/docs/getting-started-1), while swapping hardhat  for foundry to deploy, call and test your NFT contract. Furthremore we will replace [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)'s ERC721 library with [solmate](https://github.com/Rari-Capital/solmate/blob/main/src/tokens/ERC721.sol)'s gas optimized version of it to implement our NFT contract. A full implementation of this tutorial can be found [here](https://github.com/FredCoen/nft-tutorial).

#### Create project and install dependencies

Start by setting up a foundry project following the steps outlined in the [Getting started section](https://onbjerg.github.io/foundry-book/getting-started/index.html). http://localhost:3000/getting-started/index.html. Furthermore we will install required dependencies to implement our NFT, namely solmate ERC721 implementation as well as some OpenZeppelin utility libraries. Install the dependencies by running:

```bash
forge install Rari-Capital/solmate
forge install OpenZeppelin/openzeppelin-contracts
```
These dependencies will be added as git submodules to your project.

If you have followed the instructions correctly your project should be structured like this:
tree -I 'node_modules|out' -L 2 


#### Implement a basic NFT

Let's rename the boilerplate src/Contract.sol to src/NFT.sol and copy the following code into your renamed file.

```
// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.10;

import "solmate/tokens/ERC721.sol";
import "openzeppelin-contracts/contracts/utils/Counters.sol";

contract NFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private currentTokenId;

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {
    }

    function mintTo(address recipient) public payable returns (uint256) {
        currentTokenId.increment();
        uint256 newItemId = currentTokenId.current();
        _safeMint(recipient, newItemId);
        return newItemId;
    }
}
```

Let's take a look at this very basic implementation of an NFT. We start by importing to contracts from our git submodules. We import solmate's gas optimized implementation of the ERC721 standard which our NFT contract can inherit from to avoid "re-inventing the wheel". We also import OpenZeppelin's Counter library to safely increment our tokenIds. Our constructor takes the _name and _symbol arguments for our NFT and passes them on to the contructor of the parent ERC721 implementation. Lastly we implement the mintTo function which allows anyone to mint an NFT from our contract by incrementing the currentTokenId and making use of the _safeMint function of our parent contract.

#### Compile & deploy with forge

To compile the NFT contract run ```forge build```. By default the compiler output will reside in the out directory. To deploy our compiled contract with forge we have to set environment variables for the RPC endpoint and the private key we want to deploy from.

Set your environment variables by running:
```bash
export RPC_URL=<Your RPC endpoint>
export PRIVATE_KEY=<Your wallets private key>
```

Once set you can deploy your NFT with forge running the below command while adding the relevant constructor arguments to the NFT contract:
```bash 
forge create NFT --rpc-url=$RPC_URL --private-key=$PRIVATE_KEY --constructor-args <name> <symbol>
```

If succesfully deployed, you will see the deploying wallet's address, the contract's address as well as the transaction hash printed to your console.

#### Minting NFTs from your contract

Calling functions on your NFT contract is made simple with foundry's cast, a command-line tool for interacting with EVM smart contracts, sending transactions, and getting chain data. Let's have a look at how we can use it to mint NFTs from our NFT contract.

Given that you already set your RPC and private key env variables during deployment, mint an NFT from your contract by running:
 ```bash
 cast send --rpc-url=$RPC_URL --private-key=$PRIVATE_KEY <contractAddress> "mintTo(address)" <arg>
 ```

Well done, you just minted your first NFT fron your contract. You can sanity check the owner of the NFT with currentTokenId equal to **0** by running the below ```cast call``` command. The address you provided above should be returned as the owner and printed to your console.

```bash
cast call --rpc-url=$RPC_URL --private-key=$PRIVATE_KEY <contractAddress> "ownerOf(uint256)" 0
```

#### Extending our NFT contract functionality and testing

Next, we will extend our NFT by adding metadata to represent the content of our NFTs, as well as set a minting price, a maximum supply and the possiblity to withdraw the collected proceeds from minting. To follow along you can replace your current NFT contract with the code snippet below:

```
// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.10;

import "solmate/tokens/ERC721.sol";
import "openzeppelin-contracts/contracts/utils/Counters.sol";
import "openzeppelin-contracts/contracts/utils/Strings.sol";
import "openzeppelin-contracts/contracts/security/PullPayment.sol";
import "openzeppelin-contracts/contracts/access/Ownable.sol";

contract NFT is ERC721, PullPayment, Ownable {
    using Counters for Counters.Counter;
    using Strings for uint256;
    Counters.Counter private currentTokenId;
    string public baseURI;

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
        require(
            msg.value == MINT_PRICE,
            "Transaction value did not equal the mint price"
        );
        uint256 tokenId = currentTokenId.current();
        require(tokenId < TOTAL_SUPPLY, "Max supply reached");
        currentTokenId.increment();
        uint256 newItemId = currentTokenId.current();
        _safeMint(recipient, newItemId);
        return newItemId;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            ownerOf[tokenId] != address(0),
            "ERC721Metadata: URI query for nonexistent token"
        );
        return
            bytes(baseURI).length > 0
                ? string(abi.encodePacked(baseURI, tokenId.toString()))
                : "";
    }

    /// @dev Overridden in order to make it an onlyOwner function
    function withdrawPayments(address payable payee) public override onlyOwner {
        super.withdrawPayments(payee);
    }
}
```

Let's test some of this added functionality to make sure it works as intended. Foundry offers an extremely fast EVM native testing framework through forge.

Within your test folder rename the current Contract.t.sol test file to to MintTo.t.sol. This file will contain all tests regarding the NFT's mintTo method. Next, replace the existing boilerplate code with the below:

```
// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.10;

import "ds-test/test.sol";
import "forge-std/stdlib.sol";
import "../NFT.sol";
import "./interfaces/HEVM.sol";

contract MintTo is DSTest {
    using stdStorage for StdStorage;

    Hevm private vm = Hevm(HEVM_ADDRESS);
    NFT private nft;
    StdStorage private stdstore;

    function setUp() public {
        // Deploy NFT contract
        nft = new NFT("NFT_tutorial", "TUT", "");
    }

    function testFailNoMintPricePaid() public {
        nft.mintTo(address(1));
    }

    function testMintPricePaid() public {
        nft.mintTo{value: 0.08 ether}(address(1));
    }

    function testFailMaxSupplyReached() public {
        uint256 slot = stdstore.target(address(nft)).sig("currentTokenId()").depth(0).find();
        bytes32 loc = bytes32(abi.encode(slot));
        bytes32 mockedCurrentTokenId = bytes32(abi.encode(10000));
        vm.store(address(nft), loc, mockedCurrentTokenId);
        nft.mintTo{value: 0.08 ether}(address(1));
    }

    function testFailMintToZeroAddress() public {
        nft.mintTo{value: 0.08 ether}(address(0));
    }

    function testNewMintOwnerRegistered() public {
        nft.mintTo{value: 0.08 ether}(address(1));
        uint256 slotOfNewOwner = stdstore
            .target(address(nft))
            .sig(nft.ownerOf.selector)
            .with_key(1)
            .find();

        uint160 ownerOfTokenIdOne = uint160(uint256((vm.load(address(nft),bytes32(abi.encode(slotOfNewOwner))))));
        assertEq(address(ownerOfTokenIdOne), address(1));
    }

    function testBalanceIncremented() public { 
        nft.mintTo{value: 0.08 ether}(address(1));
        uint256 slotBalance = stdstore
            .target(address(nft))
            .sig(nft.balanceOf.selector)
            .with_key(address(1))
            .find();
        
        uint256 balanceFirstMint = uint256(vm.load(address(nft), bytes32(slotBalance)));
        assertEq(balanceFirstMint, 1);

        nft.mintTo{value: 0.08 ether}(address(1));
        uint256 balanceSecondMint = uint256(vm.load(address(nft), bytes32(slotBalance)));
        assertEq(balanceSecondMint, 2);
    }

    function testSafeContractReceiver() public {
        Receiver receiver = new Receiver();
        nft.mintTo{value: 0.08 ether}(address(receiver));
         uint256 slotBalance = stdstore
            .target(address(nft))
            .sig(nft.balanceOf.selector)
            .with_key(address(receiver))
            .find();

        uint256 balance = uint256(vm.load(address(nft), bytes32(slotBalance)));
        assertEq(balance, 1);
    }
    
    function testFailUnSafeContractReceiver() public {
        vm.etch(address(1), bytes("mock code"));
        nft.mintTo{value: 0.08 ether}(address(1));
    }
}


contract Receiver is ERC721TokenReceiver {
    function onERC721Received(
        address operator,
        address from,
        uint256 id,
        bytes calldata data
    ) external returns (bytes4){
        return bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"));
    }
}
```

The test suite is set up as a contract with a setUp method which runs before every individual test. As you can see forge offers a number of [cheatcodes](https://onbjerg.github.io/foundry-book/forge/cheatcodes.html) to manipulate your state to accomondate to your testing scenario. For example, our testFailMaxSupplyReached test  checks that an attempt to mint fails when the max supply of NFT is reached. Thus the currentTokenId of the NFT contract needs to be set to the max supply by using the store cheatcode which allows you to write data to your contracts storage slots. The storage slots you wish to write to can easily be found using the 
forge-std helper library. If you want to put your forge skills to practice, write tests for the remaining methods of our NFT contract. Feel free to PR them [nft-tutorial]((https://github.com/FredCoen/nft-tutorial) where you will find the full implemenation of this tutorial.