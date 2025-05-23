## Announcements

Stay up to date with the latest changes to Foundry.

## 🚨 Actions required

Upgrade your installation of `foundryup`!

Run: `curl -L https://foundry.paradigm.xyz | bash`

Upgrading ensures your installation defaults to updating to the **latest stable release** instead of the **latest nightly build**.

If you do not upgrade you will **continue to receive nightly builds by default** which will start to contain more **significant breaking changes**.

## ⚠️ Notes

If you are running Foundry's **latest nightly build** you may encounter the following error:

```sh
[FAIL: call didn't revert at a lower depth than cheatcode call depth]
```

Please read [here](https://book.getfoundry.sh/cheatcodes/expect-revert#error) for more information.

## Releases

### 1.0 (rc)

Several breaking changes were introduced in Foundry [`1.0` release candidate](https://github.com/foundry-rs/foundry/releases/tag/rc) (`rc`), which could require updates on projects using older versions.

You are recommended to follow the [migration guide](./guides/v1.0-migration.md) to prepare your codebase for the `1.0` stable release.

To install the release candidate run `foundryup -i rc` and try it out.

It is important to us we get your feedback as this is the last step before the official `1.0` release after three years.

### 0.3 (stable)

The Foundry [`0.3` release](https://github.com/foundry-rs/foundry/releases/tag/v0.3.0) marks an exciting new chapter for Foundry. By moving to [stable releases](https://github.com/foundry-rs/foundry/releases/tag/stable), we aim to provide a reliable development environment for the EVM ecosystem. Our next priority is the `1.0` release in early 2025, polishing Foundry for the long term.

Big shoutout to the Foundry community - your bug reports, feature requests and contributions have shaped what Foundry is today.

## FAQ

#### How do I know which version I have installed?

The latest version of `foundryup` is `1.0.1`.

If you run `foundryup --version` and it does not return this or returns an error you are not up to date.

#### How do I update `foundryup`?

Run: `curl -L https://foundry.paradigm.xyz | bash`

As a security best practice it is recommended you manually follow the [redirect](https://foundry.paradigm.xyz), inspect the [installer](https://raw.githubusercontent.com/foundry-rs/foundry/master/foundryup/install) you are about to run and the new version of [`foundryup`](https://raw.githubusercontent.com/foundry-rs/foundry/master/foundryup/foundryup) you are about to install.

After the initial update you'll be able to update to the latest version of `foundryup` by running:

```sh
foundryup --update
```

#### How do I install multiple versions?

Easily install different versions using:

```sh
foundryup --install <version>
```

e.g.

```sh
foundryup --install nightly
foundryup --install stable
foundryup --install 0.3.0
```

#### How do I know which versions I have installed?

Run

```sh
foundryup --list
```

This will output a list as follows:

```sh
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

```sh
foundryup --use <version>
```

e.g.

```sh
foundryup --use nightly
foundryup --use stable
foundryup --use 0.3.0
```

#### How do I configure `foundry-toolchain`?

The `foundry-toolchain` GitHub Action will use the latest `stable` release by default.

If you would prefer to use a different release you can set the `version` key:

```yml
- name: Install Foundry
  uses: foundry-rs/foundry-toolchain@v1
  with:
    version: <version>
```

e.g.

```yml
- name: Install Foundry
  uses: foundry-rs/foundry-toolchain@v1
  with:
    version: nightly
```

#### I prefer using nightly builds.

You are still able to receive the latest `nightly` builds by running `foundryup --install nightly`

**Be cautious — nightly builds may include breaking changes that are difficult to debug without context.**
