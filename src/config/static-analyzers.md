## Static Analyzers

### Slither

To test your project using [slither](https://github.com/crytic/slither), here is a sample `slither.config.json`:

```json
{
  "filter_paths": "lib",
  "solc_remaps": [
    "ds-test/=lib/ds-test/src/",
    "forge-std/=lib/forge-std/src/"
  ]
}
```

Note, you need to update `solc` used by Slither to the same version used by Forge with `solc-select`:
```ignore
pip3 install slither-analyzer
pip3 install solc-select
solc-select install 0.8.13
solc-select use 0.8.13
slither src/Contract.sol
```

See the [slither wiki](https://github.com/crytic/slither/wiki/Usage) for more information.

### Mythril

To test your project using [mythril](https://github.com/ConsenSys/mythril), here is a sample `mythril.config.json`:

```json
{
  "remappings": [
    "ds-test/=lib/ds-test/src/",
    "forge-std/=lib/forge-std/src/"
  ],
  "optimizer": {
    "enabled": true,
    "runs": 200
  }
}
```

Note, you need switch `rustc` to nightly to install `mythril`:
```ignore
rustup default nightly
pip3 install mythril
myth analyze src/Contract.sol --sol-json mythril.config.json
```

See the [mythril docs](https://mythril-classic.readthedocs.io/en/develop/) for more information.
