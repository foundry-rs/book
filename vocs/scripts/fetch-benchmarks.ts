#!/usr/bin/env bun
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const BENCHMARKS_URL = 'https://raw.githubusercontent.com/foundry-rs/foundry/master/benches/LATEST.md';
const OUTPUT_DIR = join(import.meta.dir, '../src/pages');
const OUTPUT_FILE = join(OUTPUT_DIR, 'benchmarks.mdx');

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
  
  const minutesMatch = timeStr.match(/(\d+)m\s*([\d.]+)s/);
  if (minutesMatch) {
    const minutes = parseFloat(minutesMatch[1]);
    const seconds = parseFloat(minutesMatch[2]);
    return minutes * 60 + seconds;
  }
  
  const secondsMatch = timeStr.match(/([\d.]+)\s*s/);
  if (secondsMatch) {
    return parseFloat(secondsMatch[1]);
  }
  
  return null;
}

function calculatePercentageChange(oldTime: number, newTime: number): { value: number; display: string } {
  const change = ((newTime - oldTime) / oldTime) * 100;
  const absChange = Math.abs(change);
  return { value: change, display: absChange.toFixed(1) };
}

function parseMarkdown(markdown: string): Map<string, BenchmarkData> {
  const lines = markdown.split('\n');
  const data = new Map<string, BenchmarkData>();
  const repos = new Set<string>();
  
  let currentSection = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (line.startsWith('## ')) {
      currentSection = line.substring(3).trim();
      continue;
    }
    
    if (!line.includes('|') || line.includes('---') || line.includes('Repository')) {
      continue;
    }
    
    const cells = line.split('|').map(cell => cell.trim()).filter(cell => cell);
    if (cells.length >= 3) {
      const repo = cells[0];
      if (repo && !repo.includes('Repository')) {
        repos.add(repo);
      }
    }
  }
  
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
  
  currentSection = '';
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (line.startsWith('## ')) {
      currentSection = line.substring(3).trim();
      continue;
    }
    
    if (!line.includes('|') || line.includes('---') || line.includes('Repository')) {
      continue;
    }
    
    const cells = line.split('|').map(cell => cell.trim()).filter(cell => cell);
    if (cells.length < 3) continue;
    
    const [repo, oldValue, newValue] = cells;
    const benchData = data.get(repo);
    if (!benchData) continue;
    
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
  const repoMap: Record<string, string> = {
    'ithacaxyz-account': 'https://github.com/ithacaxyz/account',
    'solady': 'https://github.com/Vectorized/solady',
    'Uniswap-v4-core': 'https://github.com/Uniswap/v4-core',
    'sparkdotfi-spark-psm': 'https://github.com/sparkdotfi/spark-psm'
  };
  
  return repoMap[repoName] || `https://github.com/search?q=${encodeURIComponent(repoName)}`;
}

function formatBenchmark(bench: { old: string; new: string }): { oldTime: string; newTime: string; change: string; color: string; bgColor: string } | null {
  if (bench.new === '–' || bench.new === '-' || bench.old === '–' || bench.old === '-') return null;
  
  const oldTime = parseTimeToSeconds(bench.old);
  const newTime = parseTimeToSeconds(bench.new);
  
  if (oldTime === null || newTime === null) {
    return { oldTime: bench.old.replace(/\s+s/g, 's'), newTime: bench.new.replace(/\s+s/g, 's'), change: '', color: 'inherit', bgColor: 'transparent' };
  }
  
  const { value, display } = calculatePercentageChange(oldTime, newTime);
  
  let color: string;
  let bgColor: string;
  let arrow: string;
  if (value < 0) {
    color = '#22c55e';
    bgColor = 'rgba(34, 197, 94, 0.15)';
    arrow = '↓';
  } else if (value > 5) {
    color = '#ef4444';
    bgColor = 'rgba(239, 68, 68, 0.15)';
    arrow = '↑';
  } else {
    color = 'var(--vocs-color_text3)';
    bgColor = 'transparent';
    arrow = value === 0 ? '' : '↑';
  }
  
  return {
    oldTime: bench.old.replace(/\s+s/g, 's'),
    newTime: bench.new.replace(/\s+s/g, 's'),
    change: arrow ? `${arrow}${display}%` : `${display}%`,
    color,
    bgColor
  };
}

