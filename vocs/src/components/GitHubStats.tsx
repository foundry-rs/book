'use client'

import { useEffect, useState } from 'react'

interface Stats {
  stars: number
  contributors: number
  latestRelease: string
}

export function GitHubStats() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    async function fetchStats() {
      try {
        const [repoRes, contributorsRes, releasesRes] = await Promise.all([
          fetch('https://api.github.com/repos/foundry-rs/foundry'),
          fetch('https://api.github.com/repos/foundry-rs/foundry/contributors?per_page=1'),
          fetch('https://api.github.com/repos/foundry-rs/foundry/releases?per_page=20'),
        ])

        const repo = await repoRes.json()
        const releases = await releasesRes.json()
        const latestStable = releases.find((r: { prerelease: boolean }) => !r.prerelease)

        // Get contributor count from Link header
        const linkHeader = contributorsRes.headers.get('Link')
        let contributorCount = 1
        if (linkHeader) {
          const match = linkHeader.match(/page=(\d+)>; rel="last"/)
          if (match) contributorCount = parseInt(match[1], 10)
        }

        setStats({
          stars: repo.stargazers_count,
          contributors: contributorCount,
          latestRelease: latestStable?.tag_name || 'N/A',
        })
      } catch (e) {
        console.error('Failed to fetch GitHub stats:', e)
      }
    }

    fetchStats()
  }, [])

  if (!stats) {
    return (
      <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', margin: '1.5rem 0', flexWrap: 'wrap' }}>
        <StatCard label="Stars" value="..." />
        <StatCard label="Contributors" value="..." />
        <StatCard label="Latest Release" value="..." />
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', margin: '1.5rem 0', flexWrap: 'wrap' }}>
      <StatCard
        label="Stars"
        value={stats.stars.toLocaleString()}
        href="https://github.com/foundry-rs/foundry/stargazers"
      />
      <StatCard
        label="Contributors"
        value={stats.contributors.toLocaleString()}
        href="https://github.com/foundry-rs/foundry/graphs/contributors"
      />
      <StatCard
        label="Latest Release"
        value={stats.latestRelease}
        href={`https://github.com/foundry-rs/foundry/releases/tag/${stats.latestRelease}`}
      />
    </div>
  )
}

function StatCard({ label, value, href }: { label: string; value: string; href?: string }) {
  const content = (
    <div style={{
      textAlign: 'center',
      padding: '1rem 1.5rem',
      borderRadius: '8px',
      background: 'var(--vocs-color_background2)',
      minWidth: '120px',
    }}>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--vocs-color_text)' }}>
        {value}
      </div>
      <div style={{ fontSize: '0.875rem', color: 'var(--vocs-color_text3)', marginTop: '0.25rem' }}>
        {label}
      </div>
    </div>
  )

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
        {content}
      </a>
    )
  }

  return content
}
