import type { UptimeMetrics } from '@/lib/metrics/uptime'
import type { MamaProMetrics } from '@/lib/metrics/coordinalo-db'
import type { NpmPackageInfo } from '@/lib/metrics/npm'
import * as s from './styles'

interface Props {
  uptime: UptimeMetrics
  mamaPro: MamaProMetrics
  packageInfo: NpmPackageInfo
}

export function EcosystemHealthPanel({ uptime, mamaPro, packageInfo }: Props) {
  return (
    <div style={s.card}>
      <div style={s.cardTitle}>Ecosystem Health</div>

      <div style={{ ...s.sectionTitle, fontSize: '0.8125rem', marginTop: 0 }}>Estado de servicios</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {uptime.checks.map(check => (
          <div key={check.url} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={s.badge(check.ok)}>{check.ok ? 'UP' : 'DOWN'}</span>
              <span style={{ ...s.mono, fontSize: '0.8125rem' }}>{check.url.replace('https://', '')}</span>
            </div>
            <span style={{ color: '#71717a', fontSize: '0.75rem' }}>
              {check.status ?? '—'} · {check.latencyMs}ms
            </span>
          </div>
        ))}
      </div>

      <div style={{ ...s.sectionTitle, fontSize: '0.8125rem' }}>Protocolo Servicialo</div>
      <div style={{ fontSize: '0.875rem' }}>
        Versión npm: <strong>v{packageInfo.version}</strong>
      </div>

      {mamaPro.available && (
        <>
          <div style={{ ...s.sectionTitle, fontSize: '0.8125rem' }}>Mamá Pro</div>
          <div style={s.statGroup}>
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>{mamaPro.bookingsThisMonth}</div>
              <div style={s.statLabel}>reservas este mes</div>
            </div>
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>{mamaPro.upcomingSessions}</div>
              <div style={s.statLabel}>próximas 7 días</div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
