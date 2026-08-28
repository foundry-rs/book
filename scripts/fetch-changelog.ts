#!/usr/bin/env bun
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';

// Generates src/data/changelog.json, the data behind the /changelog page.
//
// Foundry publishes a nightly (pre)release every day, so the plain GitHub
// releases feed is dominated by nightlies and a single-page fetch contains few
// or no stable releases. This script paginates the full release list, keeps
// stable `vX.Y.Z` releases only, and additionally builds an "Unreleased"
// section from the `.changelog/*.md` fragments that landed on master since the
// latest stable tag.
//
// Without `--strict`, network failures keep the existing checked-in data so
// builds stay reproducible offline. The weekly update workflow runs with
// `--strict` to refresh the data and fails loudly instead.

const REPO = 'foundry-rs/foundry';
const API_BASE = `https://api.github.com/repos/${REPO}`;
const RAW_BASE = `https://raw.githubusercontent.com/${REPO}`;
const OUTPUT_FILE = join(import.meta.dir, '../src/data/changelog.json');

const STABLE_TAG = /^v(\d+)\.(\d+)\.(\d+)$/;
// Cargo package names from fragment frontmatter that map to user-facing tools.
const USER_FACING_PACKAGES = ['forge', 'cast', 'anvil', 'chisel'];

const strict = process.argv.includes('--strict');

interface Release {
  version: string;
  title: string;
  date: string;
  url: string;
  body: string;
}

interface Unreleased {
  since: string;
  date: string;
  url: string;
  body: string;
}

interface ChangelogData {
  unreleased: Unreleased | null;
  releases: Release[];
}

async function githubFetch(path: string): Promise<unknown> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'foundry-book-changelog',
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_BASE}${path}`, { headers });
  if (!response.ok) {
    throw new Error(`GitHub API request for ${path} failed: ${response.status} ${response.statusText}`);
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
        body: (release.body || '').replace(/\r\n/g, '\n').trim(),
      });
    }
    if (batch.length < 100) break;
  }

  releases.sort((a, b) => compareStableTags(b.version, a.version));
  return releases;
}

async function listChangelogFragments(ref: string): Promise<string[]> {
  interface DirEntry {
    name: string;
    type: string;
  }

  const entries = (await githubFetch(`/contents/.changelog?ref=${ref}`)) as DirEntry[];
  return entries
    .filter(entry => entry.type === 'file' && entry.name.endsWith('.md') && entry.name !== 'README.md')
    .map(entry => entry.name);
}

interface Fragment {
  packages: string[];
  note: string;
}

function parseFragment(markdown: string): Fragment | null {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return null;

  const packages: string[] = [];
  for (const line of match[1].split(/\r?\n/)) {
    const entry = line.match(/^([\w-]+):\s*(major|minor|patch)\s*$/);
    if (entry) packages.push(entry[1]);
  }

  const note = match[2].replace(/\s*\n\s*/g, ' ').trim();
  if (!note) return null;

  const tools = USER_FACING_PACKAGES.filter(tool => packages.includes(tool));
  return { packages: tools, note };
}

async function fetchUnreleased(latestTag: string): Promise<Unreleased | null> {
  const [masterFragments, releasedFragments] = await Promise.all([
    listChangelogFragments('master'),
    listChangelogFragments(latestTag),
  ]);

  // Fragments are consumed into CHANGELOG.md at release time, but compare
  // against the tag's snapshot instead of assuming an empty directory so
  // fragments that already shipped are never listed as unreleased.
  const released = new Set(releasedFragments);
  const added = masterFragments.filter(name => !released.has(name)).sort();
  if (added.length === 0) return null;

  const fragments: Fragment[] = [];
  for (let i = 0; i < added.length; i += 16) {
    const batch = await Promise.all(
      added.slice(i, i + 16).map(async name => {
        const response = await fetch(`${RAW_BASE}/master/.changelog/${name}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch fragment ${name}: ${response.status} ${response.statusText}`);
        }
        return parseFragment(await response.text());
      }),
    );
    fragments.push(...batch.filter(fragment => fragment !== null));
  }
  if (fragments.length === 0) return null;

  // Group user-facing tools first, internal-only changes last.
  fragments.sort((a, b) => {
    const rank = (fragment: Fragment) =>
      fragment.packages.length === 0 ? USER_FACING_PACKAGES.length : USER_FACING_PACKAGES.indexOf(fragment.packages[0]);
    return rank(a) - rank(b) || a.note.localeCompare(b.note);
  });

  // Date the section by the last commit that touched the fragments so the
  // generated file only changes when its content does.
  interface Commit {
    commit: { committer: { date: string } };
  }
  const commits = (await githubFetch('/commits?path=.changelog&per_page=1')) as Commit[];
  const date = commits[0]?.commit.committer.date ?? new Date().toISOString();

  let body = `Changes merged since ${latestTag}. Available in [nightly builds](https://github.com/foundry-rs/foundry/releases/tag/nightly) and part of the next stable release.\n`;
  for (const fragment of fragments) {
    const prefix = fragment.packages.length > 0 ? `**${fragment.packages.join(', ')}**: ` : '';
    body += `\n- ${prefix}${fragment.note}`;
  }

  return {
    since: latestTag,
    date,
    url: 'https://github.com/foundry-rs/foundry/releases/tag/nightly',
    body,
  };
}

function readExisting(): ChangelogData | null {
  if (!existsSync(OUTPUT_FILE)) return null;
  try {
    return JSON.parse(readFileSync(OUTPUT_FILE, 'utf-8')) as ChangelogData;
  } catch {
    return null;
  }
}

async function main() {
  try {
    console.log(`Fetching stable releases from ${REPO}...`);
    const releases = await fetchStableReleases();
    if (releases.length === 0) {
      throw new Error('No stable releases found');
    }
    console.log(`Found ${releases.length} stable releases (latest: ${releases[0].version})`);

    console.log('Collecting unreleased changelog fragments...');
    const unreleased = await fetchUnreleased(releases[0].version);
    console.log(unreleased ? `Found unreleased changes since ${unreleased.since}` : 'No unreleased changes');

    const data: ChangelogData = { unreleased, releases };
    const serialized = `${JSON.stringify(data, null, 2)}\n`;

    const existing = readExisting();
    if (existing && `${JSON.stringify(existing, null, 2)}\n` === serialized) {
      console.log('✅ Changelog data already up to date');
      return;
    }

    mkdirSync(dirname(OUTPUT_FILE), { recursive: true });
    writeFileSync(OUTPUT_FILE, serialized);
    console.log(`✅ Wrote changelog data to ${OUTPUT_FILE}`);
  } catch (error) {
    if (!strict && existsSync(OUTPUT_FILE)) {
      console.warn('Failed to refresh changelog data, keeping existing file:', error);
      return;
    }
    console.error('Failed to fetch changelog data:', error);
    process.exit(1);
  }
}

main();
