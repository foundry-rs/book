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

Slither also has a [github action](https://github.com/marketplace/actions/slither-action) for CI/CD.

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
myth analyze src/Contract.sol --solc-json mythril.config.json
```

See the [mythril docs](https://mythril-classic.readthedocs.io/en/develop/) for more information.

The syntax for using a custom `json` with `mythril` is described in the command help which can be seen as follows:

Mythril help, and grepping the line which describes how to use the custom `json`.
```bash 
myth analyze --help | grep "solc"
```
Output:
```bash 
 [--solc-json SOLC_JSON] [--solv SOLV] [-c BYTECODE]
  --solc-json SOLC_JSON
                        Json for the optional 'settings' parameter of solc's standard-json input
```
Command usage with custom `json`, and for illustration purposes adding some more verbosity via `-v 4`. The verbosity level illustrates all the tests which are being done by `mythx` as described [here](https://mythril-classic.readthedocs.io/en/master/analysis-modules.html).
```bash 
myth -v 4 analyze src/Counter.sol --solc-json <path>/mythril.config.json
```
Example Output (with process output lines removed for conciseness):
```bash 
.
.
mythril.laser.plugin.loader [INFO]: Loading laser plugin: coverage
mythril.laser.plugin.loader [INFO]: Loading laser plugin: mutation-pruner
.
.
Achieved 11.56% coverage for code: 608060405234801561001057600080fd5b5060f78061001f6000396000f3fe6080604052348015600f57600080fd5b5060043610603c5760003560e01c80633fb5c1cb1460415780638381f58a146053578063d09de08a14606d575b600080fd5b6051604c3660046083565b600055565b005b605b60005481565b60405190815260200160405180910390f35b6051600080549080607c83609b565b9190505550565b600060208284031215609457600080fd5b5035919050565b60006001820160ba57634e487b7160e01b600052601160045260246000fd5b506001019056fea2646970667358221220659fce8aadca285da9206b61f95de294d3958c409cc3011ded856f421885867464736f6c63430008100033
mythril.laser.plugin.plugins.coverage.coverage_plugin [INFO]: Achieved 90.13% coverage for code: 6080604052348015600f57600080fd5b5060043610603c5760003560e01c80633fb5c1cb1460415780638381f58a146053578063d09de08a14606d575b600080fd5b6051604c3660046083565b600055565b005b605b60005481565b60405190815260200160405180910390f35b6051600080549080607c83609b565b9190505550565b600060208284031215609457600080fd5b5035919050565b60006001820160ba57634e487b7160e01b600052601160045260246000fd5b506001019056fea2646970667358221220659fce8aadca285da9206b61f95de294d3958c409cc3011ded856f421885867464736f6c63430008100033
mythril.laser.plugin.plugins.instruction_profiler [INFO]: Total: 1.0892839431762695 s
[ADD         ]   0.9974 %,  nr      9,  total   0.0109 s,  avg   0.0012 s,  min   0.0011 s,  max   0.0013 s
.
.
[SWAP1       ]   1.8446 %,  nr     18,  total   0.0201 s,  avg   0.0011 s,  min   0.0010 s,  max   0.0013 s
[SWAP2       ]   0.8858 %,  nr      9,  total   0.0096 s,  avg   0.0011 s,  min   0.0010 s,  max   0.0011 s

mythril.analysis.security [INFO]: Starting analysis
mythril.mythril.mythril_analyzer [INFO]: Solver statistics: 
Query count: 61 
Solver time: 3.6820807456970215
The analysis was completed successfully. No issues were detected.
```
- The findings will be listed at the end of this output if any. Since the default `Counter.sol` does't have any logic, `mythx` reports `no issues were found`.