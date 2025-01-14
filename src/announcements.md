## Announcements

Stay up to date on the latest changes to Foundry.

## 🚨 Actions required

Upgrade your installation of Foundryup!

Run: `curl -L https://foundry.paradigm.xyz | bash`

Upgrading ensures your installation defaults to updating to the **latest stable release** instead of the **latest nightly build**.

If you do not upgrade you will **continue to receive nightly builds by default** which will start to contain more **significant breaking changes**.

## Releases

### 0.3 (stable)

The Foundry [`0.3` release](https://github.com/foundry-rs/foundry/releases/tag/v0.3.0) marks an exciting new chapter for Foundry. By moving to [stable releases](https://github.com/foundry-rs/foundry/releases/tag/stable), we aim to provide a reliable development environment for the EVM ecosystem. Our next priority is the `1.0` release in early 2025, polishing Foundry for the long term.

Big shoutout to the Foundry community - your bug reports, feature requests and contributions have shaped what Foundry is today.

## FAQ

#### How do I update `foundryup`?

Run: `curl -L https://foundry.paradigm.xyz | bash`

After updating you'll be able to update to the latest version of `foundryup` by running `foundryup --update`.

#### How do I install multiple versions?

Easily install different versions using:

```
foundryup --install <version>
```

e.g.

```
foundryup --install nightly
foundryup --install stable
foundryup --install 0.3.0
```

#### How do I know the versions I have installed?

Run

```
foundryup --list
```

This will output a list as follows:

```
foundryup: nightly
foundryup: - forge 0.3.0 (017c59d 2025-01-14T00:25:28.977200980Z)
foundryup: - cast 0.3.0 (017c59d 2025-01-14T00:25:28.933986754Z)
foundryup: - anvil 0.3.0 (017c59d 2025-01-14T00:25:29.065516554Z)
foundryup: - chisel 0.3.0 (017c59d 2025-01-14T00:25:29.021147876Z)

foundryup: stable
foundryup: - forge 0.3.0 (5a8bd89 2024-12-20T08:46:21.555250780Z)
foundryup: - cast 0.3.0 (5a8bd89 2024-12-20T08:46:21.564365462Z)
foundryup: - anvil 0.3.0 (5a8bd89 2024-12-20T08:46:21.565569027Z)
foundryup: - chisel 0.3.0 (5a8bd89 2024-12-20T08:46:21.536871477Z)

foundryup: v0.3.0
foundryup: - forge 0.3.0 (5a8bd89 2024-12-19T17:17:10.245193696Z)
foundryup: - cast 0.3.0 (5a8bd89 2024-12-19T17:17:10.252265834Z)
foundryup: - anvil 0.3.0 (5a8bd89 2024-12-19T17:17:10.248488022Z)
foundryup: - chisel 0.3.0 (5a8bd89 2024-12-19T17:17:10.201917651Z)
```

#### How do I switch between versions?

Easily manage your installations with:

```
foundryup --use <version>
```

e.g.

```
foundryup --use nightly
foundryup --use stable
foundryup --use 0.3.0
```

#### I prefer using nightly builds.

You are still able to receive the latest nightly builds by running `foundryup --install nightly`

**Be cautious — nightly builds may include breaking changes that are difficult to debug without context.**
