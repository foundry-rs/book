import { describe, expect, test } from "vite-plus/test";
import { parseFoundryVersions } from "./fetch-benchmarks.ts";

describe("parseFoundryVersions", () => {
  test("parses the current stable and development versions", () => {
    const versions = `
### Foundry Versions

- **v1.7.1**: forge Version: 1.7.1 (4072e48 2026-05-08)
- **v1.8.0**: forge Version: 1.8.0-dev (c8993b3 2026-08-03)
`;

    expect(parseFoundryVersions(versions + versions)).toEqual({
      baselineVersion: "v1.7.1",
      latestVersionDisplay: "v1.8.0-dev",
      latestVersionUrl: "https://github.com/foundry-rs/foundry/commit/c8993b3",
    });
  });

  test("preserves legacy release and nightly links", () => {
    const markdown = `
- **1.5.1**: forge Version: 1.5.1-v1.5.1 (b0a9dd9 2025-12-19)
- **nightly**: forge Version: 1.6.0-nightly (a249f5c 2026-04-24)
`;

    expect(parseFoundryVersions(markdown)).toEqual({
      baselineVersion: "v1.5.1",
      latestVersionDisplay: "nightly-a249f5c",
      latestVersionUrl: "https://github.com/foundry-rs/foundry/commit/a249f5c",
    });
  });

  test("fails instead of silently substituting a stale baseline", () => {
    expect(() => parseFoundryVersions("No Foundry version metadata")).toThrow(
      "Could not determine the Foundry baseline release",
    );
  });
});
