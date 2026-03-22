import type { McpUsageMetrics } from '@/lib/metrics/coordinalo-db'
import * as s from './styles'

export function RecentActivityPanel({ data }: { data: McpUsageMetrics }) {
  if (!data.available || data.recentRequests.length === 0) {
    return (
      <div style={s.card}>
        <div style={s.cardTitle}>Actividad Reciente</div>
        <div style={{ color: '#71717a', fontSize: '0.875rem' }}>
          {data.error ?? 'Sin actividad reciente registrada'}
        </div>
      </div>
    )
  }

  return (
    <div style={s.card}>
      <div style={s.cardTitle}>Actividad Reciente — Últimos 20 requests MCP</div>

      <div style={{ overflowX: 'auto' }}>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Timestamp</th>
              <th style={s.th}>Org</th>
              <th style={s.th}>Tool</th>
              <th style={s.th}>Status</th>
              <th style={s.th}>Latencia</th>
            </tr>
          </thead>
          <tbody>
            {data.recentRequests.map(req => {
              const isError = req.statusCode >= 400
              return (
                <tr key={req.id}>
                  <td style={{ ...s.td, ...s.mono, color: '#a1a1aa', fontSize: '0.75rem' }}>
                    {new Date(req.timestamp).toLocaleString('es-CL', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    })}
                  </td>
                  <td style={{ ...s.td, ...s.mono }}>{req.orgSlug ?? '—'}</td>
                  <td style={{ ...s.td, ...s.mono }}>{req.tool}</td>
                  <td style={s.td}>
                    <span style={s.badge(!isError)}>{req.statusCode}</span>
                  </td>
                  <td style={{ ...s.td, color: '#71717a' }}>
                    {req.durationMs != null ? `${req.durationMs}ms` : '—'}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
