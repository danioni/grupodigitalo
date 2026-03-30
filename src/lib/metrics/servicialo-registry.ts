// Telemetry from servicialo-registry Supabase project
// Requires REGISTRY_SUPABASE_URL + REGISTRY_SUPABASE_ANON_KEY env vars
// RLS policy on telemetry_pings allows public SELECT

import { createClient } from '@supabase/supabase-js'

export interface TelemetryVersionBreakdown {
  version: string
  count: number
}

export interface TelemetryCountryBreakdown {
  country_code: string
  country_name: string
  count: number
}

export interface TelemetryDailyCount {
  day: string
  count: number
}

export interface TelemetryMetrics {
  totalPings: number
  pings24h: number
  pings7d: number
  uniqueNodes24h: number
  versions: TelemetryVersionBreakdown[]
  countries: TelemetryCountryBreakdown[]
  dailyCounts: TelemetryDailyCount[]
  available: boolean
  error: string | null
}

interface PingRow {
  id: number
  event: string
  version: string
  node_id: string | null
  ts: number
  created_at: string
  country_code: string | null
  country_name: string | null
}

function getClient() {
  const url = process.env.REGISTRY_SUPABASE_URL
  const key = process.env.REGISTRY_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

export async function fetchTelemetryMetrics(): Promise<TelemetryMetrics> {
  const empty: TelemetryMetrics = {
    totalPings: 0,
    pings24h: 0,
    pings7d: 0,
    uniqueNodes24h: 0,
    versions: [],
    countries: [],
    dailyCounts: [],
    available: false,
    error: null,
  }

  const supabase = getClient()
  if (!supabase) {
    return { ...empty, error: 'REGISTRY_SUPABASE_URL o REGISTRY_SUPABASE_ANON_KEY no configurados' }
  }

  try {
    const now = new Date()
    const ago24h = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString()
    const ago7d = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()
    const ago30d = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString()

    // Fetch all pings (table is small, expected < 10k rows initially)
    const { data, error } = await supabase
      .from('telemetry_instances')
      .select('id, event, version, node_id, ts, created_at, country_code, country_name')
      .order('created_at', { ascending: false })
      .limit(10000)

    const rows = data as PingRow[] | null

    if (error) {
      return { ...empty, error: `Supabase: ${error.message}` }
    }

    if (!rows || rows.length === 0) {
      return { ...empty, available: true }
    }

    const totalPings = rows.length
    const recent24h = rows.filter(r => r.created_at >= ago24h)
    const recent7d = rows.filter(r => r.created_at >= ago7d)
    const recent30d = rows.filter(r => r.created_at >= ago30d)

    const pings24h = recent24h.length
    const pings7d = recent7d.length

    const uniqueNodes24h = new Set(recent24h.map(r => r.node_id).filter(Boolean)).size

    // Version breakdown
    const versionMap = new Map<string, number>()
    for (const r of rows) {
      if (r.version) {
        versionMap.set(r.version, (versionMap.get(r.version) ?? 0) + 1)
      }
    }
    const versions = [...versionMap.entries()]
      .map(([version, count]) => ({ version, count }))
      .sort((a, b) => b.count - a.count)

    // Country breakdown
    const countryMap = new Map<string, { country_name: string; count: number }>()
    for (const r of rows) {
      if (r.country_code) {
        const existing = countryMap.get(r.country_code)
        if (existing) {
          existing.count++
        } else {
          countryMap.set(r.country_code, {
            country_name: r.country_name ?? r.country_code,
            count: 1,
          })
        }
      }
    }
    const countries = [...countryMap.entries()]
      .map(([country_code, v]) => ({ country_code, ...v }))
      .sort((a, b) => b.count - a.count)

    // Daily counts (last 30 days)
    const dayMap = new Map<string, number>()
    for (const r of recent30d) {
      const day = r.created_at.slice(0, 10)
      dayMap.set(day, (dayMap.get(day) ?? 0) + 1)
    }
    const dailyCounts = [...dayMap.entries()]
      .map(([day, count]) => ({ day, count }))
      .sort((a, b) => a.day.localeCompare(b.day))

    return {
      totalPings,
      pings24h,
      pings7d,
      uniqueNodes24h,
      versions,
      countries,
      dailyCounts,
      available: true,
      error: null,
    }
  } catch (e) {
    return { ...empty, error: `Error: ${e}` }
  }
}
