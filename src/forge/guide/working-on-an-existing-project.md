## Working on an Existing Project

If you download an existing project that uses Foundry, it is really easy to get going.

First, get the project from somewhere. In this example, we will clone the `forge-std` repository from GitHub:

```sh
$ git clone --recursive https://github.com/brockelmore/forge-std
$ cd forge-std
```

Notice that we clone with the `--recursive` flag. This automatically pulls git submodules (which we use as dependencies) as well in case there are any.

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
Running 4 tests for StdCheatsTest.json:StdCheatsTest
[PASS] testHoax() (gas: 12061)
[PASS] testHoaxOrigin() (gas: 12227)
[PASS] testStartHoax() (gas: 21464)
[PASS] testStartHoaxOrigin() (gas: 21619)

Running 9 tests for StdErrorsTest.json:StdErrorsTest
[PASS] testExpectArithmetic() (gas: 5652)
[PASS] testExpectAssertion() (gas: 4839)
[PASS] testExpectDiv() (gas: 5533)
[PASS] testExpectEnum() (gas: 5435)
[PASS] testExpectIntern() (gas: 5021)
[PASS] testExpectMem() (gas: 4884)
[PASS] testExpectMod() (gas: 5555)
[PASS] testExpectOOB() (gas: 5462)
[PASS] testExpectPop() (gas: 6991)

Running 26 tests for StdStorageTest.json:StdStorageTest
[PASS] testFailStorageCheckedWriteMapPacked() (gas: 130438)
[PASS] testFailStorageConst() (gas: 81915)
[PASS] testFailStorageNativePack() (gas: 332331)
[PASS] testStorageCheckedWriteDeepMap() (gas: 241705)
[PASS] testStorageCheckedWriteDeepMapStructA() (gas: 270910)
[PASS] testStorageCheckedWriteDeepMapStructB() (gas: 319479)
[PASS] testStorageCheckedWriteHidden() (gas: 167166)
[PASS] testStorageCheckedWriteMapAddr() (gas: 214549)
[PASS] testStorageCheckedWriteMapPackedSuccess() (gas: 213075)
[PASS] testStorageCheckedWriteMapStructA() (gas: 243722)
[PASS] testStorageCheckedWriteMapStructB() (gas: 291929)
[PASS] testStorageCheckedWriteMapUint() (gas: 214525)
[PASS] testStorageCheckedWriteObvious() (gas: 143624)
[PASS] testStorageCheckedWriteStructA() (gas: 190036)
[PASS] testStorageCheckedWriteStructB() (gas: 236141)
[PASS] testStorageDeepMap() (gas: 207713)
[PASS] testStorageDeepMapStructA() (gas: 236545)
[PASS] testStorageDeepMapStructB() (gas: 285069)
[PASS] testStorageHidden() (gas: 136554)
[PASS] testStorageMapAddrFound() (gas: 182086)
[PASS] testStorageMapStructA() (gas: 210616)
[PASS] testStorageMapStructB() (gas: 258995)
[PASS] testStorageMapUintFound() (gas: 182100)
[PASS] testStorageObvious() (gas: 112963)
[PASS] testStorageStructA() (gas: 158602)
[PASS] testStorageStructB() (gas: 204879)
```
