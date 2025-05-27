## Linter Configuration

Configuration related to the behavior of the linter. These keys are set in the `[lint]` section.

##### `severity`

-  Type: array of strings
-  Default: all severities enabled (`high`, `med`, `low`, `info`, `gas`)
-  Environment: `FOUNDRY_LINT_SEVERITY`

Specifies which lints to run based on severity. If omitted, all severities are checked.

##### `exclude_lints`

-  Type: array of strings
-  Default: `[]`
-  Environment: `FOUNDRY_LINT_EXCLUDE_LINTS`

List of lint IDs to exclude from checking (e.g., `"mixed-case-function"`).

##### `ignore`

-  Type: array of strings (patterns)
-  Default: `[]`
-  Environment: `FOUNDRY_LINT_IGNORE`

List of files or patterns to ignore when running the linter. This is a comma-separated list of glob patterns.
