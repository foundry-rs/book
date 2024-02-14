## Precompile Registry

Precompiles are special contracts at fixed addresses that are included within the EVM. In addition to common precompiles included with other EVM environments, Foxar includes a few precompiles for environment mutation, logging data, and contract deployment.

Note that, while some chains like Optimism have bytecode deployed at a predetermined address, making them 'pre-deploys', we treat them as precompiles within the context of Foxar.

### Registry

| Chain ID      | Address                                      | Name                             |
| ------------- | -------------------------------------------- | -------------------------------- |
| ALL           | `0x01`                                       | ECRecover                        |
| ALL           | `0x02`                                       | SHA-256                          |
| ALL           | `0x03`                                       | RIPEMD-160                       |
| ALL           | `0x04`                                       | Identity                         |
| ALL           | `0x05`                                       | ModExp                           |
| ALL           | `0x06`                                       | ECAdd                            |
| ALL           | `0x07`                                       | ECMul                            |
| ALL           | `0x08`                                       | ECPairing                        |
| ALL           | `0x09`                                       | Blake2F                          |
| 10, 420       | `0x4200000000000000000000000000000000000016` | L2ToL1MessagePasser              |
| 10, 420       | `0x4200000000000000000000000000000000000002` | DeployerWhitelist                |
| 10, 420       | `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000` | LegacyERC20ETH                   |
| 10, 420       | `0x4200000000000000000000000000000000000006` | WETH9                            |
| 10, 420       | `0x4200000000000000000000000000000000000007` | L2CrossDomainMessenger           |
| 10, 420       | `0x4200000000000000000000000000000000000010` | L2StandardBridge                 |
| 10, 420       | `0x4200000000000000000000000000000000000011` | SequencerFeeVault                |
| 10, 420       | `0x4200000000000000000000000000000000000012` | OptimismMintableERC20Factory     |
| 10, 420       | `0x4200000000000000000000000000000000000013` | L1BlockNumber                    |
| 10, 420       | `0x420000000000000000000000000000000000000F` | GasPriceOracle                   |
| 10, 420       | `0x4200000000000000000000000000000000000015` | L1Block                          |
| 10, 420       | `0x4200000000000000000000000000000000000042` | GovernanceToken                  |
| 10, 420       | `0x4200000000000000000000000000000000000000` | LegacyMessagePasser              |
| 10, 420       | `0x4200000000000000000000000000000000000014` | L2ERC721Bridge                   |
| 10, 420       | `0x4200000000000000000000000000000000000017` | OptimismMintableERC721Factory    |
| 10, 420       | `0x4200000000000000000000000000000000000018` | ProxyAdmin                       |
| 42161, 421613 | `0x0000000000000000000000000000000000000064` | ArbSys                           |
| 42161, 421613 | `0x000000000000000000000000000000000000006E` | ArbRetryableTx                   |
| 42161, 421613 | `0x000000000000000000000000000000000000006C` | ArbGasInfo                       |
| 42161, 421613 | `0x0000000000000000000000000000000000000066` | ArbAddressTable                  |
| 42161, 421613 | `0x000000000000000000000000000000000000006F` | ArbStatistics                    |
| 42161, 421613 | `0x00000000000000000000000000000000000000C8` | NodeInterface                    |
| 42161, 421613 | `0x0000000000000000000000000000000000000067` | ArbBLS                           |
| 42161, 421613 | `0x0000000000000000000000000000000000000065` | ArbInfo                          |
| 42161, 421613 | `0x000000000000000000000000000000000000006D` | ArbAggregator                    |
| 42161, 421613 | `0x0000000000000000000000000000000000000068` | ArbFunctionTable                 |
| 433114, 43113 | `0x0200000000000000000000000000000000000000` | ContractDeployerAllowListAddress |
| 433114, 43113 | `0x0200000000000000000000000000000000000001` | ContractNativeMinterAddress      |
| 433114, 43113 | `0x0200000000000000000000000000000000000002` | TxAllowListAddress               |
| 433114, 43113 | `0x0200000000000000000000000000000000000003` | FeeConfigManagerAddress          |
| ALL           | `0x4e59b44847b379578588920cA78FbF26c0B4956C` | (Foxar) Create2Deployer        |
| ALL           | `0x7109709ECfa91a80626fF3989D68f67F5b1DD12D` | (Foxar) VM                     |
| ALL           | `0x000000000000000000636F6e736F6c652e6c6f67` | (Foxar) Console                |

### Reserved Ranges

Some chains also include reserved ranges for precompile contracts.

| Chain ID      | Start                                        | Stop                                         |
| ------------- | -------------------------------------------- | -------------------------------------------- |
| ALL           | `0x00`                                       | `0xff`                                       |
| 433114, 43113 | `0x0100000000000000000000000000000000000000` | `0x01000000000000000000000000000000000000ff` |
| 433114, 43113 | `0x0200000000000000000000000000000000000000` | `0x02000000000000000000000000000000000000ff` |
| 433114, 43113 | `0x0300000000000000000000000000000000000000` | `0x03000000000000000000000000000000000000ff` |
