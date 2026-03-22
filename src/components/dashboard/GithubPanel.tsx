import type { GitHubMetrics } from '@/lib/metrics/github'
import * as s from './styles'

export function GithubPanel({ data }: { data: GitHubMetrics }) {
  if (data.error) {
    return (
      <div style={s.card}>
        <div style={s.cardTitle}>GitHub — Repos</div>
        <div style={s.errorBox}>{data.error}</div>
      </div>
    )
  }

  if (data.repos.length === 0) {
    return (
      <div style={s.card}>
        <div style={s.cardTitle}>GitHub — Repos</div>
        <div style={{ color: '#71717a', fontSize: '0.875rem' }}>Sin datos de repositorios</div>
      </div>
    )
  }

  // Collect all referrers across repos
  const allReferrers = data.repos
    .flatMap(r => r.referrers.map(ref => ({ ...ref, repo: r.stats.name })))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)

  return (
    <div style={s.card}>
      <div style={s.cardTitle}>GitHub — Repos</div>

      <div style={{ overflowX: 'auto' }}>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Repo</th>
              <th style={s.th}>Stars</th>
              <th style={s.th}>Forks</th>
              <th style={s.th}>Views 14d</th>
              <th style={s.th}>Clones 14d</th>
              <th style={s.th}>Issues</th>
            </tr>
          </thead>
          <tbody>
            {data.repos.map(r => (
              <tr key={r.stats.name}>
                <td style={{ ...s.td, fontWeight: 600 }}>{r.stats.name}</td>
                <td style={s.td}>{r.stats.stars}</td>
                <td style={s.td}>{r.stats.forks}</td>
                <td style={s.td}>
                  {r.views.count} <span style={{ color: '#71717a' }}>({r.views.uniques} únicos)</span>
                </td>
                <td style={s.td}>
                  {r.clones.count} <span style={{ color: '#71717a' }}>({r.clones.uniques} únicos)</span>
                </td>
                <td style={s.td}>{r.stats.openIssues}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {allReferrers.length > 0 && (
        <>
          <div style={{ ...s.sectionTitle, marginTop: '1.25rem', fontSize: '0.8125rem' }}>Top Referrers</div>
          <table style={s.table}>
            <thead>
              <tr>
                <th style={s.th}>Origen</th>
                <th style={s.th}>Repo</th>
                <th style={s.th}>Visitas</th>
                <th style={s.th}>Únicos</th>
              </tr>
            </thead>
            <tbody>
              {allReferrers.map((ref, i) => (
                <tr key={i}>
                  <td style={{ ...s.td, ...s.mono, color: ref.referrer.includes('awesome') ? '#22c55e' : '#fafafa' }}>
                    {ref.referrer}
                  </td>
                  <td style={{ ...s.td, color: '#71717a' }}>{ref.repo}</td>
                  <td style={s.td}>{ref.count}</td>
                  <td style={s.td}>{ref.uniques}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  )
}
