## Migrating to Foundry V1

Foundry V1 is the blazing-fast smart contract testing framework you already know, but finally marked as stable and respecting semver. It's the culmination of over a year of work and more than 200 contributors that chimed in to make it happen.

With the V1 release, very few breaking changes have been included, meaning migration should be mostly painless. This guide will help you understand what these changes are and how to handle them properly.

### What to expect

V1 mainly brings more strictness to several cheatcodes, which will be the main thing to migrate early on. While we recommend migrating as soon as possible to V1, It's possible to upgrade your local installation and migrate the tests, while maintaining nightly usage on CI to avoid any failures that might disrupt your workflow.

Aside from this, V1 is still the same Foundry you know.

### I need support. Where do I go?

The [dev Telegram](https://t.me/foundry_rs) is available for any concerns you may have that are not covered in this guide.