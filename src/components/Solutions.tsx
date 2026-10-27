import { useState } from 'react'
import { CalendarCheck, Check, FlaskConical, Hospital, Images, UserCheck, type LucideIcon } from 'lucide-react'
import GalleryModal, { type GalleryImage } from './GalleryModal'
import WhatsAppIcon from './WhatsAppIcon'
import { whatsappMessages } from '../data/content'
import { whatsappLink } from '../lib/whatsapp'

interface Solution {
  id: string
  icon: LucideIcon
  short: string
  title: string
  text: string
  highlights: string[]
  avatar: string
  cover: string
  images: GalleryImage[]
}

const um = (n: number) => `/unidad_medica/um_${String(n).padStart(2, '0')}.webp`

const solutions: Solution[] = [
  {
    id: 'periodicos',
    icon: CalendarCheck,
    short: 'Estudios periódicos anuales',
    title: 'Estudios médicos periódicos anuales',
    text: 'Realizados directamente en las plantas de nuestros clientes o en cualquiera de nuestras dos instalaciones de M&H, ubicadas en Puerto Interior y Silao.',
    highlights: ['En tu planta o en nuestras instalaciones', 'Sedes en Puerto Interior y Silao', 'Programación anual de tu plantilla'],
    avatar: '/avatar_masculino.webp',
    cover: um(7),
    images: [
      { src: um(7), alt: 'Unidades móviles y módulo de atención en planta' },
      { src: um(2), alt: 'Equipo médico de Medical and Health junto a la unidad móvil' },
      { src: '/unidad_02.webp', alt: 'Atención en sitio con unidad móvil' },
      { src: '/puerto_interior.webp', alt: 'Unidad médica en Guanajuato Puerto Interior' },
      { src: '/silao_centro_buena.webp', alt: 'Laboratorio y gabinete en Silao Zona Centro' },
    ],
  },
  {
    id: 'nuevo-ingreso',
    icon: UserCheck,
    short: 'Exámenes de nuevo ingreso',
    title: 'Exámenes médicos de nuevo ingreso',
    text: 'Dirigidos a candidatos que se incorporan a empresas de la industria automotriz, con la posibilidad de ofrecer evaluaciones integrales de acuerdo con los requerimientos de cada cliente.',
    highlights: ['Especialistas en la industria automotriz', 'Evaluaciones integrales a la medida', 'Resultados claros para contratar'],
    avatar: '/avatar_clientes.webp',
    cover: '/int_01.webp',
    images: [
      { src: '/int_01.webp', alt: 'Sala de espera' },
      { src: '/int_02.webp', alt: 'Recepción y atención' },
      { src: um(11), alt: 'Registro de candidatos en sitio' },
      { src: '/int_03.webp', alt: 'Estudio de ultrasonido' },
    ],
  },
  {
    id: 'laboratorio',
    icon: FlaskConical,
    short: 'Estudios de laboratorio',
    title: 'Estudios de laboratorio',
    text: 'Contamos con equipo y capacidad operativa para atender una amplia demanda de estudios clínicos.',
    highlights: ['Alta capacidad de procesamiento', 'Laboratorio certificado PACAL', 'Resultados interpretados por especialistas'],
    avatar: '/avatar_cuerpo.webp',
    cover: '/silao_centro_buena.webp',
    images: [
      { src: '/silao_centro_buena.webp', alt: 'Laboratorio Medical and Health en Silao Zona Centro' },
      { src: '/int_05.webp', alt: 'Toma de muestras en unidad móvil' },
      { src: um(11), alt: 'Recepción de muestras y registro en sitio' },
      { src: '/int_02.webp', alt: 'Recepción del laboratorio' },
    ],
  },
  {
    id: 'servicio-planta',
    icon: Hospital,
    short: 'Servicio médico en planta',
    title: 'Integración de servicios médicos en planta',
    text: 'Contratación y asignación de personal médico para la operación de consultorios, procurando que sus instalaciones y servicios cumplan con los requisitos normativos y sanitarios aplicables de COFEPRIS.',
    highlights: ['Personal médico contratado y asignado', 'Operación completa del consultorio', 'Apego a requisitos de COFEPRIS'],
    avatar: '/avatar_masculino.webp',
    cover: '/int_04.webp',
    images: [
      { src: '/int_04.webp', alt: 'Área de atención médica' },
      { src: '/int_03.webp', alt: 'Médico especialista realizando estudio' },
      { src: um(4), alt: 'Equipo de personal médico y de enfermería' },
      { src: '/int_01.webp', alt: 'Consultorio y sala de espera' },
    ],
  },
]

export default function Solutions() {
  const [activeId, setActiveId] = useState(solutions[0].id)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const active = solutions.find((s) => s.id === activeId) ?? solutions[0]
  const index = solutions.indexOf(active)

  return (
    <section className="section sol" id="soluciones">
      <div className="sol__bg" aria-hidden="true">
        <span className="sol__orb sol__orb--a" />
        <span className="sol__orb sol__orb--b" />
      </div>

      <div className="container sol__inner">
        <div className="section__head" data-reveal>
          <p className="eyebrow">Nuestros servicios</p>
          <h2 className="section__title">Soluciones integrales en salud laboral</h2>
          <p className="section__lead">Elige un servicio para conocer cómo te ayudamos.</p>
        </div>

        <div className="sol__tabs" role="tablist" aria-label="Servicios" data-reveal>
          {solutions.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              id={`sol-tab-${s.id}`}
              aria-selected={s.id === activeId}
              aria-controls="sol-panel"
              className={`sol__tab${s.id === activeId ? ' is-active' : ''}`}
              onClick={() => setActiveId(s.id)}
            >
              <span className="sol__tab-img" style={{ backgroundImage: `url(${s.cover})` }} aria-hidden="true" />
              <span className="sol__tab-num">0{i + 1}</span>
              <span className="sol__tab-icon">
                <s.icon size={22} aria-hidden="true" />
              </span>
              <span className="sol__tab-label">{s.short}</span>
            </button>
          ))}
        </div>

        <div className="sol__panel" role="tabpanel" id="sol-panel" aria-labelledby={`sol-tab-${active.id}`} key={active.id}>
          <div className="sol__content">
            <span className="sol__step">
              Servicio {index + 1} de {solutions.length}
            </span>
            <h3 className="sol__title">{active.title}</h3>
            <p className="sol__text">{active.text}</p>

            <ul className="sol__highlights">
              {active.highlights.map((h) => (
                <li key={h}>
                  <span>
                    <Check size={14} strokeWidth={3} aria-hidden="true" />
                  </span>
                  {h}
                </li>
              ))}
            </ul>

            <div className="sol__actions">
              <button type="button" className="btn sol__gallery-btn" onClick={() => setGalleryOpen(true)}>
                <Images size={18} aria-hidden="true" />
                Ver imágenes
              </button>
              <a {...whatsappLink(whatsappMessages.service(active.title))} className="btn btn--navy">
                <WhatsAppIcon />
                Cotizar este servicio
              </a>
            </div>
          </div>

          <button type="button" className="sol__photo" onClick={() => setGalleryOpen(true)} aria-label={`Ver imágenes de ${active.title}`}>
            <img src={active.cover} alt="" />
            <span className="sol__photo-badge">
              <Images size={16} aria-hidden="true" /> {active.images.length} fotos
            </span>
          </button>

          <img className="sol__avatar" src={active.avatar} alt="" aria-hidden="true" />
        </div>
      </div>

      {galleryOpen && <GalleryModal title={active.title} images={active.images} onClose={() => setGalleryOpen(false)} />}
    </section>
  )
}
