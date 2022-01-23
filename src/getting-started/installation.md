## Installation

### Using `foundryup`

The easiest way to get Foundry is to install the latest release by using `foundryup`.

On Linux and macOS systems, this is done as follows:

```
curl -L https://foundry.paradigm.xyz | bash
```

This will download `foundryup`. To start install Foundry, run:

```
foundryup
```

If everything goes well, you will now have two binaries at your disposal: `forge` and `cast`.

On Windows, build from source.

Running `foundryup` again will update to the latest Foundry release. You can also revert to a specific version of Foundry with `foundryup -v $VERSION`.

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
