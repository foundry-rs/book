---
description: Install Foundry using foundryup, precompiled binaries, or build from source.
---

## Installation

Foundry is installed using **foundryup**, the official installer and version manager.

::::steps

### Install foundryup

```bash
$ curl -L https://foundry.paradigm.xyz | bash
```

### Restart your terminal

Or run `source ~/.bashrc` / `source ~/.zshrc`.

### Install Foundry

```bash
$ foundryup
```

::::

This installs the latest stable versions of `forge`, `cast`, `anvil`, and `chisel`.

:::warning[Windows]
Foundryup requires [Git Bash](https://gitforwindows.org/) or [WSL](https://learn.microsoft.com/en-us/windows/wsl/install). PowerShell and Command Prompt are not supported.
:::

:::note
If installation fails, see [Troubleshooting](/help/troubleshooting) for common fixes.
:::

## Updating

Run `foundryup` anytime to update to the latest stable release:

```bash
$ foundryup
```

## Installing specific versions

```bash [Install the nightly build]
$ foundryup --install nightly
```

```bash [Install a specific version]
$ foundryup --install 1.0.0
```

```bash [Install from a specific commit]
$ foundryup --install abc1234
```

```bash [Install from a branch]
$ foundryup --branch master
```

## Installing forks

To install binaries from [Tempo's fork](https://github.com/tempoxyz/tempo-foundry):

```bash
$ foundryup -n tempo
```

## Binary verification

Foundry binaries are attested using [GitHub artifact attestations](https://docs.github.com/en/actions/security-for-github-actions/using-artifact-attestations/using-artifact-attestations-to-establish-provenance-for-builds). When installing via `foundryup`, binary hashes are automatically verified against the GitHub attestation.

To manually verify an installed binary:

```bash
$ gh attestation verify --owner foundry-rs $(which forge)
```

Use `foundryup --force` to skip verification and force a fresh install.

## Alternative installation methods

### Precompiled binaries

Download binaries directly from the [GitHub releases page](https://github.com/foundry-rs/foundry/releases). Extract and add them to your `PATH`.

### Building from source

Requires [Rust](https://rustup.rs/) (latest stable). On Windows, also requires [Visual Studio](https://visualstudio.microsoft.com/downloads/) with the "Desktop Development With C++" workload.

```bash [Update Rust]
$ rustup update stable
```

```bash [Install from GitHub]
$ cargo install --git https://github.com/foundry-rs/foundry --profile release --locked forge cast chisel anvil
```

Or build from a local clone:

```bash
$ git clone https://github.com/foundry-rs/foundry.git
$ cd foundry
$ cargo install --path ./crates/forge --profile release --locked
$ cargo install --path ./crates/cast --profile release --locked
$ cargo install --path ./crates/anvil --profile release --locked
$ cargo install --path ./crates/chisel --profile release --locked
```

You can also use foundryup to build from source:

```bash
$ foundryup --branch master
$ foundryup --path /path/to/foundry
```

### Docker

```bash
$ docker pull ghcr.io/foundry-rs/foundry:latest
```

Or build locally from the [repository](https://github.com/foundry-rs/foundry):

```bash
$ docker build -t foundry .
```

:::note
Some systems (including Apple Silicon) may have issues building the Docker image locally.
:::

### CI/CD

For GitHub Actions, use [foundry-rs/foundry-toolchain](https://github.com/foundry-rs/foundry-toolchain).

## Uninstalling

Foundry stores all files in `~/.foundry`. To uninstall:

::::steps

### Back up keystores

The `.foundry` directory may contain keystores with private keys.

### Remove the directory

```bash
$ rm -rf ~/.foundry
```

### Remove PATH entry

Edit your shell config (`.bashrc`, `.zshrc`, etc.) and remove the Foundry PATH line.

::::
