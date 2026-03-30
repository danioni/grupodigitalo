'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import type { TelemetryMetrics } from '@/lib/metrics/servicialo-registry'
import * as s from './styles'

export function TelemetryPanel({ data }: { data: TelemetryMetrics }) {
  if (!data.available) {
    return (
      <div style={s.card}>
        <div style={s.cardTitle}>Servicialo Network</div>
        <div style={s.errorBox}>{data.error ?? 'No disponible'}</div>
      </div>
    )
  }

  const chartData = data.dailyCounts.map(d => ({
    day: d.day.slice(5), // MM-DD
    pings: d.count,
  }))

  return (
    <div style={s.card}>
      <div style={s.cardTitle}>Servicialo Network</div>

      <div style={s.statGroup}>
        <div>
          <div style={s.statValue}>{data.totalPings.toLocaleString('es-CL')}</div>
          <div style={s.statLabel}>pings totales</div>
        </div>
        <div>
          <div style={s.statValue}>{data.pings24h.toLocaleString('es-CL')}</div>
          <div style={s.statLabel}>24h</div>
        </div>
        <div>
          <div style={s.statValue}>{data.pings7d.toLocaleString('es-CL')}</div>
          <div style={s.statLabel}>7 dias</div>
        </div>
        <div>
          <div style={s.statValue}>{data.uniqueNodes24h.toLocaleString('es-CL')}</div>
          <div style={s.statLabel}>nodos unicos 24h</div>
        </div>
      </div>

      {data.versions.length > 0 && (
        <div style={{ marginTop: '1.25rem' }}>
          <div style={{ fontSize: '0.8125rem', color: '#a1a1aa', marginBottom: '0.5rem', fontWeight: 500 }}>
            Versiones activas
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' as const }}>
            {data.versions.map(v => (
              <span key={v.version} style={{
                display: 'inline-block',
                padding: '0.125rem 0.625rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: 600,
                background: 'rgba(59,130,246,0.15)',
                color: '#60a5fa',
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              }}>
                v{v.version} ({v.count})
              </span>
            ))}
          </div>
        </div>
      )}

      {data.countries.length > 0 && (
        <div style={{ marginTop: '1.25rem' }}>
          <div style={{ fontSize: '0.8125rem', color: '#a1a1aa', marginBottom: '0.5rem', fontWeight: 500 }}>
            Paises
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' as const }}>
            {data.countries.map(c => (
              <span key={c.country_code} style={{
                display: 'inline-block',
                padding: '0.125rem 0.625rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: 600,
                background: 'rgba(34,197,94,0.15)',
                color: '#4ade80',
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              }}>
                {c.country_code} ({c.count})
              </span>
            ))}
          </div>
        </div>
      )}

      {chartData.length > 0 && (
        <div style={{ marginTop: '1.25rem' }}>
          <div style={{ fontSize: '0.8125rem', color: '#a1a1aa', marginBottom: '0.5rem', fontWeight: 500 }}>
            Activaciones por dia (30d)
          </div>
          <div style={{ height: 180 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 10, fill: '#71717a' }}
                  tickLine={false}
                  axisLine={{ stroke: '#27272a' }}
                  interval={Math.max(0, Math.floor(chartData.length / 7) - 1)}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: '#71717a' }}
                  tickLine={false}
                  axisLine={false}
                  width={35}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{ background: '#27272a', border: 'none', borderRadius: 6, fontSize: 12, color: '#fafafa' }}
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                />
                <Bar dataKey="pings" fill="#8b5cf6" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  )
}
