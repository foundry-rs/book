## Dependencies

Spark manages dependencies using [git submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules) by default, which means that it works with any GitHub repository that contains smart contracts.

### Adding a dependency

To add a dependency, run [`spark install`](../reference/spark/spark-install.md):

```sh
{{#include ../output/deps/spark-install:all}}
```

This pulls the `solmate` library, stages the `.gitmodules` file in git and makes a commit with the message "Installed solmate".

If we now check the `lib` folder:

```sh
{{#include ../output/deps/tree:all}}
```

We can see that Spark installed `solmate`!

By default, `spark install` installs the latest master branch version. If you want to install a specific tag or commit, you can do it like so:

```sh
$ spark install transmissions11/solmate@v7
```

### Remapping dependencies

Spark can remap dependencies to make them easier to import. Spark will automatically try to deduce some remappings for you:

```sh
{{#include ../output/deps/spark-remappings:all}}
```

These remappings mean:

- To import from `spark-std` we would write: `import "spark-std/Contract.sol";`
- To import from `ds-test` we would write: `import "ds-test/Contract.sol";`
- To import from `solmate` we would write: `import "solmate/Contract.sol";`
- To import from `weird-erc20` we would write: `import "weird-erc20/Contract.sol";`

You can customize these remappings by creating a `remappings.txt` file in the root of your project.

Let's create a remapping called `solmate-utils` that points to the `utils` folder in the solmate repository!

```sh
solmate-utils/=lib/solmate/src/utils/
```

You can also set remappings in `foxar.toml`.

```toml
remappings = [
    "@solmate-utils/=lib/solmate/src/utils/",
]
```

Now we can import any of the contracts in `src/utils` of the solmate repository like so:

```solidity
import "@solmate-utils/LibString.sol";
```

### Updating dependencies

You can update a specific dependency to the latest commit on the version you have specified using [`spark update <dep>`](../reference/spark/spark-update.md). For example, if we wanted to pull the latest commit from our previously installed master-version of `solmate`, we would run:

```sh
$ spark update lib/solmate
```

Alternatively, you can do this for all dependencies at once by just running `spark update`.

### Removing dependencies

You can remove dependencies using [`spark remove <deps>...`](../reference/spark/spark-remove.md), where `<deps>` is either the full path to the dependency or just the name. For example, to remove `solmate` both of these commands are equivalent:

```ignore
$ spark remove solmate
# ... is equivalent to ...
$ spark remove lib/solmate
```

### Hardhat compatibility

Spark also supports Hardhat-style projects where dependencies are npm packages (stored in `node_modules`) and contracts are stored in `contracts` as opposed to `src`.

To enable Hardhat compatibility mode pass the `--hh` flag.
