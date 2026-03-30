import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Manifiesto — Grupo Digitalo',
  description: 'Capitalización de inteligencia. El texto fundacional de Grupo Digitalo.',
  openGraph: {
    title: 'Manifiesto — Grupo Digitalo',
    description: 'Capitalización de inteligencia. El texto fundacional de Grupo Digitalo.',
    url: 'https://grupodigitalo.com/manifiesto',
  },
}

export default function ManifiestoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
