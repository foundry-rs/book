## Installation

### Using `foundryup`

The easiest way to get Foundry is to install the latest release by using `foundryup`.

On Linux and macOS systems, this is done as follows:

```sh
curl -L https://foundry.paradigm.xyz | bash
```

This will download `foundryup`. To start install Foundry, run:

```sh
foundryup
```

If everything goes well, you will now have two binaries at your disposal: `forge` and `cast`.

On Windows, build from source.

Running `foundryup` again will update to the latest Foundry release. You can also revert to a specific version of Foundry with `foundryup -v $VERSION`.

### Building from source

To build from source, you need to get [Rust](https://rust-lang.org) and Cargo. The easiest way to get both is by using `rustup`.

On Linux and macOS systems, this is done as follows:

```sh
curl https://sh.rustup.rs -sSf | sh
```

It will download a script and start installation.

On Windows, download and run `rustup-init` from [rustup.rs](https://rustup.rs). It will start the installation in a console.

After this, run the following to build Foundry from source:

```sh
cargo install --git https://github.com/gakonst/foundry --bins --locked
```

### Using with Docker

Foundry can also be used entirely within a Docker container. If you don't have it, Docker can be installed directly from [Docker's website](https://docs.docker.com/get-docker/)

Once installed, you can download the latest release by running:  
```sh
docker pull ghcr.io/gakonst/foundry:latest
```
It is also possible to build the docker image locally. From the Foundry repository, run:
```sh
docker build -t foundry .
```
> ℹ️ **Note**
>
> Some machines (including those with M1 chips) may be unable to build the docker image locally. This is a known issue.
