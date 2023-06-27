## Migrating to Foundry V1

Foundry V1 is the blazing-fast smart contract testing framework you already know, but finally marked as stable and respecting semver. It's the culmination of over a year of work and more than 200 contributors that chimed in to make it happen.

With the V1 release, some breaking changes have been made which might require you to tweak your tests, and some patterns are now discouraged and might emit warnings. This guide will help you understand what these changes are and how to handle them properly.

### How do I upgrade to V1?

To upgrade, you'll need to reinstall `foundryup`. To do so, open your terminal and run the following command:

```sh
curl -L https://foundry.paradigm.xyz | bash
```

This will reinstall `foundryup`. You can then run `foundryup` on your terminal to download the latest `V1` version.

After this, you're now up to date with the latest stable Foundry version.