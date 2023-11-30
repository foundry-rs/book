## Installation

If you face any issues while installing, check out the [FAQ](../faq.md).

### Precompiled binaries

Precompiled binaries are available from the [GitHub releases page](https://github.com/foundry-rs/foundry/releases).
These are better managed by using [Foundryup](#using-foundryup).

### Using Foundryup

Foundryup is the Foundry toolchain installer. You can find more about it [here](https://github.com/foundry-rs/foundry/blob/master/foundryup/README.md).

Open your terminal and run the following command:

```sh
curl -L https://foundry.paradigm.xyz | bash
```

This will install Foundryup, then simply follow the instructions on-screen,
which will make the `foundryup` command available in your CLI.

Running `foundryup` by itself will install the latest (nightly) [precompiled binaries](#precompiled-binaries): `forge`, `cast`, `anvil`, and `chisel`.
See `foundryup --help` for more options, like installing from a specific version or commit.

> ℹ️ **Note**
>
> If you're on Windows, you will need to install and use [Git BASH](https://gitforwindows.org/) or [WSL](https://learn.microsoft.com/en-us/windows/wsl/install),
> as your terminal, since Foundryup currently does not support Powershell or Cmd.

### Building from source

#### Prerequisites

You will need the [Rust](https://rust-lang.org) compiler and Cargo, the Rust package manager.
The easiest way to install both is with [`rustup.rs`](https://rustup.rs/).

Foundry generally only supports building on the latest stable Rust version.
If you have an older Rust version, you can update with `rustup`:

```sh
rustup update stable
```

On Windows, you will also need a recent version of [Visual Studio](https://visualstudio.microsoft.com/downloads/),
installed with the "Desktop Development With C++" Workloads option.

#### Building

You can either use the different [Foundryup](#using-foundryup) flags:

```sh
foundryup --branch master
foundryup --path path/to/foundry
```

Or, by using a single Cargo command:

```sh
cargo install --git https://github.com/foundry-rs/foundry --profile local --locked forge cast chisel anvil
```

Or, by manually building from a local copy of the [Foundry repository](https://github.com/foundry-rs/foundry):

```sh
# clone the repository
git clone https://github.com/foundry-rs/foundry.git
cd foundry
# install Forge
cargo install --path ./crates/forge --profile local --force --locked
# install Cast
cargo install --path ./crates/cast --profile local --force --locked
# install Anvil
cargo install --path ./crates/anvil --profile local --force --locked
# install Chisel
cargo install --path ./crates/chisel --profile local --force --locked
```

### Installing for CI in Github Action

See the [foundry-rs/foundry-toolchain](https://github.com/foundry-rs/foundry-toolchain) GitHub Action.

### Using Foundry with Docker

Foundry can also be used entirely within a Docker container. If you don't have it, Docker can be installed directly from [Docker's website](https://docs.docker.com/get-docker/).

Once installed, you can download the latest release by running:

```sh
docker pull ghcr.io/foundry-rs/foundry:latest
```

It is also possible to build the docker image locally. From the Foundry repository, run:

```sh
docker build -t foundry .
```

For examples and guides on using this image, see the [Docker tutorial section](../tutorials/foundry-docker).

> ℹ️ **Note**
>
> Some machines (including those with M1 chips) may be unable to build the docker image locally. This is a known issue.
