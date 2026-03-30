'use client'

import { useEffect } from 'react'

const css = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink: #1a1916;
    --ink-muted: #6b6860;
    --ink-faint: #a09e9a;
    --surface: #faf9f7;
    --surface-hover: #f3f2ef;
    --surface-anchor: rgba(26,25,22,0.04);
    --nav-bg: rgba(250,249,247,0.92);
    --border: rgba(26,25,22,0.12);
    --border-strong: rgba(26,25,22,0.25);
    --max: 680px;
    --serif: 'Playfair Display', Georgia, serif;
    --sans: 'DM Sans', system-ui, sans-serif;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --ink: #e8e6e1;
      --ink-muted: #9a9590;
      --ink-faint: #6b6860;
      --surface: #121210;
      --surface-hover: #1c1b18;
      --surface-anchor: rgba(255,255,255,0.04);
      --nav-bg: rgba(18,18,16,0.92);
      --border: rgba(255,255,255,0.10);
      --border-strong: rgba(255,255,255,0.20);
    }
  }

  html { font-size: 17px; -webkit-font-smoothing: antialiased; }

  .m-progress {
    position: fixed;
    top: 0; left: 0;
    height: 2px;
    background: var(--ink);
    width: 0%;
    z-index: 200;
    transition: width 0.1s linear;
  }

  .m-nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    background: var(--nav-bg);
    backdrop-filter: blur(8px);
    border-bottom: 0.5px solid var(--border);
  }

  .m-nav-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;
  }

  .m-nav-logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--sans);
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.03em;
    color: var(--ink);
    text-decoration: none;
  }

  .m-nav-logo svg {
    width: 22px;
    height: 22px;
  }

  .m-nav-right {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .m-nav-links {
    display: flex;
    list-style: none;
    gap: 1.5rem;
  }

  .m-nav-links a {
    font-family: var(--sans);
    font-size: 13px;
    color: var(--ink-muted);
    text-decoration: none;
    letter-spacing: 0.02em;
    transition: color 0.2s;
  }

  .m-nav-links a:hover { color: var(--ink); }

  .m-nav-back {
    font-size: 12px;
    color: var(--ink-muted);
    text-decoration: none;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    transition: color 0.2s;
  }

  .m-nav-back:hover { color: var(--ink); }

  @media (max-width: 768px) {
    .m-nav-links { display: none; }
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
    margin-bottom: 4rem;
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
    font-size: clamp(36px, 6vw, 52px);
    font-weight: 400;
    line-height: 1.15;
    margin-bottom: 0.75rem;
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

  .m-divider {
    width: 40px;
    height: 1px;
    background: var(--border-strong);
    margin: 3rem 0;
  }

  .m-section {
    margin-bottom: 3rem;
    opacity: 0;
    animation: mFadeUp 0.6s ease both;
  }

  .m-section:nth-child(1) { animation-delay: 0.2s; }
  .m-section:nth-child(2) { animation-delay: 0.25s; }
  .m-section:nth-child(3) { animation-delay: 0.3s; }
  .m-section:nth-child(4) { animation-delay: 0.35s; }
  .m-section:nth-child(5) { animation-delay: 0.4s; }
  .m-section:nth-child(6) { animation-delay: 0.45s; }
  .m-section:nth-child(7) { animation-delay: 0.5s; }

  .m-section-label {
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--ink-faint);
    margin-bottom: 1.25rem;
  }

  .m-main p {
    font-size: 17px;
    line-height: 1.85;
    color: var(--ink);
    margin-bottom: 1.25rem;
  }

  .m-main p:last-child { margin-bottom: 0; }

  .m-punch {
    font-size: 18px;
    font-weight: 400;
    line-height: 1.5;
    color: var(--ink);
    margin-bottom: 1.25rem;
  }

  .m-blockquote {
    font-family: var(--serif);
    font-size: clamp(20px, 3.5vw, 26px);
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

  .m-anchor {
    background: var(--surface-anchor);
    border: 0.5px solid var(--border-strong);
    border-radius: 8px;
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
    line-height: 1.7;
  }

  .m-anchor p:last-child { margin-bottom: 0; }
  .m-anchor strong { color: var(--ink); font-weight: 400; }

  .m-clevel {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1px;
    background: var(--border);
    border: 0.5px solid var(--border);
    border-radius: 8px;
    overflow: hidden;
    margin: 2.5rem 0;
  }

  .m-clevel-item {
    background: var(--surface);
    padding: 1rem 1.25rem;
    transition: background 0.15s;
  }

  .m-clevel-item:hover { background: var(--surface-hover); }

  .m-clevel-role {
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--ink-faint);
    margin-bottom: 4px;
  }

  .m-clevel-name { font-size: 14px; color: var(--ink); margin-bottom: 3px; }
  .m-clevel-desc { font-size: 12px; color: var(--ink-muted); line-height: 1.5; }

  .m-thesis {
    border-top: 0.5px solid var(--border-strong);
    border-bottom: 0.5px solid var(--border-strong);
    padding: 3rem 0;
    margin: 3rem 0;
    text-align: center;
  }

  .m-thesis p {
    font-family: var(--serif);
    font-size: clamp(20px, 3.5vw, 28px);
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

  .m-colophon-link {
    display: inline-block;
    margin-top: 2rem;
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
    border-top: 0.5px solid var(--border);
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
    border-bottom: 0.5px solid var(--border);
    padding-bottom: 1px;
    transition: color 0.2s, border-color 0.2s;
  }

  .m-footer-link:hover { color: var(--ink); border-color: var(--ink); }

  @keyframes mFadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 600px) {
    .m-main { padding: 7rem 1.25rem 4rem; }
    .m-nav { padding: 1rem 1.25rem; }
    .m-clevel { grid-template-columns: 1fr; }
    .m-blockquote { font-size: 20px; }
    .m-thesis p { font-size: 20px; }
    .m-footer { flex-direction: column; align-items: flex-start; }
  }
`

const clevel = [
  { role: 'CEO', name: 'Digitalo.ai', desc: 'Orquesta el ecosistema completo' },
  { role: 'COO', name: 'Coordinalo.ai', desc: 'Opera el ciclo completo del servicio' },
  { role: 'CFO', name: 'Capitalizalo.ai', desc: 'Tu CFO personal. Capitaliza la vida.' },
  { role: 'CRO', name: 'Optimizalo.ai', desc: 'Maximiza revenue y ocupación' },
  { role: 'CMO adquisición', name: 'Atraelo.ai', desc: 'Trae los clientes correctos' },
  { role: 'CMO retención', name: 'Fidelizalo.ai', desc: 'Los mantiene y hace crecer' },
  { role: 'CAO', name: 'Auditalo.ai', desc: 'Garantiza que cada decisión sea trazable' },
  { role: 'Guardián del registry', name: 'Emparejalo.ai', desc: 'El match correcto antes de actuar' },
]

export default function ManifiestoPage() {
  useEffect(() => {
    const handler = () => {
      const h = document.documentElement
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100
      const bar = document.getElementById('m-progress')
      if (bar) bar.style.width = Math.min(pct, 100) + '%'
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=DM+Sans:ital,wght@0,300;0,400;1,300&display=swap"
        rel="stylesheet"
      />
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div className="m-progress" id="m-progress" />

      <nav className="m-nav">
        <div className="m-nav-container">
          <a href="/" className="m-nav-logo">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z" fill="url(#m-logo-gradient)" opacity="0.15"/>
              <path d="M12 5.5L7 8v4c0 3.5 2.5 6.5 5 7.5 2.5-1 5-4 5-7.5V8l-5-2.5z" stroke="url(#m-logo-gradient)" strokeWidth="1.5" fill="none"/>
              <circle cx="12" cy="10" r="1.5" fill="url(#m-logo-gradient)"/>
              <circle cx="9" cy="14" r="1.5" fill="url(#m-logo-gradient)"/>
              <circle cx="15" cy="14" r="1.5" fill="url(#m-logo-gradient)"/>
              <path d="M12 10L9 14M12 10L15 14M9 14H15" stroke="url(#m-logo-gradient)" strokeWidth="1.2"/>
              <defs>
                <linearGradient id="m-logo-gradient" x1="4" y1="2" x2="20" y2="20" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#60a5fa"/>
                  <stop offset="1" stopColor="#3b82f6"/>
                </linearGradient>
              </defs>
            </svg>
            Grupo Digitalo
          </a>
          <div className="m-nav-right">
            <ul className="m-nav-links">
              <li><a href="https://servicialo.com">Protocolo</a></li>
              <li><a href="/#productos">Productos</a></li>
              <li><a href="/#nosotros">Nosotros</a></li>
              <li><a href="https://documentalo.com">Documentaci&oacute;n</a></li>
              <li><a href="/#contacto">Contacto</a></li>
            </ul>
            <a href="/" className="m-nav-back">&larr; Volver</a>
          </div>
        </div>
      </nav>

      <main className="m-main">
        <p className="m-opening">
          Estamos entrando en una nueva economía de servicios.<br />
          <em>Seguimos operando con herramientas del pasado.</em>
        </p>

        <div className="m-meta-line">
          Esto no es una página de producto.<br />
          Es la tesis detrás de Digitalo.
        </div>

        <div className="m-header-block">
          <p className="m-eyebrow">Grupo Digitalo — Documento fundacional</p>
          <h1>Capitalización de<br /><em>inteligencia.</em></h1>
          <p className="m-subtitle">Un manifiesto para la economía agéntica de servicios.</p>
          <div className="m-divider" />
        </div>

        <section className="m-section">
          <p className="m-section-label">El problema</p>
          <p className="m-punch">Toda organización grande tiene un equipo directivo. Toda PYME de servicios lo necesita. Ninguna lo ha podido pagar.</p>
          <p>La kinesióloga que trabaja sola. El psicólogo que atiende online. El estudio con cinco profesionales. Todos operan sin CEO, sin CFO, sin COO — con una planilla de cálculo, su memoria, y el tiempo que les queda después de atender.</p>
          <p>El conocimiento que acumulan se pierde. La inteligencia que construyen con cada decisión no se capitaliza. El tiempo — el único activo no renovable — se gasta en administración.</p>
          <p>Eso es lo que venimos a cambiar.</p>
        </section>

        <div className="m-blockquote">
          &ldquo;El problema de las civilizaciones no es la falta de conocimiento. Es que el conocimiento está disperso y nadie puede agregarlo todo.&rdquo;
        </div>

        <section className="m-section">
          <p className="m-section-label">El conocimiento nunca estuvo centralizado</p>
          <p>Nunca estuvo. Nunca va a estar.</p>
          <p>Lo que cada organización sabe sobre sus clientes, sus patrones, sus excepciones — ese conocimiento no existe en ningún servidor central. Existe disperso, fragmentado, en millones de decisiones cotidianas que nadie registra y que se evaporan cuando alguien se va, cambia de sistema, o simplemente olvida.</p>
          <p>La pregunta no es cómo centralizar ese conocimiento. Es cómo capitalizarlo donde está.</p>
          <p>Friedrich Hayek lo entendió en 1945: la solución no es un planificador más inteligente. Es un mecanismo que agrega sin centralizar. Que coordina sin controlar. Que produce orden sin diseñarlo. Lo llamó orden espontáneo. Nosotros lo llamamos protocolo.</p>
          <p>Y en 1968 fue más lejos: la competencia no es un estado. Es un proceso de descubrimiento. Nadie sabe de antemano qué funciona. Solo la competencia lo revela.</p>
          <div className="m-note">
            &ldquo;El orden espontáneo no es el resultado del diseño humano, sino de la acción humana.&rdquo; — F.A. Hayek, La constitución de la libertad, 1960.
          </div>
        </section>

        <section className="m-section">
          <p className="m-section-label">Esto ya ocurrió antes</p>
          <p>Entre los siglos XIII y XVII, una red de ciudades del Báltico coordinó el comercio europeo durante cuatro siglos. Sin gobierno central. Sin ejército. Sin autoridad que lo ordenara.</p>
          <p>La Liga Hanseática no era una empresa. Era un protocolo. Las ciudades mantenían su autonomía — pero todas hablaban el mismo idioma comercial. Mismas reglas. Mismos estándares. Los Kontore eran los nodos: puntos de confianza que cualquier mercader podía usar en cualquier puerto, porque el protocolo era el mismo en todas partes.</p>
          <p>No cayó por fracasar. Cayó cuando los estados centralizaron lo que la red había descentralizado. Pero demostró algo que ningún imperio pudo: la coordinación sin control central no solo es posible — es superior.</p>
          <p>La historia no se repite. Pero rima.</p>
          <p>Servicialo es un protocolo abierto para servicios profesionales. Los Kontore son los nodos del registry. Los agentes son los mercaderes. Lo que cambió es la velocidad a la que el conocimiento viaja entre ellos.</p>
          <div className="m-note">
            Estamos, abiertamente, experimentando con fuerzas del pasado encontrándose con tecnologías del futuro. Los gremios medievales resueltos con modelos de lenguaje. El orden espontáneo de Hayek implementado en TypeScript. Sabemos dónde empieza esto. No sabemos — nadie sabe — dónde termina.
          </div>
        </section>

        <div className="m-blockquote">
          &ldquo;Sabemos dónde empezamos. Solo la competencia nos va a llevar a donde esto termina. Y estamos seguros de que será mejor.&rdquo;
        </div>

        <section className="m-section">
          <p className="m-section-label">Esto ya está ocurriendo</p>
          <p>En marzo de 2026, un agente de IA ejecutó el ciclo completo de una sesión profesional — desde la solicitud hasta la confirmación — sin intervención humana. En una clínica real. Con datos reales. En infraestructura de producción.</p>
          <p>No fue un hito nuestro. Fue el primer síntoma visible de algo que ya era inevitable.</p>
          <p>Los agentes van a operar negocios. La pregunta no es si — es sobre qué infraestructura, con qué protocolo, con qué nivel de trazabilidad. Porque cuando un agente toma una decisión con consecuencias reales, alguien tiene que poder explicar por qué. Eso no es una feature. Es un requisito.</p>
          <p>Por eso el C-level agéntico no empieza con automatización. Empieza con auditoría.</p>

          <div className="m-clevel">
            {clevel.map((c) => (
              <div key={c.role} className="m-clevel-item">
                <div className="m-clevel-role">{c.role}</div>
                <div className="m-clevel-name">{c.name}</div>
                <div className="m-clevel-desc">{c.desc}</div>
              </div>
            ))}
          </div>

          <div className="m-anchor">
            <div className="m-anchor-label">En la práctica</div>
            <p><strong>Coordinalo</strong> es la primera interfaz de esta infraestructura — el sistema que opera el ciclo completo de un negocio de servicios, de la primera cita a la reconciliación, sin intervención manual.</p>
            <p>El primer nodo activo es una clínica en Santiago. Desde ahí, el C-level agéntico se expande a cualquier organización que opere sobre el protocolo Servicialo.</p>
          </div>
        </section>

        <section className="m-section">
          <p className="m-section-label">El mercado abierto de talento agéntico</p>
          <p>Los gremios medievales no eran monopolios. Eran estándares de excelencia. Cualquier artesano que los alcanzara podía ejercer su oficio en cualquier ciudad de la Liga — porque el estándar era el mismo en todas partes.</p>
          <p>Auditalo.ai aprendió a auditar en producción real. Capitalizalo.ai aprendió a capitalizar con datos reales. Emparejalo.ai aprendió de cada no-show, cada rechazo, cada aprobación. Ese conocimiento es portable.</p>
          <p>Cualquier implementación del protocolo Servicialo puede incorporar a estos agentes. El moat no es el código — es la inteligencia institucionalizada en cada decisión que tomaron.</p>
          <p className="m-punch">El protocolo ralla la cancha. Los productos construyen el estadio. Los agentes son los campeones. Cualquier cancha del mundo puede contratarlos.</p>
        </section>

        <section className="m-section">
          <p className="m-section-label">Lo que no sabemos</p>
          <p>Construimos Digitalo con una tesis, no con una certeza.</p>
          <p>No sabemos qué agente va a resultar el más valioso. No sabemos en qué industrias ocurrirá primero la adopción masiva. No sabemos qué implementaciones del protocolo van a superar a la nuestra. No sabemos cómo va a responder la regulación cuando los agentes tomen decisiones con consecuencias legales.</p>
          <p>Lo que sí sabemos: el conocimiento disperso en millones de organizaciones de servicios tiene un valor que hoy se evapora. La infraestructura para capitalizarlo existe. Los agentes que pueden operarla existen. Y la competencia — la única fuerza capaz de revelar lo que nadie puede planear — ya comenzó.</p>
          <p>Empezamos con un Excel. Terminamos donde la competencia nos lleve.</p>
        </section>

        <div className="m-thesis">
          <p>
            No hay elección sobre si los agentes van a operar negocios.<br />
            Solo sobre qué infraestructura van a usar para hacerlo.<br /><br />
            <em>Esa infraestructura existe. Ya está en producción.</em>
          </p>
        </div>

        <div className="m-colophon">
          <p>El protocolo está publicado como estándar abierto.</p>
          <p>La implementación de referencia ya opera en producción.</p>
          <p>Y ya hay agentes actuando sobre esta infraestructura.</p>
          <a
            href="https://servicialo.com/whitepaper"
            className="m-colophon-link"
            target="_blank"
            rel="noopener"
          >
            Servicialo Protocol
          </a>
        </div>

        <footer className="m-footer">
          <div className="m-footer-left">
            <p>Digitalo SpA — Santiago, Chile.</p>
            <p>Infraestructura para la economía de servicios profesionales.</p>
            <p className="m-footer-date">28 de marzo de 2026</p>
          </div>
          <a href="/" className="m-footer-link">grupodigitalo.com</a>
        </footer>
      </main>
    </>
  )
}
