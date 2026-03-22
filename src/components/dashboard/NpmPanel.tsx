'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import type { NpmMetrics } from '@/lib/metrics/npm'
import * as s from './styles'

function formatDate(iso: string) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('es-CL', { year: 'numeric', month: 'short', day: 'numeric' })
}

export function NpmPanel({ data }: { data: NpmMetrics }) {
  const chartData = data.last90Days.daily.map(d => ({
    day: d.day.slice(5), // MM-DD
    downloads: d.downloads,
  }))

  const lifetimeTotal = data.last90Days.total // Best approximation without lifetime API

  return (
    <div style={s.card}>
      <div style={s.cardTitle}>Servicialo MCP Server — npm</div>

      <div style={s.statGroup}>
        <div>
          <div style={s.statValue}>{data.lastMonth.total.toLocaleString('es-CL')}</div>
          <div style={s.statLabel}>descargas este mes</div>
        </div>
        <div>
          <div style={s.statValue}>{data.lastWeek.total.toLocaleString('es-CL')}</div>
          <div style={s.statLabel}>esta semana</div>
          {data.weekDelta !== null && (
            <div style={s.delta(data.weekDelta)}>
              {data.weekDelta > 0 ? '↑' : data.weekDelta < 0 ? '↓' : '='} {Math.abs(data.weekDelta)}% vs semana anterior
            </div>
          )}
        </div>
        <div>
          <div style={s.statValue}>{data.lastDay.total.toLocaleString('es-CL')}</div>
          <div style={s.statLabel}>hoy</div>
        </div>
      </div>

      <div style={{ marginTop: '1rem', display: 'flex', gap: '1.5rem', fontSize: '0.8125rem', color: '#a1a1aa' }}>
        <span>v{data.packageInfo.version}</span>
        <span>publicado {formatDate(data.packageInfo.date)}</span>
      </div>

      <div style={{ marginTop: '1.25rem', height: 180 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
            <XAxis
              dataKey="day"
              tick={{ fontSize: 10, fill: '#71717a' }}
              tickLine={false}
              axisLine={{ stroke: '#27272a' }}
              interval={13}
            />
            <YAxis
              tick={{ fontSize: 10, fill: '#71717a' }}
              tickLine={false}
              axisLine={false}
              width={35}
            />
            <Tooltip
              contentStyle={{ background: '#27272a', border: 'none', borderRadius: 6, fontSize: 12, color: '#fafafa' }}
              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
            />
            <Bar dataKey="downloads" fill="#3b82f6" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
