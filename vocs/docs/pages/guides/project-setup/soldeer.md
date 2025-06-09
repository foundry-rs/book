---
description: Use Soldeer as a native Solidity package manager for managing dependencies with central repository and git support.
---

## Soldeer as a Package Manager

As explained [here](./dependencies), Foundry has been using git submodules to handle dependencies up until now.

The need for a native package manager started to emerge as projects became more complex.

A new approach has been in the making, [soldeer.xyz](https://soldeer.xyz), which is a Solidity native dependency manager built in Rust and open sourced (check the repository [https://github.com/mario-eth/soldeer](https://github.com/mario-eth/soldeer)).

#### If you want to see the full commands and usage of Soldeer, you can visit the [USAGE.md](https://github.com/mario-eth/soldeer/blob/main/USAGE.md).

### Initialize a new project

If you're using Soldeer for the first time in a new Foundry project, you can use the `init` command to install a fresh instance of Soldeer, complete with the necessary configurations and the latest version of `forge-std`.

```bash
forge soldeer init
```

### Adding a Dependency

#### Add a Dependency Stored in the Central Repository

To add a dependency, you can visit [soldeer.xyz](https://soldeer.xyz) and search for the dependency you want to add (e.g., openzeppelin 5.0.2).

![image](https://i.postimg.cc/Hm6R8MTs/Unknown-413.png)

Then just run the forge command:

```bash
forge soldeer install @openzeppelin-contracts~5.0.2
```

This will download the dependency from the central repository and install it into a `dependencies` directory.

Soldeer can manage two types of dependency configuration: using `soldeer.toml` or embedded in the `foundry.toml`. In order to work with Foundry, you have to define the `[dependencies]` config in the `foundry.toml`. This will tell the `soldeer CLI` to define the installed dependencies there.
E.g.

```toml
# Full reference https://github.com/foundry-rs/foundry/tree/master/crates/config

[profile.default]
auto_detect_solc = false
bytecode_hash = "none"
fuzz = { runs = 1_000 }
libs = ["dependencies"] # <= This is important to be added
gas_reports = ["*"]

[dependencies] # <= Dependencies will be added under this config
"@openzeppelin-contracts" = { version = "5.0.2" }
"@uniswap-universal-router" = { version = "1.6.0" }
"@prb-math" = { version = "4.0.2" }
forge-std = { version = "1.8.1" }
```

#### Add a Dependency Stored at a Specific Link

If the central repository does not have a certain dependency, you can install it by providing a zip archive link.

E.g.

```bash
forge soldeer install @custom-dependency~1.0.0 --url https://my-website.com/custom-dependency-1-0-0.zip
```

The above command will try to download the dependency from the provided link and install it as a normal dependency. For this, you will see in the config an additional field called `path`.

E.g.

```toml
[dependencies]
"@custom-dependency" = { version = "1.0.0", path = "https://my-website.com/custom-dependency-1-0-0.zip" }
```

#### Add a Dependency Stored in GIT

If you choose to use Git as a source for your dependencies — though we generally discourage this, since Git isn't designed to be a dependency manager — you can provide the Git repository link as an additional argument. Soldeer will then automatically handle the installation using a Git subprocess.
For example:

```bash
forge soldeer install forge-std~1.9.2 --git https://github.com/foundry-rs/forge-std.git
```

If you want to use a specific revision, branch, or tag, you can do so by appending the following arguments to the command: `--rev/--tag/--branch`

e.g.

```bash
forge soldeer install forge-std~1.9.2 --git https://github.com/foundry-rs/forge-std.git --rev 4695fac44b2934aaa6d7150e2eaf0256fdc566a7
```

Some git examples:

Some examples:

```bash
forge soldeer install test-project~v1 --git git@github.com:test/test.git
forge soldeer install test-project~v1 --git git@gitlab.com:test/test.git
```

```bash
forge soldeer install test-project~v1 --git https://github.com/test/test.git
forge soldeer install test-project~v1 --git https://gitlab.com/test/test.git
```

```bash
forge soldeer install test-project~v1 --git git@github.com:test/test.git --rev 345e611cd84bfb4e62c583fa1886c1928bc1a464
forge soldeer install test-project~v1 --git git@github.com:test/test.git --branch dev
forge soldeer install test-project~v1 --git git@github.com:test/test.git --tag v1
```

### Updating Dependencies

Because Soldeer specifies the dependencies in a config file (foundry or soldeer toml), sharing a dependency configuration within the team is much easier.

For example, having this Foundry config file in a git repository, one can pull the repository and then run `forge soldeer update`. This command will automatically install all the dependencies specified under the `[dependencies]` tag.

```toml
# Full reference https://github.com/foundry-rs/foundry/tree/master/crates/config

[profile.default]
auto_detect_solc = false
bytecode_hash = "none"
fuzz = { runs = 1_000 }
libs = ["dependencies"] # <= This is important to be added
gas_reports = ["*"]

[dependencies] # <= Dependencies will be added under this config
"@openzeppelin-contracts" = { version = "5.0.2" }
"@uniswap-universal-router" = { version = "1.6.0" }
"@prb-math" = { version = "4.0.2" }
forge-std = { version = "1.8.1" }
```

### Removing Dependencies

You can use `forge soldeer uninstall DEPENDENCY`.

Example: `forge soldeer uninstall @openzeppelin-contracts`. This will action will remove:

- the config entry
- the `dependencies` artifacts
- the `soldeer.lock` entry
- the `remappings` entry (txt or config remapping)

Additionally you can manually remove a dependency by just removing the artifacts: dependency files, config entry, remappings entry.

### Remappings

The remappings are now fully configurable, the config TOML file (foundry.toml) accepts a
`[soldeer]` field with the following options

```toml
[soldeer]
# whether soldeer manages remappings
remappings_generate = true

# whether soldeer re-generates all remappings when installing, updating or uninstalling deps
remappings_regenerate = false

# whether to suffix the remapping with the version: `name-a.b.c`
remappings_version = true

# a prefix to add to the remappings ("@" would give `@name`)
remappings_prefix = ""

# where to store the remappings ("txt" for `remappings.txt` or "config" for `foundry.toml`)
# ignored when `soldeer.toml` is used as config (uses `remappings.txt`)
remappings_location = "txt"
```

### Installing dependencies of dependencies aka sub-dependencies

Whenever you install a dependency, that dependency might have other dependencies that need to be installed as well. Currently, you can handle this by either specifying the `recursive_deps` field as a configuration entry in the config file or by passing the `--recursive-deps` argument when running the install or update command. This will ensure that all necessary sub-dependencies are automatically pulled in.
e.g.

```toml
[soldeer]
recursive_deps = true
```

### Pushing a New Version to the Central Repository

Soldeer acts like npmjs/crates.io, encouraging all developers to publish their projects to the central repository.

To do that, you have to go to [soldeer.xyz](https://soldeer.xyz), create an account, verify it, then

![image](https://i.postimg.cc/G3VDpN2S/s1.png)

Just add a new project

![image](https://i.postimg.cc/rsBRYd3L/s2.png)

After the project is created, you can go into your project source and:

- Create a `.soldeerignore` file that acts as a `.gitignore` to exclude files that aren't needed. The `.gitignore` file is also respected.
- Run `forge soldeer login` to log into your account.
- Run `forge soldeer push my-project~1.0.0` in your terminal in the directory that you want to push to the central repository associated with the project `my-project` at version `1.0.0`.

If you want to push a specific directory and not the current directory your terminal is in, you can use `forge soldeer push my-project~1.0.0 /path/to/directory`.

**Warning** ⚠️

You are at risk to push sensitive files to the central repository that then can be seen by everyone. Make sure to exclude sensitive files in the `.soldeerignore` file.
Furthermore, we've implemented a warning that it will be triggered if you try to push a project that contains any `.dot` files/directories.
If you want to skip this warning, you can just use

```bash
forge soldeer push my-project~1.0.0 --skip-warnings
```

#### Dry-run

In case you want to simulate what would happen if you push a version, you can use the `--dry-run` flag. This will create a zip file that you can inspect before pushing it to the central repository.

```bash
forge soldeer push my-project~1.0.0 --dry-run
```

#### Login Data

By default, Soldeer saves the login token in the `~/.soldeer/.soldeer_login` file, which is used to push files to the central repository. If you prefer to save the token in a different location, you can set the environment variable `SOLDEER_LOGIN_FILE`.

> **Warning** ⚠️
>
> - Once a project is created, it cannot be deleted.
> - Once a version is pushed, it cannot be deleted.
> - You cannot push the same version twice.
> - The project name in the command that you run in the terminal must match the project name that you created on the Soldeer website.
> - We encourage everyone to use version pinning when importing them into the contracts, this will help with securing your code by knowing exactly what version of a dependency you are using. Furthermore, it will help security researchers in their work.
> - Make sure you delete this zip file before pushing the version if you run dry-run.
>   e.g. instead of using
>   `import '@openzeppelin-contracts/token/ERC20.sol'` you should do
>   `import '@openzeppelin-contracts-5.0.2/token/ERC20.sol'`

### What happens if a certain package is not present in the central repository?

- If a certain package is not present in the central repository, you can open an issue in the [Soldeer Repository](https://github.com/mario-eth/soldeer/issues) and the team will look into adding it.
- If you have a package that you want to use and it is not present in the central repository, you can push it to the central repository by following the steps above.

## Remappings Caveats

If you use other dependency managers, such as git submodules or npm, ensure you don't duplicate dependencies between
soldeer and the other manager.

Remappings targeting dependencies installed without Soldeer are not modified or removed when using Soldeer commands,
unless the `--regenerate-remappings` flag is specified or the `remappings_regenerate = true` option is set.

## Dependencies Maintenance

The vision for Soldeer is that major projects such as OpenZeppelin, Solady, Uniswap would start publishing their own
packages to the Soldeer registry so that the community can easily include them and get timely updates.

Until this happens, the Soldeer maintenance team (currently m4rio.eth) will push the most popular dependencies to the
repository by relying on their npmjs or GitHub versions. We are using
[an open-source crawler tool](https://github.com/mario-eth/soldeer-crawler) to crawl and push the dependencies under the
`soldeer` organization.

For those who want an extra layer of security, the `soldeer.lock` file saves a `SHA-256` hash for each downloaded
ZIP file and the corresponding unzipped folder (see `soldeer_core::utils::hash_folder` to see how it gets generated).
These can be compared with the official releases to ensure the files were not manipulated.

**For Project Maintainers**
If you want to move your project from the Soldeer organization and take care of pushing the versions to Soldeer
yourself, please open an issue on GitHub or contact m4rio.eth on [X (formerly Twitter)](https://twitter.com/m4rio_eth).
