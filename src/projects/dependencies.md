## Dependencies

Forge manages dependencies using [git submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules) by default, which means that it works with any GitHub repository that contains smart contracts.

### Adding a dependency

To add a dependency, run [`forge install`](../reference/forge/forge-install.md):

```sh
{{#include ../output/hello_foundry/forge-install:all}}
```

This pulls the `solady` library, stages the `.gitmodules` file in git and makes a commit with the message `Installed solady`.

If we now check the `lib` folder:

```sh
{{#include ../output/hello_foundry/tree:all}}
```

We can see that Forge installed `solady`!

By default, `forge install` installs the latest master branch version. If you want to install a specific tag or commit, you can do it like so:

```sh
$ forge install vectorized/solady@v0.1.3
```

### Remapping dependencies

Forge can remap dependencies to make them easier to import. Forge will automatically try to deduce some remappings for you:

```sh
{{#include ../output/hello_foundry/forge-remappings:all}}
```

These remappings mean:

- To import from `forge-std` we would write: `import "forge-std/Contract.sol";`
- To import from `solady` we would write: `import "solady/Contract.sol";`

You can customize these remappings by creating a `remappings.txt` file in the root of your project.

Let's create a remapping called `solady-utils` that points to the `utils` folder in the `solady` repository!

```sh
@solady-utils/=lib/solady/src/utils/
```

You can also set remappings in `foundry.toml`.

```toml
remappings = [
    "@solady-utils/=lib/solady/src/utils/",
]
```

Now we can import any of the contracts in `src/utils` of the `solady` repository like so:

```solidity
import {LibString} from "@solady-utils/LibString.sol";
```

### Updating dependencies

You can update a specific dependency to the latest commit on the version you have specified using [`forge update <dep>`](../reference/forge/forge-update.md). For example, if we wanted to pull the latest commit from our previously installed master-version of `solady`, we would run:

```sh
$ forge update lib/solady
```

Alternatively, you can do this for all dependencies at once by just running `forge update`.

### Removing dependencies

You can remove dependencies using [`forge remove <deps>...`](../reference/forge/forge-remove.md), where `<deps>` is either the full path to the dependency or just the name. For example, to remove `solady` both of these commands are equivalent:

```ignore
$ forge remove solady
# ... is equivalent to ...
$ forge remove lib/solady
```

### Hardhat compatibility

Forge also supports Hardhat-style projects where dependencies are npm packages (stored in `node_modules`) and contracts are stored in `contracts` as opposed to `src`.

To enable Hardhat compatibility mode pass the `--hh` flag.
