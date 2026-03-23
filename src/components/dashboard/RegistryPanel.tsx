import type { RegistryMetrics } from '@/lib/metrics/registry'
import * as s from './styles'

function formatTimestamp(iso: string | null) {
  if (!iso) return '—'
  return new Date(iso).toLocaleString('es-CL', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

function timeAgo(iso: string | null) {
  if (!iso) return ''
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'hace segundos'
  if (mins < 60) return `hace ${mins}m`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `hace ${hours}h`
  const days = Math.floor(hours / 24)
  return `hace ${days}d`
}

export function RegistryPanel({ data }: { data: RegistryMetrics }) {
  return (
    <div style={s.card}>
      <div style={s.cardTitle}>Registry Servicialo</div>

      {!data.available ? (
        <div style={s.errorBox}>
          Registry no disponible: {data.error ?? 'error desconocido'}
        </div>
      ) : (
        <>
          {/* Stats principales */}
          <div style={s.statGroup}>
            <div>
              <div style={s.statValue}>{data.totalEntries}</div>
              <div style={s.statLabel}>orgs registradas</div>
            </div>
            <div>
              <div style={s.statValue}>{data.discoverableEntries}</div>
              <div style={s.statLabel}>orgs públicas</div>
            </div>
            <div>
              <div style={s.statValue}>{data.countries.length}</div>
              <div style={s.statLabel}>
                {data.countries.length === 1 ? 'país' : 'países'}
              </div>
            </div>
          </div>

          {/* Países */}
          <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' as const }}>
            {data.countries.map(c => (
              <span key={c} style={{
                ...s.mono,
                fontSize: '0.75rem',
                background: '#27272a',
                padding: '0.125rem 0.5rem',
                borderRadius: '4px',
                textTransform: 'uppercase' as const,
              }}>
                {c}
              </span>
            ))}
          </div>

          {/* Verticales */}
          <div style={{ ...s.sectionTitle, fontSize: '0.8125rem' }}>Verticales</div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' as const }}>
            {Object.entries(data.verticals).map(([v, count]) => (
              <span key={v} style={{
                fontSize: '0.75rem',
                background: 'rgba(59,130,246,0.15)',
                color: '#93c5fd',
                padding: '0.125rem 0.5rem',
                borderRadius: '4px',
              }}>
                {v} ({count})
              </span>
            ))}
          </div>

          {/* Health del Registry */}
          <div style={{ ...s.sectionTitle, fontSize: '0.8125rem' }}>Health</div>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '0.375rem', fontSize: '0.8125rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#a1a1aa' }}>Estado API</span>
              <span style={s.badge(true)}>UP</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#a1a1aa' }}>Latencia</span>
              <span style={s.mono}>{data.latencyMs}ms</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#a1a1aa' }}>Entries en DB</span>
              <span>{data.totalEntries}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#a1a1aa' }}>Heartbeat activo (&lt;24h)</span>
              <span style={{ color: '#22c55e' }}>{data.activeHeartbeats}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#a1a1aa' }}>Sin heartbeat</span>
              <span style={{ color: data.staleHeartbeats > 0 ? '#fbbf24' : '#71717a' }}>
                {data.staleHeartbeats}
              </span>
            </div>
          </div>

          {/* Último sync */}
          <div style={{ marginTop: '1rem', fontSize: '0.75rem', color: '#71717a' }}>
            Último heartbeat: {formatTimestamp(data.lastHeartbeat)}{' '}
            <span style={{ color: '#a1a1aa' }}>({timeAgo(data.lastHeartbeat)})</span>
          </div>

          {/* Implementers */}
          <div style={{ ...s.sectionTitle, fontSize: '0.8125rem' }}>Implementers</div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' as const }}>
            {data.implementers.map(impl => (
              <span key={impl} style={{
                ...s.mono,
                fontSize: '0.75rem',
                background: 'rgba(168,85,247,0.15)',
                color: '#c4b5fd',
                padding: '0.125rem 0.5rem',
                borderRadius: '4px',
              }}>
                {impl}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
