---
description: Build, test, and deploy smart contracts using Foundry's Docker image for portable and reproducible development workflows.
---

## Running Foundry inside of Docker

This guide shows you how to build, test, and deploy a smart contract using Foundry's Docker image. It adapts code from the [`first steps`] guide. If you haven't completed that guide yet, and are new to solidity, you may want to start with it first. Alternatively, if you have some familiarity with Docker and Solidity, you can use your own existing project and adjust accordingly.

> This guide is for illustrative purposes only and provided on an as-is basis. The guide is not audited nor fully tested. No code in this guide should be used in a production environment.

### Installation and Setup

The only installation required to run this guide is Docker, and optionally, an IDE of your choice.
Follow the [Docker installation instructions](/introduction/installation).

To keep future commands succinct, let's re-tag the image:
 `docker tag ghcr.io/foundry-rs/foundry:latest foundry:latest`

Having Foundry installed locally is not strictly required, but it may be helpful for debugging. You can install it using [foundryup](/introduction/installation#using-foundryup).

Finally, to use any of the `cast` or `forge create` portions of this guide, you will need access to an Ethereum node. If you don't have your own node running (likely), you can use a 3rd party node service. We won't recommend a specific provider in this guide. A good place to start learning about Nodes-as-a-Service is [Ethereum's article](https://ethereum.org/en/developers/docs/nodes-and-clients/nodes-as-a-service/) on the subject.

**For the rest of this guide, it is assumed that the RPC endpoint of your ethereum node is set like this**: `export RPC_URL=<YOUR_RPC_URL>`

### A tour around the Foundry docker image

The docker image can be used in two primary ways:

1. As an interface directly to forge and cast
2. As a base image for building your own containerized test, build, and deployment tooling

We will cover both, but let's start by taking a look at interfacing with foundry using docker. This is also a good test that your local installation worked!

We can run any of the `cast` [commands](/cast/reference/overview) against our docker image. Let's fetch the latest block information:

```sh
docker run foundry "cast block --rpc-url $RPC_URL latest"
baseFeePerGas        "0xb634241e3"
difficulty           "0x2e482bdf51572b"
extraData            "0x486976656f6e20686b"
gasLimit             "0x1c9c380"
gasUsed              "0x652993"
hash                 "0x181748772da2f968bcc91940c8523bb6218a7d57669ded06648c9a9fb6839db5"
logsBloom            "0x406010046100001198c220108002b606400029444814008210820c04012804131847150080312500300051044208430002008029880029011520380060262400001c538d00440a885a02219d49624aa110000003094500022c003600a00258009610c410323580032000849a0408a81a0a060100022505202280c61880c80020e080244400440404520d210429a0000400010089410c8408162903609c920014028a94019088681018c909980701019201808040004100000080540610a9144d050020220c10a24c01c000002005400400022420140e18100400e10254926144c43a200cc008142080854088100128844003010020c344402386a8c011819408"
miner                "0x1ad91ee08f21be3de0ba2ba6918e714da6b45836"
mixHash              "0xb920857687476c1bcb21557c5f6196762a46038924c5f82dc66300347a1cfc01"
nonce                "0x1ce6929033fbba90"
number               "0xdd3309"
parentHash           "0x39c6e1aa997d18a655c6317131589fd327ae814ef84e784f5eb1ab54b9941212"
receiptsRoot         "0x4724f3b270dcc970f141e493d8dc46aeba6fffe57688210051580ac960fe0037"
sealFields           []
sha3Uncles           "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347"
size                 "0x1d6bb"
stateRoot            "0x0d4b714990132cf0f21801e2931b78454b26aad706fc6dc16b64e04f0c14737a"
timestamp            "0x6246259b"
totalDifficulty      "0x9923da68627095fd2e7"
transactions         [...]
uncles               []
```

If we're in a directory with some Solidity [source code](https://github.com/dmfxyz/foundry-docker-guide), we can mount that directory into Docker and use `forge` however we wish. For example:

```sh
docker run -v $PWD:/app foundry "forge test --root /app --watch"
```

You can see our code was compiled and tested entirely within the container. Also, since we passed the `--watch` option, the container will recompile the code whenever a change is detected.

### Creating a "build and test" image

Let's use the Foundry docker image as a base for using our own Docker image. We'll use the image to:

1. Build our solidity code
2. Run our solidity tests

A simple `Dockerfile` can accomplish these two goals:

```docker
# Use the latest foundry image
FROM ghcr.io/foundry-rs/foundry

# Copy our source code into the container
WORKDIR /app

# Build and test the source code
COPY . .
RUN forge build
RUN forge test
```

You can build this docker image and watch forge build/run the tests within the container:

```sh
docker build --no-cache --progress=plain .
```

Now, what happens if one of our tests fails? Modify `src/test/Counter.t.sol` to make a false assertion. Try to build image again.

```solidity
function testFuzz_SetNumber(uint256 x) public {
    counter.setNumber(x);
    assertEq(counter.number(), 5);
}
```

```sh
docker build --no-cache --progress=plain .
<...>
#9 0.522 Failed tests:
#9 0.522 [FAIL: assertion failed: 425 != 5; counterexample: calldata=[...] args=[425]] testFuzz_SetNumber(uint256) (runs: 0, μ: 0, ~: 0)
#9 0.522
#9 0.522 Suite result: FAILED. 1 passed; 1 failed; 0 skipped; finished in 686.53µs (407.06µs CPU time)
------
error: failed to solve: executor failed running [/bin/sh -c forge test]: exit code: 1
```

Our image failed to build because our tests failed! This is actually a nice property, because it means if we have a Docker image that successfully built (and therefore is available for use), we know the code inside the image passed the tests.\*

> \*Of course, chain of custody of your docker images is very important. Docker layer hashes can be very useful for verification. In a production environment, consider [signing your docker images](https://docs.docker.com/engine/security/trust/#:~:text=To%20sign%20a%20Docker%20Image,the%20local%20Docker%20trust%20repository).

### Creating a "deployer" image

Now, we'll move on to a bit more of an advanced Dockerfile. Let's add an entrypoint that allows us to deploy our code by using the built (and tested!) image. We can target the Sepolia testnet first.

```docker
# Use the latest foundry image
FROM ghcr.io/foundry-rs/foundry

# Copy our source code into the container
WORKDIR /app

# Build and test the source code
COPY . .
RUN forge build
RUN forge test

# Set the entrypoint to the forge deployment command
ENTRYPOINT ["forge", "create"]
```

Let's build the image, this time giving it a name:

```sh
docker build --no-cache --progress=plain -t counter .
```

Here's how we can use our docker image to deploy:

```sh
docker run counter-deployer --rpc-url $RPC_URL --private-key $PRIVATE_KEY ./src/Counter.sol:Counter
No files changed, compilation skipped
Deployer: 0x496e09fcb240c33b8fda3b4b74d81697c03b6b3d
Deployed to: 0x23d465eaa80ad2e5cdb1a2345e4b54edd12560d3
Transaction hash: 0xf88c68c4a03a86b0e7ecb05cae8dea36f2896cd342a6af978cab11101c6224a9
```

We've just built, tested, and deployed our contract entirely within a Docker container! This guide was intended for testnet, but you can run the exact same Docker image targeting mainnet and be confident that the same code is being deployed by the same tooling.

### Why is this useful?

Docker is about portability, reproducibility, and environment invariance. This means you can be less concerned about unexpected changes when you switch between environments, networks, developers, etc. Here are a few basic examples of why one may like to use Docker images for smart contract deployment:

- Reduces overhead of ensuring system level dependencies match between deployment environments (e.g. does your production runner always have the same version of `forge` as your dev runner?)
- Increases confidence that code has been tested prior to deployment and has not been altered (e.g. if, in the above image, your code re-compiles on deployment, that's a major red flag).
- Eases pain points around segregation of duties: people with your mainnet credentials do not need to ensure they have the latest compiler, codebase, etc. It's easy to ensure that the docker deploy image someone ran in testnet is identical to the one targeting mainnet.
- Docker is an accepted standard on virtually all public cloud providers. It makes it easy to schedule jobs, tasks, etc that need to interact with the blockchain.

### Using `docker-compose` to launch Anvil

To launch Anvil using [Docker Compose](https://docs.docker.com/compose/) one could use the following `docker-compose.yml` configuration:

```yml
services:
  anvil:
    image: ghcr.io/foundry-rs/foundry
    container_name: anvil
    environment:
      ANVIL_IP_ADDR: "0.0.0.0"
    working_dir: /anvil
    ports:
      - "8545:8545"
    command: anvil
```

Finally, run `docker compose up`.

```
docker compose up
[+] Running 1/1
 ✔ Container anvil  Created
Attaching to anvil
anvil  |
anvil  |
anvil  |                              _   _
anvil  |                             (_) | |
anvil  |       __ _   _ __   __   __  _  | |
anvil  |      / _` | | '_ \  \ \ / / | | | |
anvil  |     | (_| | | | | |  \ V /  | | | |
anvil  |      \__,_| |_| |_|   \_/   |_| |_|
anvil  |
anvil  |     0.3.1-dev (fea38858b0 2025-01-21T16:48:49.865302749Z)
anvil  |     https://github.com/foundry-rs/foundry
anvil  |     ...
```
