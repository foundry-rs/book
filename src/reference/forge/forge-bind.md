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
&nbsp;&nbsp;&nbsp;&nbsp;The version of the Rust crate to generate, if you are generatign a crate (default).  
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

{{#include common-options.md}}

### SEE ALSO

[forge](./forge.md)
