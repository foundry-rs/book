## Soldeer as a Package Manager

As explained [here](./dependencies), Foundry has been using git submodules to handle dependencies up until now. 

The need for a native package manager started to emerge as projects became more complex.

A new approach has been in the making, [soldeer.xyz](https://soldeer.xyz), which is a Solidity native dependency manager built in Rust and open sourced (check the repository [https://github.com/mario-eth/soldeer](https://github.com/mario-eth/soldeer)).

### Adding a Dependency

#### Add a Dependency Stored in the Central Repository

To add a dependency, you can visit [soldeer.xyz](https://soldeer.xyz) and search for the dependency you want to add (e.g., openzeppelin 0.5.2).

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
forge soldeer install @custom-dependency~1.0.0 https://my-website.com/custom-dependency-1-0-0.zip
```

The above command will try to download the dependency from the provided link and install it as a normal dependency. For this, you will see in the config an additional field called `path`.

E.g.
```toml
[dependencies]
"@custom-dependency" = { version = "1.0.0", path = "https://my-website.com/custom-dependency-1-0-0.zip" }
```

### Remapping Dependencies

The remapping of a dependency is performed automatically, Soldeer is adding the dependency into the `remappings.txt`.

E.g.
```bash
@openzeppelin-contracts-5.0.2=dependencies/@openzeppelin-contracts-5.0.2
@uniswap-universal-router-1.6.0=dependencies/@uniswap-universal-router-1.6.0
@prb-math-4.0.2=dependencies/@prb-math-4.0.2
@forge-std-1.8.1=dependencies/forge-std-1.8.1
```
These remappings mean:

- To import from `forge-std`, we would write: `import "forge-std-1.8.1/Contract.sol";`
- To import from `@openzeppelin-contracts`, we would write: `import "@openzeppelin-contracts-5.0.2/Contract.sol";`

### Updating Dependencies

Because Soldeer specifies the dependencies in a config file (foundry or soldeer toml), sharing a dependency configuration within the team is much easier.

For example, having this Foundry config file in a git repository, one can pull the repository and then run `forge soldeer update`. This command will automatically install all the dependencies specified under the `[dependencies]` tag.

```toml
# Full reference https://github.com/foundry-rs/foundry/tree/master/crates/config

[profile.default]
auto_detect_solc = false 
bytecode_hash = "none" 
fuzz = { runs = 1_000 } 
gas_reports = ["*"] # <= This is important to be added

[dependencies] # <= Dependencies will be added under this config
"@openzeppelin-contracts" = { version = "5.0.2" }
"@uniswap-universal-router" = { version = "1.6.0" }
"@prb-math" = { version = "4.0.2" }
forge-std = { version = "1.8.1" }
```

### Removing Dependencies

To remove a dependency, you have to manually delete it from the `dependencies` directory and from the `[dependencies]` tag.

### Pushing a New Version to the Central Repository

Soldeer acts like npmjs/crates.io, encouraging all developers to publish their projects to the central repository.

To do that, you have to go to [soldeer.xyz](https://soldeer.xyz), create an account, verify it, then

![image](https://i.postimg.cc/G3VDpN2S/s1.png) 

Just add a new project

![image](https://i.postimg.cc/rsBRYd3L/s2.png) 

After the project is created, you can go into your project source and:
- Create a `.soldeerignore` file that acts as a `.gitignore` to exclude files that aren't needed. 
- Run `forge soldeer login` to log into your account. 
- Run `forge soldeer push my-project~1.0.0` in your terminal in the directory that you want to push to the central repository associated with the project `my-project` at version `1.0.0`. 

If you want to push a specific directory and not the current directory your terminal is in, you can use `forge soldeer push my-project~1.0.0 /path/to/directory`.

> **Warning** ⚠️
> - Once a project is created, it cannot be deleted.
> - Once a version is pushed, it cannot be deleted.
> - You cannot push the same version twice.
> - The project name in the command that you run in the terminal must match the project name that you created on the Soldeer website.
> - We encourage everyone to use version pinning when importing them into the contracts, this will help with securing your code by knowing exactly what version of a dependency you are using. Furthermore, it will help security researchers in their work.
e.g. instead of using
`import '@openzeppelin-contracts/token/ERC20.sol'` you should do
`import '@openzeppelin-contracts-5.0.2/token/ERC20.sol'`

- If a certain package is not present in the central repository, you can open an issue in the [Soldeer Repository](https://github.com/mario-eth/soldeer/issues) and the team will look into adding it.