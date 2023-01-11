## Installation

### On Linux and macOS

If you use Linux or macOS, there are two different ways to install Foundry.

#### Install the latest release by using `foundryup`

This is the easiest option for Linux and macOS users.

Open your terminal and type in the following command:

```sh
curl -L https://foundry.paradigm.xyz | bash
```

This will download `foundryup`. Then install Foundry by running:

```sh
foundryup
```

If everything goes well, you will now have four binaries at your disposal: `forge`, `cast`, `anvil`, and `chisel`.

If you use macOS and display below error, you need type `brew install libusb` to install Library

```sh
dyld[32719]: Library not loaded: /usr/local/opt/libusb/lib/libusb-1.0.0.dylib
```

> 💡 **Tip**
>
>To update `foundryup` after installation, simply run `foundryup` again, and it will update to the latest Foundry release. You can also revert to a specific version of Foundry with `foundryup -v $VERSION`.

#### Building from source

To build from source, you need to get [Rust](https://rust-lang.org) and Cargo. The easiest way to get both is by using `rustup`.

On Linux and macOS, this is done as follows:

```sh
curl https://sh.rustup.rs -sSf | sh
```

It will download a script and start the installation.

### On Windows, build from source

If you use Windows, you need to build from source to get Foundry.

Download and run `rustup-init` from [rustup.rs](https://win.rustup.rs/x86_64). It will start the installation in a console.

If you encouner an error, it is most likely the case that you do not have the VS Code Installer which you can [download here](https://visualstudio.microsoft.com/downloads/) and install.

After this, run the following to build Foundry from source:

```sh
cargo install --git https://github.com/foundry-rs/foundry foundry-cli anvil chisel --bins --locked
```

To update from source, run the same command again.

### Using with Docker

Foundry can also be used entirely within a Docker container. If you don't have it, Docker can be installed directly from [Docker's website](https://docs.docker.com/get-docker/).

Once installed, you can download the latest release by running:  

```sh
docker pull ghcr.io/foundry-rs/foundry:latest
```

It is also possible to build the docker image locally. From the Foundry repository, run:

```sh
docker build -t foundry .
```

> ℹ️ **Note**
>
> Some machines (including those with M1 chips) may be unable to build the docker image locally. This is a known issue.
