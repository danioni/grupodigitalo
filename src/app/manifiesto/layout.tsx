import type { Metadata } from 'next'

const TITLE = 'La inteligencia dejó de ser escasa. La confianza, no. — Manifiesto de Grupo Digitalo'
const DESCRIPTION =
  'El texto fundacional de Grupo Digitalo, segunda versión. Por qué la inteligencia barata no resuelve la confianza, qué es una Prueba de Servicio, cómo un historial verificable puede volverse reputación portable, y qué hemos demostrado y qué nos falta demostrar.'
const URL = 'https://grupodigitalo.com/manifiesto'
const PUBLISHED = '2026-03-28'
const MODIFIED = '2026-10-12'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: 'Grupo Digitalo',
    locale: 'es_CL',
    type: 'article',
    publishedTime: PUBLISHED,
    modifiedTime: MODIFIED,
    authors: ['Grupo Digitalo'],
  },
  twitter: {
    card: 'summary',
    title: TITLE,
    description: DESCRIPTION,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'La inteligencia dejó de ser escasa. La confianza, no.',
  alternativeHeadline: 'Un manifiesto para la economía agéntica de servicios',
  description: DESCRIPTION,
  inLanguage: 'es',
  url: URL,
  mainEntityOfPage: URL,
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
  author: { '@type': 'Organization', name: 'Grupo Digitalo', url: 'https://grupodigitalo.com' },
  publisher: { '@type': 'Organization', name: 'Digitalo SpA', url: 'https://grupodigitalo.com' },
}

export default function ManifiestoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  )
}
