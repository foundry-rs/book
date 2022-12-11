## Forking Mainnet with Cast and Anvil

### Introduction

By combining [Anvil][anvil] and [Cast][cast], you can fork and test by interacting with contracts on a real network. The goal of this tutorial is to show you how to transfer Dai tokens from someone who holds Dai to an account created by Anvil.

### Set Up

Let's start by forking mainnet.

```sh
anvil --fork-url https://mainnet.infura.io/v3/$INFURA_KEY
```

You will see 10 accounts are created with their public and private keys. We will work with `0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266` (Let's call this user Alice).

### Transferring Dai

Go to Etherscan and search for holders of Dai tokens ([here](https://etherscan.io/token/0x6b175474e89094c44da98b954eedeac495271d0f#balances)). Let's pick a random account. In this example we will be using `0xad0135af20fa82e106607257143d0060a7eb5cbf`. Let's export our contracts and accounts as environment variables:

```sh
export ALICE=0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
export DAI=0x6b175474e89094c44da98b954eedeac495271d0f
export LUCKY_USER=0xad0135af20fa82e106607257143d0060a7eb5cbf
```

We can check Alice's balance using [`cast call`][cast-call]:

```sh
$ cast call $DAI \
  "balanceOf(address)(uint256)" \
  $ALICE
0
```

Similarly, we can also check our lucky user's balance using `cast call`:

```sh
$ cast call $DAI \
  "balanceOf(address)(uint256)" \
  $LUCKY_USER
71686045944718512103110072
```

Let's transfer some tokens from the lucky user to Alice using [`cast send`][cast-send]:

```sh
# This calls Anvil and lets us impersonate our lucky user
$ cast rpc anvil_impersonateAccount $LUCKY_USER
$ cast send $DAI \
--from $LUCKY_USER \
  "transfer(address,uint256)(bool)" \
  $ALICE \
  1686045944718512103110072
blockHash               0xbf31c45f6935a0714bb4f709b5e3850ab0cc2f8bffe895fefb653d154e0aa062
blockNumber             15052891
...
```

Let's check that the transfer worked:

```sh
cast call $DAI \
  "balanceOf(address)(uint256)" \
  $ALICE
1686045944718512103110072

$ cast call $DAI \
  "balanceOf(address)(uint256)" \
  $LUCKY_USER
70000000000000000000000000
```

[anvil]: ../reference/anvil/
[cast]: ../reference/cast/
[cast-call]: ../reference/cast/cast-call.md
[cast-send]: ../reference/cast/cast-send.md
