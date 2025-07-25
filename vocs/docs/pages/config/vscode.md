## Integrating with VSCode

You can get Solidity support for Visual Studio Code by installing the [VSCode Solidity extension](https://github.com/juanfranblanco/vscode-solidity).

To make the extension play nicely with Foundry, you may have to tweak a couple of things.

### 1. Remappings

You may want to place your remappings in `remappings.txt`.

If they are already in `foundry.toml`, copy them over and use `remappings.txt` instead. If you just use the autogenerated remappings that Foundry provides, run `forge remappings > remappings.txt`.

### 2. Dependencies

You may have to add the following to your `.vscode/settings.json` for the extension to find your dependencies:

```json
{
  "solidity.packageDefaultDependenciesContractsDirectory": "src",
  "solidity.packageDefaultDependenciesDirectory": "lib"
}
```

Where `src` is the source code directory and `lib` is your dependency directory.

### 3. Formatter

To enable the built-in formatter that comes with Foundry to automatically format your code on save, you can add the following settings to your `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "[solidity]": {
    "editor.defaultFormatter": "JuanBlanco.solidity"
  },
  "solidity.formatter": "forge"
}
```

To configure the formatter settings, refer to the [Formatter](/config/reference/formatter) reference.

### 4. Solc Version

Finally, it is recommended to specify a Solidity compiler version:

```json
"solidity.compileUsingRemoteVersion": "v0.8.17"
```

To get Foundry in line with the chosen version, add the following to your `default` profile in `foundry.toml`.

```toml
solc = "0.8.17"
```

### Example of using OpenZeppelin contracts and non-standard project layout.

```bash
.
└── project
    └── contracts
        ├── lib
        │   ├── forge-std
        │   └── openzeppelin-contracts
        ├── script
        ├── src
        └── test
```

Add line to `remappings.txt` file ([`forge remapping`](/guides/project-setup/dependencies#remapping-dependencies)):

```solidity
@openzeppelin/=lib/openzeppelin-contracts/
```

Add line to `.vscode/settings.json` file (solidity extension settings):

```json
{
  "solidity.remappings": [
    "@openzeppelin/=project/contracts/lib/openzeppelin-contracts/"
  ]
}
```

Now all contracts from the OpenZeppelin documentation can be used.

```javascript
import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```
