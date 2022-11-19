## forge bind

### NAME

forge-bind - Generate Rust bindings for smart contracts.

### SYNOPSIS

``forge bind`` [*options*]

### DESCRIPTION

Generates Rust bindings for smart contracts using [ethers-rs](https://github.com/gakonst/ethers-rs).

The bindings are generated from the project's artifacts, which by default is `./out/`.
If you want to generate bindings for artifacts in a different directory, pass `--bindings-path <PATH>`.

There are three output options:

- Generate bindings in a crate (default)
- Generate bindings in a module by passing `--module`
- Generate bindings in a single file by passing `--single-file`

By default, the command will check that existing bindings are correct and exit accordingly.
You can overwrite the existing bindings by passing `--overwrite`.

### OPTIONS

#### Project Options

`-b` *path*  
`--bindings-path` *path*  
&nbsp;&nbsp;&nbsp;&nbsp;The project's root path. By default, this is the root directory of the current git repository, or the current working directory.

`--crate-name` *name*  
&nbsp;&nbsp;&nbsp;&nbsp;The name of the Rust crate to generate, if you are generating a crate (default).  
&nbsp;&nbsp;&nbsp;&nbsp;This should be a valid crates.io crate name.

&nbsp;&nbsp;&nbsp;&nbsp;Default: foundry-contracts

`--crate-version` *semver*  
&nbsp;&nbsp;&nbsp;&nbsp;The version of the Rust crate to generate, if you are generating a crate (default).  
&nbsp;&nbsp;&nbsp;&nbsp;This should be a standard semver version string.

&nbsp;&nbsp;&nbsp;&nbsp;Default: 0.0.1

`--module`  
&nbsp;&nbsp;&nbsp;&nbsp;Generate the bindings as a module instead of a crate.

`--single-file`  
&nbsp;&nbsp;&nbsp;&nbsp;Generate bindings as a single file.

`--overwrite`  
&nbsp;&nbsp;&nbsp;&nbsp;Overwrite existing generated bindings. By default, the command will check that the bindings are correct, and then exit.  
&nbsp;&nbsp;&nbsp;&nbsp;If `--overwrite` is passed, it will instead delete and overwrite the bindings.

`--root` *path*  
&nbsp;&nbsp;&nbsp;&nbsp;The project's root path. By default, this is the root directory of the current git repository, or the current working directory.

`--skip-cargo-toml`  
&nbsp;&nbsp;&nbsp;&nbsp;Skip Cargo.toml consistency checks.  
&nbsp;&nbsp;&nbsp;&nbsp;This allows you to manage the [ethers](https://github.com/gakonst/ethers-rs) version without giving up on consistency checks.  
&nbsp;&nbsp;&nbsp;&nbsp;An example would be if you use additional features of ethers like `ws`, `ipc`, or `rustls` and get an `ethers-providers` version mismatch.

`--skip-build`  
&nbsp;&nbsp;&nbsp;&nbsp;Skips running forge build before generating binding.  
&nbsp;&nbsp;&nbsp;&nbsp;This allows you to skip the default `forge build` step that's executed first and instead generate bindings using the already existing artifacts.  

`--select-all`  
&nbsp;&nbsp;&nbsp;&nbsp;By default all contracts ending with `Test` or `Script` are excluded. This will explicitly generate bindings for all contracts. Conflicts with `--select` and `--skip`.

`--select` *regex+*  
&nbsp;&nbsp;&nbsp;&nbsp;Create bindings only for contracts whose names match the specified filter(s). Conflicts with `--skip`.

`--skip` *regex+*  
&nbsp;&nbsp;&nbsp;&nbsp;Create bindings only for contracts whose names do not match the specified filter(s). Conflicts with `--select`.

{{#include common-options.md}}

{{#include core-build-options.md}}

### SEE ALSO

[forge](./forge.md)
