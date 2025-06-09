---
description: Secure private key management strategies using hardware wallets, keystores, and throwaway keys for script execution.
---

## Key Management

Script execution requires a private key to send transactions. This key controls all funds in the account, so it must be protected carefully. There are a few options for securely broadcasting transactions through a script:

### Using Hardware Wallet

Hardware wallets such as Ledger and Trezor store seed phrases in a secure enclave. Forge can send a raw transaction to the wallet, and the wallet will sign the transaction. The signed transaction is returned to forge and broadcaster. This way, private keys never leave the hardware wallet, making this a very secure approach. To use a hardware wallet with scripts, see the `--ledger` and `--trezor` [flags](/forge/reference/forge-script).

### Using Private Keys

With this approach you expose a private key on your machine, making it riskier than the above option. Therefore the suggested way to directly use a private key is to generate a new wallet for executing the script, and only send that wallet enough funds to run the script. Then, stop using the key after the script is complete. This way, if the key is compromised, only the funds on this throwaway key are lost, as opposed to losing everything in your wallet.

1.  It's very important that your scripts or contracts don't rely on `msg.sender` since the sender will not be an account that's meant to be used again. For example, if a deploy script configures a contract owner, ensure the owner a constructor argument and not set to `msg.sender`.

2.  To use this approach, you can either store the private key in an environment variable and use cheat codes to read it in, or use the `--private-key` flag to directly provide the key.

### Using a keystore

This can be thought of as a middle ground between the above two approaches. With [`cast wallet import`](/cast/reference/cast-wallet-import) you import a private key and encrypt it with a password. This still temporarily exposes your private key on your machine, but it becomes encrypted and you'll provide the password to decrypt it to run a script.

Additional security precautions when using scripts:

1. Use a separate wallet for testing and development, instead of using your main wallet with real funds. Diversifying minimizes the risk of losing funds if your development wallet is compromised.
2. If you accidentally push a private key or seed phrase to GitHub, or expose it online via other means—even momentarily—treat it as compromised. Act immediately to transfer your funds to a safer destination.
3. When in doubt about whether a wallet contains real funds or not, assume it does. Always be certain about a wallet's balances and status when using it for development purposes. Use [blockscan](https://blockscan.com/) to easily check many chains to see where the address has been used.
4. Remember that adding an account in wallets like Metamask generates a new private key. However, that private key is derived from the same mnemonic as the other accounts generated in that wallet. Therefore, never expose the mnemonic as it may compromise all of your accounts.

_This was section was inspired by [The Pledge](https://github.com/smartcontractkit/full-blockchain-solidity-course-js/discussions/5) from [Patrick Collins](https://twitter.com/PatrickAlphaC)._
