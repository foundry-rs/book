# Summary

[Introduction](./README.md)

# Getting Started

- [Installation](./getting-started/installation.md)
- [First Steps with Foundry](./getting-started/first-steps.md)

# Projects

- [Creating a New Project](./projects/creating-a-new-project.md)
- [Working on an Existing Project](./projects/working-on-an-existing-project.md)
- [Dependencies](./projects/dependencies.md)
- [Project Layout](./projects/project-layout.md)

# Forge Overview

- [Overview of `forge`](./forge/README.md)
- [Tests](./forge/tests.md)
  - [Writing Tests](./forge/writing-tests.md)
  - [Cheatcodes](./forge/cheatcodes.md)
  - [Understanding Traces](./forge/traces.md)
  - [Forking Mode](./forge/forking-mode.md)
<!--  - [Coverage Reports]() !-->
- [Advanced Testing](./forge/advanced-testing.md)
  - [Fuzz Testing](./forge/fuzz-testing.md)
<!--  - [Invariant Testing]() !-->
<!--  - [Symbolic Testing]() !-->
<!--  - [Table Testing]() !-->
<!--  - [Mutation Testing]() !-->
<!-- - [Linting and Formatting]() !-->
<!-- - [Generating Documentation]() !-->
- [Deploying and Verifying](./forge/deploying.md)
- [Gas Tracking](./forge/gas-tracking.md)
  - [Gas Reports](./forge/gas-reports.md)
  - [Gas Snapshots](./forge/gas-snapshots.md)
- [Debugger](./forge/debugger.md)

# Cast Overview

- [Overview of `cast`](./cast/README.md)

# Configuration

- [Configuring with `foundry.toml`](./config/README.md)
- [Continuous Integration](./config/continous-integration.md)
- [Integrating with VSCode](./config/vscode.md)
- [Shell Autocompletion](./config/shell-autocompletion.md)

# Tutorials

- [Creating an NFT with Solmate](./tutorials/solmate-nft.md)
- [Docker and Foundry](./tutorials/foundry-docker.md)
<!-- - [Incremental Adoption]() !-->

# Appendix

- [FAQ]()
- [References]()
  - [`forge` Reference]()
  - [`cast` Reference](./reference/cast.md)
  - [`foundry.toml` Reference](./reference/config.md)
  - [`ds-test` Reference](./reference/ds-test.md)
  - [Cheatcodes Reference](./cheatcodes/README.md)
    - [Environment](./cheatcodes/environment.md)
      - [`warp`](./cheatcodes/warp.md)
      - [`roll`](./cheatcodes/roll.md)
      - [`fee`](./cheatcodes/fee.md)
      - [`store`](./cheatcodes/store.md)
      - [`load`](./cheatcodes/load.md)
      - [`etch`](./cheatcodes/etch.md)
      - [`deal`](./cheatcodes/deal.md)
      - [`prank`](./cheatcodes/prank.md)
      - [`startPrank`](./cheatcodes/start-prank.md)
      - [`stopPrank`](./cheatcodes/stop-prank.md)
      - [`record`](./cheatcodes/record.md)
      - [`accesses`](./cheatcodes/accesses.md)
      - [`setNonce`](./cheatcodes/set-nonce.md)
      - [`getNonce`](./cheatcodes/get-nonce.md)
      - [`mockCall`](./cheatcodes/mock-call.md)
      - [`clearMockedCalls`](./cheatcodes/clear-mocked-calls.md)
    - [Assertions](./cheatcodes/assertions.md)
      - [`expectRevert`](./cheatcodes/expect-revert.md)
      - [`expectEmit`](./cheatcodes/expect-emit.md)
      - [`expectCall`](./cheatcodes/expect-call.md)
    - [Fuzzer](./cheatcodes/fuzzer.md)
      - [`assume`](./cheatcodes/assume.md)
    - [External](./cheatcodes/external.md)
      - [`ffi`](./cheatcodes/ffi.md)
      - [`getCode`](./cheatcodes/get-code.md)
    - [Utilities](./cheatcodes/utilities.md)
      - [`addr`](./cheatcodes/addr.md)
      - [`sign`](./cheatcodes/sign.md)
      - [`label`](./cheatcodes/label.md)
