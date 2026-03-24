import { fetchNpmMetrics } from '@/lib/metrics/npm'
import { fetchGitHubMetrics } from '@/lib/metrics/github'
import { fetchMcpUsageMetrics, fetchMamaProMetrics, fetchTelemetryMetrics } from '@/lib/metrics/coordinalo-db'
import { fetchUptimeMetrics } from '@/lib/metrics/uptime'
import { fetchRegistryMetrics } from '@/lib/metrics/registry'
import { NpmPanel } from '@/components/dashboard/NpmPanel'
import { GithubPanel } from '@/components/dashboard/GithubPanel'
import { McpUsagePanel } from '@/components/dashboard/McpUsagePanel'
import { EcosystemHealthPanel } from '@/components/dashboard/EcosystemHealthPanel'
import { RecentActivityPanel } from '@/components/dashboard/RecentActivityPanel'
import { RegistryPanel } from '@/components/dashboard/RegistryPanel'
import { TelemetryPanel } from '@/components/dashboard/TelemetryPanel'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const [npm, github, mcpUsage, mamaPro, uptime, registry, telemetry] = await Promise.all([
    fetchNpmMetrics(),
    fetchGitHubMetrics(),
    fetchMcpUsageMetrics(),
    fetchMamaProMetrics(),
    fetchUptimeMetrics(),
    fetchRegistryMetrics(),
    fetchTelemetryMetrics(),
  ])

  return (
    <>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: '1rem',
        flexWrap: 'wrap',
        gap: '0.5rem',
      }}>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>
          Performance del Ecosistema
        </h1>
        <span style={{ color: '#71717a', fontSize: '0.75rem' }}>
          {new Date().toLocaleString('es-CL', {
            dateStyle: 'medium',
            timeStyle: 'short',
          })}
        </span>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
        gap: '1rem',
      }}>
        <NpmPanel data={npm} />
        <EcosystemHealthPanel
          uptime={uptime}
          mamaPro={mamaPro}
          packageInfo={npm.packageInfo}
          registry={registry}
        />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
        gap: '1rem',
        marginTop: '1rem',
      }}>
        <TelemetryPanel data={telemetry} />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
        gap: '1rem',
        marginTop: '1rem',
      }}>
        <RegistryPanel data={registry} />
      </div>

      <div style={{ marginTop: '1rem' }}>
        <GithubPanel data={github} />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
        gap: '1rem',
        marginTop: '1rem',
      }}>
        <McpUsagePanel data={mcpUsage} />
        <RecentActivityPanel data={mcpUsage} />
      </div>
    </>
  )
}
