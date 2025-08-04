# Linting

`forge lint` is a command that analyzes Solidity source files in your project to identify potential issues, and enforce coding standards It helps maintain code quality and consistency across your codebase.

## Examples

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

## Supported Lints

This section details the lints supported by `forge lint`. Each lint includes an ID, a description of the issue it checks for, its severity, and examples of incorrect and correct code.

### High Severity

#### `incorrect-shift`

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

Alternatively, you can also disable this individual occurrence using [inline configuration](/config/reference/linter#inline-configuration).

#### `unchecked-call`

Warns when low-level calls (`.call()`, `.delegatecall()`, `.staticcall()`) do not check the success return value.

Low-level calls in Solidity return a tuple `(bool success, bytes memory data)`. Not checking the `success` value can lead to silent failures where the called function reverts but execution continues, potentially resulting in unexpected behavior or security vulnerabilities.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UncheckedCall {
    function correct() public {
        (bool success, ) = address(target).call("");
        require(success, "Call failed");

        // Or using if statement
        (bool ok, bytes memory data) = address(target).call(abi.encodeWithSignature("foo()"));
        if (!ok) revert("Call failed");
    }

    function incorrect() public {
        // Unchecked call - success value is ignored
        address(target).call("");

        // Unchecked call - only data is used
        (, bytes memory data) = address(target).call("");
    }
}
```

To disable this lint for your project, you can add its ID to the `exclude_lints` array within the `[lint]` section of the `foundry.toml` configuration file:

```toml
[lint]
# ... rest of lint config ...
exclude_lints = ["unchecked-call"]
```

Alternatively, you can also disable this individual occurrence using [inline configuration](/config/reference/linter#inline-configuration).

#### `erc20-unchecked-transfer`

Warns when ERC20 `transfer` or `transferFrom` calls do not check the return value.

While the ERC20 standard specifies that these functions should return a boolean indicating success, not all implementations follow this pattern correctly. Some tokens revert on failure, while others return false. Not checking the return value can lead to situations where a transfer fails silently, causing loss of funds or incorrect contract state.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ERC20UncheckedTransfer {
    IERC20 public token;

    function correct() public {
        // Check return value with require
        require(token.transfer(recipient, amount), "Transfer failed");

        // Or capture and check explicitly
        bool success = token.transferFrom(sender, recipient, amount);
        if (!success) revert("Transfer failed");
    }

    function incorrect() public {
        // Unchecked transfer - return value ignored
        token.transfer(recipient, amount);

        // Unchecked transferFrom - return value ignored
        token.transferFrom(sender, recipient, amount);
    }
}
```

To disable this lint for your project, you can add its ID to the `exclude_lints` array within the `[lint]` section of the `foundry.toml` configuration file:

```toml
[lint]
# ... rest of lint config ...
exclude_lints = ["erc20-unchecked-transfer"]
```

Note that this lint could fire false positives, as it only checks the function name, but it doesn't ensure that the called address is an ERC20 contract. Because of that, you may have to disable individual occurrences using [inline configuration](/config/reference/linter#inline-configuration).

### Medium Severity

#### divide-before-multiply

Warns against performing division before multiplication within the same expression, especially with integer arithmetic.

In Solidity, integer division truncates (rounds down towards zero).
Performing division before multiplication can lead to a loss of precision that might be unintended and could have been avoided by reordering operations.
For example, `(a / b) * c` might result in `0` if `a < b`, even if `(a * c) / b` would have yielded a non-zero result.

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

Alternatively, you can also disable this individual occurrence using [inline configuration](/config/reference/linter#inline-configuration).

### Informational / Style Guide

#### `pascal-case-struct`

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

Alternatively, you can also disable this individual occurrence using [inline configuration](/config/reference/linter#inline-configuration).

#### `mixed-case-function`

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

Alternatively, you can also disable this individual occurrence using [inline configuration](/config/reference/linter#inline-configuration).

#### `mixed-case-variable`

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

Alternatively, you can also disable this individual occurrence using [inline configuration](/config/reference/linter#inline-configuration).

#### `screaming-snake-case-const`

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

Alternatively, you can also disable this individual occurrence using [inline configuration](/config/reference/linter#inline-configuration).

#### `screaming-snake-case-immutable`

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

Alternatively, you can also disable this individual occurrence using [inline configuration](/config/reference/linter#inline-configuration).

#### `unused-import`

Warns when imported symbols are not used anywhere in the source file. Unused imports increase deployment costs unnecessarily and reduce code clarity.

This lint checks for:
- Unused named imports: `import {Symbol} from "file.sol";`
- Unused aliased imports: `import "file.sol" as Alias;`
- Unused aliased named imports: `import {Symbol as Alias} from "file.sol";`

> Note: Plain imports without aliases (`import "file.sol";`) are not checked by this lint as they might be used for their side effects.

To disable this lint for your project, you can add its ID to the `exclude_lints` array within the `[lint]` section of the `foundry.toml` configuration file:

```toml
[lint]
# ... rest of lint config ...
exclude_lints = ["unused-import"]
```

Alternatively, you can also disable this individual occurrence using [inline configuration](/config/reference/linter#inline-configuration).

#### `unaliased-plain-import`

Warns when using plain imports without an alias. Plain imports like `import "file.sol";` can make it unclear where symbols are coming from and can lead to naming conflicts.

Best practice is to either:
- Use named imports: `import {Symbol1, Symbol2} from "file.sol";`
- Use aliased imports: `import "file.sol" as FileAlias;`

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Correct - using named imports
import {SafeMath, Math} from "./Math.sol";

// Correct - using aliased import
import "./Utils.sol" as Utils;

// Incorrect - plain import without alias
import "./Helpers.sol";
```

To disable this lint for your project, you can add its ID to the `exclude_lints` array within the `[lint]` section of the `foundry.toml` configuration file:

```toml
[lint]
# ... rest of lint config ...
exclude_lints = ["unaliased-plain-import"]
```

Alternatively, you can also disable this individual occurrence using [inline configuration](/config/reference/linter#inline-configuration).

### Gas Optimizations

#### `asm-keccak256`

Recommends using inline assembly for `keccak256` hashing when possible. The Solidity global function `keccak256()` involves memory allocation and copying which can be less gas-efficient than a direct inline assembly implementation that operates on memory directly, especially for hashing small, fixed-size data.

For production use, consider using [Vectorized's EfficientHashLib](https://github.com/Vectorized/solady/blob/main/src/utils/EfficientHashLib.sol) from the Solady library, which provides highly optimized implementations for common hashing patterns.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HashOptimization {
    // Correct - inline assembly
    function correct(uint256 a, uint256 b) public pure returns (bytes32 hashedVal) {
        assembly {
            mstore(0x00, a)
            mstore(0x20, b)
            let hashedVal := keccak256(0x00, 0x40)
        }
    }

    // Alternative - using EfficientHashLib from Solady
    // import {EfficientHashLib} from "solady/utils/EfficientHashLib.sol";
    // function efficient(uint256 a, uint256 b) public pure returns (bytes32) {
    //     return EfficientHashLib.hash(a, b);
    // }

    // Incorrect
    function incorrect(uint256 a, uint256 b) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(a, b));
    }
}
```

To disable this lint for your project, you can add its ID to the `exclude_lints` array within the `[lint]` section of the `foundry.toml` configuration file:

```toml
[lint]
# ... rest of lint config ...
exclude_lints = ["asm-keccak256"]
```

Alternatively, you can also disable this individual occurrence using [inline configuration](/config/reference/linter#inline-configuration).

### Codesize Optimizations

#### `unwrapped-modifier-logic`

Warns when modifiers contain logic that isn't wrapped between the `_` placeholder. In Solidity, code in modifiers that appears before or after the `_` is inlined at every function using that modifier, which can significantly increase contract size when the modifier is used multiple times.

Moving complex logic into internal functions that are called from the modifier can reduce bytecode size by avoiding code duplication, especially for modifiers used across many functions.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UnwrappedModifierLogic {
    address owner;

    // Correct - Complex logic is wrapped in an internal function
    modifier onlyOwner() {
        _checkOwner();
        _;
    }

    function _checkOwner(address who) internal view {
        require(who == owner, "Not owner");
        // Additional complex checks...
    }

    // Incorrect - Logic directly in modifier gets duplicated
    modifier onlyOwnerIncorrect() {
        require(msg.sender == owner, "Not owner");
        // This code is inlined at every function using this modifier
        _;
    }
}
```

To disable this lint for your project, you can add its ID to the `exclude_lints` array within the `[lint]` section of the `foundry.toml` configuration file:

```toml
[lint]
# ... rest of lint config ...
exclude_lints = ["unwrapped-modifier-logic"]
```

Alternatively, you can also disable this individual occurrence using [inline configuration](/config/reference/linter#inline-configuration).

### See Also

[Lint config](/config/reference/linter)
