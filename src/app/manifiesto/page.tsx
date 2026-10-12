'use client'

import { useEffect } from 'react'

const css = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink: #1a1916;
    --ink-muted: #5f5c55;
    --ink-faint: #76736d;
    --surface: #faf9f7;
    --surface-hover: #f3f2ef;
    --surface-anchor: rgba(26,25,22,0.04);
    --nav-bg: rgba(250,249,247,0.92);
    --border: rgba(26,25,22,0.12);
    --border-strong: rgba(26,25,22,0.28);
    --max: 680px;
    --serif: 'Playfair Display', Georgia, serif;
    --sans: 'DM Sans', system-ui, sans-serif;
    --radius-sm: 8px;
    --color-bg: #faf9f7;
    --color-bg-elevated: #f3f2ef;
    --color-text: #1a1916;
    --color-text-muted: #5f5c55;
    --color-text-subtle: #76736d;
    --color-border: rgba(26,25,22,0.12);
    --color-border-light: rgba(26,25,22,0.28);
  }

  [data-theme="dark"] {
    --ink: #e8e6e1;
    --ink-muted: #a39e97;
    --ink-faint: #8a867f;
    --surface: #121210;
    --surface-hover: #1c1b18;
    --surface-anchor: rgba(255,255,255,0.04);
    --nav-bg: rgba(18,18,16,0.92);
    --border: rgba(255,255,255,0.10);
    --border-strong: rgba(255,255,255,0.24);
    --color-bg: #121210;
    --color-bg-elevated: #1c1b18;
    --color-text: #e8e6e1;
    --color-text-muted: #a39e97;
    --color-text-subtle: #8a867f;
    --color-border: rgba(255,255,255,0.10);
    --color-border-light: rgba(255,255,255,0.24);
  }

  html { font-size: 17px; -webkit-font-smoothing: antialiased; scroll-behavior: smooth; }
  body { background: var(--surface); }

  .m-progress {
    position: fixed;
    top: 0; left: 0;
    height: 2px;
    background: var(--ink);
    width: 0%;
    z-index: 200;
    transition: width 0.1s linear;
  }

  .m-main {
    max-width: var(--max);
    margin: 0 auto;
    padding: 8rem 2rem 6rem;
    font-family: var(--sans);
    font-weight: 300;
    line-height: 1.85;
    color: var(--ink);
  }

  .m-main a { color: inherit; }

  .m-link {
    color: inherit;
    text-decoration: none;
    border-bottom: 1px solid var(--border-strong);
    padding-bottom: 1px;
    transition: border-color 0.2s;
  }

  .m-link:hover { border-color: var(--ink); }

  .m-opening {
    font-family: var(--serif);
    font-size: clamp(22px, 4vw, 30px);
    font-weight: 400;
    line-height: 1.4;
    color: var(--ink);
    margin-bottom: 3.5rem;
    opacity: 0;
    animation: mFadeUp 0.7s ease 0.05s forwards;
  }

  .m-opening em { font-style: italic; }

  .m-meta-line {
    font-size: 12px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--ink-faint);
    border-left: 2px solid var(--border-strong);
    padding-left: 1rem;
    margin-bottom: 4rem;
    line-height: 1.6;
    opacity: 0;
    animation: mFadeUp 0.7s ease 0.15s forwards;
  }

  .m-header-block {
    opacity: 0;
    animation: mFadeUp 0.7s ease 0.1s forwards;
    margin-bottom: 3rem;
  }

  .m-eyebrow {
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--ink-faint);
    margin-bottom: 2rem;
  }

  .m-main h1 {
    font-family: var(--serif);
    font-size: clamp(34px, 6vw, 50px);
    font-weight: 400;
    line-height: 1.15;
    margin-bottom: 1rem;
    color: var(--ink);
  }

  .m-main h1 em { font-style: italic; }

  .m-subtitle {
    font-family: var(--serif);
    font-size: 20px;
    font-weight: 400;
    font-style: italic;
    color: var(--ink-muted);
  }

  .m-dates {
    font-size: 12px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--ink-faint);
    margin-top: 1.75rem;
    line-height: 1.9;
  }

  .m-divider {
    width: 40px;
    height: 1px;
    background: var(--border-strong);
    margin: 2.5rem 0 0;
  }

  .m-toc {
    margin: 0 0 1rem;
    padding: 1.5rem 0;
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }

  .m-toc-label {
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--ink-faint);
    margin-bottom: 0.75rem;
  }

  .m-toc ol {
    list-style: none;
    columns: 2;
    column-gap: 2rem;
  }

  .m-toc li { break-inside: avoid; }

  .m-toc a {
    display: block;
    font-size: 14px;
    color: var(--ink-muted);
    text-decoration: none;
    padding: 0.2rem 0;
    line-height: 1.5;
    transition: color 0.2s;
  }

  .m-toc a:hover { color: var(--ink); }

  .m-toc-num {
    display: inline-block;
    width: 2.4rem;
    font-family: var(--serif);
    color: var(--ink-faint);
  }

  .m-chapter {
    margin-top: 4.5rem;
    scroll-margin-top: 6rem;
  }

  .m-chapter-num {
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--ink-faint);
    margin-bottom: 0.75rem;
  }

  .m-chapter h2 {
    font-family: var(--serif);
    font-size: clamp(26px, 4vw, 34px);
    font-weight: 400;
    line-height: 1.2;
    color: var(--ink);
    margin-bottom: 1.75rem;
  }

  .m-chapter h2 em { font-style: italic; }

  .m-main p {
    font-size: 17px;
    line-height: 1.85;
    color: var(--ink);
    margin-bottom: 1.25rem;
  }

  .m-main p:last-child { margin-bottom: 0; }

  .m-punch {
    font-size: 19px;
    font-weight: 400;
    line-height: 1.5;
    color: var(--ink);
    margin-bottom: 1.5rem;
  }

  .m-blockquote {
    font-family: var(--serif);
    font-size: clamp(20px, 3.5vw, 25px);
    font-style: italic;
    font-weight: 400;
    line-height: 1.5;
    color: var(--ink);
    border-left: 2px solid var(--border-strong);
    padding-left: 1.75rem;
    margin: 3rem 0;
  }

  .m-note {
    font-size: 13px;
    font-style: italic;
    color: var(--ink-muted);
    border-left: 1px solid var(--border);
    padding-left: 1.25rem;
    margin: 2rem 0;
    line-height: 1.75;
  }

  .m-note em { font-style: normal; }

  .m-anchor {
    background: var(--surface-anchor);
    border: 1px solid var(--border-strong);
    border-radius: var(--radius-sm);
    padding: 1.5rem 1.75rem;
    margin: 2.5rem 0;
  }

  .m-anchor-label {
    font-size: 10px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--ink-faint);
    margin-bottom: 0.75rem;
  }

  .m-anchor p {
    font-size: 15px;
    color: var(--ink-muted);
    margin-bottom: 0.75rem;
    line-height: 1.75;
  }

  .m-anchor p:last-child { margin-bottom: 0; }
  .m-anchor strong { color: var(--ink); font-weight: 400; }

  /* Gradiente de certeza (Prueba de Servicio) */
  .m-levels {
    list-style: none;
    margin: 2.5rem 0 1rem;
    border-top: 1px solid var(--border-strong);
  }

  .m-level {
    display: grid;
    grid-template-columns: 3.25rem 1fr;
    gap: 1rem;
    padding: 1rem 0;
    border-bottom: 1px solid var(--border);
  }

  .m-level-id {
    font-family: var(--serif);
    font-size: 20px;
    line-height: 1.3;
    color: var(--ink-faint);
  }

  .m-level-name {
    font-size: 15px;
    font-weight: 400;
    color: var(--ink);
    margin-bottom: 0.2rem;
  }

  .m-level-desc {
    font-size: 14px;
    color: var(--ink-muted);
    line-height: 1.65;
  }

  /* Secuencia Prueba → Historial → Reputación → Decisión */
  .m-chain {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin: 2.5rem 0 1rem;
    border: 1px solid var(--border-strong);
    border-radius: var(--radius-sm);
    overflow: hidden;
  }

  .m-chain li {
    padding: 1.25rem 1rem 1.4rem;
    border-right: 1px solid var(--border);
    position: relative;
  }

  .m-chain li:last-child {
    border-right: 0;
    background: var(--surface-anchor);
  }

  .m-chain li + li::before {
    content: '→';
    position: absolute;
    left: -0.45rem;
    top: 1.15rem;
    font-size: 12px;
    color: var(--ink-faint);
    background: var(--surface);
    padding: 0 2px;
  }

  .m-chain li:last-child::before { background: var(--surface-hover); }

  .m-chain-step {
    font-size: 10px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--ink-faint);
    margin-bottom: 0.5rem;
  }

  .m-chain-name {
    font-family: var(--serif);
    font-size: 18px;
    line-height: 1.25;
    color: var(--ink);
    margin-bottom: 0.5rem;
  }

  .m-chain-desc {
    font-size: 13px;
    color: var(--ink-muted);
    line-height: 1.6;
  }

  .m-caption {
    font-size: 13px;
    font-style: italic;
    color: var(--ink-muted);
    line-height: 1.7;
    margin-bottom: 2.5rem;
  }

  /* C-level agéntico: estado real */
  .m-clevel {
    list-style: none;
    margin: 2.5rem 0;
    border-top: 1px solid var(--border-strong);
  }

  .m-clevel-item {
    display: grid;
    grid-template-columns: 7.5rem 1fr auto;
    gap: 0.5rem 1.25rem;
    align-items: baseline;
    padding: 0.95rem 0;
    border-bottom: 1px solid var(--border);
  }

  .m-clevel-role {
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--ink-faint);
    line-height: 1.5;
  }

  .m-clevel-name { font-size: 15px; color: var(--ink); margin-bottom: 0.15rem; }
  .m-clevel-desc { font-size: 13px; color: var(--ink-muted); line-height: 1.6; }

  .m-badge {
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 3px 9px;
    border: 1px solid var(--border-strong);
    border-radius: 999px;
    color: var(--ink-muted);
    white-space: nowrap;
    line-height: 1.4;
  }

  .m-badge--live { color: var(--ink); border-color: var(--ink); }

  /* Qué existe hoy */
  .m-status {
    display: grid;
    gap: 2rem;
    margin: 2.5rem 0;
  }

  .m-status-block {
    border-left: 2px solid var(--border-strong);
    padding-left: 1.25rem;
  }

  .m-status-head {
    font-size: 11px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--ink);
    margin-bottom: 0.2rem;
  }

  .m-status-sub {
    font-size: 13px;
    font-style: italic;
    color: var(--ink-muted);
    margin-bottom: 1rem;
    line-height: 1.6;
  }

  .m-status ul { list-style: none; }

  .m-status li {
    font-size: 15px;
    color: var(--ink);
    line-height: 1.7;
    margin-bottom: 0.7rem;
    padding-left: 1.1rem;
    position: relative;
  }

  .m-status li::before {
    content: '—';
    position: absolute;
    left: 0;
    color: var(--ink-faint);
  }

  .m-thesis {
    border-top: 1px solid var(--border-strong);
    border-bottom: 1px solid var(--border-strong);
    padding: 3rem 0;
    margin: 4rem 0 3rem;
    text-align: center;
  }

  .m-thesis p {
    font-family: var(--serif);
    font-size: clamp(20px, 3.5vw, 27px);
    font-style: italic;
    line-height: 1.6;
    color: var(--ink);
    margin-bottom: 0;
  }

  .m-colophon {
    text-align: center;
    margin-top: 3.5rem;
    padding: 0 1rem;
  }

  .m-colophon p {
    font-size: 14px;
    color: var(--ink-muted);
    line-height: 2;
    margin-bottom: 0;
    letter-spacing: 0.01em;
  }

  .m-colophon-links {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.75rem 1.75rem;
    margin-top: 2rem;
  }

  .m-colophon-link {
    font-family: var(--sans);
    font-size: 11px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--ink-faint);
    text-decoration: none;
    transition: color 0.2s;
  }

  .m-colophon-link:hover { color: var(--ink); }

  .m-footer {
    margin-top: 4rem;
    padding-top: 2rem;
    border-top: 1px solid var(--border);
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .m-footer-left p {
    font-size: 13px;
    color: var(--ink-muted);
    margin-bottom: 0.25rem;
    line-height: 1.6;
  }

  .m-footer-date {
    font-size: 10px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--ink-faint);
    margin-top: 0.75rem;
  }

  .m-footer-link {
    font-size: 12px;
    color: var(--ink-muted);
    text-decoration: none;
    letter-spacing: 0.06em;
    border-bottom: 1px solid var(--border);
    padding-bottom: 1px;
    transition: color 0.2s, border-color 0.2s;
  }

  .m-footer-link:hover { color: var(--ink); border-color: var(--ink); }

  @keyframes mFadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (prefers-reduced-motion: reduce) {
    .m-opening, .m-meta-line, .m-header-block { animation: none; opacity: 1; }
    .m-progress { transition: none; }
    html { scroll-behavior: auto; }
  }

  @media (max-width: 600px) {
    .m-main { padding: 7rem 1.25rem 4rem; }
    .m-nav { padding: 1rem 1.25rem; }
    .m-toc ol { columns: 1; }
    .m-chain { grid-template-columns: 1fr; }
    .m-chain li { border-right: 0; border-bottom: 1px solid var(--border); }
    .m-chain li:last-child { border-bottom: 0; }
    .m-chain li + li::before { left: 1rem; top: -0.55rem; }
    .m-clevel-item { grid-template-columns: 1fr; gap: 0.35rem; }
    .m-clevel-item .m-badge { justify-self: start; }
    .m-blockquote { font-size: 20px; padding-left: 1.25rem; }
    .m-thesis p { font-size: 20px; }
    .m-footer { flex-direction: column; align-items: flex-start; }
    .m-anchor { padding: 1.25rem 1.25rem; }
  }
