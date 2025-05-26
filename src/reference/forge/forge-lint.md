## forge lint

### NAME

forge-lint – Lint Solidity source files.

### SYNOPSIS

``forge lint`` [*options*] [*path*]...

### DESCRIPTION

Analyzes Solidity source files for style, correctness, and best practices by running a configurable set of lints. Supports filtering by lint severity and specific lint identifiers. Can output results in a JSON format compatible with `rustc`.

### OPTIONS

`[PATH]...`
&nbsp;&nbsp;&nbsp;&nbsp;Paths to the Solidity files or directories to be checked. Overrides the `ignore` project config. If omitted, all source files in the project are linted.

`--root` *path*
&nbsp;&nbsp;&nbsp;&nbsp;The project's root path. By default, this is the root directory of the current git repository, or the current working directory.

`--severity` *severity*...
&nbsp;&nbsp;&nbsp;&nbsp;Specifies which lints to run based on severity. Overrides the `severity` project config.
&nbsp;&nbsp;&nbsp;&nbsp;Supported values: `high`, `med`, `low`, `info`, `gas`.

`--only-lint` *lint_id*...
&nbsp;&nbsp;&nbsp;&nbsp;Specifies which lints to run by their ID (e.g., `incorrect-shift`). Overrides the `exclude_lints` project config.

`--json`
&nbsp;&nbsp;&nbsp;&nbsp;Activates the linter's JSON formatter (rustc-compatible).

### EXAMPLES

1. Lint all Solidity files in the project:
    ```sh
    forge lint
    ```

2. Lint only files in a specific directory:
    ```sh
    forge lint src/contracts/
    ```

3. Lint with only `high` and `gas` severity lints:
    ```sh
    forge lint --severity high --severity gas
    ```

4. Lint with specific lint ID and output as JSON:
    ```sh
    forge lint --only-lint incorrect-shift --json
    ```


### SUPPORTED LINTS

This section details the lints supported by `forge lint`. Each lint includes an ID, a description of the issue it checks for, its severity, and examples of incorrect and correct code.

#### High Severity

##### `incorrect-shift`

Warns against shift operations where the operands might be in an unconventional or potentially erroneous order, specifically when a literal is shifted by a non-literal.

In Solidity, bitwise shift operations (`<<` for left shift, `>>` for right shift) take the value to be shifted as the left operand and the number of bits to shift as the right operand.

This lint rule uses a heuristic to flag potentially incorrect shift oferations. To do so, it identifies expressions where literal is shifted by a variable, which can often be an indication of a logical error where the operands were intended to be reversed. If that was indeed intended, it is recommended to replace literals by constants. Alternatively, the lint rule can be disabled.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IncorrectShift {
    uint64 const LARGE_NUM = 1 ether;
    uint256 foo = 100;

    function correct() public view returns (uint256) {
        // Shifting 'foo' by a literal '2'.
        return foo << 2;

        // Shifting a const 'LARGE_NUM' by a variable 'foo'.
        return LARGE_NUM << foo;
    }

    function incorrect() public view returns (uint256) {
        // Shifting a literal '2' by a variable 'foo'. This is likely an error.
        return 2 << foo;
    }
}
```

To disable this lint for your project, you can add its ID to the `exclude_lints` array within the `[lint]` section of the `foundry.toml` configuration file:

```toml
[lint]
# ... rest of lint config ...
exclude_lints = ["incorrect-shift"]
```

#### Medium Severity

##### ⁠divide-before-multiply

Warns against performing division before multiplication within the same expression, especially with integer arithmetic.

In Solidity, integer division truncates (rounds down towards zero).
Performing division before multiplication can lead to a loss of precision that might be unintended and could have been avoided by reordering operations.
For example, `(a / b) * c` might result in `0` if ⁠`a < b`, even if ⁠`(a * c) / b` would have yielded a non-zero result.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DivideBeforeMultiply {
    function correct() public pure returns (uint256) {
        return (1 * 3) / 2; // Results in 1.
    }

    function incorrect() public pure returns (uint256) {
        return (1 / 2) * 3; // Results in 0.
    }
}
```

To disable this lint for your project, you can add its ID to the `exclude_lints` array within the `[lint]` section of the `foundry.toml` configuration file:

```toml
[lint]
# ... rest of lint config ...
exclude_lints = ["divide-before-multiply"]
```

#### Informational / Style Guide

##### `pascal-case-struct`

Ensures that struct names adhere to `PascalCase` (e.g., `MyStruct`) convention. This is a common styling guideline in Solidity to improve code readability and maintain consistency.

