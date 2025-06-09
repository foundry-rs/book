---
description: Configure Foundry project structure with directories for contracts, tests, dependencies, and configuration files.
---

## Project Layout

Forge is flexible on how you structure your project. By default, the structure is:

```sh
// [!include ~/snippets/output/hello_foundry/tree-with-files:output]
```

- You can configure Foundry's behavior using `foundry.toml`.
- Remappings are specified in `remappings.txt`.
- The default directory for contracts is `src/`.
- The default directory for tests is `test/`, where any contract with a function that starts with `test` is considered to be a test.
- Dependencies are stored as git submodules in `lib/`.

You can configure where Forge looks for both dependencies and contracts using the `--lib-paths` and `--contracts` flags respectively. Alternatively you can configure it in `foundry.toml`.

Combined with remappings, this gives you the flexibility needed to support the project structure of other toolchains such as Hardhat and Truffle.

For automatic Hardhat support you can also pass the `--hh` flag, which sets the following flags: `--lib-paths node_modules --contracts contracts`.
