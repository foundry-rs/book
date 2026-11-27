#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";

// Generates src/data/changelog.json, the data behind the /changelog page.
//
// Foundry publishes a nightly (pre)release every day, so the plain GitHub
// releases feed is dominated by nightlies and a single-page fetch contains few
// or no stable releases. This script paginates the full release list and keeps
// stable `vX.Y.Z` releases only.
//
// Without `--strict`, network failures keep the existing checked-in data so
// builds stay reproducible offline. The weekly update workflow runs with
// `--strict` to refresh the data and fails loudly instead.

const REPO = "foundry-rs/foundry";
const API_BASE = `https://api.github.com/repos/${REPO}`;
const OUTPUT_FILE = join(import.meta.dirname, "../src/data/changelog.json");

const STABLE_TAG = /^v(\d+)\.(\d+)\.(\d+)$/;

const strict = process.argv.includes("--strict");

interface Release {
  version: string;
  title: string;
  date: string;
  url: string;
  body: string;
}

interface ChangelogData {
  releases: Release[];
}

async function githubFetch(path: string): Promise<unknown> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "foundry-book-changelog",
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_BASE}${path}`, { headers });
  if (!response.ok) {
    throw new Error(
      `GitHub API request for ${path} failed: ${response.status} ${response.statusText}`,
    );
  }
  return response.json();
}

function compareStableTags(a: string, b: string): number {
  const parse = (tag: string) => tag.match(STABLE_TAG)!.slice(1).map(Number);
  const [aMajor, aMinor, aPatch] = parse(a);
  const [bMajor, bMinor, bPatch] = parse(b);
  return aMajor - bMajor || aMinor - bMinor || aPatch - bPatch;
}

async function fetchStableReleases(): Promise<Release[]> {
  interface GitHubRelease {
    tag_name: string;
    name: string | null;
    published_at: string;
    body: string | null;
    html_url: string;
    prerelease: boolean;
    draft: boolean;
  }

  const releases: Release[] = [];
  // Nightlies outnumber stable releases roughly 50:1; paginate the whole feed.
  for (let page = 1; page <= 50; page++) {
    const batch = (await githubFetch(`/releases?per_page=100&page=${page}`)) as GitHubRelease[];
    for (const release of batch) {
      // Some historical RC releases are not flagged as prereleases (e.g.
      // v1.6.0-rc1), and the rolling `stable`/`nightly` releases are tag
      // aliases, so filter by tag shape as well.
      if (release.draft || release.prerelease || !STABLE_TAG.test(release.tag_name)) continue;
      releases.push({
        version: release.tag_name,
        title: release.name || release.tag_name,
        date: release.published_at,
        url: release.html_url,
        body: (release.body || "").replace(/\r\n/g, "\n").trim(),
      });
    }
    if (batch.length < 100) break;
  }

  releases.sort((a, b) => compareStableTags(b.version, a.version));
  return releases;
}

function readExisting(): ChangelogData | null {
  if (!existsSync(OUTPUT_FILE)) return null;
  try {
    return JSON.parse(readFileSync(OUTPUT_FILE, "utf-8")) as ChangelogData;
  } catch {
    return null;
  }
}

async function main() {
  try {
    console.log(`Fetching stable releases from ${REPO}...`);
    const releases = await fetchStableReleases();
    if (releases.length === 0) {
      throw new Error("No stable releases found");
    }
    console.log(`Found ${releases.length} stable releases (latest: ${releases[0].version})`);

    const data: ChangelogData = { releases };
    const serialized = `${JSON.stringify(data, null, 2)}\n`;

    const existing = readExisting();
    if (existing && `${JSON.stringify(existing, null, 2)}\n` === serialized) {
      console.log("✅ Changelog data already up to date");
      return;
    }

    mkdirSync(dirname(OUTPUT_FILE), { recursive: true });
    writeFileSync(OUTPUT_FILE, serialized);
    console.log(`✅ Wrote changelog data to ${OUTPUT_FILE}`);
  } catch (error) {
    if (!strict && existsSync(OUTPUT_FILE)) {
      console.warn("Failed to refresh changelog data, keeping existing file:", error);
      return;
    }
    console.error("Failed to fetch changelog data:", error);
    process.exit(1);
  }
}

main();
