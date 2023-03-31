## forge coverage

### NAME

forge-coverage - Displays which parts of your code are covered by tests.

### SYNOPSIS

`forge coverage` [*options*]

### DESCRIPTION

Displays which parts of your code are covered by tests.

### Options

#### Report Options

`--report` allows you to specify the report type to use for coverage. This flag can be used multiple times.

It has three different options and is set to `summary` by default.

`summary`  
&nbsp;&nbsp;&nbsp;&nbsp;Outputs a chart showing what percentage of your code is covered by tests.

`lcov`  
&nbsp;&nbsp;&nbsp;&nbsp;Creates a lcov.info file containing your coverage data in the root of your project's directory.

`debug`  
&nbsp;&nbsp;&nbsp;&nbsp;Outputs lines describing the location of uncovered code.

{{#include common-options.md}}

### EXAMPLES

1. View summarized coverage:

   ```sh
   forge coverage
   ```

2. Create lcov file with coverage data:

   ```sh
   forge coverage --report lcov
   ```

3. Output uncovered code locations:
   ```sh
   forge coverage --report debug
   ```

### SEE ALSO

[forge](./forge.md), [forge test](./forge-test.md)
