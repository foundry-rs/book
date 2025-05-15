## Etherscan

Configuration related to Etherscan, such as API keys. This configuration is used in various places by Forge.

The `[etherscan]` section is a mapping of keys to Etherscan configuration tables. 

With Etherscan API V2, only Etherscan keys are valid, which can be used to access all similar explorers (e.g. BscScan / BaseScan / Polygonscan).

```toml
[etherscan]
mainnet = { key = "${ETHERSCAN_MAINNET_KEY}" }
```
