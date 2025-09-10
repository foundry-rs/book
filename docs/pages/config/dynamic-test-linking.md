## Dynamic Test Linking

[v1.1 release](https://github.com/foundry-rs/foundry/releases/tag/v1.1.0) comes with dynamic test linking feature, built on top of [Solar](https://github.com/paradigmxyz/solar), which eliminates redundant test compilation when changing the contract logic, Foundry skips recompiling large test suites, resulting in massive time savings.

How it works:

On the initial build, Foundry preprocesses test contracts by extracting constructor parameters of the contracts under test and replacing direct instantiations with [`deployCode` cheatcodes](/reference/cheatcodes/get-deployed-code).

Subsequent compilations reuse pre-built artifacts for deployed contracts instead of recompiling both the source and all associated test contracts.
Dynamic test linking capability is built on top of [Solar](https://github.com/paradigmxyz/solar), the blazingly fast and modular Solidity compiler.

You can enable this feature by setting the `dynamic_test_linking` configuration option to `true` in your `foundry.toml` file:

```toml
[profile.default]
...
dynamic_test_linking = true
```

OR by passing the `--dynamic-test-linking` flag to the `forge build` command:

```bash
forge build --dynamic-test-linking
```

We are looking into enabling this by default in the future.

Benchmarks from the [PR](https://github.com/foundry-rs/foundry/pull/10010) show greater than 10x speedup in compilation time for large projects:

| Project                                                                                                                  | Change                                                                                                                                                                              | Files compiled (with / without, after initial compile) | Time to compile (with / without, after initial compile) |
| ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------- |
| [uniswap v4-core](https://github.com/Uniswap/v4-core/tree/80311e34080fee64b6fc6c916e9a51a437d0e482)                      | add `Lock.lock();` at [PoolManager.sol#L107](https://github.com/Uniswap/v4-core/blob/80311e34080fee64b6fc6c916e9a51a437d0e482/src/PoolManager.sol#L107)                             | 1 / 19                                                 | 2.25s / 165.13s                                         |
| [spark-psm](https://github.com/sparkdotfi/spark-psm/tree/9d0bcc045e81407408368c9a4bb6e3f13db77e32)                       | change `amountOut < minAmountOut` at [PSM3.sol#L125](https://github.com/sparkdotfi/spark-psm/blob/9d0bcc045e81407408368c9a4bb6e3f13db77e32/src/PSM3.sol#L125)                       | 3 / 28                                                 | 2.14s / 16.15s                                          |
| [morpho-blue-bundlers](https://github.com/morpho-org/morpho-blue-bundlers/tree/1fa17256abb86c4de48fd5e251ebd46aae70ca1a) | change `if (assets < 0)` at [MorphoBundler.sol#L106](https://github.com/morpho-org/morpho-blue-bundlers/blob/1fa17256abb86c4de48fd5e251ebd46aae70ca1a/src/MorphoBundler.sol#L106)   | 11 / 36                                                | 16.39s / 251.05s                                        |
| [morpho-blue](https://github.com/morpho-org/morpho-blue/commit/9e2b0755b47bbe5b09bf1be8f00e060d4eab6f1c)                 | add `require(assets != 0, ErrorsLib.ZERO_ASSETS)` at [Morpho.sol#L424](https://github.com/morpho-org/morpho-blue/blob/9e2b0755b47bbe5b09bf1be8f00e060d4eab6f1c/src/Morpho.sol#L424) | 1 / 23                                                 | 1.01s / 133.73s                                         |
| [sablier lockup](https://github.com/sablier-labs/lockup/tree/b2f33926fcac72a1a855c6b8ccaa75166895f13c)                   | change `if (cliffTime < 0)` at [SablierLockup.sol#L480](https://github.com/sablier-labs/lockup/blob/b2f33926fcac72a1a855c6b8ccaa75166895f13c/src/SablierLockup.sol#L480)            | 1 / 104                                                | 781ms / 71.29s                                          |
| [solady](https://github.com/Vectorized/solady/commit/724c39bdfebb593157c2dfa6797c07a25dfb564c)                           | add additional `_setOwner(newOwner)` at [Ownable.sol#L182](https://github.com/Vectorized/solady/blob/724c39bdfebb593157c2dfa6797c07a25dfb564c/src/auth/Ownable.sol#L182)            | 9 / 14                                                 | 6.17s / 6.34s                                           |
| [euler evc](https://github.com/euler-xyz/ethereum-vault-connector/commit/64f6d2171a57e02a0f95bcbdecf1d92e9d253d40)       | change `SET_MAX_ELEMENTS` to `11` at [Set.sol#L7](https://github.com/euler-xyz/ethereum-vault-connector/blob/64f6d2171a57e02a0f95bcbdecf1d92e9d253d40/src/Set.sol#L7)               | 28 / 30                                                | 9.17s / 9.40s                                           |
