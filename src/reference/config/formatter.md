## Formatter

Configuration related to the behavior of the Forge formatter. Each of these keys live under the `[fmt]` section.

### `single_line_statement_blocks`

> This allows configuring the style of statement blocks independently of the line length.

The `single_line_statement_blocks` configuration option in Foundry controls whether statement blocks (code blocks enclosed in `{ }`) will be formatted to a single line or multiple lines.

It has three possible values:

-   `"single"` - Statement blocks will be formatted to a single line if possible.
-   `"multi"` - Statement blocks will always be formatted to multiple lines.
-   `"preserve"` - Keep the existing single/multi line formatting of statement blocks.

For example, with `"single"`:

```solidity
if (true) { return true; }
```

With `"multi"`:

```solidity
if (true) {
  return true;
}
```

And with `"preserve"`, it will keep the original formatting of the code.

### `multiline_func_header`

> This allows configuring the formatting of long function headers.

- Type: string
- Default: `attributes_first`
- Environment: `FOUNDRY_FMT_MULTILINE_FUNC_HEADER` or `DAPP_FMT_MULTILINE_FUNC_HEADER`

The `multiline_func_header` configuration option in Foundry controls how function headers (the line containing the function name, parameters, return values etc.) are formatted when they exceed the max line length.

Style of multiline function header in case it doesn't fit in one line. Valid possible values:

-   `"attributes_first"` - (default)  Write function attributes multiline first
-   `"params_first"` - Break the function header into multiple lines, with each parameter on its own line. The function name stays on the first line.
-   `"all"` - If function parameters or attributes are multiline, multiline everything
    

Style of multiline function header in case it doesn't fit in one line. Valid values are:

For example, with `"params_first"`:

```solidity
function myFunction(
    uint256 param1, 
    uint256 param2,
    uint256 param3
) public returns (uint256) {
  // ...
}

```

And with `"all"`:

```solidity
function myFunction(
    uint256 param1,
    uint256 param2, 
    uint256 param3
) 
    public 
    returns (uint256) 
{
  // ...  
}
```

### `sort_imports`

> helps organize imports and makes it easier to find specific imports quickly.

The `sort_imports` configuration option in Foundry controls whether import statements are sorted alphabetically within their import groups.

From the code snippets provided:

-   In `fmt.rs`, `sort_imports` is a configuration option that can be set to `true` or `false`.
-   In `formatter.rs`, the `sort_imports()` method is called to sort import statements alphabetically if `sort_imports` is enabled.
-   It finds import groups separated by blank lines in the source code.
-   Then sorts the import statements within each group alphabetically.

So in summary, enabling `sort_imports` will reorder solidity import statements alphabetically within their section groups, while preserving the relative ordering of the groups.

### `contract_new_lines`

> Controls the addition of blank lines before and after contract definitions.

The `contract_new_lines` configuration option in Foundry controls whether empty lines are added before and after contract definitions.

When enabled (`contract_new_lines = true`):

-   An empty line will be added before the start of a contract definition.
-   An empty line will also be added after the end of a contract definition.

For example, with `contract_new_lines` enabled:

```solidity
// Empty line before contract contract MyContract { // ... } // Empty line after contract
```

This helps visually separate contract definitions and improve readability.

When disabled (`contract_new_lines = false`), empty lines will not be added around contracts.

So in summary, the `contract_new_lines` option controls the addition of blank lines before and after contract definitions.

### `override_spacing`

The `override_spacing` configuration option in Foundry controls whether a space is printed between the `override` keyword and the parent contracts when overriding a function or modifier.

When `override_spacing` is enabled:

-   A space will be added after the `override` keyword.

For example:

```solidity
contract Child is Parent {
  function foo() override (Parent) public { }
}
```

When disabled, there will be no space between `override` and the parent contracts:

```solidity
contract Child is Parent {
  function foo() override(Parent) public { } 
}
```

Enables configuring the styling of override declarations.

-   `override_spacing = true` - Print a space after `override`
-   `override_spacing = false` - No space after `override`


### `line_length`

- Type: number
- Default: 120
- Environment: `FOUNDRY_FMT_LINE_LENGTH` or `DAPP_FMT_LINE_LENGTH`

Maximum line length where formatter will try to wrap the line.

### `tab_width`

- Type: number
- Default: 4
- Environment: `FOUNDRY_FMT_TAB_WIDTH` or `DAPP_FMT_TAB_WIDTH`

Number of spaces per indentation level.

### `bracket_spacing`

- Type: bool
- Default: false
- Environment: `FOUNDRY_FMT_BRACKET_SPACING` or `DAPP_FMT_BRACKET_SPACING`

Whether or not to print spaces between brackets.

### `int_types`

- Type: string
- Default: `long`
- Environment: `FOUNDRY_FMT_INT_TYPES` or `DAPP_FMT_INT_TYPES`

Style of uint/int256 types. Valid values are:

- `long` (default): Use the explicit `uint256` or `int256`
- `short`: Use the implicit `uint` or `int`
- `preserve`: Use the type defined in the source code

### `quote_style`

- Type: string
- Default: `double`
- Environment: `FOUNDRY_FMT_QUOTE_STYLE` or `DAPP_FMT_QUOTE_STYLE`

Defines the quotation mark style. Valid values are:

- `double` (default): Use double quotes where possible (`"`)
- `single`: Use single quotes where possible (`'`)
- `preserve`: Use quotation mark defined in the source code

### `number_underscore`

- Type: string
- Default: `preserve`
- Environment: `FOUNDRY_FMT_NUMBER_UNDERSCORE` or `DAPP_FMT_NUMBER_UNDERSCORE`

Style of underscores in number literals. Valid values are:

- `preserve` (default): Use the underscores defined in the source code
- `thousands`: Add an underscore every thousand, if greater than 9999. i.e. `1000` is formatted as `1000` and `10000` as `10_000`
- `remove`: Remove all underscores

### `hex_underscore`

- Type: string
- Default: `remove`
- Environment: `FOUNDRY_FMT_HEX_UNDERSCORE` or `DAPP_FMT_HEX_UNDERSCORE`

Style of underscores in bytes literals. Valid values are:

- `preserve`: Use the underscores defined in the source code
- `remove` (default): Remove all underscores
- `bytes`: Add underscore as separator between byte boundaries. i.e. `hex"deadbeef"` is formatted as `hex"de_ad_be_ef"`

### `wrap_comments`

- Type: bool
- Default: false
- Environment: `FOUNDRY_FMT_WRAP_COMMENTS` or `DAPP_FMT_WRAP_COMMENTS`

Whether or not to wrap comments on `line_length` reached.

### `ignore`

- Type: array of strings (patterns)
- Default: `[]`
- Environment: `FOUNDRY_FMT_IGNORE` or `DAPP_FMT_IGNORE`

List of files to ignore when formatting. This is a comma separated list of glob patterns.
