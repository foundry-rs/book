## Installation

If you face any issues while installing, check out the [FAQ](../faq.md).

### Precompiled binaries

Precompiled binaries are available from the [GitHub releases page](https://github.com/foxar-rs/foxar/releases).
These are better managed by using [Foxarup](#using-foxarup).

### Using Foxarup

Foxarup is the Foxar toolchain installer. You can find more about it [here](https://github.com/foxar-rs/foxar/blob/master/foxarup/README.md).

Open your terminal and run the following command:

```sh
curl -L https://foxar.paradigm.xyz | bash
```

This will install Foxarup, then simply follow the instructions on-screen,
which will make the `foxarup` command available in your CLI.

Running `foxarup` by itself will install the latest (nightly) [precompiled binaries](#precompiled-binaries): `spark`, `probe`, `shuttle`, and `pilot`.
See `foxarup --help` for more options, like installing from a specific version or commit.

> ℹ️ **Note**
>
> If you're on Windows, you will need to install and use [Git BASH](https://gitforwindows.org/) or [WSL](https://learn.microsoft.com/en-us/windows/wsl/install),
> as your terminal, since Foxarup currently does not support Powershell or Cmd.

### Building from source

#### Prerequisites

You will need the [Rust](https://rust-lang.org) compiler and Cargo, the Rust package manager.
The easiest way to install both is with [`rustup.rs`](https://rustup.rs/).

Foxar generally only supports building on the latest stable Rust version.
If you have an older Rust version, you can update with `rustup`:

```sh
rustup update stable
```

On Windows, you will also need a recent version of [Visual Studio](https://visualstudio.microsoft.com/downloads/),
installed with the "Desktop Development With C++" Workloads option.

#### Building

You can either use the different [Foxarup](#using-foxarup) flags:

```sh
foxarup --branch master
foxarup --path path/to/foxar
```

Or, by using a single Cargo command:

```sh
cargo install --git https://github.com/foxar-rs/foxar --profile local --locked spark probe pilot shuttle
```

Or, by manually building from a local copy of the [Foxar repository](https://github.com/foxar-rs/foxar):

```sh
# clone the repository
git clone https://github.com/foxar-rs/foxar.git
cd foxar
# install Spark
cargo install --path ./crates/spark --profile local --force --locked
# install Probe
cargo install --path ./crates/probe --profile local --force --locked
# install Shuttle
cargo install --path ./crates/shuttle --profile local --force --locked
# install Pilot
cargo install --path ./crates/pilot --profile local --force --locked
```

### Installing for CI in Github Action

See the [foxar-rs/foxar-toolchain](https://github.com/foxar-rs/foxar-toolchain) GitHub Action.

### Using Foxar with Docker

Foxar can also be used entirely within a Docker container. If you don't have it, Docker can be installed directly from [Docker's website](https://docs.docker.com/get-docker/).

Once installed, you can download the latest release by running:

```sh
docker pull ghcr.io/foxar-rs/foxar:latest
```

It is also possible to build the docker image locally. From the Foxar repository, run:

```sh
docker build -t foxar .
```

For examples and guides on using this image, see the [Docker tutorial section](../tutorials/foxar-docker).

> ℹ️ **Note**
>
> Some machines (including those with M1 chips) may be unable to build the docker image locally. This is a known issue.
