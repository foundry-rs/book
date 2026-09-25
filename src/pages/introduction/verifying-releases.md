---
description: Verify Foundry binaries, release archives, and Docker images using attestations, signatures, and checksums.
---

## Verifying Releases

When you [install Foundry](/introduction/installation) with `foundryup`, release verification happens automatically. Use this guide when you download an archive or Docker image directly, or want to independently verify an installed binary.

### Automatic verification with foundryup

`foundryup` verifies the release's Sigstore attestation against the `foundry-rs/foundry` release workflow identity and the GitHub Actions issuer. It then checks the binaries' SHA-256 hashes against the verified attestation before activating them. You do not need GitHub CLI or Cosign for this check.

Prebuilt releases from `v1.3.0-rc1` onward, including nightly releases, require a valid attestation. Older releases can be installed without verification when no attestation exists. Branch, pull request, commit, and local-path installations build from source instead. Passing `foundryup --force` explicitly disables release verification.

### Release artifacts

Current official releases publish the following files alongside each `foundry_<version>_<platform>_<arch>.{tar.gz,zip}` archive on the [releases page](https://github.com/foundry-rs/foundry/releases):

| Suffix | Purpose |
| --- | --- |
| `.sha256` | SHA-256 checksum of the archive |
| `.sigstore.json` | Cosign signature bundle for the archive |
| `.spdx.json` | SPDX SBOM describing the build's dependencies |
| `.attestation.txt` | URL of the GitHub artifact-attestation summary |

GitHub also stores SLSA build-provenance and SBOM attestations for the archive. Signing uses [Sigstore](https://www.sigstore.dev/) with GitHub Actions identities, and signatures are recorded in the public [Rekor](https://docs.sigstore.dev/logging/overview/) transparency log.

The examples below use the `v1.7.1` Linux AMD64 release. Choose the version, platform, and architecture you downloaded; older releases may not provide every artifact listed above.

### Verify a binary or archive with GitHub CLI

Install [GitHub CLI](https://cli.github.com/) and authenticate with `gh auth login` if needed. To verify the `forge` binary on your `PATH`:

```bash
$ gh attestation verify "$(command -v forge)" --repo foundry-rs/foundry
```

To verify a downloaded archive's provenance and signer workflow:

```bash
$ gh attestation verify foundry_v1.7.1_linux_amd64.tar.gz \
  --repo foundry-rs/foundry \
  --signer-workflow foundry-rs/foundry/.github/workflows/release.yml
```

To verify its SBOM attestation:

```bash
$ gh attestation verify foundry_v1.7.1_linux_amd64.tar.gz \
  --repo foundry-rs/foundry \
  --predicate-type 'https://spdx.dev/Document/v2.3'
```

These commands compute the artifact's digest and verify its signed attestation. A successful result identifies the repository and workflow that produced it.

### Verify an archive with Cosign

Install [Cosign](https://docs.sigstore.dev/cosign/system_config/installation/) and download the archive and its matching `.sigstore.json` bundle from the same release:

```bash
$ cosign verify-blob \
  --bundle foundry_v1.7.1_linux_amd64.sigstore.json \
  --certificate-identity 'https://github.com/foundry-rs/foundry/.github/workflows/release.yml@refs/tags/v1.7.1' \
  --certificate-oidc-issuer 'https://token.actions.githubusercontent.com' \
  foundry_v1.7.1_linux_amd64.tar.gz
```

For nightly builds, the certificate identity ends in `@refs/heads/master` instead of a release tag.

### Check an archive's checksum

Download the matching `.sha256` file into the same directory as the archive:

```bash [Linux]
$ sha256sum -c foundry_v1.7.1_linux_amd64.sha256
```

```bash [macOS]
$ shasum -a 256 -c foundry_v1.7.1_linux_amd64.sha256
```

A checksum detects changed bytes but does not establish who published them. Use an attestation or signature check above to verify provenance.

### Verify a Docker image

Container signatures and attestations are published to GHCR. With Cosign installed, verify the image signature:

```bash
$ cosign verify ghcr.io/foundry-rs/foundry:v1.7.1 \
  --certificate-identity-regexp '^https://github.com/foundry-rs/foundry/\.github/workflows/(release|docker-publish)\.yml@.*' \
  --certificate-oidc-issuer 'https://token.actions.githubusercontent.com'
```

With GitHub CLI authenticated to the container registry, verify the build provenance:

```bash
$ gh attestation verify oci://ghcr.io/foundry-rs/foundry:v1.7.1 \
  --repo foundry-rs/foundry
```

You can inspect the SBOM and provenance attached by Docker Buildx:

```bash
$ docker buildx imagetools inspect ghcr.io/foundry-rs/foundry:v1.7.1 \
  --format '{{ json .SBOM }}'
$ docker buildx imagetools inspect ghcr.io/foundry-rs/foundry:v1.7.1 \
  --format '{{ json .Provenance }}'
```

For reproducible deployments, use an immutable `ghcr.io/foundry-rs/foundry@sha256:<digest>` reference in both verification and deployment commands.
