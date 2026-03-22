import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Grupo Digitalo',
  icons: { icon: '/favicon.svg' },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body style={{ margin: 0, background: '#09090b' }}>{children}</body>
    </html>
  )
}
