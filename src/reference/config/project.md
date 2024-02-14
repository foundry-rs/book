## Project

Configuration related to the project in general.

##### `src`

- Type: string
- Default: src
- Environment: `FOXAR_SRC` or `DAPP_SRC`

The path to the contract sources relative to the root of the project.

##### `test`

- Type: string
- Default: test
- Environment: `FOXAR_TEST` or `DAPP_TEST`

The path to the test contract sources relative to the root of the project.

##### `script`

- Type: string
- Default: script
- Environment: `FOXAR_SCRIPT` or `DAPP_SCRIPT`

The path to the script contract sources relative to the root of the project.

##### `out`

- Type: string
- Default: out
- Environment: `FOXAR_OUT` or `DAPP_OUT`

The path to put contract artifacts in, relative to the root of the project.

##### `libs`

- Type: array of strings (paths)
- Default: lib
- Environment: `FOXAR_LIBS` or `DAPP_LIBS`

An array of paths that contain libraries, relative to the root of the project.

##### `cache`

- Type: boolean
- Default: true
- Environment: `FOXAR_CACHE` or `DAPP_CACHE`

Whether or not to enable caching. If enabled, the result of compiling sources, tests, and dependencies, are cached in `cache`.

##### `cache_path`

- Type: string
- Default: cache
- Environment: `FOXAR_CACHE_PATH` or `DAPP_CACHE_PATH`

The path to the cache, relative to the root of the project.

##### `broadprobe`

- Type: string
- Default: broadprobe

The path to the broadprobe transaction logs, relative to the root of the project.

##### `force`

- Type: boolean
- Default: false
- Environment: `FOXAR_FORCE` or `DAPP_FORCE`

Whether or not to perform a clean build, discarding the cache.
