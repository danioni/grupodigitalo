const PACKAGE = '@servicialo/mcp-server'
const BASE = 'https://api.npmjs.org'
const REGISTRY = 'https://registry.npmjs.org'

export interface NpmDownloads {
  period: string
  total: number
  daily: { day: string; downloads: number }[]
}

export interface NpmPackageInfo {
  version: string
  date: string
}

export interface NpmMetrics {
  lastDay: NpmDownloads
  lastWeek: NpmDownloads
  lastMonth: NpmDownloads
  last90Days: NpmDownloads
  packageInfo: NpmPackageInfo
  weekDelta: number | null // % change week over week
}

async function fetchDownloads(period: string): Promise<NpmDownloads> {
  const res = await fetch(`${BASE}/downloads/range/${period}/${PACKAGE}`, {
    next: { revalidate: 0 },
  })
  if (!res.ok) {
    return { period, total: 0, daily: [] }
  }
  const data = await res.json()
  return {
    period,
    total: data.downloads?.reduce((sum: number, d: { downloads: number }) => sum + d.downloads, 0) ?? 0,
    daily: data.downloads?.map((d: { day: string; downloads: number }) => ({
      day: d.day,
      downloads: d.downloads,
    })) ?? [],
  }
}

async function fetchPackageInfo(): Promise<NpmPackageInfo> {
  const res = await fetch(`${REGISTRY}/${PACKAGE}`, { next: { revalidate: 0 } })
  if (!res.ok) {
    return { version: 'desconocida', date: '' }
  }
  const data = await res.json()
  const latest = data['dist-tags']?.latest ?? 'desconocida'
  const date = data.time?.[latest] ?? ''
  return { version: latest, date }
}

function calcWeekDelta(last90: NpmDownloads): number | null {
  const daily = last90.daily
  if (daily.length < 14) return null
  const thisWeek = daily.slice(-7).reduce((s, d) => s + d.downloads, 0)
  const prevWeek = daily.slice(-14, -7).reduce((s, d) => s + d.downloads, 0)
  if (prevWeek === 0) return null
  return Math.round(((thisWeek - prevWeek) / prevWeek) * 100)
}

export async function fetchNpmMetrics(): Promise<NpmMetrics> {
  // Build 90-day range
  const now = new Date()
  const past = new Date(now)
  past.setDate(past.getDate() - 90)
  const rangePeriod = `${past.toISOString().slice(0, 10)}:${now.toISOString().slice(0, 10)}`

  const [lastDay, lastWeek, lastMonth, last90Days, packageInfo] = await Promise.all([
    fetchDownloads('last-day'),
    fetchDownloads('last-week'),
    fetchDownloads('last-month'),
    fetchDownloads(rangePeriod),
    fetchPackageInfo(),
  ])

  return {
    lastDay,
    lastWeek,
    lastMonth,
    last90Days,
    packageInfo,
    weekDelta: calcWeekDelta(last90Days),
  }
}
