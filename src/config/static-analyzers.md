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

In order to use a custom configuration, such as the sample `slither.config.json` mentioned above, the following command is used as mentioned in the [slither-wiki](https://github.com/crytic/slither/wiki/Usage#configuration-file). By default slither looks for the `slither-config.json` but you can define the path and any other `json` file of your choice:

```sh 
slither --config-file <path>/file.config.json Counter.sol
```
Example output (Raw):

```bash 
Pragma version^0.8.13 (Counter.sol#2) necessitates a version too recent to be trusted. Consider deploying with 0.6.12/0.7.6/0.8.7
solc-0.8.13 is not recommended for deployment
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-versions-of-solidity

setNumber(uint256) should be declared external:
        - Counter.setNumber(uint256) (Counter.sol#7-9)
increment() should be declared external:
        - Counter.increment() (Counter.sol#11-13)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#public-function-that-could-be-declared-external
Counter.sol analyzed (1 contracts with 78 detectors), 4 result(s) found
```


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
