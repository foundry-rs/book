#  Deploy-time linking with zksolc

Contrary to `solc`, unlinked bytecode in `zksolc` contains their link references using the ELF format, thus a simple text search & replace is not sufficient.

This document doesn't go into detail on how to perform linking, for that please refer to the official compiler documentation, instead it focuses on _where_ this happens within `foundry-zksync`.

## General flow

The process of linking happens in 2 separate sections of `foundry` code, during the build of the `MultiContractRunner` for `forge test` and during the build of `LinkedBuildData` as part of `forge script`.

The main difference between the two is that tests collect all missing library references across all contracts and collate them together to then deploy them for each test contract, effectively deploying all libraries for all tests; contrary to scripts where `foundry` will collect references and link only libraries in the target script's dependency tree.

Therefore, the general flow is:
1. collect all dependencies of the target(s)
2. perform linking by precalculating the address of each library
  a. using `CREATE` with a single pass (tests only allow this methodology)
  b. using `CREATE2` with multiple passes until the list exhaustion
3. collect the linked contracts as well as the libraries to deploy
  a. specifically for zksync: register linked contracts in `DualCompiledContracts`
4. perform deployment according to the selected opcode
5. deploy test/script & invoke 

We will now go into the details of each step, explaining the differences between the EVM flow and EraVM's.

### Dependency resolution

The main difference in dependency resolution is the introduction of factory dependencies. This means that factory dependencies may remain unlinked during compilation due to their reliance on a (missing) library.
Unlinked contracts don't have a bytecode hash, thus they are not present in the compiler output's `factoryDependencies`, but instead are present in the new `factoryDependenciesUnlinked` encoded as a set of `<path>:<name>` describing the referenced contracts.
We thus also traverse the unlinked factory dependencies to collect the library references in use, to be able to fully link all the dependencies of the target contract.

It's important to match the references for factory deps with the link input contracts so the compiler can resolve them.

### Address precalculation

Here the real difference is the computation of the address, because zksync uses a different prefix (and also different parameters for `CREATE2`). No other major changes, other than ignoring the factory deps's address calculation as that doesn't apply here.

### Linked contracts

This is the main difference, where for `solc` only a text & replace is necessary, for `zksolc` we need to invoke the compiler with the `--link` argument and pass the list of bytecodes to link as well as the list of libraries to link against.

The output will contain both the ignored and remaining unlinked contracts (which should be empty due to foundry linking everything) as well as the newly fully linked bytecodes.

After this process we consume the linked bytecodes to register them in the context's `DualCompiledContracts`, to be able to translate between EVM and EraVM.

The list of libraries to deploy remains unused, as instead the `DualCompiledContracts` collection contains the bytecode necessary to perform the EraVM deployment

### Library deployment

This step happens twice, as we now need to deploy the library both in EVM and EraVM, due to the difference in address calculation between the two VMs.

We relegate most of this to the strategy's `deploy_library` method which takes care of doing the deployment in the backend as well as returning the equivalent broadcastable transaction that is useful in the context of `forge script`.

As far as EraVM goes, we reproduce the environment before the EVM deployment and then execute the deployment according to the scheme in use, and if it's `CREATE2` we make use of the `CREATE2` factory.

### Test/script deployment and invocation

No changes here, as now any contract deployed on EraVM that depended on a library will contain the appropriate address, which contains the appropriate EraVM bytecode
