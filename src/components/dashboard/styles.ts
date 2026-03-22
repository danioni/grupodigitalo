import { CSSProperties } from 'react'

export const card: CSSProperties = {
  background: '#18181b',
  border: '1px solid #27272a',
  borderRadius: '0.75rem',
  padding: '1.25rem',
}

export const cardTitle: CSSProperties = {
  fontSize: '0.8125rem',
  fontWeight: 500,
  color: '#a1a1aa',
  marginBottom: '1rem',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
}

export const statValue: CSSProperties = {
  fontSize: '2rem',
  fontWeight: 700,
  lineHeight: 1.2,
}

export const statLabel: CSSProperties = {
  fontSize: '0.8125rem',
  color: '#71717a',
  marginTop: '0.25rem',
}

export const statGroup: CSSProperties = {
  display: 'flex',
  gap: '2rem',
  flexWrap: 'wrap' as const,
}

export const delta = (value: number | null): CSSProperties => ({
  fontSize: '0.8125rem',
  fontWeight: 600,
  color: value === null ? '#71717a' : value >= 0 ? '#22c55e' : '#ef4444',
})

export const badge = (ok: boolean): CSSProperties => ({
  display: 'inline-block',
  padding: '0.125rem 0.5rem',
  borderRadius: '9999px',
  fontSize: '0.75rem',
  fontWeight: 600,
  background: ok ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
  color: ok ? '#22c55e' : '#ef4444',
})

export const table: CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse' as const,
  fontSize: '0.8125rem',
}

export const th: CSSProperties = {
  textAlign: 'left' as const,
  padding: '0.5rem 0.75rem',
  borderBottom: '1px solid #27272a',
  color: '#71717a',
  fontWeight: 500,
  fontSize: '0.75rem',
}

export const td: CSSProperties = {
  padding: '0.5rem 0.75rem',
  borderBottom: '1px solid #1e1e21',
}

export const mono: CSSProperties = {
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
  fontSize: '0.8125rem',
}

export const grid2: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '1rem',
}

export const sectionTitle: CSSProperties = {
  fontSize: '1rem',
  fontWeight: 600,
  marginBottom: '0.75rem',
  marginTop: '1.5rem',
}

export const errorBox: CSSProperties = {
  background: 'rgba(239,68,68,0.1)',
  border: '1px solid rgba(239,68,68,0.2)',
  borderRadius: '0.5rem',
  padding: '0.75rem 1rem',
  color: '#fca5a5',
  fontSize: '0.8125rem',
}
