---
description: Complete guide to installing Foundry on your system using Foundryup, precompiled binaries, or building from source.
---

## Installation

<<<<<<<< HEAD:src/getting-started/installation.md
<!-- If you encounter any issues during installation, refer to the [FAQ](../faq.md) for assistance. -->
========
If you encounter any issues during installation, refer to the [FAQ](/misc/faq) for assistance.
>>>>>>>> ac5e906:vocs/docs/pages/introduction/installation.md

### Precompiled Binaries

Precompiled binaries can be downloaded from the [GitHub releases page](https://github.com/matter-labs/foundry-zksync/releases). We recommend using [Foundryup](#using-foundryup-zksync) for easier management.
We are working on a polished versioning approach that will be released soon. However, we are also in a phase of active development.

### Using Foundryup-zksync

Foundryup-zksync is the official installer for the Foundry-ZKsync toolchain. You can learn more about it [here](https://github.com/matter-labs/foundry-zksync/blob/main/foundryup-zksync/README.md).

To install Foundryup-zksync, open your terminal and run the following command:

```sh
curl -L https://raw.githubusercontent.com/matter-labs/foundry-zksync/main/install-foundry-zksync | bash
```

This will install Foundryup-zksync. Follow the on-screen instructions, and the `foundryup-zksync` command will become available in your CLI.

Running `foundryup-zksync` automatically installs the latest nightly versions of the [precompiled binaries](#precompiled-binaries), including `forge` and `cast`. Additionally, it fetches the most recent version of the precompiled binary `anvil-zksync` from the [anvil-zksync releases](https://github.com/matter-labs/anvil-zksync/releases).

Run ' foundryup-zksync—- help ' for additional options, such as installing a specific version or commit.

<<<<<<<< HEAD:src/getting-started/installation.md
> ℹ️ **Note**
>
> Only `forge` and `cast` are currently supported for ZKsync. Other commands retain their original behavior but may not work as intended.

> ℹ️ **Note**
>
> If you're on Windows, you will need to install and use [Git BASH](https://gitforwindows.org/) or [WSL](https://learn.microsoft.com/en-us/windows/wsl/install)
> since Foundryup-zksync currently does not support Powershell or Cmd. Windows support is currently provided as best-effort.
========
#### Verifying the integrity and provenance of binaries

Foundry binaries are attested by using [GitHub artifact attestations](https://docs.github.com/en/actions/security-for-github-actions/using-artifact-attestations/using-artifact-attestations-to-establish-provenance-for-builds).

When installing a release using `foundryup` we match the hashes of the binaries against the hashes of the Github attestation artifact. This guarantees that the binaries were built by our automated release process in the official Foundry repository. We also use these hashes to check whether you already have the version of the binary installed. If so, we will skip the downloading.

You can pass the `--force` flag to skip the verification step. This also forces the installer to install a fresh version of the binaries as it has no hashes to match against.

Note that in the case you install an older release you may find that no `*attestation.txt` are available in the release for `foundryup` to verify against. In this case verification is skipped at installation. You can at any time manually verify the integrity as follows:

For example, `forge`:

```shell
gh attestation verify --owner foundry-rs $(which forge)

✓ Verification succeeded!

The following 1 attestation matched the policy criteria

- Attestation #1
  - Build repo:..... foundry-rs/foundry
  - Build workflow:. .github/workflows/release.yml@refs/tags/stable
  - Signer repo:.... foundry-rs/foundry
  - Signer workflow: .github/workflows/release.yml@refs/tags/stable
```
>>>>>>>> ac5e906:vocs/docs/pages/introduction/installation.md

This is also the case for older releases.

### Building from Source

#### Prerequisites

<<<<<<<< HEAD:src/getting-started/installation.md
You’ll need the [Rust](https://rust-lang.org) compiler and Cargo, Rust's package manager. The easiest way to install both is using [`rustup.rs`](https://rustup.rs/).
========
You'll need the [Rust](https://rust-lang.org) compiler and Cargo, Rust's package manager. The easiest way to install both is by using [`rustup.rs`](https://rustup.rs/).
>>>>>>>> ac5e906:vocs/docs/pages/introduction/installation.md

Foundry-ZKsync generally supports building only with the [configured](https://github.com/matter-labs/foundry-zksync/blob/main/rust-toolchain) nightly Rust version.
The presence of `rust-toolchain` file automatically downloads the correct nightly rust version when commands are run from the Foundry-ZKsync directory.

For Windows users, you'll also need a recent version of [Visual Studio](https://visualstudio.microsoft.com/downloads/), with the "Desktop Development With C++" workload installed.

#### Building

You can either use the different [Foundryup-ZKsync](#using-foundryup) flags:

```sh
foundryup-zksync --branch main
foundryup-zksync --path path/to/foundry-zksync
```

Alternatively, you can install it via Cargo with the following command:

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

### CI Installation with GitHub Actions

The latest binaries for the appropriate architecture can be installed directly using the following GitHub Action:

```yaml
steps:
    - name: Install Foundry-ZKsync
      uses: dutterbutter/foundry-zksync-toolchain@v1
```

For further details, visit the [foundry-zksync-toolchain repository](https://github.com/dutterbutter/foundry-zksync-toolchain).

### Using Foundry with Docker

<<<<<<<< HEAD:src/getting-started/installation.md
> ℹ️ **Note**
>
> No prebuilt images are available for docker yet.
========
:::note
Some systems, including those with M1 chips, may experience issues when building the Docker image locally. This is a known issue.
:::

Foundry can also be run inside a Docker container. If you don't have Docker installed, you can download it from [Docker's website](https://docs.docker.com/get-docker/).

Once Docker is installed, you can pull the latest Foundry release by running:

```sh
docker pull ghcr.io/foundry-rs/foundry:latest
```

You can also build the Docker image locally by running the following command from the Foundry repository:

```sh
docker build -t foundry .
```

For examples and guides on using this image, refer to the [Docker guide](/guides/foundry-in-docker).

### Uninstalling

Foundry contains everything in a `.foundry` directory, usually located in `/home/<user>/.foundry/` on Linux, `/Users/<user>/.foundry/` on MacOS and `C:\Users\<user>\.foundry` on Windows where `<user>` is your username.

To uninstall Foundry remove the `.foundry` directory.

:::warning
The .foundry directory can contain keystores. Make sure to backup any keystores you want to keep.
:::

Remove Foundry from PATH:

- Optionally Foundry can be removed from editing shell configuration file (`.bashrc`, `.zshrc`, etc.). To do so remove the line that adds Foundry to PATH:

```sh
export PATH="$PATH:/home/user/.foundry/bin"
```
>>>>>>>> ac5e906:vocs/docs/pages/introduction/installation.md