function generateBenchmarkCards(data: Map<string, BenchmarkData>): string {
  const benchmarkTypes = [
    { key: 'forgeTest', label: 'Test' },
    { key: 'forgeFuzzTest', label: 'Fuzz' },
    { key: 'forgeTestIsolated', label: 'Isolated' },
    { key: 'forgeBuildNoCache', label: 'Build' },
    { key: 'forgeBuildWithCache', label: 'Cached' },
    { key: 'forgeCoverage', label: 'Coverage' },
  ] as const;

  const sortedRepos = Array.from(data.keys()).sort();
  
  let mdx = `<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>\n`;

  for (const repo of sortedRepos) {
    const benchData = data.get(repo);
    if (!benchData) continue;
    
    const repoUrl = getRepositoryUrl(repo);
    
    mdx += `  <div style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden' }}>\n`;
    mdx += `    <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}>\n`;
    mdx += `      <a href="${repoUrl}" style={{ fontWeight: 600, color: 'var(--vocs-color_text)', textDecoration: 'none' }}>${benchData.repository} <span style={{ opacity: 0.5, fontSize: '0.875em' }}>↗</span></a>\n`;
    mdx += `    </div>\n`;
    mdx += `    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)' }}>\n`;

    for (let i = 0; i < benchmarkTypes.length; i++) {
      const { key, label } = benchmarkTypes[i];
      const result = formatBenchmark(benchData[key]);
      const isLastInRow = (i + 1) % 6 === 0 || i === benchmarkTypes.length - 1;
      const borderRight = isLastInRow ? '' : 'borderRight: \'1px solid var(--vocs-color_border)\', ';
      
      mdx += `      <div style={{ ${borderRight}padding: '0.875rem 1rem', textAlign: 'center' }}>\n`;
      mdx += `        <div style={{ fontSize: '0.7rem', color: 'var(--vocs-color_text3)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>${label}</div>\n`;
      
      if (result) {
        mdx += `        <div style={{ fontSize: '1.1rem', fontWeight: 600, fontVariantNumeric: 'tabular-nums', marginBottom: '0.25rem' }}>${result.newTime}</div>\n`;
        mdx += `        <div style={{ fontSize: '0.7rem', color: 'var(--vocs-color_text4)', marginBottom: '0.375rem' }}>${result.oldTime}</div>\n`;
        if (result.change) {
          mdx += `        <div style={{ display: 'inline-block', fontSize: '0.75rem', fontWeight: 500, color: '${result.color}', background: '${result.bgColor}', padding: '0.125rem 0.5rem', borderRadius: '9999px' }}>${result.change}</div>\n`;
        }
      } else {
        mdx += `        <div style={{ fontSize: '1.1rem', color: 'var(--vocs-color_text3)' }}>–</div>\n`;
      }
      
      mdx += `      </div>\n`;
    }

    mdx += `    </div>\n`;
    mdx += `  </div>\n`;
  }

  mdx += `</div>`;
  return mdx;
}

async function main() {
  try {
    console.log('Fetching benchmark data from Foundry repository...');
    const markdown = await fetchBenchmarks();
    
    console.log('Parsing benchmark data...');
    const benchmarkData = parseMarkdown(markdown);
    
    const dateMatch = markdown.match(/# Foundry Benchmarks \[(.*?)\]/);
    const benchmarkDate = dateMatch ? dateMatch[1] : new Date().toLocaleDateString();
    
    const versionLines = markdown.match(/forge (?:Version: )?[0-9.]+-.+/g) || [];
    
    let baselineVersion = 'v1.2.3';
    let latestVersionDisplay: string;
    let latestVersionUrl: string;
    
    if (versionLines.length >= 1) {
      const baselineMatch = versionLines[0].match(/([0-9.]+)-(v[0-9.]+)/);
      if (baselineMatch) {
        baselineVersion = baselineMatch[2];
      }
    }
    
    if (versionLines.length >= 2) {
      const releaseMatch = versionLines[1].match(/([0-9.]+)-(v[0-9.]+)/);
      if (releaseMatch) {
        const latestRelease = releaseMatch[2];
        latestVersionDisplay = latestRelease;
        latestVersionUrl = `https://github.com/foundry-rs/foundry/releases/tag/${latestRelease}`;
      } else {
        const nightlyMatch = versionLines[1].match(/[0-9.]+-nightly \(([a-f0-9]+) /);
        if (nightlyMatch) {
          const latestCommit = nightlyMatch[1];
          latestVersionDisplay = `nightly-${latestCommit}`;
          latestVersionUrl = `https://github.com/foundry-rs/foundry/commit/${latestCommit}`;
        } else {
          latestVersionDisplay = 'master';
          latestVersionUrl = 'https://github.com/foundry-rs/foundry/tree/master';
        }
      }
    } else {
      latestVersionDisplay = 'master';
      latestVersionUrl = 'https://github.com/foundry-rs/foundry/tree/master';
    }
    
    console.log('Generating benchmark cards...');
    let output = `{/* Auto-generated from ${benchmarkDate}. Do not edit manually. */}\n\n`;
    output += `# Benchmarks\n\n`;
    output += `Performance comparison between Foundry releases.\n\n`;
    output += `<div style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>\n`;
    output += `  <div>\n`;
    output += `    <span style={{ fontSize: '0.75rem', color: 'var(--vocs-color_text3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Baseline</span>\n`;
    output += `    <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>[${baselineVersion}](https://github.com/foundry-rs/foundry/releases/tag/${baselineVersion})</div>\n`;
    output += `  </div>\n`;
    output += `  <div>\n`;
    output += `    <span style={{ fontSize: '0.75rem', color: 'var(--vocs-color_text3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Latest</span>\n`;
    output += `    <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>[${latestVersionDisplay}](${latestVersionUrl})</div>\n`;
    output += `  </div>\n`;
    output += `</div>\n\n`;
    output += generateBenchmarkCards(benchmarkData);
    
    mkdirSync(OUTPUT_DIR, { recursive: true });
    
    console.log(`Writing benchmark cards to ${OUTPUT_FILE}...`);
    writeFileSync(OUTPUT_FILE, output);
    
    console.log('✅ Successfully generated benchmark cards');
  } catch (error) {
    console.error('Failed to fetch and process benchmarks:', error);
    process.exit(1);
  }
}

main();
