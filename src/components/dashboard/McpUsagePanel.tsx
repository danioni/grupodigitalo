import type { McpUsageMetrics } from '@/lib/metrics/coordinalo-db'
import * as s from './styles'

export function McpUsagePanel({ data }: { data: McpUsageMetrics }) {
  if (!data.available) {
    return (
      <div style={s.card}>
        <div style={s.cardTitle}>Coordinalo — Uso MCP en Producción</div>
        <div style={s.errorBox}>{data.error ?? 'Datos no disponibles'}</div>
      </div>
    )
  }

  return (
    <div style={s.card}>
      <div style={s.cardTitle}>Coordinalo — Uso MCP en Producción</div>

      <div style={s.statGroup}>
        <div>
          <div style={s.statValue}>{data.totalRequests7d.toLocaleString('es-CL')}</div>
          <div style={s.statLabel}>requests últimos 7d</div>
        </div>
        <div>
          <div style={s.statValue}>{data.totalRequests30d.toLocaleString('es-CL')}</div>
          <div style={s.statLabel}>requests últimos 30d</div>
        </div>
        <div>
          <div style={{ ...s.statValue, color: data.errorRate24h > 5 ? '#ef4444' : '#22c55e' }}>
            {data.errorRate24h}%
          </div>
          <div style={s.statLabel}>tasa de error 24h</div>
        </div>
      </div>

      {(data.latencyP50 !== null || data.latencyP95 !== null) && (
        <div style={{ ...s.statGroup, marginTop: '1rem' }}>
          {data.latencyP50 !== null && (
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>{Math.round(data.latencyP50)}ms</div>
              <div style={s.statLabel}>latencia p50</div>
            </div>
          )}
          {data.latencyP95 !== null && (
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>{Math.round(data.latencyP95)}ms</div>
              <div style={s.statLabel}>latencia p95</div>
            </div>
          )}
        </div>
      )}

      {data.toolBreakdown.length > 0 && (
        <>
          <div style={{ ...s.sectionTitle, fontSize: '0.8125rem' }}>Breakdown por tool</div>
          <table style={s.table}>
            <thead>
              <tr>
                <th style={s.th}>Tool</th>
                <th style={s.th}>Requests</th>
              </tr>
            </thead>
            <tbody>
              {data.toolBreakdown.map(t => (
                <tr key={t.tool}>
                  <td style={{ ...s.td, ...s.mono }}>{t.tool}</td>
                  <td style={s.td}>{t.count.toLocaleString('es-CL')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {data.activeOrgs.length > 0 && (
        <>
          <div style={{ ...s.sectionTitle, fontSize: '0.8125rem' }}>Organizaciones activas</div>
          <table style={s.table}>
            <thead>
              <tr>
                <th style={s.th}>Organización</th>
                <th style={s.th}>Requests</th>
                <th style={s.th}>Última actividad</th>
              </tr>
            </thead>
            <tbody>
              {data.activeOrgs.map(org => (
                <tr key={org.orgSlug}>
                  <td style={{ ...s.td, ...s.mono, fontWeight: 600 }}>{org.orgSlug}</td>
                  <td style={s.td}>{org.requestCount}</td>
                  <td style={{ ...s.td, color: '#71717a' }}>
                    {new Date(org.lastActivity).toLocaleDateString('es-CL')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  )
}
