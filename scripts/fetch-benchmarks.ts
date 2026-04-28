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

function formatSeconds(seconds: number): string {
  if (seconds >= 60) {
    const m = Math.floor(seconds / 60);
    const s = seconds - m * 60;
    return `${m}m ${s.toFixed(1)}s`;
  }
  if (seconds >= 10) return `${seconds.toFixed(1)}s`;
  if (seconds >= 1) return `${seconds.toFixed(2)}s`;
  return `${seconds.toFixed(3)}s`;
}

interface CategoryAggregate {
  label: string;
  key: keyof Omit<BenchmarkData, 'repository'>;
  oldSumSec: number;
  newSumSec: number;
  repoCount: number;
  absDelta: number; // positive => improvement (old - new)
  pctDelta: number; // positive => improvement
}

function aggregateCategory(
  data: Map<string, BenchmarkData>,
  key: keyof Omit<BenchmarkData, 'repository'>,
  label: string
): CategoryAggregate | null {
  let oldSum = 0;
  let newSum = 0;
  let count = 0;

  for (const [, benchData] of data) {
    const bench = benchData[key];
    if (!bench || bench.old === '–' || bench.old === '-' || bench.new === '–' || bench.new === '-') continue;

    const oldSec = parseTimeToSeconds(bench.old);
    const newSec = parseTimeToSeconds(bench.new);
    if (oldSec === null || newSec === null) continue;

    oldSum += oldSec;
    newSum += newSec;
    count += 1;
  }

  if (count === 0 || oldSum === 0) return null;

  const absDelta = oldSum - newSum;
  const pctDelta = (absDelta / oldSum) * 100;

  return {
    label,
    key,
    oldSumSec: oldSum,
    newSumSec: newSum,
    repoCount: count,
    absDelta,
    pctDelta,
  };
}

function generateBenchmarkBarGraph(data: Map<string, BenchmarkData>): string {
  const categories: { key: keyof Omit<BenchmarkData, 'repository'>; label: string }[] = [
    { key: 'forgeTest', label: 'Forge Test' },
    { key: 'forgeFuzzTest', label: 'Forge Fuzz Test' },
    { key: 'forgeTestIsolated', label: 'Forge Test (Isolated)' },
    { key: 'forgeBuildNoCache', label: 'Forge Build (No Cache)' },
    { key: 'forgeBuildWithCache', label: 'Forge Build (With Cache)' },
    { key: 'forgeCoverage', label: 'Forge Coverage' },
  ];

  const aggregates: CategoryAggregate[] = [];
  for (const { key, label } of categories) {
    const a = aggregateCategory(data, key, label);
    if (a) aggregates.push(a);
  }
  if (aggregates.length === 0) return '';

  // Scale so that the longest bar (baseline or latest, across all categories)
  // fills 100% of the available width. All baseline bars share the same width.
  // baselineWidth = 100 / max(1, maxLatestRatio)
  // latestWidth_i = ratio_i * baselineWidth
  const maxRatio = Math.max(
    1,
    ...aggregates.map(a => a.newSumSec / a.oldSumSec),
  );
  const BASELINE_WIDTH_PCT = 100 / maxRatio;

  let mdx = '';
  mdx += `<div style={{ marginBottom: '2rem' }}>\n`;
  mdx += `  <style>{\`@keyframes bench-bar-grow{from{width:var(--bench-bar-from)}to{width:var(--bench-bar-to)}}\`}</style>\n`;
  mdx += `  <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.25rem' }}>Highlights</h2>\n`;
  mdx += `  <p style={{ fontSize: '0.875rem', color: 'var(--vocs-color_text3)', marginBottom: '1rem' }}>Aggregated change per benchmark category (sum of wallclock time across all repositories).</p>\n`;
  mdx += `  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '1rem', background: 'rgba(255,255,255,0.02)' }}>\n`;

  for (const a of aggregates) {
    // Treat changes within ±2% as neutral noise.
    const NEUTRAL_PCT_THRESHOLD = 2;
    const isNeutral = Math.abs(a.pctDelta) < NEUTRAL_PCT_THRESHOLD;
    const improved = !isNeutral && a.absDelta > 0;
    const regressed = !isNeutral && a.absDelta < 0;
    const accentColor = improved ? '#22c55e' : regressed ? '#ef4444' : 'var(--vocs-color_text3)';
    const newBg = improved ? 'rgba(34, 197, 94, 0.85)' : regressed ? 'rgba(239, 68, 68, 0.85)' : 'rgba(148, 163, 184, 0.6)';
    const baselineBg = 'rgba(148, 163, 184, 0.25)';

    const ratio = a.newSumSec / a.oldSumSec;
    const newWidthPct = Math.min(ratio * BASELINE_WIDTH_PCT, 100);

    const arrow = a.absDelta > 0 ? '↓' : a.absDelta < 0 ? '↑' : '';
    const pctDisplay = `${arrow}${Math.abs(a.pctDelta).toFixed(1)}%`;

    mdx += `    <div>\n`;
    mdx += `      <div style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.375rem' }}>${a.label} <span style={{ color: 'var(--vocs-color_text3)', fontWeight: 400 }}>· ${a.repoCount} ${a.repoCount === 1 ? 'repo' : 'repos'}</span></div>\n`;
    mdx += `      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>\n`;
    mdx += `        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem', minWidth: 0 }}>\n`;
    // Baseline bar (uniform width across categories)
    mdx += `          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>\n`;
    mdx += `            <div style={{ flex: 1, height: '0.75rem', borderRadius: '4px', overflow: 'hidden' }}>\n`;
    mdx += `              <div style={{ width: '${BASELINE_WIDTH_PCT.toFixed(2)}%', height: '100%', background: '${baselineBg}', borderRadius: '4px' }} />\n`;
    mdx += `            </div>\n`;
    mdx += `          </div>\n`;
    // Latest bar (proportional to baseline)
    mdx += `          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>\n`;
    mdx += `            <div style={{ flex: 1, height: '0.75rem', borderRadius: '4px', overflow: 'hidden' }}>\n`;
    mdx += `              <div style={{ ['--bench-bar-from']: '${BASELINE_WIDTH_PCT.toFixed(2)}%', ['--bench-bar-to']: '${newWidthPct.toFixed(2)}%', width: 'var(--bench-bar-to)', height: '100%', background: '${newBg}', borderRadius: '4px', animation: 'bench-bar-grow 800ms ease-out' }} />\n`;
    mdx += `            </div>\n`;
    mdx += `          </div>\n`;
    mdx += `        </div>\n`;
    mdx += `        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '${accentColor}', background: '${improved ? 'rgba(34,197,94,0.15)' : regressed ? 'rgba(239,68,68,0.15)' : 'rgba(148,163,184,0.18)'}', padding: '0.125rem 0.5rem', borderRadius: '9999px', fontVariantNumeric: 'tabular-nums', flexShrink: 0 }}>${pctDisplay}</span>\n`;
    mdx += `      </div>\n`;
    mdx += `    </div>\n`;
  }

  mdx += `  </div>\n`;
  mdx += `</div>\n`;
  return mdx;
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
    output += generateBenchmarkBarGraph(benchmarkData);
    output += `\n`;
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
