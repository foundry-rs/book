## forge clone

### NAME

forge-clone - Clone a on-chain verified contract as a Forge project.

### SYNOPSIS

``forge clone`` [*options*] *address* [*root*]

### DESCRIPTION

Creates a new Forge project by cloning the source code of an on-chain verified contract in the directory *root* (by default the current working directory).

By default, `forge clone` clones contracts from Ethereum mainnet (via Etherscan), but it is also possible to clone from other EVM-compatible blockchains that foundry supports, e.g., BNB Smart Chain (BSC), by specifying chain ID: `--chain <ChainID>`.

Obtaining data from Etherscan is subject to rate limit. `forge clone` requires two API calls to Etherscan to collect source code and deployment information, respectively. By default, `forge clone` will wait for *5* seconds between the two Etherscan invocations to avoid rate limit errors. 

Specifying Etherscan API key via `--etherscan-api-key <API_KEY>` will increase Etherscan API rate limit and avoid the *5-second* wait time in `forge clone`.

Just as `forge init`, `forge clone` will by default initialize a new git repository, install some submodules and create an initial commit message.

If you do not want this behavior, pass `--no-git`.

### OPTIONS

#### Clone Options

`-c` *chain_id*  
`--chain` *chain_id*  
&nbsp;&nbsp;&nbsp;&nbsp;Specify the name or EIP-155 ID of the chain to clone contract from.

`-e` *api_key*  
`--etherscan-api-key` *api_key*  
&nbsp;&nbsp;&nbsp;&nbsp;Specify the API key of Etherscan (or equivalent).

`--no-remappings-txt`  
&nbsp;&nbsp;&nbsp;&nbsp;Put remappings inside the `foundry.toml` configuration file, instead of generating a separate `remappings.txt` file.

#### VCS Options

`--no-commit`  
&nbsp;&nbsp;&nbsp;&nbsp;Do not create an initial commit.

`--no-git`  
&nbsp;&nbsp;&nbsp;&nbsp;Do not create a git repository.

#### Display Options

`-q`  
`--quiet`  
&nbsp;&nbsp;&nbsp;&nbsp;Do not print any messages.

{{#include common-options.md}}

### EXAMPLES

1. Clone UniswapV3Pool contract from Ethereum mainnet:
    ```sh
    forge clone 0x8f8EF111B67C04Eb1641f5ff19EE54Cda062f163 UniswapV3Pool 
    ```

2. Clone a contract, but do not create a git repository:
    ```sh
    forge clone --no-git 0x8f8EF111B67C04Eb1641f5ff19EE54Cda062f163 UniswapV3Pool
    ```

3. Clone a contract from BNB Smart Chain (BSC):
    ```sh
    forge clone --chain bsc 0x7862D9B4bE2156B15d54F41ee4EDE2d5b0b455e4 UniswapV3Pool 
    ```

### Metadata

The cloned Forge project comes with an additional `.clone.meta` metadata file in the root directory.
`clone.meta` is a compact JSON data file that contains the information of the on-chain contract instance. 
The metadata includes:
- `path`: The path to the source file that contains the declaration of contract deployed on chain.
- `targetContract`: The name of the on-chain contract in the source file.
- `address`: The address of the contract deployed on chain.
- `chainId`: EIP-155 ID of the chain where the contract is deployed.
- `creationTransaction`: The hash of the transaction that deployed the contract.
- `deployer`: The account address who is the sender of the `creationTransaction`.
- `constructorArguments`: The constructor arguments that is used when deploying the contract.
- `storageLayout`: The storage layout of the on-chain contract (if the corresponding contract compiler version supports exporting storage layout).

### SEE ALSO

[forge](./forge.md)
