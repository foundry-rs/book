## Dependencies

Forge manages dependencies using [git submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules) by default, which means that it works with any GitHub repository that contains smart contracts.

### Adding a dependency

To add a dependency, run [`forge install`](../reference/forge/forge-install.md):

```sh
{{#include ../output/deps/forge-install:all}}
```

If we now check the `lib` folder:

```sh
{{#include ../output/deps/tree:all}}
```

We can see that Forge installed `solmate`!

By default, `forge install` installs the latest master branch version. If you want to install a specific tag or commit,you can do it like so:

```sh
$ forge install Rari-Capital/solmate@v6
```

### Remapping dependencies

Forge can remap dependencies to make them easier to import. Forge will automatically try to deduce some remappings for you:

```sh
{{#include ../output/deps/forge-remappings:all}}
```

These remappings mean:

- To import from `forge-std` we would write: `import "forge-std/Contract.sol";`
- To import from `solmate` we would write: `import "solmate/Contract.sol";`
- To import from `weird-erc20` we would write: `import "weird-erc20/Contract.sol";`
- To import from `ds-test` we would write: `import "ds-test/Contract.sol";`

You can customize these remappings by creating a `remappings.txt` file in the root of your project.

Let's create a remapping called `solmate-utils` that points to the `utils` folder in the solmate repository!

```sh
solmate-utils/=lib/solmate/src/utils/
```

Now we can import any of the contracts in `src/utils` of the solmate repository like so:

```solidity
import "solmate-utils/Contract.sol";
```

### Updating dependencies

You can update a specific dependency to the latest commit on the version you have specified using [`forge update <dep>`](../reference/forge/forge-update.md). For example, if we wanted to pull the latest commit from our previously installed master-version of `solmate`, we would run:

```sh
$ forge update lib/solmate
```

Alternatively, you can do this for all dependencies at once by just running `forge update`.

### Removing dependencies

You can remove dependencies using [`forge remove <deps>...`](../reference/forge/forge-remove.md), where `<deps>` is either the full path to the dependency or just the name. For example, to remove `solmate` both of these commands are equivalent:

```ignore
$ forge remove solmate
# ... is equivalent to ...
$ forge remove lib/solmate
```

### Hardhat compatibility

Forge also supports Hardhat-style projects where dependencies are npm packages (stored in `node_modules`) and contracts are stored in `contracts` as opposed to source.

To enable Hardhat compatibility mode pass the `--hh` flag.
