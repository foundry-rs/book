---
description: Check Foundry release provenance and verify binaries, downloaded archives, and Docker images.
---

## Verifying Releases

`foundryup` checks downloaded binaries automatically. For an independent check of who built a binary, archive, or Docker image, use [GitHub CLI](https://cli.github.com/)'s `gh attestation verify` command.

### What foundryup checks

When you [install Foundry](/introduction/installation), `foundryup` compares each binary's SHA-256 hash with the hashes in the release's GitHub attestation. A hash mismatch aborts installation. Source builds do not use release attestations, and `--force` skips the hash check.

:::note
[`foundryup` v0.0.8](https://github.com/foundry-rs/foundryup/releases/tag/v0.0.8) reads the attestation's hashes but does not verify its cryptographic signature. It also skips verification if the release has no attestation. Use the commands below to verify the signed build provenance.
:::

### Verify an installed binary

Install a current version of [GitHub CLI](https://cli.github.com/) and sign in with `gh auth login`. Run:

```bash
$ gh attestation verify "$(command -v forge)" \
  --repo foundry-rs/foundry \
  --signer-workflow foundry-rs/foundry/.github/workflows/release.yml
```

Replace `forge` with `cast`, `anvil`, or `chisel` to check another binary. This applies to official prebuilt binaries; locally compiled binaries will not match a release attestation.

The command checks the artifact's digest and the attestation's signature, repository, and signing workflow. A successful check exits with status 0. If verification fails, do not use the artifact until you have resolved the failure.

### Verify a downloaded archive

The following Bash commands download and verify the latest stable Linux AMD64 release before you extract it:

```bash
$ release_tag=$(gh release view --repo foundry-rs/foundry --json tagName --jq .tagName)
$ archive="foundry_${release_tag}_linux_amd64.tar.gz"
$ gh release download "$release_tag" --repo foundry-rs/foundry --pattern "$archive"
$ gh attestation verify "$archive" \
  --repo foundry-rs/foundry \
  --signer-workflow foundry-rs/foundry/.github/workflows/release.yml
```

For another platform, use the matching archive name from the [release assets](https://github.com/foundry-rs/foundry/releases/latest): for example, `darwin_arm64.tar.gz` for Apple Silicon or `win32_amd64.zip` for Windows. To verify a specific release, set `release_tag` to its tag instead of looking up the latest release.

You do not need to download a separate attestation file: GitHub CLI retrieves it using the archive's digest.

### Verify a Docker image

Verify the image's build provenance before running it:

```bash
$ gh attestation verify oci://ghcr.io/foundry-rs/foundry:latest \
  --repo foundry-rs/foundry \
  --signer-workflow foundry-rs/foundry/.github/workflows/docker-publish.yml
```

GitHub CLI requires authentication to the container registry for OCI verification. Replace `latest` with a release tag to check a specific version. For deployments, use the same immutable `ghcr.io/foundry-rs/foundry@sha256:<digest>` reference when verifying and running the image so a tag update cannot change which image you run.
