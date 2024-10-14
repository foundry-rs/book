## Non inlinable libraries

Compiling contracts without linking non-inlinable libraries is currently not supported. Libraries need to be deployed before building contracts using them. 

When building the contracts, the addresses need to be passed using the `libraries` config which contains a list of `CONTRACT_PATH`:`ADDRESS` mappings.

on `foundry.toml`:

```toml
libraries = [
    "src/MyLibrary.sol:MyLibrary:0xfD88CeE74f7D78697775aBDAE53f9Da1559728E4"
]
```

as a `cli` flag:

```bash
forge build --zksync --libraries src/MyLibrary.sol:MyLibrary:0xfD88CeE74f7D78697775aBDAE53f9Da1559728E4

```

For more information please refer to [official docs](https://docs.zksync.io/build/developer-reference/ethereum-differences/libraries).

### Listing missing libraries

To scan missing non-inlinable libraries, you can build the project using the `--zk-detect-missing-libraries` flag. This will give a list of the libraries that need to be deployed and their addresses provided via the `libraries` option for the contracts to compile. Metadata about the libraries will be saved in `.zksolc-libraries-cache/missing_library_dependencies.json`.


