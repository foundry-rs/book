## Working on an Existing Project

If you download an existing project that uses Foundry, it is really easy to get going.

First, get the project from somewhere. In this example, we will clone the `forge-std` repository from GitHub:

```sh
$ git clone --recursive https://github.com/brockelmore/forge-std
$ cd forge-std
```

Notice that we clone with the `--recursive` flag. This automatically pulls git submodules (which we use as dependencies) as well in case there are any. Alternatively, run `forge install` after cloning to install dependencies.

To build, use `forge build`:

```sh
$ forge build
compiling...
success.
```

And to test, use `forge test`:

```sh
$ forge test
compiling...
no files changed, compilation skipped.
Running 9 tests for StdCheatsTest.json:StdCheatsTest
[PASS] testDeployCode() (gas: 1420013)
[PASS] testDeployCodeNoArgs() (gas: 1404320)
[PASS] testHoax() (gas: 11140)
[PASS] testHoaxDifferentAddresses() (gas: 11303)
[PASS] testHoaxOrigin() (gas: 11151)
[PASS] testRewind() (gas: 3703)
[PASS] testSkip() (gas: 3617)
[PASS] testStartHoax() (gas: 19791)
[PASS] testStartHoaxOrigin() (gas: 19819)

Running 9 tests for StdErrorsTest.json:StdErrorsTest
[PASS] testExpectArithmetic() (gas: 4457)
[PASS] testExpectAssertion() (gas: 4272)
[PASS] testExpectDiv() (gas: 4348)
[PASS] testExpectEnum() (gas: 4357)
[PASS] testExpectIntern() (gas: 4308)
[PASS] testExpectMem() (gas: 4306)
[PASS] testExpectMod() (gas: 4381)
[PASS] testExpectOOB() (gas: 4326)
[PASS] testExpectPop() (gas: 6440)

Running 27 tests for StdStorageTest.json:StdStorageTest
[PASS] testFailStorageCheckedWriteMapPacked() (gas: 115875)
[PASS] testFailStorageConst() (gas: 69497)
[PASS] testFailStorageNativePack() (gas: 289225)
[PASS] testStorageCheckedWriteDeepMap() (gas: 109464)
[PASS] testStorageCheckedWriteDeepMapStructA() (gas: 126800)
[PASS] testStorageCheckedWriteDeepMapStructB() (gas: 143407)
[PASS] testStorageCheckedWriteHidden() (gas: 99322)
[PASS] testStorageCheckedWriteMapAddr() (gas: 104614)
[PASS] testStorageCheckedWriteMapBool() (gas: 104792)
[PASS] testStorageCheckedWriteMapPackedSuccess() (gas: 102196)
[PASS] testStorageCheckedWriteMapStructA() (gas: 121756)
[PASS] testStorageCheckedWriteMapStructB() (gas: 138114)
[PASS] testStorageCheckedWriteMapUint() (gas: 104330)
[PASS] testStorageCheckedWriteObvious() (gas: 76022)
[PASS] testStorageCheckedWriteStructA() (gas: 110620)
[PASS] testStorageCheckedWriteStructB() (gas: 125241)
[PASS] testStorageDeepMap() (gas: 89814)
[PASS] testStorageDeepMapStructA() (gas: 106860)
[PASS] testStorageDeepMapStructB() (gas: 123422)
[PASS] testStorageHidden() (gas: 81583)
[PASS] testStorageMapAddrFound() (gas: 85716)
[PASS] testStorageMapStructA() (gas: 102441)
[PASS] testStorageMapStructB() (gas: 118860)
[PASS] testStorageMapUintFound() (gas: 85544)
[PASS] testStorageObvious() (gas: 58208)
[PASS] testStorageStructA() (gas: 92477)
[PASS] testStorageStructB() (gas: 107076)
```