Useful resources: [Solidity Style Guide - Struct Names](https://docs.soliditylang.org/en/latest/style-guide.html#struct-names)

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PascalCaseStruct {
    // Correct
    struct MyStruct {
        uint256 data;
    }

    // Incorrect
    struct my_struct {
        uint256 data;
    }
    struct myStruct {
        uint256 data;
    }
}
```

To disable this lint for your project, you can add its ID to the `exclude_lints` array within the `[lint]` section of the `foundry.toml` configuration file:

```toml
[lint]
# ... rest of lint config ...
exclude_lints = ["pascal-case-struct"]
```

##### `mixed-case-function`

Ensures that function names adhere to `mixedCase` (e.g., `myFunction`) convention. This helps in differentiate functions from other identifiers like structs or events and is a standard practice.

Useful resources: [Solidity Style Guide - Function Names](https://docs.soliditylang.org/en/latest/style-guide.html#function-names)

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MixedCaseFunction {
    // Correct
    function myFunction() public pure returns (uint256) {
        return 1;
    }

    // Incorrect
    function MyFunction() public pure returns (uint256) {
        return 1;
    }
    function my_function() public pure returns (uint256) {
        return 1;
    }
}
```

To disable this lint for your project, you can add its ID to the `exclude_lints` array within the `[lint]` section of the `foundry.toml` configuration file:

```toml
[lint]
# ... rest of lint config ...
exclude_lints = ["mixed-case-function"]
```

##### `mixed-case-variable`

Ensures that mutable variable names (local variables and state variables that are not `constant` or `immutable`) adhere to `mixedCase` (e.g., `myVariable`) convention. This aligns with the general Solidity style for variable naming.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MixedCaseVariable {
    // Correct
    uint256 stateVariable;

    function correct() public {
        uint256 localVariable = 10;
    }

    // Incorrect
    uint256 state_variable;

    function incorrect() public {
        uint256 local_variable = 20;
    }
}
```

To disable this lint for your project, you can add its ID to the `exclude_lints` array within the `[lint]` section of the `foundry.toml` configuration file:

```toml
 [lint]
# ... rest of lint config ...
exclude_lints = ["mixed-case-variable"]
```

##### `screaming-snake-case-const`

Ensures that `constant` variable names adhere to `SCREAMING_SNAKE_CASE` (e.g., `MY_CONSTANT`). This is the standard convention for constants in Solidity, making them easily identifiable.

Useful resources: [Solidity Style Guide - Constants](https://docs.soliditylang.org/en/latest/style-guide.html#constants)

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ScreamingSnakeCaseConstant {
    // Correct
    uint256 constant MY_CONSTANT = 1;

    // Incorrect
    uint256 constant myConstant = 2;
    uint256 constant my_constant = 3;
}
```

To disable this lint for your project, you can add its ID to the `exclude_lints` array within the `[lint]` section of the `foundry.toml` configuration file:

```toml
[lint]
# ... rest of lint config ...
exclude_lints = ["screaming-snake-case-constant"]
```

##### `screaming-snake-case-immutable`

Ensures that `immutable` variable names adhere to `SCREAMING_SNAKE_CASE` (e.g., `MY_IMMUTABLE_VAR`). Similar to constants, this convention helps in distinguish immutable variables and maintaining consistency.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ScreamingSnakeCaseImmutable {
    // Correct
    uint256 immutable MY_IMMUTABLE_VAR;

    // Incorrect
    uint256 immutable myImmutableVar;
    address immutable my_immutable_var;
}
```

To disable this lint for your project, you can add its ID to the `exclude_lints` array within the `[lint]` section of the `foundry.toml` configuration file:

```toml
[lint]
# ... rest of lint config ...
exclude_lints = ["screaming-snake-case-immutable"]
```

#### Gas Optimizations

##### `asm-keccak256`

Recommends using inline assembly for `keccak256` hashing when possible. The Solidity global function `keccak256()` involves memory allocation and copying which can be less gas-efficient than a direct inline assembly implementation that operates on memory directly, especially for hashing small, fixed-size data.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HashOptimization {
    // Correct
    function correct(uint256 a, uint256 b) public pure returns (bytes32 hashedVal) {
        assembly {
            mstore(0x00, a)
            mstore(0x20, b)
            let hashedVal := keccak256(0x00, 0x40)
        }
    }

    // Incorrect
    function incorrect(uint256 a, uint256 b) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(a, b));
    }
}
```

To disable this lint for your project, you can add its ID to the `exclude_lints` array within the `[lint]` section the `foundry.toml` configuration file:

```toml
[lint]
# ... rest of lint config ...
exclude_lints = ["asm-keccak256"]
```


### SEE ALSO

[Lint config](../config/lint.md)
