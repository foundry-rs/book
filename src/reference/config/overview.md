## Config Overview

Foundry's configuration system allows you to configure its tools.

### Profiles

Configuration can be arbitrarily namespaced into profiles. The default profile is named `default`, and all other profiles inherit values from this profile. Profiles are defined in the `profile` map.

To add a profile named `local`, you would add:

```toml
[profile.local]
```

You can select the profile to use by setting the `FOUNDRY_PROFILE` environment variable.

### Global configuration

You can create a `foundry.toml` file in `~/.foundry` folder to configure Foundry globally.

### Environment variables

Configuration can be overriden with `FOUNDRY_` and `DAPP_` prefixed environment variables.

Exceptions are:

- `FOUNDRY_FFI`, `DAPP_FFI`

### Configuration format

Configuration files are written in the [TOML format](https://toml.io), with simple key-value pairs inside of sections.

This page describes each configuration key in detail. To see the default values, either refer to the specific key in this document, or see the [default config](/static/config.default.toml).

### Configuration keys

This section documents all configuration keys. All configuration keys must live under a profile, such as `default`.
