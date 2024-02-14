## spark coverage

### NAME

spark-coverage - Displays which parts of your code are covered by tests.

### SYNOPSIS

`spark coverage` [*options*]

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

#### Optimization Option

`--ir-minimum` allows you to run the coverage with `via-ir` enabled for the ["minimum amount of optimization"](https://github.com/ethereum/solidity/issues/12533#issuecomment-1013073350) necessary.

### EXAMPLES

1. View summarized coverage:

   ```sh
   spark coverage
   ```

2. Create lcov file with coverage data:

   ```sh
   spark coverage --report lcov
   ```

3. Output uncovered code locations:
   ```sh
   spark coverage --report debug
   ```

### SEE ALSO

[spark](./spark.md), [spark test](./spark-test.md)