`

const chapters = [
  { id: 'apertura', num: '00', title: 'La inteligencia y la confianza' },
  { id: 'intermediarios', num: 'I', title: 'Lo que la inteligencia no reemplaza' },
  { id: 'conocimiento', num: 'II', title: 'El conocimiento disperso' },
  { id: 'redes', num: 'III', title: 'La confianza y las redes' },
  { id: 'verificable', num: 'IV', title: 'Verificable, no solamente trazable' },
  { id: 'reputacion', num: 'V', title: 'De la prueba a la reputación' },
  { id: 'mandatos', num: 'VI', title: 'Agentes, mandatos y responsabilidad' },
  { id: 'c-level', num: 'VII', title: 'El C-level agéntico' },
  { id: 'hoy', num: 'VIII', title: 'Qué existe hoy' },
  { id: 'valor', num: 'IX', title: 'Por qué Digitalo puede crear y capturar valor' },
  { id: 'no-sabemos', num: 'X', title: 'Lo que todavía no sabemos' },
  { id: 'cierre', num: '—', title: 'Una economía que puede comprobar' },
]

const levels = [
  {
    id: 'L1',
    name: 'Afirmado',
    desc: 'Una parte afirma que la entrega ocurrió. La declaración queda registrada, sin corroboración todavía.',
  },
  {
    id: 'L2',
    name: 'Atestación bilateral',
    desc: 'Quien entregó y quien recibió presentan atestaciones compatibles sobre la misma entrega.',
  },
  {
    id: 'L3',
    name: 'Respaldo operacional',
    desc: 'Existe evidencia operacional adicional: registros de entrada y salida, duración real, ubicación o canal, documentos firmados.',
  },
  {
    id: 'L4',
    name: 'Conciliación financiera',
    desc: 'Además, la entrega está conciliada con los movimientos financieros relacionados. Suma evidencia; no vuelve la entrega más verdadera ni prueba por sí sola su calidad o su alcance.',
  },
]

const chain = [
  {
    step: 'I',
    name: 'Prueba de Servicio',
    desc: 'Una obligación o gestión particular respaldada por evidencia: qué se prometió, qué ocurrió, quién lo declaró, qué respaldos existen.',
  },
  {
    step: 'II',
    name: 'Historial verificable',
    desc: 'La acumulación de pruebas en el tiempo: qué ocurrió repetidamente, con qué excepciones, qué disputas hubo y cómo se resolvieron.',
  },
  {
    step: 'III',
    name: 'Reputación portable',
    desc: 'El contexto que ese historial aporta para evaluar a alguien, interpretado por quien decide y bajo su propia política.',
  },
  {
    step: 'IV',
    name: 'Decisión económica',
    desc: 'Contratar, elegir, fijar condiciones, financiar, asegurar, delegar o dejar de verificar dos veces. Aquí aparece el valor.',
  },
]

const clevel = [
  {
    role: 'CEO',
    name: 'Digitalo.ai',
    desc: 'Agente conversacional que opera sobre la infraestructura de Coordinalo: lee el estado del negocio y ejecuta acciones a través del protocolo. En producción con una clínica desde marzo de 2026.',
    status: 'Operativo',
    live: true,
  },
  {
    role: 'COO',
    name: 'Coordinalo.ai',
    desc: 'Operar el ciclo completo del servicio con mandato propio. Hoy esa operación existe dentro del producto Coordinalo, sin agente autónomo.',
    status: 'Visión',
    live: false,
  },
  {
    role: 'CFO',
    name: 'Capitalizalo.ai',
    desc: 'Finanzas, cierres y decisiones de capital delegadas a un agente con límites explícitos.',
    status: 'Visión',
    live: false,
  },
  {
    role: 'CRO',
    name: 'Optimizalo.ai',
    desc: 'Ocupación, precios e ingresos bajo supervisión humana.',
    status: 'Visión',
    live: false,
  },
  {
    role: 'CMO adquisición',
    name: 'Atraelo.ai',
    desc: 'Atraer los clientes correctos con evidencia de qué funcionó.',
    status: 'Visión',
    live: false,
  },
  {
    role: 'CMO retención',
    name: 'Fidelizalo.ai',
    desc: 'Retención y seguimiento sobre el historial real de cada relación.',
    status: 'Visión',
    live: false,
  },
  {
    role: 'CAO',
    name: 'Auditalo.ai',
    desc: 'Revisar que cada decisión delegada tenga mandato, evidencia y rastro.',
    status: 'Visión',
    live: false,
  },
  {
    role: 'Registry',
    name: 'Emparejalo.ai',
    desc: 'Emparejar demanda con oferta usando el historial verificable como contexto.',
    status: 'Visión',
    live: false,
  },
]

function Chapter({
  id,
  num,
  title,
  children,
}: {
  id: string
  num: string
  title: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <section className="m-chapter" id={id} aria-labelledby={`${id}-title`}>
      <p className="m-chapter-num">{num === '00' ? 'Apertura' : num === '—' ? 'Cierre' : `Capítulo ${num}`}</p>
      <h2 id={`${id}-title`}>{title}</h2>
      {children}
    </section>
  )
}

export default function ManifiestoPage() {
  useEffect(() => {
    // Scroll progress
    const handler = () => {
      const h = document.documentElement
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100
      const bar = document.getElementById('m-progress')
      if (bar) bar.style.width = Math.min(pct, 100) + '%'
    }
    window.addEventListener('scroll', handler, { passive: true })

    // Theme toggle
    const toggle = document.getElementById('themeToggle')
    const onToggle = () => {
      const cur = document.documentElement.getAttribute('data-theme')
      const next = cur === 'dark' ? 'light' : 'dark'
      document.documentElement.setAttribute('data-theme', next)
      localStorage.setItem('theme', next)
    }
    toggle?.addEventListener('click', onToggle)

    // Mobile hamburger
    const hamburger = document.getElementById('navHamburger')
    const navLinks = document.getElementById('navLinks')
    const onHamburger = () => navLinks?.classList.toggle('active')
    hamburger?.addEventListener('click', onHamburger)

    const onDocClick = (e: MouseEvent) => {
      if (!(e.target as Element).closest('.nav-right') && navLinks?.classList.contains('active')) {
        navLinks.classList.remove('active')
      }
    }
    document.addEventListener('click', onDocClick)

    navLinks?.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => navLinks.classList.remove('active'))
    )

    return () => {
      window.removeEventListener('scroll', handler)
      toggle?.removeEventListener('click', onToggle)
      hamburger?.removeEventListener('click', onHamburger)
      document.removeEventListener('click', onDocClick)
    }
  }, [])

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=DM+Sans:ital,wght@0,300;0,400;1,300&display=swap"
        rel="stylesheet"
      />
      <link rel="stylesheet" href="/styles.css" />
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div className="m-progress" id="m-progress" aria-hidden="true" />

      <nav className="nav">
        <div className="nav-container">
          <a href="/" className="nav-logo">
            <svg className="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z" fill="url(#logo-gradient)" opacity="0.15"/>
              <path d="M12 5.5L7 8v4c0 3.5 2.5 6.5 5 7.5 2.5-1 5-4 5-7.5V8l-5-2.5z" stroke="url(#logo-gradient)" strokeWidth="1.5" fill="none"/>
              <circle cx="12" cy="10" r="1.5" fill="url(#logo-gradient)"/>
              <circle cx="9" cy="14" r="1.5" fill="url(#logo-gradient)"/>
              <circle cx="15" cy="14" r="1.5" fill="url(#logo-gradient)"/>
              <path d="M12 10L9 14M12 10L15 14M9 14H15" stroke="url(#logo-gradient)" strokeWidth="1.2"/>
              <defs>
                <linearGradient id="logo-gradient" x1="4" y1="2" x2="20" y2="20" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#60a5fa"/>
                  <stop offset="1" stopColor="#3b82f6"/>
                </linearGradient>
              </defs>
            </svg>
            Grupo Digitalo
          </a>
          <div className="nav-right">
            <ul className="nav-links" id="navLinks">
              <li><a href="https://servicialo.com">Protocolo</a></li>
              <li><a href="/#productos">Productos</a></li>
              <li><a href="/#nosotros">Nosotros</a></li>
              <li><a href="https://documentalo.com">Documentaci&oacute;n</a></li>
              <li><a href="/#contacto">Contacto</a></li>
              <li><a href="/manifiesto" className="nav-link--manifiesto">Manifiesto</a></li>
            </ul>
            <button className="theme-toggle" id="themeToggle" aria-label="Cambiar tema">
              <svg className="icon-sun" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
              </svg>
              <svg className="icon-moon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
              </svg>
            </button>
            <button className="nav-hamburger" id="navHamburger" aria-label="Abrir menú">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <main className="m-main">
        <p className="m-opening">
          Hace seis meses escribimos que la inteligencia iba a dejar de ser un privilegio de las organizaciones grandes.<br />
          Teníamos razón. <em>Era la mitad del problema.</em>
        </p>

        <div className="m-meta-line">
          Esto no es una página de producto.<br />
          Es la tesis detrás de Digitalo.
        </div>

        <header className="m-header-block">
          <p className="m-eyebrow">Grupo Digitalo — Documento fundacional · Segunda versión</p>
          <h1>La inteligencia dejó de ser escasa.<br /><em>La confianza, no.</em></h1>
          <p className="m-subtitle">Un manifiesto para la economía agéntica de servicios.</p>
          <p className="m-dates">
            Publicado el 28 de marzo de 2026 como «Capitalización de inteligencia»<br />
            Reescrito el 12 de octubre de 2026
          </p>
          <div className="m-divider" />
        </header>

        <nav className="m-toc" aria-label="Índice del manifiesto">
          <p className="m-toc-label">Índice</p>
          <ol>
            {chapters.map((c) => (
              <li key={c.id}>
                <a href={`#${c.id}`}>
                  <span className="m-toc-num">{c.num}</span>
                  {c.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* ───────────────────────── Apertura ───────────────────────── */}
        <Chapter id="apertura" num="00" title="La inteligencia y la confianza">
          <p className="m-punch">Toda organización grande tiene un equipo directivo. Toda PYME de servicios lo necesita. Ninguna lo ha podido pagar.</p>
          <p>La kinesióloga que trabaja sola. El psicólogo que atiende online. El estudio con cinco profesionales. Operan sin gerente de finanzas, sin gerente de operaciones, sin nadie que controle: con una planilla, su memoria y el tiempo que les queda después de atender.</p>
          <p>Una organización grande puede pagar lo que esas personas no: directivos, sistemas de control, abogados, auditores, aseguradoras y, sobre todo, la infraestructura de confianza que hace que un tercero le crea sin conocerla. Esa asimetría es más antigua que cualquier tecnología, y durante mucho tiempo pareció inevitable.</p>
          <p>La inteligencia artificial cambió una parte del problema. Analizar, redactar, conciliar, planificar, responder, coordinar: capacidades que hace tres años costaban sueldos hoy cuestan centavos por consulta. La primera versión de este manifiesto nació de esa constatación y la sostenemos: por primera vez una organización pequeña puede acceder a capacidades operativas y directivas que antes exigían escala.</p>
          <p>Pero al desplegar esas capacidades en una clínica real descubrimos la otra mitad. Un agente puede agendar, confirmar, documentar y conciliar. Lo que no puede hacer por sí solo es que un tercero le crea. Cuando un pagador, una aseguradora, un prestamista o un cliente nuevo pregunta qué ocurrió realmente, la respuesta sigue dependiendo de quién la emite y de qué plataforma la guarda.</p>
          <p>Ahí está el conflicto que organiza este texto. La inteligencia dejó de ser el principal cuello de botella. La confianza sigue concentrada: en quien tiene escala, en quien tiene un historial que otros reconocen, en quien puede pagar a los intermediarios que garantizan lo que los demás solo pueden declarar.</p>
          <div className="m-blockquote">
            La inteligencia permite actuar. La evidencia permite comprobar. La reputación aporta contexto para decidir en quién confiar. Los protocolos abiertos pueden permitir que esas capacidades viajen entre organizaciones independientes.
          </div>
          <p>Queremos construir infraestructura para esa economía. No proponemos que Digitalo se convierta en árbitro de la verdad ni que un protocolo reemplace a las instituciones que hoy sostienen la confianza. Proponemos algo más acotado y, creemos, más importante: que una parte creciente de la confianza operacional pueda sustentarse en evidencia verificable e interoperable, en lugar de en el tamaño de quien la declara.</p>
        </Chapter>

        {/* ───────────────────────── I ───────────────────────── */}
        <Chapter id="intermediarios" num="I" title="Lo que la inteligencia no reemplaza">
          <p>Es tentador contar esta historia como una guerra contra los intermediarios. Sería falsa.</p>
          <p>Los intermediarios existen porque cumplen funciones económicas reales. Absorben riesgos que ninguna de las partes quiere cargar sola. Ofrecen garantías respaldadas por capital. Verifican cumplimiento, obtienen autorizaciones, distribuyen demanda, resuelven controversias y construyen una confianza que las partes no podrían construir entre sí al mismo costo. Una aseguradora no es una ineficiencia; es una forma de que el riesgo de muchos financie la pérdida de pocos. Un colegio profesional no es un peaje; es un mecanismo para que una credencial signifique lo mismo en todas partes.</p>
          <p>Lo que sí podemos decir con precisión es más modesto y más útil. Una parte del costo de verificar y coordinar no viene de la función del intermediario, sino de la forma en que hoy circula la evidencia. Cada vez que un tercero necesita saber si una prestación ocurrió, debe integrarse con el sistema que la registró, o confiar en una declaración, o repetir la verificación por su cuenta. Ese costo se paga una y otra vez, y lo paga con más dureza quien es pequeño: el intermediario se integra con los grandes y el resto queda fuera, no por incumplir, sino por no ser verificable.</p>
          <p>Una inteligencia más capaz no corrige esto por sí misma. Un modelo de lenguaje puede redactar el informe de una sesión en segundos; no puede hacer que ese informe sea creíble para alguien que no estuvo ahí. Si la evidencia nace dentro de un sistema y no puede salir en una forma que otros interpreten de manera independiente, la organización pequeña sigue dependiendo de que alguien más la avale.</p>
          <p>Nuestra tesis, entonces, no es que los intermediarios sobren. Es que parte de su trabajo podría apoyarse en evidencia interpretable por terceros, y que recién cuando eso ocurre los beneficios de la inteligencia barata tienen una oportunidad real de llegar a quienes más los necesitan.</p>
        </Chapter>

        {/* ───────────────────────── II ───────────────────────── */}
        <Chapter id="conocimiento" num="II" title="El conocimiento disperso">
          <p>Hay una razón más profunda por la que no intentamos resolver esto con una plataforma central que lo sepa todo.</p>
          <p>En 1945, Friedrich Hayek publicó un artículo breve, «El uso del conocimiento en la sociedad», con una observación que sigue siendo incómoda para cualquier diseñador de sistemas: el conocimiento relevante para coordinar una economía no existe en ningún lugar concentrado. Está disperso en millones de personas que saben cosas particulares sobre su tiempo, su lugar y sus circunstancias. El problema económico no es cómo asignar recursos a partir de un conocimiento completo, sino cómo coordinar a personas que solo tienen fragmentos.</p>
          <p>Una clínica sabe qué pacientes faltan los lunes. Un estudio contable sabe qué cliente paga tarde pero paga. Una profesora particular sabe que cierto alumno necesita más tiempo del acordado. Nada de eso está en un servidor central, ni debería estarlo. Es conocimiento local, y su valor depende de que quien lo tiene pueda actuar sobre él.</p>
          <p>En 1968, Hayek fue más lejos en una conferencia titulada «La competencia como proceso de descubrimiento»: la competencia no es un estado de equilibrio, sino un procedimiento para descubrir hechos que, sin ella, nadie conocería o nadie usaría. No sabemos de antemano qué forma de operar un servicio es mejor. Lo descubrimos cuando distintas organizaciones intentan cosas distintas y los resultados se hacen visibles.</p>
          <div className="m-note">
            La frase sobre instituciones que son «resultado de la acción humana, pero no de un designio humano» suele atribuirse a Hayek. Es de Adam Ferguson, en su <em>Ensayo sobre la historia de la sociedad civil</em> (1767). Hayek la recuperó y la convirtió en el título de un ensayo propio en 1967. La citamos con su autor.
          </div>
          <p>La conclusión que extraemos no es que una teoría económica se implemente en código. Es más acotada: no necesitamos concentrar el conocimiento para coordinarlo. Necesitamos reglas comprensibles entre participantes independientes; reglas que digan qué significa una oferta, un acuerdo, una entrega, una evidencia y una liquidación, para que cada organización conserve su conocimiento local y aun así pueda entenderse con otras.</p>
          <p>Un protocolo abierto es un mecanismo posible para esas reglas. No el único, y no uno que garantice el resultado. Pero es el que permite que el descubrimiento ocurra por competencia entre implementaciones, y no por decreto de una plataforma.</p>
        </Chapter>

        {/* ───────────────────────── III ───────────────────────── */}
        <Chapter id="redes" num="III" title="La confianza y las redes">
          <p>Coordinar entre independientes sin un centro no es una idea nueva. Hay un ejemplo histórico que nos interesa precisamente por su imperfección.</p>
          <p>Entre los siglos XIII y XVII, una red de ciudades mercantiles del norte de Europa, la Liga Hanseática, sostuvo rutas comerciales entre el Báltico y el mar del Norte sin un gobierno central ni una tesorería común. Lübeck, Hamburgo, Colonia, Danzig, Riga y decenas de ciudades más conservaron su autonomía. Lo que compartían eran prácticas e instituciones: un derecho mercantil reconocible, asambleas comunes desde 1356, y puestos comerciales en ciudades extranjeras, los Kontore de Londres, Brujas, Bergen y Nóvgorod, donde un mercader llegado de otra ciudad encontraba reglas conocidas, privilegios negociados y una comunidad que respondía por él.</p>
          <p>Conviene no idealizarla. La Hansa no era un protocolo, ni una red de pares sin fricción. Negoció privilegios, impuso bloqueos comerciales y libró guerras. Sus instituciones no eliminaron la necesidad de conocer a la contraparte: la redujeron, porque pertenecer a la red decía algo verificable sobre quién eras y qué reglas aceptabas. Y su declive, lento y de varios siglos, tuvo muchas causas a la vez: el ascenso de los estados territoriales, la competencia holandesa e inglesa, el desplazamiento de las rutas hacia el Atlántico, las divisiones internas. Su última asamblea se reunió en 1669.</p>
          <p>Lo que rescatamos no es la nostalgia. Es la estructura: entidades independientes, con conocimiento local e intereses propios, que coordinaron comercio a gran escala porque compartían reglas e instituciones que hacían legible la confianza entre desconocidos. Verificar a un mercader hanseático en Brujas costaba menos que verificar a un extraño, no porque alguien central lo garantizara, sino porque la red había hecho portable una parte de su reputación.</p>
          <p>Esa es la pregunta que nos hacemos, con otras herramientas y a otra escala: cómo hacer que el cumplimiento de una organización pequeña sea legible fuera de la plataforma en que ocurrió.</p>
        </Chapter>

        {/* ───────────────────────── IV ───────────────────────── */}
        <Chapter id="verificable" num="IV" title="Verificable, no solamente trazable">
          <p>Hay tres palabras que suelen usarse como sinónimos y no lo son.</p>
          <p>Un <strong>registro</strong> es una anotación: alguien escribió que algo ocurrió. La mayoría de los sistemas tienen registros. Su problema no es que falten, sino que viven dentro del software que los produjo.</p>
          <p>La <strong>auditabilidad</strong> es la posibilidad de reconstruir después qué pasó y quién lo hizo: un historial de cambios que alguien con acceso puede revisar. Es mejor que un registro suelto, y sigue dependiendo de que confiemos en quien guarda el historial.</p>
          <p>La <strong>verificación independiente</strong> es otra cosa: la posibilidad de que un tercero, con acceso autorizado y sin depender de la buena fe del operador, compruebe que una afirmación es consistente con la evidencia que la respalda. Para eso la evidencia necesita una forma acordada, una semántica que diga qué significa cada pieza, y propiedades que permitan saber que no fue alterada después.</p>
          <p><a className="m-link" href="https://servicialo.com" target="_blank" rel="noopener">Servicialo</a> es nuestra respuesta a la parte semántica del problema. Es un protocolo abierto, publicado bajo licencia Apache-2.0, que define cómo describir un servicio profesional de manera que distintos sistemas lo entiendan igual. Modela cinco cosas y la relación entre ellas: la <strong>oferta</strong>, lo que una organización publica; el <strong>acuerdo</strong>, lo pactado entre las partes, con su alcance, su precio, sus políticas y quién paga; la <strong>entrega</strong>, cada instancia ejecutada del servicio, con su propio ciclo de vida; la <strong>evidencia</strong>, los registros que respaldan lo ocurrido; y la <strong>liquidación</strong>, los movimientos financieros vinculados. Define estados, excepciones y qué evidencia puede exigir cada vertical, y deja explícito que entrega, evidencia, aceptación y pago no avanzan en un orden fijo: un prepago, una facturación mensual o un servicio gratuito no rompen el modelo.</p>
          <p>Es igual de importante decir qué no es. Servicialo no emite ni verifica identidades: transporta credenciales y quién las verificó, no las certifica. No autoriza: la pregunta de qué le estaba permitido hacer a alguien pertenece a otra capa. No es un transporte ni un mecanismo de firma criptográfica: define qué significa la evidencia, y deja que el sobre que la transporta y la firma que la protege vengan de otros estándares. No mueve dinero, no garantiza contratos y no certifica profesiones. Un protocolo se define tanto por lo que deja fuera como por lo que modela, y cada una de esas funciones compone con sistemas que ya existen.</p>
          <p>Sobre esa semántica se construye la pieza que más nos importa: la <strong>Prueba de Servicio</strong>. Es el expediente de una entrega concreta: qué se acordó, qué se entregó, qué evidencia lo respalda y en qué posición está su liquidación. Hoy es una <a className="m-link" href="https://servicialo.com/extensions" target="_blank" rel="noopener">extensión en borrador</a> del protocolo, no un objeto que ya circule entre sistemas. Pero su diseño establece algo que consideramos esencial: la certeza no es binaria.</p>

          <ol className="m-levels" aria-label="Niveles de certeza de una Prueba de Servicio">
            {levels.map((l) => (
              <li key={l.id} className="m-level">
                <span className="m-level-id">{l.id}</span>
                <div>
                  <div className="m-level-name">{l.name}</div>
                  <div className="m-level-desc">{l.desc}</div>
                </div>
              </li>
            ))}
          </ol>
          <p className="m-caption">
            Los niveles son acumulativos en evidencia, no en verdad. Una entrega gratuita puede alcanzar certeza suficiente sin llegar nunca a L4. Acreditar una entrega depende de la política acordada entre las partes, no de un nivel fijo. Fuente: extensión Prueba de Servicio 0.2.0, en borrador.
          </p>

          <p>Dos advertencias que el propio protocolo hace suyas y que repetimos aquí porque son fáciles de olvidar. La primera: verificar no es lo mismo que saber la verdad. Una firma prueba quién declaró algo y que el registro no fue alterado; no prueba que lo declarado sea cierto. Un sello de tiempo prueba cuándo se registró algo; no prueba qué ocurrió. La evidencia hace que una afirmación sea acreditable bajo una política acordada y con un nivel de certeza explícito. No la hace infalible, y no dice nada por sí sola sobre la calidad del servicio.</p>
          <p>La segunda: verificación independiente no significa verificación pública. Buena parte de la evidencia de un servicio es sensible: una ficha clínica, una minuta legal, la dirección de un domicilio. El protocolo clasifica la sensibilidad de cada evidencia y asume que verificar requiere acceso autorizado. Lo que cambia no es quién puede ver, sino que quien está autorizado a ver pueda interpretar sin pedirle permiso al software que la guardó.</p>
          <div className="m-blockquote">
            Trazable es poder reconstruir lo que pasó. Verificable es que otro pueda comprobarlo sin tener que creernos.
          </div>
        </Chapter>

        {/* ───────────────────────── V ───────────────────────── */}
        <Chapter id="reputacion" num="V" title="De la prueba a la reputación">
          <p>Aquí está el centro de este manifiesto, y el cambio más importante respecto de su primera versión.</p>
          <p>Una Prueba de Servicio responde por una entrega. Pero nadie contrata, financia o delega por una entrega. Lo hace por una trayectoria. Y la trayectoria de una organización pequeña es hoy el activo más valioso que tiene y el peor custodiado: vive fragmentada entre las plataformas que fue usando, cada cambio de sistema reinicia el conteo, y cuando necesita demostrarla, depende de que un tercero la avale.</p>

          <ol className="m-chain" aria-label="Secuencia de la prueba a la decisión">
            {chain.map((c) => (
              <li key={c.step}>
                <div className="m-chain-step">{c.step}</div>
                <div className="m-chain-name">{c.name}</div>
                <div className="m-chain-desc">{c.desc}</div>
              </li>
            ))}
          </ol>
          <p className="m-caption">Cuatro tramos, cuatro significados distintos. El valor económico aparece recién en el cuarto. Un expediente perfecto que no influye en ninguna decisión es un costo, no un activo.</p>

          <p>Sobre el tercer tramo hay que ser exactos, porque es donde más fácil resulta equivocarse. La reputación no es una puntuación que Digitalo emita ni que Servicialo calcule. No es una base de datos privada que nosotros controlemos. Es una interpretación. Quien financia mira cumplimiento y disputas. Quien contrata mira consistencia y experiencia. Un agente mira cuánta confianza necesita para actuar sin revisión humana. Los tres pueden leer el mismo historial y decidir distinto sin que ninguno se equivoque. Por eso el protocolo no define un puntaje universal. Servicialo no determina quién es confiable: busca hacer portables los hechos que permiten que cada cual lo determine bajo su propia política.</p>

          <div className="m-anchor">
            <div className="m-anchor-label">Un ejemplo</div>
            <p>Una kinesióloga atendió durante cuatro años en una clínica pequeña. Cada sesión quedó registrada con su acuerdo, su evidencia de entrega y su liquidación: cientos de pruebas, con sus excepciones y sus pocas disputas, todas resueltas.</p>
            <p>Cuando decide abrir su propia consulta, esa trayectoria se queda en el sistema de la clínica. Ante una aseguradora, un arrendador o un banco, empieza de cero. Su historial existe, pero no en una forma que esos terceros puedan leer sin integrarse con un software que no conocen.</p>
            <p>Si ese historial pudiera salir con ella, con su nivel de certeza explícito y en una semántica que otros interpretan, la aseguradora podría evaluar su tasa de cumplimiento con sus propios criterios, el banco podría ponderar sus cobros conciliados como quisiera, y una clínica nueva podría delegarle operaciones con menos verificaciones previas. <strong>Ninguno de ellos tendría que confiar en Digitalo. Tendrían que confiar en la evidencia, y decidir.</strong></p>
          </div>

          <p>Esa es la hipótesis económica de este manifiesto, dicha sin adornos: la evidencia portable podría reducir los costos de información, verificación y coordinación entre entidades independientes, y al hacerlo, mover una parte del valor de una trayectoria desde el intermediario que la avala hacia quien la construyó. Decimos «podría» a propósito. Ninguna de esas decisiones se apoya hoy en el protocolo. Lo que existe es la semántica para que la prueba se exprese, una implementación que produce pruebas en su operación diaria, y la convicción de que vale la pena intentarlo.</p>
          <div className="m-blockquote">
            La reputación no es un número que alguien emite. Es contexto, interpretado por quien decide.
          </div>
        </Chapter>

        {/* ───────────────────────── VI ───────────────────────── */}
        <Chapter id="mandatos" num="VI" title="Agentes, mandatos y responsabilidad">
          <p>Todo lo anterior se vuelve urgente cuando quien actúa no es una persona, sino un agente.</p>
          <p>En marzo de 2026, un agente de inteligencia artificial completó por primera vez una reserva de principio a fin sobre nuestra infraestructura de producción, sin intervención humana en ese flujo. Fue una operación acotada, no un negocio entero funcionando solo. Pero bastó para hacer evidente que cuando un agente ejecuta una acción con consecuencias reales, hay tres preguntas que ninguna capacidad técnica responde por sí sola: qué estaba autorizado a hacer, qué hizo exactamente, y qué debe volver a manos humanas.</p>
          <p>Nuestro diseño operacional separa esas tres piezas. El <strong>mandato</strong>: qué está autorizado a hacer un agente, quién delega y bajo qué límites de alcance, contexto, tiempo y monto. El protocolo lo especifica como un objeto explícito, emitido siempre por una persona u organización y nunca por el propio agente, acotado y revocable. La <strong>evidencia</strong>: qué acciones se realizaron y qué pruebas las respaldan, en un registro que no se modifica retroactivamente. La <strong>excepción</strong>: qué requiere revisión, corrección o escalamiento humano, porque es ambiguo, mueve dinero, genera un documento con efectos legales o cierra un acuerdo.</p>
          <p>Por qué separarlas: porque capacidad de actuar, permiso para actuar y prueba de lo actuado son cosas distintas, y confundirlas es la forma más rápida de perder la responsabilidad. Un agente que actúa con la llave de toda la organización puede hacer cualquier cosa, y después nadie sabe quién autorizó qué. Un agente que actúa suplantando a un usuario deja un rastro inútil. Un mandato explícito permite que el ciclo de vida del servicio registre qué ocurrió y que el rastro del mandato registre quién lo autorizó.</p>
          <p>Aquí también conviene no prometer de más. Un mandato técnico no determina quién responde legalmente. Si un agente agenda mal, cobra de más o documenta algo falso, la responsabilidad civil, contractual o regulatoria sigue rigiéndose por normas que ningún protocolo reemplaza. Lo que estas tres piezas aportan es algo previo y necesario: que cuando haya que atribuir responsabilidad, existan hechos registrados sobre qué se autorizó y qué se hizo.</p>
          <p>Y tampoco está todo construido. El modelo de agencia delegada está especificado en el protocolo y existe como capa de servicio en la implementación de referencia, pero su validación todavía no se exige en el borde donde los agentes invocan herramientas: hoy el acceso se controla con credenciales de la organización, y los alcances del mandato son indicativos. Lo decimos porque la diferencia entre «especificado» e «impuesto» es exactamente la diferencia que este manifiesto pide tomar en serio.</p>
          <p className="m-punch">Flexibles en la política. Rígidos en la ejecución y la trazabilidad.</p>
          <p>Cada organización decide qué delega y con qué límites. Lo que no se negocia es que la ejecución respete esos límites y deje rastro. Y el orden importa: primero poder verificar y supervisar; luego ampliar la delegación. La supervisión humana no es una etapa provisional que la automatización va a superar. Es la condición que hace razonable automatizar.</p>
        </Chapter>

        {/* ───────────────────────── VII ───────────────────────── */}
        <Chapter id="c-level" num="VII" title="El C-level agéntico">
          <p>La primera versión de este manifiesto imaginó algo que seguimos queriendo: que una organización pequeña pueda delegar funciones directivas a agentes especializados. Un agente que opere el ciclo del servicio. Otro que cuide las finanzas. Otro que mire ocupación e ingresos. Otros que atraigan y retengan clientes, auditen decisiones, emparejen oferta con demanda.</p>
          <p>Hoy entendemos mejor por qué ese horizonte depende de todo lo anterior. Delegar una función directiva a un agente es razonable solo si ese agente actúa bajo un mandato explícito, deja evidencia verificable de lo que hizo y escala lo que no le corresponde decidir. Sin esa infraestructura, el C-level agéntico es una colección de automatizaciones que nadie puede supervisar. Con ella, es una forma de que capacidades directivas lleguen a organizaciones que nunca pudieron pagarlas.</p>
          <p>Por eso en esta versión no exhibimos ocho marcas como si fueran ocho productos. Exhibimos su estado real.</p>

          <ul className="m-clevel" aria-label="Estado de los agentes del C-level">
            {clevel.map((c) => (
              <li key={c.name} className="m-clevel-item">
                <span className="m-clevel-role">{c.role}</span>
                <div>
                  <div className="m-clevel-name">{c.name}</div>
                  <div className="m-clevel-desc">{c.desc}</div>
                </div>
                <span className={c.live ? 'm-badge m-badge--live' : 'm-badge'}>{c.status}</span>
              </li>
            ))}
          </ul>

          <p>Lo que sí podemos afirmar: una parte de esas funciones ya ocurre de forma operativa dentro de Coordinalo, sin nombre propio. Conciliación de movimientos bancarios contra servicios entregados, cierres mensuales, recordatorios, confirmaciones de entrega, seguimiento de cobranza. No son agentes autónomos con criterio directivo, no aprenden en producción y no tienen evidencia verificable propia. Son capacidades que generan la evidencia sobre la cual, algún día, un agente con mandato podría decidir.</p>
        </Chapter>

        {/* ───────────────────────── VIII ───────────────────────── */}
        <Chapter id="hoy" num="VIII" title="Qué existe hoy">
          <p>Un manifiesto que pide evidencia tiene que ofrecerla sobre sí mismo. Esta sección distingue tres cosas, y pedimos que se lea con esa distinción en mente.</p>

          <div className="m-status">
            <div className="m-status-block">
              <p className="m-status-head">Lo que funciona</p>
              <p className="m-status-sub">Operación real, implementación de referencia y capacidades observadas con evidencia.</p>
              <ul>
                <li><a className="m-link" href="https://coordinalo.com" target="_blank" rel="noopener">Coordinalo</a> opera en producción desde el 31 de marzo de 2026 como implementación de referencia de Servicialo, con una clínica de kinesiología en Santiago operando sobre el sistema. Vertical salud. Conformidad revisada manualmente en junio de 2026, nivel CORE; no existe todavía una suite de certificación automatizada.</li>
                <li>El protocolo está <a className="m-link" href="https://servicialo.com/spec" target="_blank" rel="noopener">publicado</a>: especificación v0.10 en estado borrador, esquemas JSON, perfil HTTP normativo y un manifiesto legible por máquinas, bajo licencia Apache-2.0.</li>
                <li>El servidor MCP de referencia, <a className="m-link" href="https://www.npmjs.com/package/@servicialo/mcp-server" target="_blank" rel="noopener">@servicialo/mcp-server</a>, está publicado en npm (versión 0.9.14) con 40 herramientas, 15 públicas y 25 autenticadas. Es un cliente liviano que conecta agentes con cualquier plataforma compatible.</li>
                <li>En la operación diaria de Coordinalo existen la confirmación bilateral de entrega, una ventana de verificación con cierre automático por silencio, disputas que el cliente puede abrir y la conciliación de cobros. La atestación de entrega no puede registrarse con la credencial de agente de la organización: exige la sesión autenticada del profesional asignado o de un administrador.</li>
                <li>Interoperabilidad agente a agente (A2A v0.3) para descubrimiento e intenciones de reserva: superficie parcial, en estado experimental.</li>
                <li>Telemetría anónima y benchmarks de red con k-anonimato: experimental. Las instalaciones del servidor MCP detectadas en distintos países son instalaciones técnicas, <a className="m-link" href="https://servicialo.com/network" target="_blank" rel="noopener">no adopción operativa</a>.</li>
              </ul>
            </div>

            <div className="m-status-block">
              <p className="m-status-head">Lo que está especificado</p>
              <p className="m-status-sub">Documentado técnicamente; no necesariamente implementado ni impuesto.</p>
              <ul>
                <li>Prueba de Servicio como expediente verificable, con niveles de certeza L1 a L4 y estados de expediente independientes: <a className="m-link" href="https://github.com/servicialo/mcp-server/blob/main/public/spec/extensions/proof-of-service.md" target="_blank" rel="noopener">extensión en borrador</a>, versión 0.2.0. No existe aún un objeto que se intercambie entre sistemas.</li>
                <li>Dimensiones de estado independientes para cumplimiento, evidencia, aceptación y liquidación: borrador.</li>
                <li>Modelo de <a className="m-link" href="https://github.com/servicialo/mcp-server/blob/main/spec/delegated-agency-model.md" target="_blank" rel="noopener">agencia delegada</a> con mandatos acotados y revocables: experimental. Especificado e implementado como capa de servicio, sin validación obligatoria en el borde de herramientas de la implementación de referencia.</li>
                <li>Órdenes de servicio y gestión de mandatos como herramientas de agente: especificadas, sin implementar.</li>
                <li>Resolución de disputas: en diseño, sin documento de especificación.</li>
                <li>Portabilidad del registro: principio declarado del protocolo; su especificación normativa está en desarrollo.</li>
                <li>Propiedades verificables de la evidencia (integridad, orden, no repudio, inclusión comprobable): propuesta en discusión abierta en el <a className="m-link" href="https://github.com/servicialo/mcp-server" target="_blank" rel="noopener">repositorio del protocolo</a>.</li>
              </ul>
            </div>

            <div className="m-status-block">
              <p className="m-status-head">Lo que queremos demostrar</p>
              <p className="m-status-sub">Hipótesis. Nada de esto está probado.</p>
              <ul>
                <li>Que exista al menos una <a className="m-link" href="https://servicialo.com/implementors" target="_blank" rel="noopener">implementación independiente</a>, con código propio, que interopere con la de referencia. Hoy no hay ninguna verificada; el arnés de prueba está listo y espera un segundo nodo.</li>
                <li>Que un historial pueda salir de una implementación y ser interpretado en otra con su nivel de certeza intacto.</li>
                <li>Que ese historial influya en una decisión económica real de un tercero: un contrato, una condición comercial, un financiamiento, una delegación.</li>
                <li>Que terceros, incluidos pagadores y reguladores, acepten como suficiente una evidencia producida bajo el protocolo.</li>
              </ul>
            </div>
          </div>

          <p>Una sola implementación de referencia no es una red interoperable. Una reserva autónoma no es un negocio operando sin humanos. Lo escribimos nosotros antes de que lo escriba otro.</p>
        </Chapter>

        {/* ───────────────────────── IX ───────────────────────── */}
        <Chapter id="valor" num="IX" title="Por qué Digitalo puede crear y capturar valor">
          <p>Si Servicialo es abierto y cualquiera puede implementarlo, ¿por qué existiría una empresa rentable a su alrededor? Es una pregunta legítima y merece una respuesta sin rodeos.</p>
          <p>Separamos tres cosas. <strong>Servicialo</strong> es la semántica abierta: define qué significa coordinar un servicio y no pertenece a nadie, tampoco a nosotros. <strong>Coordinalo</strong> es la implementación operacional de referencia: un producto que resuelve problemas concretos de una organización de servicios, agenda, sesiones, confirmaciones, cobranza, cierres, y que al hacerlo produce evidencia bajo el protocolo durante la operación diaria. <strong>Digitalo y sus agentes</strong> son las capacidades de automatización, coordinación y gestión que pueden construirse sobre esa infraestructura.</p>
          <p>Un protocolo abierto permite competencia e implementaciones independientes. Eso significa, en términos directos, que Digitalo no puede ni quiere depender de mantener cautiva la información de sus clientes. Si una organización se va, su registro debería poder irse con ella. Nuestra ventaja, si existe, tiene que venir de otra parte.</p>
          <p>Creemos que viene de entregar capacidades útiles y confiables: operar el día a día mejor que una planilla; automatizar lo repetitivo sin perder el rastro; gestionar las excepciones, que el propio protocolo estima entre el quince y el treinta por ciento de las citas y donde se gana o se pierde la confianza de un cliente; conciliar; coordinar entre participantes que no comparten operador; y ofrecer servicios especializados sobre la infraestructura, desde la migración de datos hasta la operación delegada.</p>
          <p>Sobre ingresos corresponde la misma disciplina que sobre todo lo demás. Lo que existe es un modelo de precio definido, que cobra por la capacidad productiva que el sistema coordina y no por usuario, y una operación real sobre la cual probarlo. Lo posible son los servicios que la infraestructura habilita y que todavía no hemos validado comercialmente. No prometemos comisiones por transacción, efectos de red ni rentabilidades que no podemos mostrar.</p>
          <p>Y aceptamos la consecuencia: adoptar un protocolo abierto no garantiza a Digitalo ninguna ventaja. Alguien podría implementarlo mejor que nosotros. Eso no es una falla de la estrategia; es su prueba de consistencia. Un manifiesto que invoca a Hayek y a la competencia como descubrimiento no puede pedir, en la última página, una posición que nadie pueda disputar.</p>
        </Chapter>

        {/* ───────────────────────── X ───────────────────────── */}
        <Chapter id="no-sabemos" num="X" title="Lo que todavía no sabemos">
          <p>Construimos Digitalo con una tesis, no con una certeza. Estas son las preguntas que la tesis todavía no responde.</p>
          <p><em>¿Existirán implementaciones independientes que adopten el protocolo?</em> Un estándar con un solo implementador es una convención privada bien documentada.</p>
          <p><em>¿Qué evidencia aceptarán los terceros?</em> Un pagador, una aseguradora o un regulador pueden exigir formas de prueba que el protocolo no modela, o rechazar las que sí.</p>
          <p><em>¿Se traducirá el historial verificable en mejores decisiones económicas?</em> Es la hipótesis central, y todavía no tiene una sola observación a favor.</p>
          <p><em>¿Qué nivel de portabilidad real podremos alcanzar?</em> Entre datos sensibles, jurisdicciones distintas y plataformas sin incentivo para dejar salir el registro, la respuesta no depende solo de nosotros.</p>
          <p><em>¿Cómo evolucionarán las responsabilidades legales cuando los agentes actúen bajo mandatos?</em> La norma llegará después que la práctica, y no sabemos con qué forma.</p>
          <p><em>¿Qué funciones seguirán necesitando garantías institucionales, capital y arbitraje humano</em>, por mucho que la evidencia mejore?</p>
          <p><em>¿Qué actores capturarán el valor que una red interoperable cree?</em> Podría ser quien construyó la infraestructura, quien opera mejor sobre ella, o alguien que hoy no existe.</p>
          <p>Preferimos escribir estas preguntas a que las descubra un lector escéptico. Un manifiesto honesto no es más débil. Es más difícil de refutar, porque ya dijo dónde podría estar equivocado.</p>
        </Chapter>

        {/* ───────────────────────── Cierre ───────────────────────── */}
        <Chapter id="cierre" num="—" title="Una economía que puede comprobar">
          <p>Empezamos con una planilla de cálculo en una clínica pequeña. De ahí salió un sistema; del sistema, un protocolo; y del protocolo, una pregunta que todavía no termina de responderse.</p>
          <p>Lo que creemos cabe en una secuencia. El conocimiento está disperso y debe seguir estándolo. La inteligencia se volvió accesible y permite actuar sobre ese conocimiento donde está. La coordinación entre independientes necesita reglas compartidas, no un centro. La evidencia verificable permite que otros comprueben sin tener que creernos. La reputación portable permite que el valor de una trayectoria no quede atrapado en quien la custodia. Y la competencia abierta es el único mecanismo que conocemos para descubrir cuál de todas estas apuestas resulta cierta.</p>
          <p>No declaramos que esa economía exista. Estamos construyendo y poniendo a prueba algunas de las piezas que podrían hacerla posible: en una clínica real, con un protocolo publicado y con la intención declarada de que otros lo implementen mejor que nosotros.</p>

          <div className="m-thesis">
            <p>
              La inteligencia permite actuar.<br />
              La evidencia permite comprobar.<br />
              La reputación permite decidir.<br /><br />
              <em>Queremos que una organización pequeña pueda demostrar lo que hace, y que ese historial le pertenezca.</em>
            </p>
          </div>

          <p className="m-punch">Empezamos con un Excel. Terminamos donde la competencia nos lleve.</p>
        </Chapter>

        <div className="m-colophon">
          <p>Este documento es una tesis y una invitación a contrastarla.</p>
          <p>El protocolo está publicado. La implementación opera. Las hipótesis están señaladas como hipótesis.</p>
          <p>Quien quiera verificarlo, puede hacerlo.</p>
          <div className="m-colophon-links">
            <a href="https://servicialo.com/spec" className="m-colophon-link" target="_blank" rel="noopener">Especificación</a>
            <a href="https://servicialo.com/extensions" className="m-colophon-link" target="_blank" rel="noopener">Extensiones y madurez</a>
            <a href="https://servicialo.com/network" className="m-colophon-link" target="_blank" rel="noopener">Red</a>
            <a href="https://github.com/servicialo/mcp-server" className="m-colophon-link" target="_blank" rel="noopener">Código abierto</a>
            <a href="https://coordinalo.com" className="m-colophon-link" target="_blank" rel="noopener">Coordinalo</a>
          </div>
        </div>

        <footer className="m-footer">
          <div className="m-footer-left">
            <p>Digitalo SpA — Santiago, Chile.</p>
            <p>Infraestructura para la economía de servicios profesionales.</p>
            <p className="m-footer-date">Primera versión: 28 de marzo de 2026 · Segunda versión: 12 de octubre de 2026</p>
          </div>
          <a href="/" className="m-footer-link">grupodigitalo.com</a>
        </footer>
      </main>
    </>
  )
}
