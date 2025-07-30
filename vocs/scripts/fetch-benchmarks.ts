#!/usr/bin/env bun
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const BENCHMARKS_URL = 'https://raw.githubusercontent.com/foundry-rs/foundry/master/benches/LATEST.md';
const OUTPUT_DIR = join(import.meta.dir, '../docs/pages/introduction');
const OUTPUT_FILE = join(OUTPUT_DIR, 'benches.mdx');

interface BenchmarkData {
  repository: string;
  forgeTest: { old: string; new: string };
  forgeFuzzTest: { old: string; new: string };
  forgeTestIsolated: { old: string; new: string };
  forgeBuildNoCache: { old: string; new: string };
  forgeBuildWithCache: { old: string; new: string };
  forgeCoverage: { old: string; new: string };
}

async function fetchBenchmarks(): Promise<string> {
  try {
    const response = await fetch(BENCHMARKS_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch benchmarks: ${response.status} ${response.statusText}`);
    }
    return await response.text();
  } catch (error) {
    console.error('Error fetching benchmarks:', error);
    throw error;
  }
}

function parseTimeToSeconds(timeStr: string): number | null {
  if (!timeStr || timeStr === '–' || timeStr === '-') return null;
  
  // Handle minutes and seconds format (e.g., "2m 8.3s")
  const minutesMatch = timeStr.match(/(\d+)m\s*([\d.]+)s/);
  if (minutesMatch) {
    const minutes = parseFloat(minutesMatch[1]);
    const seconds = parseFloat(minutesMatch[2]);
    return minutes * 60 + seconds;
  }
  
  // Handle seconds only format (e.g., "3.69 s")
  const secondsMatch = timeStr.match(/([\d.]+)\s*s/);
  if (secondsMatch) {
    return parseFloat(secondsMatch[1]);
  }
  
  return null;
}

function calculatePercentageChange(oldTime: number, newTime: number): string {
  const change = ((newTime - oldTime) / oldTime) * 100;
  const absChange = Math.abs(change);
  const arrow = change < 0 ? '↓' : '↑';
  return `${arrow}${absChange.toFixed(2)}%`;
}

function parseMarkdown(markdown: string): Map<string, BenchmarkData> {
  const lines = markdown.split('\n');
  const data = new Map<string, BenchmarkData>();
  const repos = new Set<string>();
  
  let currentSection = '';
  
  // First pass: collect all repository names
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Detect section headers
    if (line.startsWith('## ')) {
      currentSection = line.substring(3).trim();
      continue;
    }
    
    // Skip non-table rows
    if (!line.includes('|') || line.includes('---') || line.includes('Repository')) {
      continue;
    }
    
    // Extract repository names from table rows
    const cells = line.split('|').map(cell => cell.trim()).filter(cell => cell);
    if (cells.length >= 3) {
      const repo = cells[0];
      if (repo && !repo.includes('Repository')) {
        repos.add(repo);
      }
    }
  }
  
  // Initialize data structure for each repository
  repos.forEach(repo => {
    data.set(repo, {
      repository: repo,
      forgeTest: { old: '–', new: '–' },
      forgeFuzzTest: { old: '–', new: '–' },
      forgeTestIsolated: { old: '–', new: '–' },
      forgeBuildNoCache: { old: '–', new: '–' },
      forgeBuildWithCache: { old: '–', new: '–' },
      forgeCoverage: { old: '–', new: '–' }
    });
  });
  
  // Second pass: populate benchmark data
  currentSection = '';
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Detect section headers
    if (line.startsWith('## ')) {
      currentSection = line.substring(3).trim();
      continue;
    }
    
    // Skip non-table rows
    if (!line.includes('|') || line.includes('---') || line.includes('Repository')) {
      continue;
    }
    
    // Parse table rows
    const cells = line.split('|').map(cell => cell.trim()).filter(cell => cell);
    if (cells.length < 3) continue;
    
    const [repo, oldValue, newValue] = cells;
    const benchData = data.get(repo);
    if (!benchData) continue;
    
    // Map to the correct benchmark type
    switch (currentSection) {
      case 'Forge Test':
        benchData.forgeTest = { old: oldValue, new: newValue };
        break;
      case 'Forge Fuzz Test':
        benchData.forgeFuzzTest = { old: oldValue, new: newValue };
        break;
      case 'Forge Test (Isolated)':
        benchData.forgeTestIsolated = { old: oldValue, new: newValue };
        break;
      case 'Forge Build (No Cache)':
        benchData.forgeBuildNoCache = { old: oldValue, new: newValue };
        break;
      case 'Forge Build (With Cache)':
        benchData.forgeBuildWithCache = { old: oldValue, new: newValue };
        break;
      case 'Forge Coverage':
        benchData.forgeCoverage = { old: oldValue, new: newValue };
        break;
    }
  }
  
  return data;
}

function getRepositoryUrl(repoName: string): string {
  // Map of repository names to their GitHub URLs
  const repoMap: Record<string, string> = {
    'ithacaxyz-account': 'https://github.com/ithacaxyz/account',
    'solady': 'https://github.com/Vectorized/solady',
    'Uniswap-v4-core': 'https://github.com/Uniswap/v4-core',
    'sparkdotfi-spark-psm': 'https://github.com/sparkdotfi/spark-psm'
  };
  
  // Return the mapped URL or construct a generic GitHub search URL
  return repoMap[repoName] || `https://github.com/search?q=${encodeURIComponent(repoName)}`;
}

function generateUnifiedTable(data: Map<string, BenchmarkData>): string {
  let mdx = `<table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', marginBottom: 0 }}>
  <thead>
    <tr style={{ borderBottom: '2px solid var(--vocs-color_border)' }}>
      <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600 }}>Repository</th>
      <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600 }}>Forge Test</th>
      <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600 }}>Forge Fuzz Test</th>
      <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600 }}>Forge Test (Isolated)</th>
      <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600 }}>Forge Build (No Cache)</th>
      <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600 }}>Forge Build (With Cache)</th>
      <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600 }}>Forge Coverage</th>
    </tr>
  </thead>
  <tbody>\n`;

  // Sort repositories by name for consistent ordering
  const sortedRepos = Array.from(data.keys()).sort();
  
  sortedRepos.forEach((repo, index) => {
    const benchData = data.get(repo);
    if (!benchData) return;
    
    const repoUrl = getRepositoryUrl(repo);
    const isLastRow = index === sortedRepos.length - 1;
    
    mdx += `    <tr${isLastRow ? '' : ' style={{ borderBottom: \'1px solid var(--vocs-color_border)\' }}'}>\n`;
    mdx += `      <td style={{ padding: '0.75rem', fontWeight: 500 }}>[${benchData.repository}](${repoUrl})</td>\n`;
    mdx += `      <td style={{ padding: '0.75rem' }}>${formatBenchmark(benchData.forgeTest)}</td>\n`;
    mdx += `      <td style={{ padding: '0.75rem' }}>${formatBenchmark(benchData.forgeFuzzTest)}</td>\n`;
    mdx += `      <td style={{ padding: '0.75rem' }}>${formatBenchmark(benchData.forgeTestIsolated)}</td>\n`;
    mdx += `      <td style={{ padding: '0.75rem' }}>${formatBenchmark(benchData.forgeBuildNoCache)}</td>\n`;
    mdx += `      <td style={{ padding: '0.75rem' }}>${formatBenchmark(benchData.forgeBuildWithCache)}</td>\n`;
    mdx += `      <td style={{ padding: '0.75rem' }}>${formatBenchmark(benchData.forgeCoverage)}</td>\n`;
    mdx += '    </tr>\n';
  });

  mdx += `  </tbody>
</table>`;

  return mdx;
}

function formatBenchmark(bench: { old: string; new: string }): string {
  if (bench.new === '–' || bench.new === '-' || bench.old === '–' || bench.old === '-') return '–';
  
  const oldTime = parseTimeToSeconds(bench.old);
  const newTime = parseTimeToSeconds(bench.new);
  
  if (oldTime === null || newTime === null) {
    return bench.new;
  }
  
  const percentage = calculatePercentageChange(oldTime, newTime);
  const isImprovement = percentage.startsWith('↓');
  const color = isImprovement ? 'green' : 'red';
  
  return `${bench.old} / ${bench.new}<br/><span style={{ color: '${color}', fontSize: '0.9em' }}>${percentage}</span>`;
}

async function main() {
  try {
    console.log('Fetching benchmark data from Foundry repository...');
    const markdown = await fetchBenchmarks();
    
    console.log('Parsing benchmark data...');
    const benchmarkData = parseMarkdown(markdown);
    
    // Extract date from markdown if available
    const dateMatch = markdown.match(/# Foundry Benchmarks \[(.*?)\]/);
    const benchmarkDate = dateMatch ? dateMatch[1] : new Date().toLocaleDateString();
    
    // Extract version information
    const baselineVersionMatch = markdown.match(/forge Version: ([0-9.]+)-(v[0-9.]+)/);
    const latestVersionMatch = markdown.match(/forge Version: [0-9.]+-nightly \(([a-f0-9]+) /);
    
    const baselineVersion = baselineVersionMatch ? baselineVersionMatch[2] : 'v1.2.3';
    const latestCommit = latestVersionMatch ? latestVersionMatch[1] : 'master';
    
    console.log('Generating unified benchmark table...');
    let unifiedTable = `{/* Auto-generated benchmark table from ${benchmarkDate}. Do not edit manually. */}\n\n`;
    
    // Add version links
    unifiedTable += `  <strong>Baseline:</strong> [${baselineVersion}](https://github.com/foundry-rs/foundry/releases/tag/${baselineVersion})\n`;
    unifiedTable += `\n`;
    unifiedTable += `  <strong>Latest:</strong> [nightly-${latestCommit}](https://github.com/foundry-rs/foundry/commit/${latestCommit})\n`;
    unifiedTable += `\n`;
    unifiedTable += `  Learn more about what went into the latest release [here](/releases)\n`;
    
    unifiedTable += generateUnifiedTable(benchmarkData);
    
    // Ensure output directory exists
    mkdirSync(OUTPUT_DIR, { recursive: true });
    
    // Write the MDX file
    console.log(`Writing benchmark table to ${OUTPUT_FILE}...`);
    writeFileSync(OUTPUT_FILE, unifiedTable);
    
    console.log('✅ Successfully generated benchmark table');
  } catch (error) {
    console.error('Failed to fetch and process benchmarks:', error);
    process.exit(1);
  }
}

// Run the script
main();