## Config Overview

Foxar's configuration system allows you to configure its tools.

### Profiles

Configuration can be arbitrarily namespaced into profiles. The default profile is named `default`, and all other profiles inherit values from this profile. Profiles are defined in the `profile` map.

To add a profile named `local`, you would add:

```toml
[profile.local]
```

You can select the profile to use by setting the `FOXAR_PROFILE` environment variable.

### Global configuration

You can create a `foxar.toml` file in `~/.foxar` folder to configure Foxar globally.

### Environment variables

Configuration can be overridden with `FOXAR_` and `DAPP_` prefixed environment variables.

Exceptions are:

- `FOXAR_FFI`, `DAPP_FFI`, `DAPP_TEST_FFI`
- `FOXAR_PROFILE`
- `FOXAR_REMAPPINGS`, `DAPP_REMAPPINGS`
- `FOXAR_LIBRARIES`, `DAPP_LIBRARIES`
- `FOXAR_FS_PERMISSIONS`, `DAPP_FS_PERMISSIONS`, `DAPP_TEST_FS_PERMISSIONS`
- `DAPP_TEST_CACHE`
- `DAPP_TEST_FUZZ_RUNS`
- `DAPP_TEST_FUZZ_DEPTH`

### Configuration format

Configuration files are written in the [TOML format](https://toml.io), with simple key-value pairs inside of sections.

This page describes each configuration key in detail. To see the default values, either refer to the specific key in this document, or see the [default config](/static/config.default.toml).

### Configuration keys

This section documents all configuration keys. All configuration keys must live under a profile, such as `default`.
