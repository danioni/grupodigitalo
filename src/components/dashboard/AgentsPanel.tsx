import * as s from './styles'

interface AgentCard {
  slug: string
  name: string
  agent_card_url: string
  vertical: string | null
  country: string
}

interface Props {
  agents: AgentCard[]
}

const discovery = [
  {
    label: 'Agent Card',
    desc: 'Identidad de la plataforma. Un agente externo lee esta tarjeta para saber qué puede hacer Coordinalo, qué skills expone y cómo autenticarse.',
    url: 'https://coordinalo.com/.well-known/agent.json',
  },
  {
    label: 'Registry de agentes',
    desc: 'Directorio de todas las organizaciones operando sobre el protocolo. Un agente consulta este endpoint para descubrir a quién puede contactar.',
    url: 'https://coordinalo.com/.well-known/agents.json',
  },
]

export function AgentsPanel({ agents }: Props) {
  return (
    <div style={s.card}>
      <div style={s.cardTitle}>Protocolo A2A</div>

      <div style={{ fontSize: '0.8125rem', color: '#71717a', marginBottom: '1rem', lineHeight: 1.5 }}>
        Cada organización publica una tarjeta de agente en una ruta estándar. Cuando un agente externo necesita operar con un negocio, lee la tarjeta, descubre las capacidades disponibles y ejecuta — sin intervención humana.
      </div>

      <div style={{ ...s.sectionTitle, fontSize: '0.8125rem', marginTop: 0 }}>Descubrimiento</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {discovery.map((d) => (
          <div key={d.url}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' as const }}>
              <span style={{ fontSize: '0.8125rem', color: '#fafafa' }}>{d.label}</span>
              <a
                href={d.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ ...s.mono, fontSize: '0.6875rem', color: '#3b82f6', textDecoration: 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }}
              >
                {d.url.replace('https://coordinalo.com/', '')}
              </a>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#71717a', marginTop: '0.25rem', lineHeight: 1.5 }}>
              {d.desc}
            </div>
          </div>
        ))}
      </div>

      <div style={{ ...s.sectionTitle, fontSize: '0.8125rem' }}>
        Tarjetas de agente ({agents.length})
      </div>
      <div style={{ fontSize: '0.75rem', color: '#71717a', marginBottom: '0.75rem', lineHeight: 1.5 }}>
        Cada tarjeta es un negocio real operando en producción. Un agente lee la tarjeta, conoce los intents disponibles (agendar, cancelar, reagendar) y puede ejecutar el ciclo completo del servicio vía A2A.
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
        gap: '1px',
        background: '#27272a',
        borderRadius: '0.5rem',
        overflow: 'hidden',
      }}>
        {agents.map((a) => (
          <a
            key={a.slug}
            href={a.agent_card_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: '#18181b',
              padding: '0.75rem 1rem',
              textDecoration: 'none',
              display: 'block',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
              <span style={{ fontSize: '0.875rem', color: '#fafafa' }}>{a.name}</span>
              <div style={{ display: 'flex', gap: '0.375rem' }}>
                {a.vertical && (
                  <span style={{
                    fontSize: '0.625rem',
                    padding: '0.125rem 0.375rem',
                    borderRadius: '9999px',
                    background: 'rgba(59,130,246,0.15)',
                    color: '#60a5fa',
                  }}>
                    {a.vertical}
                  </span>
                )}
                <span style={{
                  fontSize: '0.625rem',
                  padding: '0.125rem 0.375rem',
                  borderRadius: '9999px',
                  background: 'rgba(161,161,170,0.15)',
                  color: '#a1a1aa',
                  textTransform: 'uppercase' as const,
                }}>
                  {a.country}
                </span>
              </div>
            </div>
            <div style={{ ...s.mono, fontSize: '0.6875rem', color: '#3b82f6', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }}>
              .../{a.slug}/.well-known/agent.json
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
