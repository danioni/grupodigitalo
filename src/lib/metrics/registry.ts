export interface RegistryEntry {
  id: string
  country: string
  slug: string
  display_name: string
  endpoint_url: string
  implementer: string
  verticals: string[]
  locale: string
  is_verified: boolean
  last_heartbeat: string | null
  trust_score: number
  metadata: Record<string, unknown>
  created_at: string
  updated_at: string
  discoverable: boolean
}

export interface RegistryMetrics {
  available: boolean
  error?: string
  latencyMs: number
  totalEntries: number
  discoverableEntries: number
  countries: string[]
  verticals: Record<string, number>
  implementers: string[]
  lastHeartbeat: string | null
  activeHeartbeats: number
  staleHeartbeats: number
  entries: RegistryEntry[]
}

const REGISTRY_URL = 'https://servicialo.com/api/registry/search'

export async function fetchRegistryMetrics(): Promise<RegistryMetrics> {
  const start = Date.now()
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000)

    const res = await fetch(`${REGISTRY_URL}?limit=100`, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    })
    clearTimeout(timeout)

    if (!res.ok) {
      return {
        available: false,
        error: `HTTP ${res.status}`,
        latencyMs: Date.now() - start,
        totalEntries: 0,
        discoverableEntries: 0,
        countries: [],
        verticals: {},
        implementers: [],
        lastHeartbeat: null,
        activeHeartbeats: 0,
        staleHeartbeats: 0,
        entries: [],
      }
    }

    const json = (await res.json()) as { total: number; data: RegistryEntry[] }
    const entries = json.data
    const latencyMs = Date.now() - start

    const countries = [...new Set(entries.map(e => e.country))]
    const implementers = [...new Set(entries.map(e => e.implementer))]

    const verticals: Record<string, number> = {}
    for (const entry of entries) {
      for (const v of entry.verticals) {
        verticals[v] = (verticals[v] || 0) + 1
      }
    }

    const now = Date.now()
    const DAY_MS = 24 * 60 * 60 * 1000
    let lastHeartbeat: string | null = null
    let activeHeartbeats = 0
    let staleHeartbeats = 0

    for (const entry of entries) {
      if (entry.last_heartbeat) {
        if (!lastHeartbeat || entry.last_heartbeat > lastHeartbeat) {
          lastHeartbeat = entry.last_heartbeat
        }
        if (now - new Date(entry.last_heartbeat).getTime() < DAY_MS) {
          activeHeartbeats++
        } else {
          staleHeartbeats++
        }
      } else {
        staleHeartbeats++
      }
    }

    return {
      available: true,
      latencyMs,
      totalEntries: json.total,
      discoverableEntries: entries.filter(e => e.discoverable).length,
      countries,
      verticals,
      implementers,
      lastHeartbeat,
      activeHeartbeats,
      staleHeartbeats,
      entries,
    }
  } catch (err) {
    return {
      available: false,
      error: err instanceof Error ? err.message : 'Unknown error',
      latencyMs: Date.now() - start,
      totalEntries: 0,
      discoverableEntries: 0,
      countries: [],
      verticals: {},
      implementers: [],
      lastHeartbeat: null,
      activeHeartbeats: 0,
      staleHeartbeats: 0,
      entries: [],
    }
  }
}
