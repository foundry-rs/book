## Static Analyzers

### Slither

To test your project using [slither](https://github.com/crytic/slither), here is a sample `slither.config.json`:

```json
{
  "filter_paths": "lib",
  "solc_remaps": [
    "ds-test/=lib/ds-test/src/",
    "forge-std/=lib/forge-std/src/",
  ]
}
```

See the [slither wiki](https://github.com/crytic/slither/wiki/Usage) for more information.

### Mythril

To test your project using [mythril](https://github.com/ConsenSys/mythril), here is a sample `mythril.config.json`:

```json
{
  "remappings": [
    "ds-test/=lib/ds-test/src/",
    "forge-std/=lib/forge-std/src/",
  ],
  "optimizer": {
    "enabled": true,
    "runs": 200
  }
}
```

See the [mythril docs](https://mythril-classic.readthedocs.io/en/master/) for more information.
