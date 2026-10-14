import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { MOBILE_UNIT_COUNT, whatsappMessages } from '../data/content'
import WhatsAppIcon from './WhatsAppIcon'
import { whatsappLink } from '../lib/whatsapp'

const AUTOPLAY_MS = 5500

const slides = [
  {
    image: '/unidad_01.webp',
    alt: 'Unidad móvil de Medical and Health del Bajío rotulada con sus servicios',
    tag: 'Salud hasta tu empresa',
    title: 'Llevamos los estudios a tu planta',
    text: 'Audiometría, espirometría, rayos X, laboratorio y exámenes médicos sin que tu personal salga de las instalaciones.',
  },
  {
    image: '/unidad_02.webp',
    alt: 'Personal de Medical and Health atendiendo trabajadores junto a la unidad móvil',
    tag: 'Atención en sitio',
    title: 'Montamos el servicio donde lo necesitas',
    text: 'Instalamos la unidad y el módulo de atención en tu estacionamiento, en el horario de tus turnos.',
  },
  {
    image: '/unidad_03.webp',
    alt: 'Flotilla de unidades móviles de diagnóstico clínico',
    tag: `${MOBILE_UNIT_COUNT} unidades móviles`,
    title: 'Una flotilla lista para tu operación',
    text: 'Unidades equipadas y conectadas en línea con nuestro laboratorio para entregarte resultados a tiempo.',
  },
]

export default function UnitsSlider() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const touchX = useRef<number | null>(null)
  const frame = useRef<HTMLDivElement>(null)

  // Efecto 3D: inclina el slider hacia el cursor (solo con mouse)
  function tilt(e: PointerEvent<HTMLDivElement>) {
    const el = frame.current
    if (!el || e.pointerType !== 'mouse') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.setProperty('--ry', `${(x * 10).toFixed(2)}deg`)
    el.style.setProperty('--rx', `${(-y * 8).toFixed(2)}deg`)
    el.style.setProperty('--px', `${(-x * 24).toFixed(1)}px`)
    el.style.setProperty('--py', `${(-y * 18).toFixed(1)}px`)
    el.style.setProperty('--gx', `${((x + 0.5) * 100).toFixed(1)}%`)
    el.style.setProperty('--gy', `${((y + 0.5) * 100).toFixed(1)}%`)
  }

  function resetTilt() {
    const el = frame.current
    if (!el) return
    for (const v of ['--ry', '--rx', '--px', '--py']) el.style.setProperty(v, v.startsWith('--r') ? '0deg' : '0px')
  }

  const go = useCallback((next: number) => setIndex((next + slides.length) % slides.length), [])

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setTimeout(() => go(index + 1), AUTOPLAY_MS)
    return () => window.clearTimeout(id)
  }, [index, paused, go])

  return (
    <section className="units" aria-roledescription="carrusel" aria-label="Nuestras unidades móviles">
      <div className="container">
        <div
          className={`units__frame${paused ? ' is-paused' : ''}`}
          data-reveal
          ref={frame}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => {
            setPaused(false)
            resetTilt()
          }}
          onPointerMove={tilt}
          onTouchStart={(e) => {
            touchX.current = e.touches[0].clientX
          }}
          onTouchEnd={(e) => {
            if (touchX.current === null) return
            const dx = e.changedTouches[0].clientX - touchX.current
            if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1))
            touchX.current = null
          }}
          style={{ '--autoplay': `${AUTOPLAY_MS}ms` } as CSSProperties}
        >
          <div className="units__media">
            {slides.map((slide, i) => (
              <figure
                key={slide.image}
                className={`units__slide${i === index ? ' is-active' : ''}`}
                aria-hidden={i !== index}
                aria-roledescription="diapositiva"
                aria-label={`${i + 1} de ${slides.length}`}
              >
                <img src={slide.image} alt={slide.alt} loading={i === 0 ? 'eager' : 'lazy'} />
              </figure>
            ))}

            <div className="units__shade" aria-hidden="true" />
            <div className="units__glare" aria-hidden="true" />

            <div className="units__dots" role="tablist" aria-label="Elegir foto">
              {slides.map((slide, i) => (
                <button
                  key={slide.image}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Ver foto ${i + 1}: ${slide.tag}`}
                  className={`units__dot${i === index ? ' is-active' : ''}`}
                  onClick={() => go(i)}
                >
                  <span />
                </button>
              ))}
            </div>
          </div>

          <div className="units__caption" key={index}>
            <span className="units__tag">{slides[index].tag}</span>
            <h2 className="units__title">{slides[index].title}</h2>
            <p className="units__text">{slides[index].text}</p>
            <a {...whatsappLink(whatsappMessages.mobileUnit)} className="btn btn--primary">
              <WhatsAppIcon />
              Agenda una unidad móvil
            </a>
          </div>

          <div className="units__controls">
            <button type="button" className="units__arrow" aria-label="Foto anterior" onClick={() => go(index - 1)}>
              <ChevronLeft size={22} />
            </button>
            <button type="button" className="units__arrow" aria-label="Foto siguiente" onClick={() => go(index + 1)}>
              <ChevronRight size={22} />
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}
