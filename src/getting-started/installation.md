## Installation

If you encounter any issues during installation, refer to the [FAQ](../faq.md) for assistance.

### Precompiled Binaries

Precompiled binaries can be downloaded from the [GitHub releases page](https://github.com/foundry-rs/foundry/releases). For easier management, we recommend using [Foundryup](#using-foundryup).

### Using Foundryup

Foundryup is the official installer for the Foundry toolchain. You can learn more about it [here](https://github.com/foundry-rs/foundry/blob/master/foundryup/README.md).

To install Foundryup, open your terminal and run the following command:

```sh
curl -L https://foundry.paradigm.xyz | bash
```

This will install Foundryup. Simply follow the on-screen instructions, and the `foundryup` command will become available in your CLI.

Running `foundryup` will automatically install the latest (nightly) versions of the [precompiled binaries](#precompiled-binaries): `forge`, `cast`, `anvil`, and `chisel`. For additional options, such as installing a specific version or commit, run `foundryup --help`.

> ℹ️ **Note**  
> If you're using Windows, you'll need to install and use [Git BASH](https://gitforwindows.org/) or [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) as your terminal, since Foundryup currently doesn't support Powershell or Command Prompt (Cmd).

### Building from Source

#### Prerequisites

You’ll need the [Rust](https://rust-lang.org) compiler and Cargo, Rust's package manager. The easiest way to install both is by using [`rustup.rs`](https://rustup.rs/).

Foundry generally supports building only with the latest stable version of Rust. If you're using an older version of Rust, you can update it with `rustup`:

```sh
rustup update stable
```

For Windows users, you'll also need a recent version of [Visual Studio](https://visualstudio.microsoft.com/downloads/), with the "Desktop Development With C++" workload installed.

#### Building

You can either use the various flags provided by [Foundryup](#using-foundryup):

```sh
foundryup --branch master
foundryup --path path/to/foundry
```

Alternatively, you can install via Cargo with the following command:

```sh
cargo install --git https://github.com/foundry-rs/foundry --profile release --locked forge cast chisel anvil
```

You can also manually build from a local copy of the [Foundry repository](https://github.com/foundry-rs/foundry):

```sh
# clone the repository
git clone https://github.com/foundry-rs/foundry.git
cd foundry
# install Forge
cargo install --path ./crates/forge --profile release --force --locked
# install Cast
cargo install --path ./crates/cast --profile release --force --locked
# install Anvil
cargo install --path ./crates/anvil --profile release --force --locked
# install Chisel
cargo install --path ./crates/chisel --profile release --force --locked
```

### CI Installation with GitHub Actions

For instructions on setting up Foundry in a CI pipeline, refer to the [foundry-rs/foundry-toolchain](https://github.com/foundry-rs/foundry-toolchain) GitHub Action.

### Using Foundry with Docker

Foundry can also be run inside a Docker container. If you don’t have Docker installed, you can download it from [Docker's website](https://docs.docker.com/get-docker/).

Once Docker is installed, you can pull the latest Foundry release by running:

```sh
docker pull ghcr.io/foundry-rs/foundry:latest
```

You can also build the Docker image locally by running the following command from the Foundry repository:

```sh
docker build -t foundry .
```

For examples and guides on using this image, refer to the [Docker tutorial section](../tutorials/foundry-docker).

> ℹ️ **Note**  
> Some systems, including those with M1 chips, may experience issues when building the Docker image locally. This is a known issue.
