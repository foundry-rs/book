#!/usr/bin/env bun
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const GITHUB_API_URL = 'https://api.github.com/repos/foundry-rs/foundry/releases';
const OUTPUT_DIR = join(import.meta.dir, '../docs/pages');

interface GitHubRelease {
  id: number;
  tag_name: string;
  name: string;
  body: string;
  published_at: string;
  html_url: string;
  draft: boolean;
  prerelease: boolean;
}

interface ProcessedRelease {
  tag_name: string;
  name: string;
  published_at: string;
  html_url: string;
  body: string;
}

async function fetchAllReleases(): Promise<GitHubRelease[]> {
  try {
    let allReleases: GitHubRelease[] = [];
    let page = 1;
    let hasMore = true;
    
    while (hasMore && page <= 5) { // Limit to 5 pages to avoid too many requests
      const response = await fetch(GITHUB_API_URL + `?per_page=100&page=${page}`, {
        headers: {
          'Accept': 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
          ...(process.env.GITHUB_TOKEN ? {
            'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
          } : {})
        }
      });

      if (!response.ok) {
        if (response.status === 403) {
          console.warn('⚠️  GitHub API rate limit may have been reached. Consider setting GITHUB_TOKEN environment variable.');
        }
        // throw new Error(`Failed to fetch releases: ${response.status} ${response.statusText}`);
      }

      const releases = await response.json();
      allReleases = allReleases.concat(releases);
      
      // Check if there are more pages
      hasMore = releases.length === 100;
      page++;
    }
    
    console.log(`Fetched ${allReleases.length} releases across ${page - 1} page(s)`);
    return allReleases;
  } catch (error) {
    console.error('Error fetching releases:', error);
    throw error;
  }
}

async function fetchReleaseByTag(tag: string): Promise<GitHubRelease | null> {
  try {
    const response = await fetch(`https://api.github.com/repos/foundry-rs/foundry/releases/tags/${tag}`, {
      headers: {
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        ...(process.env.GITHUB_TOKEN ? {
          'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
        } : {})
      }
    });

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`Release with tag ${tag} not found`);
        return null;
      }
      throw new Error(`Failed to fetch release: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching release ${tag}:`, error);
    return null;
  }
}

