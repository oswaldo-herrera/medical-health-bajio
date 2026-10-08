import { useEffect, useRef } from 'react'
import { Check, Clock, Phone, Truck, Wifi } from 'lucide-react'
import { audienceContact, heroCopy, whatsappMessages } from '../data/content'
import { useAudience } from '../context/audience'
import AudienceToggle from './AudienceToggle'
import { delay } from '../lib/ui'
import WhatsAppIcon from './WhatsAppIcon'
import { whatsappLink } from '../lib/whatsapp'

const studies = [
  { name: 'Exploración física', done: true },
  { name: 'Audiometría', done: true },
  { name: 'Espirometría', done: true },
  { name: 'Rayos X', done: true },
  { name: 'Análisis clínicos', done: false },
]

// Oculta por ahora la tarjeta del expediente; cambiar a true para mostrarla
const SHOW_RECORD = false

export default function Hero() {
  const { audience } = useAudience()
  const copy = heroCopy[audience]
  const phone = audienceContact[audience]
  const photo = useRef<HTMLSpanElement>(null)

  // Parallax: la foto avanza al 30% de la velocidad del scroll mientras el hero está a la vista
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    const update = () => {
      frame = 0
      const el = photo.current
      if (!el || window.scrollY > window.innerHeight * 1.2) return
      el.style.setProperty('--parallax', `${window.scrollY * 0.3}px`)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section className="hero" id="inicio">
      <div className="hero__bg" aria-hidden="true">
        <span className="hero__photo" ref={photo} />
        <span className="hero__shade" />
        <span className="hero__blob hero__blob--a" />
        <span className="hero__blob hero__blob--b" />
        <span className="hero__grid" />
      </div>

      <div className={`container hero__inner${SHOW_RECORD ? '' : ' hero__inner--solo'}`}>
        <div className="hero__copy">
          <div className="hero__toggle" data-reveal>
            <AudienceToggle />
          </div>

          <div className="hero__swap" key={audience}>
            <p className="eyebrow eyebrow--light">
              <span className="eyebrow__dot" />
              {copy.eyebrow}
            </p>
            <h1 className="hero__title">
              {copy.title} <em>{copy.accent}</em>
            </h1>
            <p className="hero__lead">{copy.lead}</p>

            <div className="hero__cta">
              <a {...whatsappLink(whatsappMessages.general[audience])} className="btn btn--primary btn--lg">
                <WhatsAppIcon />
                {copy.primary}
              </a>
              <a href={`tel:${phone.tel}`} className="btn btn--ghost btn--lg">
                <Phone size={18} aria-hidden="true" />
                {copy.phoneLabel} {phone.text}
              </a>
            </div>

            <ul className="hero__trust">
              {copy.trust.map((badge) => (
                <li key={badge}>
                  <Check size={14} aria-hidden="true" />
                  {badge}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {SHOW_RECORD && (
        <div className="hero__visual" data-reveal style={delay(300)} aria-hidden="true">
          <div className="record">
            <div className="record__head">
              <span className="record__title">Expediente clínico electrónico</span>
              <span className="record__live">
                <span />
                En línea
              </span>
            </div>

            <svg className="record__ecg" viewBox="0 0 400 80">
              <path
                pathLength={1}
                d="M0 40h70l12-8 10 8h22l8 12 12-46 12 62 8-28h30l12-8 10 8h22l8 12 12-46 12 62 8-28h90"
              />
            </svg>

            <ul className="record__list">
              {studies.map((study) => (
                <li key={study.name} className={study.done ? 'is-done' : 'is-pending'}>
                  <span className="record__check">
                    {study.done ? <Check size={13} strokeWidth={3} /> : <Clock size={13} />}
                  </span>
                  {study.name}
                  <span className="record__status">{study.done ? 'Interpretado' : 'En proceso'}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="chip chip--a">
            <Truck size={18} />
            <span>
              <strong>Unidad móvil</strong>
              en tu planta
            </span>
          </div>
          <div className="chip chip--b">
            <Wifi size={18} />
            <span>
              <strong>Resultados</strong>
              en tiempo real
            </span>
          </div>
        </div>
        )}
      </div>
    </section>
  )
}
