const GITHUB_API = 'https://api.github.com'

export interface RepoStats {
  name: string
  stars: number
  forks: number
  watchers: number
  openIssues: number
  openPRs: number
}

export interface TrafficViews {
  count: number
  uniques: number
  daily: { timestamp: string; count: number; uniques: number }[]
}

export interface TrafficClones {
  count: number
  uniques: number
}

export interface Referrer {
  referrer: string
  count: number
  uniques: number
}

export interface RepoMetrics {
  stats: RepoStats
  views: TrafficViews
  clones: TrafficClones
  referrers: Referrer[]
}

export interface GitHubMetrics {
  repos: RepoMetrics[]
  error: string | null
}

async function ghFetch(path: string, token: string) {
  const res = await fetch(`${GITHUB_API}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.v3+json',
    },
    next: { revalidate: 0 },
  })
  if (!res.ok) return null
  return res.json()
}

async function fetchRepoMetrics(owner: string, repo: string, token: string): Promise<RepoMetrics> {
  const [repoData, views, clones, referrers] = await Promise.all([
    ghFetch(`/repos/${owner}/${repo}`, token),
    ghFetch(`/repos/${owner}/${repo}/traffic/views`, token),
    ghFetch(`/repos/${owner}/${repo}/traffic/clones`, token),
    ghFetch(`/repos/${owner}/${repo}/traffic/popular/referrers`, token),
  ])

  return {
    stats: {
      name: repo,
      stars: repoData?.stargazers_count ?? 0,
      forks: repoData?.forks_count ?? 0,
      watchers: repoData?.subscribers_count ?? 0,
      openIssues: repoData?.open_issues_count ?? 0,
      openPRs: 0, // would need separate API call
    },
    views: {
      count: views?.count ?? 0,
      uniques: views?.uniques ?? 0,
      daily: views?.views ?? [],
    },
    clones: {
      count: clones?.count ?? 0,
      uniques: clones?.uniques ?? 0,
    },
    referrers: referrers ?? [],
  }
}

export async function fetchGitHubMetrics(): Promise<GitHubMetrics> {
  const token = process.env.GITHUB_TOKEN
  const owner = process.env.GITHUB_OWNER

  if (!token || !owner) {
    return { repos: [], error: 'GITHUB_TOKEN o GITHUB_OWNER no configurados' }
  }

  const repoNames = ['servicialo', 'coordinalo']

  try {
    const repos = await Promise.all(
      repoNames.map(repo => fetchRepoMetrics(owner, repo, token))
    )
    return { repos, error: null }
  } catch (e) {
    return { repos: [], error: `Error al consultar GitHub: ${e}` }
  }
}
