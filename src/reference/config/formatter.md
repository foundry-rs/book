## Formatter

Configuration related to the behavior of the Forge formatter. Each of these keys live under the `[fmt]` section.

##### `line_length`

- Type: number
- Default: 120
- Environment: `FOUNDRY_FMT_LINE_LENGTH` or `DAPP_FMT_LINE_LENGTH`

Specifies the maximum line length where the formatter will try to wrap the line.

##### `tab_width`

- Type: number
- Default: 4
- Environment: `FOUNDRY_FMT_TAB_WIDTH` or `DAPP_FMT_TAB_WIDTH`

Number of spaces per indentation level.

##### `bracket_spacing`

- Type: bool
- Default: false
- Environment: `FOUNDRY_FMT_BRACKET_SPACING` or `DAPP_FMT_BRACKET_SPACING`

Whether or not to print spaces between brackets.

##### `int_types`

- Type: string
- Default: long
- Environment: `FOUNDRY_FMT_INT_TYPES` or `DAPP_FMT_INT_TYPES`

Style of uint/int256 types. Valid values are:

- `long` (default): Use the explicit `uint256` or `int256`
- `short`: Use the implicit `uint` or `int`
- `preserve`: Use the type defined in the source code

##### `func_attrs_with_params_multiline`

- Type: bool
- Default: true
- Environment: `FOUNDRY_FMT_FUNC_ATTRS_WITH_PARAMS_MULTILINE` or `DAPP_FMT_FUNC_ATTRS_WITH_PARAMS_MULTILINE`

If function parameters are multiline then always put the function attributes on separate lines.

##### `quote_style`

- Type: string
- Default: double
- Environment: `FOUNDRY_FMT_QUOTE_STYLE` or `DAPP_FMT_QUOTE_STYLE`

Defines the quotation mark style. Valid values are:

- `double` (default): Use double quotes where possible (`"`)
- `single`: Use single quotes where possible (`'`)
- `preserve`: Use quotation mark defined in the source code

##### `number_underscore`

- Type: string
- Default: preserve
- Environment: `FOUNDRY_FMT_NUMBER_UNDERSCORE` or `DAPP_FMT_NUMBER_UNDERSCORE`

Style of underscores in number literals. Valid values are:

- `preserve` (default): Use the underscores defined in the source code
- `thousands`: Add an underscore every thousand, if greater than 9999. i.e. `1000` is formatted as `1000` and `10000` as `10_000`
- `remove`: Remove all underscores
