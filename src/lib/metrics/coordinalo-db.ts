// Queries against Coordinalo's database for MCP usage metrics
// Requires DATABASE_URL_COORDINALO env var

export interface McpToolBreakdown {
  tool: string
  count: number
}

export interface McpOrgActivity {
  orgSlug: string
  lastActivity: string
  requestCount: number
}

export interface McpRequest {
  id: string
  orgSlug: string | null
  tool: string
  statusCode: number
  durationMs: number | null
  timestamp: string
}

export interface McpUsageMetrics {
  totalRequests7d: number
  totalRequests30d: number
  toolBreakdown: McpToolBreakdown[]
  activeOrgs: McpOrgActivity[]
  errorRate24h: number
  errorRate7d: number
  latencyP50: number | null
  latencyP95: number | null
  recentRequests: McpRequest[]
  available: boolean
  error: string | null
}

export interface MamaProMetrics {
  bookingsThisMonth: number
  upcomingSessions: number
  available: boolean
}

// Use require() hidden from the bundler to avoid pg being included in Edge Runtime
async function getPool() {
  const dbUrl = process.env.DATABASE_URL_COORDINALO
  if (!dbUrl) return null

  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const pg = require(/* webpackIgnore: true */ 'pg')
    return new pg.Pool({
      connectionString: dbUrl,
      ssl: { rejectUnauthorized: false },
      max: 3,
      idleTimeoutMillis: 10000,
    })
  } catch {
    return null
  }
}

export async function fetchMcpUsageMetrics(): Promise<McpUsageMetrics> {
  const empty: McpUsageMetrics = {
    totalRequests7d: 0,
    totalRequests30d: 0,
    toolBreakdown: [],
    activeOrgs: [],
    errorRate24h: 0,
    errorRate7d: 0,
    latencyP50: null,
    latencyP95: null,
    recentRequests: [],
    available: false,
    error: null,
  }

  const pool = await getPool()
  if (!pool) {
    return { ...empty, error: 'DATABASE_URL_COORDINALO no configurado' }
  }

  try {
    // Check if McpRequest table exists
    const tableCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_name = 'McpRequest'
      ) AS exists
    `)
    if (!tableCheck.rows[0]?.exists) {
      await pool.end()
      return { ...empty, error: 'Tabla McpRequest no existe — instrumentación pendiente' }
    }

    const [r7d, r30d, tools, orgs, err24h, err7d, latency, recent] = await Promise.all([
      pool.query(`SELECT COUNT(*)::int AS count FROM "McpRequest" WHERE timestamp > NOW() - INTERVAL '7 days'`),
      pool.query(`SELECT COUNT(*)::int AS count FROM "McpRequest" WHERE timestamp > NOW() - INTERVAL '30 days'`),
      pool.query(`SELECT tool, COUNT(*)::int AS count FROM "McpRequest" WHERE timestamp > NOW() - INTERVAL '30 days' GROUP BY tool ORDER BY count DESC`),
      pool.query(`SELECT "orgSlug", MAX(timestamp) AS "lastActivity", COUNT(*)::int AS "requestCount" FROM "McpRequest" WHERE "orgSlug" IS NOT NULL AND timestamp > NOW() - INTERVAL '30 days' GROUP BY "orgSlug" ORDER BY "lastActivity" DESC`),
      pool.query(`SELECT COUNT(*) FILTER (WHERE "statusCode" >= 400)::float / GREATEST(COUNT(*), 1) AS rate FROM "McpRequest" WHERE timestamp > NOW() - INTERVAL '1 day'`),
      pool.query(`SELECT COUNT(*) FILTER (WHERE "statusCode" >= 400)::float / GREATEST(COUNT(*), 1) AS rate FROM "McpRequest" WHERE timestamp > NOW() - INTERVAL '7 days'`),
      pool.query(`SELECT PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY "durationMs") AS p50, PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY "durationMs") AS p95 FROM "McpRequest" WHERE "durationMs" IS NOT NULL AND timestamp > NOW() - INTERVAL '7 days'`),
      pool.query(`SELECT id, "orgSlug", tool, "statusCode", "durationMs", timestamp FROM "McpRequest" ORDER BY timestamp DESC LIMIT 20`),
    ])

    await pool.end()

    return {
      totalRequests7d: r7d.rows[0]?.count ?? 0,
      totalRequests30d: r30d.rows[0]?.count ?? 0,
      toolBreakdown: tools.rows,
      activeOrgs: orgs.rows.map((r: any) => ({
        orgSlug: r.orgSlug,
        lastActivity: r.lastActivity?.toISOString?.() ?? r.lastActivity,
        requestCount: r.requestCount,
      })),
      errorRate24h: Math.round((err24h.rows[0]?.rate ?? 0) * 100),
      errorRate7d: Math.round((err7d.rows[0]?.rate ?? 0) * 100),
      latencyP50: latency.rows[0]?.p50 ?? null,
      latencyP95: latency.rows[0]?.p95 ?? null,
      recentRequests: recent.rows.map((r: any) => ({
        id: r.id,
        orgSlug: r.orgSlug,
        tool: r.tool,
        statusCode: r.statusCode,
        durationMs: r.durationMs,
        timestamp: r.timestamp?.toISOString?.() ?? r.timestamp,
      })),
      available: true,
      error: null,
    }
  } catch (e) {
    try { await pool.end() } catch {}
    return { ...empty, error: `Error DB: ${e}` }
  }
}

export async function fetchMamaProMetrics(): Promise<MamaProMetrics> {
  const pool = await getPool()
  if (!pool) {
    return { bookingsThisMonth: 0, upcomingSessions: 0, available: false }
  }

  try {
    const [bookings, upcoming] = await Promise.all([
      pool.query(`
        SELECT COUNT(*)::int AS count FROM "Booking"
        WHERE "orgSlug" = 'mamapro'
        AND "createdAt" >= DATE_TRUNC('month', NOW())
      `).catch(() => ({ rows: [{ count: 0 }] })),
      pool.query(`
        SELECT COUNT(*)::int AS count FROM "Booking"
        WHERE "orgSlug" = 'mamapro'
        AND "startTime" >= NOW()
        AND "startTime" <= NOW() + INTERVAL '7 days'
        AND status != 'cancelled'
      `).catch(() => ({ rows: [{ count: 0 }] })),
    ])

    await pool.end()
    return {
      bookingsThisMonth: bookings.rows[0]?.count ?? 0,
      upcomingSessions: upcoming.rows[0]?.count ?? 0,
      available: true,
    }
  } catch {
    try { await pool.end() } catch {}
    return { bookingsThisMonth: 0, upcomingSessions: 0, available: false }
  }
}
