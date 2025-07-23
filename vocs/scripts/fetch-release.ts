#!/usr/bin/env bun
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';

const GITHUB_API_URL = 'https://api.github.com/repos/foundry-rs/foundry/releases';
const OUTPUT_PATH = join(import.meta.dir, '../docs/pages/releases.mdx');

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

async function fetchLatestRelease(): Promise<GitHubRelease | null> {
  try {
    // Fetch all releases
    const response = await fetch(GITHUB_API_URL, {
      headers: {
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        // Add token if available
        ...(process.env.GITHUB_TOKEN ? {
          'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
        } : {})
      }
    });

    if (!response.ok) {
      if (response.status === 403) {
        console.warn('⚠️  GitHub API rate limit may have been reached. Consider setting GITHUB_TOKEN environment variable.');
      }
      throw new Error(`Failed to fetch releases: ${response.status} ${response.statusText}`);
    }

    const releases: GitHubRelease[] = await response.json();
    
    // Filter out nightly releases and drafts
    const filteredReleases = releases.filter(release => 
      !release.tag_name.startsWith('nightly') && 
      !release.tag_name.toLowerCase().includes('nightly') &&
      !release.draft
    );

    if (filteredReleases.length === 0) {
      console.warn('No non-nightly releases found');
      return null;
    }

    // Return the first release (latest non-nightly)
    return filteredReleases[0];
  } catch (error) {
    console.error('Error fetching releases:', error);
    throw error;
  }
}

function formatReleaseForMDX(release: GitHubRelease): string {
  const publishedDate = new Date(release.published_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Convert GitHub markdown to MDX-compatible format
  let body = release.body;
  
  // Escape any MDX-specific characters if needed
  body = body.replace(/\{/g, '\\{').replace(/\}/g, '\\}');
  
  const mdxContent = `---
title: Foundry Releases
description: Latest release notes for Foundry
---

## ${release.name || release.tag_name}

Published on ${publishedDate} • [View on GitHub](${release.html_url})

${body}

---

*This page is automatically updated with the latest release information from the [Foundry GitHub repository](https://github.com/foundry-rs/foundry/releases).*
`;

  return mdxContent;
}

async function main() {
  try {
    console.log('Fetching latest Foundry release...');
    
    const release = await fetchLatestRelease();
    
    if (!release) {
      console.log('No release found to process');
      return;
    }

    console.log(`Found release: ${release.tag_name} - ${release.name}`);
    
    // Format the release for MDX
    const mdxContent = formatReleaseForMDX(release);
    
    // Ensure the directory exists
    mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
    
    // Write the MDX file
    writeFileSync(OUTPUT_PATH, mdxContent);
    
    console.log(`✅ Successfully wrote release notes to ${OUTPUT_PATH}`);
  } catch (error) {
    console.error('Failed to fetch and process release:', error);
    process.exit(1);
  }
}

// Run the script
main();