## Configuring your `foundry.toml`

Forge can be configured using a configuration file called `foundry.toml`, which is placed in the root of your project.

Configuration can be namespaced by profiles. The default profile is named `default`, from which all other profiles inherit. You are free to customize the `default` profile, and add as many new profiles as you need.

Additionally, you can create a global `foundry.toml` in your home directory.

Let's take a look at a configuration file that contains two profiles: the default profile, which always enables the optimizer, as well as a CI profile, that always displays traces:

```toml
[profile.default]
optimizer = true
optimizer_runs = 20_000

[profile.ci]
verbosity = 4
```

When running `forge`, you can specify the profile to use using the `FOUNDRY_PROFILE` environment variable.

### Standalone sections

Besides the profile sections, the configuration file can also contain standalone sections (`[fmt]`, `[fuzz]`, `[invariant]` etc). By default, each standalone section belongs to the `default` profile.
i.e. `[fmt]` is equivalent to `[profile.default.fmt]`.

To configure the standalone section for different profiles other than `default`, use syntax `[profile.<profile name>.<standalone>]`.
i.e. `[profile.ci.fuzz]`.

<br></br>

:::info
See the [`foundry.toml` Reference](/config/reference/default-config) for a complete overview of what you can configure.
:::
