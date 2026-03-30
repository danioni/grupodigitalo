import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Grupo Digitalo',
  icons: { icon: '/favicon.svg' },
}

const themeScript = `
(function(){
  var t = localStorage.getItem('theme');
  if (t) { document.documentElement.setAttribute('data-theme', t); }
  else if (!window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();
`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
