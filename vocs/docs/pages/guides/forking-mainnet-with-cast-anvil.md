---
description: Fork live Ethereum networks using Anvil and interact with real contracts using Cast for testing and experimentation.
---

## Forking Mainnet with `Cast` and `Anvil`

By combining [Anvil][anvil] and [Cast][cast], you can fork and test by interacting with contracts on a real network. The goal of this guide is to show you how to transfer DAI tokens from someone who holds DAI to an account created by Anvil.

## Getting started

Let's start by forking mainnet.

```sh
anvil --fork-url https://mainnet.infura.io/v3/$INFURA_KEY
```

You will see 10 accounts are created with their public and private keys. We will work with `0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266` (Let's call this user Alice).

## Transferring DAI

Go to Etherscan and search for holders of DAI tokens ([here](https://etherscan.io/token/0x6b175474e89094c44da98b954eedeac495271d0f#balances)). Let's pick a random account. In this example we will be using `0xfc2eE3bD619B7cfb2dE2C797b96DeeCbD7F68e46`. Let's export our contracts and accounts as environment variables:

```sh
export ALICE=0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
export DAI=0x6b175474e89094c44da98b954eedeac495271d0f
export UNLUCKY_USER=0xfc2eE3bD619B7cfb2dE2C797b96DeeCbD7F68e46
```

We can check Alice's balance using [`cast call`][cast-call]:

```sh
cast call $DAI \
  "balanceOf(address)(uint256)" \
  $ALICE
0
```

Similarly, we can also check our unlucky user's balance using `cast call`:

```sh
cast call $DAI \
  "balanceOf(address)(uint256)" \
  $UNLUCKY_USER
21840114973524208109322438
```

Let's transfer some tokens from the unlucky user to Alice using [`cast send`][cast-send]:

```sh
# This calls Anvil and lets us impersonate our unlucky user
cast rpc anvil_impersonateAccount $UNLUCKY_USER
cast send $DAI \
--from $UNLUCKY_USER \
  "transfer(address,uint256)(bool)" \
  $ALICE \
  300000000000000000000000 \
  --unlocked
blockHash               0xbf31c45f6935a0714bb4f709b5e3850ab0cc2f8bffe895fefb653d154e0aa062
blockNumber             15052891
...
```

Let's check that the transfer worked:

```sh
cast call $DAI \
  "balanceOf(address)(uint256)" \
  $ALICE
300000000000000000000000

cast call $DAI \
  "balanceOf(address)(uint256)" \
  $UNLUCKY_USER
21540114973524208109322438
```

[anvil]: ../reference/anvil/
[cast]: ../cast/reference/
[cast-call]: ../cast/reference/cast-call.md
[cast-send]: ../cast/reference/cast-send.md
