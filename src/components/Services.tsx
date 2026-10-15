import { useRef, useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { services, whatsappMessages, type Service } from '../data/content'
import { useMediaQuery } from '../hooks/useMediaQuery'
import WhatsAppIcon from './WhatsAppIcon'
import { whatsappLink } from '../lib/whatsapp'

// Mismo punto de corte que el diseño de una columna en landing.css
const MOBILE_QUERY = '(max-width: 56rem)'

function ServiceDetail({ service, withHeader }: { service: Service; withHeader: boolean }) {
  const List = service.ordered ? 'ol' : 'ul'

  return (
    <>
      {withHeader && (
        <>
          <span className="services__panel-icon">
            <service.icon size={26} aria-hidden="true" />
          </span>
          <h3>{service.title}</h3>
        </>
      )}
      <p className="services__intro">{service.intro}</p>

      {service.exams && (
        <div className="services__exams">
          <p className="services__list-title">{service.exams.title}</p>
          <ul>
            {service.exams.items.map((exam) => (
              <li key={exam.label}>
                <span className="services__exam-icon">
                  <exam.icon size={18} aria-hidden="true" />
                </span>
                {exam.label}
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="services__list-title">{service.listTitle}</p>
      <List className={`services__list${service.ordered ? ' services__list--ordered' : ''}`}>
        {service.list.map((item, i) => (
          <li key={item}>
            <span className="services__bullet">
              {service.ordered ? i + 1 : <Check size={13} strokeWidth={3} aria-hidden="true" />}
            </span>
            {item}
          </li>
        ))}
      </List>

      {service.outcome && (
        <div className="services__outcome">
          <p className="services__list-title">{service.outcomeTitle}</p>
          <ul>
            {service.outcome.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      <a {...whatsappLink(whatsappMessages.service(service.title))} className="btn btn--primary">
        <WhatsAppIcon />
        Cotizar este servicio
      </a>
    </>
  )
}

function ServiceTabs() {
  const [activeId, setActiveId] = useState(services[0].id)
  const active = services.find((s) => s.id === activeId) ?? services[0]

  return (
    <div className="services__layout">
      <div className="services__tabs" role="tablist" aria-label="Servicios">
        {services.map((service) => (
          <button
            key={service.id}
            type="button"
            role="tab"
            id={`tab-${service.id}`}
            aria-selected={service.id === activeId}
            aria-controls="services-panel"
            className={`services__tab${service.id === activeId ? ' is-active' : ''}`}
            onClick={() => setActiveId(service.id)}
          >
            <service.icon size={20} aria-hidden="true" />
            <span>{service.title}</span>
          </button>
        ))}
      </div>

      <div
        className="services__panel"
        role="tabpanel"
        id="services-panel"
        aria-labelledby={`tab-${active.id}`}
        key={active.id}
      >
        <ServiceDetail service={active} withHeader />
      </div>
    </div>
  )
}

function ServiceAccordion() {
  const [openId, setOpenId] = useState<string | null>(services[0].id)
  const items = useRef<Record<string, HTMLDivElement | null>>({})

  function toggle(id: string) {
    const next = openId === id ? null : id
    setOpenId(next)
    if (!next) return
    // Al cerrarse el anterior el contenido se recorre; dejamos visible el título del que se abrió
    window.setTimeout(() => {
      const el = items.current[id]
      if (el && el.getBoundingClientRect().top < 80) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 320)
  }

  return (
    <div className="accordion">
      {services.map((service) => {
        const open = service.id === openId
        return (
          <div
            key={service.id}
            className={`accordion__item${open ? ' is-open' : ''}`}
            ref={(el) => {
              items.current[service.id] = el
            }}
          >
            <button
              type="button"
              className="accordion__trigger"
              id={`acc-${service.id}`}
              aria-expanded={open}
              aria-controls={`acc-panel-${service.id}`}
              onClick={() => toggle(service.id)}
            >
              <span className="accordion__icon">
                <service.icon size={20} aria-hidden="true" />
              </span>
              <span className="accordion__title">{service.title}</span>
              <ChevronDown className="accordion__chevron" size={20} aria-hidden="true" />
            </button>
            <div
              className="accordion__body"
              id={`acc-panel-${service.id}`}
              role="region"
              aria-labelledby={`acc-${service.id}`}
              inert={!open}
            >
              <div className="accordion__inner">
                <div className="accordion__content">
                  <ServiceDetail service={service} withHeader={false} />
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function Services() {
  const isMobile = useMediaQuery(MOBILE_QUERY)

  return (
    <section className="section services" id="servicios">
      <div className="container">
        <div className="section__head" data-reveal>
          <p className="eyebrow">Para empresas · Salud ocupacional</p>
          <h2 className="section__title">Todo lo que tu industria requiere, con un solo proveedor</h2>
          <p className="section__lead">
            Servicios preventivos de seguridad y salud en el trabajo, desde el primer examen de ingreso hasta la
            operación completa de tu servicio médico.
          </p>
        </div>

        <div data-reveal>{isMobile ? <ServiceAccordion /> : <ServiceTabs />}</div>
      </div>
    </section>
  )
}
