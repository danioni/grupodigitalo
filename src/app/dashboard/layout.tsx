import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard — Grupo Digitalo',
  robots: 'noindex, nofollow',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      background: '#09090b',
      color: '#fafafa',
      minHeight: '100vh',
    }}>
      <header style={{
        borderBottom: '1px solid #27272a',
        padding: '1rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '1.125rem', fontWeight: 600 }}>Digitalo</span>
          <span style={{ color: '#71717a', fontSize: '0.875rem' }}>Dashboard</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <a href="/manifiesto" style={{ color: '#a1a1aa', fontSize: '0.75rem', textDecoration: 'none' }}>
            Manifiesto
          </a>
          <a href="/" style={{ color: '#71717a', fontSize: '0.75rem', textDecoration: 'none' }}>
            ← Volver al sitio
          </a>
        </div>
      </header>
      <main style={{ padding: '1rem 1rem', maxWidth: '1400px', margin: '0 auto' }}>
        {children}
      </main>
    </div>
  )
}
