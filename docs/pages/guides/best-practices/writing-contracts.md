---
description: Best practices for writing clean, secure, and maintainable smart contracts with proper imports and formatting.
---

## General Contract Guidance

### Named Imports

Always use named import syntax, don't import full files. This restricts what is being imported to just the named items, not everything in the file. Importing full files can result in solc complaining about duplicate definitions and slither erroring, especially as repos grow and have more dependencies with overlapping names.

- Good: `import {MyContract} from "src/MyContract.sol"` to only import `MyContract`.
- Bad: `import "src/MyContract.sol"` imports everything in `MyContract.sol`. (Importing `forge-std/Test` or `Script` can be an exception here, so you get the console library, etc).

### Absolute vs Relative Imports

Note the tradeoffs between absolute and relative paths for imports (where absolute paths are relative to the repo root, e.g. `"src/interfaces/IERC20.sol"`), and choose the best approach for your project:

- Absolute paths make it easier to see where files are from and reduce churn when moving files around.
- Relative paths make it more likely your editor can provide features like linting and autocomplete, since editors/extensions may not understand your remappings.

### Copying Libraries from Dependencies

If copying a library from a dependency (instead of importing it), use the `ignore = []` option in the config file to avoid formatting that file. This makes diffing it against the original simpler for reviewers and auditors.

### Formatting

Similarly, feel free to use the `// forgefmt: disable-*` comment directives to ignore lines/sections of code that look better with manual formatting. Supported values for `*` are:

- `disable-line`
- `disable-next-line`
- `disable-next-item`
- `disable-start`
- `disable-end`

### Write Secure Code

Additional best practices from [samsczun](https://twitter.com/samczsun)'s [How Do You Even Write Secure Code Anyways](https://www.youtube.com/watch?v=Wm3t8Fuiy1E) talk:

- Use descriptive variable names.
- Limit the number of active variables.
- No redundant logic.
- Early exit as much as possible to reduce mental load when seeing the code.
- Related code should be placed near each other.
- Delete unused code.
