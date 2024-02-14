## Formatter

Configuration related to the behavior of the Spark formatter. Each of these keys live under the `[fmt]` section.

##### `line_length`

- Type: number
- Default: 120
- Environment: `FOXAR_FMT_LINE_LENGTH` or `DAPP_FMT_LINE_LENGTH`

Maximum line length where formatter will try to wrap the line.

##### `tab_width`

- Type: number
- Default: 4
- Environment: `FOXAR_FMT_TAB_WIDTH` or `DAPP_FMT_TAB_WIDTH`

Number of spaces per indentation level.

##### `bracket_spacing`

- Type: bool
- Default: false
- Environment: `FOXAR_FMT_BRACKET_SPACING` or `DAPP_FMT_BRACKET_SPACING`

Whether or not to print spaces between brackets.

##### `int_types`

- Type: string
- Default: `long`
- Environment: `FOXAR_FMT_INT_TYPES` or `DAPP_FMT_INT_TYPES`

Style of uint/int256 types. Valid values are:

- `long` (default): Use the explicit `uint256` or `int256`
- `short`: Use the implicit `uint` or `int`
- `preserve`: Use the type defined in the source code

##### `multiline_func_header`

- Type: string
- Default: `attributes_first`
- Environment: `FOXAR_FMT_MULTILINE_FUNC_HEADER` or `DAPP_FMT_MULTILINE_FUNC_HEADER`

Style of multiline function header in case it doesn't fit in one line. Valid values are:

- `attributes_first` (default): Write function attributes multiline first
- `params_first`: Write function parameters multiline first
- `all`: If function parameters or attributes are multiline, multiline everything

##### `quote_style`

- Type: string
- Default: `double`
- Environment: `FOXAR_FMT_QUOTE_STYLE` or `DAPP_FMT_QUOTE_STYLE`

Defines the quotation mark style. Valid values are:

- `double` (default): Use double quotes where possible (`"`)
- `single`: Use single quotes where possible (`'`)
- `preserve`: Use quotation mark defined in the source code

##### `number_underscore`

- Type: string
- Default: `preserve`
- Environment: `FOXAR_FMT_NUMBER_UNDERSCORE` or `DAPP_FMT_NUMBER_UNDERSCORE`

Style of underscores in number literals. Valid values are:

- `preserve` (default): Use the underscores defined in the source code
- `thousands`: Add an underscore every thousand, if greater than 9999. i.e. `1000` is formatted as `1000` and `10000` as `10_000`
- `remove`: Remove all underscores

##### `override_spacing`

- Type: bool
- Default: true
- Environment: `FOXAR_FMT_OVERRIDE_SPACING` or `DAPP_FMT_OVERRIDE_SPACING`

Whether or not to print a space in `override` attributes for contract state variables, functions, and modifiers.

##### `wrap_comments`

- Type: bool
- Default: false
- Environment: `FOXAR_FMT_WRAP_COMMENTS` or `DAPP_FMT_WRAP_COMMENTS`

Whether or not to wrap comments on `line_length` reached.

##### `ignore`

- Type: array of strings (patterns)
- Default: `[]`
- Environment: `FOXAR_FMT_IGNORE` or `DAPP_FMT_IGNORE`

List of files to ignore when formatting. This is a comma separated list of glob patterns.
