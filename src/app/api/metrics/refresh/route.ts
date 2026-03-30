import { NextRequest, NextResponse } from 'next/server'
import { fetchNpmMetrics } from '@/lib/metrics/npm'
import { fetchGitHubMetrics } from '@/lib/metrics/github'
import { fetchMcpUsageMetrics, fetchMamaProMetrics } from '@/lib/metrics/coordinalo-db'
import { fetchTelemetryMetrics } from '@/lib/metrics/servicialo-registry'
import { fetchUptimeMetrics } from '@/lib/metrics/uptime'
import { fetchRegistryMetrics } from '@/lib/metrics/registry'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  // Validate METRICS_SECRET
  const secret = process.env.METRICS_SECRET
  if (secret) {
    const auth = request.headers.get('authorization')
    const param = request.nextUrl.searchParams.get('secret')
    if (auth !== `Bearer ${secret}` && param !== secret) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }
  }

  const startTime = Date.now()

  const [npm, github, mcpUsage, mamaPro, uptime, registry, telemetry] = await Promise.all([
    fetchNpmMetrics().catch(e => ({ error: String(e) })),
    fetchGitHubMetrics().catch(e => ({ repos: [], error: String(e) })),
    fetchMcpUsageMetrics().catch(e => ({ available: false, error: String(e) })),
    fetchMamaProMetrics().catch(e => ({ available: false, error: String(e) })),
    fetchUptimeMetrics().catch(e => ({ checks: [], error: String(e) })),
    fetchRegistryMetrics().catch(e => ({ available: false, error: String(e) })),
    fetchTelemetryMetrics().catch(e => ({ available: false, error: String(e) })),
  ])

  const result = {
    npm,
    github,
    mcpUsage,
    mamaPro,
    uptime,
    registry,
    telemetry,
    refreshedAt: new Date().toISOString(),
    durationMs: Date.now() - startTime,
  }

  return NextResponse.json(result)
}
