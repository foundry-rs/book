## Installation

<!-- If you face any issues while installing, check out the [FAQ](../faq.md). -->

### Precompiled binaries

Precompiled binaries are available from the [GitHub releases page](https://github.com/matter-labs/foundry-zksync/releases).
Currently due to active development it's recommended to use the latest [nightly](https://github.com/matter-labs/foundry-zksync/releases/tag/nightly) from the releases page.

### Using Foundryup-zksync

Foundryup-zksync is the Foundry-ZKsync toolchain installer. You can find more about it [here](https://github.com/matter-labs/foundry-zksync/tree/main/foundryup-zksync/README.md).

Open your terminal and run the following command from the repository:

```sh
curl -L https://raw.githubusercontent.com/matter-labs/foundry-zksync/main/install-foundry-zksync | bash
```

This will install Foundryup-zksync, then simply follow the instructions on-screen,
which will make the `foundryup-zksync` command available in your CLI.

Running `foundryup-zksync` by itself will install the latest (nightly) [precompiled binaries](#precompiled-binaries): `forge` and `cast`.
See `foundryup-zksync --help` for more options, like installing from a specific version or commit.

> ℹ️ **Note**
>
> Currently only `forge` and `cast` are supported for ZKsync. Other commands retain their original behavior but may not work as intended.

> ℹ️ **Note**
>
> If you're on Windows, you will need to install and use [Git BASH](https://gitforwindows.org/) or [WSL](https://learn.microsoft.com/en-us/windows/wsl/install),
> as your terminal, since Foundryup-zksync currently does not support Powershell or Cmd. Windows support is currently provided as best-effort.

### Building from source

#### Prerequisites

You will need the [Rust](https://rust-lang.org) compiler and Cargo, the Rust package manager.
The easiest way to install both is with [`rustup.rs`](https://rustup.rs/).

Foundry-ZKsync generally only supports building on the [configured](https://github.com/matter-labs/foundry-zksync/blob/main/rust-toolchain) nightly Rust version.
The presence of `rust-toolchain` file automatically downloads the correct nightly rust version when commands are run from the Foundry-ZKsync directory.

On Windows, you will also need a recent version of [Visual Studio](https://visualstudio.microsoft.com/downloads/),
installed with the "Desktop Development With C++" Workloads option.

#### Building

You can either use the different [Foundryup-ZKsync](#using-foundryup) flags:

```sh
foundryup-zksync --branch master
foundryup-zksync --path path/to/foundry-zksync
```

Or, by using a single Cargo command:

```sh
cargo install --git https://github.com/matter-labs/foundry-zksync --profile release --locked forge cast
```

Or, by manually building from a local copy of the [Foundry-ZKsync repository](https://github.com/matter-labs/foundry-zksync):

```sh
# clone the repository
git clone https://github.com/matter-labs/foundry-zksync.git
cd foundry
# install Forge
cargo install --path ./crates/forge --profile release --force --locked
# install Cast
cargo install --path ./crates/cast --profile release --force --locked
```

### Installing for CI in Github Action

The latest binaries for the appropriate architecture can be installed directly using the following GitHub Action:

```yaml
steps:
    - name: Install Foundry-ZKsync
      uses: dutterbutter/foundry-zksync-toolchain@v1
```

For further details, visit the [foundry-zksync-toolchain repository](https://github.com/dutterbutter/foundry-zksync-toolchain).

### Using Foundry with Docker

> ℹ️ **Note**
>
> No prebuilt images are available for docker yet.
