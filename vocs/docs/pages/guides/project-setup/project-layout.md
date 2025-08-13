---
description: Configure Foundry project structure with directories for contracts, tests, dependencies, and configuration files.
---

## Project Layout

Forge is flexible on how you structure your project. By default, the structure is:

```sh
// [!include ~/snippets/output/hello_foundry/tree-with-files:output]
```

- You can configure Foundry's behavior using `foundry.toml`. Configuration can be extended from base files using the `extends` field (see [Configuration Inheritance](#configuration-inheritance) below).
- Remappings are specified in `remappings.txt`.
- The default directory for contracts is `src/`.
- The default directory for tests is `test/`, where any contract with a function that starts with `test` is considered to be a test.
- Dependencies are stored as git submodules in `lib/`.

You can configure where Forge looks for both dependencies and contracts using the `--lib-paths` and `--contracts` flags respectively. Alternatively you can configure it in `foundry.toml`.

Combined with remappings, this gives you the flexibility needed to support the project structure of other toolchains such as Hardhat and Truffle.

For automatic Hardhat support you can also pass the `--hh` flag, which sets the following flags: `--lib-paths node_modules --contracts contracts`.

## Configuration Inheritance

Foundry supports configuration inheritance through the `extends` field in `foundry.toml`. This allows you to maintain a base configuration file that can be shared across multiple projects or profiles.

### Basic Usage

In your `foundry.toml`, you can specify a base configuration file to inherit from using either a simple string or an object format:

```toml
# Simple string format (uses default "extend-arrays" strategy)
[profile.default]
extends = "./base-config.toml"
src = "src"
test = "test"
```

Or with an explicit merge strategy:

```toml
# Object format with strategy
[profile.default]
extends = { path = "./base-config.toml", strategy = "replace-arrays" }
src = "src"
test = "test"
```

The base configuration file (`base-config.toml`) can contain any valid Foundry configuration:

```toml
[profile.default]
solc = "0.8.23"
optimizer = true
optimizer_runs = 200
```

### Precedence Rules

Configuration values are resolved with the following precedence (highest to lowest):
1. **Environment variables** - Always take the highest priority
2. **Local `foundry.toml`** - Values in your project's main config file
3. **Base/inherited file** - Values from the file specified in `extends`

### Merge Strategies

You can control how configuration is merged by specifying a strategy in the object format:

```toml
[profile.default]
extends = { path = "./base-config.toml", strategy = "extend-arrays" }
```

Available strategies:
- **`extend-arrays`** (default): Arrays are concatenated (base elements + local elements), other values are replaced
- **`replace-arrays`**: Arrays are replaced entirely by local arrays, other values are replaced
- **`no-collision`**: Throws an error if any keys exist in both the base and local files

### Profile-Specific Inheritance

Each profile can inherit from a different configuration file:

```toml
[profile.default]
extends = "./base-config.toml"

[profile.production]
extends = "./production-base.toml"
```

### Important Notes

- The `extends` path must be relative to the location of your `foundry.toml` file
- Inherited files can have any name (not limited to `foundry.toml`)
- Inherited files cannot themselves inherit from other files (nested inheritance is not allowed)
- Inheritance only applies when both the selected profile exists in `foundry.toml` and has the `extends` field configured