function processReleaseBody(body: string): string {
  // Convert GitHub issue/PR references to links
  body = body.replace(/#(\d+)/g, '[#$1](https://github.com/foundry-rs/foundry/pull/$1)');
  
  // Convert GitHub user mentions to links
  body = body.replace(/@([a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)/g, '[@$1](https://github.com/$1)');
  
  // Escape MDX-specific characters
  body = body.replace(/(\{|\})/g, (match, p1, offset, str) => {
    const beforeText = str.substring(0, offset);
    const insideLink = (beforeText.lastIndexOf('[') > beforeText.lastIndexOf(']')) || 
                      (beforeText.lastIndexOf('(') > beforeText.lastIndexOf(')'));
    return insideLink ? match : '\\' + match;
  });
  
  return body;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function extractFirstRelease(body: string): string {
  // For stable tag, extract only the first release section
  // Look for the pattern of "# Foundry vX.X.X" and take everything until the next "# Foundry" or end
  const releasePattern = /^# Foundry v[\d.]+.*?(?=^# Foundry v[\d.]+|\z)/ms;
  const match = body.match(releasePattern);
  
  if (match) {
    return match[0].trim();
  }
  
  // If no pattern found, return the original body
  return body;
}

function createReleasePage(release: ProcessedRelease, title: string, description: string, isStableTag: boolean = false): string {
  let body = release.body;
  
  // For stable tag, extract only the most recent release
  if (isStableTag) {
    body = extractFirstRelease(body);
  }
  
  body = processReleaseBody(body);
  const publishedDate = formatDate(release.published_at);


if (isStableTag) {
  return `---
title: ${title}
description: ${description}
---

${body}

*This page is automatically updated with the latest release information from the [Foundry GitHub repository](https://github.com/foundry-rs/foundry/releases).*
`;
}
  
  return `---
title: ${title}
description: ${description}
---

# ${release.name || release.tag_name} [${publishedDate}]

${body}

---

*This page is automatically updated with the latest release information from the [Foundry GitHub repository](https://github.com/foundry-rs/foundry/releases).*
`;
}

function createMainReleasePage(latestRelease: ProcessedRelease, previousReleases: ProcessedRelease[]): string {
  const body = processReleaseBody(latestRelease.body);
  const publishedDate = formatDate(latestRelease.published_at);
  
  // Create previous releases table
  let previousReleasesTable = '';
  if (previousReleases.length > 0) {
    previousReleasesTable = `
## Previous Releases

| Version | Release Date | Release Notes |
|---------|--------------|---------------|
${previousReleases.map(release => {
  const date = formatDate(release.published_at);
  return `| ${release.tag_name} | ${date} | [View](${release.html_url}) |`;
}).join('\n')}
`;
  }
  
  return `---
title: Foundry Releases
description: Latest release notes for Foundry
---

# ${latestRelease.name || latestRelease.tag_name} [${publishedDate}]

${body}

${previousReleasesTable}

---

*This page is automatically updated with the latest release information from the [Foundry GitHub repository](https://github.com/foundry-rs/foundry/releases).*
`;
}

async function main() {
  try {
    console.log('Fetching all Foundry releases...');
    
    const allReleases = await fetchAllReleases();
    
    // Filter out drafts
    const publishedReleases = allReleases.filter(r => !r.draft);
    
    // Get latest non-nightly release
    const latestRelease = publishedReleases.find(r => 
      !r.tag_name.toLowerCase().includes('nightly') && 
      r.tag_name !== 'stable'
    );
    
    if (!latestRelease) {
      console.error('No non-nightly release found');
      return;
    }
    
    // Get previous named releases (v1.0.0 and later, excluding stable/nightly)
    const previousReleases = publishedReleases
      .filter(r => {
        const tag = r.tag_name;
        // Exclude current release, nightly, and stable
        if (tag === latestRelease.tag_name || 
            tag.toLowerCase().includes('nightly') || 
            tag === 'stable') {
          return false;
        }
        // Include v1.0.0 and later
        const versionMatch = tag.match(/^v?(\d+)\.(\d+)\.(\d+)/);
        if (versionMatch) {
          const major = parseInt(versionMatch[1]);
          const minor = parseInt(versionMatch[2]);
          const patch = parseInt(versionMatch[3]);
          // Include v1.0.0 and all later versions
          return major > 1 || (major === 1 && minor >= 0 && patch >= 0);
        }
        return false;
      })
      .slice(0, 30); // Limit to 30 most recent
    
    // Fetch stable and nightly releases
    console.log('Fetching stable release...');
    const stableRelease = await fetchReleaseByTag('stable');
    
    console.log('Fetching latest nightly release...');
    // Find the most recent nightly-* release
    const nightlyReleases = publishedReleases.filter(r => 
      r.tag_name.startsWith('nightly-')
    );
    const nightlyRelease = nightlyReleases.length > 0 ? nightlyReleases[0] : null;
    
    // Create output directory
    mkdirSync(join(OUTPUT_DIR, 'releases'), { recursive: true });
    
    // Write main releases page
    console.log(`Writing main releases page (${latestRelease.tag_name})...`);
    const mainContent = createMainReleasePage(latestRelease, previousReleases);
    writeFileSync(join(OUTPUT_DIR, 'releases.mdx'), mainContent);
    
    // Write stable release page
    if (stableRelease) {
      console.log('Writing stable release page...');
      const stableContent = createReleasePage(
        stableRelease,
        'Foundry Stable Release',
        'Latest stable release notes for Foundry',
        true // isStableTag
      );
      writeFileSync(join(OUTPUT_DIR, 'releases/stable.mdx'), stableContent);
    }
    
    // Write nightly release page
    if (nightlyRelease) {
      console.log('Writing nightly release page...');
      const nightlyContent = createReleasePage(
        nightlyRelease,
        'Foundry Nightly Release',
        'Latest nightly release notes for Foundry'
      );
      writeFileSync(join(OUTPUT_DIR, 'releases/nightly.mdx'), nightlyContent);
    }
    
    console.log('✅ Successfully generated all release pages');
  } catch (error) {
    console.error('Failed to fetch and process releases:', error);
    process.exit(1);
  }
}

// Run the script
main();