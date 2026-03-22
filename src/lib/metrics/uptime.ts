export interface UptimeCheck {
  url: string
  status: number | null
  latencyMs: number
  ok: boolean
  checkedAt: string
}

export interface UptimeMetrics {
  checks: UptimeCheck[]
}

const ENDPOINTS = [
  'https://coordinalo.com/api/mcp',
  'https://coordinalo.com',
  'https://grupodigitalo.com',
]

async function pingEndpoint(url: string): Promise<UptimeCheck> {
  const start = Date.now()
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000)
    const res = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      redirect: 'follow',
    })
    clearTimeout(timeout)
    return {
      url,
      status: res.status,
      latencyMs: Date.now() - start,
      ok: res.status < 400,
      checkedAt: new Date().toISOString(),
    }
  } catch {
    return {
      url,
      status: null,
      latencyMs: Date.now() - start,
      ok: false,
      checkedAt: new Date().toISOString(),
    }
  }
}

export async function fetchUptimeMetrics(): Promise<UptimeMetrics> {
  const checks = await Promise.all(ENDPOINTS.map(pingEndpoint))
  return { checks }
}
