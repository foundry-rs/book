## Etherscan

Configuration related to Etherscan, such as API keys. This configuration is used in various places by Forge.

The `[etherscan]` section is a mapping of keys to Etherscan configuration tables. The Etherscan configuration tables hold the following keys:

- `key` (string) (**required**): The Etherscan API key for the given network. The value of this property can also point to an environment variable.
- `chain`: The chain name or ID of the chain this Etherscan configuration is for.
- `url`: The Etherscan API URL.

If the key of the configuration is a chain name, then `chain` is not required, otherwise it is. `url` can be used to explicitly set the Etherscan API URL for chains not natively supported by name.

Using TOML inline table syntax, all of these are valid:

```toml
[etherscan]
mainnet = { key = "${ETHERSCAN_MAINNET_KEY}" }
mainnet2 = { key = "ABCDEFG", chain = "mainnet" }
optimism = { key = "1234567" }
unknown_chain = { key = "ABCDEFG", url = "<etherscan api url for this chain>" }
```
