# Using cast with ZKSync

> ℹ️ **Note**
>
> `cast call` for ZKSync requires `--zksync` and a `--private-key`, since there is no zero address to default to. This is especially important when obtaining traces.

```sh
cast call --zksync --private-key <PRIVATE_KEY> 0x5FbDB2315678afecb367f032d93F642f64180aa3 "number()" --rpc-url https://sepolia.era.zksync.dev --trace
```


