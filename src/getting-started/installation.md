## Installation

### Using `forgeup`

The easiest way to get Foundry is to install the latest release by using `forgeup`.

On Linux and macOS systems, this is done as follows:

```
curl https://raw.githubusercontent.com/gakonst/foundry/master/forgeup/install | bash
```

This will download `forgeup`. To start install Foundry, run:

```
forgeup
```

On Windows, build from source.

Running `forgeup` again will update to the latest Foundry release. You can also revert to a specific version of Foundry with `forgeup -v $VERSION`.

### Building from source

To build from source, you need to get [Rust](https://rust-lang.org) and Cargo. The easiest way to get both is by using `rustup`.

On Linux and macOS systems, this is done as follows:

```
curl https://sh.rustup.rs -sSf | sh
```

It will download a script and start installation.

On Windows, download and run `rustup-init` from [rustup.rs](https://rustup.rs). It will start the installation in a console.

After this, run the following to build Foundry from source:

```
cargo install --git https://github.com/gakonst/foundry --bins --locked
```
